import * as THREE from 'three';

// Convex brilliant-cut ray tracing: the actual facet planes, not random facet colours.
// Coordinates are normalised for precision. Up to five internal reflections and wavelength IORs.
export function installGemOptics(material, group) {
  let mesh;
  group.traverse(o => { if (o.isMesh) mesh = o; });
  const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry;
  geometry.computeBoundingBox();
  const center = geometry.boundingBox.getCenter(new THREE.Vector3());
  const radius = geometry.boundingBox.getSize(new THREE.Vector3()).length() / 2;
  const pos = geometry.attributes.position, planes = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos,i).sub(center).divideScalar(radius);
    b.fromBufferAttribute(pos,i+1).sub(center).divideScalar(radius);
    c.fromBufferAttribute(pos,i+2).sub(center).divideScalar(radius);
    const normal = b.clone().sub(a).cross(c.clone().sub(a));
    if (normal.lengthSq() < 1e-12) continue;
    normal.normalize(); let d = normal.dot(a);
    if (d < 0) { normal.negate(); d = -d; }
    const same = planes.find(p => p.n.dot(normal) > .9995 && Math.abs(p.d-d)<.003);
    if (!same) planes.push({n:normal,d});
  }
  if (planes.length > 96 || planes.length < 16) throw new Error(`Unexpected sapphire hull: ${planes.length} planes`);
  const hull = planes.map(p=>new THREE.Vector4(p.n.x,p.n.y,p.n.z,p.d));
  while(hull.length<96) hull.push(new THREE.Vector4(0,0,1,100));
  const uniforms = {
    uFacetPlanes:{value:hull},uFacetCount:{value:planes.length},
    uGemCenter:{value:center},uGemRadius:{value:radius},
    uGemIncidentLight:{value:1},uGemAbsorptionScale:{value:1},uGemInverse:{value:new THREE.Matrix4()},uGemWorld:{value:new THREE.Matrix4()},
  };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms,uniforms);
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vGemLocal;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\nvGemLocal = position;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <lights_physical_pars_fragment>',`#include <lights_physical_pars_fragment>
      varying vec3 vGemLocal;
      uniform vec4 uFacetPlanes[96]; uniform int uFacetCount;
      uniform vec3 uGemCenter; uniform float uGemRadius; uniform float uGemAbsorptionScale; uniform float uGemIncidentLight;
      uniform mat4 uGemInverse,uGemWorld;
      float facetExit(vec3 origin,vec3 dir,out vec3 hitNormal){
        float best=1000.;hitNormal=vec3(0,0,1);
        for(int i=0;i<96;i++){
          if(i>=uFacetCount)break;
          vec4 pl=uFacetPlanes[i];float denom=dot(pl.xyz,dir);
          if(denom>.0001){float t=(pl.w-dot(pl.xyz,origin))/denom;
            if(t>.0001&&t<best){best=t;hitNormal=pl.xyz;}}
        }return best;
      }
      vec3 gemEnvironment(vec3 dir){
        #ifdef USE_ENVMAP
        vec3 worldDir=normalize(mat3(uGemWorld)*dir);
        return textureCubeUV(envMap,envMapRotation*worldDir,.015).rgb;
        #else
        return vec3(.1);
        #endif
      }
      float gemChannel(vec3 p,vec3 incident,vec3 normal,float ior,int channel){
        vec3 dir=refract(incident,normal,1./ior);
        vec3 origin=p+dir*.002;
        float energy=1.,result=0.;
        vec3 absorption=vec3(2.7,1.05,.07);
        for(int bounce=0;bounce<5;bounce++){
          vec3 n;float t=facetExit(origin,dir,n);if(t>100.)break;
          energy*=exp(-absorption[channel]*t*uGemAbsorptionScale);
          vec3 hit=origin+dir*t;
          vec3 outgoing=refract(dir,-n,ior);
          if(dot(outgoing,outgoing)>.01){
            float f0=pow((ior-1.)/(ior+1.),2.);
            float fresnel=f0+(1.-f0)*pow(1.-abs(dot(dir,n)),5.);
            result+=energy*(1.-fresnel)*gemEnvironment(outgoing)[channel];
            energy*=fresnel;
          }
          dir=reflect(dir,n);origin=hit+dir*.002;
        }
        return result;
      }`)
      .replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
        { vec3 p=(vGemLocal-uGemCenter)/uGemRadius;
        vec3 eye=((uGemInverse*vec4(cameraPosition,1.)).xyz-uGemCenter)/uGemRadius;
        vec3 incident=normalize(p-eye);
        vec3 n=normalize(cross(dFdx(p),dFdy(p)));if(dot(n,incident)>0.)n=-n;
        vec3 optical;
        optical.r=gemChannel(p,incident,n,1.758,0);
        optical.g=gemChannel(p,incident,n,1.764,1);
        optical.b=gemChannel(p,incident,n,1.772,2);
        float entryF=.076+.924*pow(1.-abs(dot(n,incident)),5.);
        totalEmissiveRadiance+=optical*(1.-entryF)*.65*uGemIncidentLight; }
      `);
  };
  material.customProgramCacheKey=()=> 'transilk-physical-facet-ray-v1';
  material.needsUpdate=true;
  return {planeCount:planes.length,update(absorptionScale=1,incidentLight=1){uniforms.uGemIncidentLight.value=incidentLight;uniforms.uGemAbsorptionScale.value=absorptionScale;mesh.updateWorldMatrix(true,false);uniforms.uGemWorld.value.copy(mesh.matrixWorld);uniforms.uGemInverse.value.copy(mesh.matrixWorld).invert();}};
}
