// Water on the viewer's glasses. DOM backdrop refraction includes the page lettering,
// and avoids copying the WebGL canvas into a second WebGL context every frame.
export function createEyeglassWater(reduced,hits){
 const layer=document.createElement('div');layer.className='eyeglass-water';layer.ariaHidden='true';
 Object.assign(layer.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'35',overflow:'hidden'});document.body.append(layer);
 const map=document.createElement('canvas');map.width=map.height=64;const ctx=map.getContext('2d'),pixels=ctx.createImageData(64,64);
 for(let y=0;y<64;y++)for(let x=0;x<64;x++){const dx=(x-31.5)/32,dy=(y-31.5)/32,r=Math.hypot(dx,dy),k=Math.sqrt(Math.max(0,1-r*r)),i=(y*64+x)*4;pixels.data[i]=128+dx*k*115;pixels.data[i+1]=128+dy*k*115;pixels.data[i+2]=128;pixels.data[i+3]=255;}ctx.putImageData(pixels,0,0);
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.position='absolute';
 svg.innerHTML=`<defs><filter id="transilk-wet-glass" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage href="${map.toDataURL()}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="curve"/><feDisplacementMap in="SourceGraphic" in2="curve" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;document.body.append(svg);
 const rnd=i=>{const n=Math.sin(i*91.711+3.3)*43758.5453;return n-Math.floor(n);},drops=[];
 for(let wave=0;wave<hits.length;wave++)for(let j=0;j<23;j++){
  const i=wave*23+j,large=j<5,r=large?.009+rnd(i+4)*.012:.0016+rnd(i+5)*.0039;
  const el=document.createElement('i'),trail=document.createElement('i');
  Object.assign(el.style,{position:'absolute',display:'none',borderRadius:`${45+rnd(i)*12}% ${42+rnd(i+1)*14}% 49% 47%`,
   background:large?'radial-gradient(ellipse at 29% 22%,rgba(241,228,201,.42) 0%,rgba(174,142,95,.16) 8%,transparent 24%),linear-gradient(145deg,rgba(163,128,79,.23),transparent 48%,rgba(65,43,23,.26))':'linear-gradient(145deg,rgba(231,218,190,.4),rgba(72,49,26,.30) 46%,rgba(171,135,85,.23))',
   boxShadow:'inset .5px .8px 1px rgba(223,207,173,.4), inset -.6px -1px 1.3px rgba(31,23,15,.46),0 1px 1px rgba(0,8,11,.28)',
   backdropFilter:large?'blur(1.1px) brightness(1.06) contrast(1.06)':'none'   /* SVG displacement backdrop re-ran every frame over WebGL: main cause of stutter */,webkitBackdropFilter:large?'blur(.5px)':'none'});
  Object.assign(trail.style,{position:'absolute',display:'none',borderRadius:'50%',background:'linear-gradient(to bottom,transparent,rgba(157,120,74,.12) 75%,rgba(80,54,29,.15))'});
  layer.append(trail,el);
  // Pairs of large beads meet in each wave and merge, overcoming surface pinning.
  let x=.08+rnd(i+9)*.84,y=.10+rnd(i+11)*.65;
  if(j===1){x=drops[drops.length-1].sx+.006;y=drops[drops.length-1].sy+.065;}
  drops.push({el,trail,sx:x,sy:y,sr:r,birth:hits[wave]+rnd(i+13)*.16,hold:large?.25+rnd(i+14)*.8:2+rnd(i+14)*3,seed:i,large});
 }
 let time=0,last=0;
 function reset(){time=0;for(const d of drops){d.x=d.sx;d.y=d.sy;d.r=d.sr;d.v=0;d.dead=false;d.active=false;d.merged=0;d.distance=0;}}
 reset();
 function step(t,dt){for(const d of drops){if(d.dead||t<d.birth)continue;d.active=true;const age=t-d.birth;
   if(age>d.hold&&d.r>.007){const gravity=.024+Math.max(0,d.r-.007)*4.8;d.v+=(gravity-d.v*2.1)*dt;
    const dy=d.v*dt;d.y+=dy;d.distance+=dy;d.x+=Math.sin(d.y*38+d.seed)*dy*.055;}
   if(d.y>1.12||age>9)d.dead=true;
  }
  for(let i=0;i<drops.length;i++){const a=drops[i];if(!a.active||a.dead)continue;for(let j=i+1;j<drops.length;j++){const b=drops[j];if(!b.active||b.dead)continue;const dx=(a.x-b.x)*innerWidth/innerHeight,dy=a.y-b.y;
    if(dx*dx+dy*dy<(a.r+b.r)**2*.55){const aa=a.r*a.r,bb=b.r*b.r;a.x=(a.x*aa+b.x*bb)/(aa+bb);a.y=(a.y*aa+b.y*bb)/(aa+bb);a.r=Math.sqrt(aa+bb);a.v=Math.max(a.v,b.v);a.hold=Math.min(a.hold,t-a.birth+.08);a.merged++;b.dead=true;}
  }}
 }
 return {update(seconds){if(reduced)return 0;if(seconds<last)reset();last=seconds;
  while(time+1/90<seconds){time+=1/90;step(time,1/90);}
  let visible=0,moving=0,merged=0;for(const d of drops){const age=seconds-d.birth,show=d.active&&!d.dead&&age>=0;d.el.style.display=show?'block':'none';d.trail.style.display='none';if(!show)continue;visible++;merged+=d.merged;if(d.v>.005)moving++;
   const arrival=Math.min(1,Math.max(0,age/.055)),w=d.r*innerHeight*2,stretch=1+Math.min(.65,d.v*4),flatten=1+.34*Math.exp(-age*25);
   Object.assign(d.el.style,{left:`${d.x*innerWidth-w*.5}px`,top:`${d.y*innerHeight-w*stretch*.5}px`,width:`${w*flatten}px`,height:`${w*stretch/flatten}px`,opacity:String(arrival*(1-Math.max(0,(age-7)/2)))});
   if(d.distance>.016){const length=Math.min(d.distance*innerHeight,d.r*innerHeight*4.5);Object.assign(d.trail.style,{display:'block',left:`${d.x*innerWidth-w*.055}px`,top:`${d.y*innerHeight-length}px`,width:`${Math.max(1,w*.11)}px`,height:`${length}px`,opacity:String(Math.min(.65,d.v*6))});}
  }
  window.transilkWater={visible,moving,merged,waves:hits.length,mode:'eyeglass-backdrop',time:seconds};return visible;
 }};
}
