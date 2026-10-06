import * as THREE from 'three';
import { NOISE_GLSL } from './noise.js';
import { createMudLens } from './mud-lens.js';

// Pointer-reactive mist and lens droplets. The sapphire is rendered once inside the Blender film.
export async function createFx({ film, video, revealTime, reduced }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero__fx';
  film.append(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -2000, 2000);
  camera.position.z = 1000;

  // ---------------------------------------------------------------- mist
  const wakes = Array.from({ length: 10 }, () => new THREE.Vector4(-9, -9, 0, 0)); // x, y, strength, radius
  const mist = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uTime: { value: 0 }, uAspect: { value: 1 }, uWakes: { value: wakes }, uDensity: { value: 1 } },
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: NOISE_GLSL + /* glsl */`
      varying vec2 vUv; uniform float uTime, uAspect, uDensity; uniform vec4 uWakes[10];
      float fbm(vec3 p){ float a=.5, s=0.; for(int i=0;i<4;i++){ s+=a*snoise(vec4(p, uTime*.05*float(i+1))); p*=2.03; a*=.5; } return s; }
      void main(){
        vec2 p = vec2(vUv.x*uAspect, vUv.y);
        vec2 drift = vec2(uTime*.018, -uTime*.006);              // slow roll toward the viewer/right
        float n = fbm(vec3((p+drift)*vec2(1.6,3.2), 0.)) * .5 + .5;
        float ground = (1. - smoothstep(.08, .72, vUv.y));              // hugs the forest floor
        float a = smoothstep(.38, .85, n) * ground * .42 * uDensity;
        for(int i=0;i<10;i++){                                   // pointer wakes clear the mist
          vec4 w = uWakes[i]; if(w.z<=0.) continue;
          float d = length((p - vec2(w.x*uAspect, w.y)) / w.w);
          a *= 1. - w.z * exp(-d*d*2.2);
        }
        gl_FragColor = vec4(vec3(.58,.72,.74), a);
      }`,
  }));
  mist.renderOrder = 0;
  scene.add(mist);

  // ---------------------------------------------------------------- lens mud (above the page copy)
  const lens = createMudLens(reduced, [46 / 24 + .36, 78 / 24 + .32], video);

  // ---------------------------------------------------------------- layout: map film coords to screen
  let W = 1, H = 1;
  function resize() {
    W = film.clientWidth; H = film.clientHeight;
    renderer.setSize(W, H, false);
    camera.right = W; camera.top = H; camera.updateProjectionMatrix();
    mist.scale.set(W, H, 1); mist.position.set(W / 2, H / 2, -500);
    mist.material.uniforms.uAspect.value = W / H;
  }
  addEventListener('resize', resize); resize();
  // ---------------------------------------------------------------- pointer
  let mx = 0, my = 0, px = .5, py = .5, lastX = null, lastY = null, wi = 0;
  addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth, y = 1 - e.clientY / innerHeight;
    mx = x - .5; my = y - .5;
    if (lastX !== null) {
      const v = Math.hypot(x - lastX, y - lastY);
      if (v > .004) { wakes[wi % 10].set(x, y, Math.min(1, v * 14), .07 + v * 1.4); wi++; }
    }
    lastX = x; lastY = y; px = x; py = y;
  });

  let gx = 0, gy = 0, lensT = 0;
  const clock = new THREE.Clock();
  function frame() {
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
    const vt = video.currentTime || 0;
    mist.material.uniforms.uTime.value = reduced ? 0 : t;
    for (const w of wakes) w.z *= Math.exp(-dt * .9);        // wakes heal slowly

    renderer.render(scene, camera);
    lensT = video.ended ? Math.max(vt, lensT + dt) : vt;  // keep drips running after the film holds
    lens.update(lensT);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
