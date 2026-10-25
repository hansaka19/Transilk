// Alarm-style picker wheel (same interaction as the gemwise gem/treatment wheels): rows snap into
// a centre selection band; scroll, drag, tap a row, or use the arrow keys. Scrolling inside a wheel
// never reaches the page-level scroll story.
export function createWheel({ items, value, label, row = 40, className = '', render, onChange }) {
  const box = document.createElement('div');
  box.className = `cw ${className}`;
  box.style.setProperty('--row-js', `${row}px`);
  const rowPx = () => parseFloat(getComputedStyle(box).getPropertyValue('--row')) || row;   // CSS may resize rows (phones)
  box.tabIndex = 0;
  box.setAttribute('role', 'listbox');
  box.setAttribute('aria-label', label);
  const list = document.createElement('div');
  list.className = 'cw-list';
  box.append(list);
  const rows = items.map((item, i) => {
    const el = document.createElement('div');
    el.className = 'cw-row';
    el.id = `${className || 'cw'}-${i}-${Math.random().toString(36).slice(2, 7)}`;
    el.setAttribute('role', 'option');
    if (render) render(el, item); else el.textContent = item.label;
    el.addEventListener('click', () => select(i, true));
    list.append(el);
    return el;
  });
  let index = Math.max(0, items.findIndex(item => item.value === value)), timer, syncing = false;
  function paint() {
    rows.forEach((el, i) => { const on = i === index; el.classList.toggle('cw-on', on); el.setAttribute('aria-selected', String(on)); });
    box.setAttribute('aria-activedescendant', rows[index].id);
  }
  function scrollTo(i, smooth) {
    syncing = true;
    list.scrollTo({ top: i * rowPx(), behavior: smooth ? 'smooth' : 'instant' });
    clearTimeout(timer); timer = setTimeout(() => { syncing = false; }, smooth ? 420 : 60);
  }
  function select(i, smooth = false, silent = false) {
    i = Math.max(0, Math.min(items.length - 1, i));
    const changed = i !== index;
    index = i; paint(); scrollTo(i, smooth);
    if (changed && !silent) onChange?.(items[i].value, items[i]);
  }
  list.addEventListener('scroll', () => {
    if (syncing) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const i = Math.max(0, Math.min(items.length - 1, Math.round(list.scrollTop / rowPx())));
      if (i !== index) { index = i; paint(); onChange?.(items[i].value, items[i]); }
    }, 110);
  }, { passive: true });
  box.addEventListener('keydown', e => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (d === undefined && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault(); e.stopPropagation();
    select(e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : index + d, true);
  });
  // stop page-level gesture handlers (scroll story) from seeing wheel input
  for (const type of ['wheel', 'touchstart', 'touchmove']) box.addEventListener(type, e => e.stopPropagation(), { passive: true });
  paint();
  requestAnimationFrame(() => scrollTo(index, false));
  addEventListener('resize', () => scrollTo(index, false));
  return {
    el: box,
    get value() { return items[index].value; },
    set(v, silent = true) { const i = items.findIndex(item => item.value === v); if (i >= 0) select(i, false, silent); },
    refresh() { scrollTo(index, false); },
  };
}
