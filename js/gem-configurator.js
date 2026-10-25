import * as THREE from 'three';
import { installGemOptics } from './gem-optics.js';
import { createWheel } from './config-wheel.js';
import { createSwitch } from './config-switch.js';

// Gem configurator shown after the scroll story (ledger CF01–CF09). The same sapphire mesh becomes
// the customer's gem: variety, colour strength, cut, carat, heat treatment and inclusions are chosen
// on gemwise-style wheels; the inner ring sets colour, the outer ring moves the light, dragging the
// gem turns it 360°. Cuts come from Blender (hero_fix/configurator/build_cuts_v2.py). No prices.
const VARIETIES = [
  ['sapphire', 'Sapphire', '#2455d5', [2.7, 1.05, .07], 1.762],
  ['ruby', 'Ruby', '#bb153b', [.07, 2.7, 1.8], 1.762],
  ['emerald', 'Emerald', '#078250', [2.2, .08, 1.5], 1.58],
  ['spinel', 'Spinel', '#c4285c', [.12, 2.2, 1.1], 1.718],
  ['tourmaline', 'Tourmaline', '#cc4f86', [.1, 1.6, .6], 1.624],
  ['garnet', 'Garnet', '#7c1426', [.2, 2.6, 2.2], 1.79],
  ['aquamarine', 'Aquamarine', '#5ecbd3', [1.1, .12, .07], 1.577],
  ['amethyst', 'Amethyst', '#8053b5', [.65, 2.4, .22], 1.544],
  ['citrine', 'Citrine', '#e0a526', [.05, .45, 2.2], 1.544],
  ['topaz', 'Topaz', '#e3802c', [.05, .9, 2.2], 1.619],
  ['zircon', 'Zircon', '#2fb4c9', [1.5, .2, .05], 1.93],
  ['peridot', 'Peridot', '#8bbf2d', [1.4, .08, 1.9], 1.65],
].map(([value, label, color, abs, ior]) => ({ value, label, color, abs, ior }));
// Trade colours a customer can ask for within each variety (CF03). Absorption is derived from the colour:
// a channel that the gem transmits absorbs little, a channel it hides absorbs strongly.
// Representative B–G dispersion; zircon high type. Anisotropy is not simulated.
const DISPERSION = {sapphire:.018,ruby:.018,emerald:.014,spinel:.020,tourmaline:.017,garnet:.024,aquamarine:.014,amethyst:.013,citrine:.013,topaz:.014,zircon:.039,peridot:.020};
const HUES = {
  sapphire: [['Blue', '#2455d5'], ['Pink', '#e0538f'], ['Yellow', '#f0bf1a'], ['Padparadscha', '#f28c6e'], ['Green', '#2f8f6a'], ['Purple', '#7a4cc2'], ['White', '#e6ecf3']],
  spinel: [['Red', '#c4285c'], ['Pink', '#e86a9a'], ['Blue', '#4a6fd1'], ['Lavender', '#a796d8']],
  tourmaline: [['Pink', '#cc4f86'], ['Green', '#2f8a5a'], ['Blue', '#2f88b0'], ['Paraíba-type', '#19c7c9']],
  garnet: [['Red', '#7c1426'], ['Orange', '#d9531e'], ['Green', '#2f9a3c']],
  topaz: [['Imperial', '#e3802c'], ['Blue', '#4fa3d8'], ['Pink', '#e38aa8']],
  zircon: [['Blue', '#2fb4c9'], ['White', '#eef2f5'], ['Golden', '#d9a23a']],
};
const absFrom = hex => { const c = new THREE.Color(hex), ch = [c.r, c.g, c.b].map(v => -Math.log(Math.max(v, .04))), m = Math.min(...ch); return ch.map(v => Math.max(0, (v - m) * 1.3)); };
const CUTS = ['round', 'oval', 'pear', 'marquise', 'cushion', 'princess', 'emerald', 'asscher', 'radiant', 'heart',
  'trillion', 'trilliant', 'baguette', 'tapered-baguette', 'square', 'octagon', 'hexagon', 'pentagon', 'royal',
  'english-round', 'split-brilliant', 'old-european', 'old-mine', 'briolette', 'kite', 'shield', 'trapezoid',
  'lozenge', 'half-moon', 'half-dutch-rose', 'holland-rose', 'cross-rose', 'double'];
const CUT_LABEL = { double: 'Double rose', 'english-round': 'English round', 'old-european': 'Old European', 'old-mine': 'Old mine' };
const TREATMENTS = [
  { value: 'unheated', label: 'Unheated', sub: 'No heat treatment', icon: 'unheated' },
  { value: 'heated', label: 'Heated', sub: 'Heat-enhanced colour', icon: 'heated' },
  { value: 'any', label: 'No preference', sub: 'Either is fine', icon: 'no-preference' },
];
const INSIDE = [
  { value: 'clean', label: 'No bubbles', sub: 'Eye-clean' },
  { value: 'bubbles', label: 'Bubbles inside', sub: 'Visible inclusions' },
  { value: 'any', label: 'No preference', sub: 'Either is fine' },
];
const title = s => CUT_LABEL[s] || s.split('-').map(v => v[0].toUpperCase() + v.slice(1)).join(' ');
const NS = 'http://www.w3.org/2000/svg';

