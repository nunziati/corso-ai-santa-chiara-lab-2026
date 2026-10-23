// Motore del flusso: tutte le scene stanno in un unico "mondo", inquadrato da una telecamera.
// Ogni passo aggiunge le sue animazioni a una sola timeline GSAP e finisce con un'etichetta:
// "avanti" fa scorrere la timeline fino all'etichetta successiva, "indietro" la riavvolge.
// Le animazioni cambiano solo proprietà (niente callback), così ogni salto ricostruisce lo stato giusto.
const F = (() => {
  gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, SplitText, MotionPathPlugin, CustomEase);

  const W = 1920, H = 1080, PASSO_X = 2300, PASSO_Y = 2700;
  const palco = document.getElementById('palco');
  const mondo = document.getElementById('mondo');
  const stampa = /[?&]stampa/.test(location.search);
  const scene = {}, passi = [], blocchi = [];
  const cam = { x: W / 2, y: H / 2, z: 1 };
  const tl = gsap.timeline({ paused: true });
  const canale = 'BroadcastChannel' in window ? new BroadcastChannel('flusso-modulo-b') : null;
  let riga = -1, colonna = 0, i = 0, nav = null, fermaAmbiente = null, scenaAmbiente = null;

  // ---------- costruzione ----------

  function blocco(numero, titolo) {
    blocchi.push({ numero, titolo, primo: passi.length });
    riga++; colonna = 0;
  }

  // Una scena è un riquadro 1920×1080 nel mondo. Di norma le scene di un blocco stanno in fila
  // da sinistra a destra, e ogni blocco comincia una riga nuova; dx/dy spostano, x/y fissano.
  function scena(id, html, opz = {}) {
    const x = opz.x ?? colonna * PASSO_X + (opz.dx || 0);
    const y = opz.y ?? riga * PASSO_Y + (opz.dy || 0);
    colonna++;
    const el = document.createElement('section');
    el.className = 'scena' + (opz.classe ? ' ' + opz.classe : '');
    el.id = 's-' + id;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.innerHTML = html;
    mondo.appendChild(el);
    scene[id] = { id, x, y, el, ambiente: opz.ambiente };
    return el;
  }

  // p = { id, scena, titolo, note, cam: {x, y, z} in coordinate della scena, anima(tl, q, el) }
  function passo(p) {
    if (passi.some(o => o.id === p.id)) console.warn('passo duplicato:', p.id);
    p.blocco = blocchi[blocchi.length - 1];
    passi.push(p);
  }

  function inquadra(p) {
    const s = scene[p.scena], c = p.cam || {};
    return { x: s.x + (c.x ?? W / 2), y: s.y + (c.y ?? H / 2), z: c.z ?? 1 };
  }

  function costruisci() {
    let prec = null;
    for (const p of passi) {
      const s = scene[p.scena];
      if (!s) throw new Error(`scena "${p.scena}" mancante nel passo "${p.id}"`);
      const dest = inquadra(p);
      const t0 = tl.duration();
      let tAnim = t0;
      if (!prec) Object.assign(cam, dest);
      else if (prec.x !== dest.x || prec.y !== dest.y || prec.z !== dest.z) {
        // volo della telecamera: per i tragitti lunghi si allontana un po' a metà strada
        const d = Math.hypot(dest.x - prec.x, dest.y - prec.y);
        const dur = p.volo ?? (d ? Math.min(2.4, 1.1 + d / 2800) : 1.0);
        const zBase = Math.min(prec.z, dest.z), zMin = zBase * (d > 1600 ? 0.6 : d > 400 ? 0.82 : 1);
        tl.to(cam, { x: dest.x, y: dest.y, duration: dur, ease: 'power2.inOut' }, t0);
        if (zMin < zBase) {
          tl.to(cam, { z: zMin, duration: dur / 2, ease: 'sine.out' }, t0);
          tl.to(cam, { z: dest.z, duration: dur / 2, ease: 'sine.in' }, t0 + dur / 2);
        } else tl.to(cam, { z: dest.z, duration: dur, ease: 'power2.inOut' }, t0);
        tAnim = t0 + dur * (p.sovrapponi ?? 0.6);
      }
      if (p.anima) {
        const sub = gsap.timeline();
        p.anima(sub, gsap.utils.selector(s.el), s.el);
        tl.add(sub, tAnim);
      }
      tl.addLabel(p.id, Math.max(tl.duration(), t0 + 0.01));
      prec = dest;
    }
  }

  // ---------- aiuti per scrivere le animazioni ----------

  const base = new WeakMap();
  function baseDi(e) {
    if (!base.has(e)) base.set(e, { x: gsap.getProperty(e, 'x'), y: gsap.getProperty(e, 'y'), scale: gsap.getProperty(e, 'scale') });
    return base.get(e);
  }
  const DA = { basso: { y: 40 }, alto: { y: -40 }, sinistra: { x: -70 }, destra: { x: 70 }, scala: { s: 0.82 }, niente: {} };
  const giaVisti = new WeakSet();

  // Fa comparire gli elementi; al primo uso li nasconde fin dall'inizio della timeline.
  // Gli spostamenti sono relativi alla posizione propria dell'elemento (vale anche per gli SVG con transform).
  function entra(t, bersagli, opz = {}) {
    const els = gsap.utils.toArray(bersagli), off = DA[opz.da || 'basso'];
    const da = {
      autoAlpha: 0,
      x: (k, e) => baseDi(e).x + (off.x || 0),
      y: (k, e) => baseDi(e).y + (off.y || 0),
      scale: (k, e) => baseDi(e).scale * (off.s || 1),
    };
    els.forEach(e => { if (!giaVisti.has(e)) { giaVisti.add(e); baseDi(e); gsap.set(e, da); } });
    return t.fromTo(els, da, {
      autoAlpha: 1, x: (k, e) => baseDi(e).x, y: (k, e) => baseDi(e).y, scale: (k, e) => baseDi(e).scale,
      duration: opz.dur ?? 0.8, ease: opz.ease || 'power3.out', stagger: opz.stagger ?? 0.08, immediateRender: false,
    }, opz.pos);
  }

  function esce(t, bersagli, opz = {}) {
    return t.to(gsap.utils.toArray(bersagli), { autoAlpha: 0, duration: opz.dur ?? 0.5, ease: 'power2.in', stagger: opz.stagger ?? 0 }, opz.pos);
  }

  // Disegna linee e contorni SVG (servono stroke visibili).
  const giaTracciati = new WeakSet();
  function disegna(t, bersagli, opz = {}) {
    const els = gsap.utils.toArray(bersagli);
    els.forEach(e => { if (!giaTracciati.has(e)) { giaTracciati.add(e); gsap.set(e, { drawSVG: '0%' }); } });
    return t.fromTo(els, { drawSVG: '0%' }, {
      drawSVG: '100%', duration: opz.dur ?? 1, ease: opz.ease || 'power2.inOut', stagger: opz.stagger ?? 0.1, immediateRender: false,
    }, opz.pos);
  }

  // Fa entrare un testo parola per parola.
  const divisi = new WeakMap();
  function parole(t, el, opz = {}) {
    const e = typeof el === 'string' ? document.querySelector(el) : el;
    if (!divisi.has(e)) divisi.set(e, SplitText.create(e, { type: 'words', wordsClass: 'parola' }));
    return entra(t, divisi.get(e).words, { da: 'basso', dur: 0.7, stagger: 0.05, ...opz });
  }

  // Fa entrare un testo lettera per lettera, come se lo si stesse scrivendo.
  function scrivi(t, el, opz = {}) {
    const e = typeof el === 'string' ? document.querySelector(el) : el;
    if (!divisi.has(e)) divisi.set(e, SplitText.create(e, { type: 'chars' }));
    return entra(t, divisi.get(e).chars, { da: 'niente', dur: 0.01, stagger: opz.stagger ?? 0.035, ease: 'none', pos: opz.pos });
  }

  // Scopre un elemento da sinistra a destra.
  const giaRivelati = new WeakSet();
  function rivela(t, bersagli, opz = {}) {
    const els = gsap.utils.toArray(bersagli);
    els.forEach(e => { if (!giaRivelati.has(e)) { giaRivelati.add(e); gsap.set(e, { clipPath: 'inset(0% 100% 0% 0%)' }); } });
    return t.fromTo(els, { clipPath: 'inset(0% 100% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: opz.dur ?? 1.4, ease: opz.ease || 'power2.inOut', stagger: opz.stagger ?? 0.1, immediateRender: false,
    }, opz.pos);
  }

  // Una tela il cui disegno dipende solo da uno stato numerico animato dalla timeline:
  // così anche i salti avanti e indietro ridisegnano lo stato giusto.
  const tele = [];
  function tela(canvas, stato, disegna) {
    tele.push({ canvas, stato, disegna, firma: null });
    return stato;
  }
  function ridisegnaTele() {
    for (const t of tele) {
      const f = Object.keys(t.stato).filter(k => k !== '_gsap').map(k => t.stato[k]).join('|');
      if (f !== t.firma) { t.firma = f; t.disegna(t.canvas.getContext('2d'), t.stato); }
    }
  }

  // Riquadro di rischio: una frase e un caso, da mettere accanto ai momenti entusiasmanti.
  function rischio({ id, titolo, testo, fonte, x, y, w = 640 }) {
    return `<aside class="rischio at" id="${id}" style="left:${x}px;top:${y}px;width:${w}px">
      <div class="r-etichetta">Da tenere presente</div>
      <div class="r-titolo">${titolo}</div>
      <p>${testo}</p>${fonte ? `<div class="r-fonte">${fonte}</div>` : ''}
    </aside>`;
  }
  function avvisa(t, el, opz = {}) {
    const e = typeof el === 'string' ? document.querySelector(el) : el;
    entra(t, e, { da: 'destra', dur: 0.9, ease: 'back.out(1.4)', pos: opz.pos });
    return t.fromTo(e.querySelector('.r-etichetta'), { backgroundColor: 'rgba(228,87,46,0)', color: 'var(--accent)' },
      { backgroundColor: 'rgba(228,87,46,1)', color: '#fff', duration: 0.35, immediateRender: false }, '>-0.2');
  }

  // ---------- navigazione ----------

  function vai(j, opz = {}) {
    j = Math.max(0, Math.min(passi.length - 1, j));
    if (nav) { const n = nav; nav = null; n.progress(1); n.kill(); }   // completa la transizione in corso
    const t = tl.labels[passi[j].id];
    if (opz.istantaneo || Math.abs(j - i) > 1) tl.seek(t);
    else if (j >= i) nav = tl.tweenTo(t, { onComplete: () => { nav = null; } });
    else nav = tl.tweenTo(t, { duration: Math.min(0.7, Math.abs(tl.time() - t)), ease: 'power1.inOut', onComplete: () => { nav = null; } });
    i = j;
    aggiorna();
  }
  const avanti = () => vai(i + 1);
  const indietro = () => vai(i - 1);

  function aggiorna() {
    const p = passi[i];
    history.replaceState(null, '', '#' + p.id);
    document.getElementById('hud-blocco').textContent = etichettaBlocco(p);
    document.getElementById('hud-n').textContent = `${i + 1} / ${passi.length}`;
    document.getElementById('hud-barra').style.transform = `scaleX(${(i + 1) / passi.length})`;
    const sid = p.scena;
    if (sid !== scenaAmbiente) {
      if (fermaAmbiente) fermaAmbiente();
      fermaAmbiente = null;
      scenaAmbiente = sid;
      const s = scene[sid];
      if (s.ambiente) fermaAmbiente = s.ambiente(s.el, { stampa }) || null;
    }
    invia();
  }

  const etichettaBlocco = p => !p.blocco ? '' : p.blocco.numero ? `${p.blocco.numero} · ${p.blocco.titolo}` : p.blocco.titolo;

  function invia() {
    if (!canale) return;
    const p = passi[i], q = passi[i + 1];
    canale.postMessage({
      tipo: 'stato', i, n: passi.length, titolo: p.titolo || p.id, note: p.note || '',
      blocco: etichettaBlocco(p), prossimo: q ? (q.titolo || q.id) : '— fine —',
    });
  }

  // ---------- palco, comandi, mappa ----------

  let ultimo = '';
  function applicaCamera() {
    const v = `translate(${W / 2 - cam.x * cam.z}px,${H / 2 - cam.y * cam.z}px) scale(${cam.z})`;
    if (v !== ultimo) { mondo.style.transform = v; ultimo = v; }
  }

  function adatta() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    palco.style.transform = `translate(${(innerWidth - W * s) / 2}px,${(innerHeight - H * s) / 2}px) scale(${s})`;
  }

  function apriNote() { window.open('note.html', 'note-modulo-b', 'width=1000,height=720'); }

  function mappa(apri) {
    const m = document.getElementById('mappa');
    const vis = apri ?? m.hidden;
    if (vis) {
      m.innerHTML = blocchi.map((b, k) => {
        const fine = blocchi[k + 1] ? blocchi[k + 1].primo : passi.length;
        const voci = passi.slice(b.primo, fine).map((p, d) =>
          `<button data-i="${b.primo + d}" class="${b.primo + d === i ? 'qui' : ''}">${p.titolo || p.id}</button>`).join('');
        return `<section><h3><span>${b.numero || '·'}</span>${b.titolo}</h3>${voci}</section>`;
      }).join('');
    }
    m.hidden = !vis;
  }

  function comandi() {
    addEventListener('keydown', e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); avanti(); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); indietro(); }
      else if (k === 'Home') vai(0, { istantaneo: true });
      else if (k === 'End') vai(passi.length - 1, { istantaneo: true });
      else if (k === 'n' || k === 'N') apriNote();
      else if (k === 'm' || k === 'M') mappa();
      else if (k === 'Escape') mappa(false);
      else if (k === 'f' || k === 'F') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
      else if (k === 'b' || k === 'B' || k === '.') document.getElementById('nero').classList.toggle('on');
    });
    palco.addEventListener('click', e => {
      const audio = e.target.closest('[data-audio]');
      if (audio) { new Audio(audio.dataset.audio).play(); return; }
      if (e.target.closest('a, button, input, .interattivo')) return;
      (e.clientX < innerWidth / 3 ? indietro : avanti)();
    });
    document.getElementById('mappa').addEventListener('click', e => {
      const b = e.target.closest('button[data-i]');
      if (b) { vai(+b.dataset.i, { istantaneo: true }); mappa(false); }
    });
    if (canale) canale.onmessage = ({ data }) => {
      if (data.tipo === 'comando') (data.azione === 'avanti' ? avanti : data.azione === 'indietro' ? indietro : invia)();
    };
    addEventListener('resize', adatta);
  }

  function avvia() {
    adatta();
    if (stampa) document.documentElement.classList.add('stampa');
    document.fonts.ready.then(() => {
      costruisci();
      comandi();
      gsap.ticker.add(applicaCamera);
      gsap.ticker.add(ridisegnaTele);
      const h = decodeURIComponent(location.hash.slice(1));
      const k = passi.findIndex(p => p.id === h);
      if (k > 0 || stampa) { i = Math.max(k, 0); tl.seek(tl.labels[passi[i].id]); aggiorna(); }
      else { i = 0; nav = tl.tweenTo(passi[0].id, { onComplete: () => { nav = null; } }); aggiorna(); }
      applicaCamera();
      ridisegnaTele();
      window.flusso = { vai, avanti, indietro, passi, tl, get i() { return i; } };
    });
  }

  return { W, H, blocco, scena, passo, avvia, entra, esce, disegna, parole, scrivi, rivela, tela, rischio, avvisa, scene };
})();
