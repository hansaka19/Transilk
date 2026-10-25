import * as THREE from 'three';

// Convex brilliant-cut ray tracing: the actual facet planes, not random facet colours.
// Coordinates are normalised for precision. Up to five internal reflections and wavelength IORs.
// hullGeometry (optional): trace against this convex hull instead of the mesh itself — used for the
// non-convex heart cut, whose silhouette stays a heart while the interior is traced as its hull.
export function installGemOptics(material, group, hullGeometry = null, jeweller = false) {
  let mesh;
  group.traverse(o => { if (o.isMesh) mesh = o; });
  const source = hullGeometry || mesh.geometry;
  const geometry = source.index ? source.toNonIndexed() : source;
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
  if (planes.length > 160 || planes.length < 6) throw new Error(`Unexpected sapphire hull: ${planes.length} planes`);
  const hull = planes.map(p=>new THREE.Vector4(p.n.x,p.n.y,p.n.z,p.d));
  while(hull.length<160) hull.push(new THREE.Vector4(0,0,1,100));
  // Gas bubbles (CF09): deterministic small spheres strictly inside the gem, in the same normalised
  // gem space as the planes, so they turn with the gem. Off (count 0) unless the customer asks.
  // For a non-convex cut (heart) each bubble must also be inside the real mesh, not just its hull.
  const bubbles=[];{let seed=planes.length*7919+13;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    let inside=()=>true;
    if(hullGeometry){const solid=new THREE.Mesh(mesh.geometry,new THREE.MeshBasicMaterial({side:THREE.DoubleSide})),ray=new THREE.Raycaster(),o=new THREE.Vector3();
      inside=(c,r)=>{let ok=true;for(const d of [new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,1),new THREE.Vector3(-1,0,0)]){o.copy(c).multiplyScalar(radius).add(center);ray.set(o,d);const hits=ray.intersectObject(solid);if(hits.length%2===0||hits[0].distance<r*1.8*radius){ok=false;break;}}return ok;};}
    const dist=(a,c)=>Math.hypot(a.x-c.x,a.y-c.y,a.z-c.z);
    for(let tries=0;tries<4000&&bubbles.length<10;tries++){const c=new THREE.Vector3(rnd()*1.2-.6,rnd()*1.2-.6,rnd()*1.2-.6),r=.016+Math.pow(rnd(),2.2)*.045;
      if(planes.every(p=>p.n.dot(c)+r*1.8<p.d)&&bubbles.every(b=>dist(b,c)>b.w+r+.04)&&inside(c,r))bubbles.push(new THREE.Vector4(c.x,c.y,c.z,r));}}
  const bubbleCount=bubbles.length;while(bubbles.length<10)bubbles.push(new THREE.Vector4(0,0,0,0));
  const uniforms = {
    uShowroom:{value:0},uDispersion:{value:.018},uLampPosition:{value:new THREE.Vector3()},uLampRadius:{value:1},uLampPower:{value:0},
    uFacetPlanes:{value:hull},uFacetCount:{value:planes.length},
    uAbsorption:{value:new THREE.Vector3(2.7,1.05,.07)},uIOR:{value:1.764},uGemCenter:{value:center},uGemRadius:{value:radius},
    uGemIncidentLight:{value:1},uBubbles:{value:bubbles},uBubbleCount:{value:0},uGemAbsorptionScale:{value:1},uGemInverse:{value:new THREE.Matrix4()},uGemWorld:{value:new THREE.Matrix4()},
  };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms,uniforms);
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vGemLocal;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\nvGemLocal = position;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <lights_physical_pars_fragment>',`#include <lights_physical_pars_fragment>
      varying vec3 vGemLocal;
      uniform vec3 uAbsorption;uniform float uIOR;uniform vec4 uFacetPlanes[160]; uniform int uFacetCount;
      uniform vec3 uGemCenter; uniform float uGemRadius; uniform float uGemAbsorptionScale; uniform float uGemIncidentLight;
      uniform mat4 uGemInverse,uGemWorld;uniform vec4 uBubbles[10];uniform int uBubbleCount;
      float facetExit(vec3 origin,vec3 dir,out vec3 hitNormal){
        float best=1000.;hitNormal=vec3(0,0,1);
        for(int i=0;i<160;i++){
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
      // nearest gas bubble along the ray within maxT (1000 if none); tOut = where the ray leaves it
      float bubbleHit(vec3 o,vec3 d,float maxT,out vec3 bn,out float tOut,out vec4 sphere){float best=1000.;bn=vec3(0.);tOut=0.;sphere=vec4(0.);
        for(int i=0;i<10;i++){if(i>=uBubbleCount)break;vec4 b=uBubbles[i];vec3 oc=o-b.xyz;float bb=dot(oc,d),cc=dot(oc,oc)-b.w*b.w,disc=bb*bb-cc;
          if(disc>0.){float sq=sqrt(disc),t=-bb-sq;if(t>.0001&&t<maxT&&t<best){best=t;sphere=b;tOut=-bb+sq;bn=normalize(o+d*t-b.xyz);}}}return best;}
      float gemChannel(vec3 p,vec3 incident,vec3 normal,float ior,int channel){
        vec3 dir=refract(incident,normal,1./ior);
        vec3 origin=p+dir*.002;
        float energy=1.,result=0.;
        vec3 absorption=uAbsorption;
        for(int bounce=0;bounce<5;bounce++){
          vec3 n;float t=facetExit(origin,dir,n);if(t>100.)break;
          vec3 bn;float tOut;vec4 sphere;float tb=bubbleHit(origin,dir,t,bn,tOut,sphere);
          if(tb<t){   // gas bubble (n=1) inside the gem (approximation): total internal reflection past the
                      // critical angle gives the dark, sharp rim; nearer the centre light passes through.
            energy*=exp(-absorption[channel]*tb*uGemAbsorptionScale);
            vec3 hitb=origin+dir*tb;float c=clamp(-dot(dir,bn),0.,1.),s2=1.-c*c;
            if(s2*ior*ior>1.){dir=reflect(dir,bn);origin=hitb+dir*.002;continue;}
            float f0=pow((ior-1.)/(ior+1.),2.),F=f0+(1.-f0)*pow(1.-c,5.);
            result+=energy*F*gemEnvironment(reflect(dir,bn))[channel];
            vec3 gasDir=refract(dir,bn,ior);
            vec3 gasStart=hitb+gasDir*.0002,oc=gasStart-sphere.xyz;
            float projection=dot(oc,gasDir);
            float exitDistance=-projection+sqrt(max(0.,projection*projection-dot(oc,oc)+sphere.w*sphere.w));
            vec3 gasExit=gasStart+gasDir*exitDistance;
            vec3 exitNormal=normalize(gasExit-sphere.xyz);
            dir=refract(gasDir,-exitNormal,1./ior);
            energy*=(1.-F)*(1.-F);origin=gasExit+dir*.0002;continue;
          }
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
        optical.r=gemChannel(p,incident,n,uIOR-.006,0);
        optical.g=gemChannel(p,incident,n,uIOR,1);
        optical.b=gemChannel(p,incident,n,uIOR+.008,2);
        float entryF=.076+.924*pow(1.-abs(dot(n,incident)),5.);
        totalEmissiveRadiance+=optical*(1.-entryF)*.65*uGemIncidentLight; }
      `);

    if(jeweller){
      // The hero shader above remains the default, unchanged path. The showroom opt-in uses
      // three wavelength samples (B, d, G) with Cauchy n(lambda)=A+B/lambda², calibrated to n_d
      // and gemmological B–G dispersion. These are representative species values, not certificates.
      shader.fragmentShader=shader.fragmentShader.replace('float facetExit(',`
        uniform float uShowroom,uDispersion,uLampRadius,uLampPower;uniform vec3 uLampPosition;
        float spectralIOR(float wavelength){float B=uDispersion/(1./(.4308*.4308)-1./(.6867*.6867));return uIOR+B*(1./(wavelength*wavelength)-1./(.5893*.5893));}
        float dielectricF(float cosine,float ni,float nt){
          float st2=(ni*ni)/(nt*nt)*(1.-cosine*cosine);if(st2>=1.)return 1.;
          float ct=sqrt(max(0.,1.-st2));float rs=(ni*cosine-nt*ct)/(ni*cosine+nt*ct);
          float rp=(nt*cosine-ni*ct)/(nt*cosine+ni*ct);return .5*(rs*rs+rp*rp);
        }
        // Finite world-space spherical light: rays must intersect its angular extent from the
        // actual exit point. It is not an environment-map highlight or a time-driven sparkle.
        float lampRadiance(vec3 p,vec3 d){
          vec3 o=(uGemWorld*vec4(p*uGemRadius+uGemCenter,1.)).xyz;
          vec3 ray=normalize(mat3(uGemWorld)*d),toLight=uLampPosition-o;
          float along=dot(toLight,ray),distance2=dot(toLight,toLight);
          float angular=dot(normalize(toLight),ray),edge=sqrt(max(0.,1.-uLampRadius*uLampRadius/max(distance2,.0001)));
          float aa=max(fwidth(angular),.000015);
          return along>0.?uLampPower*smoothstep(edge-aa,edge+aa,angular):0.;
        }
        float facetExit(
      `)
      .replace('return textureCubeUV(envMap,envMapRotation*worldDir,.015).rgb;',`vec3 env=textureCubeUV(envMap,envMapRotation*worldDir,.015).rgb;
        vec3 d=envMapRotation*worldDir;
        // Distant narrow, graded jeweller strips over a dim shared RoomEnvironment fill.
        float strips=3.*exp(-pow((d.x-.42)/.045,2.)-pow((d.y-.18)/.65,4.))*smoothstep(0.,.3,d.z)
          +2.*exp(-pow((d.x+.55)/.035,2.)-pow((d.y+.1)/.55,4.))*smoothstep(0.,.3,-d.z)
          +1.4*exp(-pow((d.y-.72)/.035,2.)-pow(d.x/.6,4.));
        return mix(env,env*.12+vec3(.035+strips),uShowroom);`)
      .replace('bounce<5','bounce<8')
      .replace('vec3 n;float t=facetExit', 'if(bounce>=5&&uShowroom<.0001)break;\n          vec3 n;float t=facetExit')
      .replace('result+=energy*(1.-fresnel)*gemEnvironment(outgoing)[channel];', `fresnel=mix(fresnel,dielectricF(abs(dot(dir,n)),ior,1.),uShowroom);
            result+=energy*(1.-fresnel)*(gemEnvironment(outgoing)[channel]+lampRadiance(hit,outgoing)*uShowroom);`)
      .replace('uIOR-.006,0','mix(uIOR-.006,spectralIOR(.6867),uShowroom),0')
      .replace('uIOR,1','mix(uIOR,spectralIOR(.5893),uShowroom),1')
      .replace('uIOR+.008,2','mix(uIOR+.008,spectralIOR(.4308),uShowroom),2')
      .replace('totalEmissiveRadiance+=optical*(1.-entryF)*.65*uGemIncidentLight;',`entryF=mix(entryF,dielectricF(abs(dot(n,incident)),1.,uIOR),uShowroom);
        totalEmissiveRadiance+=(optical*(1.-entryF)*.65+vec3(lampRadiance(p,reflect(incident,n))*entryF*uShowroom))*uGemIncidentLight;`);
    }
  };
  material.customProgramCacheKey=()=> jeweller?'transilk-jeweller-ray-CF11-v1':'transilk-physical-facet-ray-v4';
  material.needsUpdate=true;
  return {setJeweller(blend,dispersion,position,radius,power){uniforms.uShowroom.value=blend;uniforms.uDispersion.value=dispersion;uniforms.uLampPosition.value.copy(position);uniforms.uLampRadius.value=radius;uniforms.uLampPower.value=power;},setBubbles(on){uniforms.uBubbleCount.value=on?bubbleCount:0;},bubbleCount,configure(absorption,ior){uniforms.uAbsorption.value.fromArray(absorption);uniforms.uIOR.value=ior;},planeCount:planes.length,update(absorptionScale=1,incidentLight=1){uniforms.uGemIncidentLight.value=incidentLight;uniforms.uGemAbsorptionScale.value=absorptionScale;mesh.updateWorldMatrix(true,false);uniforms.uGemWorld.value.copy(mesh.matrixWorld);uniforms.uGemInverse.value.copy(mesh.matrixWorld).invert();}};
}
