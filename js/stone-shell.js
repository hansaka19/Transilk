import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

// Cut the visible closed stone itself into surface patches with substantial stone thickness.
// The assembled patches and the sealed mesh share their exterior vertices exactly.
export function splitStoneShell(closed, material) {
 closed.updateMatrixWorld(true);let source;closed.traverse(o=>{if(o.isMesh&&!source)source=o;});
 const g=source.geometry.clone().applyMatrix4(source.matrixWorld);g.computeBoundingBox();
 const P=g.attributes.position,N=g.attributes.normal,I=g.index?.array??Array.from({length:P.count},(_,i)=>i),box=g.boundingBox;
 const c=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
 const front=[],back=[];
 for(let i=0;i<I.length;i+=3){const ids=[I[i],I[i+1],I[i+2]],z=ids.reduce((a,id)=>a+P.getZ(id),0)/3;
  const t={ids,x:ids.reduce((a,id)=>a+P.getX(id),0)/3,y:ids.reduce((a,id)=>a+P.getY(id),0)/3};
  (z>c.z+.075?front:back).push(t);
 }
 // Farthest-point cells have irregular sizes, rather than radial pizza-slice fracture lines.
 const seeds=[front[Math.floor(front.length*.37)]];
 for(let j=1;j<28;j++){let best,bestD=-1;for(const t of front){const d=Math.min(...seeds.map(s=>(t.x-s.x)**2+(t.y-s.y)**2));if(d>bestD){bestD=d;best=t;}}seeds.push(best);}
 const cells=seeds.map(()=>[]),extraP=[],extraN=[],baseCount=P.count;
 const originalP=P,originalN=N;
 const get=(attr,extra,id,k)=>id<baseCount?attr.array[id*3+k]:extra[(id-baseCount)*3+k];
 const point=id=>[P.getX(id),P.getY(id),P.getZ(id),N.getX(id),N.getY(id),N.getZ(id)];
 for(let cell=0;cell<seeds.length;cell++)for(const t of front){let poly=t.ids.map(point);const seed=seeds[cell];
  for(let j=0;j<seeds.length&&poly.length;j++){if(j===cell)continue;const other=seeds[j],nx=other.x-seed.x,ny=other.y-seed.y,d=(other.x**2+other.y**2-seed.x**2-seed.y**2)/2,out=[];
   for(let k=0;k<poly.length;k++){const a=poly[k],b=poly[(k+1)%poly.length],da=a[0]*nx+a[1]*ny-d,db=b[0]*nx+b[1]*ny-d;if(da<=0)out.push(a);if((da<0)!==(db<0)){const f=da/(da-db);out.push(a.map((v,k)=>v+(b[k]-v)*f));}}poly=out;
  }
  if(poly.length>=3){const ids=poly.map(v=>{const id=baseCount+extraP.length/3;extraP.push(...v.slice(0,3));extraN.push(...v.slice(3));return id;});for(let j=1;j<ids.length-1;j++)cells[cell].push({ids:[ids[0],ids[j],ids[j+1]]});}
 }
 const readP={getX:i=>get(originalP,extraP,i,0),getY:i=>get(originalP,extraP,i,1),getZ:i=>get(originalP,extraP,i,2)},readN={getX:i=>get(originalN,extraN,i,0),getY:i=>get(originalN,extraN,i,1),getZ:i=>get(originalN,extraN,i,2)};
 const cut=new THREE.MeshStandardMaterial({name:'Fresh broken charcoal stone',color:0x273031,roughness:.96,metalness:0});
 function mesh(tris,solid){const pos=[],nor=[],indices=[],walls=[],edge=new Map(),map=new Map();
  const depth=.052;
  function vert(id){const key=[readP.getX(id),readP.getY(id),readP.getZ(id)].map(x=>Math.round(x*1e6)).join(":");if(map.has(key))return map.get(key);const n=pos.length/3;map.set(key,n);pos.push(readP.getX(id),readP.getY(id),readP.getZ(id));nor.push(readN.getX(id),readN.getY(id),readN.getZ(id));return n;}
  for(const {ids} of tris){const mapped=ids.map(vert);indices.push(...mapped);for(let k=0;k<3;k++){const a=mapped[k],b=mapped[(k+1)%3],key=a<b?a+':'+b:b+':'+a;if(edge.has(key))edge.delete(key);else edge.set(key,[a,b]);}}
  const exteriorCount=indices.length;
  if(solid){const n=pos.length/3;for(let i=0;i<n;i++){pos.push(pos[i*3],pos[i*3+1],pos[i*3+2]-depth);nor.push(0,0,-1);}
   for(const {ids} of tris){const [a,b,c]=ids.map(id=>vert(id)+n);indices.push(c,b,a);}
   for(const [a,b] of edge.values()){const x=a,y=b;walls.push(x,y,y+n,x,y+n,x+n);}indices.push(...walls);
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));geo.setIndex(indices);geo.addGroup(0,exteriorCount,0);if(solid)geo.addGroup(exteriorCount,indices.length-exteriorCount,1);
  // Flat fracture normals are independent of the weathered outer surface normals.
  const flat=geo.toNonIndexed(),fn=flat.attributes.normal,fp=flat.attributes.position,a=new THREE.Vector3(),b=new THREE.Vector3(),d=new THREE.Vector3();
  for(let i=exteriorCount;i<fp.count;i+=3){a.fromBufferAttribute(fp,i);b.fromBufferAttribute(fp,i+1).sub(a);d.fromBufferAttribute(fp,i+2).sub(a);b.cross(d).normalize();for(let j=0;j<3;j++)fn.setXYZ(i+j,b.x,b.y,b.z);}
  geo.dispose();
  if(solid){const points=[];for(let i=0;i<pos.length;i+=3)points.push(new THREE.Vector3(pos[i],pos[i+1],pos[i+2]));const hull=new ConvexGeometry(points);flat.dispose();return new THREE.Mesh(hull,material);}
  return new THREE.Mesh(flat,[material,cut]);
 }
 const remainder=new THREE.Group(),pieces=new THREE.Group(),tracks={};remainder.add(mesh(back,false));
 cells.forEach((cell,i)=>{if(!cell.length)return;const o=mesh(cell,true);o.name='Shell_piece_'+i;o.castShadow=true;o.receiveShadow=true;pieces.add(o);tracks[o.name]=Array.from({length:168},()=>({p:new THREE.Vector3(),q:new THREE.Quaternion(),s:new THREE.Vector3(1,1,1)}));});
 g.dispose();return {remainder,pieces,tracks};
}
