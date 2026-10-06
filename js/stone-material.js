import * as THREE from 'three';
import { NOISE_GLSL } from './noise.js';

// Photo-scanned basalt (Poly Haven "dark_rock", CC0) projected triplanar in object space, with a
// height-derived bump. Broken geode faces additionally read the per-vertex `_depth` (0 = outer
// rind, 1 = cavity wall) and draw the real cross-section per pixel: basalt rind, a thin dark skin,
// fine concentric agate bands and a sparkling quartz crust.
const loader = new THREE.TextureLoader();
// Phones get the 1k scans: two 4k textures alone are ~170 MB of GPU memory, enough for iOS Safari to kill the tab.
const RES = matchMedia('(pointer: coarse)').matches || Math.min(screen.width, screen.height) < 820 ? '1k' : '4k';
let tex, ready = Promise.resolve();
export const stoneTexturesReady = () => ready;   // resolves once the rock textures have decoded
function textures(renderer) {
  if (tex) return tex;
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  let n = 0, done; ready = new Promise(r => { done = r; }); const ok = () => { if (++n === 2) done(); };
  const diff = loader.load(`assets/realtime/tex/dark_rock_diff_${RES}.jpg`, ok, undefined, ok), disp = loader.load(`assets/realtime/tex/dark_rock_disp_${RES}.jpg`, ok, undefined, ok);
  diff.colorSpace = THREE.SRGBColorSpace;
  for (const t of [diff, disp]) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = aniso; }
  return (tex = { diff, disp });
}

const COMMON = /* glsl */`
  uniform sampler2D uRockDiff, uRockDisp; uniform float uRockScale, uBump;
  varying vec3 vObjPos, vObjN;
  vec3 triW(){ vec3 w = pow(abs(normalize(vObjN)), vec3(4.)); return w / (w.x + w.y + w.z); }
  vec4 tri(sampler2D s, vec3 p){ vec3 w = triW();
    return texture2D(s, p.zy) * w.x + texture2D(s, p.xz) * w.y + texture2D(s, p.xy) * w.z; }
  varying vec3 vNM0, vNM1, vNM2;
  // Height gradient taken from the filtered texture itself (no screen-space derivatives -> no jaggies),
  // projected per triplanar plane in object space, then rotated into view space.
  vec3 triBump(vec3 p, float k){
    vec3 n = normalize(vObjN), w = triW(); float e = 1. / 4096.;
    #define H(uv) texture2D(uRockDisp, uv).r
    vec2 a = p.zy, b = p.xz, c = p.xy;
    vec2 gx = vec2(H(a + vec2(e, 0.)) - H(a - vec2(e, 0.)), H(a + vec2(0., e)) - H(a - vec2(0., e)));
    vec2 gy = vec2(H(b + vec2(e, 0.)) - H(b - vec2(e, 0.)), H(b + vec2(0., e)) - H(b - vec2(0., e)));
    vec2 gz = vec2(H(c + vec2(e, 0.)) - H(c - vec2(e, 0.)), H(c + vec2(0., e)) - H(c - vec2(0., e)));
    vec3 g = w.x * vec3(0., gx.y, gx.x) + w.y * vec3(gy.x, 0., gy.y) + w.z * vec3(gz.x, gz.y, 0.);
    vec3 on = normalize(n - k * 4. * (g - n * dot(g, n)));
    return normalize(mat3(vNM0, vNM1, vNM2) * on);
  }
`;

