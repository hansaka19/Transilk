// Three-stop slide switch in the style of the user's toggle reference (CF12): an inset track, a raised
// textured knob that slides between the stops, and the stop labels underneath. Tap a label, tap the
// track, drag the knob, or use the arrow keys. The middle stop is the neutral "either" choice, so the
// orange fill grows from the centre towards the chosen side.
export function createSwitch({ items, value, label, className = '', onChange }) {
  const box = document.createElement('div');
  box.className = `sw ${className}`;
  box.setAttribute('role', 'radiogroup');
  box.setAttribute('aria-label', label);
  box.innerHTML = `<div class="sw-track"><i class="sw-fill"></i><i class="sw-knob"></i></div><div class="sw-stops"></div>`;
  const track = box.querySelector('.sw-track'), stops = box.querySelector('.sw-stops');
  const buttons = items.map((item, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sw-stop'; b.setAttribute('role', 'radio');
    b.innerHTML = `${item.icon || ''}<span>${item.label}</span>`;
    if (item.sub) b.title = item.sub;
    b.addEventListener('click', () => select(i));
    stops.append(b);
    return b;
  });
  let index = Math.max(0, items.findIndex(item => item.value === value));
  function paint() {
    const n = items.length - 1, mid = n / 2;
    box.style.setProperty('--pos', index / n);
    box.style.setProperty('--from', Math.min(index, mid) / n);
    box.style.setProperty('--to', Math.max(index, mid) / n);
    box.classList.toggle('sw-neutral', index === mid);
    buttons.forEach((b, i) => { const on = i === index; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; b.classList.toggle('sw-on', on); });
  }
  function select(i, focus = false) {
    i = Math.max(0, Math.min(items.length - 1, i));
    const changed = i !== index;
    index = i; paint();
    if (focus) buttons[i].focus({ preventScroll: true });
    if (changed) onChange?.(items[i].value, items[i]);
  }
  const fromX = x => { const r = track.getBoundingClientRect(); return Math.round(Math.max(0, Math.min(1, (x - r.left) / r.width)) * (items.length - 1)); };
  let dragging = null;
  track.addEventListener('pointerdown', e => { if (e.button !== 0) return; e.preventDefault(); e.stopPropagation(); dragging = e.pointerId; track.setPointerCapture(dragging); select(fromX(e.clientX)); });
  track.addEventListener('pointermove', e => { if (e.pointerId === dragging) select(fromX(e.clientX)); });
  for (const t of ['pointerup', 'pointercancel', 'lostpointercapture']) track.addEventListener(t, () => { dragging = null; });
  box.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (d === undefined) return;
    e.preventDefault(); e.stopPropagation();
    select(index + d, true);
  });
  // keep page-level gesture handlers (scroll story) out of the switch
  for (const t of ['wheel', 'touchstart', 'touchmove']) box.addEventListener(t, e => e.stopPropagation(), { passive: true });
  paint();
  return {
    el: box,
    get value() { return items[index].value; },
    set(v) { const i = items.findIndex(item => item.value === v); if (i >= 0) { index = i; paint(); } },
  };
}
