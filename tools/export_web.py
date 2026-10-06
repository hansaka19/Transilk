# three.js export for the transilk hero (steps 1–3 of the approved three.js plan).
# Runs on a background copy of the scene; never saves the .blend.
#   Blender -b stageC.blend --python export_web.py -- /path/to/website/assets
# Outputs: hero.glb (Draco, Blender Z-up coordinates), anim.bin + scene.json (per-frame transforms,
# lights, camera, mist/dust/reveal-light curves, sand, glint points).
import bpy, bmesh, sys, json, math, os, random
import numpy as np
from mathutils import Matrix, Vector

OUT = sys.argv[sys.argv.index('--') + 1]; os.makedirs(OUT, exist_ok=True)
s = bpy.context.scene
F0, F1 = s.frame_start, s.frame_end
body = bpy.data.objects['Geode_Body_Working']
cover = bpy.data.objects['Geode_Front_Cover']
gem = bpy.data.objects['transilk • sapphire reveal']
pieces = sorted([o for o in bpy.data.collections['Cover • fractured pieces'].objects], key=lambda o: o.name)
sand = sorted([o for o in s.objects if o.name.startswith('Sand ')], key=lambda o: o.name)
fog = bpy.data.objects['Mist • approaching viewer']; dust = bpy.data.objects['Impact • sand dust']
spot = bpy.data.objects['Sapphire reveal spot']
BREAK = 90

# ---------- 2. bake procedural rock/agate/quartz colour into corner colours (albedo) ----------
s.render.engine = 'CYCLES'; s.cycles.samples = 4; s.cycles.device = 'CPU'
s.render.bake.target = 'VERTEX_COLORS'
s.world.light_settings.distance = 0.45
s.frame_set(120)  # pieces are render-hidden before the break
# volume boxes and sand are meshes too — keep them out of the AO bake (restored before sampling)
bake_hidden = [fog, dust] + sand
for o in bake_hidden: o.hide_render = True
for o in [body] + pieces:
    me = o.data
    ca = me.color_attributes.new('albedo', 'BYTE_COLOR', 'CORNER'); me.color_attributes.active_color = ca
    for x in s.objects: x.select_set(False)
    o.hide_set(False); o.hide_render = False; o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, target='VERTEX_COLORS')
    # ambient occlusion multiplied into the albedo: real-time has no AO, and without it the
    # cavity loses its depth. Pieces are baked alone (the cover is gone by then).
    ao = me.color_attributes.new('ao', 'BYTE_COLOR', 'CORNER'); me.color_attributes.active_color = ao
    s.cycles.samples = 24
    bpy.ops.object.bake(type='AO', target='VERTEX_COLORS')
    s.cycles.samples = 4
    n = len(me.loops); c = np.empty(n * 4); ca.data.foreach_get('color', c); c = c.reshape(-1, 4)
    a_ = np.empty(n * 4); ao.data.foreach_get('color', a_); a_ = a_.reshape(-1, 4)[:, :1]
    c[:, :3] *= np.clip(a_, 0, 1) ** 1.3
    ca.data.foreach_set('color', c.ravel()); me.color_attributes.remove(ao)
    me.color_attributes.active_color = me.color_attributes['albedo']
    print('BAKED', o.name, len(me.polygons), 'ao mean', round(float(a_.mean()), 3))

for o in bake_hidden: o.hide_render = False
# ---------- 1. export meshes: identity transforms, 3 material groups + sapphire ----------
def group_mat(name, rough, coat):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree
    p = nt.nodes['Principled BSDF']; ca = nt.nodes.new('ShaderNodeVertexColor'); ca.layer_name = 'albedo'
    nt.links.new(ca.outputs['Color'], p.inputs['Base Color'])
    p.inputs['Roughness'].default_value = rough; p.inputs['Coat Weight'].default_value = coat
    return m
M_ROCK, M_AGATE, M_QUARTZ = group_mat('rock', .82, 0), group_mat('agate', .22, .5), group_mat('quartz', .12, .4)
def cat(name):
    return 0 if 'basalt' in name else 1 if 'agate' in name else 2
exp = bpy.data.collections.new('WEB_EXPORT'); s.collection.children.link(exp)
def export_copy(src, name):
    # One object per material group: the glTF exporter only wrote vertex colours for the first
    # material slot of a multi-material mesh (agate/quartz came out white), so split them.
    remap = [cat(m.name) for m in src.data.materials]
    obs = []
    for gi, (gname, gm_) in enumerate((('rock', M_ROCK), ('agate', M_AGATE), ('quartz', M_QUARTZ))):
        bm = bmesh.new(); bm.from_mesh(src.data)
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if remap[f.material_index] != gi], context='FACES')
        if not bm.faces: bm.free(); continue
        for f in bm.faces: f.material_index = 0
        me = bpy.data.meshes.new(f'{name}__{gname}'); bm.to_mesh(me); bm.free()
        me.materials.append(gm_)
        ob = bpy.data.objects.new(me.name, me); exp.objects.link(ob); obs.append(ob)
    return obs
outs = [o for o in export_copy(body, 'geode_body')]
for i, p in enumerate(pieces): outs += export_copy(p, 'piece_%02d' % i)
gm = gem.data.copy(); gm.name = 'sapphire'; gob = bpy.data.objects.new('sapphire', gm); exp.objects.link(gob); outs.append(gob)
for x in s.objects: x.select_set(False)
for o in outs: o.select_set(True)
bpy.context.view_layer.objects.active = outs[0]
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'hero.glb'), export_format='GLB', use_selection=True,
                          export_yup=False, export_animations=False, export_apply=False,
                          export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=7,
                          export_draco_position_quantization=15, export_draco_normal_quantization=10,
                          export_draco_color_quantization=10, export_vertex_color='ACTIVE')

