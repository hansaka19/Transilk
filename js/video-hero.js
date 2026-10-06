// Cinematic hero: Blender-rendered forest/geode film (assets/forest-geode-cinematic.mp4) with a three.js
// layer on top (js/fx.js): mist that parts around the pointer and muddy water on the lens
// in front of the copy. The sapphire is in the film, which plays once and holds.
import { createFx } from './fx.js';

const REVEAL_TIME = 4.0;   // seconds — sapphire becomes visible (Blender frame ~96 @ 24 fps)
const body = document.body;
const film = document.querySelector('.hero__film');
const video = document.querySelector('.hero__video');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const params = new URLSearchParams(location.search);
// Explicit review route: keep unapproved animation separate from the current hero.
if (params.get('review') === 'splash-v4') {
  video.src = 'assets/forest-geode-review-v4.mp4';
  video.poster = 'assets/forest-geode-review-v4.jpg';
  video.load();
}


body.classList.remove('is-loading');
body.classList.add('is-intro');
const reveal = () => body.classList.add('is-revealed');

createFx({ film, video, revealTime: REVEAL_TIME, reduced }).catch(e => console.error('fx layer', e));

if (reduced) {
  // The poster is the rendered final frame; no playback or seek is needed.
  video.pause();
  video.removeAttribute('src');
  video.load();
  reveal();
} else {
  video.addEventListener('timeupdate', () => { if (video.currentTime >= REVEAL_TIME) reveal(); });
  video.addEventListener('ended', reveal);
  const t = params.get('t');                     // debug: ?t=5 freezes the film at 5 s
  if (t !== null) {
    video.addEventListener('loadeddata', () => { video.pause(); video.currentTime = +t; if (+t >= REVEAL_TIME) reveal(); }, { once: true });
  } else {
    const start = () => video.play().catch(() => reveal());   // autoplay blocked -> still show content
    if (video.readyState >= 3) start(); else video.addEventListener('canplay', start, { once: true });
  }

  // parallax: film + fx layer ease toward the pointer (or device tilt)
  let tx = 0, ty = 0, x = 0, y = 0;
  addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; });
  addEventListener('deviceorientation', e => { if (e.gamma != null) { tx = e.gamma / 60; ty = (e.beta - 45) / 60; } });
  (function loop() {
    x += (tx - x) * .06; y += (ty - y) * .06;
    film.style.transform = `scale(1.06) translate(${(-x * 1.6).toFixed(3)}%, ${(-y * 1.2).toFixed(3)}%)`;
    requestAnimationFrame(loop);
  })();
}
