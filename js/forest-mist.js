import * as THREE from 'three';
import { NOISE_GLSL } from './noise.js';
// World-space wisps: depth-tested against the forest, advected toward the viewer.
export function createForestMist(scene,{lowMem=false,reduced=false}={}){
 const apertures=Array.from({length:8},()=>new THREE.Vector3()),light={value:0},source={value:new THREE.Vector3()};
 const wisps=[],geometry=new THREE.PlaneGeometry(1,1),count=lowMem?8:12,litCount=lowMem?2:3;
 for(let i=0;i<count+litCount;i++){
  const uniforms={uCrackLight:light,uCrackSource:source,uApertures:{value:apertures},uTime:{value:0},uSeed:{value:i*9.17},uOpacity:{value:0},uPointer:{value:new THREE.Vector2(-5,-5)}};
  const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:true,uniforms,
   vertexShader:`varying vec2 vUv;varying vec4 vScreen;varying vec3 vWorld;void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;vUv=uv;vScreen=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position=vScreen;}`,
   fragmentShader:NOISE_GLSL+`varying vec2 vUv;varying vec4 vScreen;uniform float uTime,uSeed,uOpacity;uniform vec2 uPointer;varying vec3 vWorld;uniform float uCrackLight;uniform vec3 uCrackSource,uApertures[8];
   void main(){vec2 q=vUv*2.-1.;float envelope=pow(max(0.,1.-dot(q,q)),2.);
    if(envelope<.002)discard;
    vec2 drift=vec2(uTime*.035,uSeed);float broad=snoise(vec4(vUv*vec2(3.1,1.7)+drift,uSeed,uTime*.022));
    float fine=snoise(vec4(vUv*vec2(9.,4.)+vec2(broad*.4,0.)+drift*.65,uSeed+4.,uTime*.035));
    float density=smoothstep(-.45,.7,broad*.7+fine*.3);
    vec2 screen=vScreen.xy/vScreen.w*.5+.5;float wake=exp(-dot(screen-uPointer,screen-uPointer)*100.);
    float a=envelope*density*uOpacity*(1.-wake*.85);
    vec3 mistColor=mix(vec3(.15,.23,.23),vec3(.36,.47,.47),density);
    if(uCrackLight>.0001){
     float scatter=0.;vec3 toEye=normalize(cameraPosition-vWorld);
     for(int j=0;j<8;j++){
      vec3 axis=normalize(uApertures[j]-uCrackSource),r=vWorld-uApertures[j];float along=dot(r,axis);
      float width=.014+max(0.,along)*.12;float radial=length(r-axis*along);
      float beam=exp(-radial*radial/(width*width))*smoothstep(0.,.035,along)*exp(-max(0.,along)*2.1);
      float mu=dot(axis,toEye),g=.38;float phase=(1.-g*g)/pow(1.+g*g-2.*g*mu,1.5);
      scatter+=beam*phase;
     }
     // Single-scattering approximation: no visible beam without the advecting mist density.
     mistColor+=vec3(.07,.3,1.)*min(scatter,2.)*uCrackLight*2.8;
    }
    gl_FragColor=vec4(mistColor,a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
   }`});
  const mesh=new THREE.Mesh(geometry,material);mesh.name=`Forest mist wisp ${i}`;mesh.frustumCulled=false;scene.add(mesh);
  wisps.push({mesh,uniforms,i,side:i%2?1:-1});
 }
 const inactive=new THREE.Vector2(-5,-5);
 return {setCrackLight(center,points,intensity){source.value.copy(center);light.value=intensity;for(let i=0;i<8;i++)apertures[i].copy(points[i]||center);},update(time,camera,pointer,active,dt){
  const t=reduced?9:time;
  for(const w of wisps){const {i,side,mesh,uniforms}=w;
   if(i>=count){const layer=i-count;mesh.visible=light.value>.001;mesh.position.copy(source.value);mesh.position.z+=.22+layer*.19;mesh.scale.set(.9+layer*.2,1.12,1);mesh.quaternion.copy(camera.quaternion);uniforms.uOpacity.value=.21;uniforms.uTime.value=t;uniforms.uPointer.value.lerp(active?pointer:inactive,Math.min(1,dt*3));continue;}
   const life=17+(i%3)*2.7,phase=(t/life+i/count)%1;
   // Independent lanes remain beside the geode until they reach the foreground.
   mesh.position.set(.19+side*(.66+phase*.85)+Math.sin(t*.17+i*2.1)*.13,.2+Math.sin(t*.13+i)*.09+(i%3)*.15,-.6+phase*8.3);
   mesh.scale.set(1.8+phase*1.7,.65+phase*.85,1);mesh.quaternion.copy(camera.quaternion);
   const fade=THREE.MathUtils.smoothstep(phase,0,.15)*(1-THREE.MathUtils.smoothstep(phase,.79,1));
   const pulse=.48+.52*Math.pow(.5+.5*Math.sin(t*.29+i*.83),2);
   uniforms.uOpacity.value=fade*pulse*(lowMem?.34:.28);uniforms.uTime.value=t;
   uniforms.uPointer.value.lerp(active?pointer:inactive,Math.min(1,dt*3));
  }
 },get count(){return count+litCount;}};
}
