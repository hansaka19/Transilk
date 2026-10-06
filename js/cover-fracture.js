import * as THREE from 'three';

// The front half of the geode as one slab of fragments: it topples about its lower front edge
// (rigid-body pendulum, so it starts reluctantly and accelerates), slams onto the mud, breaks,
// and each fragment inherits the slab's real velocity at that point, bounces, skids with Coulomb
// friction, collides with its neighbours and settles onto its nearest stable face.
// Everything is precomputed at a fixed 240 Hz step, so playback is identical at any frame rate.
export function createCoverFracture(group, tracks, { releaseFrame = 62, impactFrame = 82, groundY = -.095 } = {}) {
  const G = 9.81, dt = 1 / 240, fps = 24, SIM_SECONDS = 4.5, steps = Math.ceil(SIM_SECONDS / dt);
  const bodies = [], assembly = new THREE.Box3(), v = new THREE.Vector3();
  const rng = i => THREE.MathUtils.euclideanModulo(Math.sin(i * 91.73 + 8.19) * 43758.5453, 1);

  // ---------------------------------------------------------------- fragments as rigid bodies
  for (const node of [...group.children]) {
    const track = tracks[node.name] ?? tracks[node.name.replace(/\d{3}$/, '')];
    if (!track) continue;
    const pose = track[releaseFrame - 1], matrix = new THREE.Matrix4().compose(pose.p, pose.q, pose.s);
    const meshes = []; node.traverse(o => { if (o.isMesh) meshes.push(o); });
    const bounds = new THREE.Box3();
    for (const mesh of meshes) { const geo = mesh.geometry.clone().applyMatrix4(matrix); geo.computeBoundingBox(); bounds.union(geo.boundingBox); mesh.geometry = geo; }
    const center = bounds.getCenter(new THREE.Vector3()); assembly.union(bounds);
    const support = [], breakDir = new THREE.Vector3();
    for (const mesh of meshes) {
      const geo = mesh.geometry; geo.translate(-center.x, -center.y, -center.z);
      if (mesh !== node) { mesh.position.set(0, 0, 0); mesh.quaternion.identity(); mesh.scale.setScalar(1); }
      const p = geo.attributes.position, step = Math.max(1, Math.floor(p.count / 60));
      for (let i = 0; i < p.count; i += step) support.push(new THREE.Vector3().fromBufferAttribute(p, i));
      for (let axis = 0; axis < 3; axis++) for (const sign of [-1, 1]) {
        let best = 0; for (let i = 1; i < p.count; i++) if (sign * p.array[i * 3 + axis] > sign * p.array[best * 3 + axis]) best = i;
        support.push(new THREE.Vector3().fromBufferAttribute(p, best));
      }
      // direction of the broken (agate) faces, used to prefer resting with the cross-section up
      const ms = Array.isArray(mesh.material) ? mesh.material : [mesh.material], nn = geo.attributes.normal;
      if (nn && ms.some(m => m.name.includes('broken'))) {
        const groups = geo.groups.length ? geo.groups : [{ start: 0, count: geo.index ? geo.index.count : nn.count, materialIndex: 0 }];
        for (const gr of groups) if ((ms[gr.materialIndex] || ms[0]).name.includes('broken'))
          for (let k = gr.start; k < gr.start + gr.count; k += 3) { const vi = geo.index ? geo.index.getX(k) : k; breakDir.x += nn.getX(vi); breakDir.y += nn.getY(vi); breakDir.z += nn.getZ(vi); }
      }
    }
    if (breakDir.lengthSq() > 1e-9) breakDir.normalize();
    node.position.copy(center); node.quaternion.identity(); node.scale.setScalar(1);
    const size = bounds.getSize(new THREE.Vector3());
    let r = 0; for (const s of support) r = Math.max(r, Math.hypot(s.x, s.z));
    bodies.push({ mesh: node, center, support, breakDir, radius: Math.min(r, size.length() * .38),
      mass: Math.max(1e-4, size.x * size.y * size.z), extent: size.length(), states: [] });
  }

  // ---------------------------------------------------------------- 1. topple: rigid slab about its lower front edge
  const pivot = new THREE.Vector3(assembly.getCenter(new THREE.Vector3()).x, assembly.min.y, assembly.max.z);
  const axis = new THREE.Vector3(1, 0, 0), endAngle = Math.PI / 2;
  const L = assembly.getSize(new THREE.Vector3()).y;           // slab height
  // θ'' = (3g / 2L) sin θ  — thin slab pivoting on its edge, released from a slight lean
  const curve = [0]; { let th = .03, om = 0; const h = 1 / 2000; let t = 0;
    while (th < endAngle) { om += 1.5 * G / L * Math.sin(th) * h; th += om * h; t += h; curve.push(Math.min(endAngle,th)); }
    curve.duration = t; curve.omega = om; }
  const topple = u => { const i = THREE.MathUtils.clamp(u, 0, 1) * (curve.length - 1), a = Math.floor(i); return curve[a] + (curve[Math.min(a + 1, curve.length - 1)] - curve[a]) * (i - a); };
  // the real topple takes curve.duration; the release→impact window sets the playback rate
  const timeScale = curve.duration / ((impactFrame - releaseFrame) / fps);
  const omega = curve.omega * timeScale;                      // angular speed at impact in playback time
  const qEnd = new THREE.Quaternion().setFromAxisAngle(axis, endAngle);
  const low = (b, q) => { let y = Infinity; for (const p of b.support) y = Math.min(y, v.copy(p).applyQuaternion(q).y); return y; };
  let impactLow = Infinity;
  for (const b of bodies) { b.hit = b.center.clone().sub(pivot).applyQuaternion(qEnd).add(pivot); impactLow = Math.min(impactLow, b.hit.y + low(b, qEnd)); }
  const lift = groundY - impactLow;

  // ---------------------------------------------------------------- 2. break-up and debris dynamics (all bodies together)
  const slabCenter = new THREE.Vector3(); for (const b of bodies) slabCenter.add(b.hit); slabCenter.divideScalar(bodies.length || 1);
  const omegaVec = axis.clone().multiplyScalar(omega);
  const S = bodies.map((b, i) => {
    const p = b.hit.clone(); p.y += lift;
    const vel = omegaVec.clone().cross(b.hit.clone().sub(pivot));          // velocity of this point of the slab at impact
    // impact energy throws pieces outward from the centre of the slab, smaller pieces faster
    const out = p.clone().sub(slabCenter); out.y = 0; if (out.lengthSq() < 1e-8) out.set(rng(i) - .5, 0, rng(i + 3) - .5); out.normalize();
    const small = THREE.MathUtils.clamp(.25 / b.extent, .6, 1.4);
    vel.addScaledVector(out, (.35 + rng(i + 5) * .55) * small);
    vel.z += (.15 + rng(i + 7) * .35) * small;                              // slab was falling toward the viewer
    const spin = new THREE.Vector3((rng(i + 9) - .5) * 6, (rng(i + 11) - .5) * 4, (rng(i + 14) - .5) * 6).multiplyScalar(small).add(omegaVec.clone().multiplyScalar(.35));
    return { b, p, q: qEnd.clone(), vel, spin, rest: null, contacts: 0, asleep: false };
  });
  const mu = .55, restitution = .22, angDamp = 2.2;
  const tmpQ = new THREE.Quaternion();
  function stableFace(s) {                                     // nearest low, stable orientation to the current one
    let best = s.q.clone(), bestScore = Infinity;
    const showFace = s.b.breakDir.lengthSq() > 0;
    for (let k = 0; k < 48; k++) {
      const c = new THREE.Quaternion().setFromEuler(new THREE.Euler(rng(k * 3.1 + 81) * Math.PI * 2, rng(k * 7.3 + 141) * Math.PI * 2, rng(k * 5.7 + 191) * Math.PI * 2));
      let lo = Infinity, hi = -Infinity; for (const p of s.b.support) { const y = v.copy(p).applyQuaternion(c).y; lo = Math.min(lo, y); hi = Math.max(hi, y); }
      // keep the current heading: rotate the candidate about Y so it differs from s.q as little as possible
      const up = showFace ? v.copy(s.b.breakDir).applyQuaternion(c).y : 0;
      const score = (hi - lo) / s.b.extent + (1 - Math.abs(c.dot(s.q))) * .8 - up * .25;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    return best;
  }
  for (let step = 0; step < steps; step++) {
    for (const s of S) s.b.states.push({ p: s.p.clone(), q: s.q.clone() });
    for (const s of S) {
      if (s.asleep) continue;
      s.vel.y -= G * dt; s.vel.multiplyScalar(Math.exp(-.08 * dt));                      // gravity + air drag
      s.p.addScaledVector(s.vel, dt);
      const w = s.spin.length(); if (w > 1e-6) s.q.premultiply(tmpQ.setFromAxisAngle(v.copy(s.spin).divideScalar(w), w * dt)).normalize();
      const pen = groundY - (s.p.y + low(s.b, s.q));
      if (pen > 0) {
        s.p.y += pen; s.contacts++;
        if (s.vel.y < 0) s.vel.y = -s.vel.y * (s.contacts < 3 ? restitution : 0);
        // Coulomb friction in the mud: decelerate by μg, never reverse
        const hs = Math.hypot(s.vel.x, s.vel.z), dv = mu * G * dt;
        const k = hs > dv ? (hs - dv) / hs : 0; s.vel.x *= k; s.vel.z *= k;
        s.spin.multiplyScalar(Math.exp(-angDamp * 4 * dt));
        // rolling contact: tip toward the nearest stable face, faster as the piece slows down
        if (!s.rest && s.contacts > 4) s.rest = stableFace(s);
        if (s.rest) { s.q.slerp(s.rest, 1 - Math.exp(-(2 + 6 / (1 + hs * 8)) * dt)); s.p.y=Math.max(s.p.y,groundY-low(s.b,s.q)); }
        if (hs < .01 && s.spin.length() < .05 && s.contacts > 30) { s.vel.set(0, 0, 0); s.spin.set(0, 0, 0); if (s.rest) s.q.copy(s.rest); s.p.y = groundY - low(s.b, s.q); s.asleep = true; }
      } else s.spin.multiplyScalar(Math.exp(-.3 * dt));
    }
    // fragment–fragment contact: push overlapping pieces apart in the ground plane, exchange momentum
    for (let i = 0; i < S.length; i++) for (let j = i + 1; j < S.length; j++) {
      const a = S[i], c = S[j], dx = c.p.x - a.p.x, dz = c.p.z - a.p.z, d = Math.hypot(dx, dz), min = (a.b.radius + c.b.radius) * .62;
      if (d >= min || d < 1e-6 || Math.abs(c.p.y - a.p.y) > min) continue;
      const nx = dx / d, nz = dz / d, over = min - d, wa = c.b.mass / (a.b.mass + c.b.mass), wc = 1 - wa;
      if (!a.asleep) { a.p.x -= nx * over * wa; a.p.z -= nz * over * wa; }
      if (!c.asleep) { c.p.x += nx * over * wc; c.p.z += nz * over * wc; }
      const rel = (c.vel.x - a.vel.x) * nx + (c.vel.z - a.vel.z) * nz;
      if (rel < 0) { const jimp = -(1 + .2) * rel; if (!a.asleep) { a.vel.x -= nx * jimp * wa; a.vel.z -= nz * jimp * wa; } if (!c.asleep) { c.vel.x += nx * jimp * wc; c.vel.z += nz * jimp * wc; } }
    }
  }

  const q = new THREE.Quaternion();
  function update(frame) {
    if (frame < impactFrame) {
      const u = THREE.MathUtils.clamp((frame - releaseFrame) / (impactFrame - releaseFrame), 0, 1);
      const th = topple(u), f = th / endAngle; q.setFromAxisAngle(axis, th);
      for (const b of bodies) { b.mesh.position.copy(b.center).sub(pivot).applyQuaternion(q).add(pivot); b.mesh.position.y += lift * f; b.mesh.quaternion.copy(q); }
    } else {
      const x = Math.min(steps - 1, (frame - impactFrame) / fps / dt), a = Math.floor(x), t = x - a;
      for (const b of bodies) { const s = b.states[a], e = b.states[Math.min(a + 1, steps - 1)]; b.mesh.position.copy(s.p).lerp(e.p, t); b.mesh.quaternion.copy(s.q).slerp(e.q, t); }
    }
  }
  function exportFrames(){const data={fps,releaseFrame,impactFrame,objects:bodies.map(b=>({name:b.mesh.name,frames:[]}))};
    for(let frame=releaseFrame;frame<=168;frame++){update(frame);bodies.forEach((b,i)=>{b.mesh.updateMatrix();data.objects[i].frames.push({frame,matrix:b.mesh.matrix.clone().multiply(new THREE.Matrix4().makeTranslation(-b.center.x,-b.center.y,-b.center.z)).toArray()});});}return data;}
  return { update, exportFrames, diagnostics: frame => ({ pieces: bodies.length, phase: frame < releaseFrame ? 'sealed' : frame < impactFrame ? 'toppling' : 'debris', impactFrame, groundY,
    toppleSeconds: curve.duration, impactOmega: omega }) };
}
