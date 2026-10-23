// Apertura: dal modulo A alla domanda della giornata, poi il programma.
(() => {
  const { entra, esce, disegna, parole } = F;
  const C = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

  // Sullo sfondo del titolo, punti che passano dal rumore a una forma e tornano rumore: la diffusione in piccolo.
  function rumoreForma(el, { stampa }) {
    const cv = el.querySelector('.t-rumore'), ctx = cv.getContext('2d');
    const S = cv.width, N = 760, R = S * 0.4, c = S / 2, fg = C('--fg'), acc = C('--accent');
    let seme = 11;
    const rnd = () => (seme = (seme * 16807) % 2147483647) / 2147483647;
    const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());
    const pts = Array.from({ length: N }, (_, k) => {
      const a = k * 2.39996, r = R * Math.sqrt((k + 0.5) / N);
      return { tx: r * Math.cos(a), ty: r * Math.sin(a), nx: gauss(), ny: gauss(), acc: k % 11 === 0 };
    });
    const disegnaCon = s => {
      ctx.clearRect(0, 0, S, S);
      const keep = Math.sqrt(1 - s * s);
      for (const p of pts) {
        ctx.fillStyle = p.acc ? acc : fg;
        ctx.globalAlpha = p.acc ? 0.95 : 0.72;
        ctx.beginPath();
        ctx.arc(c + keep * p.tx + s * p.nx * S * 0.2, c + keep * p.ty + s * p.ny * S * 0.2, 5.5, 0, 6.2832);
        ctx.fill();
      }
    };
    if (stampa) { disegnaCon(0); return null; }
    const T = 9, liscio = x => x * x * (3 - 2 * x);
    let raf, t0 = null;
    const tick = now => {
      t0 ??= now;
      const t = ((now - t0) / 1000) % T;
      const s = t < 1.2 ? 1 : t < 5.2 ? 1 - liscio((t - 1.2) / 4) : t < 7.6 ? 0 : liscio((t - 7.6) / 1.4);
      if (t < 0.05) pts.forEach(p => { p.nx = gauss(); p.ny = gauss(); });
      disegnaCon(Math.min(1, s));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  // Piatti e bottiglie del modulo A (diametro, altezza in cm).
  const PIATTI = [[16.83, 4.91], [22.43, 4.33], [15.52, 4.82], [28.64, 4.68], [18.88, 3.79], [24.94, 4.77], [19.68, 2.27], [22.8, 2.59], [23.2, 2.14], [17.77, 2.98]];
  const BOTT = [[6.94, 26.58], [6.36, 17.98], [9.14, 15.08], [6.78, 27.23], [6.4, 25.6], [7.71, 25.94], [5.7, 26.57], [9.01, 16.11], [5.37, 20.38], [9.93, 16.74]];
  const px = d => 30 + d / 30 * 460, py = a => 430 - a / 30 * 400;
  const assi = (xl, yl) => `<g class="assi"><line x1="30" y1="430" x2="500" y2="430" class="s-fg" stroke-width="3"/><line x1="30" y1="430" x2="30" y2="20" class="s-fg" stroke-width="3"/>
    <text x="500" y="462" text-anchor="end" font-size="22" class="f-muted" fill="var(--muted)">${xl}</text>
    <text x="16" y="20" text-anchor="end" font-size="22" fill="var(--muted)" transform="rotate(-90 16 20)">${yl}</text></g>`;
  const puntiClf = PIATTI.map(([d, a]) => `<circle class="pt" cx="${px(d)}" cy="${py(a)}" r="11" fill="var(--accent)"/>`).join('')
    + BOTT.map(([d, a]) => `<rect class="pt" x="${px(d) - 10}" y="${py(a) - 10}" width="20" height="20" fill="var(--accent-2)"/>`).join('');
  let seme = 5;
  const rnd = () => (seme = (seme * 16807) % 2147483647) / 2147483647;
  const puntiReg = Array.from({ length: 16 }, (_, k) => {
    const x = 60 + k * 27 + rnd() * 10, y = 400 - 0.6 * (x - 40) + (rnd() - 0.5) * 60;
    return `<circle class="pt" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="var(--fg)"/>`;
  }).join('');

  F.blocco('', 'Apertura');

  F.scena('titolo', `
    <div class="kicker at" style="left:140px;top:300px">AI for Future · Modulo B</div>
    <h1 class="at t-titolo" style="left:140px;top:352px;width:1080px;font-size:124px">IA generativa<br><em>e mindset digitale</em></h1>
    <div class="at lead t-sotto" style="left:140px;top:676px;font-size:36px">Santa Chiara Lab · Università di Siena · 26 ottobre 2026</div>
    <div class="at t-autore" style="left:140px;top:736px;font-size:34px;font-weight:600">Giacomo Nunziati</div>
    <canvas class="at t-rumore" width="1300" height="1300" style="left:1180px;top:215px;width:650px;height:650px"></canvas>
  `, { ambiente: rumoreForma });

  F.passo({
    id: 'titolo', scena: 'titolo', titolo: 'Titolo',
    note: `<p>Benvenuti al modulo B. Sullo sfondo, dei punti passano dal rumore a una forma e tornano rumore: alla fine della mattina saprete che cosa state guardando.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.6 });
      parole(t, q('.t-titolo')[0], { pos: '-=0.3' });
      entra(t, q('.t-sotto, .t-autore'), { pos: '-=0.3', stagger: 0.12 });
      entra(t, q('.t-rumore'), { da: 'scala', dur: 1.2, pos: 0.2 });
    },
  });

  F.scena('ricordo', `
    <div class="kicker at" style="left:140px;top:130px">Dove eravamo rimasti</div>
    <h2 class="at r-tit" style="left:140px;top:180px;width:1500px">Una macchina che impara <em>dagli esempi</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <g class="neur" transform="translate(600,330) scale(1.3)">
        <line class="nl" x1="114" y1="120" x2="258" y2="196" stroke="var(--fg)" stroke-width="4"/>
        <line class="nl" x1="114" y1="340" x2="258" y2="264" stroke="var(--fg)" stroke-width="4"/>
        <circle class="nn" cx="70" cy="120" r="44" fill="var(--surface)" stroke="var(--fg)" stroke-width="3"/>
        <circle class="nn" cx="70" cy="340" r="44" fill="var(--surface)" stroke="var(--fg)" stroke-width="3"/>
        <text class="nt" x="70" y="200" text-anchor="middle" font-size="26">diametro</text>
        <text class="nt" x="70" y="420" text-anchor="middle" font-size="26">altezza</text>
        <text class="nt" x="190" y="138" font-size="30" font-style="italic" fill="var(--accent)">w₁</text>
        <text class="nt" x="190" y="342" font-size="30" font-style="italic" fill="var(--accent)">w₂</text>
        <circle class="nn" cx="330" cy="230" r="78" fill="var(--fg)"/>
        <text class="nt" x="330" y="252" text-anchor="middle" font-size="64" fill="#fff">Σ</text>
        <line class="nl" x1="408" y1="230" x2="492" y2="230" stroke="var(--accent)" stroke-width="5"/>
        <polygon class="nt" points="492,218 512,230 492,242" fill="var(--accent)"/>
        <text class="nt" x="450" y="292" text-anchor="middle" font-size="24" fill="var(--muted)">piatto o</text>
        <text class="nt" x="450" y="322" text-anchor="middle" font-size="24" fill="var(--muted)">bottiglia?</text>
      </g>
      <g class="clf" transform="translate(700,430)">${assi('diametro →', 'altezza →')}
        ${puntiClf}
        <line class="conf" x1="40" y1="250" x2="500" y2="330" stroke="var(--fg)" stroke-width="4"/>
      </g>
      <g class="reg" transform="translate(1260,430)">${assi('superficie →', 'prezzo →')}
        ${puntiReg}
        <line class="retta" x1="40" y1="404" x2="490" y2="134" stroke="var(--accent)" stroke-width="5"/>
      </g>
      <text class="cap cap1" x="400" y="960" text-anchor="middle" font-size="28" fill="var(--muted)">il neurone</text>
      <text class="cap cap2" x="960" y="960" text-anchor="middle" font-size="28"><tspan font-weight="600">classificare</tspan><tspan fill="var(--muted)">: scegliere tra poche risposte</tspan></text>
      <text class="cap cap3" x="1520" y="960" text-anchor="middle" font-size="28"><tspan font-weight="600">prevedere</tspan><tspan fill="var(--muted)">: stimare un numero</tspan></text>
    </svg>
  `);

  F.passo({
    id: 'ricordo-neurone', scena: 'ricordo', titolo: 'Dove eravamo: il neurone',
    note: `<p>Richiamo veloce del modulo A: un neurone fa una somma pesata degli ingressi e decide. Imparare vuol dire spostare i pesi, esempio dopo esempio.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.r-tit')[0], { pos: '-=0.2' });
      entra(t, q('.neur .nn'), { da: 'scala', stagger: 0.12, pos: '-=0.3' });
      disegna(t, q('.neur .nl'), { dur: 0.7, pos: '-=0.4' });
      entra(t, q('.neur .nt'), { da: 'niente', dur: 0.5, stagger: 0.04, pos: '-=0.3' });
    },
  });

  F.passo({
    id: 'ricordo-classificare', scena: 'ricordo', titolo: 'Classificare',
    note: `<p>I piatti e le bottiglie della volta scorsa. Il classificatore sceglie tra poche risposte possibili: piatto o bottiglia, spam o no, malato o sano.</p>`,
    anima: (t, q) => {
      t.to(q('.neur'), { x: 140, y: 430, scale: 1, duration: 1.1, ease: 'power3.inOut' });
      entra(t, q('.cap1'), { da: 'niente', pos: '-=0.3' });
      disegna(t, q('.clf .assi line'), { dur: 0.6, pos: '-=0.5' });
      entra(t, q('.clf .assi text'), { da: 'niente', pos: '<' });
      entra(t, q('.clf .pt'), { da: 'scala', stagger: 0.03, dur: 0.4, pos: '-=0.2' });
      disegna(t, q('.clf .conf'), { dur: 0.9 });
      entra(t, q('.cap2'), { da: 'basso', pos: '-=0.4' });
    },
  });

  F.passo({
    id: 'ricordo-prevedere', scena: 'ricordo', titolo: 'Prevedere un numero',
    note: `<p>Il regressore invece stima un numero: quanto costa una casa, quanto durerà una batteria. Classificatori e regressori: è tutto quello che abbiamo visto. Tenetelo a mente per la domanda che sta per arrivare.</p>`,
    anima: (t, q) => {
      disegna(t, q('.reg .assi line'), { dur: 0.6 });
      entra(t, q('.reg .assi text'), { da: 'niente', pos: '<' });
      entra(t, q('.reg .pt'), { da: 'scala', stagger: 0.04, dur: 0.4, pos: '-=0.2' });
      disegna(t, q('.reg .retta'), { dur: 0.9 });
      entra(t, q('.cap3'), { da: 'basso', pos: '-=0.4' });
    },
  });

  // onda sonora disegnata (deterministica)
  const onda = (() => {
    let d = 'M0 120', s = 9;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let x = 0; x <= 252; x += 4) {
      const inv = Math.sin(x / 252 * Math.PI) * (0.4 + 0.6 * Math.abs(Math.sin(x / 19)));
      d += ` L${x} ${(120 - inv * (30 + r() * 70) * (x % 8 ? 1 : -1)).toFixed(1)}`;
    }
    return d;
  })();

  F.scena('domanda', `
    <div class="kicker at" style="left:140px;top:150px">La domanda di oggi</div>
    <h2 class="at d-tit" style="left:140px;top:200px;width:920px;font-size:78px">Come fa una macchina che sa solo <em>classificare</em> e <em>prevedere</em> a creare tutto questo?</h2>
    <p class="at lead d-lead" style="left:140px;top:720px;width:900px;font-size:36px">Volti, video, voci, testi: oggi le reti neurali producono tutto questo.</p>
    <div class="at d-card" style="left:1160px;top:150px"><img class="foto" src="img/gan-tpdne.jpg" width="300" height="300" alt="volto generato"><div class="didascalia" style="margin-top:12px">un volto</div></div>
    <div class="at d-card" style="left:1500px;top:150px">
      <div style="width:300px;height:300px;border-radius:14px;background:#1A1A1A;position:relative;overflow:hidden">
        <img src="img/gan-uomo.jpg" style="position:absolute;left:0;top:34px;width:300px;height:232px;object-fit:cover;opacity:.9" alt="">
        <div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#FBF8F3 0 14px,transparent 14px 34px) top/100% 14px no-repeat,repeating-linear-gradient(90deg,#FBF8F3 0 14px,transparent 14px 34px) bottom/100% 14px no-repeat;opacity:.85"></div>
        <div style="position:absolute;left:115px;top:115px;width:70px;height:70px;border-radius:50%;background:rgba(228,87,46,.92);color:#fff;font-size:30px;display:grid;place-items:center">▶</div>
      </div><div class="didascalia" style="margin-top:12px">un video</div></div>
    <div class="at d-card" style="left:1160px;top:540px">
      <div class="card" style="width:300px;height:300px;padding:24px;display:grid;place-items:center">
        <svg viewBox="0 0 252 240" width="252" height="240"><path d="${onda}" fill="none" stroke="var(--accent-2)" stroke-width="3.5" stroke-linejoin="round"/></svg>
      </div><div class="didascalia" style="margin-top:12px">una voce</div></div>
    <div class="at d-card" style="left:1500px;top:540px">
      <div class="card" style="width:300px;height:300px;font-family:var(--head);font-size:30px;line-height:1.3">C'era una volta un pezzo di legno. Non era un legno di lusso, ma un semplice pezzo da catasta…</div>
      <div class="didascalia" style="margin-top:12px">un testo</div></div>
  `);

  F.passo({
    id: 'domanda', scena: 'domanda', titolo: 'La domanda della giornata',
    note: `<p>La domanda su cui avevo insistito l'altra volta. Lasciatela in sospeso qualche secondo prima di andare avanti.</p><p>Il volto è generato (StyleGAN). Il testo è l'inizio di <i>Pinocchio</i>: ce lo ritroveremo.</p>`,
    anima: (t, q) => {
      entra(t, q('.d-card'), { da: 'scala', stagger: 0.15, dur: 0.9 });
      entra(t, q('.kicker'), { dur: 0.5, pos: '-=0.4' });
      parole(t, q('.d-tit')[0], { pos: '-=0.2', stagger: 0.06 });
      entra(t, q('.d-lead'), { pos: '+=0.3' });
    },
  });

  const PAROLE = ["C'era", 'una', 'volta', 'un', 'pezzo', 'di', 'legno…'];
  F.scena('risposta', `
    <div class="kicker at" style="left:140px;top:140px">La risposta, in una riga</div>
    <h2 class="at ri-tit" style="left:140px;top:190px;width:1640px">Generare vuol dire <em>prevedere</em>, tante volte di fila.</h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      ${PAROLE.map((w, k) => {
        const x = 140 + k * 246;
        return `<g class="anello a${k}">
          ${k ? `<line class="freccia" x1="${x - 46}" y1="545" x2="${x - 8}" y2="545" stroke="var(--muted)" stroke-width="4"/>` : ''}
          <rect class="scatola" x="${x}" y="470" width="200" height="150" rx="18" fill="var(--surface)"/>
          <circle cx="${x + 100}" cy="545" r="38" fill="var(--fg)"/>
          <text x="${x + 100}" y="560" text-anchor="middle" font-size="40" fill="#fff">Σ</text>
          <text class="parola-out" x="${x + 100}" y="712" text-anchor="middle" font-size="46" font-family="Fraunces, serif" font-weight="600">${w}</text>
        </g>`;
      }).join('')}
    </svg>
    <p class="at ri-caso" style="left:140px;top:820px;width:1600px;font-size:44px">…e ogni volta si sceglie <b class="acc">un po' a caso</b> tra le continuazioni più probabili.</p>
    <p class="at lead ri-nota" style="left:140px;top:910px;width:1600px;font-size:32px">Per le immagini, i suoni e i video l'idea è la stessa: cambia che cosa si prevede.</p>
  `, { x: F.scene.domanda.x, y: F.scene.domanda.y + 1200 });

  F.passo({
    id: 'risposta', scena: 'risposta', titolo: 'Generare = prevedere più volte',
    note: `<p>Lo stesso classificatore, usato in catena: prevede la prossima parola, la aggiunge, e riparte. Il caso serve a non scrivere sempre la stessa cosa.</p><p>Non spiegare ora come funziona per le immagini: è il prossimo blocco.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ri-tit')[0], { pos: '-=0.2' });
      PAROLE.forEach((_, k) => {
        const a = q('.a' + k)[0];
        entra(t, a.querySelectorAll('rect, circle, text:not(.parola-out)'), { da: 'scala', dur: 0.4, stagger: 0, pos: k ? '-=0.05' : '+=0.1' });
        if (k) disegna(t, a.querySelector('.freccia'), { dur: 0.25, pos: '<' });
        t.to(a.querySelector('.scatola'), { fill: C('--accent'), duration: 0.15 });
        entra(t, a.querySelector('.parola-out'), { da: 'alto', dur: 0.4 });
        t.to(a.querySelector('.scatola'), { fill: C('--surface'), duration: 0.3 }, '<');
      });
      entra(t, q('.ri-caso'), { pos: '+=0.2' });
      entra(t, q('.ri-nota'), { pos: '+=0.2' });
    },
  });

  const TAPPE = [
    ['9:20', 'Da prevedere a creare'], ['11:00', 'Il vero e il falso'], ['12:00', 'Una macchina che continua le frasi'],
    ['14:00', 'Da completatore ad assistente'], ['16:00', 'Chi controlla il modello'], ['16:35', 'Gli agenti'], ['17:40', 'La frontiera'],
  ];
  const tx = k => 220 + k * 247;
  F.scena('programma', `
    <div class="kicker at" style="left:140px;top:140px">Il programma</div>
    <h2 class="at p-tit" style="left:140px;top:190px;width:1640px">Sette tappe, <em>dalle immagini agli agenti</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <line class="p-linea" x1="160" y1="560" x2="1760" y2="560" stroke="var(--fg)" stroke-width="6"/>
      ${[[0, 'pausa'], [2, 'pranzo'], [3, 'pausa']].map(([k, w]) => `<text class="p-pausa" x="${tx(k) + 123}" y="600" text-anchor="middle" font-size="20" fill="var(--muted)" font-family="JetBrains Mono, monospace">${w}</text>`).join('')}
      ${TAPPE.map(([ora, tit], k) => `<g class="tappa">
        <text x="${tx(k)}" y="490" text-anchor="middle" font-size="22" fill="var(--muted)" font-family="JetBrains Mono, monospace">${ora}</text>
        <circle cx="${tx(k)}" cy="560" r="24" fill="var(--bg)" stroke="var(--fg)" stroke-width="6"/>
        <text x="${tx(k)}" y="568" text-anchor="middle" font-size="22" font-weight="600">${k + 1}</text>
      </g>`).join('')}
      <circle class="p-punto" cx="${tx(0)}" cy="560" r="15" fill="var(--accent)"/>
    </svg>
    ${TAPPE.map(([, tit], k) => `<div class="at p-nome" style="left:${tx(k) - 110}px;top:630px;width:220px;text-align:center;font-size:27px;line-height:1.25">${tit}</div>`).join('')}
  `);

  F.passo({
    id: 'programma', scena: 'programma', titolo: 'Programma',
    note: `<p>Prima immagini, video e voci; poi il vero e il falso; poi il testo, fino agli agenti, che sono il dolce alla fine. I riquadri con il bordo arancione sono le cose da tenere presenti: ce ne sono pochi, e sono importanti.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.p-tit')[0], { pos: '-=0.2' });
      disegna(t, q('.p-linea'), { dur: 1.2, ease: 'power2.out' });
      entra(t, q('.tappa'), { da: 'scala', stagger: 0.12, dur: 0.5, pos: '-=1' });
      entra(t, q('.p-nome'), { stagger: 0.12, dur: 0.6, pos: '<+0.1' });
      entra(t, q('.p-pausa'), { da: 'niente', pos: '-=0.3' });
      entra(t, q('.p-punto'), { da: 'scala', ease: 'back.out(2)' });
    },
  });
})();
