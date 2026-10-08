import * as THREE from 'three';
const sat=x=>THREE.MathUtils.clamp(x,0,1),ease=(a,b,x)=>THREE.MathUtils.smoothstep(x,a,b);

// Scroll story: the forest turns into a handful of sand let go from above. Each surface crumbles
// top-down into grains carrying its own rendered colour, the grains pour down a shaft while the
// camera sinks into the earth past soil strata; with no light source underground the sapphire dims,
// then brightens into the pale studio showcase. Everything is a pure function of scroll progress,
// so scrolling back reverses it. (Grain motion is scroll-driven: it pauses when scrolling stops.)
export function createScrollShowcase({renderer,scene,camera,hero,gem,geode,closed,fragments,environment,water,dropMesh,shaft,reduced,lowMem}){
 const story=document.querySelector('.scroll-story'),panel=document.querySelector('.product-showcase'),front=document.querySelector('.product-controls');
 const forestElements=[document.querySelector('.hero__top'),document.querySelector('.hero__content'),document.querySelector('.scene-replay')];
 const root=document.documentElement;let eyeglass=null;
 // One gesture plays the whole story: a scroll/swipe/key down runs the sand descent to the final
 // showcase on its own timeline, one gesture up rewinds it to the hero. The page itself does not
 // scroll inside the stage. (Below the showcase the category/buy section is still to be designed.)
 // Playback follows how hard the user scrolls: a gentle tick plays in ~3 s, a fast flick or
 // continued scrolling in the same direction speeds it up (to ~1 s); it eases back when input stops.
 const DOWN_S=1.6,UP_S=1.3;let speed=1,speedTarget=1;
 const push=amount=>{speedTarget=Math.min(2.6,Math.max(speedTarget,.7+amount));};
 let progress=0,target=0,lastWheel=0,wheelDir=0,lastStart=-1e9;
 const hash=location.hash;if(hash==='#collection'||hash==='#sapphires'){progress=target=1;}
 const locked=()=>target!==progress;
 function play(dir){
  const t=dir>0?1:0;if(target===t)return;
  if(reduced){target=progress=t;return;}
  target=t;lastStart=performance.now();speed=speedTarget=1;
 }
 const atStage=()=>Math.abs(scrollY-story.offsetTop)<4;
 addEventListener('wheel',e=>{
  if(!atStage())return;
  const now=performance.now(),dir=Math.sign(e.deltaY),gap=now-lastWheel;lastWheel=now;
  // a trackpad flick / wheel burst is ONE gesture: a new one needs a 220 ms pause or a real direction change
  const fresh=gap>220||(dir!==wheelDir&&Math.abs(e.deltaY)>10);if(dir)wheelDir=dir;
  const wantsDown=dir>0,atEnd=progress>=1&&target===1;
  if(wantsDown&&atEnd&&!locked())return;                 // past the showcase: normal page scroll (category section, later)
  e.preventDefault();
  if(fresh&&dir)play(dir);
  if(dir&&locked()&&(dir>0)===(target===1))push(Math.min(2.3,Math.abs(e.deltaY)/55));
 },{passive:false});
 let touchY=null,touchFired=false,touchMoveLast=null,touchMoveT=null;
 addEventListener('touchstart',e=>{touchY=e.touches[0].clientY;touchFired=false;touchMoveLast=null;touchMoveT=null;},{passive:true});
 addEventListener('touchmove',e=>{if(touchY===null||!atStage())return;const dy=touchY-e.touches[0].clientY;
  const atEnd=progress>=1&&target===1;if(dy>0&&atEnd&&!locked())return;
  e.preventDefault();if(!touchFired&&Math.abs(dy)>30){touchFired=true;play(Math.sign(dy));}
  if(touchFired&&locked()){const now=performance.now(),v=Math.abs(dy-(touchMoveLast??0))/Math.max(8,now-(touchMoveT??now-16));touchMoveLast=dy;touchMoveT=now;push(Math.min(2.3,v*1.6));}},{passive:false});
 addEventListener('touchend',()=>{touchY=null;},{passive:true});
 addEventListener('keydown',e=>{
  if(e.target.closest&&e.target.closest('a,button,input,textarea,select,[contenteditable]'))return;
  const down=['ArrowDown','PageDown',' ','Spacebar'].includes(e.key),up=['ArrowUp','PageUp'].includes(e.key);
  if((!down&&!up)||!atStage())return;
  if(down&&progress>=1&&target===1)return;
  e.preventDefault();play(down?1:-1);
 });
 document.querySelector('.product-return').addEventListener('click',()=>{window.scrollTo({top:story.offsetTop,behavior:'instant'});play(-1);});
 for(const link of document.querySelectorAll('a[href="#collection"],a[href="#sapphires"]'))link.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:story.offsetTop,behavior:'instant'});play(1);});
 const playCurve=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;   // cinematic ease-in-out over the whole timeline
 let linear=progress;
 // Preserve the same sapphire and its optical shader throughout both shots.
 hero.updateMatrixWorld(true);const gemCenter=new THREE.Box3().setFromObject(gem).getCenter(new THREE.Vector3());
 const pivot=new THREE.Group();pivot.name='Sapphire scroll presentation';scene.add(pivot);pivot.add(gem);gem.position.sub(gemCenter);
 const worldGroup=new THREE.Group();worldGroup.name='Collapsing forest';scene.add(worldGroup);
 const objects=[environment,geode,closed,fragments,water,dropMesh,shaft,...scene.children.filter(o=>o.userData.forestBatch||o.name.startsWith('Forest mist wisp'))];
 for(const o of objects)if(o.parent!==hero)worldGroup.attach(o);
 const geoRest=geode.position.clone(),capRest=closed.position.clone();

 // ---------------------------------------------------------------- release timing (shared by surfaces and grains)
 // A grain/surface at normalised height h lets go at  R0 + R1*(1-h): the top of the scene first, like
 // sand slipping out of a hand held above, the ground last.
 const R0=.012,R1=.1,BAND=.03;
 const release={top:{value:4},bottom:{value:-.2},p:{value:0}};

 // ---------------------------------------------------------------- grains
 const count=lowMem?12000:38000,pos=new Float32Array(count*3),uv=new Float32Array(count*2),seeds=new Float32Array(count);
 let state=19241;const rand=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};
 for(let i=0;i<count;i++)seeds[i]=rand();
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));geometry.setAttribute('aUv',new THREE.BufferAttribute(uv,2));geometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,1));
 // The captured frame is linear HDR (tone mapping/sRGB are only applied on the canvas), so the grain
 // shader applies them once, like any other material.
 const capture=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType});
 const FLOOR=-3.7;
 const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uProgress:release.p,uTop:release.top,uBottom:release.bottom,uFrame:{value:capture.texture},uPixel:{value:Math.min(devicePixelRatio,1.5)},uFloor:{value:FLOOR}},
  vertexShader:`attribute float aSeed;attribute vec2 aUv;uniform float uProgress,uPixel,uTop,uBottom,uFloor;uniform sampler2D uFrame;varying vec3 vColor;varying float vFade;
   void main(){
    float h=clamp((position.y-uBottom)/(uTop-uBottom),0.,1.);
    float rel=${R0}+${R1}*(1.-h)+aSeed*.03;
    float t=max(0.,uProgress-rel)*3.1;                                   // scroll-time in "seconds"
    vec3 p=position;
    p.y-=.08*t+4.2*t*t;                                                  // gravity
    p.x+=sin(aSeed*89.)*t*.16+(.19-p.x)*min(1.,t*.35);                   // pour inward toward the shaft
    p.z+=cos(aSeed*117.)*t*.12+(5.6-p.z)*min(1.,t*.25);
    float landed=step(p.y,uFloor);p.y=max(p.y,uFloor+aSeed*.06);           // settle on the deep floor
    vColor=texture2D(uFrame,aUv).rgb*(1.05+.5*fract(aSeed*53.1))+vec3(.012,.009,.006);   // lit grain faces catch a little more light
    vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
    gl_PointSize=clamp((1.6+aSeed*2.2)*uPixel*4./max(.4,-mv.z),1.2,10.);
    vFade=smoothstep(rel,rel+.02,uProgress)*(1.-smoothstep(.62,.76,uProgress));}`,
  fragmentShader:`varying vec3 vColor;varying float vFade;void main(){vec2 q=gl_PointCoord-.5;float r=length(q);if(r>.5)discard;float shade=.6+.4*sqrt(max(0.,1.-r*r*4.));gl_FragColor=vec4(vColor*shade,(1.-smoothstep(.38,.5,r))*vFade);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  }`});
 const dust=new THREE.Points(geometry,material);dust.name='Released sand grains';dust.frustumCulled=false;dust.visible=false;scene.add(dust);
 const sampleMeshes=[],sampleLocal=new Float32Array(count*3);let prepared=false;
 function prepareSand(){
  const size=renderer.getDrawingBufferSize(new THREE.Vector2()),k=lowMem?.35:.5;capture.setSize(Math.max(64,size.x*k|0),Math.max(64,size.y*k|0));renderer.initRenderTarget?.(capture);
  const triangles=[],a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),ab=new THREE.Vector3(),ac=new THREE.Vector3();let area=0,top=-1e9,bottom=1e9;
  scene.updateMatrixWorld(true);
  for(const r of [worldGroup,geode,closed])r.traverseVisible(mesh=>{
   if(!mesh.isMesh||mesh.isInstancedMesh||!mesh.geometry?.attributes.position||!(mesh===water||[].concat(mesh.material||[]).some(m=>m.isMeshStandardMaterial)))return;
   const attr=mesh.geometry.attributes.position,idx=mesh.geometry.index,n=(idx?idx.count:attr.count)/3,step=Math.max(1,Math.ceil(n/12000));
   for(let f=0;f<n;f+=step){let k=f*3;a.fromBufferAttribute(attr,idx?idx.getX(k):k).applyMatrix4(mesh.matrixWorld);b.fromBufferAttribute(attr,idx?idx.getX(k+1):k+1).applyMatrix4(mesh.matrixWorld);c.fromBufferAttribute(attr,idx?idx.getX(k+2):k+2).applyMatrix4(mesh.matrixWorld);
    const x=(a.x+b.x+c.x)/3,y=(a.y+b.y+c.y)/3,z=(a.z+b.z+c.z)/3;
    if(Math.abs(x)>4||y<-.5||y>4.5||z<.5||z>7)continue;
    const weight=ab.subVectors(b,a).cross(ac.subVectors(c,a)).length()*.5*step;if(weight<1e-9)continue;
    area+=weight;top=Math.max(top,y);bottom=Math.min(bottom,y);triangles.push({mesh,a:a.clone(),b:b.clone(),c:c.clone(),sum:area});
   }
  });
  if(!triangles.length)return;
  release.top.value=top;release.bottom.value=bottom;
  const inverses=new Map(),point=new THREE.Vector3();for(let i=0;i<count;i++){
   const pick=rand()*area;let lo=0,hi=triangles.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(triangles[mid].sum<pick)lo=mid+1;else hi=mid;}
   const tri=triangles[lo],u=Math.sqrt(rand()),v=rand();point.copy(tri.a).multiplyScalar(1-u).addScaledVector(tri.b,u*(1-v)).addScaledVector(tri.c,u*v);point.toArray(pos,i*3);sampleMeshes[i]=tri.mesh;if(!inverses.has(tri.mesh))inverses.set(tri.mesh,tri.mesh.matrixWorld.clone().invert());point.applyMatrix4(inverses.get(tri.mesh)).toArray(sampleLocal,i*3);
  }
  geometry.attributes.position.needsUpdate=true;prepared=true;
 }
 const grainPoint=new THREE.Vector3(),ndc=new THREE.Vector3();
 // Snapshot the scene exactly as it looks now (without the sapphire and grains) and give each grain
 // the colour of the surface pixel it starts from.
 function captureSand(){
  const captureStart=performance.now();
  if(!prepared)prepareSand();scene.updateMatrixWorld(true);
  const scale=lowMem?.35:.5,size=renderer.getDrawingBufferSize(new THREE.Vector2());capture.setSize(Math.max(64,size.x*scale|0),Math.max(64,size.y*scale|0));
  const gemVis=pivot.visible,dustVis=dust.visible;pivot.visible=false;dust.visible=false;
  renderer.setRenderTarget(capture);renderer.render(scene,camera);renderer.setRenderTarget(null);pivot.visible=gemVis;dust.visible=dustVis;
  for(let i=0;i<sampleMeshes.length;i++){grainPoint.fromArray(sampleLocal,i*3).applyMatrix4(sampleMeshes[i].matrixWorld);grainPoint.toArray(pos,i*3);
   ndc.copy(grainPoint).project(camera);uv[i*2]=sat(ndc.x*.5+.5);uv[i*2+1]=sat(ndc.y*.5+.5);}
  geometry.attributes.position.needsUpdate=true;geometry.attributes.aUv.needsUpdate=true;window.transilkSandCaptureMs=performance.now()-captureStart;
 }

 // ---------------------------------------------------------------- surfaces crumble where their grains let go
 const mats=new Set();for(const r of [worldGroup,geode,closed])r.traverse(o=>{for(const m of [].concat(o.material||[]))if(m.isMeshStandardMaterial)mats.add(m);});
 const opaque=new Map();for(const m of mats)opaque.set(m,m.transparent);
 for(const m of mats){m.forceSinglePass=true;if(!opaque.get(m))m.alphaHash=true;const before=m.onBeforeCompile,key=m.customProgramCacheKey();
  m.onBeforeCompile=function(shader,...args){before.call(this,shader,...args);
   Object.assign(shader.uniforms,{uSandP:release.p,uSandTop:release.top,uSandBottom:release.bottom});
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying float vSandY;').replace('#include <project_vertex>','#include <project_vertex>\nvSandY=(modelMatrix*vec4(transformed,1.)).y;');
   shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform float uSandP,uSandTop,uSandBottom;varying float vSandY;')
    .replace('#include <alphahash_fragment>',`{float h=clamp((vSandY-uSandBottom)/(uSandTop-uSandBottom),0.,1.);float rel=${R0}+${R1}*(1.-h);diffuseColor.a*=1.-smoothstep(rel,rel+${BAND},uSandP);}\n#include <alphahash_fragment>`);};
  m.customProgramCacheKey=()=>key+'-sand-release-v4';m.needsUpdate=true;}
 for(const effect of [water,shaft]){const m=effect.material;m.uniforms.uSandFade={value:0};m.fragmentShader='uniform float uSandFade;\n'+m.fragmentShader.replace(/}\s*$/, 'gl_FragColor.rgb*=1.-uSandFade;gl_FragColor.a*=1.-uSandFade;\n}');m.needsUpdate=true;}

 // ---------------------------------------------------------------- the earth the camera sinks into
 // Procedural browser strata (not a Blender asset): layered soil, clay and stone bands with roots,
 // darker with depth, seen from inside a shaft around the descent path.
 const strata=new THREE.Mesh(new THREE.CylinderGeometry(2.7,2.7,4.6,96,1,true),new THREE.ShaderMaterial({side:THREE.BackSide,transparent:true,depthWrite:false,
  uniforms:{uOpacity:{value:0},uLight:{value:1}},
  vertexShader:'varying vec3 vP;varying float vDist;void main(){vP=position;vec4 mv=modelViewMatrix*vec4(position,1.);vDist=-mv.z;gl_Position=projectionMatrix*mv;}',
  fragmentShader:`varying vec3 vP;varying float vDist;uniform float uOpacity,uLight;
   float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
   float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
   float fbm(vec3 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*noise(p);p*=2.03;a*=.5;}return s;}
   void main(){
    float y=vP.y-2.3;                                                     // 0 at the surface, negative going down
    float warp=fbm(vP*1.3)*.6+fbm(vP*4.1)*.12;
    float band=fract((-y+warp)*2.1);
    vec3 topsoil=vec3(.11,.075,.05),clay=vec3(.22,.15,.1),sand=vec3(.3,.23,.15),stone=vec3(.17,.16,.155);
    vec3 c=mix(topsoil,clay,smoothstep(.3,1.4,-y));
    c=mix(c,sand,smoothstep(.55,.62,band)*(1.-smoothstep(.75,.82,band))*.55*fbm(vP*2.7+3.));
    c=mix(c,stone,smoothstep(.62,.7,fbm(vP*4.))*.7);
    float roots=smoothstep(.985,1.,sin(vP.x*9.+fbm(vP*3.)*6.)*sin(vP.z*8.+y*2.))*(1.-smoothstep(0.,1.2,-y));
    c=mix(c,vec3(.12,.08,.05),roots);
    c*=.55+.6*fbm(vP*9.);                                                 // grit
    c*=(.22+.85*exp(y*.5))*uLight;                                        // lit from the opening above, darker with depth
    c*=exp(-max(0.,vDist-1.2)*.38);                                       // darkness swallows the far wall
    float edge=smoothstep(-.02,-.18,y);                                   // soft lip at the surface
    gl_FragColor=vec4(c,uOpacity*edge);
    #include <colorspace_fragment>
   }`}));
 strata.name='Earth strata (procedural)';strata.position.set(.19,-2.4,5.6);strata.renderOrder=-2;strata.visible=false;scene.add(strata);

 // ---------------------------------------------------------------- light: dims underground, returns in the studio
 const baseExposure=renderer.toneMappingExposure,baseEnv=scene.environmentIntensity,baseFog=scene.fog.density;
 const turn=new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.28,.08,-.12));
 const forestLights=scene.children.filter(o=>o.isLight).map(o=>[o,o.intensity]);let gemLightLevel=1;
 const studioLight=new THREE.HemisphereLight(0xe8f0ff,0x798193,0);scene.add(studioLight);
 const studioKey=new THREE.DirectionalLight(0xf7faff,0);studioKey.position.set(-3,4,6);scene.add(studioKey);
 // the last daylight from the opening above, fading as the gem goes deeper; a faint rim so it never vanishes
 const holeLight=new THREE.SpotLight(0xcfe6ff,0,9,.5,.9,1.5);holeLight.position.set(.19,1.2,5.4);scene.add(holeLight,holeLight.target);
 const rim=new THREE.PointLight(0x7fa6ff,0,2.2,2);scene.add(rim);
 scene.background=null;

 // ---------------------------------------------------------------- per-frame state (no allocations)
 const collapse={value:0},sourceQ=new THREE.Quaternion(),sourceScale=new THREE.Vector3(),sourceP=new THREE.Vector3(),source=new THREE.Matrix4(),gemOffset=new THREE.Matrix4().makeTranslation(gemCenter.x,gemCenter.y,gemCenter.z);
 const goal=new THREE.Vector3(),camGoal=new THREE.Vector3(),dir=new THREE.Vector3(),aim=new THREE.Vector3();
 let previous=0,transparentOn=false;const css={};
 const setVar=(k,v)=>{v=Math.round(v*1000)/1000;if(css[k]!==v){css[k]=v;root.style.setProperty(k,v);}};
 const gemMats=[];gem.traverse(o=>{if(o.isMesh)gemMats.push(o.material);});

 function setCrumbleTransparency(){}   // crumble uses alphaHash, compiled once at load (was: toggling transparent mid-scroll, which stalled)
 return {prepare:prepareSand,beginWarmup(){dust.visible=true;strata.visible=true;setCrumbleTransparency(true);},endWarmup(){if(prepared||true){const gv=pivot.visible;pivot.visible=false;const dv=dust.visible;dust.visible=false;renderer.setRenderTarget(capture);renderer.render(scene,camera);renderer.setRenderTarget(null);pivot.visible=gv;dust.visible=dv;}   // compile the linear capture-target shader variants now, not on the first scroll
  dust.visible=false;strata.visible=false;setCrumbleTransparency(false);},update(dt){
  // time-driven playback toward the target; reversing mid-play continues from where it is
  speedTarget+=(1-speedTarget)*(1-Math.exp(-dt*1.6));speed+=(speedTarget-speed)*(1-Math.exp(-dt*8));
  const step=Math.min(dt,.25)*speed;
  if(reduced)linear=target;else if(linear<target)linear=Math.min(target,linear+step/DOWN_S);else if(linear>target)linear=Math.max(target,linear-step/UP_S);
  progress=linear<=0?0:linear>=1?1:playCurve(linear);
  document.body.classList.toggle('story-locked',linear!==target);
  const p=progress,travel=ease(.14,.92,p),arrival=ease(.72,.97,p),fall=ease(0,.58,p);
  setVar('--showcase',arrival);setVar('--studio',ease(.76,1,p));setVar('--forest-ui',1-ease(0,.18,p));
  panel.setAttribute('aria-hidden',arrival<.5?'true':'false');front.inert=arrival<.7;
  for(const el of forestElements)el.inert=p>.05;
  document.body.classList.toggle('in-showcase',p>.05);

  hero.updateMatrixWorld(true);source.copy(hero.matrixWorld).multiply(gemOffset).decompose(sourceP,sourceQ,sourceScale);
  goal.set(.19,-2.95,4.8);const scale=innerWidth<820?2.05:4.6;
  pivot.position.copy(sourceP);pivot.position.z+=.55*ease(.0,.12,p)*(1-travel);pivot.position.lerp(goal,travel);pivot.quaternion.copy(sourceQ).slerp(turn,travel);pivot.scale.copy(sourceScale).multiplyScalar(1+(scale-1)*travel);

  if(p>0&&previous===0&&!reduced)captureSand();
  release.p.value=reduced?(p>0?1:0):p;
  worldGroup.position.set(0,0,0);worldGroup.rotation.z=0;geode.position.copy(geoRest);closed.position.copy(capRest);
  const gone=R0+R1+.03+BAND;collapse.value=ease(.01,gone,p);
  const crumbling=p>0&&p<gone;
  // Both material variants are warmed under the loader. Restore opaque depth rejection in the forest.
  setCrumbleTransparency(crumbling);
  worldGroup.visible=p<gone;geode.visible=geode.visible&&p<gone;closed.visible=closed.visible&&p<gone;
  water.material.uniforms.uSandFade.value=ease(.03,.2,p);shaft.material.uniforms.uSandFade.value=ease(.01,.12,p);shaft.visible=p<.12;
  for(const o of worldGroup.children)if(o.name.startsWith('Forest mist wisp'))o.material.uniforms.uOpacity.value*=1-collapse.value;
  previous=p;
  dust.visible=p>.001&&p<.77;

  // camera: intro pose -> down the shaft to the studio framing; look target is a pure function of progress
  camera.getWorldDirection(dir);aim.copy(camera.position).addScaledVector(dir,3);
  camGoal.set(.19,-2.7,innerWidth<820?6.5:6.8);
  const sink=ease(.04,.9,p);camera.position.lerp(camGoal,sink);
  aim.lerp(pivot.position,ease(0,.3,p));camera.lookAt(aim);

  // light curve: 1 in the forest, ~0.22 deep underground (30-55 %), back to full in the studio
  const dark=ease(.1,.32,p)*(1-ease(.6,.92,p)),level=1-.78*dark;
  gemLightLevel=1-.96*dark;
  for(const [light,intensity] of forestLights)light.intensity=intensity*(1-ease(.12,.36,p));
  renderer.toneMappingExposure=baseExposure*(.35+.65*level);
  scene.environmentIntensity=(baseEnv+.18*ease(.6,1,p))*level;
  scene.fog.density=baseFog*(1-travel);
  studioLight.intensity=ease(.7,1,p)*.45;studioKey.intensity=ease(.7,1,p)*.85;
  holeLight.intensity=ease(.04,.16,p)*(1-ease(.2,.55,p))*6;holeLight.target.position.copy(pivot.position);
  rim.intensity=.25*ease(.1,.3,p)*(1-ease(.85,1,p));rim.position.copy(pivot.position).add(dir.set(.6,.4,.5));
  for(const m of gemMats){m.specularIntensity=1-travel*.65;m.clearcoat=1-travel*.82;}

  // earth strata around the descent, fading in once the ground has crumbled and out before the studio
  const earth=ease(.08,.2,p)*(1-ease(.74,.9,p));strata.visible=earth>.001;strata.material.uniforms.uOpacity.value=earth;strata.material.uniforms.uLight.value=.35+.65*level;

  (eyeglass??=document.querySelector('.eyeglass-water'))?.style.setProperty('opacity',1-fall);
  return p;
 },get progress(){return progress;},get release(){return release.p.value;},get sandCount(){return count;},get gemLightLevel(){return gemLightLevel;},get gemPosition(){return pivot.position.toArray();}};
}