function outlinePath(tri) {
  // top-view silhouette of a cut: max radius per direction (works for the convex cuts and the heart)
  const bins = new Array(90).fill(0), ang = new Array(90).fill(0);
  for (let i = 0; i < tri.length; i += 3) {
    const x = tri[i], y = tri[i + 1], r = Math.hypot(x, y), b = Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * 90) % 90;
    if (r > bins[b]) { bins[b] = r; ang[b] = Math.atan2(y, x); }
  }
  const pts = bins.map((r, b) => r ? [Math.cos(ang[b]) * r, -Math.sin(ang[b]) * r] : null).filter(Boolean);
  return 'M' + pts.map(([x, y]) => `${(x * 10 + 12).toFixed(1)},${(y * 10 + 12).toFixed(1)}`).join('L') + 'Z';
}

export async function createGemConfigurator({ scene, camera, gem, mesh, material, originalOptics, renderer }) {
  const host = document.querySelector('.product-controls');
  const state = { type: 'sapphire', hue: 0, shape: 'round', colour: .62, carat: 1, treatment: 'any', inside: 'any', angle: 35, light: true, yaw: 0, pitch: 0 };
  const variety = () => VARIETIES.find(v => v.value === state.type);
  const hue = () => { const v = variety(), list = HUES[v.value]; if (!list) return { name: '', color: v.color, abs: v.abs }; const [name, color] = list[state.hue] || list[0]; const colourless = name === 'White'; return { name, color, colourless, abs: colourless ? [.03, .03, .025] : state.hue === 0 ? v.abs : absFrom(color) }; };
  const data = await fetch('assets/realtime/gem-cuts.json').then(r => { if (!r.ok) throw Error('Gem cut assets unavailable'); return r.json(); });

  // ---------------------------------------------------------------- layout
  const ui = document.createElement('div');
  ui.className = 'gem-config';
  ui.innerHTML = `
    <section class="cfg-col" aria-label="Gem, cut and weight">
      <h2>Your gem, your way.</h2>
      <div class="cfg-field"><span class="cfg-label">Gemstone</span><div class="cfg-slot" data-slot="type"></div></div>
      <div class="cfg-field"><span class="cfg-label">Cut</span><div class="cfg-slot" data-slot="shape"></div></div>
      <div class="cfg-field"><span class="cfg-label">Carat weight</span><div class="cfg-carat"><div class="cfg-slot" data-slot="whole"></div><span class="cfg-dot">.</span><div class="cfg-slot" data-slot="fraction"></div><span class="cfg-ct">ct</span></div><p class="cfg-carat-error" hidden>Choose at least 0.01 ct</p></div>
      <button class="cfg-add" type="button">Add to cart</button>
      <p class="cfg-status" role="status" aria-live="polite"></p>
    </section>
    <section class="cfg-flank cfg-flank-left" aria-label="Heat treatment"><span class="cfg-label">Heat treatment</span><div class="cfg-slot" data-slot="treatment"></div></section>
    <section class="cfg-flank cfg-flank-right" aria-label="Inside the gem"><span class="cfg-label">Inside the gem</span><div class="cfg-slot" data-slot="inside"></div></section>
    <div class="gem-orbit">
      <svg viewBox="0 0 400 400" aria-hidden="false">
        <g class="cfg-colour" role="slider" tabindex="0" aria-label="Colour strength, light to deep" aria-valuemin="0" aria-valuemax="100"></g>
        <g class="cfg-light" role="slider" tabindex="0" aria-label="Light direction around the gem" aria-valuemin="0" aria-valuemax="359">
          <circle class="cfg-light-track" cx="200" cy="200" r="188"/>
          <circle class="cfg-hit cfg-light-hit" cx="200" cy="200" r="188"/>
          <g class="cfg-light-handle"><circle r="30" class="cfg-knob-hit"/><circle r="17" class="cfg-light-knob"/>
            <g class="cfg-sun"><circle r="4.2"/><path d="M0-10.5v3M0 7.5v3M-10.5 0h3M7.5 0h3M-7.4-7.4l2.1 2.1M5.3 5.3l2.1 2.1M-7.4 7.4l2.1-2.1M5.3-5.3l2.1-2.1"/></g></g>
        </g>
      </svg>
      <button class="gem-turn" type="button" aria-label="Turn the gem 360 degrees. Drag, or use the arrow keys.">Turn gem</button>
      <div class="cfg-hues" role="radiogroup" aria-label="Colour of this gem"></div>
      <p class="cfg-360" aria-hidden="true"><b>360° View</b><span>drag to turn</span></p>
      <p class="cfg-readout"><span class="cfg-meter" aria-hidden="true"><svg viewBox="0 0 36 36"><circle class="m-bg" cx="18" cy="18" r="14"/><circle class="m-fg" cx="18" cy="18" r="14" pathLength="100"/></svg><b></b></span><span class="cfg-readout-text"></span></p>
      <button class="cfg-power light-toggle" type="button" aria-pressed="true" aria-label="Studio light"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v8"/><path d="M7.2 6.6a7.5 7.5 0 1 0 9.6 0"/></svg></button>
    </div>
    <button class="cart-button" type="button">Cart <span class="cart-badge">0</span></button>`;
  host.append(ui);
  const $ = s => ui.querySelector(s), orbit = $('.gem-orbit'), status = $('.cfg-status');
  ui.prepend($('.cfg-col h2'));                                            // title sits top-left
  orbit.append($('.cfg-flank-left'), $('.cfg-flank-right'));               // flanks ride with the gem (CF09)

  // ---------------------------------------------------------------- wheels
  const typeWheel = createWheel({
    items: VARIETIES, value: state.type, label: 'Gemstone variety', className: 'cw-type', row: 40,
    render: (el, v) => { el.innerHTML = `<i class="cw-swatch" style="--c:${v.color}"></i><span>${v.label}</span>`; },
    onChange: v => { state.type = v; state.hue = 0; buildHues(); paintAll(); },
  });
  const cutItems = CUTS.filter(c => data[c] || c === 'round').map(c => ({ value: c, label: title(c), path: outlinePath(data[c]) }));
  const cutWheel = createWheel({
    items: cutItems, value: state.shape, label: 'Cut shape', className: 'cw-cut', row: 40,
    render: (el, c) => { el.innerHTML = `<svg class="cw-cut-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${c.path}"/></svg><span>${c.label}</span>`; },
    onChange: v => { state.shape = v; paintAll(); },
  });
  const nums = n => Array.from({ length: n }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') }));
  const caratWheels = ['whole', 'fraction'].map((part, k) => createWheel({
    items: nums(100), value: k ? 0 : 1, label: k ? 'Carat hundredths' : 'Whole carats', className: 'cw-num', row: 40,
    onChange: () => { setCarat(); },
  }));
  function setCarat() {
    const v = caratWheels[0].value + caratWheels[1].value / 100;
    state.carat = v;
    const bad = v < .01;
    $('.cfg-carat-error').hidden = !bad; $('.cfg-carat').classList.toggle('is-invalid', bad);
    $('.cfg-add').disabled = bad;
    paintAll();
  }
  const heatIcon = n => `<img class="sw-icon" src="assets/config/${n}.png" alt="" width="24" height="24">`;
  const gemIcon = inner => `<svg class="sw-icon sw-svg" viewBox="0 0 28 24" aria-hidden="true"><path d="M6 9 10 4h8l4 5-8 11z"/>${inner}</svg>`;
  const pick = (list, v) => list.find(t => t.value === v);
  const treatmentWheel = createSwitch({
    items: [{ ...pick(TREATMENTS, 'unheated'), icon: heatIcon('unheated') }, { ...pick(TREATMENTS, 'any'), label: 'Either', icon: gemIcon('<path d="M10.5 10.5h7M10.5 13h7" fill="none"/>') }, { ...pick(TREATMENTS, 'heated'), icon: heatIcon('heated') }],
    value: state.treatment, label: 'Heat treatment', className: 'sw-heat',
    onChange: v => { state.treatment = v; paintAll(); },
  });
  const insideWheel = createSwitch({
    items: [{ ...pick(INSIDE, 'clean'), icon: gemIcon('<path class="spark" d="M19 2v3M17.5 3.5h3" fill="none"/>') }, { ...pick(INSIDE, 'any'), label: 'Either', icon: gemIcon('<path d="M10.5 10.5h7M10.5 13h7" fill="none"/>') }, { ...pick(INSIDE, 'bubbles'), label: 'Bubbles', icon: gemIcon('<circle cx="12" cy="10" r="1.3"/><circle cx="15.5" cy="8.5" r=".9"/><circle cx="14" cy="13" r="1"/>') }],
    value: state.inside, label: 'Bubbles or inclusions inside the gem', className: 'sw-inside',
    onChange: v => { state.inside = v; paintAll(); },
  });
  const slots = { type: typeWheel, shape: cutWheel, whole: caratWheels[0], fraction: caratWheels[1], treatment: treatmentWheel, inside: insideWheel };
  for (const [k, w] of Object.entries(slots)) ui.querySelector(`[data-slot="${k}"]`).append(w.el);

  // ---------------------------------------------------------------- colour ring (gemwise style: two arcs, light → deep)
  const colourG = $('.cfg-colour'), R = 158, C = 200;
  const arcPoint = (t, side) => { const a = (-62 + 124 * t) * Math.PI / 180; return [C + side * R * Math.cos(a), C - R * Math.sin(a) * -1]; };
  const segs = [], handles = [];
  for (const side of [-1, 1]) {
    for (const cls of ['cfg-track', 'cfg-track-hi']) {
      const t = document.createElementNS(NS, 'path'), a = arcPoint(-.02, side), b = arcPoint(1.02, side);
      t.setAttribute('d', `M${a} A${R},${R} 0 0 ${side === 1 ? 1 : 0} ${b}`); t.setAttribute('class', cls); colourG.append(t);
    }
    for (let i = 0; i < 40; i++) {
      const p = document.createElementNS(NS, 'path'), a = arcPoint(i / 40, side), b = arcPoint(Math.min(1, (i + 1.2) / 40), side);
      p.setAttribute('d', `M${a} A${R},${R} 0 0 ${side === 1 ? 1 : 0} ${b}`); p.setAttribute('class', 'cfg-seg');
      colourG.append(p); segs.push({ p, t: i / 39 });
    }
    const hit = document.createElementNS(NS, 'path'), a = arcPoint(0, side), b = arcPoint(1, side);
    hit.setAttribute('d', `M${a} A${R},${R} 0 0 ${side === 1 ? 1 : 0} ${b}`); hit.setAttribute('class', 'cfg-hit');
    colourG.append(hit);
    const h = document.createElementNS(NS, 'g'); h.setAttribute('class', 'cfg-handle');
    h.innerHTML = '<circle r="24" class="cfg-knob-hit"/><circle r="13" class="cfg-knob"/><circle r="6" class="cfg-knob-dot"/>';
    colourG.append(h); handles.push({ h, side, dot: h.lastChild });
  }
  const tint = t => {
    const c = new THREE.Color(hue().color);
    if (t < .5) c.lerp(new THREE.Color('#ffffff'), .8 * (1 - t * 2)); else c.multiplyScalar(1 - .62 * (t - .5) * 2);
    return '#' + c.getHexString();
  };

  function buildHues() {
    const box = $('.cfg-hues'), list = HUES[state.type] || [];
    box.replaceChildren(); box.hidden = !list.length;
    list.forEach(([name, color], i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'cfg-hue'; b.style.setProperty('--c', color);
      b.setAttribute('role', 'radio'); b.setAttribute('aria-label', `${name} ${variety().label.toLowerCase()}`); b.title = name;
      b.addEventListener('click', () => { state.hue = i; paintAll(); });
      b.addEventListener('keydown',e=>{const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(d===undefined)return;e.preventDefault();e.stopPropagation();state.hue=(state.hue+d+list.length)%list.length;paintAll();box.children[state.hue].focus();});
      for (const t of ['wheel', 'touchstart', 'touchmove']) b.addEventListener(t, e => e.stopPropagation(), { passive: true });
      box.append(b);
    });
  }

  // ---------------------------------------------------------------- pointer helpers
  function drag(el, onMove) {
    let id = null;
    el.addEventListener('pointerdown', e => { if (e.button !== 0) return; e.preventDefault(); e.stopPropagation(); id = e.pointerId; el.setPointerCapture(id); el.focus({ preventScroll: true }); onMove(e, true); });
    el.addEventListener('pointermove', e => { if (e.pointerId === id) onMove(e, false); });
    for (const t of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(t, () => { id = null; });
    for (const t of ['wheel', 'touchstart', 'touchmove']) el.addEventListener(t, e => e.stopPropagation(), { passive: true });
  }
  const local = e => { const r = orbit.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 400 - C, (e.clientY - r.top) / r.height * 400 - C]; };
  drag(colourG, e => { if (hue().colourless) return; const [x, y] = local(e); const a = Math.atan2(y, Math.abs(x)) * 180 / Math.PI; state.colour = THREE.MathUtils.clamp((a + 62) / 124, 0, 1); paintAll(); });
  colourG.addEventListener('keydown', e => { const d = { ArrowUp: .04, ArrowRight: .04, ArrowDown: -.04, ArrowLeft: -.04 }[e.key]; if (d === undefined || hue().colourless) return; e.preventDefault(); e.stopPropagation(); state.colour = THREE.MathUtils.clamp(state.colour + d, 0, 1); paintAll(); });
  const lightG = $('.cfg-light');
  drag(lightG, e => { const [x, y] = local(e); state.angle = (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360; paintAll(); });
  lightG.addEventListener('keydown', e => { const d = { ArrowUp: 6, ArrowRight: 6, ArrowDown: -6, ArrowLeft: -6 }[e.key]; if (d === undefined) return; e.preventDefault(); e.stopPropagation(); state.angle = (state.angle + d + 360) % 360; paintAll(); });
  let px = 0, py = 0;
  drag($('.gem-turn'), (e, first) => { if (!first) { state.yaw += (e.clientX - px) * .012; state.pitch = THREE.MathUtils.clamp(state.pitch + (e.clientY - py) * .012, -1.3, 1.3); } px = e.clientX; py = e.clientY; });
  $('.gem-turn').addEventListener('keydown', e => { const k = { ArrowLeft: [-.15, 0], ArrowRight: [.15, 0], ArrowUp: [0, -.15], ArrowDown: [0, .15] }[e.key]; if (!k) return; e.preventDefault(); e.stopPropagation(); state.yaw += k[0]; state.pitch = THREE.MathUtils.clamp(state.pitch + k[1], -1.3, 1.3); });
  $('.light-toggle').addEventListener('click', () => { state.light = !state.light; paintAll(); });

  // ---------------------------------------------------------------- cart (this device only; no prices, no checkout yet)
  const dialog = document.createElement('dialog');
  dialog.className = 'config-cart';
  dialog.innerHTML = '<h2>Your selected gems</h2><ul class="cart-items"></ul><p class="cart-footnote">Saved on this device only. These are your requested specifications, not reserved stock. Price and availability are confirmed by transilk.</p><button class="cfg-add" type="button">Continue choosing</button>';
  document.body.append(dialog);
  const KEY = 'transilk-config-cart-v2';
  let cart = [];
  try { const s = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(s)) cart = s.filter(x => VARIETIES.some(v => v.value === x.type) && CUTS.includes(x.shape) && Number.isFinite(x.carat) && x.carat >= .01 && x.carat <= 99.99 && Number.isInteger(x.quantity) && x.quantity > 0 && Number.isFinite(x.colour) && x.colour >= 0 && x.colour <= 1 && TREATMENTS.some(t=>t.value===x.treatment) && INSIDE.some(t=>t.value===x.inside) && (x.hue===null||x.hue===undefined||typeof x.hue==='string')).slice(0, 100); } catch { }
  const describe = x => `${x.hue ? x.hue + ' ' : ''}${VARIETIES.find(v => v.value === x.type).label} · ${title(x.shape)} · ${x.carat.toFixed(2)} ct${x.hue === 'White' ? '' : ` · colour ${Math.round(x.colour * 100)}%`} · ${TREATMENTS.find(t => t.value === x.treatment).label} · ${INSIDE.find(t => t.value === x.inside).label}`;
  function cartPaint() {
    $('.cart-button span').textContent = cart.reduce((n, x) => n + x.quantity, 0);
    const list = dialog.querySelector('ul'); list.replaceChildren();
    if (!cart.length) { const li = document.createElement('li'); li.textContent = 'Your cart is empty.'; list.append(li); }
    cart.forEach((x, i) => {
      const li = document.createElement('li'); li.textContent = `${describe(x)} · qty ${x.quantity}`;
      const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Remove'; b.onclick = () => { cart.splice(i, 1); save(); };
      li.append(b); list.append(li);
    });
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { status.textContent = 'Added for this visit; this device does not allow saving.'; } cartPaint(); }
  $('.cart-button').addEventListener('click', () => { cartPaint(); dialog.showModal(); });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  $('.cfg-add').addEventListener('click', () => {
    if (state.carat < .01) { status.textContent = 'Choose a carat weight of at least 0.01 ct.'; return; }
    const item = { type: state.type, hue: hue().name || null, shape: state.shape, colour: +state.colour.toFixed(2), carat: +state.carat.toFixed(2), treatment: state.treatment, inside: state.inside };
    const id = Object.values(item).join('|'), found = cart.find(x => x.id === id);
    if (found) found.quantity++; else cart.push({ id, ...item, quantity: 1 });
    save(); status.textContent = `Added: ${describe(item)}.`;
  });
  cartPaint();

  // ---------------------------------------------------------------- 3D cuts (same mesh, swapped geometry)
  const originalGeo = mesh.geometry, originalMat = mesh.material;
  originalGeo.computeBoundingBox();
  const originalCenter = originalGeo.boundingBox.getCenter(new THREE.Vector3()), diameter = originalGeo.boundingBox.getSize(new THREE.Vector3()).length();
  // Shared hero RoomEnvironment PMREM: do not dispose this scene-owned texture.
  const studioEnv = scene.environment;
  const hero = { geometry: originalGeo, material: originalMat, optics: originalOptics };
  const cuts = {};
  {
    const m = originalMat.clone(); m.onBeforeCompile = () => { };
    m.envMap = studioEnv; mesh.material = m;
    cuts.round = { geometry: originalGeo, material: m, optics: installGemOptics(m, gem, null, true) };
  }
  for (const shape of CUTS) {
    if (shape === 'round' || !data[shape]) continue;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(data[shape], 3));
    g.computeVertexNormals(); g.computeBoundingBox();
    const size = g.boundingBox.getSize(new THREE.Vector3()).length();
    g.translate(...g.boundingBox.getCenter(new THREE.Vector3()).negate().toArray());
    g.scale(diameter / size, diameter / size, diameter / size);
    g.translate(...originalCenter.toArray());
    const m = originalMat.clone(); m.onBeforeCompile = () => { }; m.envMap = studioEnv;
    mesh.geometry = g; mesh.material = m;
    let optics;
    let hull = null;
    if (shape === 'heart' && data['heart-hull']) {   // not convex: trace the interior as its convex hull (approximate optics)
      hull = new THREE.BufferGeometry(); hull.setAttribute('position', new THREE.Float32BufferAttribute(data['heart-hull'], 3));
      hull.computeBoundingBox(); hull.translate(...hull.boundingBox.getCenter(new THREE.Vector3()).negate().toArray());
      hull.scale(diameter / size, diameter / size, diameter / size); hull.translate(...originalCenter.toArray());
    }
    try { optics = installGemOptics(m, gem, hull, true); } catch (err) { console.warn('cut skipped', shape, err.message); continue; }
    cuts[shape] = { geometry: g, material: m, optics };
  }
  // compile the configurator's gem programs now (loader-time), not at the first swap mid-scroll
  mesh.geometry = originalGeo; mesh.material = originalMat;
  { const proxyScene = new THREE.Scene(); for (const c of [cuts.round, cuts.heart].filter(Boolean)) proxyScene.add(new THREE.Mesh(c.geometry, c.material)); try { await renderer.compileAsync(proxyScene, camera, scene); } catch { } }

  const turn = new THREE.Quaternion(), euler = new THREE.Euler(), point = new THREE.Vector3();

  function paintAll() {
    const v = variety();
    segs.forEach(({ p, t }) => p.setAttribute('stroke', tint(t)));
    handles.forEach(({ h, side, dot }) => { const [x, y] = arcPoint(state.colour, side); h.setAttribute('transform', `translate(${x},${y})`); dot.setAttribute('fill', tint(state.colour)); });
    const n = Math.round(state.colour * 100), h = hue(), word = h.colourless ? '' : state.colour < .34 ? 'Light' : state.colour > .66 ? 'Deep' : 'Medium';
    ui.querySelectorAll('.cfg-hue').forEach((b, i) => (b.setAttribute('aria-checked', String(i === state.hue)),b.tabIndex=i===state.hue?0:-1));
    colourG.setAttribute('aria-valuenow', n); colourG.setAttribute('aria-valuetext', `${word} ${v.label.toLowerCase()}, ${n} percent`);
    const la = (state.angle - 90) * Math.PI / 180;
    $('.cfg-light-handle').setAttribute('transform', `translate(${C + Math.cos(la) * 188},${C + Math.sin(la) * 188})`);
    const meter = $('.cfg-meter'), pct = h.colourless ? 0 : Math.round(state.colour * 100);
    meter.querySelector('.m-fg').style.strokeDasharray = `${pct} 100`; meter.querySelector('.m-fg').style.stroke = tint(Math.max(.55, state.colour)); meter.querySelector('b').textContent = h.colourless ? '—' : `${pct}%`;
    colourG.classList.toggle('is-off', !!h.colourless); colourG.setAttribute('aria-disabled', String(!!h.colourless)); colourG.tabIndex = h.colourless ? -1 : 0;
    lightG.setAttribute('aria-valuenow', Math.round(state.angle));
    lightG.classList.toggle('is-off', !state.light);
    $('.cfg-power').setAttribute('aria-pressed', String(state.light)); $('.cfg-power').title = state.light ? 'Light on' : 'Light off';
    $('.cfg-readout-text').textContent = `${word ? word + ' ' : ''}${h.name ? h.name.toLowerCase() + ' ' : ''}${v.label.toLowerCase()} · ${title(state.shape)}${state.shape === 'heart' ? ' (approx. optics)' : ''} · ${state.carat.toFixed(2)} ct${state.inside === 'bubbles' ? ' · bubbles inside' : ''}`.replace(/^./, c => c.toUpperCase());
  }
  buildHues(); paintAll();

  const baseColor = originalMat.color.clone(), baseEnv = originalMat.envMapIntensity;
  let envEnd = .4;   // scene.environmentIntensity at the studio end; refreshed once the gem arrives
  const cfgColor = new THREE.Color(), sphere = new THREE.Sphere(), edge = new THREE.Vector3(), camRight = new THREE.Vector3(), identity = new THREE.Quaternion(), lampOffset = new THREE.Vector3();
  // CF08 reversal: carat is a purchase specification, never a display-size control.
  const caratSize = () => 1;
  const ringScale = () => (innerWidth < 820 ? 1.1 : 1.08) * 1.18;   // rings frame the largest shown size
  let sizeNow = 1, lastTime=performance.now();
  // Fit: on any window size the dial, the flanking switches, the top bar and the bottom row must not
  // overlap or leave the screen, so the configured gem (and its rings) shrink to the space available.
  let fitNow = 1, fitTarget = 1, fitFrame = 0;
  const flankL = () => ui.querySelector('.cfg-flank-left'), colEl = () => ui.querySelector('.cfg-col');
  const readout = $('.cfg-readout'), heading = ui.querySelector('h2'), cartBtn = $('.cart-button'), backLink = document.querySelector('.product-return');
  // largest dial (box size) whose light orbit (r 192 of 400) stays clear of a corner element such as the back link or the cart
  const clearOf = (el, cx, cy) => { const r = el?.getBoundingClientRect(); if (!r || !r.width) return Infinity; const nx = Math.max(r.left, Math.min(cx, r.right)), ny = Math.max(r.top, Math.min(cy, r.bottom)); return (Math.hypot(nx - cx, ny - cy) - 6) * 400 / 192; };
  // knob hit areas stay at least 44 CSS px wide however small the dial is drawn
  let hitFor = 0;
  const knobHits = size => { if (Math.abs(size - hitFor) < 2) return; hitFor = size; const r = 22 * 400 / size;
    ui.querySelectorAll('.cfg-handle .cfg-knob-hit').forEach(c => c.setAttribute('r', Math.max(24, r).toFixed(1)));
    ui.querySelector('.cfg-light-handle .cfg-knob-hit').setAttribute('r', Math.max(30, r).toFixed(1)); };
  let active = false, frame = 0;
  return {
    update(progress, level) {
      // w blends the hero sapphire into the configured gem while it is deep underground and dim (S03),
      // so nothing pops at the end of the scroll or on the way back (CF01).
      const w = THREE.MathUtils.smoothstep(progress, .4, .6), opticalBlend = THREE.MathUtils.smoothstep(progress, .6, .9), ready = progress > .999, arrival = THREE.MathUtils.smoothstep(progress, .93, 1);
      const cut = progress >= .5 ? (cuts[state.shape] || cuts.round) : hero;
      mesh.geometry = cut.geometry; mesh.material = cut.material;
      const mat = mesh.material, v = variety();
      // same surface as the hero sapphire (the scroll story softens its specular/clearcoat for the studio)
      if (mat !== originalMat) { mat.specularIntensity = THREE.MathUtils.lerp(originalMat.specularIntensity,1,opticalBlend); mat.clearcoat = originalMat.clearcoat*(1-opticalBlend);mat.roughness=THREE.MathUtils.lerp(originalMat.roughness,.012,opticalBlend);mat.metalness=0;mat.ior=THREE.MathUtils.lerp(1.764,v.ior,opticalBlend); }
      cfgColor.set(tint(state.colour)).multiplyScalar(.006);
      mat.color.copy(baseColor).lerp(cfgColor, w);
      const lv = level ?? 1;   // S03: no light underground — the configured gem dims and returns with the scroll light
      // hero reflections are scaled by the scene's environmentIntensity; a material envMap is not, so apply it here
      if (ready) envEnd = scene.environmentIntensity || envEnd;
      mat.envMapIntensity = mat === originalMat ? baseEnv * (state.light ? .9 : .28) * Math.min(1, scene.environmentIntensity / envEnd) : THREE.MathUtils.lerp(scene.environmentIntensity, baseEnv * (state.light ? .10 : .04) * scene.environmentIntensity, opticalBlend);   // no jump at the p=.5 swap (B1)
      mat.envMapRotation.set(0, 0, -state.angle * Math.PI / 180);
      cut.optics.configure(w > .5 ? hue().abs : [2.7, 1.05, .07], w > .5 ? v.ior : 1.764);
      cut.optics.update(THREE.MathUtils.lerp(1 + progress * .7, hue().colourless ? .3 : .2 + state.colour * 1.25, w), THREE.MathUtils.lerp(lv, (state.light ? 1 : .22) * lv, w));
      // 360° turn, around the gem's own centre (the scroll pivot is the gem centre)
      turn.setFromEuler(euler.set(state.pitch, state.yaw, 0));
      gem.parent.quaternion.multiply(identity.identity().slerp(turn, w));
      const sizeTarget = caratSize(state.carat);
      const now=performance.now(),dt=Math.min(.1,(now-lastTime)/1000);lastTime=now;sizeNow += (sizeTarget-sizeNow)*(1-Math.exp(-dt*8));
      fitNow += (fitTarget - fitNow) * (1 - Math.exp(-dt * 10));
      gem.parent.scale.multiplyScalar(THREE.MathUtils.lerp(1, sizeNow * fitNow, w));
      cut.optics.setBubbles?.(w > .5 && state.inside === 'bubbles');
      active = ready;
      // rings: centred on the projected gem and sized from its on-screen radius
      gem.parent.updateMatrixWorld(true); camera.updateMatrixWorld();   // camera was just re-aimed by the scroll story
      if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere();
      sphere.copy(mesh.geometry.boundingSphere).applyMatrix4(mesh.matrixWorld);
      camRight.setFromMatrixColumn(camera.matrixWorld, 0);
      const lampAngle = (state.angle - 90) * Math.PI / 180;
      lampOffset.set(Math.cos(lampAngle)*3.2, -Math.sin(lampAngle)*3.2, 3.0).applyQuaternion(camera.quaternion).multiplyScalar(sphere.radius).add(sphere.center);
      cut.optics.setJeweller?.(opticalBlend, DISPERSION[v.value], lampOffset, sphere.radius*.20, state.light?70:0);

      point.copy(sphere.center).project(camera);
      const cx = (point.x * .5 + .5) * innerWidth, cy = (-point.y * .5 + .5) * innerHeight;
      const pos = mesh.geometry.attributes.position, stride = Math.max(1, Math.floor(pos.count / 160));
      let rpx = 0, down = 0;   // down: how far the silhouette reaches below the centre (px)
      for (let i = 0; i < pos.count; i += stride) {
        edge.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld).project(camera);
        rpx = Math.max(rpx, Math.hypot((edge.x - point.x) * .5 * innerWidth, (edge.y - point.y) * .5 * innerHeight)); down = Math.max(down, (point.y - edge.y) * .5 * innerHeight);
      }
      const size = rpx / THREE.MathUtils.lerp(1, sizeNow, w) * ringScale() * 400 / 158;
      if (ready && (fitFrame++ % 12) === 0) {
        const base = size / fitNow, phone = innerWidth < 820, colTop = colEl().getBoundingClientRect().top, orbitTop = orbit.getBoundingClientRect().top;
        const flankW = phone ? 0 : flankL().offsetWidth + 22;
        const byW = phone ? innerWidth - 24 : 2 * (Math.min(cx, innerWidth - cx) - flankW - 14);
        const below = flankL().getBoundingClientRect().bottom - orbit.getBoundingClientRect().bottom;   // phone: chips, readout and switches stack under the dial
        const above = orbitTop - readout.getBoundingClientRect().top;   // desktop: summary pill, colour chips and power button stack above the dial
        const byH = phone ? 2 * Math.min(cy - 64, colTop - 8 - below - cy) : 2 * Math.min(cy - above - 18, colTop - cy - 8);
        // summary pill: never wider than the free space (long names wrap to two lines), clear of the heading and the cart
        const half = phone ? Math.min(cx, innerWidth - cx) - 10 : Math.min(cx - heading.getBoundingClientRect().right - 16, cartBtn.getBoundingClientRect().left - 16 - cx);
        readout.style.maxWidth = `${Math.max(160, 2 * half).toFixed(0)}px`;
        fitTarget = THREE.MathUtils.clamp(Math.min(byW, byH, clearOf(backLink, cx, cy), clearOf(cartBtn, cx, cy)) / base, .45, 1);
        // the 360° caption shows only where it fits between the ends of the colour arcs and clear of the gem
        const cap = $('.cfg-360'), k = size / 400, capTop = (cap.offsetTop - size / 2) / k, capBot = capTop + cap.offsetHeight / k;
        cap.classList.toggle('is-hidden', Math.sqrt(Math.max(0, R * R - capBot * capBot)) - 9 < cap.offsetWidth / 2 / k || capTop < 40 || capTop * k < down + 4);
      }   // rings keep their layout at every carat          // 158 = colour-ring radius in the 400-unit SVG
      orbit.style.left = `${cx}px`; orbit.style.top = `${cy}px`; orbit.style.width = orbit.style.height = `${size.toFixed(1)}px`;
      orbit.style.setProperty('--k', (size / 420).toFixed(3)); knobHits(size);
      ui.classList.toggle('is-ready', ready);
      if ((frame++ & 15) === 0) window.transilkConfig = { ...state, active, ringPx: Math.round(size), fit: +fitNow.toFixed(3), gemPx: Math.round(rpx * 2), cartCount: cart.reduce((n, x) => n + x.quantity, 0), cutVertices: mesh.geometry.attributes.position.count, envAngle: Math.round(state.angle),sizeScale:sizeNow,bubbles:state.inside==='bubbles'?cut.optics.bubbleCount:0 };
    },
  };
}