function install(material, renderer, { scale = 2.6, bump = 9., broken = false, tint } = {}) {
  const { diff, disp } = textures(renderer);
  const uniforms = { uRockDiff: { value: diff }, uRockDisp: { value: disp }, uRockScale: { value: scale }, uBump: { value: bump },
    uTint: { value: tint ?? material.color.clone() } };
  material.vertexColors = false; material.color.setRGB(1, 1, 1); material.metalness = 0;
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\nattribute vec3 rockRestPosition; varying vec3 vObjPos, vObjN, vNM0, vNM1, vNM2;${broken ? '\nattribute float _depth; varying float vDepth;' : ''}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\nvObjPos = rockRestPosition; vObjN = normal; vNM0 = normalMatrix[0]; vNM1 = normalMatrix[1]; vNM2 = normalMatrix[2];${broken ? ' vDepth = _depth;' : ''}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform vec3 uTint;${broken ? '\nvarying float vDepth;\n' + NOISE_GLSL : ''}`)
      .replace('#include <clipping_planes_pars_fragment>', '#include <clipping_planes_pars_fragment>\n' + COMMON)
      .replace('#include <map_fragment>', `
        vec3 rp = vObjPos * uRockScale;
        vec3 rockAlb = tri(uRockDiff, rp).rgb;
        rockAlb = mix(rockAlb, vec3(dot(rockAlb, vec3(.3, .55, .15))), .65);   // basalt is grey, the scan is warm
        float rockH = tri(uRockDisp, rp).r;
        float stoneRough = .86 - rockH * .12;
        float stoneBump = 1.;
        vec3 stone = rockAlb * uTint;
        ${broken ? `
        float t = clamp(vDepth, 0., 1.);
        float n1 = snoise(vec4(vObjPos * 38., 1.)), n2 = snoise(vec4(vObjPos * 160., 7.));
        // basalt rind: the same scanned rock, freshly broken so a little lighter and greyer
        vec3 rind = rockAlb * vec3(.48, .52, .56);
        // thin dark blue-grey skin where agate starts growing on the basalt
        vec3 skin = vec3(.05, .075, .11) * (.85 + .3 * n2);
        // agate: many fine concentric bands parallel to the cavity wall, low contrast, translucent
        float u = clamp((t - .62) / .31, 0., 1.);
        float wob = n1 * .9 + n2 * .15;
        vec3 agate = mix(vec3(.006, .025, .08), vec3(.025, .13, .23), smoothstep(.0, 1., u + n1 * .08));
        agate = mix(agate, vec3(.30, .48, .57), smoothstep(.9, 1., sin(u * 26. + wob)) * .45);   // milky lines
        agate = mix(agate, vec3(.04, .10, .22), smoothstep(.7, 1., sin(u * 11. + 1.7 + wob)) * .6); // deep blue lines
        agate = mix(agate, vec3(.36, .44, .50), smoothstep(.95, 1., sin(u * 70. + wob * 3.)) * .06); // hairlines
        // quartz crust: pale crystals with tiny sparkling facets
        float spark = step(.975, fract(sin(dot(floor(vObjPos * 900.), vec3(12.99, 78.23, 37.71))) * 43758.55));
        vec3 quartz = vec3(.015, .07, .14) * (.7 + .35 * n2) + spark * .16;
        float aSk = smoothstep(.52, .57, t + n2 * .02), aAg = smoothstep(.60, .64, t + n2 * .01), aQz = smoothstep(.91, .94, t + n1 * .015);
        stone = mix(mix(mix(rind, skin, aSk), agate, aAg), quartz, aQz) * .6;   // exposure-matched to the geode body
        stoneRough = mix(stoneRough, .55, aAg);           // agate / quartz break with a conchoidal sheen
        stoneRough = mix(stoneRough, .4, aQz);
        stoneBump = .22 - aAg * .17;                    // fresh break: fine grain, not the weathered rind relief
        stoneRough = max(stoneRough, .7 - aAg * .2);` : ''}
        diffuseColor.rgb *= stone;`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = stoneRough;')
      .replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\n{ vec3 bn = triBump(vObjPos * uRockScale, uBump * stoneBump); normal = normalize(mix(normal, faceDirection * bn, .9)); }');
  };
  material.customProgramCacheKey = () => 'transilk-stone-' + (broken ? 'broken' : 'rind') + '-v7';
  material.needsUpdate = true;
}

export const applyRock = (m, renderer, opts) => install(m, renderer, opts);
export const applyBrokenGeode = (m, renderer, opts) => install(m, renderer, { ...opts, broken: true });
