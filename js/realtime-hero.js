import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { installGemOptics } from './gem-optics.js';
import { createEyeglassWater } from './eyeglass-water.js';
import { NOISE_GLSL } from './noise.js';
import { createCoverFracture } from './cover-fracture.js';
import { applyRock, applyBrokenGeode, stoneTexturesReady } from './stone-material.js';

const params=new URLSearchParams(location.search), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=document.querySelector('.hero__canvas'),status=document.querySelector('.scene-status');
const rootURL='assets/realtime/';
const ultra=new URLSearchParams(location.search).get('quality')==='4k';
const clamp=THREE.MathUtils.clamp;
main().catch(error=>{console.error('Realtime scene',error);document.body.classList.remove('is-loading');document.body.classList.add('is-static','is-intro','is-revealed');status.textContent='3D could not load. Showing the render.';document.querySelector('.hero__poster').src='assets/forest-geode-cinematic.jpg';});
async function main(){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(ultra?Math.min(2,3840/innerWidth):Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x061316);scene.fog=new THREE.FogExp2(0x0b2025,.135);
 const camera=new THREE.PerspectiveCamera(35,1,.04,100);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();scene.environmentIntensity=.22;
 scene.add(new THREE.HemisphereLight(0xc2e2e7,0x252d20,.35));
 const key=new THREE.DirectionalLight(0x9fc9dd,1.35);key.position.set(-2,6,4);key.castShadow=true;key.shadow.mapSize.set(ultra?2048:1024,ultra?2048:1024);key.shadow.camera.left=-1.2;key.shadow.camera.right=1.2;key.shadow.camera.top=1.3;key.shadow.camera.bottom=-1.3;key.shadow.camera.near=.1;key.shadow.camera.far=14;key.shadow.bias=-.0003;key.shadow.normalBias=.015;key.target.position.set(.2,.3,3.8);scene.add(key,key.target);
 const rim=new THREE.PointLight(0x78bdd4,15,7,2);rim.position.set(-.7,1.2,2.6);scene.add(rim);
 const fill=new THREE.PointLight(0xe9f4ff,3.2,4,2);fill.position.set(.6,.9,5);scene.add(fill);
 // Warm, low sun catching the foreground ferns (reference: yellow-green lit understorey).
 const warm=new THREE.SpotLight(0xffd88f,38,9,.62,.85,2);warm.position.set(2.4,2.6,6.6);warm.target.position.set(.6,0,4.9);scene.add(warm,warm.target);
 const warmL=new THREE.SpotLight(0xf1d58c,16,8,.55,.9,2);warmL.position.set(-2.2,2.2,6.4);warmL.target.position.set(-1,0,4.8);scene.add(warmL,warmL.target);
 // Teal canopy shaft behind the geode.
 const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.18,.95,4.2,40,1,true),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec2 vUv;varying vec3 vN,vV;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
  fragmentShader:'varying vec2 vUv;varying vec3 vN,vV;void main(){float rim=pow(abs(dot(vN,vV)),2.2);float fall=smoothstep(0.,.55,vUv.y)*smoothstep(1.,.75,vUv.y);gl_FragColor=vec4(vec3(.32,.58,.6)*rim*fall*.16,1.);}'}));
 shaft.position.set(.45,1.9,2.4);shaft.rotation.set(.12,0,-.16);scene.add(shaft);
 const manager=new THREE.LoadingManager();manager.onProgress=(url,loaded,total)=>{status.textContent=`Loading 3D · ${loaded}/${total}`;window.transilkLoad?.(loaded/total*.92);};
 const draco=new DRACOLoader(manager).setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/gltf/');
 const loader=new GLTFLoader(manager).setDRACOLoader(draco);
 const [env,geode,closed,gem,fragments,motion,palette]=await Promise.all([
  ...['environment','geode-sharp-rim','matching-cap','sapphire','geode-fracture-v3'].map(n=>loader.loadAsync(rootURL+n+'.glb')),
  fetch(rootURL+'motion.json').then(r=>r.json()),fetch(rootURL+'materials.json').then(r=>r.json())]);
 const hero=new THREE.Group();scene.add(hero);hero.add(geode.scene,closed.scene,gem.scene);scene.add(env.scene,fragments.scene);
 const all=[env.scene,geode.scene,closed.scene,gem.scene,fragments.scene];
 for(const group of all)group.traverse(o=>{if(!o.isMesh)return;o.geometry.setAttribute('rockRestPosition',o.geometry.attributes.position.clone());o.receiveShadow=true;o.castShadow=group!==env.scene;
  const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats){
   const paletteName=m.name.replace(' | fractured','');const swatch=palette[paletteName]||palette[Object.keys(palette).find(k=>k.replace(/\.\d{3}$/,'')===paletteName.replace(/\.\d{3}$/, ''))];if(!m.map&&swatch)m.color.fromArray(swatch.color);m.envMapIntensity=.55;if(group!==env.scene)m.fog=false;
   if(m.map)m.map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
   if(m.normalMap)m.normalScale.multiplyScalar(.7);
   if(m.alphaMap||m.alphaTest>0){m.transparent=false;m.alphaTest=.35;m.side=THREE.DoubleSide;}
   if(m.name.includes('agate')){m.transmission=0;m.roughness=.22;m.metalness=.05;m.envMapIntensity=1.0;}
   if(m.name.includes('| fractured')){m.flatShading=true;m.roughness=.4;m.metalness=0;m.envMapIntensity=.5;}
   if(m.name.includes('quartz')){m.transmission=0;m.roughness=.14;m.metalness=.12;m.envMapIntensity=1.5;}
   if(m.name.startsWith('Fracture face')){m.flatShading=true;m.roughness=.88;m.color.setRGB(.055,.063,.064);stoneGrain(m);}
   if(m.name.includes('Matched weathered')||m.name.includes('Raw fracture')){applyRock(m,renderer,{tint:new THREE.Color(.46,.52,.56)});}
   if(m.name.includes('basalt')){applyRock(m,renderer,{tint:new THREE.Color(.46,.52,.56)});}
   // Fracture v2: colour is baked per corner (rind -> agate bands -> crystal) from the real cross-section depth.
   if(m.name.startsWith('Fracture v2')){m.vertexColors=true;m.color.setRGB(1,1,1);m.metalness=0;
    if(m.name.includes('rind')){applyRock(m,renderer,{tint:new THREE.Color(.46,.52,.56)});}
    else if(m.name.includes('broken')){m.envMapIntensity=.35;m.flatShading=false;applyBrokenGeode(m,renderer);}
    // crystal/agate skin of the pieces: same teal-blue as the cavity, not bleached white
    else if(m.name.includes('agate')){m.roughness=.32;m.envMapIntensity=.18;m.color.setRGB(.04,.15,.3);}
    // druzy crystals: same teal-blue as the cavity, hard flat facets that catch the light
    else {m.vertexColors=false;m.flatShading=true;m.color.setRGB(.05,.3,.52);m.roughness=.1;m.metalness=.25;m.envMapIntensity=2.2;m.specularIntensity=1;m.clearcoat=.6;m.clearcoatRoughness=.05;}
    m.needsUpdate=true;}
  }});
 // Batch static environment surfaces by material while preserving their world transforms.
 env.scene.updateMatrixWorld(true);const buckets=new Map();env.scene.traverse(o=>{if(!o.isMesh||Array.isArray(o.material))return;const k=o.material.name+Object.keys(o.geometry.attributes).sort().join(',');if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(o);});
 for(const items of buckets.values()){if(items.length<2)continue;const gs=items.map(o=>{const g=o.geometry.clone().applyMatrix4(o.matrixWorld);if(!g.index)g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));return g;});const merged=mergeGeometries(gs,false);if(merged){const batch=new THREE.Mesh(merged,items[0].material);batch.receiveShadow=true;scene.add(batch);items.forEach(o=>o.visible=false);}gs.forEach(g=>g.dispose());}
 // Restore a micro-surface where Blender's procedural stone nodes have no glTF equivalent.
 function stoneGrain(m){m.onBeforeCompile=shader=>{shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vRock;').replace('#include <begin_vertex>','#include <begin_vertex>\nvRock=position;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vRock;').replace('#include <color_fragment>',`#include <color_fragment>
 float grain=fract(sin(dot(floor(vRock*620.),vec3(12.9898,78.233,45.164)))*43758.5453);
 float rockPatch=sin(vRock.x*49.+sin(vRock.z*36.))*sin(vRock.y*42.);
 diffuseColor.rgb*=.65+grain*.45+rockPatch*.18;`);};m.customProgramCacheKey=()=> 'basalt-grain-v1';}
 let gemMesh;gem.scene.traverse(o=>{if(o.isMesh)gemMesh=o;});
 const sapphire=new THREE.MeshPhysicalMaterial({color:0x06132e,metalness:0,roughness:.025,transmission:0,thickness:.14,ior:1.764,envMapIntensity:2.2,clearcoat:1,clearcoatRoughness:.025,attenuationColor:0x255fea,attenuationDistance:.6});gemMesh.material=sapphire;
 let optics;try{optics=installGemOptics(sapphire,gem.scene);}catch(e){console.warn('Using physical transmission for gemstone:',e.message);}
 // A true scene reflection, with small moving surface ripples.
 const ws=Reflector.ReflectorShader,shader={uniforms:THREE.UniformsUtils.clone(ws.uniforms),vertexShader:ws.vertexShader,fragmentShader:ws.fragmentShader};
 shader.uniforms.uTime={value:0};shader.uniforms.uPulse={value:0};
 shader.vertexShader='varying vec2 vRipple;\n'+shader.vertexShader.replace('gl_Position =', 'vRipple=position.xy;\n gl_Position =');
 shader.fragmentShader='varying vec2 vRipple;uniform float uTime,uPulse;\n'+shader.fragmentShader.replace('vec4 base = texture2DProj( tDiffuse, vUv );',`vec4 waveUv=vUv;float r=length(vRipple);waveUv.xy+=vec2(sin(r*38.-uTime*9.),cos(vRipple.x*21.+uTime*2.))*(.0008+uPulse*.003)*waveUv.w;vec4 base = texture2DProj(tDiffuse,waveUv);`);
 shader.fragmentShader=shader.fragmentShader.replace('gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );','gl_FragColor = vec4(mix(vec3(.035,.06,.055),base.rgb,.76),.66*(1.-smoothstep(1.08,1.35,length(vRipple))));');
 const water=new Reflector(new THREE.CircleGeometry(1.35,96),{color:0x355653,textureWidth:ultra?1024:512,textureHeight:ultra?1024:512,clipBias:.002,shader});water.material.transparent=true;water.material.depthWrite=false;water.rotation.x=-Math.PI/2;water.position.set(.2,-.1,4.15);water.scale.set(1.04,1.1,1);scene.add(water);
 // Real 3D ballistic droplets. The mesh positions follow gravity and cease at water contact.
 const N=420,WATER_Y=-.1,dropMat=new THREE.MeshPhysicalMaterial({color:0x9a805b,roughness:.075,metalness:0,ior:1.33,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:1.7,transparent:true,opacity:.72});
 const dropMesh=new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,8),dropMat,N);dropMesh.frustumCulled=false;scene.add(dropMesh);
 const random=n=>THREE.MathUtils.euclideanModulo(Math.sin(n*127.1+6.3)*43758.54,1),drops=[],clear=new THREE.Color(0x3c4c49),muddy=new THREE.Color(0x3a2c1c);
 for(let i=0;i<N;i++){const crown=i<260,a=random(i)*Math.PI*2,fwd=random(i+21)<(crown?.22:.75);
  const ox=crown?.2:-.1,oz=crown?3.9:4.32,rr=crown?.2+random(i+4)*.09:.12*random(i+4);
  const out=crown?.5+random(i+8)*1.6:.3+random(i+8)*.9;
  drops.push({birth:(crown?46:i<350?81:94)/24+random(i+3)*(crown?.08:.16),x:ox+Math.cos(a)*rr,z:oz+Math.sin(a)*rr,y0:-.06,
   vx:Math.cos(a)*out,vz:Math.sin(a)*out+(fwd?2.2+random(i+5)*3.2:0),vy:(crown?1.1:.6)+random(i+9)*(crown?1.8:1.1),r:.0018+random(i+11)**2*.009});
  dropMesh.setColorAt(i,random(i+30)<.35?muddy:clear);}
 dropMesh.instanceColor.needsUpdate=true;
 const up=new THREE.Vector3(0,1,0),vel=new THREE.Vector3();
 const dummy=new THREE.Object3D();
 const fogUniforms=[];
 for(let i=0;i<6;i++){
  const uniforms={uTime:{value:0},uPointer:{value:new THREE.Vector2(-5,-5)},uSeed:{value:i*7.3}};
  const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms,vertexShader:'varying vec2 vUv;varying vec4 vScreen;void main(){vUv=uv;vScreen=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position=vScreen;}',fragmentShader:NOISE_GLSL+`varying vec2 vUv;varying vec4 vScreen;uniform float uTime,uSeed;uniform vec2 uPointer;void main(){vec2 p=vUv;float n=.5+.5*snoise(vec4(p*vec2(3.,2.)+vec2(uTime*.025,uSeed),0.,uTime*.045));float edge=sin(p.x*3.14159)*sin(p.y*3.14159);vec2 screen=vScreen.xy/vScreen.w*.5+.5;float wake=exp(-dot(screen-uPointer,screen-uPointer)*75.);gl_FragColor=vec4(.36,.55,.56,max(0.,n-.3)*edge*.21*(1.-wake*.92));}`});
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(5,1.05),material);plane.position.set(0,.1,1+i*.8);scene.add(plane);fogUniforms.push({plane,uniforms});
 }
 const lens=createEyeglassWater(reduced,[46/24+.55,81/24+.55,94/24+.5]);
 const C=new THREE.Matrix4().makeRotationX(-Math.PI/2),Ci=C.clone().invert();
 function convert(a){return new THREE.Matrix4().fromArray(a).premultiply(C).multiply(Ci);}
 function track(arr){return arr.map(a=>{const m=convert(a),p=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3();m.decompose(p,q,s);return {p,q,s};});}
 const dropTrack=track(motion.drop),coverTrack=track(motion.cover),pieceTracks={};
 for(const [name,arr] of Object.entries(motion.fragments))pieceTracks[name.replaceAll(' ','_')]=track(arr);
 function sample(obj,tr,f){const x=clamp(f-1,0,tr.length-1),i=Math.floor(x),a=x-i,b=tr[Math.min(i+1,tr.length-1)];obj.position.copy(tr[i].p).lerp(b.p,a);obj.quaternion.copy(tr[i].q).slerp(b.q,a);obj.scale.copy(tr[i].s).lerp(b.s,a);}
 const matchingTracks={};for(const node of fragments.scene.children)matchingTracks[node.name]=Array.from({length:168},()=>({p:new THREE.Vector3(),q:new THREE.Quaternion(),s:new THREE.Vector3(1,1,1)}));
 const fracture=createCoverFracture(fragments.scene,matchingTracks,{releaseFrame:62,impactFrame:82,groundY:-.095});
 if(params.has('motion_export'))window.transilkMotionExport=fracture.exportFrames();
 const target=new THREE.Box3().setFromObject(geode.scene).getCenter(new THREE.Vector3()),pointer=new THREE.Vector2(),smooth=new THREE.Vector2();
 const pointerUV=new THREE.Vector2(-5,-5);let lastInput=-10;
 addEventListener('pointermove',e=>{pointer.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);pointerUV.set(e.clientX/innerWidth,1-e.clientY/innerHeight);lastInput=performance.now();});
 addEventListener('pointerleave',()=>pointer.set(0,0));
 function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.fov=innerWidth<820?39:30;camera.updateProjectionMatrix();if(reduced&&window.transilkScene?.ready)renderer.render(scene,camera);}addEventListener('resize',resize);resize();
 // Fragments are small and many: they receive shadows but do not render into the shadow map.
 fragments.scene.traverse(o=>{if(o.isMesh)o.castShadow=false;});
 // Pre-warm while the loader is still up: decode/upload every texture and buffer and compile every
 // shader now, so nothing stalls when the stone lands (f45) or breaks (f62).
 await stoneTexturesReady();
 {const vis=[closed.scene,geode.scene,gem.scene,fragments.scene].map(o=>o.visible);for(const o of [closed.scene,geode.scene,gem.scene,fragments.scene])o.visible=true;fracture.update(90);
  const culled=[];scene.traverse(o=>{if(o.isMesh||o.isPoints||o.isSprite){culled.push([o,o.frustumCulled]);o.frustumCulled=false;}
   for(const m of [].concat(o.material||[]))for(const k in m){const v=m[k];if(v&&v.isTexture)renderer.initTexture(v);}});
  camera.position.set(0,.3,7);camera.lookAt(0,.3,0);
  await renderer.compileAsync(scene,camera);const rt=new THREE.WebGLRenderTarget(64,36);renderer.setRenderTarget(rt);renderer.render(scene,camera);renderer.setRenderTarget(null);rt.dispose();
  for(const [o,c] of culled)o.frustumCulled=c;[closed.scene.visible,geode.scene.visible,gem.scene.visible,fragments.scene.visible]=vis;fracture.update(1);}
 document.body.classList.remove('is-loading');document.body.classList.add('is-intro','is-live');status.hidden=true;
 const clock=new THREE.Clock(),started=performance.now();let elapsed=0,frames=0;
 // Slow-motion shot: the fall and the water impact (frames 30–54) play at 0.2x, easing in and out.
 const SLOW_FROM=30,SLOW_TO=54,SLOW_RATE=.2,RAMP=5;
 const rate=f=>{const a=THREE.MathUtils.smoothstep(f,SLOW_FROM-RAMP,SLOW_FROM),b=1-THREE.MathUtils.smoothstep(f,SLOW_TO,SLOW_TO+RAMP);return 1-(1-SLOW_RATE)*Math.min(a,b);};
 const wallAt=[0];for(let f=1;f<=168*8;f++){const x=1+f/8;wallAt.push(wallAt[f-1]+(1/8)/24/rate(x-1/16));}
 const WALL_END=wallAt[wallAt.length-1];
 function storyFrame(sec){if(sec>=WALL_END)return 168;let lo=0,hi=wallAt.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(wallAt[m]<=sec)lo=m;else hi=m;}return 1+(lo+(sec-wallAt[lo])/(wallAt[hi]-wallAt[lo]))/8;}
 const fixed=params.has('frame')?Number(params.get('frame')):null;
 const replay=document.querySelector('.scene-replay');replay.hidden=reduced||fixed!==null;replay.addEventListener('click',()=>{elapsed=0;frames=0;renderer.shadowMap.autoUpdate=true;renderer.shadowMap.needsUpdate=true;clock.start();document.body.classList.remove('is-revealed');});
 function animate(){const rawDelta=clock.getDelta(),dt=Math.min(rawDelta,.05);elapsed+=Math.min(rawDelta,frames<2?.05:.1);   // a single slow frame never makes the story jump
  const frame=reduced?168:fixed??storyFrame(elapsed),t=(frame-1)/24,storyClock=t+Math.max(0,elapsed-WALL_END);
  sample(hero,dropTrack,frame);closed.scene.visible=frame<62;geode.scene.visible=true;gem.scene.visible=true;
  fragments.scene.visible=frame>=62;fracture.update(frame);
  for(let i=0;i<N;i++){const d=drops[i],age=t-d.birth,y=d.y0+age*d.vy-4.905*age*age;const visible=age>0&&y>WATER_Y&&age<1.6;dummy.position.set(d.x+d.vx*age,y,d.z+d.vz*age);vel.set(d.vx,d.vy-9.81*age,d.vz);const sp=vel.length();if(sp>1e-4)dummy.quaternion.setFromUnitVectors(up,vel.divideScalar(sp));dummy.scale.set(visible?d.r:0,visible?d.r*(1+sp*.28):0,visible?d.r:0);dummy.updateMatrix();dropMesh.setMatrixAt(i,dummy.matrix);}dropMesh.instanceMatrix.needsUpdate=true;
  const blend=1-Math.exp(-dt*5.5);smooth.lerp(reduced?new THREE.Vector2():pointer,blend);
  const yaw=smooth.x*.19,pitch=smooth.y*.055;
  const ease=(a,b,x)=>{const u=clamp((x-a)/(b-a),0,1);return u*u*(3-2*u);};
  hero.updateMatrixWorld(true);const geodeCenter=target.clone().applyMatrix4(hero.matrixWorld);
  // Low first-person approach: water -> falling stone / reveal -> water again.
  const waterFocus=new THREE.Vector3(target.x,-.015,4.22);
  const lookUp=ease(25,44,frame)*(1-ease(110,160,frame));
  const tracking=waterFocus.clone().lerp(geodeCenter,lookUp*.9);
  const approach=ease(1,48,frame),walking=(1-ease(38,54,frame))*(reduced?0:1);
  const distance=(innerWidth<820?2.8:3.35)+(1-approach)*.6;
  const bob=Math.sin(t*10.5)*.009*walking,sideStep=Math.sin(t*5.25)*.009*walking;
  camera.position.set(target.x+Math.sin(yaw)*distance+sideStep,.27+Math.sin(pitch)*distance+bob,waterFocus.z+Math.cos(yaw)*distance);
  const hitAge=t-46/24;if(hitAge>=0&&!reduced)camera.position.y+=Math.sin(hitAge*65)*Math.exp(-hitAge*9)*.018;
  camera.lookAt(tracking);camera.rotateZ(Math.sin(t*5.25)*.0025*walking);
  const pulse=Math.max(0,1-(t-46/24)*1.5)*(t>=46/24?1:0)+Math.max(0,1-(t-81/24)*1.5)*(t>=81/24?1:0);
  water.material.uniforms.uTime.value=reduced?0:storyClock;water.material.uniforms.uPulse.value=pulse;
  for(const f of fogUniforms){f.plane.quaternion.copy(camera.quaternion);f.uniforms.uTime.value=reduced?0:storyClock;f.uniforms.uPointer.value.lerp(performance.now()-lastInput<1400?pointerUV:new THREE.Vector2(-5,-5),dt*2);}
  optics?.update();
  if(frame>=96)document.body.classList.add('is-revealed');
  renderer.render(scene,camera);if(frame>=168)renderer.shadowMap.autoUpdate=false;const lensDrops=lens.update(reduced?0:(fixed!==null?(params.has("lens")?t:0):storyClock));frames++;
  // Read-only diagnostics support visual QA without controlling scene behavior.
  window.transilkScene={ready:true,frame,camera:camera.position.toArray(),target:tracking.toArray(),projectedTarget:tracking.clone().project(camera).toArray(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,elapsed,frames,wallSeconds:(performance.now()-started)/1000,mode:'realtime-threejs',quality:ultra?'4k':'native',drawingBuffer:[canvas.width,canvas.height],cameraShot:frame<25?'water-approach':frame<110?'fall-and-reveal':frame<160?'return-to-water':'water-hold',lensDrops,fracture:fracture.diagnostics(frame)};
  if(!reduced)requestAnimationFrame(animate);
 }animate();
}
