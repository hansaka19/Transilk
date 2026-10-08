import * as THREE from 'three';
// Deterministic, precomputed ballistic contacts. A realtime surface response, not fluid simulation.
export function createWaterContacts({scene,water,drops,environment,lowMem}) {
 const group=new THREE.Group();group.name='Water impact response';scene.add(group);
 scene.updateMatrixWorld(true);water.updateWorldMatrix(true,false);
 const inv=water.matrixWorld.clone().invert(),v=new THREE.Vector3(),p=new THREE.Vector3(),q=new THREE.Vector3(),delta=new THREE.Vector3();
 const inside=P=>{v.copy(P).applyMatrix4(inv);return v.x*v.x+v.y*v.y<1.35*1.35;};
 const candidates=[];for(const root of [environment,...scene.children.filter(o=>o.userData.forestBatch)])root.traverseVisible(o=>{
  if(!o.isMesh||!o.geometry||[].concat(o.material).some(m=>m.alphaTest>0||m.alphaMap))return;
  const box=new THREE.Box3().setFromObject(o);if(box.max.y<-.11||box.min.z>9||box.max.z<2)return;
  candidates.push({mesh:o,box});
 });
 // Spatial triangle bins bound collision work to the small puddle neighbourhood.
 const bins=new Map(),CELL=.3,A=new THREE.Vector3(),B=new THREE.Vector3(),C=new THREE.Vector3();
 for(const {mesh} of candidates){const attr=mesh.geometry.attributes.position,idx=mesh.geometry.index,n=idx?idx.count:attr.count;
  for(let i=0;i<n;i+=3){A.fromBufferAttribute(attr,idx?idx.getX(i):i).applyMatrix4(mesh.matrixWorld);B.fromBufferAttribute(attr,idx?idx.getX(i+1):i+1).applyMatrix4(mesh.matrixWorld);C.fromBufferAttribute(attr,idx?idx.getX(i+2):i+2).applyMatrix4(mesh.matrixWorld);
   const x0=Math.min(A.x,B.x,C.x),x1=Math.max(A.x,B.x,C.x),z0=Math.min(A.z,B.z,C.z),z1=Math.max(A.z,B.z,C.z);
   if(x1<-3||x0>3||z1<2||z0>10||Math.min(A.y,B.y,C.y)>1||Math.max(A.y,B.y,C.y)<-.11)continue;
   const tri=[A.clone(),B.clone(),C.clone()];
   for(let x=Math.floor(Math.max(-3,x0)/CELL);x<=Math.floor(Math.min(3,x1)/CELL);x++)for(let z=Math.floor(Math.max(2,z0)/CELL);z<=Math.floor(Math.min(10,z1)/CELL);z++){const key=x+','+z;if(!bins.has(key))bins.set(key,[]);bins.get(key).push(tri);}
  }
 }
 const ray=new THREE.Ray(),segment=new THREE.Box3(),hitPoint=new THREE.Vector3(),normal=new THREE.Vector3(),edge=new THREE.Vector3(),events=[];
 function at(d,t,out){return out.set(d.x+d.vx*t,d.y0+d.vy*t-4.905*t*t,d.z+d.vz*t);}
 // Check each curved flight in short segments while loading; never raycast in the render loop.
 for(const d of drops){
  const end=(d.vy+Math.sqrt(d.vy*d.vy+19.62*(d.y0-water.position.y)))/9.81;
  let contact=null;const steps=Math.max(4,Math.ceil(end/.085));
  for(let k=0;k<steps&&!contact;k++){
   const a=end*k/steps,b=end*(k+1)/steps;at(d,a,p);at(d,b,q);delta.subVectors(q,p);const len=delta.length();
   ray.set(p,delta.normalize());segment.setFromPoints([p,q]);let nearest=len+.001,hit=null;
   const visited=new Set();for(let x=Math.floor(segment.min.x/CELL);x<=Math.floor(segment.max.x/CELL);x++)for(let z=Math.floor(segment.min.z/CELL);z<=Math.floor(segment.max.z/CELL);z++)for(const tri of bins.get(x+','+z)||[]){
    if(visited.has(tri))continue;visited.add(tri);if(!ray.intersectTriangle(tri[0],tri[1],tri[2],false,hitPoint))continue;
    const distance=p.distanceTo(hitPoint);if(distance<.001||distance>nearest)continue;
    if(hitPoint.y<=water.position.y+.003&&inside(hitPoint))continue;
    nearest=distance;normal.subVectors(tri[1],tri[0]).cross(edge.subVectors(tri[2],tri[0])).normalize();if(normal.dot(delta)>0)normal.negate();hit={point:hitPoint.clone(),normal:normal.clone()};
   }
   if(hit)contact={t:a+(b-a)*nearest/len,...hit,pool:false};
  }
  if(!contact){at(d,end,p);if(inside(p))contact={t:end,point:p.clone(),normal:new THREE.Vector3(0,1,0),pool:true};}
  d.contactAge=contact?.t??end;
  if(contact){const speed=Math.hypot(d.vx,d.vy-9.81*contact.t,d.vz);events.push({...contact,birth:d.birth+contact.t,strength:THREE.MathUtils.clamp(d.r*speed*11,.025,.5)});}
 }
 // Entry and cover impacts share the original animation's timing and world origins.
 for(const [birth,x,z,strength] of [[46/24,.2,3.9,1],[81/24,-.1,4.32,.55],[94/24,-.1,4.32,.3]]){
  p.set(x,water.position.y,z);if(inside(p))events.push({birth,point:p.clone(),normal:new THREE.Vector3(0,1,0),pool:true,strength});
 }
 events.sort((a,b)=>a.birth-b.birth);
 const ringCount=lowMem?20:48;
 const ringMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{uTime:{value:0},uWaterInverse:{value:inv}},
  vertexShader:'attribute float aBirth,aStrength;uniform float uTime;uniform mat4 uWaterInverse;varying vec2 vPool;varying vec2 vUv;varying float vAlpha;void main(){vUv=uv;vPool=(uWaterInverse*modelMatrix*instanceMatrix*vec4(position,1.)).xy;float age=uTime-aBirth;vAlpha=step(0.,age)*(1.-smoothstep(.18,1.2,age))*aStrength;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}',
  fragmentShader:'varying vec2 vUv;varying vec2 vPool;varying float vAlpha;void main(){if(length(vPool)>1.35)discard;float r=length(vUv-.5)*2.;float ring=exp(-pow((r-.78)*38.,2.))*.20+exp(-pow((r-.9)*50.,2.))*.08;gl_FragColor=vec4(.42,.48,.42,ring*vAlpha);}' });
 const ringGeo=new THREE.PlaneGeometry(1,1);ringGeo.setAttribute('aBirth',new THREE.InstancedBufferAttribute(new Float32Array(ringCount),1));ringGeo.setAttribute('aStrength',new THREE.InstancedBufferAttribute(new Float32Array(ringCount),1));
 const rings=new THREE.InstancedMesh(ringGeo,ringMaterial,ringCount);rings.frustumCulled=false;group.add(rings);
 // Bank marks are brief translucent wetted specks, laid onto the actual hit face.
 const bankEvents=events.filter(e=>!e.pool).sort((a,b)=>b.strength-a.strength).slice(0,lowMem?28:64);
 const markGeo=new THREE.PlaneGeometry(1,1);const markMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,uniforms:{uTime:{value:0}},
  vertexShader:'attribute float aBirth;uniform float uTime;varying vec2 vUv;varying float vFade;void main(){vUv=uv;float age=uTime-aBirth;vFade=step(0.,age)*(1.-smoothstep(1.,4.,age));gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}',
  fragmentShader:'varying vec2 vUv;varying float vFade;void main(){vec2 p=vUv-.5;float r=length(p);float edge=.34+.045*sin(atan(p.y,p.x)*7.);float a=(1.-smoothstep(edge-.1,edge,r))*vFade*.24;gl_FragColor=vec4(.018,.025,.021,a);}' });
 markGeo.setAttribute('aBirth',new THREE.InstancedBufferAttribute(new Float32Array(bankEvents.map(e=>e.birth)),1));
 const marks=new THREE.InstancedMesh(markGeo,markMat,bankEvents.length);marks.frustumCulled=false;group.add(marks);
 const dummy=new THREE.Object3D(),xAxis=new THREE.Vector3(1,0,0),up=new THREE.Vector3(0,0,1);bankEvents.forEach((e,i)=>{dummy.position.copy(e.point).addScaledVector(e.normal,.0015);dummy.quaternion.setFromUnitVectors(up,e.normal);dummy.scale.setScalar(.025+e.strength*.14);dummy.updateMatrix();marks.setMatrixAt(i,dummy.matrix);});
 // Ripples also distort the reflection, so they belong to the water instead of floating over it.
 const waveCount=12,waves=Array.from({length:waveCount},()=>new THREE.Vector4(0,0,-100,0));water.material.uniforms.uContacts={value:waves};water.material.uniforms.uContactTime={value:0};
 water.material.fragmentShader='uniform vec4 uContacts[12];uniform float uContactTime;\n'+water.material.fragmentShader;
 water.material.fragmentShader=water.material.fragmentShader.replace('vec4 base = texture2DProj(tDiffuse,waveUv);',`for(int i=0;i<12;i++){vec4 e=uContacts[i];float age=uContactTime-e.z;vec2 offset=(vRipple-e.xy)*vec2(.70,1.65);float r=length(offset);float wave=exp(-pow((r-age*.7)/.065,2.))*exp(-age*2.3)*step(0.,age)*e.w;waveUv.xy+=normalize(offset+vec2(.0001)) *wave*.0016*waveUv.w;}vec4 base = texture2DProj(tDiffuse,waveUv);`);water.material.needsUpdate=true;
 let active=0;const selected=[];
 return {group,events:events.length,bankContacts:bankEvents.length,update(t,hidden=false){
  group.visible=!hidden;ringMaterial.uniforms.uTime.value=t;markMat.uniforms.uTime.value=t;water.material.uniforms.uContactTime.value=t;selected.length=0;
  for(const e of events){const age=t-e.birth;if(e.pool&&age>=0&&age<1.2)selected.push(e);}
  selected.sort((a,b)=>b.strength-a.strength);active=Math.min(ringCount,selected.length);
  for(let i=0;i<ringCount;i++){const e=selected[i];dummy.quaternion.setFromAxisAngle(xAxis,-Math.PI/2);
   if(e){const age=t-e.birth;dummy.position.copy(e.point);dummy.position.y=water.position.y+.002;dummy.scale.setScalar((.01+age*.7)*2/.78);ringGeo.attributes.aBirth.setX(i,e.birth);ringGeo.attributes.aStrength.setX(i,e.strength);}else dummy.scale.setScalar(0);
   dummy.updateMatrix();rings.setMatrixAt(i,dummy.matrix);
  }rings.instanceMatrix.needsUpdate=true;ringGeo.attributes.aBirth.needsUpdate=true;ringGeo.attributes.aStrength.needsUpdate=true;
  for(let i=0;i<waveCount;i++){const e=selected[i];if(e){v.copy(e.point).applyMatrix4(inv);waves[i].set(v.x,v.y,e.birth,e.strength);}else waves[i].set(0,0,-100,0);}
 },get activeRipples(){return active;}};
}
