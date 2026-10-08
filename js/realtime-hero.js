import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { installGemOptics } from './gem-optics.js';
import { createEyeglassWater } from './eyeglass-water.js';
import { createScrollShowcase } from './scroll-showcase.js';
import { createWaterContacts } from './water-contacts.js';
import { createForestMist } from './forest-mist.js';
import { NOISE_GLSL } from './noise.js';
import { createCoverFracture } from './cover-fracture.js';
import { applyRock, applyBrokenGeode, stoneTexturesReady } from './stone-material.js';

const params=new URLSearchParams(location.search), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=document.querySelector('.hero__canvas'),status=document.querySelector('.scene-status');
const rootURL='assets/realtime/';
const ultra=new URLSearchParams(location.search).get('quality')==='4k';
// Phones (iPhone 12 mini etc.): iOS Safari reloads the tab when WebGL memory runs out, so use a lighter budget.
const lowMem=!ultra&&(matchMedia('(pointer: coarse)').matches||Math.min(screen.width,screen.height)<820);
const clamp=THREE.MathUtils.clamp;
main().catch(error=>{console.error('Realtime scene',error);document.body.classList.remove('is-loading');document.body.classList.add('is-static','is-intro','is-revealed');status.textContent='3D could not load. Showing the render.';document.querySelector('.hero__poster').src='assets/forest-geode-cinematic.jpg';});
async function main(){
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(ultra?Math.min(2,3840/innerWidth):Math.min(devicePixelRatio,lowMem?1.25:1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x061316);scene.fog=new THREE.FogExp2(0x0b2025,.135);
 const camera=new THREE.PerspectiveCamera(35,1,.04,100);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();scene.environmentIntensity=.22;
 scene.add(new THREE.HemisphereLight(0xc2e2e7,0x252d20,.35));
 const key=new THREE.DirectionalLight(0x9fc9dd,1.05);key.position.set(-2,6,4);key.castShadow=true;key.shadow.mapSize.set(ultra?2048:lowMem?512:1024,ultra?2048:lowMem?512:1024);key.shadow.camera.left=-1.2;key.shadow.camera.right=1.2;key.shadow.camera.top=1.3;key.shadow.camera.bottom=-1.3;key.shadow.camera.near=.1;key.shadow.camera.far=14;key.shadow.bias=-.0003;key.shadow.normalBias=.015;key.target.position.set(.2,.3,3.8);scene.add(key,key.target);
 const rim=new THREE.PointLight(0x78bdd4,15,7,2);rim.position.set(-.7,1.2,2.6);scene.add(rim);
 const fill=new THREE.PointLight(0xe9f4ff,1.0,4,2);fill.position.set(.6,.9,5);scene.add(fill);
 // Warm, low sun catching the foreground ferns (reference: yellow-green lit understorey).
 const warm=new THREE.SpotLight(0xffd88f,14,9,.62,.85,2);warm.position.set(2.4,2.6,6.6);warm.target.position.set(.6,0,4.9);scene.add(warm,warm.target);
 const warmL=new THREE.SpotLight(0xf1d58c,6,8,.55,.9,2);warmL.position.set(-2.2,2.2,6.4);warmL.target.position.set(-1,0,4.8);scene.add(warmL,warmL.target);
 // Teal canopy shaft behind the geode.
 const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.18,.95,4.2,40,1,true),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec2 vUv;varying vec3 vN,vV;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
  fragmentShader:'varying vec2 vUv;varying vec3 vN,vV;void main(){float rim=pow(abs(dot(vN,vV)),2.2);float fall=smoothstep(0.,.55,vUv.y)*smoothstep(1.,.75,vUv.y);gl_FragColor=vec4(vec3(.32,.58,.6)*rim*fall*.16,1.);}'}));
 shaft.position.set(.45,1.9,2.4);shaft.rotation.set(.12,0,-.16);scene.add(shaft);
 const manager=new THREE.LoadingManager();manager.onProgress=(url,loaded,total)=>{status.textContent=`Loading 3D · ${loaded}/${total}`;window.transilkLoad?.(loaded/total*.92);};
 const draco=new DRACOLoader(manager).setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/gltf/');
 const loader=new GLTFLoader(manager).setDRACOLoader(draco);
 const [env,basin,geode,closed,gem,fragments,motion,palette,sourceNames]=await Promise.all([
  ...['environment','forest-basin-patch','geode-sharp-rim','matching-cap','sapphire','geode-fracture-v3'].map(n=>loader.loadAsync(rootURL+n+'.glb')),
  fetch(rootURL+'motion.json').then(r=>r.json()),fetch(rootURL+'materials.json').then(r=>r.json()),fetch(rootURL+'hidden-source-names.json').then(r=>r.json())]);
 // Asset-library originals were hidden by their Blender collection, not per-object hide_render.
 // Old exporter accidentally included them. Placed scene instances have descriptive names and remain.
 const normalizeName=n=>n.toLowerCase().replace(/[^a-z0-9]/g,'');
 const sourceBases=sourceNames.map(n=>normalizeName(n.replace(/\.\d{3}$/,''))),sourceCopies=[];
 env.scene.traverse(o=>{const n=normalizeName(o.name);if(sourceBases.some(b=>n===b||(n.startsWith(b)&&/^\d{3}$/.test(n.slice(b.length)))))sourceCopies.push(o);});
 sourceCopies.forEach(o=>o.removeFromParent());
 window.transilkEnvironment={removedSourceCopies:sourceCopies.length,basinPatch:true};
 // Replace only the edited basin floor; retain the user's complete environment asset.
 const oldFloor=[];env.scene.traverse(o=>{if(o.name.replaceAll('_',' ').toLowerCase().includes('wet forest floor'))oldFloor.push(o);});for(const o of oldFloor)o.removeFromParent();
 for(const o of [...basin.scene.children])env.scene.add(o);
 // On phones shrink every environment texture to 512px before it reaches the GPU (~210 MB -> ~55 MB).
 if(lowMem){const seen=new Set();env.scene.traverse(o=>{for(const m of [].concat(o.material||[]))for(const k in m){const t=m[k];
  if(!t||!t.isTexture||seen.has(t)||!t.image||!(t.image.width>512))continue;seen.add(t);
  const c=document.createElement('canvas');c.width=c.height=512;c.getContext('2d').drawImage(t.image,0,0,512,512);t.image=c;t.needsUpdate=true;}});}
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
   if(group===env.scene){
    const nm=m.name.toLowerCase();m.envMapIntensity=.2;
    if(nm.includes('forest floor')||nm.includes('wet flat stone')){m.roughness=.72;m.metalness=0;if(m.normalMap)m.normalScale.multiplyScalar(.5);m.color.multiplyScalar(.65);}
    if(nm.includes('jacaranda')||nm.includes('rock_face')){m.color.multiplyScalar(.48);m.roughness=.83;m.metalness=0;}
   }
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
 for(const items of buckets.values()){if(items.length<2)continue;const gs=items.map(o=>{const g=o.geometry.clone().applyMatrix4(o.matrixWorld);if(!g.index)g.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));return g;});const merged=mergeGeometries(gs,false);if(merged){const batch=new THREE.Mesh(merged,items[0].material);batch.receiveShadow=true;batch.userData.forestBatch=true;scene.add(batch);items.forEach(o=>o.visible=false);}gs.forEach(g=>g.dispose());}
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
 const water=new Reflector(new THREE.CircleGeometry(1.35,96),{color:0x355653,textureWidth:ultra?1024:lowMem?256:512,textureHeight:ultra?1024:lowMem?256:512,clipBias:.002,shader});water.material.transparent=true;water.material.depthWrite=false;water.rotation.x=-Math.PI/2;water.position.set(.2,-.1,5.0);water.scale.set(.70,1.65,1);scene.add(water);
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
 const waterContacts=createWaterContacts({scene,water,drops,environment:env.scene,lowMem});
 const forestMist=createForestMist(scene,{lowMem,reduced});
 const showcase=createScrollShowcase({renderer,scene,camera,hero,gem:gem.scene,geode:geode.scene,closed:closed.scene,fragments:fragments.scene,environment:env.scene,water,dropMesh,shaft,reduced,lowMem});
 const lens=createEyeglassWater(reduced,[46/24+.55,81/24+.55,94/24+.5]);
 const C=new THREE.Matrix4().makeRotationX(-Math.PI/2),Ci=C.clone().invert();
 function convert(a){return new THREE.Matrix4().fromArray(a).premultiply(C).multiply(Ci);}
 function track(arr){return arr.map(a=>{const m=convert(a),p=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3();m.decompose(p,q,s);return {p,q,s};});}
 const dropTrack=track(motion.drop),coverTrack=track(motion.cover),pieceTracks={};
 for(const [name,arr] of Object.entries(motion.fragments))pieceTracks[name.replaceAll(' ','_')]=track(arr);
 function sample(obj,tr,f){const x=clamp(f-1,0,tr.length-1),i=Math.floor(x),a=x-i,b=tr[Math.min(i+1,tr.length-1)];obj.position.copy(tr[i].p).lerp(b.p,a);obj.quaternion.copy(tr[i].q).slerp(b.q,a);obj.scale.copy(tr[i].s).lerp(b.s,a);}
 const matchingTracks={};for(const node of fragments.scene.children)matchingTracks[node.name]=Array.from({length:168},()=>({p:new THREE.Vector3(),q:new THREE.Quaternion(),s:new THREE.Vector3(1,1,1)}));
 const fracture=createCoverFracture(fragments.scene,matchingTracks,{releaseFrame:62,impactFrame:82,groundY:-.095});
 // M03: after impact, cracks run across the closed stone exactly where the pieces will separate
 // (Voronoi cells seeded by the real fragment centres at release), then the sapphire's blue light
 // leaks out through them. Browser shader + light (not baked in Blender).
 // One crack profile for the closed stone and the pieces, in world space, so nothing changes at the handoff.
 const CRACK_VS=['#include <common>','#include <common>\nattribute float aCrackDist;varying float vCrackDist;varying vec3 vCrackW;'],
  CRACK_VS2=['#include <begin_vertex>','#include <begin_vertex>\nvCrackDist=aCrackDist;vCrackW=(modelMatrix*vec4(transformed,1.)).xyz;'],
  CRACK_FN=`float crackCore(float dist,vec3 p,out float halo){float jag=sin(p.x*310.+p.y*170.)*sin(p.z*260.-p.y*230.);
   float w=.0035*(.55+.45*jag)*(.6+.4*sin(p.y*45.+p.x*30.));halo=1.-smoothstep(w,w*4.,dist);return 1.-smoothstep(w*.35,w,dist);}`;
 const crackApertures=[];
 const crackOriginW=new THREE.Vector3(),crackSizeW={value:1};
 const crack={grow:{value:0},glow:{value:0},cut:{value:0},edge:{value:0}},crackLight=new THREE.PointLight(0x3f7dff,0,.75,2);scene.add(crackLight);
 // The same crack lines continue on the pieces: rind vertices near each piece's broken edge get an
 // edge weight, so the glowing seams carry over seamlessly from the closed stone at frame 62.
 {const C=.012,key=(x,y,z)=>`${Math.floor(x/C)},${Math.floor(y/C)},${Math.floor(z/C)}`;
  for(const node of fragments.scene.children){const meshes=[];node.traverse(o=>{if(o.isMesh)meshes.push(o);});
   const grid=new Map();for(const m of meshes)if([].concat(m.material).some(x=>x.name.includes('broken'))){const P=m.geometry.attributes.position;for(let i=0;i<P.count;i++){const k=key(P.getX(i),P.getY(i),P.getZ(i));if(!grid.has(k))grid.set(k,[]);grid.get(k).push(i,m);}}
   for(const m of meshes){if([].concat(m.material).some(x=>x.name.includes('broken')))continue;const P=m.geometry.attributes.position,edge=new Float32Array(P.count),dist=new Float32Array(P.count);
    for(let i=0;i<P.count;i++){const x=P.getX(i),y=P.getY(i),z=P.getZ(i),cx=Math.floor(x/C),cy=Math.floor(y/C),cz=Math.floor(z/C);let best=1e9;
     for(let a=-1;a<2;a++)for(let b=-1;b<2;b++)for(let c=-1;c<2;c++){const L=grid.get(`${cx+a},${cy+b},${cz+c}`);if(!L)continue;for(let j=0;j<L.length;j+=2){const G=L[j+1].geometry.attributes.position,q=L[j];const d=Math.hypot(G.getX(q)-x,G.getY(q)-y,G.getZ(q)-z);if(d<best)best=d;}}
     edge[i]=1-THREE.MathUtils.smoothstep(best,0,.006);dist[i]=Math.min(best,1);}
    m.geometry.setAttribute('aCrackEdge',new THREE.BufferAttribute(edge,1));m.geometry.setAttribute('aCrackDist',new THREE.BufferAttribute(dist,1));}}}
 // M03 on the closed stone: crack where the pieces will actually separate. Boundary points are the
 // pieces' rind vertices next to a broken face (aCrackEdge), placed where they sit at release; each
 // shell vertex stores its distance to the nearest one, so the cracks line up 1:1 with the break.
 {fracture.update(62);sample(hero,dropTrack,168);scene.updateMatrixWorld(true);
  const pts=[],v=new THREE.Vector3();
  for(const node of fragments.scene.children)node.traverse(o=>{const e=o.geometry?.attributes?.aCrackEdge;if(!o.isMesh||!e)return;const P=o.geometry.attributes.position;
   for(let i=0;i<P.count;i++)if(e.getX(i)>.5){v.fromBufferAttribute(P,i).applyMatrix4(o.matrixWorld);pts.push(v.x,v.y,v.z);}});
  // Spread apertures over actual cracked rind edges, not unrelated decorative light cones.
  if(pts.length){let chosen=0;for(let j=0;j<8;j++){let best=-1;for(let i=0;i<pts.length;i+=3){v.fromArray(pts,i);const distance=crackApertures.length?Math.min(...crackApertures.map(p=>p.distanceToSquared(v))):v.z;if(distance>best){best=distance;chosen=i;}}crackApertures.push(new THREE.Vector3().fromArray(pts,chosen));}}
  const C=.02,grid=new Map(),k=(x,y,z)=>`${Math.floor(x/C)},${Math.floor(y/C)},${Math.floor(z/C)}`;
  for(let i=0;i<pts.length;i+=3){const key=k(pts[i],pts[i+1],pts[i+2]);if(!grid.has(key))grid.set(key,[]);grid.get(key).push(i);}
  closed.scene.traverse(o=>{if(!o.isMesh)return;const P=o.geometry.attributes.position,d=new Float32Array(P.count);
   o.geometry.computeBoundingBox();const bb=o.geometry.boundingBox,size=bb.getSize(new THREE.Vector3()).length();
   const origin=new THREE.Vector3((bb.min.x+bb.max.x)/2,bb.min.y,(bb.min.z+bb.max.z)/2);
   for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i).applyMatrix4(o.matrixWorld);const cx=Math.floor(v.x/C),cy=Math.floor(v.y/C),cz=Math.floor(v.z/C);let best=1;
    for(let a=-1;a<2;a++)for(let b=-1;b<2;b++)for(let c=-1;c<2;c++){const L=grid.get(`${cx+a},${cy+b},${cz+c}`);if(L)for(const j of L){const q=Math.hypot(pts[j]-v.x,pts[j+1]-v.y,pts[j+2]-v.z);if(q<best)best=q;}}
    d[i]=best;}
   o.geometry.setAttribute('aCrackDist',new THREE.BufferAttribute(d,1));crackOriginW.copy(origin).applyMatrix4(o.matrixWorld);crackSizeW.value=size;
   for(const m of [].concat(o.material)){const before=m.onBeforeCompile,key=m.customProgramCacheKey();
    m.onBeforeCompile=function(sh,...a){before.call(this,sh,...a);Object.assign(sh.uniforms,{uCrackGrow:crack.grow,uCrackGlow:crack.glow,uCrackOrigin:{value:origin},uCrackSize:{value:size}});
     sh.vertexShader=sh.vertexShader.replace(...CRACK_VS).replace(...CRACK_VS2);
     sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform vec3 uCrackOrigin;uniform float uCrackGrow,uCrackGlow,uCrackSize;varying float vCrackDist;varying vec3 vCrackW;\nfloat crackMask,crackHalo,crackShown,crackLit;\n'+CRACK_FN)
      .replace('#include <alphamap_fragment>',`#include <alphamap_fragment>
       {float core=crackCore(vCrackDist,vCrackW,crackHalo);                     // jagged, uneven width
        float reach=distance(vObjPos,uCrackOrigin)/uCrackSize;
        float front=uCrackGrow*1.3+sin(vObjPos.x*80.+vObjPos.z*50.)*.03;
        crackShown=smoothstep(reach,reach+.04,front);                       // cracks run up from the impact point
        crackLit=smoothstep(reach,reach+.1,front-.25)*uCrackGlow;          // light follows ~2 frames behind, from the base
        crackMask=core*crackShown;
        diffuseColor.rgb*=1.-.9*crackMask;}`)
      .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=(vec3(.06,.2,1.)*crackMask*1.7+vec3(.02,.07,.35)*crackHalo*crackShown*.35)*crackLit;');};
    m.customProgramCacheKey=()=>key+'-crack-v4';m.needsUpdate=true;}});
  fracture.update(1);}
 fragments.scene.traverse(o=>{if(!o.isMesh)return;for(const m of [].concat(o.material)){if(!m.name.includes('rind')||m.userData.edgeGlow)continue;m.userData.edgeGlow=true;
  const before=m.onBeforeCompile,key=m.customProgramCacheKey();
  m.onBeforeCompile=function(sh,...a){before.call(this,sh,...a);sh.uniforms.uEdgeGlow=crack.edge;
   sh.vertexShader=sh.vertexShader.replace(...CRACK_VS).replace(...CRACK_VS2);
   Object.assign(sh.uniforms,{uCrackGrow:crack.grow,uCrackOrigin:{value:crackOriginW},uCrackSize:crackSizeW});
   sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uEdgeGlow,uCrackGrow,uCrackSize;uniform vec3 uCrackOrigin;varying float vCrackDist;varying vec3 vCrackW;float pcMask,pcHalo,pcShown,pcLit;\n'+CRACK_FN)
    .replace('#include <alphamap_fragment>',`#include <alphamap_fragment>
     {float c=crackCore(vCrackDist,vCrackW,pcHalo);float reach=distance(vCrackW,uCrackOrigin)/uCrackSize;float front=uCrackGrow*1.3+sin(vCrackW.x*80.+vCrackW.z*50.)*.03;
      pcShown=smoothstep(reach,reach+.04,front);pcLit=max(smoothstep(reach,reach+.1,front-.25)*uEdgeGlow,.18*smoothstep(reach,reach+.04,front-.1)*step(.001,uCrackGrow)*(1.-step(.999,uCrackGrow)*step(uEdgeGlow,.001)));pcMask=c*pcShown;diffuseColor.rgb*=1.-.9*pcMask;}`)
    .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=(vec3(.06,.2,1.)*pcMask*1.7+vec3(.02,.07,.35)*pcHalo*pcShown*.35)*pcLit;');};
  m.customProgramCacheKey=()=>key+'-edgeglow-v5';m.needsUpdate=true;}});
 // The broken faces carry the same light at the moment of breaking: it spills out of the gaps as the
 // pieces part, then fades.
 fragments.scene.traverse(o=>{if(!o.isMesh)return;for(const m of [].concat(o.material)){if(!m.name.includes('broken')||m.userData.crackGlow)continue;m.userData.crackGlow=true;
  const before=m.onBeforeCompile,key=m.customProgramCacheKey();
  m.onBeforeCompile=function(sh,...a){before.call(this,sh,...a);sh.uniforms.uCutGlow=crack.cut;
   sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uCutGlow;').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vec3(.05,.18,.9)*uCutGlow;');};
  m.customProgramCacheKey=()=>key+'-cutglow-v1';m.needsUpdate=true;}});
 if(params.has('motion_export'))window.transilkMotionExport=fracture.exportFrames();
 const target=new THREE.Box3().setFromObject(geode.scene).getCenter(new THREE.Vector3()),pointer=new THREE.Vector2(),smooth=new THREE.Vector2();
 const pointerUV=new THREE.Vector2(-5,-5);let lastInput=-10;
 addEventListener('pointermove',e=>{pointer.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);pointerUV.set(e.clientX/innerWidth,1-e.clientY/innerHeight);lastInput=performance.now();});
 addEventListener('pointerleave',()=>pointer.set(0,0));
 let baseFov=30;const geodeCenterW=new THREE.Vector3();
 function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;baseFov=innerWidth<820?39:30;camera.fov=baseFov;camera.updateProjectionMatrix();if(reduced&&window.transilkScene?.ready)renderer.render(scene,camera);}addEventListener('resize',resize);resize();
 // Fragments are small and many: they receive shadows but do not render into the shadow map.
 fragments.scene.traverse(o=>{if(o.isMesh)o.castShadow=false;});
 // Pre-warm while the loader is still up: decode/upload every texture and buffer and compile every
 // shader now, so nothing stalls when the stone lands (f45) or breaks (f62).
 await stoneTexturesReady();
 sample(hero,dropTrack,168);fracture.update(168);closed.scene.visible=false;fragments.scene.visible=true;showcase.prepare();
 {const vis=[closed.scene,geode.scene,gem.scene,fragments.scene].map(o=>o.visible);for(const o of [closed.scene,geode.scene,gem.scene,fragments.scene])o.visible=true;fracture.update(90);
  const culled=[];scene.traverse(o=>{if(o.isMesh||o.isPoints||o.isSprite){culled.push([o,o.frustumCulled]);o.frustumCulled=false;}
   for(const m of [].concat(o.material||[]))for(const k in m){const v=m[k];if(v&&v.isTexture)renderer.initTexture(v);}});
  camera.position.set(0,.3,7);camera.lookAt(0,.3,0);
  showcase.beginWarmup();await renderer.compileAsync(scene,camera);renderer.render(scene,camera);   // also build the GPU pipelines for the real canvas format (loader covers it)
  const rt=new THREE.WebGLRenderTarget(64,36);renderer.setRenderTarget(rt);renderer.render(scene,camera);renderer.setRenderTarget(null);rt.dispose();showcase.endWarmup();await renderer.compileAsync(scene,camera);
  for(const [o,c] of culled)o.frustumCulled=c;[closed.scene.visible,geode.scene.visible,gem.scene.visible,fragments.scene.visible]=vis;fracture.update(1);}
 document.body.classList.remove('is-loading');document.body.classList.add('is-intro','is-live');status.hidden=true;
 const clock=new THREE.Clock(),started=performance.now();let elapsed=0,frames=0;
 // Slow-motion shot: the fall and the water impact (frames 30–54) play at 0.2x, easing in and out.
 // Speed ramp: the stone starts a little slow high above and accelerates to real speed as it nears
 // the viewer (M02); impact and the falling pieces at 1x; the crack -> glow beat is slowed so it reads (M03).
 const sm=THREE.MathUtils.smoothstep;
 const rate=f=>{const fall=1-.55*sm(f,24,28)*(1-sm(f,30,40));const crackBeat=1-.55*sm(f,46,48)*(1-sm(f,59,62));return Math.min(fall,crackBeat);};
 const wallAt=[0];for(let f=1;f<=168*8;f++){const x=1+f/8;wallAt.push(wallAt[f-1]+(1/8)/24/rate(x-1/16));}
 const WALL_END=wallAt[wallAt.length-1];
 function storyFrame(sec){if(sec>=WALL_END)return 168;let lo=0,hi=wallAt.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(wallAt[m]<=sec)lo=m;else hi=m;}return 1+(lo+(sec-wallAt[lo])/(wallAt[hi]-wallAt[lo]))/8;}
 const fixed=params.has('frame')?Number(params.get('frame')):null;
 const replay=document.querySelector('.scene-replay');replay.hidden=reduced||fixed!==null;replay.addEventListener('click',()=>{elapsed=0;frames=0;renderer.shadowMap.autoUpdate=true;renderer.shadowMap.needsUpdate=true;clock.start();document.body.classList.remove('is-revealed');});
 function animate(){const rawDelta=clock.getDelta(),dt=Math.min(rawDelta,.05);elapsed+=Math.min(rawDelta,frames<2?.05:.1);   // a single slow frame never makes the story jump
  const frame=reduced?168:fixed??storyFrame(elapsed),t=(frame-1)/24,storyClock=t+Math.max(0,elapsed-WALL_END);
  sample(hero,dropTrack,frame);closed.scene.visible=frame<46.5;geode.scene.visible=true;gem.scene.visible=true;
  fragments.scene.visible=frame>=46.5;fracture.update(frame);
  {const E=(a,b,x)=>THREE.MathUtils.smoothstep(x,a,b);crack.grow.value=E(46.5,56,frame);crack.glow.value=frame<62?E(49.5,58,frame):0;crack.cut.value=frame<62?0:1.3*(1-E(64,80,frame));crack.edge.value=frame<62?E(49.5,58,frame):1-E(64,78,frame);
   hero.updateMatrixWorld(true);crackLight.position.copy(geodeCenterW.copy(target).applyMatrix4(hero.matrixWorld));crackLight.intensity=frame<62?E(52,61,frame)*.35:Math.max(0,.35*(1-(frame-62)/10));}
  for(let i=0;i<N;i++){const d=drops[i],age=t-d.birth,y=d.y0+age*d.vy-4.905*age*age;const visible=age>0&&y>WATER_Y&&age<d.contactAge&&age<1.6;dummy.position.set(d.x+d.vx*age,y,d.z+d.vz*age);vel.set(d.vx,d.vy-9.81*age,d.vz);const sp=vel.length();if(sp>1e-4)dummy.quaternion.setFromUnitVectors(up,vel.divideScalar(sp));dummy.scale.set(visible?d.r:0,visible?d.r*(1+sp*.28):0,visible?d.r:0);dummy.updateMatrix();dropMesh.setMatrixAt(i,dummy.matrix);}dropMesh.instanceMatrix.needsUpdate=true;
  const blend=1-Math.exp(-dt*5.5);smooth.lerp(reduced?new THREE.Vector2():pointer,blend);
  const yaw=smooth.x*.19,pitch=smooth.y*.055;
  const ease=(a,b,x)=>{const u=clamp((x-a)/(b-a),0,1);return u*u*(3-2*u);};
  hero.updateMatrixWorld(true);const geodeCenter=target.clone().applyMatrix4(hero.matrixWorld);
  // Low first-person approach: water -> falling stone / reveal -> water again.
  const waterFocus=new THREE.Vector3(target.x,-.015,4.22);
  const lookUp=ease(25,44,frame)*(1-ease(110,160,frame));
  const tracking=waterFocus.clone().lerp(geodeCenter,lookUp*(.9+.1*ease(26,40,frame)*(1-ease(52,80,frame))));
  const approach=ease(1,48,frame),walking=(1-ease(38,54,frame))*(reduced?0:1);
  const fallShot=ease(26,40,frame)*(1-ease(52,80,frame));
  const distance=(innerWidth<820?2.8:3.35)+(1-approach)*.6-.45*fallShot;
  const bob=Math.sin(t*10.5)*.009*walking,sideStep=Math.sin(t*5.25)*.009*walking;
  camera.position.set(target.x+Math.sin(yaw)*distance+sideStep,.27-.09*fallShot+Math.sin(pitch)*distance+bob,waterFocus.z+Math.cos(yaw)*distance);
  const hitAge=t-46/24;if(hitAge>=0&&!reduced)camera.position.y+=Math.sin(hitAge*65)*Math.exp(-hitAge*9)*.018;
  {const fov=baseFov+7*fallShot;if(Math.abs(camera.fov-fov)>.01){camera.fov=fov;camera.updateProjectionMatrix();}}
  camera.lookAt(tracking);camera.rotateZ(Math.sin(t*5.25)*.0025*walking);
  const pulse=Math.max(0,1-(t-46/24)*1.5)*(t>=46/24?1:0)+Math.max(0,1-(t-81/24)*1.5)*(t>=81/24?1:0);
  water.material.uniforms.uTime.value=reduced?0:storyClock;water.material.uniforms.uPulse.value=pulse;
  forestMist.setCrackLight(crackLight.position,crackApertures,reduced?0:Math.max(crack.glow.value,crack.edge.value*.6));
  forestMist.update(storyClock,camera,pointerUV,performance.now()-lastInput<1400,dt);
  const scrollProgress=showcase.update(dt);
  waterContacts.update(reduced?100:t,scrollProgress>.001||reduced);
  renderer.shadowMap.autoUpdate=scrollProgress<.001&&frame<168;
  optics?.update(1+scrollProgress*.7,showcase.gemLightLevel);
  if(frame>=96)document.body.classList.add('is-revealed');
  renderer.render(scene,camera);if(frame>=168)renderer.shadowMap.autoUpdate=false;const lensDrops=lens.update(reduced||scrollProgress>.1?0:(fixed!==null?(params.has("lens")?t:0):storyClock));frames++;
  // Read-only diagnostics support visual QA without controlling scene behavior.
  window.transilkScene={scrollProgress:showcase.progress,ready:true,frame,camera:camera.position.toArray(),target:tracking.toArray(),projectedTarget:tracking.clone().project(camera).toArray(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,elapsed,frames,wallSeconds:(performance.now()-started)/1000,mode:'realtime-threejs',quality:ultra?'4k':'native',drawingBuffer:[canvas.width,canvas.height],cameraShot:frame<25?'water-approach':frame<110?'fall-and-reveal':frame<160?'return-to-water':'water-hold',lensDrops,waterContacts:{events:waterContacts.events,bankHits:waterContacts.bankContacts,ripples:waterContacts.activeRipples},scrollProgress,sandGrains:showcase.sandCount,gemPosition:showcase.gemPosition,mist:{wisps:forestMist.count,direction:'forest-to-camera'},fracture:fracture.diagnostics(frame)};
  if(!reduced)requestAnimationFrame(animate);
 }if(reduced){addEventListener('scroll',animate,{passive:true});addEventListener('resize',animate);}animate();
}
