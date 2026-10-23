// Blocco 1, seconda parte: la diffusione, il testo che guida l'immagine, la coerenza, il video, il suono.
(() => {
  const { entra, esce, disegna, parole, scrivi, rivela, tela } = F;
  const C = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const qr = (nome, titolo, sotto, url, extra = '') => `<div class="at qr piccolo ${extra}"><img src="qr/${nome}.svg" alt="QR code">
    <div><div style="font-family:var(--head);font-weight:600;font-size:40px">${titolo}</div>
    <div style="font-size:28px;color:var(--muted);margin-top:4px">${sotto}</div><div class="url">${url}</div></div></div>`;

  // ---------- sporcare un'immagine ----------
  const LIV = ['originale', '', '', '', '', 'solo rumore'];
  F.scena('diff-sporca', `
    <div class="kicker at" style="left:140px;top:120px">Dal rumore all'immagine</div>
    <h2 class="at ds-tit" style="left:140px;top:170px;width:1640px">Sporcare un'immagine è <em>facile</em></h2>
    ${[0, 1, 2, 3, 4, 5].map(k => `<img class="at foto ds-img" src="img/diff-${k}.jpg" style="left:${150 + k * 272}px;top:330px;width:240px;height:240px" alt="">
      <div class="at etichetta ds-lab" style="left:${150 + k * 272}px;top:584px;width:240px">${LIV[k]}</div>`).join('')}
    <svg class="tela" viewBox="0 0 1920 1080">
      <line class="ds-piu" x1="150" y1="300" x2="1782" y2="300" stroke="var(--muted)" stroke-width="3"/>
      <polygon class="ds-piu-p" points="1782,292 1798,300 1782,308" fill="var(--muted)"/>
      <rect class="ds-sel" x="962" y="326" width="248" height="248" rx="16" fill="none" stroke="var(--accent)" stroke-width="6"/>
      <line class="ds-fr2" x1="390" y1="800" x2="460" y2="800" stroke="var(--muted)" stroke-width="4"/>
      <line class="ds-fr2" x1="720" y1="800" x2="790" y2="800" stroke="var(--muted)" stroke-width="4"/>
      <g class="ds-reg"><rect x="470" y="720" width="240" height="160" rx="18" fill="var(--fg)"/>
        <text x="590" y="790" text-anchor="middle" font-size="54" fill="#fff">Σ</text>
        <text x="590" y="840" text-anchor="middle" font-size="22" fill="#fff" font-family="JetBrains Mono, monospace">regressore</text></g>
    </svg>
    <div class="at etichetta ds-piu-l" style="left:1400px;top:264px;width:380px;text-align:right">sempre più rumore</div>
    <img class="at foto ds-in" src="img/diff-3.jpg" style="left:180px;top:700px;width:200px;height:200px" alt="">
    <img class="at foto ds-out" src="img/diff-rumore.jpg" style="left:800px;top:700px;width:200px;height:200px" alt="">
    <div class="at etichetta ds-out-l" style="left:780px;top:912px;width:240px">il rumore che c'è dentro</div>
    <p class="at ds-testo" style="left:1100px;top:720px;width:690px;font-size:32px;line-height:1.38">Un regressore impara a <b>prevedere il rumore</b>. Per allenarlo non serve nessuno che etichetti: il rumore l'abbiamo aggiunto noi, quindi la risposta giusta la conosciamo sempre.</p>
  `);

  F.passo({
    id: 'diff-sporca', scena: 'diff-sporca', titolo: 'Sporcare un\'immagine',
    note: `<p>Seconda idea, quella che ha vinto: la diffusione (2020). Prendiamo un'immagine qualsiasi, qui la Nascita di Venere degli Uffizi, e aggiungiamo rumore un poco alla volta, fino a non vedere più niente. Questa parte non richiede nessuna intelligenza.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ds-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ds-img'), { da: 'scala', stagger: 0.25, dur: 0.6 });
      entra(t, q('.ds-lab'), { da: 'niente', stagger: 0.25, pos: '<' });
      disegna(t, q('.ds-piu'), { dur: 1.4, ease: 'none', pos: '<' });
      entra(t, q('.ds-piu-p, .ds-piu-l'), { da: 'niente', pos: '-=0.2' });
    },
  });

  F.passo({
    id: 'diff-regressore', scena: 'diff-sporca', titolo: 'Il regressore del rumore',
    note: `<p>Il trucco: un regressore, cioè lo stesso tipo di modello del modulo A, guarda un'immagine sporca e prevede il rumore che c'è dentro. È un problema "facile da etichettare": l'abbiamo sporcata noi, sappiamo esattamente quale rumore c'è.</p><p>Tenete a mente questa idea, "la risposta giusta è già nei dati": tornerà con i testi (self-supervised).</p>`,
    anima: (t, q) => {
      disegna(t, q('.ds-sel'), { dur: 0.6 });
      entra(t, q('.ds-in'), { da: 'scala', dur: 0.5 });
      disegna(t, q('.ds-fr2')[0], { dur: 0.3 });
      entra(t, q('.ds-reg'), { da: 'scala', ease: 'back.out(1.5)', dur: 0.5 });
      disegna(t, q('.ds-fr2')[1], { dur: 0.3 });
      entra(t, q('.ds-out, .ds-out-l'), { da: 'scala', dur: 0.5 });
      entra(t, q('.ds-testo'), { pos: '+=0.1' });
    },
  });

  // ---------- generare, al contrario: diffusione vera in due dimensioni ----------
  // I dati sono punti che formano la scritta "IA". Il denoiser è quello ottimo per questi dati
  // (media pesata degli esempi), e ogni campione segue i 40 passi deterministici di DDIM.
  function preparaDiffusione() {
    const off = document.createElement('canvas');
    off.width = 400; off.height = 240;
    const c = off.getContext('2d');
    c.font = '600 230px Fraunces';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('IA', 200, 132);
    const px = c.getImageData(0, 0, 400, 240).data, pieni = [];
    for (let y = 0; y < 240; y += 2) for (let x = 0; x < 400; x += 2) if (px[(y * 400 + x) * 4 + 3] > 128) pieni.push([(x - 200) / 105, (y - 120) / 105]);
    let s = 17;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd());
    const D = Array.from({ length: 900 }, () => pieni[Math.floor(rnd() * pieni.length)]);
    const K = 40, N = 650;
    const ab = Array.from({ length: K + 1 }, (_, k) => Math.max(1e-4, Math.cos((1 - k / K) * Math.PI / 2) ** 2));
    ab[K] = 1;
    const traj = [], stima = [];
    let x = Float32Array.from({ length: 2 * N }, gauss);
    traj.push(x);
    const pesi = new Float64Array(D.length);
    for (let k = 0; k < K; k++) {
      const a = ab[k], sa = Math.sqrt(a), v = 1 - a, a2 = ab[k + 1];
      const nx = new Float32Array(2 * N), x0s = new Float32Array(2 * N);
      for (let i = 0; i < N; i++) {
        const xi = x[2 * i], yi = x[2 * i + 1];
        let m = -Infinity;
        for (let j = 0; j < D.length; j++) {
          const dx = xi - sa * D[j][0], dy = yi - sa * D[j][1];
          pesi[j] = -(dx * dx + dy * dy) / (2 * v);
          if (pesi[j] > m) m = pesi[j];
        }
        let sw = 0, ex = 0, ey = 0;
        for (let j = 0; j < D.length; j++) { const w = Math.exp(pesi[j] - m); sw += w; ex += w * D[j][0]; ey += w * D[j][1]; }
        ex /= sw; ey /= sw;
        const epx = (xi - sa * ex) / Math.sqrt(v), epy = (yi - sa * ey) / Math.sqrt(v);
        nx[2 * i] = Math.sqrt(a2) * ex + Math.sqrt(1 - a2) * epx;
        nx[2 * i + 1] = Math.sqrt(a2) * ey + Math.sqrt(1 - a2) * epy;
        x0s[2 * i] = ex; x0s[2 * i + 1] = ey;
      }
      stima.push(x0s);
      x = nx;
      traj.push(x);
    }
    stima.push(x);
    return { D, traj, stima, K, N };
  }

  F.scena('diff-genera', `
    <canvas class="at dg-tela" width="1760" height="1760" style="left:110px;top:120px;width:880px;height:880px"></canvas>
    <div class="kicker at" style="left:1080px;top:190px">Ora al contrario</div>
    <h2 class="at dg-tit" style="left:1080px;top:240px;width:720px;font-size:72px">Dal rumore, <em>un passo alla volta</em></h2>
    <p class="at dg-p1" style="left:1080px;top:470px;width:700px;font-size:32px">Gli esempi: 900 punti che formano una scritta. Qui ogni "immagine" è fatta di due soli numeri.</p>
    <p class="at dg-p2" style="left:1080px;top:610px;width:700px;font-size:32px">Si parte da 650 punti presi <b>a caso</b>: rumore puro.</p>
    <p class="at dg-p3" style="left:1080px;top:720px;width:700px;font-size:32px">A ogni passo il regressore indica il rumore da togliere (le frecce). Ne togliamo un po', e ripetiamo: 40 volte.</p>
    <p class="at lead dg-p4" style="left:1080px;top:880px;width:700px;font-size:30px">Calcolato davvero, non disegnato a mano.</p>
  `);

  let dati = null;
  const stato = { esempi: 0, campioni: 0, p: 0 };
  F.passo({
    id: 'diff-esempi', scena: 'diff-genera', titolo: 'Diffusione: gli esempi',
    note: `<p>Per vedere che cosa succede davvero, scendiamo da milioni di pixel a due numeri. Ogni punto è un "esempio di addestramento".</p>`,
    anima: (t, q, el) => {
      dati ??= preparaDiffusione();
      const cv = q('.dg-tela')[0], S = cv.width, sc = S / 5.2, cx = S / 2, cy = S / 2;
      const P = (x, y) => [cx + x * sc, cy + y * sc];
      tela(cv, stato, (ctx, st) => {
        ctx.clearRect(0, 0, S, S);
        ctx.fillStyle = C('--surface');
        ctx.beginPath(); ctx.roundRect(0, 0, S, S, 40); ctx.fill();
        if (st.esempi > 0) {
          ctx.fillStyle = C('--accent-2'); ctx.globalAlpha = st.esempi;
          for (const [x, y] of dati.D) { const [a, b] = P(x, y); ctx.beginPath(); ctx.arc(a, b, 5, 0, 6.2832); ctx.fill(); }
        }
        if (st.campioni > 0) {
          const kf = st.p * dati.K, k0 = Math.min(dati.K - 1, Math.floor(kf)), fr = kf - k0;
          const A = dati.traj[k0], B = dati.traj[k0 + 1], E = dati.stima[k0];
          if (st.p > 0 && st.p < 0.97) {
            ctx.strokeStyle = C('--accent'); ctx.lineWidth = 3; ctx.globalAlpha = st.campioni * 0.55 * (1 - st.p);
            for (let i = 0; i < dati.N; i += 6) {
              const x = A[2 * i] + (B[2 * i] - A[2 * i]) * fr, y = A[2 * i + 1] + (B[2 * i + 1] - A[2 * i + 1]) * fr;
              const [a, b] = P(x, y), [c2, d2] = P(x + (E[2 * i] - x) * 0.35, y + (E[2 * i + 1] - y) * 0.35);
              ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c2, d2); ctx.stroke();
            }
          }
          ctx.fillStyle = C('--fg'); ctx.globalAlpha = st.campioni;
          for (let i = 0; i < dati.N; i++) {
            const x = A[2 * i] + (B[2 * i] - A[2 * i]) * fr, y = A[2 * i + 1] + (B[2 * i + 1] - A[2 * i + 1]) * fr;
            const [a, b] = P(x, y);
            ctx.beginPath(); ctx.arc(a, b, 6, 0, 6.2832); ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      });
      entra(t, q('.dg-tela'), { da: 'scala', dur: 0.7 });
      t.to(stato, { esempi: 0.9, duration: 1 }, '-=0.2');
      entra(t, q('.kicker'), { dur: 0.5, pos: '<' });
      parole(t, q('.dg-tit')[0], { pos: '-=0.4' });
      entra(t, q('.dg-p1'));
    },
  });

  F.passo({
    id: 'diff-rumore', scena: 'diff-genera', titolo: 'Diffusione: si parte dal rumore',
    note: `<p>Ora dimentichiamo gli esempi (li lascio in trasparenza) e partiamo da punti a caso.</p>`,
    anima: (t, q) => {
      t.to(stato, { esempi: 0.12, duration: 0.8 });
      t.to(stato, { campioni: 1, duration: 0.8 }, '<0.2');
      entra(t, q('.dg-p2'), { pos: '<' });
    },
  });

  F.passo({
    id: 'diff-genera', scena: 'diff-genera', titolo: 'Diffusione: 40 passi',
    note: `<p>Guardate le frecce: all'inizio puntano tutte verso il centro (il regressore "sa" solo che i dati stanno lì in mezzo), poi si specializzano. Alla fine i punti sono sulla scritta.</p><p>Qui gli esempi sono pochi e il denoiser è perfetto, quindi i punti finiscono proprio sugli esempi: è la <b>memorizzazione</b>, il motivo per cui a volte un generatore ricopia un'immagine vista. I modelli veri sono imperfetti, e per questo generano anche cose nuove.</p>`,
    anima: (t, q) => {
      entra(t, q('.dg-p3'));
      t.to(stato, { p: 1, duration: 6, ease: 'sine.inOut' }, '<0.3');
      entra(t, q('.dg-p4'), { pos: '-=0.6' });
    },
  });

  // ---------- con le immagini vere ----------
  const PASSI = [1, 3, 8, 15, 40];
  F.scena('diff-vera', `
    <div class="kicker at" style="left:140px;top:110px">Con le immagini vere</div>
    <h2 class="at dv2-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Stessa idea, <em>con milioni di numeri</em></h2>
    ${PASSI.map((n, k) => `<img class="at foto dv2-img" src="img/ddim-${n}.jpg" style="left:${150 + k * 330}px;top:290px;width:300px;height:450px" alt="">
      <div class="at etichetta dv2-lab" style="left:${150 + k * 330}px;top:752px;width:300px">${n} ${n === 1 ? 'passo' : 'passi'}</div>`).join('')}
    <div class="at didascalia dv2-cap" style="left:150px;top:800px">Stable Diffusion, stessa richiesta con più o meno passi · Benlisquare, CC BY-SA 4.0, Wikimedia Commons</div>
    ${qr('rumore', 'Provate voi: <em style="color:var(--accent)">Dal rumore alla forma</em>', 'Disegnate una forma e guardate il rumore diventare quella forma.', 'nunziati.github.io/…/modulo-b/demo/rumore.html', 'dv2-qr" style="left:150px;top:850px')}
  `);

  F.passo({
    id: 'diff-vera', scena: 'diff-vera', titolo: 'Diffusione su immagini vere',
    note: `<p>Un'immagine di 512×768 pixel a colori è un punto con più di un milione di coordinate. Il principio è lo stesso. Più passi, più dettagli.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.dv2-tit')[0], { pos: '-=0.2' });
      entra(t, q('.dv2-img'), { da: 'scala', stagger: 0.3, dur: 0.6 });
      entra(t, q('.dv2-lab'), { da: 'niente', stagger: 0.3, pos: '<' });
      entra(t, q('.dv2-cap'), { da: 'niente' });
    },
  });

  F.passo({
    id: 'demo-rumore', scena: 'diff-vera', titolo: 'Demo: Dal rumore alla forma',
    note: `<p><b>Demo nostra.</b> Disegnano una forma col dito, poi guardano i punti uscire dal rumore e comporla. Tre minuti.</p>`,
    anima: (t, q) => { entra(t, q('.dv2-qr')); },
  });

  // ---------- il testo che guida l'immagine ----------
  const COPPIE = [
    ['img/diff-0.jpg', 'una dea che nasce dal mare', 190, 350, 150, 150, 190, 512, 320],
    ['img/ddim-40.jpg', 'un castello europeo in Giappone', 760, 340, 110, 165, 885, 372, 240],
    ['img/gan-uomo.jpg', 'un uomo che sorride', 190, 690, 150, 150, 360, 730, 250],
    ['img/astronauta.jpg', 'un astronauta a cavallo', 720, 690, 150, 150, 890, 725, 230],
  ];
  F.scena('clip', `
    <div class="kicker at" style="left:140px;top:110px">Come fa il testo a guidare l'immagine?</div>
    <h2 class="at cl-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Parole e immagini <em>nello stesso spazio</em></h2>
    <div class="at cl-spazio" style="left:140px;top:300px;width:1000px;height:700px;border-radius:24px;background:var(--surface)"></div>
    <div class="at etichetta cl-spazio-l" style="left:840px;top:960px;width:280px;text-align:right">lo spazio dei significati</div>
    ${COPPIE.map(([src, txt, x, y, w, h, tx, ty, tw], k) => `<img class="at foto cl-img cl-c${k}" src="${src}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px" alt="">
      <div class="at cl-txt cl-c${k}" style="left:${tx}px;top:${ty}px;width:${tw}px;font-family:var(--head);font-style:italic;font-size:30px;line-height:1.2">«${txt}»</div>`).join('')}
    <p class="at cl-p" style="left:1220px;top:330px;width:560px;font-size:32px"><b>CLIP</b> (OpenAI, 2021) ha visto 400 milioni di coppie immagine–didascalia, e ha imparato a mettere <b>vicine</b> un'immagine e la frase che la descrive.</p>
    <p class="at lead cl-p2" style="left:1220px;top:640px;width:560px;font-size:30px">Così una frase diventa un punto in quello spazio: una direzione verso cui spingere.</p>
  `);

  F.passo({
    id: 'clip', scena: 'clip', titolo: 'CLIP: parole e immagini',
    note: `<p>È la stessa idea degli embedding, che vedremo con i testi: ogni cosa diventa un punto, e le cose che si somigliano stanno vicine. Qui però stanno vicine un'immagine e la sua descrizione.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.cl-tit')[0], { pos: '-=0.2' });
      entra(t, q('.cl-spazio'), { da: 'scala', dur: 0.6 });
      for (let k = 0; k < 4; k++) entra(t, q('.cl-c' + k), { da: 'scala', stagger: 0.15, dur: 0.5, pos: k ? '-=0.2' : '+=0' });
      entra(t, q('.cl-spazio-l'), { da: 'niente' });
      entra(t, q('.cl-p'), { pos: '-=0.3' });
      entra(t, q('.cl-p2'), { pos: '+=0.2' });
    },
  });

  F.scena('guida', `
    <div class="kicker at" style="left:140px;top:110px">La guida</div>
    <h2 class="at gu-tit" style="left:140px;top:160px;width:1640px;font-size:72px">La frase <em>spinge</em> ogni passo</h2>
    <div class="at card gu-prompt" style="left:150px;top:300px;width:1620px;padding:22px 30px;font-family:var(--mono);font-size:36px"><span class="muted">richiesta ›</span> <span class="gu-testo">un astronauta a cavallo, foto</span></div>
    ${[0, 1, 2, 3, 4].map(k => `<img class="at foto gu-img" src="img/astro-${k}.jpg" style="left:${150 + k * 340}px;top:450px;width:290px;height:290px" alt="">`).join('')}
    <svg class="tela" viewBox="0 0 1920 1080">
      ${[0, 1, 2, 3].map(k => `<line class="gu-fr" x1="${450 + k * 340}" y1="595" x2="${482 + k * 340}" y2="595" stroke="var(--accent)" stroke-width="5"/>`).join('')}
    </svg>
    <div class="at etichetta gu-lab" style="left:150px;top:752px;width:1630px">a ogni passo si toglie rumore, nella direzione della frase</div>
    <div class="at gu-tappe" style="left:150px;top:850px;display:flex;gap:18px">
      <span class="pill gu-pill">DALL·E 2 · <b>aprile 2022</b></span>
      <span class="pill gu-pill">Midjourney · <b>luglio 2022</b></span>
      <span class="pill gu-pill">Stable Diffusion · <b>agosto 2022</b> · pesi scaricabili</span>
    </div>
    <div class="at didascalia gu-cap" style="left:150px;top:950px">Immagine finale: Stable Diffusion XL, VulcanSphere, pubblico dominio. I passaggi intermedi sono ricostruiti per mostrare l'idea.</div>
  `);

  F.passo({
    id: 'guida', scena: 'guida', titolo: 'La frase guida la diffusione',
    note: `<p>Il denoiser riceve anche la frase. A ogni passo toglie il rumore "che non somiglia" alla frase. Nel 2022, in pochi mesi, escono i tre generatori che hanno reso tutto questo popolare; Stable Diffusion con i pesi scaricabili, e lo riprendiamo nel pomeriggio.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.gu-tit')[0], { pos: '-=0.2' });
      entra(t, q('.gu-prompt'), { da: 'basso', dur: 0.5 });
      scrivi(t, q('.gu-testo')[0]);
      for (let k = 0; k < 5; k++) {
        entra(t, q('.gu-img')[k], { da: 'scala', dur: 0.45, pos: k ? '+=0.05' : '+=0.2' });
        if (k < 4) disegna(t, q('.gu-fr')[k], { dur: 0.25 });
      }
      entra(t, q('.gu-lab'), { da: 'niente' });
      entra(t, q('.gu-pill'), { stagger: 0.2, pos: '+=0.2' });
      entra(t, q('.gu-cap'), { da: 'niente' });
    },
  });

  // ---------- la coerenza ----------
  F.scena('coerenza', `
    <div class="kicker at" style="left:140px;top:110px">La coerenza</div>
    <h2 class="at co-tit" style="left:140px;top:160px;width:1640px;font-size:72px">«Rifalla identica», <em>cento volte</em></h2>
    ${[0, 1, 2, 3, 4, 5].map(k => `<img class="at foto co-img" src="img/deriva-${k}.jpg" style="left:${150 + k * 280}px;top:320px;width:240px;height:240px" alt="">`).join('')}
    ${[0, 1, 2, 3, 4].map(k => `<div class="at freccia-t co-fr" style="left:${392 + k * 280}px;top:425px;width:36px;text-align:center">→</div>`).join('')}
    <div class="at didascalia co-cap" style="left:150px;top:580px;width:1630px">Simulazione dell'effetto sulla Nascita di Venere. Nel 2025 il gioco «ricrea la stessa immagine 100 volte» è diventato virale.</div>
    <p class="at co-p" style="left:150px;top:660px;width:1620px;font-size:38px">Ogni generazione parte da <b>rumore nuovo</b>: niente obbliga due immagini a essere coerenti, e i piccoli scarti si sommano.</p>
    <div class="at card co-card" style="left:150px;top:830px;width:1620px;font-size:30px">Il problema si sta riducendo: dal 2025 alcuni modelli tengono lo stesso personaggio in scene diverse (per esempio Gemini 2.5 Flash Image, detto «Nano Banana», agosto 2025).</div>
  `);

  F.passo({
    id: 'deriva', scena: 'coerenza', titolo: 'Coerenza: la deriva',
    note: `<p>Qui è una simulazione, ma il fenomeno è reale: nel 2025 girava il gioco di chiedere a ChatGPT di rifare "identica" un'immagine, cento volte di fila. I volti cambiavano, i colori viravano al giallo. (TechRadar, la foto di The Rock rifatta 101 volte.)</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.co-tit')[0], { pos: '-=0.2' });
      for (let k = 0; k < 6; k++) {
        entra(t, q('.co-img')[k], { da: 'sinistra', dur: 0.5, pos: k ? '-=0.15' : '+=0.1' });
        if (k < 5) entra(t, q('.co-fr')[k], { da: 'niente', dur: 0.2 });
      }
      entra(t, q('.co-cap'), { da: 'niente' });
      entra(t, q('.co-p'), { pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'personaggi', scena: 'coerenza', titolo: 'Coerenza dei personaggi',
    note: `<p>Per fumetti, storyboard e pubblicità la coerenza è tutto. Nel 2025 è migliorata molto: si può chiedere "lo stesso personaggio, ora in cucina".</p>`,
    anima: (t, q) => { entra(t, q('.co-card')); },
  });

  // ---------- il video ----------
  // Due anteprime in loop: a sinistra ogni fotogramma è generato da solo (la palla salta e cambia),
  // a destra i fotogrammi sono coerenti tra loro.
  function anteprimeVideo(el, { stampa }) {
    const tele2 = [...el.querySelectorAll('.vi-tela')].map(c => c.getContext('2d'));
    const fg = C('--fg'), acc = C('--accent'), acc2 = C('--accent-2'), surf = C('--surface');
    let s = 4;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const sfondo = ctx => { ctx.fillStyle = surf; ctx.fillRect(0, 0, 1520, 840); ctx.fillStyle = fg; ctx.globalAlpha = 0.15; ctx.fillRect(0, 740, 1520, 100); ctx.globalAlpha = 1; };
    let raf, t0 = null, ultimo = -1, salto = null;
    const frame = now => {
      t0 ??= now;
      const t = (now - t0) / 1000, ph = (t % 2) / 2;
      const x = 160 + ph * 1200, y = 740 - 110 - Math.abs(Math.sin(ph * Math.PI * 3)) * 420;
      const b = tele2[1];
      sfondo(b); b.fillStyle = acc; b.beginPath(); b.arc(x, y, 110, 0, 6.2832); b.fill();
      const f = Math.floor(t * 8);
      if (f !== ultimo) {
        ultimo = f;
        salto = { x: x + (rnd() - 0.5) * 380, y: y + (rnd() - 0.5) * 260, r: 70 + rnd() * 90, c: [acc, acc2, fg][Math.floor(rnd() * 3)], sq: rnd() < 0.3 };
      }
      const a = tele2[0];
      sfondo(a); a.fillStyle = salto.c;
      if (salto.sq) a.fillRect(salto.x - salto.r, salto.y - salto.r, 2 * salto.r, 2 * salto.r);
      else { a.beginPath(); a.arc(salto.x, Math.min(salto.y, 640), salto.r, 0, 6.2832); a.fill(); }
      if (!stampa) raf = requestAnimationFrame(frame);
    };
    if (stampa) { frame(1000); frame(1300); return null; }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }

  const TAPPE_VIDEO = [['marzo 2023', 'Will Smith che mangia spaghetti', 'ModelScope, diventato un meme'], ['febbraio 2024', 'Sora', 'primo annuncio, un minuto di video'],
    ['maggio 2025', 'Veo 3', 'video con l\'audio'], ['settembre 2025', 'Sora 2', 'un\'app di video generati']];
  F.scena('video', `
    <div class="kicker at" style="left:140px;top:110px">Il video</div>
    <h2 class="at vi-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Immagini nel tempo, <em>che devono restare coerenti</em></h2>
    <canvas class="at vi-tela vi-a" width="1520" height="840" style="left:150px;top:300px;width:760px;height:420px;border-radius:16px"></canvas>
    <canvas class="at vi-tela vi-b" width="1520" height="840" style="left:1010px;top:300px;width:760px;height:420px;border-radius:16px"></canvas>
    <div class="at etichetta vi-la" style="left:150px;top:732px;width:760px">ogni fotogramma generato da solo</div>
    <div class="at etichetta vi-lb" style="left:1010px;top:732px;width:760px">tutti i fotogrammi generati insieme</div>
    <svg class="tela" viewBox="0 0 1920 1080"><line class="vi-linea" x1="150" y1="830" x2="1770" y2="830" stroke="var(--fg)" stroke-width="4"/>
      ${TAPPE_VIDEO.map((_, k) => `<circle class="vi-pt" cx="${250 + k * 470}" cy="830" r="12" fill="var(--accent)"/>`).join('')}</svg>
    ${TAPPE_VIDEO.map(([d, n, s], k) => `<div class="at vi-tappa" style="left:${250 + k * 470 - 100}px;top:852px;width:420px">
      <div class="mono acc" style="font-size:20px">${d}</div><div style="font-weight:600;font-size:28px">${n}</div><div class="muted" style="font-size:22px">${s}</div></div>`).join('')}
  `, { ambiente: anteprimeVideo });

  F.passo({
    id: 'video', scena: 'video', titolo: 'Video: la coerenza nel tempo',
    note: `<p>Un video sono 24 o 30 immagini al secondo. Se le generi una per una, ogni fotogramma parte da rumore diverso e l'oggetto salta, cambia forma e colore (sinistra). I modelli video generano tutti i fotogrammi insieme, come un unico blocco (destra).</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.vi-tit')[0], { pos: '-=0.2' });
      entra(t, q('.vi-a, .vi-la'), { da: 'scala', dur: 0.6 });
      entra(t, q('.vi-b, .vi-lb'), { da: 'scala', dur: 0.6, pos: '+=0.6' });
    },
  });

  F.passo({
    id: 'video-tappe', scena: 'video', titolo: 'Video: le tappe',
    note: `<p>Il video degli spaghetti del 2023 era grottesco; due anni dopo i video generati con l'audio sono difficili da distinguere da quelli veri. Da qui parte il prossimo blocco.</p>`,
    anima: (t, q) => {
      disegna(t, q('.vi-linea'), { dur: 1, ease: 'power1.inOut' });
      entra(t, q('.vi-pt'), { da: 'scala', stagger: 0.25, dur: 0.3, pos: '<0.1' });
      entra(t, q('.vi-tappa'), { stagger: 0.25, pos: '<' });
    },
  });

  // ---------- il suono ----------
  F.scena('suono', `
    <div class="kicker at" style="left:140px;top:110px">Il suono</div>
    <h2 class="at su-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Anche il suono <em>è un'immagine</em></h2>
    <svg class="at su-onda" viewBox="0 0 1200 300" style="left:150px;top:290px;width:1200px;height:300px"><path class="su-path" d="${window.ONDA_PINOCCHIO}" fill="var(--fg)" stroke="var(--fg)" stroke-width="1"/></svg>
    <div class="at su-play" style="left:1430px;top:360px;width:350px">
      <button class="play" data-audio="audio/cera-una-volta.mp3">▶ ascolta</button>
      <div class="didascalia" style="margin-top:18px">«C'era una volta un pezzo di legno»<br>LibriVox, letto da Simone Pagliari, pubblico dominio</div></div>
    <img class="at su-spettro" src="img/spettro.png" style="left:150px;top:630px;width:1200px;height:360px;border-radius:12px" alt="spettrogramma">
    <div class="at etichetta su-t" style="left:1150px;top:996px;width:200px;text-align:right">tempo →</div>
    <div class="at etichetta su-f" style="left:60px;top:780px;transform:rotate(-90deg);width:200px">frequenza →</div>
    <p class="at su-p" style="left:1430px;top:650px;width:360px;font-size:28px;line-height:1.35">Lo <b>spettrogramma</b>: quanta energia a ogni frequenza, istante per istante. È un'immagine. E le immagini sappiamo generarle.</p>
  `);

  F.passo({
    id: 'suono', scena: 'suono', titolo: 'Suono: la forma d\'onda',
    note: `<p>Premete "ascolta": è la prima frase di Pinocchio, letta da un volontario di LibriVox. La forma d'onda dice quanto è forte il suono, istante per istante.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.su-tit')[0], { pos: '-=0.2' });
      rivela(t, q('.su-onda'), { dur: 1.6 });
      entra(t, q('.su-play'), { pos: '-=0.6' });
    },
  });

  F.passo({
    id: 'spettro', scena: 'suono', titolo: 'Suono: lo spettrogramma',
    note: `<p>In basso le frequenze gravi, in alto le acute; le strisce orizzontali sono le armoniche della voce. Generare una voce o una musica diventa "generare un'immagine" di questo tipo, e poi ritrasformarla in suono.</p>`,
    anima: (t, q) => {
      rivela(t, q('.su-spettro'), { dur: 1.6 });
      entra(t, q('.su-t, .su-f'), { da: 'niente', pos: '-=0.6' });
      entra(t, q('.su-p'), { pos: '-=0.4' });
    },
  });

  F.scena('voci', `
    <div class="kicker at" style="left:140px;top:110px">Voci e musica</div>
    <h2 class="at vo-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Bastano <em>pochi secondi</em></h2>
    <div class="at card vo-c1" style="left:150px;top:320px;width:790px;height:400px">
      <div class="grande" style="font-size:140px">3 s</div>
      <div style="font-family:var(--head);font-weight:600;font-size:40px;margin-top:10px">di registrazione per imitare una voce</div>
      <p style="font-size:28px;color:var(--muted);margin-top:14px">VALL-E, Microsoft, gennaio 2023. Oggi lo fanno app gratuite.</p></div>
    <div class="at card vo-c2" style="left:980px;top:320px;width:790px;height:400px">
      <div style="font-family:var(--head);font-weight:600;font-size:40px">Canzoni intere da una frase</div>
      <p style="font-size:28px;margin-top:14px">Suno e Udio generano testo, voce e strumenti. Le grandi case discografiche li hanno portati in tribunale nel 2024; a fine 2025 Universal e Warner hanno firmato accordi.</p></div>
    <p class="at vo-ponte" style="left:150px;top:800px;width:1620px;font-family:var(--head);font-size:52px;line-height:1.15">Se si possono generare un volto, una voce e un video… <em style="color:var(--accent)">come facciamo a sapere che cosa è vero?</em></p>
  `);

  F.passo({
    id: 'voci', scena: 'voci', titolo: 'Voci clonate e musica',
    note: `<p>Il passaggio chiave per il prossimo blocco: una voce non è più una prova di identità.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.vo-tit')[0], { pos: '-=0.2' });
      entra(t, q('.vo-c1'), { da: 'sinistra' });
      entra(t, q('.vo-c2'), { da: 'destra', pos: '-=0.4' });
    },
  });

  F.passo({
    id: 'ponte-vero', scena: 'voci', titolo: 'Domanda: come sappiamo cosa è vero?',
    note: `<p>Pausa caffè dopo questa domanda, o subito prima, secondo l'orario.</p>`,
    anima: (t, q) => { parole(t, q('.vo-ponte')[0], { stagger: 0.07 }); },
  });
})();
