// Avvio di reveal.js e animazioni guidate da JS per le slide con data-js="nome".
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  };
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  let stopCurrent = null;
  if (/[?&](tutto|print-pdf)/.test(location.search)) document.documentElement.classList.add('tutto');

  const ANIM = {
    // Uno strato "cambia le coordinate": due anelli concentrici diventano due bande separabili da una retta.
    polar(section) {
      const svg = section.querySelector('svg[data-polar]');
      svg.innerHTML = '';
      const W = 1000, H = 520, cx = 260, cy = 260;
      const pts = [];
      let s = 3;
      const rnd = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
      for (let i = 0; i < 140; i++) {
        const inner = i % 2 === 0, a = rnd() * Math.PI * 2, r = (inner ? 70 : 170) + (rnd() - .5) * 40;
        pts.push({ inner, a, r, c: el('circle', { r: 7, fill: inner ? css('--pos') : css('--neg') }, svg) });
      }
      el('text', { x: cx, y: 505, 'text-anchor': 'middle', class: 'muted', 'font-size': 22 }, svg).textContent = 'prima: nessuna retta li separa';
      const lab2 = el('text', { x: 760, y: 505, 'text-anchor': 'middle', class: 'muted', 'font-size': 22, opacity: 0 }, svg);
      lab2.textContent = 'dopo lo strato: basta una retta';
      const sep = el('line', { x1: 560, x2: 960, y1: 300, y2: 300, stroke: css('--fg'), 'stroke-width': 4, 'stroke-dasharray': '10 8', opacity: 0 }, svg);
      const arrow = el('text', { x: 500, y: 270, 'text-anchor': 'middle', 'font-size': 44, class: 'acc', opacity: 0 }, svg);
      arrow.textContent = '→';
      const from = p => [cx + p.r * Math.cos(p.a), cy + p.r * Math.sin(p.a)];
      const to = p => [580 + p.a / (Math.PI * 2) * 360, 420 - p.r * 1.25];
      const place = k => pts.forEach(p => {
        const [x0, y0] = from(p), [x1, y1] = to(p), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        p.c.setAttribute('cx', x0 + (x1 - x0) * e); p.c.setAttribute('cy', y0 + (y1 - y0) * e);
      });
      place(0);
      let raf, t0 = null, alive = true;
      const tick = now => {
        if (!alive) return;
        if (t0 === null) t0 = now;
        const t = (now - t0) / 1000;
        const k = Math.max(0, Math.min(1, (t - 1.6) / 2.2));
        place(k);
        arrow.setAttribute('opacity', t > 1 ? 1 : 0);
        sep.setAttribute('opacity', k >= 1 ? 1 : 0);
        lab2.setAttribute('opacity', k >= 1 ? 1 : 0);
        if (t < 9) raf = requestAnimationFrame(tick); else { t0 = null; raf = requestAnimationFrame(tick); }
      };
      raf = requestAnimationFrame(tick);
      return () => { alive = false; cancelAnimationFrame(raf); };
    },

    // Un filtro 3×3 scorre su un "7" disegnato a pixel e accende i bordi verticali.
    conv(section) {
      const svg = section.querySelector('svg[data-conv]');
      svg.innerHTML = '';
      const IMG = [
        '00000000',
        '01111110',
        '00000110',
        '00001100',
        '00011000',
        '00011000',
        '00110000',
        '00000000'
      ].map(r => r.split('').map(Number));
      const K = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]];
      const S = 46, ox = 20, oy = 40, OX = 600, OS = 46;
      el('text', { x: ox, y: 24, class: 'muted', 'font-size': 20 }, svg).textContent = 'immagine (pixel)';
      el('text', { x: OX, y: 24, class: 'muted', 'font-size': 20 }, svg).textContent = 'mappa dei bordi verticali';
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++)
        el('rect', { x: ox + x * S, y: oy + y * S, width: S - 2, height: S - 2, rx: 4, fill: IMG[y][x] ? css('--fg') : css('--surface') }, svg);
      const cells = [];
      for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++)
        cells.push(el('rect', { x: OX + x * OS, y: oy + OS + y * OS, width: OS - 2, height: OS - 2, rx: 4, fill: css('--surface') }, svg));
      const win = el('rect', { width: 3 * S - 2, height: 3 * S - 2, rx: 6, fill: 'none', stroke: css('--accent'), 'stroke-width': 5 }, svg);
      const cur = el('rect', { width: OS - 2, height: OS - 2, rx: 4, fill: 'none', stroke: css('--accent'), 'stroke-width': 4 }, svg);
      const kx = 20, ky = 440;
      el('text', { x: kx, y: ky - 12, class: 'muted', 'font-size': 18 }, svg).textContent = 'filtro: sinistra − destra';
      K.forEach((row, j) => row.forEach((v, i) => {
        el('rect', { x: kx + i * 34, y: ky + j * 34, width: 32, height: 32, rx: 3, fill: css('--surface') }, svg);
        el('text', { x: kx + i * 34 + 16, y: ky + j * 34 + 22, 'text-anchor': 'middle', class: 'mono', 'font-size': 16 }, svg).textContent = v > 0 ? '+1' : v < 0 ? '−1' : '0';
      }));
      let i = 0, alive = true;
      const step = () => {
        if (!alive) return;
        if (i === 36) { cells.forEach(c => c.setAttribute('fill', css('--surface'))); i = 0; }
        const x = i % 6, y = Math.floor(i / 6);
        let v = 0;
        for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) v += K[j][k] * IMG[y + j][x + k];
        win.setAttribute('x', ox + x * S); win.setAttribute('y', oy + y * S);
        cur.setAttribute('x', OX + x * OS); cur.setAttribute('y', oy + OS + y * OS);
        cells[i].setAttribute('fill', v > 0 ? css('--accent') : v < 0 ? css('--accent-2') : css('--bg'));
        cells[i].setAttribute('opacity', v === 0 ? 1 : Math.min(1, .35 + Math.abs(v) / 3));
        i++;
      };
      const timer = setInterval(step, 260);
      return () => { alive = false; clearInterval(timer); };
    }
  };

  function run() {
    if (stopCurrent) { stopCurrent(); stopCurrent = null; }
    const s = Reveal.getCurrentSlide();
    const name = s && s.dataset.js;
    if (name && ANIM[name]) stopCurrent = ANIM[name](s);
  }

  Reveal.initialize({
    hash: true, width: 1280, height: 720, pdfSeparateFragments: false, margin: 0.03, center: false,
    transition: 'fade', transitionSpeed: 'fast', backgroundTransition: 'fade',
    controls: true, controlsTutorial: false, progress: true, slideNumber: 'c/t',
    autoAnimateDuration: 0.9, autoAnimateEasing: 'cubic-bezier(.65,0,.35,1)',
    plugins: [RevealNotes]
  }).then(run);
  Reveal.on('slidechanged', run);
})();
