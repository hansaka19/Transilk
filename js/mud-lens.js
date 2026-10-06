import * as THREE from 'three';

// Height-field wet silt on the outer lens. It composites above the HTML and never intercepts input.
export function createMudLens(reduced, hits = [55 / 24 + .65, 114 / 24 + .65], video = null) {
  const canvas=document.createElement('canvas'); canvas.className='mud-lens'; canvas.setAttribute('aria-hidden','true');
  Object.assign(canvas.style,{position:'fixed',inset:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:'30'});
  document.body.append(canvas);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setClearColor(0,0); renderer.setPixelRatio(Math.min(devicePixelRatio,1));
  const liveCanvas=video?.tagName==='CANVAS';
  const filmTexture=video?(liveCanvas?new THREE.CanvasTexture(video):new THREE.VideoTexture(video)):null;
  if(filmTexture)filmTexture.colorSpace=THREE.SRGBColorSpace;
  const resolution=new THREE.Vector2(1,1);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,.01,10); camera.position.z=3;
  const rnd=i=>{const n=Math.sin(i*127.1+75.3)*43758.5453;return n-Math.floor(n);};
  const geometry=new THREE.PlaneGeometry(2,2),blobs=[];
  for(let i=0;i<36;i++) {
    const large=i<5, r=large?.012+rnd(i+8)*.018:.002+rnd(i+9)*.007;
    const material=new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,
      uniforms:{uAge:{value:-1},uSeed:{value:rnd(i+12)*90},uRun:{value:0},uFilm:{value:large?0:1},uVideo:{value:filmTexture},uResolution:{value:resolution},uVideoAspect:{value:16/9},uCropX:{value:.5},uHasVideo:{value:0}},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:`
        varying vec2 vUv;uniform float uAge,uSeed,uRun,uFilm,uVideoAspect,uHasVideo,uCropX;uniform sampler2D uVideo;uniform vec2 uResolution;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+uSeed)*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
        float heightAt(vec2 p){
          vec2 head=p-vec2(sin(uRun*.22+uSeed)*.06,-uRun);
          float angle=atan(head.y,head.x);
          float radius=1.+.045*sin(angle*3.+uSeed)+.025*sin(angle*5.-uSeed);
          float squash=1.-exp(-uAge*32.);
          float d=length(head/vec2(1.25-.18*squash,.7+.18*squash));
          float core=(1.-smoothstep(radius-.3,radius+.05,d));
          // Thin, uneven residue remains behind the moving, heavier leading edge.
          float path=sin(p.y*3.+uSeed)*.045;
          float width=.16+.08*noise(vec2(p.y*3.,uSeed));
          float trail=(1.-smoothstep(width-.035,width+.09,abs(p.x-path)));
          trail*=(1.-smoothstep(.1,.9,p.y))*smoothstep(-uRun-.3,-uRun+.1,p.y)*min(1.,uRun);
          float grain=noise(p*18.)*.035+noise(p*49.)*.012;
          return max(core*(.66+grain),trail*.28);
        }
        void main(){
          vec2 p=vec2((vUv.x-.5)*3.8,mix(-uRun-1.7,1.7,vUv.y));
          float h=heightAt(p);if(h<.015)discard;
          float e=.025;vec3 n=normalize(vec3((heightAt(p-vec2(e,0))-heightAt(p+vec2(e,0)))*2.4,(heightAt(p-vec2(0,e))-heightAt(p+vec2(0,e)))*2.4,.22));
          vec3 l=normalize(vec3(-.5,.8,1.4)),v=vec3(0,0,1);
          float light=.24+.65*max(dot(n,l),0.);
          float spec=pow(max(dot(n,normalize(l+v)),0.),48.)*.2;
          float fleck=noise(p*12.);
          vec3 clay=mix(vec3(.035,.027,.019),vec3(.13,.105,.067),noise(p*5.));
          clay*=.85+fleck*.15;
          vec3 color=clay*light+vec3(.48,.64,.61)*spec;
          if(uHasVideo>.5){
            vec2 uv=(gl_FragCoord.xy/uResolution-.5);
            float aspect=uResolution.x/uResolution.y;
            if(aspect>uVideoAspect)uv.y*=uVideoAspect/aspect;else {uv.x*=aspect/uVideoAspect;uv.x+=(uCropX-.5)*(1.-aspect/uVideoAspect);}
            vec3 through=texture2D(uVideo,clamp(uv+.5+n.xy*.009,vec2(.002),vec2(.998))).rgb;
            float sediment=mix(.42,.06,uFilm)+noise(p*9.)*.045;
            color=mix(through*.96,color,sediment)+vec3(.38,.52,.51)*spec;
          }
          float alpha=smoothstep(.015,.2,h)*mix(.72,.65,uFilm);
          alpha*=(1.-smoothstep(2.5,5.,uAge));
          gl_FragColor=vec4(color,alpha);
          #include <colorspace_fragment>
        }`});
    const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
    blobs.push({mesh,r,x:large?(i%2?-1:1)*(.54+rnd(i+2)*.39):(rnd(i+3)*2-1)*.96,
      y:large?.82-rnd(i+4)*1.35:rnd(i+6)*1.7-.85,
      start:(i<16?hits[0]:i<26?hits[1]:(hits[2]??hits[1]+.4))+rnd(i+10)*.24,
      speed:large?.07+rnd(i+11)*.07:.025+rnd(i+11)*.04});
  }
  function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.left=-innerWidth/innerHeight;camera.right=-camera.left;camera.updateProjectionMatrix();renderer.getDrawingBufferSize(resolution);}
  addEventListener('resize',resize);resize();
  let lastTextureTime=-1,wasVisible=false;
  return {update(seconds){let count=0;for(const b of blobs){
    const age=seconds-b.start;b.mesh.visible=!reduced&&age>=0&&age<5;if(!b.mesh.visible)continue;
    const t=Math.max(0,age-.18),distance=b.speed*(t-(1-Math.exp(-t*1.9))/1.9);
    const run=Math.min(5.5,distance/b.r),spread=.22+.78*(1-Math.exp(-age*42.));
    b.mesh.material.uniforms.uCropX.value=innerWidth<=820?.58:.5;b.mesh.material.uniforms.uHasVideo.value=video&&(liveCanvas||video.readyState>=2)?1:0;b.mesh.material.uniforms.uVideoAspect.value=liveCanvas?video.width/video.height:(video?.videoWidth/video?.videoHeight||16/9);
    b.mesh.material.uniforms.uAge.value=age;b.mesh.material.uniforms.uRun.value=run;
    b.mesh.position.set(b.x*innerWidth/innerHeight,b.y-distance*.5,0);
    b.mesh.scale.set(b.r*1.9*spread,b.r*(3.4+run)*.5,1);count++;
  }if(count){if(liveCanvas&&(seconds-lastTextureTime>.5||seconds<lastTextureTime)){filmTexture.needsUpdate=true;lastTextureTime=seconds;}renderer.render(scene,camera);wasVisible=true;}else if(wasVisible){renderer.clear();wasVisible=false;}return count;}};
}
