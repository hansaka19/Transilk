// transilk hero — real-time three.js version of transilk_hero_v2.blend.
// Sequence (24 fps, frames 1–192): mist → geode drop (55) → sand impact → cover falls (70–90) →
// cover breaks, pieces slide forward (90–120) → sapphire reveal (112).
// All scene data lives in Blender's Z-up coordinates under `root` (rotated to three's Y-up).
// Debug: ?frame=N freezes the timeline, ?mouse=x,y fixes the pointer (−1…1).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { NOISE_GLSL } from './noise.js';
import { installGemOptics } from './gem-optics.js';
import { createMudLens } from './mud-lens.js';

const params = new URLSearchParams(location.search);
const DEBUG_FRAME = params.has('frame') ? parseFloat(params.get('frame')) : null;
const DEBUG_MOUSE = params.has('mouse') ? params.get('mouse').split(',').map(Number) : null;
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const REVEAL_FRAME = 132;
const COVER_START=78, COVER_IMPACT=114;
const body = document.body;
const canvas = document.querySelector('.hero__canvas');
document.querySelectorAll('.words span').forEach((s, i) => s.style.setProperty('--i', i));

const showStatic = () => {           // no WebGL (or an error): the reveal still, with all content
  const img = document.querySelector('.hero__poster'); img.src = img.dataset.src;
  body.classList.add('is-static', 'is-intro', 'is-revealed');
};
if (params.has('noui')) body.classList.add('noui');   // for rendering the fallback poster
const hasWebGL2 = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();
if (!hasWebGL2) showStatic();
else main().catch((e) => { console.error(e); showStatic(); });