# ---------- 3. per-frame animation (world matrices, Blender Z-up) ----------
# Hidden-in-viewport objects are not evaluated by the depsgraph, so drop the cover's visibility
# keys (in this throwaway copy) or its matrix would stay frozen at the break pose.
def drop_visibility_keys(o):
    a = o.animation_data and o.animation_data.action
    if not a: return
    bags = [cb for l in a.layers for st in l.strips for cb in st.channelbags] if getattr(a, 'layers', None) else [a]
    for cb in bags:
        for fc in [fc for fc in cb.fcurves if fc.data_path in ('hide_viewport', 'hide_render')]: cb.fcurves.remove(fc)
    o.hide_viewport = False; o.hide_render = False
drop_visibility_keys(cover)
def m16(M): return [M[r][c] for c in range(4) for r in range(4)]  # column-major like three.js
frames = list(range(F0, F1 + 1))
s.frame_set(BREAK); cover_break_inv = cover.matrix_world.inverted()
piece_at_break = [p.matrix_world.copy() for p in pieces]
buf = []
curves = {k: [] for k in ('fog_y', 'fog_density', 'fog_w', 'dust_z', 'dust_sx', 'dust_sz', 'dust_density', 'spot_energy')}
fog_nt = fog.data.materials[0].node_tree; dust_nt = dust.data.materials[0].node_tree
def density_socket(nt):
    return next(n for n in nt.nodes if n.type == 'MATH' and n.operation == 'MULTIPLY' and not n.inputs[1].is_linked
                and n.outputs[0].links and n.outputs[0].links[0].to_node.type == 'MATH').inputs[1]
fog_d = density_socket(fog_nt); dust_d = density_socket(dust_nt)
fog_tex = next(n for n in fog_nt.nodes if n.type == 'TEX_NOISE')
for f in frames:
    s.frame_set(f)
    buf += m16(body.matrix_world) + m16(gem.matrix_world)
    for p, pb in zip(pieces, piece_at_break):
        M = cover.matrix_world @ cover_break_inv @ pb if f < BREAK else p.matrix_world
        buf += m16(M)
    for g in sand:
        t = g.matrix_world.translation; buf += [t.x, t.y, t.z, g.matrix_world.to_scale().x]
    curves['fog_y'].append(round(fog.location.y, 4)); curves['fog_density'].append(round(fog_d.default_value, 4)); curves['fog_w'].append(round(fog_tex.inputs['W'].default_value, 4))
    curves['dust_z'].append(round(dust.location.z, 4)); curves['dust_sx'].append(round(dust.scale.x, 4)); curves['dust_sz'].append(round(dust.scale.z, 4)); curves['dust_density'].append(round(dust_d.default_value, 4))
    curves['spot_energy'].append(round(spot.data.energy, 2))
np.array(buf, np.float32).tofile(os.path.join(OUT, 'anim.bin'))

# ---------- scene description ----------
cam = s.camera
lights = []
for o in s.objects:
    if o.type != 'LIGHT': continue
    d = o.data; fwd = (o.matrix_world.to_3x3() @ Vector((0, 0, -1))).normalized()
    lights.append(dict(name=o.name, type=d.type, pos=list(o.matrix_world.translation), dir=list(fwd), color=list(d.color),
                       energy=d.energy, size=getattr(d, 'size', getattr(d, 'shadow_soft_size', 0)),
                       spot=getattr(d, 'spot_size', None)))
# glint points: crystal tips (local space of their owner) for sparkle sprites
random.seed(3)
def glints(me, owner, n):
    polys = list(me.polygons)
    out = []
    for p in random.sample(polys, min(n, len(polys))):
        out += [owner] + [round(x, 4) for x in p.center] + [round(x, 3) for x in p.normal]
    return out
gl = []
for o in outs:
    if not o.name.endswith('__quartz'): continue
    base = o.name.split('__')[0]
    gl += glints(o.data, 0, 1400) if base == 'geode_body' else glints(o.data, int(base.split('_')[1]) + 1, 90)
json.dump(dict(
    fps=s.render.fps, frames=len(frames), breakFrame=BREAK,
    layout=dict(matrices=2 + len(pieces), sand=len(sand)),
    pieces=['piece_%02d' % i for i in range(len(pieces))],
    camera=dict(matrix=m16(cam.matrix_world), lens=cam.data.lens, sensor=cam.data.sensor_width),
    lights=lights,
    fog=dict(x=fog.location.x, z=fog.location.z, scale=list(fog.scale), color=list(next(n for n in fog_nt.nodes if n.type == 'PRINCIPLED_VOLUME').inputs['Color'].default_value)[:3]),
    dust=dict(color=list(next(n for n in dust_nt.nodes if n.type == 'PRINCIPLED_VOLUME').inputs['Color'].default_value)[:3]),
    gemCenter=list(gem.matrix_world.translation),
    curves=curves, glints=gl,
), open(os.path.join(OUT, 'scene.json'), 'w'), separators=(',', ':'))
print('EXPORTED', {f: os.path.getsize(os.path.join(OUT, f)) for f in ('hero.glb', 'anim.bin', 'scene.json')})