async function main() {
  // ---------------------------------------------------------------- load
  const draco = new DRACOLoader().setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/gltf/');
  const loader = new GLTFLoader().setDRACOLoader(draco);
  const [gltf, animBuf, S, intactGltf, intactInfo, fracture, closedGltf, forestTexture, woodland] = await Promise.all([
    loader.loadAsync('assets/hero.glb'),
    fetch('assets/anim.bin').then((r) => r.arrayBuffer()),
    fetch('assets/scene.json').then((r) => r.json()),
    loader.loadAsync('assets/intact-cover.glb'),
    fetch('assets/intact-cover.json').then(r=>r.json()),
    fetch('assets/fracture-physics.json').then(r=>r.json()),
    loader.loadAsync('assets/closed-geode.glb'),
    new THREE.TextureLoader().loadAsync('assets/forest-background.png'),
    loader.loadAsync('assets/forest-set.glb'),
  ]);

  // ---------------------------------------------------------------- renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = !params.has('noshadow');
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;         // re-rendered only while things move (see update)

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x021317);
  scene.fog=new THREE.FogExp2(0x03191e,.055);
  renderer.setClearColor(0x000000,0);
  forestTexture.colorSpace=THREE.SRGBColorSpace;

  const root = new THREE.Group();          // Blender Z-up → three Y-up
  root.rotation.x = -Math.PI / 2;
  scene.add(root);
  root.add(woodland.scene);
  woodland.scene.traverse(o=>{if(o.isMesh){o.receiveShadow=true;o.castShadow=false;if(o.material){o.material.side=THREE.DoubleSide;o.material.envMapIntensity=.4;}}});
  const ambient=new THREE.HemisphereLight(0x799eaa,0x151b0b,1.25);scene.add(ambient);
  const forestRim=new THREE.PointLight(0x46968c,450,28,2);forestRim.position.set(0,6,7);root.add(forestRim);
  const lens=createMudLens(REDUCED);

  const b2t = (v) => new THREE.Vector3(v[0], v[2], -v[1]);   // Blender point → three world

  // ---------------------------------------------------------------- camera
  // Low-angle hero camera (user request): close to the ground, looking slightly up at the geode.
  const CAM = { eye: new THREE.Vector3(0.45, -11.8, 1.3), target: new THREE.Vector3(0, -1.4, 1.75), lens: 30 };
  const camBase = new THREE.Matrix4().lookAt(CAM.eye, CAM.target, new THREE.Vector3(0, 0, 1)).setPosition(CAM.eye);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300);
  camera.matrixAutoUpdate = false;
  root.add(camera);
  const HFOV = 2 * Math.atan(S.camera.sensor / 2 / CAM.lens);               // horizontal fit, as in Blender
  const camTarget = CAM.target;

  // ---------------------------------------------------------------- animation data
  const A = new Float32Array(animBuf);
  const NM = S.layout.matrices, NS = S.layout.sand, NF = S.frames;
  const stride = NM * 16 + NS * 4;
  const tracks = [];                        // [object][frame] = {p, q, s}
  const tmpM = new THREE.Matrix4();
  for (let o = 0; o < NM; o++) {
    const tr = [];
    for (let f = 0; f < NF; f++) {
      tmpM.fromArray(A, f * stride + o * 16);
      const p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
      tmpM.decompose(p, q, s); tr.push({ p, q, s });
    }
    tracks.push(tr);
  }
  const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3();
  function sampleMatrix(o, frame, out) {
    const x = Math.min(Math.max(frame - 1, 0), NF - 1), i0 = Math.floor(x), i1 = Math.min(i0 + 1, NF - 1), a = x - i0;
    const k0 = tracks[o][i0], k1 = tracks[o][i1];
    _p.lerpVectors(k0.p, k1.p, a); _q.slerpQuaternions(k0.q, k1.q, a); _s.lerpVectors(k0.s, k1.s, a);
    return out.compose(_p, _q, _s);
  }
  function curve(name, frame) {
    const c = S.curves[name], x = Math.min(Math.max(frame - 1, 0), NF - 1), i0 = Math.floor(x), i1 = Math.min(i0 + 1, NF - 1);
    return c[i0] + (c[i1] - c[i0]) * (x - i0);
  }

  // ---------------------------------------------------------------- materials
  const mats = {
    rock: new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.93, metalness: 0, specularIntensity: 0.35, envMapIntensity: 0.35 }),
    agate: new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.22, clearcoat: 0.22, clearcoatRoughness: 0.05, envMapIntensity: 1 }),
    quartz: new THREE.MeshPhysicalMaterial({
      vertexColors: true, roughness: 0.2, metalness: 0.0,
      specularIntensity: 0.35, envMapIntensity: 0.3,
    }),
    // Faceted gem without a transmission pass (that pass re-rendered the whole scene every frame):
    // each facet refracts into the studio environment with a slightly different IOR per colour
    // channel (dispersion), plus one internal bounce, tinted royal blue.
    gem: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0, 0, 0), roughness: 0.015, metalness: 0,   // no diffuse: body colour comes from the refraction term
      ior: 1.76, specularIntensity: 1, envMapIntensity: 0.7, flatShading: true,
    }),
  };

  // debug: ?mat=agate.roughness:0.1,quartz.envMapIntensity:2 (material tuning without edits)
  for (const kv of (params.get('mat') || '').split(',').filter(Boolean)) {
    const [path, v] = kv.split(':'); const [m, prop] = path.split('.'); if (mats[m]) mats[m][prop] = parseFloat(v);
  }

  // ---------------------------------------------------------------- meshes
  const animated = [];                      // index matches the anim.bin matrix order
  // Each animated object is exported as <name>__rock / __agate / __quartz (one material each).
  // Face winding in the source meshes is mixed (the body and the remeshed cover shell are wound
  // inward, the generated crystals outward; Cycles doesn't care), so the stone materials are
  // double-sided and three.js flips normals per face.
  for (const k of ['rock', 'agate', 'quartz']) mats[k].side = THREE.DoubleSide;
  const matFor = (key) => mats[key];
  const take = (name) => {
    const group = new THREE.Group(); group.name = name;
    const parts = gltf.scene.children.filter((n) => n.name === name || n.name.startsWith(name + '__'));
    for (const node of parts) {
      node.traverse((m) => {
        if (!m.isMesh) return;
        const key = m.material.name.startsWith('rock') ? 'rock' : m.material.name.startsWith('agate') ? 'agate'
          : m.material.name.startsWith('quartz') ? 'quartz' : 'gem';
        m.material = params.has('albedo') && key !== 'gem' ? new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }) : matFor(key);
        m.castShadow = key !== 'gem'; m.receiveShadow = key !== 'gem';
      });
      group.add(node);
    }
    group.matrixAutoUpdate = false;
    root.add(group);
    return group;
  };
  const bodyNode = take('geode_body');
  const gemNode = take('sapphire');
  const optics = installGemOptics(mats.gem, gemNode);
  const intact = intactGltf.scene;
  intact.traverse(o=>{if(o.isMesh){o.material=mats.rock;o.castShadow=true;o.receiveShadow=true;}});
  intact.matrixAutoUpdate=false;root.add(intact);
  const intactRelative=new THREE.Matrix4().fromArray(intactInfo.relativeToBody);
  const closedRock=closedGltf.scene;
  const unifiedRock=mats.rock.clone();unifiedRock.color.setScalar(.38);
  closedRock.traverse(o=>{if(o.isMesh){o.material=unifiedRock;o.castShadow=true;o.receiveShadow=true;}});
  closedRock.matrixAutoUpdate=false;root.add(closedRock);
  // Match the cover's albedo to the body's darker stone when it begins to peel away.
  const capRock=mats.rock.clone();capRock.color.setScalar(.58);
  intact.traverse(o=>{if(o.isMesh)o.material=capRock;});
  const pieceNodes = S.pieces.map(take);
  animated.push(bodyNode, gemNode, ...pieceNodes);
  const physicalTracks=fracture.frames.map(frame=>frame.map(values=>{
    const p=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3();
    new THREE.Matrix4().fromArray(values).decompose(p,q,s);return {p,q,s};
  }));

  // floor: charcoal, fades to black with distance (no horizon line), no env reflection
  const floorMat = new THREE.MeshStandardMaterial({ color: new THREE.Color().setRGB(0.03, 0.026, 0.021), roughness: 0.92, envMapIntensity: 0 });
  floorMat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
      .replace('#include <color_fragment>', '#include <color_fragment>\nfloat grain=fract(sin(dot(floor(vWP.xz*480.),vec2(12.9898,78.233)))*43758.5453); diffuseColor.rgb*=.65+grain*.65;\nfloat fd = clamp((length(vWP) - 5.0) / 11.0, 0.0, 1.0);\ndiffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.0), fd);');
  };
  const groundTex=await new THREE.TextureLoader().loadAsync('assets/sand-albedo.jpg');
  groundTex.wrapS=groundTex.wrapT=THREE.RepeatWrapping;groundTex.repeat.set(150,150);groundTex.colorSpace=THREE.SRGBColorSpace;
  groundTex.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  floorMat.map=groundTex;floorMat.bumpMap=groundTex;floorMat.bumpScale=.018;
  floorMat.color.setRGB(.35,.33,.30);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), floorMat);
  floor.material=new THREE.ShadowMaterial({opacity:.32});
  floor.receiveShadow = true;
  floor.visible=false;
  root.add(floor);

  // flying sand grains (deterministic trajectories from Blender)
  const sand = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: new THREE.Color().setRGB(0.12, 0.1, 0.07), roughness: 0.95, envMapIntensity: 0.2 }), NS);
  sand.frustumCulled = false; sand.castShadow = true;
  root.add(sand);

  // Fine grains use ballistic flight, restitution and friction, with two impact sources.
  const grainCount=1800,grainPositions=new Float32Array(grainCount*3);
  const grainData=Array.from({length:grainCount},(_,i)=>{
    const h=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
    return {angle:h(i+1)*Math.PI*2,speed:1.2+h(i+11)*4,vz:.6+h(i+21)*2.7,
      start:(i<1250?55:90)+h(i+31)*3,r:.6+h(i+41)*.7,scale:h(i+51)};
  });
  const grainGeo=new THREE.BufferGeometry();grainGeo.setAttribute('position',new THREE.BufferAttribute(grainPositions,3));
  const fineSand=new THREE.Points(grainGeo,new THREE.PointsMaterial({color:0xb5a38b,size:.014,sizeAttenuation:true,transparent:true,opacity:.75,depthWrite:false}));
  fineSand.frustumCulled=false;root.add(fineSand);

  // ---------------------------------------------------------------- lights
  const L = Object.fromEntries(S.lights.map((l) => [l.name, l]));
  const lightObjs = [];
  function addLight(l, { intensity, angle, penumbra, shadow }) {
    const sl = new THREE.SpotLight(new THREE.Color().setRGB(...l.color), intensity, 0, angle, penumbra, 2);
    sl.position.fromArray(l.pos);
    sl.target.position.fromArray(l.pos).add(new THREE.Vector3().fromArray(l.dir).multiplyScalar(6));
    root.add(sl, sl.target);
    if (shadow) {
      sl.castShadow = true; sl.shadow.mapSize.set(2048, 2048); sl.shadow.bias = -0.0004; sl.shadow.normalBias = 0.03;
      sl.shadow.camera.near = 1; sl.shadow.camera.far = 30;
    }
    lightObjs.push(sl);
    return sl;
  }
  // Blender area light (W) → on-axis intensity W/π; spot (W) → W/4π
  addLight(L['Key softbox'], { intensity: L['Key softbox'].energy / Math.PI, angle: 1.15, penumbra: 1, shadow: true });
  addLight(L['Edge light'], { intensity: L['Edge light'].energy / Math.PI, angle: 1.2, penumbra: 1 });
  addLight(L['Crystal facet strip'], { intensity: L['Crystal facet strip'].energy / Math.PI, angle: 0.9, penumbra: 1 });
  addLight(L['Soft frontal fill'], { intensity: L['Soft frontal fill'].energy / Math.PI, angle: 1.2, penumbra: 1 });
  const revealBase = new THREE.Vector3().fromArray(L['Sapphire reveal spot'].pos);
  const reveal = addLight(L['Sapphire reveal spot'], { intensity: 0, angle: L['Sapphire reveal spot'].spot / 2, penumbra: 0.6 });
  const gemCenter = new THREE.Vector3().fromArray(S.gemCenter);
  reveal.target.position.copy(gemCenter);

  // Reflection environment rebuilt from the Blender studio: the world colour plus each area light
  // as an emissive panel (radiance = W / (π·area)), seen from the sapphire. In Cycles these lights
  // show up in glossy reflections — that is what lights up the agate, crystals and sapphire facets.
  {
    const env = new THREE.Scene();
    env.background = new THREE.Color().setRGB(0.012, 0.017, 0.027);
    for (const l of S.lights) {
      if (l.type !== 'AREA') continue;
      const rad = l.energy / (Math.PI * l.size * l.size);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(l.size, l.size),
        new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(...l.color).multiplyScalar(rad), side: THREE.DoubleSide }));
      const rel = new THREE.Vector3().fromArray(l.pos).sub(gemCenter);
      panel.position.set(rel.x, rel.z, -rel.y);                       // Blender → three axes
      panel.lookAt(0, 0, 0);
      env.add(panel);
    }
    // Narrow reflection cards produce crisp internal light/dark changes in the cut stone.
    for(const [x,y,z,w,h,power] of [[-3,1,3,.45,3,8],[2,-1,2,.3,2,5],[-1,-2,-3,1,2,3]]){
      const card=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(power,power,power),side:THREE.DoubleSide}));
      card.position.set(x,y,z);card.lookAt(0,0,0);env.add(card);
    }
    const pmrem = new THREE.PMREMGenerator(renderer);
    // per-material envMap so each material's envMapIntensity applies (scene.environment ignores it)
    const envTex = pmrem.fromScene(env, 0).texture;
    for (const m of [mats.rock, mats.agate, mats.quartz, mats.gem, sand.material]) m.envMap = envTex;
    pmrem.dispose();
  }

  const waterUniforms={uWaterTime:{value:0},uImpactTime:{value:-10}};
  const waterMat=new THREE.MeshPhysicalMaterial({color:0x1b2926,roughness:.16,metalness:.25,clearcoat:1,clearcoatRoughness:.09,envMap:mats.gem.envMap,envMapIntensity:1.5,side:THREE.DoubleSide});
  waterMat.onBeforeCompile=sh=>{
    Object.assign(sh.uniforms,waterUniforms);
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 vWaterUv;uniform float uWaterTime,uImpactTime;')
      .replace('#include <begin_vertex>',`#include <begin_vertex>
      vWaterUv=uv;
      float radius=length(vec2(position.x,position.y-3.5));
      float age=uImpactTime;
      float ring=age>0.?sin(radius*13.-age*19.)*exp(-abs(radius-age*2.6)*2.2)*exp(-age*.7)*.05:0.;
      transformed.z+=sin(position.x*8.+uWaterTime)*sin(position.y*11.-uWaterTime*.6)*.008+ring;`);
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vWaterUv;')
      .replace('#include <alphatest_fragment>','#include <alphatest_fragment>\nif(length((vWaterUv-.5)*2.)>1.)discard;');
  };
  const water=new THREE.Mesh(new THREE.PlaneGeometry(5.1,14.6,64,100),waterMat);water.position.set(0,-3.5,.016);water.receiveShadow=true;root.add(water);
  const mudMat=new THREE.MeshPhysicalMaterial({color:0x352818,roughness:.25,clearcoat:.9});
  const splash=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),mudMat,260);splash.frustumCulled=false;root.add(splash);
  const random=i=>{const n=Math.sin(i*127.1+23.7)*43758.5453;return n-Math.floor(n);};
  function updateSplash(frame){
    for(let i=0;i<260;i++){
      const age=(frame-(i<190?55:COVER_IMPACT))/24-random(i+7)*.09;
      const speed=7+random(i+9)*9,vz=4+random(i+12)*4;
      const y=(i<190?0:-2)-age*speed,z=.06+vz*age-4.905*age*age;
      const visible=age>0&&z>0&&y>-11;
      const size=visible?.018+random(i+17)*.065:0;
      M.makeRotationX(age*7+i);M.scale(new THREE.Vector3(size,size*.7,size*1.3));M.setPosition((random(i+20)-.5)*2+age*(random(i+24)-.5)*6,y,z);splash.setMatrixAt(i,M);
    }splash.instanceMatrix.needsUpdate=true;
    waterUniforms.uImpactTime.value=(frame-(frame<COVER_IMPACT?55:COVER_IMPACT))/24;
  }

  // ---------------------------------------------------------------- crystal glints
  const glintMat = new THREE.ShaderMaterial({
    uniforms: { uLight: { value: new THREE.Vector3() }, uTime: { value: 0 }, uStrength: { value: 0 }, uScale: { value: 1 } },
    vertexShader: /* glsl */`
      attribute float seed;
      uniform vec3 uLight; uniform float uTime, uStrength, uScale;
      varying float vB;
      void main() {
        vec4 wp = modelMatrix * vec4(position + normal * 0.012, 1.0);
        vec3 n = normalize(mat3(modelMatrix) * normal);
        vec3 h = normalize(normalize(uLight - wp.xyz) + normalize(cameraPosition - wp.xyz));
        float spec = pow(abs(dot(n, h)), 60.0);  // winding is mixed, so either normal sign
        float tw = 0.55 + 0.45 * sin(uTime * (3.0 + seed * 5.0) + seed * 40.0);
        vB = spec * tw * uStrength;
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = vB < 0.02 ? 0.0 : (6.0 + 30.0 * vB) * uScale * (12.0 / -mv.z);
      }`,
    fragmentShader: /* glsl */`
      varying float vB;
      void main() {
        vec2 c = gl_PointCoord - 0.5; float r2 = dot(c, c);
        float core = exp(-r2 * 90.0);
        float rays = max(0.0, 1.0 - abs(c.x) * 16.0) * max(0.0, 1.0 - abs(c.y) * 2.1)
                   + max(0.0, 1.0 - abs(c.y) * 16.0) * max(0.0, 1.0 - abs(c.x) * 2.1);
        float a = (core + rays * 0.55) * vB;
        gl_FragColor = vec4(vec3(0.72, 0.86, 1.0) * a * 2.2, a);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const glintPoints = [];
  const glintsVisible = (v) => glintPoints.forEach((p) => { p.visible = v; });
  {
    const g = S.glints, per = new Map();
    for (let i = 0; i < g.length; i += 7) {
      const o = g[i]; if (!per.has(o)) per.set(o, []);
      per.get(o).push(g[i + 1], g[i + 2], g[i + 3], g[i + 4], g[i + 5], g[i + 6]);
    }
    const owners = [bodyNode, ...pieceNodes];
    for (const [o, arr] of per) {
      const n = arr.length / 6, pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), seed = new Float32Array(n);
      for (let i = 0; i < n; i++) { pos.set(arr.slice(i * 6, i * 6 + 3), i * 3); nor.set(arr.slice(i * 6 + 3, i * 6 + 6), i * 3); seed[i] = Math.random(); }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
      const pts = new THREE.Points(geo, glintMat); pts.frustumCulled = false;
      owners[o].add(pts); glintPoints.push(pts);
    }
  }

  // ---------------------------------------------------------------- volumes (mist + impact dust)
  const quadGeo = new THREE.PlaneGeometry(2, 2);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const volMat = new THREE.ShaderMaterial({
    uniforms: {
      tDepth: { value: null }, uInvProj: { value: new THREE.Matrix4() }, uCamWorld: { value: new THREE.Matrix4() },
      uNear: { value: 0.1 }, uFar: { value: 300 }, uTime: { value: 0 }, uFrame: { value: 1 },
      uFogC: { value: new THREE.Vector3() }, uFogH: { value: new THREE.Vector3().fromArray(S.fog.scale) },
      uFogD: { value: 0 }, uFogW: { value: 0 }, uFogCol: { value: new THREE.Color().setRGB(...S.fog.color) },
      uDustC: { value: new THREE.Vector3() }, uDustH: { value: new THREE.Vector3() }, uDustD: { value: 0 },
      uDustCol: { value: new THREE.Color().setRGB(...S.dust.color) },
      uWake: { value: Array.from({length:12},()=>new THREE.Vector4(0,0,0,0)) },
      uWakeVelocity: { value: Array.from({length:12},()=>new THREE.Vector3()) },
      uMouseO: { value: new THREE.Vector3() }, uMouseD: { value: new THREE.Vector3(0, 1, 0) }, uMouseOn: { value: 0 },
      uKeyP: { value: new THREE.Vector3().fromArray(L['Key softbox'].pos) }, uKeyD: { value: new THREE.Vector3().fromArray(L['Key softbox'].dir) },
      uEdgeP: { value: new THREE.Vector3().fromArray(L['Edge light'].pos) }, uEdgeD: { value: new THREE.Vector3().fromArray(L['Edge light'].dir) },
      uKeyI: { value: L['Key softbox'].energy / Math.PI }, uEdgeI: { value: L['Edge light'].energy / Math.PI },
    },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: /* glsl */`
      #include <packing>
      ${NOISE_GLSL}
      varying vec2 vUv;
      uniform sampler2D tDepth; uniform mat4 uInvProj, uCamWorld; uniform float uNear, uFar, uTime, uFrame;
      uniform vec3 uFogC, uFogH, uFogCol, uDustC, uDustH, uDustCol; uniform float uFogD, uFogW, uDustD;
      uniform vec3 uMouseO, uMouseD; uniform float uMouseOn;
      uniform vec4 uWake[12]; uniform vec3 uWakeVelocity[12];
      uniform vec3 uKeyP, uKeyD, uEdgeP, uEdgeD; uniform float uKeyI, uEdgeI;
      // everything below is in Blender coordinates (Z up)
      vec3 toB(vec3 p) { return vec3(p.x, -p.z, p.y); }
      vec2 box(vec3 ro, vec3 rd, vec3 c, vec3 h) {
        vec3 inv = 1.0 / rd, t0 = (c - h - ro) * inv, t1 = (c + h - ro) * inv;
        vec3 mn = min(t0, t1), mx = max(t0, t1);
        return vec2(max(max(mn.x, mn.y), max(mn.z, 0.0)), min(min(mx.x, mx.y), mx.z));
      }
      float fbm4(vec4 p, float rough) { float a = 1.0, s = 0.0, n = 0.0; for (int i = 0; i < 4; i++) { s += a * snoise(p); n += a; p *= 2.0; a *= rough; } return s / n; }
      float hg(float c, float g) { float g2 = g * g; return (1.0 - g2) / (12.566 * pow(1.0 + g2 - 2.0 * g * c, 1.5)); }
      vec3 light(vec3 p, vec3 rd) {
        vec3 amb = vec3(0.19, 0.22, 0.26);
        vec3 lk = p - uKeyP; float dk = length(lk); lk /= dk;
        vec3 le = p - uEdgeP; float de = length(le); le /= de;
        float ek = uKeyI * max(dot(lk, uKeyD), 0.0) / (dk * dk) * hg(dot(lk, -rd), 0.25);
        float ee = uEdgeI * max(dot(le, uEdgeD), 0.0) / (de * de) * hg(dot(le, -rd), 0.25);
        return (amb + vec3(0.93, 0.97, 1.0) * ek + vec3(0.78, 0.9, 1.0) * ee)*.35;
      }
      float fogDensity(vec3 p) {
        vec3 displaced=p;
        float clearing=1.;
        for(int j=0;j<12;j++){
          vec3 delta=p-uWake[j].xyz;delta.z*=.35;
          float influence=exp(-dot(delta,delta)*1.7)*uWake[j].w;
          displaced-=uWakeVelocity[j]*influence*.8;
          clearing*=1.-influence*.35;
        }
        vec3 o = (p-uFogC)/uFogH;
        vec3 flow=displaced*vec3(.5,.36,1.1)+vec3(sin(uTime*.14)*.25,uTime*.32,0.);
        float n=.5+.5*fbm4(vec4(flow,uTime*.07),.58)*1.5;
        float r=smoothstep(.32,.76,n);
        float h=exp(-max(p.z,0.)*1.45)*smoothstep(-.05,.14,p.z);
        float f=clamp((1.-max(abs(o.x),abs(o.y)))/.2,0.,1.);
        return r*h*f*clearing*uFogD;
      }
      float dustDensity(vec3 p) {
        vec3 o = (p - uDustC) / uDustH;
        float n = 0.5 + 0.5 * fbm4(vec4(o * 3.2 + vec3(0.,uTime*.15,-uTime*.22), uTime * 0.11), 0.5) * 1.35;
        float r = clamp((n - 0.43) / 0.29, 0.0, 1.0);
        float f = clamp((1.0 - length(o)) / 0.8, 0.0, 1.0);
        return r * f * uDustD;
      }
      void main() {
        vec4 v = uInvProj * vec4(vUv * 2.0 - 1.0, 1.0, 1.0); vec3 dv = normalize(v.xyz / v.w);
        float depth = texture2D(tDepth, vUv).x;
        float tMax = perspectiveDepthToViewZ(depth, uNear, uFar) / dv.z;
        vec3 ro = toB((uCamWorld * vec4(0.0, 0.0, 0.0, 1.0)).xyz);
        vec3 rd = normalize(toB((uCamWorld * vec4(dv, 0.0)).xyz));
        vec3 col = vec3(0.0); float T = 1.0;
        float jit = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        if (uFogD > 0.0) {
          vec2 t = box(ro, rd, uFogC, uFogH); t.y = min(t.y, tMax);
          if (t.y > t.x) {
            const int N = 28; float ds = (t.y - t.x) / float(N);
            for (int i = 0; i < N; i++) {
              vec3 p = ro + rd * (t.x + (float(i) + jit) * ds);
              float d = fogDensity(p);
              if (d > 0.001) { col += T * uFogCol * light(p, rd) * d * ds; T *= exp(-d * ds); }
              if (T < 0.02) break;
            }
          }
        }
        if (uDustD > 0.0) {
          vec2 t = box(ro, rd, uDustC, uDustH); t.y = min(t.y, tMax);
          if (t.y > t.x) {
            const int N = 20; float ds = (t.y - t.x) / float(N);
            for (int i = 0; i < N; i++) {
              vec3 p = ro + rd * (t.x + (float(i) + jit) * ds);
              float d = dustDensity(p);
              if (d > 0.001) { col += T * uDustCol * light(p, rd) * d * ds; T *= exp(-d * ds); }
              if (T < 0.02) break;
            }
          }
        }
        gl_FragColor = vec4(col, T);
      }`,
    depthTest: false, depthWrite: false,
  });
  const volQuad = new THREE.Mesh(quadGeo, volMat); volQuad.frustumCulled = false;
  const volScene = new THREE.Scene(); volScene.add(volQuad);

  const compMat = new THREE.ShaderMaterial({
    uniforms: { tScene: { value: null }, tVol: { value: null }, uVolOn: { value: 0 }, tForest:{value:forestTexture},uBackgroundScale:{value:new THREE.Vector2(1,1)} },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: /* glsl */`
      varying vec2 vUv; uniform sampler2D tScene, tVol,tForest; uniform vec2 uBackgroundScale; uniform float uVolOn;
      void main() {
        vec4 surface=texture2D(tScene,vUv);
        vec3 bg=vec3(.002,.008,.009);
        // Restrained wet-floor reflection beneath the contact area.
        float wet=clamp((.32-vUv.y)*5.,0.,1.)*exp(-max(0.,.32-vUv.y)*9.);
        vec2 reflectUv=vec2(vUv.x+sin(vUv.y*170.)*.001, .64-vUv.y);
        vec4 reflected=texture2D(tScene,reflectUv);
        // Full 3D water surface supplies its own highlights. No photographic plate.
        vec3 s=surface.rgb+bg*(1.-surface.a);
        vec4 v = uVolOn > 0.5 ? texture2D(tVol, vUv) : vec4(0.0, 0.0, 0.0, 1.0);
        vec3 image=s*v.a+v.rgb;
        image*=1.-.2*smoothstep(.22,.8,length(vUv-.5));
        gl_FragColor=vec4(image,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    depthTest: false, depthWrite: false,
  });
  const compQuad = new THREE.Mesh(quadGeo, compMat); compQuad.frustumCulled = false;
  const compScene = new THREE.Scene(); compScene.add(compQuad);

  // Colour pass is multisampled; volumes read a separate half-res depth pass (a depth texture on
  // a multisampled target broke depth testing).
  let sceneRT, volRT, depthRT;
  const depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false });
  function makeTargets(w, h) {
    sceneRT?.dispose(); volRT?.dispose(); depthRT?.dispose();
    const hw = Math.ceil(w / 2), hh = Math.ceil(h / 2);
    sceneRT = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: 4 });
    volRT = new THREE.WebGLRenderTarget(hw, hh, { type: THREE.HalfFloatType });
    depthRT = new THREE.WebGLRenderTarget(hw, hh, { depthTexture: new THREE.DepthTexture(hw, hh) });
    volMat.uniforms.tDepth.value = depthRT.depthTexture;
    compMat.uniforms.tScene.value = sceneRT.texture; compMat.uniforms.tVol.value = volRT.texture;
  }

  // ---------------------------------------------------------------- sizing (+ adaptive resolution)
  const maxDpr = Math.min(window.devicePixelRatio || 1, innerWidth < 820 ? 1.25 : 1.5);
  let dpr = maxDpr;
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight, aspect = w / h;
    const imageAspect=forestTexture.image.width/forestTexture.image.height;
    compMat.uniforms.uBackgroundScale.value.set(Math.min(1,aspect/imageAspect),Math.min(1,imageAspect/aspect));
    renderer.setPixelRatio(dpr); renderer.setSize(w, h, false);
    makeTargets(Math.round(w * dpr), Math.round(h * dpr));
    // wide screens keep Blender's horizontal framing; tall screens widen so the geode and the
    // sliding pieces stay in view
    const t = THREE.MathUtils.clamp((aspect - 0.6) / 1.0, 0, 1);
    const hfov = THREE.MathUtils.lerp(0.5, HFOV, t);
    const vfov = Math.max(2 * Math.atan(Math.tan(hfov / 2) / aspect), THREE.MathUtils.degToRad(30));
    camera.fov = THREE.MathUtils.radToDeg(vfov); camera.aspect = aspect; camera.updateProjectionMatrix();
    glintMat.uniforms.uScale.value = dpr * h / 900;
  }
  addEventListener('resize', resize);
  resize();

  // ---------------------------------------------------------------- input
  let wakeIndex=0,wakeClock=0,previousMx=0,previousMy=0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, lastInput: -1e9, active: 0 };
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    pointer.tx = (e.clientX / innerWidth) * 2 - 1; pointer.ty = -((e.clientY / innerHeight) * 2 - 1);
    pointer.lastInput = performance.now();
  }, { passive: true });
  addEventListener('pointerleave', () => { pointer.lastInput = -1e9; });
  let gyro = false;
  const onOrient = (e) => {
    if (e.gamma == null) return;
    gyro = true; pointer.tx = THREE.MathUtils.clamp(e.gamma / 30, -1, 1); pointer.ty = THREE.MathUtils.clamp((45 - e.beta) / 30, -1, 1);
    pointer.lastInput = performance.now();
  };
  if (typeof DeviceOrientationEvent !== 'undefined') {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      addEventListener('touchend', () => DeviceOrientationEvent.requestPermission().then((s) => s === 'granted' && addEventListener('deviceorientation', onOrient)).catch(() => {}), { once: true });
    } else addEventListener('deviceorientation', onOrient);
  }

  // ---------------------------------------------------------------- per-frame update
  const M = new THREE.Matrix4(), R = new THREE.Matrix4(), T1 = new THREE.Matrix4(), T2 = new THREE.Matrix4();
  const camRight = new THREE.Vector3(), ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let shadowsDone = false;
  const smooth = (e0, e1, x) => { const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };

  function update(frame, time, dt) {
    // input smoothing; idle → gentle auto-motion
    const idle = time * 1000 - pointer.lastInput > 4000 && !gyro;
    const tx = DEBUG_MOUSE ? DEBUG_MOUSE[0] : idle ? Math.sin(time * 0.35) * 0.45 : pointer.tx;
    const ty = DEBUG_MOUSE ? DEBUG_MOUSE[1] : idle ? Math.sin(time * 0.23) * 0.3 : pointer.ty;
    const k = DEBUG_MOUSE ? 1 : 1 - Math.exp(-dt * 3.5);
    pointer.x += (tx - pointer.x) * k; pointer.y += (ty - pointer.y) * k;
    pointer.active += ((idle && !DEBUG_MOUSE ? 0.35 : 1) - pointer.active) * k;
    const mx = REDUCED ? 0 : pointer.x, my = REDUCED ? 0 : pointer.y;
    const rf = smooth(REVEAL_FRAME, REVEAL_FRAME + 20, frame);

    // camera parallax around the Blender look-at point
    camRight.setFromMatrixColumn(camBase, 0);
    T1.makeTranslation(camTarget.x, camTarget.y, camTarget.z); T2.makeTranslation(-camTarget.x, -camTarget.y, -camTarget.z);
    R.makeRotationZ(-mx * THREE.MathUtils.degToRad(3.2)).multiply(M.makeRotationAxis(camRight, my * THREE.MathUtils.degToRad(2)));
    camera.matrix.copy(T1).multiply(R).multiply(T2).multiply(camBase);
    const impactSeconds=(frame-55)/24,coverSeconds=(frame-COVER_IMPACT)/24;
    const kick=t=>t<0?0:Math.exp(-t*9)*Math.sin(t*58);
    if(!REDUCED){camera.matrix.elements[12]+=.028*kick(impactSeconds)+.012*kick(coverSeconds);camera.matrix.elements[14]+=.022*kick(impactSeconds);}

    camera.matrixWorldNeedsUpdate = true;

    // animated meshes
    for (let o = 0; o < animated.length; o++) { sampleMatrix(o, frame, animated[o].matrix); animated[o].matrixWorldNeedsUpdate = true; }
    // A continuous shell seals the cavity during the drop. Fragments take over only as it opens.
    const baseZ=tracks[0][54].p.z;
    if(frame<55){
      const fall=THREE.MathUtils.clamp((frame-24)/31,0,1);
      const height=7*(1-fall*fall),correction=baseZ+height-bodyNode.matrix.elements[14];
      for(const obj of animated)obj.matrix.elements[14]+=correction;
    }
    // Slow initial peel, then increasing angular velocity under gravity.
    const peel=THREE.MathUtils.clamp((frame-COVER_START)/(COVER_IMPACT-COVER_START),0,1);
    const coverFrame=70+20*Math.pow(peel,2.15);
    closedRock.visible=frame<=COVER_START;
    closedRock.matrix.copy(bodyNode.matrix);closedRock.matrixWorldNeedsUpdate=true;
    bodyNode.visible=frame>COVER_START;
    intact.visible=frame>COVER_START&&frame<COVER_IMPACT;
    // Existing piece track and its frame70 inverse recover the exact intact-cap transform.
    const atClosed=sampleMatrix(2,70,new THREE.Matrix4());
    const bodyClosed=sampleMatrix(0,70,new THREE.Matrix4());
    const capStart=bodyClosed.clone().multiply(intactRelative);
    const capEnd=sampleMatrix(2,90,new THREE.Matrix4()).multiply(atClosed.invert()).multiply(capStart);
    const cp=new THREE.Vector3(),cq=new THREE.Quaternion(),cs=new THREE.Vector3(),ep=new THREE.Vector3(),eq=new THREE.Quaternion(),es=new THREE.Vector3();
    capStart.decompose(cp,cq,cs);capEnd.decompose(ep,eq,es);cp.lerp(ep,peel*peel);cq.slerp(eq,peel*peel);intact.matrix.compose(cp,cq,cs);
    intact.matrixWorldNeedsUpdate=true;
    for(let i=0;i<pieceNodes.length;i++){
      const piece=pieceNodes[i];piece.visible=frame>COVER_START;
      if(frame>COVER_START&&frame<COVER_IMPACT){const delta=intact.matrix.clone().multiply(capStart.clone().invert());sampleMatrix(i+2,70,piece.matrix);piece.matrix.premultiply(delta);piece.matrixWorldNeedsUpdate=true;}
      if(frame>=COVER_IMPACT){
        const fi=Math.min(frame-COVER_IMPACT,physicalTracks.length-1),f0=Math.floor(fi),f1=Math.min(f0+1,physicalTracks.length-1);
        const a=physicalTracks[f0][i],b=physicalTracks[f1][i];
        _p.lerpVectors(a.p,b.p,fi-f0);_q.slerpQuaternions(a.q,b.q,fi-f0);_s.lerpVectors(a.s,b.s,fi-f0);
        piece.matrix.compose(_p,_q,_s);piece.matrixWorldNeedsUpdate=true;
        // Forward impact impulse with friction deceleration; collision/tumble from Blender bake.
        const t=(frame-COVER_IMPACT)/24,stop=1.45,speed=2.4+(i%4)*.28;
        const travel=speed*(Math.min(t,stop)-Math.min(t,stop)**2/(2*stop));
        piece.matrix.elements[13]-=travel;
        piece.matrix.elements[12]+=(i%2?1:-1)*travel*(.1+(i%3)*.06);
      }
    }
    gemNode.visible=peel>.18&&!params.has('nogem');
    if(frame<184||!shadowsDone){renderer.shadowMap.needsUpdate=true;shadowsDone=frame>=184;}

    // sapphire tilts towards the pointer after the reveal
    if (rf > 0) {
      const c = new THREE.Vector3().setFromMatrixPosition(gemNode.matrix);
      T1.makeTranslation(c.x, c.y, c.z); T2.makeTranslation(-c.x, -c.y, -c.z);
      R.makeRotationZ(mx * 0.26 * rf).multiply(M.makeRotationX(-my * 0.18 * rf));
      gemNode.matrix.premultiply(T2).premultiply(R).premultiply(T1);
    }

    // sand
    const x = Math.min(Math.max(frame - 1, 0), NF - 1), i0 = Math.floor(x), i1 = Math.min(i0 + 1, NF - 1), a = x - i0;
    for (let i = 0; i < NS; i++) {
      const b0 = i0 * stride + NM * 16 + i * 4, b1 = i1 * stride + NM * 16 + i * 4;
      const s = (A[b0 + 3] + (A[b1 + 3] - A[b0 + 3]) * a)*.36;
      M.makeScale(s, s, s).setPosition(A[b0] + (A[b1] - A[b0]) * a, A[b0 + 1] + (A[b1 + 1] - A[b0 + 1]) * a, A[b0 + 2] + (A[b1 + 2] - A[b0 + 2]) * a);
      sand.setMatrixAt(i, M);
    }
    sand.instanceMatrix.needsUpdate = true;
    for(let i=0;i<grainCount;i++){
      const g=grainData[i],t=(frame-g.start-(i>=1250?24:0))/24,originY=i<1250?0:-2;
      const flight=2*g.vz/9.81,ft=Math.max(0,Math.min(t,flight));
      const slide=Math.max(0,t-flight),drag=1-Math.exp(-slide*3.8);
      const distance=g.r+g.speed*ft+g.speed*.12*drag;
      grainPositions[i*3]=Math.cos(g.angle)*distance;
      grainPositions[i*3+1]=originY+Math.sin(g.angle)*distance-(i>=1250?distance*.55:0);
      grainPositions[i*3+2]=t<0?-10:Math.max(.008,g.vz*ft-4.905*ft*ft)+ (slide>0?.055*Math.exp(-slide*9)*Math.abs(Math.sin(slide*24)):0);
    }
    grainGeo.attributes.position.needsUpdate=true;

    // reveal light: Blender ramp, then follows the pointer
    reveal.intensity = curve('spot_energy', frame-24) / (4 * Math.PI);
    reveal.position.copy(revealBase).add(new THREE.Vector3(mx * 2.4 * rf, 0, my * 1.7 * rf));
    const lightWorld = reveal.getWorldPosition(new THREE.Vector3());
    glintMat.uniforms.uLight.value.copy(lightWorld);
    glintMat.uniforms.uTime.value = REDUCED ? 0 : time;
    glintMat.uniforms.uStrength.value = smooth(104, 142, frame) * (0.8 + 0.4 * pointer.active);

    // volumes
    const u = volMat.uniforms;
    const flowTime=REDUCED?0:time;
    u.uFogD.value=.045+.018*Math.sin(flowTime*.24)+.012*Math.sin(flowTime*.67+1.2);
    u.uFogW.value=flowTime*.07;
    u.uFogC.value.set(0,-2,1.2);u.uFogH.value.set(9,10,2.2);
    const age=(frame-55)/24,second=(frame-COVER_IMPACT)/24;
    const burst=t=>t<0?0:Math.exp(-t*1.15)*(1-Math.exp(-t*14));
    u.uDustD.value=burst(age)*.23+burst(second)*.16;
    const dustAge=second>=0?second:Math.max(0,age);
    u.uDustC.value.set(0,second>=0?-2.2:0,.24+dustAge*.3);
    u.uDustH.value.set(1.3+dustAge*2.4,1.3+dustAge*2.8,.4+dustAge*.48);
    u.uFrame.value = frame; u.uTime.value = flowTime;
    ndc.set(mx, my); scene.updateMatrixWorld(); ray.setFromCamera(ndc, camera);
    const o = ray.ray.origin, d = ray.ray.direction;
    u.uMouseO.value.set(o.x, -o.z, o.y); u.uMouseD.value.set(d.x, -d.z, d.y);
    u.uMouseOn.value = REDUCED ? 0 : pointer.active;
    const velocity=new THREE.Vector3((mx-previousMx)/Math.max(dt,.008)*2.4,0,(my-previousMy)/Math.max(dt,.008));
    velocity.clampLength(0,5);previousMx=mx;previousMy=my;
    for(let i=0;i<12;i++){u.uWake.value[i].w*=Math.exp(-dt*1.1);u.uWake.value[i].x+=u.uWakeVelocity.value[i].x*dt*.3;u.uWake.value[i].y-=dt*.25;}
    wakeClock+=dt;
    if(!REDUCED&&!idle&&velocity.length()>.07&&wakeClock>.045){
      const distance=THREE.MathUtils.clamp((.65-u.uMouseO.value.z)/(Math.abs(u.uMouseD.value.z)<.001?-.001:u.uMouseD.value.z),2,18);
      const hit=u.uMouseO.value.clone().addScaledVector(u.uMouseD.value,distance);
      u.uWake.value[wakeIndex].set(hit.x,hit.y,hit.z,Math.min(1,velocity.length()*.5));
      u.uWakeVelocity.value[wakeIndex].copy(velocity);wakeIndex=(wakeIndex+1)%12;wakeClock=0;
    }
    optics.update();updateSplash(frame);waterUniforms.uWaterTime.value=REDUCED?0:time;
    window.__heroDiagnostics={facetPlanes:optics.planeCount,intactCover:closedRock.visible,coverPeel:peel,fragments:pieceNodes.filter(p=>p.visible).length,mistDensity:u.uFogD.value,wakeEnergy:u.uWake.value.reduce((a,w)=>a+w.w,0),dustDensity:u.uDustD.value};
    return u.uFogD.value > 0 || u.uDustD.value > 0;
  }

  function render(volOn) {
    renderer.setRenderTarget(sceneRT); renderer.render(scene, camera);
    if (volOn) {
      const bg = scene.background; scene.background = new THREE.Color(0x021317);
  scene.fog=new THREE.FogExp2(0x03191e,.055); scene.overrideMaterial = depthOnly;
      glintsVisible(false); renderer.setRenderTarget(depthRT); renderer.render(scene, camera); glintsVisible(true);
      scene.overrideMaterial = null; scene.background = bg;
      const u = volMat.uniforms;
      u.uInvProj.value.copy(camera.projectionMatrixInverse); u.uCamWorld.value.copy(camera.matrixWorld);
      u.uNear.value = camera.near; u.uFar.value = camera.far;
      renderer.setRenderTarget(volRT); renderer.render(volScene, quadCam);
    }
    compMat.uniforms.uVolOn.value = volOn ? 1 : 0;
    renderer.setRenderTarget(null); renderer.render(compScene, quadCam);
  }

  // ---------------------------------------------------------------- run
  await renderer.compileAsync(scene, camera);
  let start = null, last = performance.now(), slow = 0, fast = 0, frames = 0, fpsEma = 60, frameNow = 1;
  body.classList.add('is-live', 'is-intro');
  if (REDUCED) body.classList.add('is-revealed');

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1); last = now;
    fpsEma += ((dt > 0 ? 1 / dt : 60) - fpsEma) * 0.05; window.__heroStats = { fps: Math.round(fpsEma), dpr, frame: Math.round(frameNow) };
    if (start === null) start = now;
    const t = (now - start) / 1000;
    const frame = DEBUG_FRAME ?? (REDUCED ? NF : Math.min(1 + t * S.fps, NF));
    frameNow = frame;
    if (frame >= REVEAL_FRAME) body.classList.add('is-revealed');
    render(update(frame, now / 1000, dt));
    window.__mudLensCount=lens.update(DEBUG_FRAME!==null?(DEBUG_FRAME-1)/S.fps:t);
    // adaptive resolution: drop pixel ratio if the device can't hold ~40 fps
    if (!DEBUG_FRAME && !params.has('fixeddpr') && ++frames > 30) {
      slow = dt > 0.026 ? slow + 1 : Math.max(0, slow - 1);
      fast = dt < 0.021 ? fast + 1 : Math.max(0, fast - 3);
      if (slow > 45 && dpr > 0.75) { dpr = Math.max(0.75, dpr - 0.2); slow = 0; fast = 0; resize(); }
      // recover once the heavy mist/dust frames are over and the device is keeping up again
      else if (fast > 150 && dpr < maxDpr) { dpr = Math.min(maxDpr, dpr + 0.1); fast = 0; resize(); }
    }
    if (DEBUG_FRAME !== null && !window.__heroReady && now - start > 1800) window.__heroReady = true;  // after the poster cross-fade
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
