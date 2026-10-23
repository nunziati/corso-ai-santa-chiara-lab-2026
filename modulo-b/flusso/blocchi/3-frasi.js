// Blocco 3 — Una macchina che continua le frasi: contare, autoregressione, token, embedding, attenzione, scala.
(() => {
  const { entra, esce, disegna, parole, scrivi, rivela } = F;
  const qr = (nome, titolo, sotto, url, cls, x, y) => `<div class="at qr piccolo ${cls}" style="left:${x}px;top:${y}px"><img src="qr/${nome}.svg" alt="QR code">
    <div><div style="font-family:var(--head);font-weight:600;font-size:38px">${titolo}</div>
    <div style="font-size:26px;color:var(--muted);margin-top:4px">${sotto}</div><div class="url">${url}</div></div></div>`;

  F.blocco('3', 'Una macchina che continua le frasi');

  F.scena('b3', `
    <div class="at grande b3-n" style="left:140px;top:170px">3</div>
    <h1 class="at b3-tit" style="left:140px;top:430px;width:1600px">Una macchina che<br><em>continua le frasi</em></h1>
    <p class="at lead b3-lead" style="left:140px;top:760px;width:1400px">Dal contare le parole al transformer.</p>
  `);

  F.passo({
    id: 'b3', scena: 'b3', titolo: 'Blocco 3 · Una macchina che continua le frasi',
    note: `<p>Ora il testo. Ripartiamo dalla catena dell'apertura: prevedere la parola successiva, tante volte.</p>`,
    anima: (t, q) => {
      entra(t, q('.b3-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b3-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b3-lead'), { pos: '-=0.2' });
    },
  });

  // ---------- contare ----------
  const BRANO = "A questa terza bugia, il naso gli si allungò in un modo così straordinario, che il povero Pinocchio non poteva più girarsi da nessuna parte. Se si voltava di qui, batteva il naso nel letto o nei vetri della finestra, se si voltava di là, lo batteva nelle pareti o nella porta di camera, se alzava un po' di più il capo, correva il rischio di ficcarlo in un occhio alla Fata.";
  const branoHtml = BRANO.replace(/\bil (\S+?)([,.]?) /g, '<span class="co-il">il</span> <span class="co-dopo">$1</span>$2 ');
  const DOPO_IL = [['burattino', 12.0], ['suo', 4.8], ['povero', 4.3], ['mio', 3.9], ['quale', 3.6], ['gatto', 3.1], ['capo', 1.9], ['naso', 1.8]];
  F.scena('contare', `
    <div class="kicker at" style="left:140px;top:110px">Il modello più semplice</div>
    <h2 class="at cn-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Contare <em>che cosa viene dopo</em></h2>
    <div class="at card cn-brano" style="left:150px;top:310px;width:820px;font-family:var(--head);font-size:31px;line-height:1.5">${branoHtml}
      <div class="didascalia" style="margin-top:14px">Collodi, <i>Le avventure di Pinocchio</i>, cap. XVII</div></div>
    <div class="at cn-graf" style="left:1060px;top:310px;width:720px">
      <div style="font-size:28px;margin-bottom:18px">Dopo «<b class="acc">il</b>», in tutto il libro <span class="muted">(926 volte)</span></div>
      ${DOPO_IL.map(([w, p]) => `<div style="display:flex;align-items:center;gap:16px;margin:9px 0">
        <div style="width:150px;text-align:right;font-family:var(--head);font-size:30px">${w}</div>
        <div style="flex:1;height:30px;position:relative"><div class="cn-barra" style="position:absolute;inset:0 auto 0 0;width:${p * 34}px;background:var(--accent);border-radius:4px;transform-origin:0 50%"></div></div>
        <div class="mono" style="width:80px;font-size:22px">${p.toFixed(1).replace('.', ',')}%</div></div>`).join('')}
      <div class="muted" style="font-size:24px;margin-top:12px">…e altre centinaia di parole, più rare.</div>
    </div>
    <p class="at lead cn-p" style="left:150px;top:930px;width:1620px;font-size:32px">Per continuare una frase, basta pescare la parola successiva con queste probabilità.</p>
  `);

  F.passo({
    id: 'contare', scena: 'contare', titolo: 'Contare che cosa viene dopo',
    note: `<p>Il modello di linguaggio più semplice: leggo tutto Pinocchio (circa 40.000 parole) e conto che cosa viene dopo ogni parola.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.cn-tit')[0], { pos: '-=0.2' });
      entra(t, q('.cn-brano'));
      t.fromTo(q('.co-il'), { backgroundColor: 'rgba(228,87,46,0)', color: 'var(--fg)' }, { backgroundColor: 'rgba(228,87,46,1)', color: '#fff', stagger: 0.2, duration: 0.25, immediateRender: false });
      t.fromTo(q('.co-dopo'), { boxShadow: 'inset 0 -0px 0 var(--accent-2)' }, { boxShadow: 'inset 0 -6px 0 var(--accent-2)', stagger: 0.2, duration: 0.25, immediateRender: false }, '<0.1');
    },
  });

  F.passo({
    id: 'contare-barre', scena: 'contare', titolo: 'Le probabilità della parola dopo',
    note: `<p>Numeri veri, contati sul testo di Pinocchio (Project Gutenberg). Dopo "il", una volta su otto viene "burattino".</p>`,
    anima: (t, q) => {
      entra(t, q('.cn-graf'), { da: 'niente', dur: 0.4 });
      t.fromTo(q('.cn-barra'), { scaleX: 0 }, { scaleX: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', immediateRender: false }, '<');
      entra(t, q('.cn-p'), { pos: '-=0.2' });
    },
  });

  // ---------- autoregressione ----------
  const FRASE = ['Il', 'burattino', 'si', 'mise', 'a', 'correre', 'per', 'la', 'strada'];
  const fx = k => 150 + FRASE.slice(0, k).reduce((a, w) => a + w.length * 25 + 60, 0);
  F.scena('autoregressivo', `
    <div class="kicker at" style="left:140px;top:110px">Autoregressivo</div>
    <h2 class="at ar-tit" style="left:140px;top:160px;width:1640px;font-size:72px">La parola scelta <em>rientra</em>, e si ricomincia</h2>
    ${FRASE.map((w, k) => `<div class="at ar-w ar-w${k}" style="left:${fx(k)}px;top:420px;font-family:var(--head);font-size:52px;padding:6px 14px;border-radius:10px;background:${k < 2 ? 'var(--surface)' : 'transparent'}">${w}</div>`).join('')}
    <div class="at ar-fin" style="left:${fx(0) - 8}px;top:404px;width:${fx(2) - fx(0) + 4}px;height:104px;border:5px solid var(--accent);border-radius:16px"></div>
    <div class="at ar-fin-l mono acc" style="left:${fx(0)}px;top:360px;font-size:22px">quello che il modello guarda</div>
    <div class="at ar-llm" style="left:${fx(0) - 8}px;top:404px;width:${fx(9) - fx(0) + 4}px;height:104px;border:5px solid var(--accent-2);border-radius:16px"></div>
    <p class="at ar-p1" style="left:150px;top:620px;width:1620px;font-size:36px">Un modello a n-grammi guarda solo <b>le ultime due o tre parole</b>: per questo dopo poche righe perde il filo.</p>
    <p class="at ar-p2" style="left:150px;top:760px;width:1620px;font-size:36px">Un LLM fa lo stesso gioco, ma guarda <b style="color:var(--accent-2)">tutto il testo</b> che ha davanti: oggi anche centinaia di pagine.</p>
    ${qr('completatore', 'Provate voi: <em style="color:var(--accent)">Il completatore</em>', 'Un modello a n-grammi addestrato su Pinocchio, nel vostro telefono.', 'nunziati.github.io/…/modulo-b/demo/completatore.html', 'ar-qr', 150, 880)}
  `);

  F.passo({
    id: 'autoregressivo', scena: 'autoregressivo', titolo: 'Autoregressivo',
    note: `<p>Ogni parola generata viene aggiunta al testo, e il modello riparte. La cornice arancione è la "finestra": un modello a trigrammi guarda le ultime due parole.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ar-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ar-w0, .ar-w1'), { da: 'scala', stagger: 0.1 });
      entra(t, q('.ar-fin, .ar-fin-l'), { da: 'niente' });
      for (let k = 2; k < FRASE.length; k++) {
        entra(t, q('.ar-w' + k), { da: 'alto', dur: 0.35, pos: '+=0.15' });
        t.to(q('.ar-fin'), { x: fx(k - 1) - fx(0), width: fx(k + 1) - fx(k - 1) + 4, duration: 0.35, ease: 'power2.inOut' }, '>-0.05');
        t.to(q('.ar-fin-l'), { x: fx(k - 1) - fx(0), duration: 0.35, ease: 'power2.inOut' }, '<');
      }
      entra(t, q('.ar-p1'), { pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'tutto-il-testo', scena: 'autoregressivo', titolo: 'Un LLM guarda tutto il testo',
    note: `<p>Questa è la differenza decisiva. Il "come" lo vediamo tra poco: l'attenzione. Prima, la demo.</p><p><b>Demo:</b> Il completatore. Fategli cambiare la lunghezza della finestra: con 1 parola esce un minestrone, con 4 copia il libro parola per parola.</p>`,
    anima: (t, q) => {
      entra(t, q('.ar-llm'), { da: 'niente', dur: 0.6 });
      entra(t, q('.ar-p2'), { pos: '-=0.2' });
      entra(t, q('.ar-qr'), { pos: '+=0.3' });
    },
  });

  // ---------- token ----------
  const TOK_IT = 'T|utti| gli| ess|eri| um|ani| nas|cono| lib|eri| ed| eg|uali| in| dign|ità| e| dir|itti|.| Ess|i| sono| dot|ati| di| rag|ione| e| di| cos|c|ienza| e| devono| ag|ire| gli| uni| verso| gli| altri| in| spir|ito| di| frat|ell|anza|.'.split('|');
  const TOK_EN = 'All| human| beings| are| born| free| and| equal| in| dignity| and| rights|.| They| are| endowed| with| reason| and| conscience| and| should| act| towards| one| another| in| a| spirit| of| brother|hood|.'.split('|');
  const chips = (toks, cls) => toks.map((s, k) => `<span class="tok ${cls}" style="background:${['#F6D5C9', '#D6E0F0', '#E8E1D4', '#D9EAD9'][k % 4]}">${s.replace(/ /g, '&nbsp;')}</span>`).join('');
  F.scena('token', `
    <div class="kicker at" style="left:140px;top:110px">Token</div>
    <h2 class="at tk-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Non parole, <em>pezzi di parola</em></h2>
    <div class="at tk-r tk-rit" style="left:150px;top:300px;width:1620px">
      <div class="mono acc" style="font-size:22px;margin-bottom:10px">italiano · Dichiarazione universale dei diritti umani, art. 1</div>
      <div class="tk-righe">${chips(TOK_IT, 'tk-it')}</div>
      <div class="tk-conto" style="font-size:30px;margin-top:12px"><b>51 token</b> <span class="muted">per 32 parole</span></div></div>
    <div class="at tk-r tk-ren" style="left:150px;top:620px;width:1620px">
      <div class="mono acc" style="font-size:22px;margin-bottom:10px">inglese · stesso articolo</div>
      <div class="tk-righe">${chips(TOK_EN, 'tk-en')}</div>
      <div class="tk-conto" style="font-size:30px;margin-top:12px"><b>33 token</b> <span class="muted">per 30 parole</span></div></div>
    <div class="at tk-diff" style="left:150px;top:875px;width:1620px;font-size:32px">In italiano lo stesso testo usa <b class="acc">il 55% di token in più</b>: costa di più, e riempie prima la memoria del modello.</div>
    <div class="at didascalia tk-cap" style="left:150px;top:1000px">Tokenizer o200k_base (OpenAI), conteggi veri</div>
  `);

  F.passo({
    id: 'token', scena: 'token', titolo: 'Token: l\'italiano',
    note: `<p>Il modello non vede lettere né parole: vede token, pezzi di parola presi da un vocabolario di circa 200.000 pezzi. Le parole comuni sono un token solo, le altre vengono spezzate.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.tk-tit')[0], { pos: '-=0.2' });
      entra(t, q('.tk-rit .mono'), { da: 'niente' });
      entra(t, q('.tk-it'), { da: 'scala', dur: 0.25, stagger: 0.035 });
      entra(t, q('.tk-rit .tk-conto'), { da: 'niente' });
    },
  });

  F.passo({
    id: 'token-en', scena: 'token', titolo: 'Token: l\'inglese, e quanto costa l\'italiano',
    note: `<p>Il vocabolario dei token è costruito soprattutto su testi inglesi: le parole inglesi restano intere, quelle italiane si spezzano. Si paga a token, e la finestra di contesto si misura in token.</p><p><b>Demo esterna:</b> Tiktokenizer (QR nel passo successivo, se c'è tempo).</p>`,
    anima: (t, q) => {
      entra(t, q('.tk-ren .mono'), { da: 'niente' });
      entra(t, q('.tk-en'), { da: 'scala', dur: 0.25, stagger: 0.035 });
      entra(t, q('.tk-ren .tk-conto'), { da: 'niente' });
      entra(t, q('.tk-diff'), { pos: '+=0.2' });
      entra(t, q('.tk-cap'), { da: 'niente' });
    },
  });

  // ---------- embedding ----------
  const EMB = { uomo: [-0.338, -0.491], donna: [0.395, -0.467], re: [-0.122, 0.548], regina: [0.307, 0.372], principe: [-0.101, 0.341], principessa: [0.316, 0.266], ragazzo: [-0.137, -0.512], ragazza: [0.388, -0.483], padre: [-0.123, -0.196], madre: [0.268, -0.218] };
  const ex = x => 230 + (x + 0.45) * 1000, ey = y => 880 - (y + 0.6) * 480;
  const BIAS = [['elettricista', -0.111], ['pilota', -0.103], ['manager', -0.06], ['camionista', -0.019], ['insegnante', 0.07], ['stilista', 0.096], ['estetista', 0.166], ['babysitter', 0.171], ['badante', 0.218]];
  const freccia = (a, b, cls, col) => {
    const [x1, y1, x2, y2] = [ex(EMB[a][0]), ey(EMB[a][1]), ex(EMB[b][0]), ey(EMB[b][1])];
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const sx = x1 + ux * 16, sy = y1 + uy * 16, tx = x2 - ux * 20, ty = y2 - uy * 20;
    return `<line class="${cls}" x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" stroke="${col}" stroke-width="5"/>
      <polygon class="${cls}-p" points="${tx + ux * 14},${ty + uy * 14} ${tx - uy * 9},${ty + ux * 9} ${tx + uy * 9},${ty - ux * 9}" fill="${col}"/>`;
  };
  F.scena('embedding', `
    <div class="kicker at" style="left:140px;top:110px">Embedding</div>
    <h2 class="at em-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Ogni token diventa <em>un punto</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <rect class="em-fondo" x="150" y="300" width="1050" height="680" rx="24" fill="var(--surface)"/>
      ${freccia('uomo', 'donna', 'em-a1', 'var(--accent)')}${freccia('re', 'regina', 'em-a2', 'var(--accent)')}${freccia('ragazzo', 'ragazza', 'em-a3', 'var(--accent)')}
      ${freccia('uomo', 're', 'em-b1', 'var(--accent-2)')}${freccia('donna', 'regina', 'em-b2', 'var(--accent-2)')}
      ${Object.entries(EMB).map(([w, [x, y]]) => `<g class="em-p"><circle cx="${ex(x)}" cy="${ey(y)}" r="11" fill="var(--fg)"/>
        <text x="${ex(x) + (x > 0 ? 20 : -20)}" y="${ey(y) + 9 + (w === 'ragazza' ? 30 : w === 'donna' ? -14 : 0)}" text-anchor="${x > 0 ? 'start' : 'end'}" font-size="28" font-family="Fraunces, serif">${w}</text></g>`).join('')}
    </svg>
    <div class="at didascalia em-cap" style="left:160px;top:990px">vettori fastText veri (300 numeri per parola), proiettati su due direzioni</div>
    <p class="at em-p1" style="left:1270px;top:320px;width:510px;font-size:31px">Ogni parola è una lista di numeri. Le parole usate negli stessi contesti finiscono <b>vicine</b>.</p>
    <p class="at em-p2" style="left:1270px;top:520px;width:510px;font-size:31px">E le <b>direzioni</b> hanno un significato: da maschile a femminile (arancio), da persona comune a sovrano (blu).</p>
    <div class="at card em-form" style="left:1270px;top:760px;width:510px;font-family:var(--mono);font-size:30px;text-align:center">re − uomo + donna ≈ <b class="acc">regina</b></div>
  `);

  F.passo({
    id: 'embedding', scena: 'embedding', titolo: 'Embedding: parole come punti',
    note: `<p>Ogni token ha il suo vettore, imparato durante l'addestramento. Qui uso i vettori fastText italiani (Facebook, addestrati su Common Crawl), 300 numeri per parola.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.em-tit')[0], { pos: '-=0.2' });
      entra(t, q('.em-fondo'), { da: 'niente', dur: 0.5 });
      entra(t, q('.em-p'), { da: 'scala', stagger: 0.06, dur: 0.4 });
      entra(t, q('.em-cap'), { da: 'niente' });
      entra(t, q('.em-p1'), { pos: '-=0.3' });
    },
  });

  F.passo({
    id: 'analogia', scena: 'embedding', titolo: 'Embedding: le direzioni',
    note: `<p>Il calcolo è fatto davvero sui 300 numeri: prendo il vettore di "re", tolgo "uomo", aggiungo "donna", e cerco la parola più vicina. Esce "regina". Con "Parigi − Francia + Germania" esce "Berlino".</p>`,
    anima: (t, q) => {
      ['em-a1', 'em-a2', 'em-a3'].forEach((c, k) => { disegna(t, q('.' + c), { dur: 0.5, pos: k ? '-=0.2' : '+=0' }); entra(t, q(`.${c}-p`), { da: 'niente', dur: 0.2 }); });
      ['em-b1', 'em-b2'].forEach(c => { disegna(t, q('.' + c), { dur: 0.5 }); entra(t, q(`.${c}-p`), { da: 'niente', dur: 0.2 }); });
      entra(t, q('.em-p2'), { pos: '-=0.6' });
      entra(t, q('.em-form'), { da: 'scala', ease: 'back.out(1.6)' });
    },
  });

  F.scena('emb-bias', `
    <div class="kicker at" style="left:140px;top:110px">Le direzioni che non vorremmo</div>
    <h2 class="at eb-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Stessa parola per lei e per lui, <em>eppure</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <line class="eb-asse" x1="960" y1="300" x2="960" y2="830" stroke="var(--fg)" stroke-width="3"/>
      ${BIAS.map(([w, v], k) => `<g class="eb-r"><text x="${v < 0 ? 960 - 22 + v * 2200 : 960 + 22 + v * 2200}" y="${352 + k * 54}" text-anchor="${v < 0 ? 'end' : 'start'}" font-size="30" font-family="Fraunces, serif">${w}</text>
        <rect class="eb-b" x="${v < 0 ? 960 + v * 2200 : 960}" y="${330 + k * 54}" width="${Math.abs(v) * 2200}" height="30" rx="4" fill="${v < 0 ? 'var(--accent-2)' : 'var(--accent)'}"/></g>`).join('')}
      <text class="eb-l" x="930" y="880" text-anchor="end" font-size="26" fill="var(--accent-2)">← più vicine a «lui», «uomo»</text>
      <text class="eb-l" x="990" y="880" font-size="26" fill="var(--accent)">più vicine a «lei», «donna» →</text>
    </svg>
    <p class="at lead eb-p" style="left:150px;top:940px;width:1620px;font-size:30px">Nessuno l'ha programmato: è nei testi da cui ha imparato. È il bias del modulo A, dentro le parole.</p>
    ${qr('parole', '<em style="color:var(--accent)">Mappa delle parole</em>', 'Esplorate gli embedding italiani: vicini, analogie, direzioni.', 'nunziati.github.io/…/modulo-b/demo/parole.html', 'eb-qr', 1300, 300)}
  `);

  F.passo({
    id: 'emb-bias', scena: 'emb-bias', titolo: 'Embedding: il bias',
    note: `<p>In italiano molte professioni hanno due forme (maestro, maestra): qui uso solo parole che hanno la stessa forma al maschile e al femminile. Lunghezza della barra: quanto la parola sta dalla parte di "lei, donna" o di "lui, uomo" (vettori fastText veri).</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.eb-tit')[0], { pos: '-=0.2' });
      disegna(t, q('.eb-asse'), { dur: 0.5 });
      entra(t, q('.eb-r text'), { da: 'niente', stagger: 0.06 });
      t.fromTo(q('.eb-b'), { scaleX: 0, transformOrigin: (k, e) => (+e.getAttribute('x') < 960 ? '100% 50%' : '0% 50%') }, { scaleX: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', immediateRender: false }, '<');
      entra(t, q('.eb-l'), { da: 'niente' });
      entra(t, q('.eb-p'), { pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'demo-parole', scena: 'emb-bias', titolo: 'Demo: Mappa delle parole',
    note: `<p><b>Demo nostra.</b> Cinque minuti: cercate la vostra città, provate un'analogia, guardate dove finiscono le professioni.</p>`,
    anima: (t, q) => {
      t.to(q('.eb-r, .eb-asse, .eb-l'), { x: -380, duration: 0.8, ease: 'power2.inOut' });
      entra(t, q('.eb-qr'), { da: 'destra', pos: '-=0.3' });
    },
  });

  // ---------- attenzione ----------
  // Pesi d'attenzione disegnati a mano per spiegare l'idea; quelli veri si vedono in Transformer Explainer.
  const S1 = ['Ho', 'mangiato', 'una', 'pesca', 'matura'], W1 = [0.15, 0.9, 0.25, 0, 0.8];
  const S2 = ['Domenica', 'vado', 'a', 'pesca', 'con', 'il', 'nonno'], W2 = [0.3, 0.85, 0.5, 0, 0.1, 0.05, 0.25];
  const sx = (S, k) => 150 + S.slice(0, k).reduce((a, w) => a + w.length * 24 + 50, 0) + S[k].length * 12;
  const archi = (S, W, y, cls) => S.map((w, k) => k === 3 || W[k] < 0.05 ? '' : `<path class="${cls}" d="M${sx(S, 3)} ${y} Q ${(sx(S, 3) + sx(S, k)) / 2} ${y - 50 - Math.abs(k - 3) * 30} ${sx(S, k)} ${y}" fill="none" stroke="var(--accent)" stroke-width="${2 + W[k] * 12}" stroke-linecap="round" opacity="${0.35 + W[k] * 0.6}"/>`).join('');
  const FRUTTA = [['albicocca', 1450, 420], ['prugna', 1600, 395], ['ciliegia', 1470, 505]];
  const PESCA = [['pescatore', 1450, 760], ['trota', 1680, 780], ['canna', 1480, 865]];
  F.scena('attenzione', `
    <div class="kicker at" style="left:140px;top:110px">Attenzione</div>
    <h2 class="at at-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Ogni parola <em>guarda le altre</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      ${archi(S1, W1, 545, 'at-a1')}${archi(S2, W2, 825, 'at-a2')}
      <rect x="1380" y="330" width="420" height="600" rx="24" fill="var(--surface)" class="at-mappa"/>
      ${[...FRUTTA, ...PESCA].map(([w, x, y]) => `<g class="at-mp"><circle cx="${x}" cy="${y}" r="9" fill="var(--muted)"/><text x="${x + 16}" y="${y + 8}" font-size="24" fill="var(--muted)" font-family="Fraunces, serif">${w}</text></g>`).join('')}
      <g class="at-punto"><circle cx="1470" cy="640" r="14" fill="var(--accent)"/><text x="1490" y="648" font-size="28" font-weight="600" fill="var(--accent)">pesca</text></g>
    </svg>
    ${S1.map((w, k) => `<div class="at at-s1" style="left:${sx(S1, k) - w.length * 12 - 6}px;top:555px;font-family:var(--head);font-size:42px;${k === 3 ? 'color:var(--accent);font-weight:600' : ''}">${w}</div>`).join('')}
    ${S2.map((w, k) => `<div class="at at-s2" style="left:${sx(S2, k) - w.length * 12 - 6}px;top:835px;font-family:var(--head);font-size:42px;${k === 3 ? 'color:var(--accent);font-weight:600' : ''}">${w}</div>`).join('')}
    <p class="at lead at-nota" style="left:150px;top:300px;width:1180px;font-size:28px">Nell'embedding da solo, «pesca» è un punto unico per due significati (i suoi vicini veri: pescare, pescatore, trota…).</p>
    <div class="at didascalia at-cap" style="left:150px;top:960px">Spessore delle frecce: schema per spiegare l'idea, non pesi misurati</div>
  `);

  F.passo({
    id: 'attenzione-1', scena: 'attenzione', titolo: 'Attenzione: la pesca da mangiare',
    note: `<p>Il problema degli embedding: "pesca" ha un vettore solo. I vicini veri di "pesca" in fastText sono tutti di pesca sportiva: il frutto sparisce.</p><p>L'attenzione: ogni parola guarda le altre parole della frase e decide quanto contano per lei. "Pesca" guarda "mangiato" e "matura", e il suo punto si sposta verso la frutta.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.at-tit')[0], { pos: '-=0.2' });
      entra(t, q('.at-nota'));
      entra(t, q('.at-mappa, .at-mp'), { da: 'niente', stagger: 0.05 });
      entra(t, q('.at-punto'), { da: 'scala', ease: 'back.out(2)' });
      entra(t, q('.at-s1'), { stagger: 0.08, pos: '+=0.2' });
      disegna(t, q('.at-a1'), { dur: 0.7, stagger: 0.1 });
      t.to(q('.at-punto'), { x: 90, y: -180, duration: 1, ease: 'power2.inOut' });
    },
  });

  F.passo({
    id: 'attenzione-2', scena: 'attenzione', titolo: 'Attenzione: la pesca col nonno',
    note: `<p>Stessa parola, frase diversa: ora "pesca" guarda "vado" e "a", e il suo punto va verso la pesca sportiva. Il significato di una parola lo decide il contesto.</p>`,
    anima: (t, q) => {
      entra(t, q('.at-s2'), { stagger: 0.08 });
      disegna(t, q('.at-a2'), { dur: 0.7, stagger: 0.1 });
      t.to(q('.at-punto'), { x: 60, y: 175, duration: 1.2, ease: 'power2.inOut' });
      entra(t, q('.at-cap'), { da: 'niente' });
    },
  });

  F.scena('transformer', `
    <div class="kicker at" style="left:140px;top:110px">Il transformer</div>
    <h2 class="at tr-tit" style="left:140px;top:160px;width:1640px;font-size:72px">«Attention is all you need» <span class="muted" style="font-size:44px">· Google, 2017</span></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      ${[0, 1, 2, 3, 4, 5].map(k => `<g class="tr-strato"><rect x="200" y="${820 - k * 88}" width="640" height="70" rx="12" fill="${k % 2 ? 'var(--surface)' : '#E8DFD2'}"/>
        <text x="520" y="${864 - k * 88}" text-anchor="middle" font-size="26">${k % 2 ? 'elaborazione' : 'attenzione'}</text></g>`).join('')}
      <text class="tr-su" x="520" y="340" text-anchor="middle" font-size="26" fill="var(--accent)" font-family="JetBrains Mono, monospace">↑ probabilità del token successivo</text>
      <text class="tr-giu" x="520" y="950" text-anchor="middle" font-size="26" fill="var(--muted)" font-family="JetBrains Mono, monospace">token → embedding</text>
    </svg>
    <p class="at tr-p1" style="left:960px;top:330px;width:820px;font-size:34px">Tanti strati di attenzione uno sopra l'altro. In cima, un classificatore sceglie <b>il prossimo token</b> tra 200.000: è il classificatore del modulo A, con 200.000 classi.</p>
    <p class="at tr-p2" style="left:960px;top:560px;width:820px;font-size:34px">I modelli grandi hanno decine di strati e centinaia di miliardi di pesi.</p>
    ${qr('transformer', '<em style="color:var(--accent)">Transformer Explainer</em>', 'Un GPT-2 vero che gira nel browser: guardate l\'attenzione.', 'poloclub.github.io/transformer-explainer', 'tr-qr', 960, 780)}
  `);

  F.passo({
    id: 'transformer', scena: 'transformer', titolo: 'Il transformer',
    note: `<p>Il transformer è l'architettura di quasi tutti i modelli di oggi, anche di molti generatori di immagini e video. Il nome viene dall'articolo di Google del 2017.</p><p><b>Demo esterna:</b> Transformer Explainer (stessi autori di CNN Explainer del modulo A). Meglio da PC; da telefono si vede, ma è piccolo.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.tr-tit')[0], { pos: '-=0.2' });
      entra(t, q('.tr-giu'), { da: 'niente' });
      entra(t, q('.tr-strato'), { da: 'basso', stagger: 0.12, dur: 0.4 });
      entra(t, q('.tr-su'), { da: 'niente' });
      entra(t, q('.tr-p1'), { pos: '-=0.4' });
      entra(t, q('.tr-p2'), { pos: '+=0.2' });
      entra(t, q('.tr-qr'), { pos: '+=0.2' });
    },
  });

  // ---------- la scala ----------
  const GPT = [['GPT-1', '2018', 0.117, '117 milioni'], ['GPT-2', '2019', 1.5, '1,5 miliardi'], ['GPT-3', '2020', 175, '175 miliardi']];
  const lh = v => 80 + (Math.log10(v) + 1) * 150;
  F.scena('scala', `
    <div class="kicker at" style="left:140px;top:110px">La scala</div>
    <h2 class="at sc-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Più grande, più dati: <em>cose nuove</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <line x1="150" y1="900" x2="860" y2="900" stroke="var(--fg)" stroke-width="3" class="sc-asse"/>
      ${GPT.map(([n, a, v, l], k) => `<g class="sc-g"><rect class="sc-b" x="${200 + k * 230}" y="${900 - lh(v)}" width="150" height="${lh(v)}" rx="8" fill="${k === 2 ? 'var(--accent)' : 'var(--fg)'}"/>
        <text x="${275 + k * 230}" y="${880 - lh(v)}" text-anchor="middle" font-size="26" font-weight="600">${l}</text>
        <text x="${275 + k * 230}" y="940" text-anchor="middle" font-size="28" font-family="Fraunces, serif" font-weight="600">${n}</text>
        <text x="${275 + k * 230}" y="975" text-anchor="middle" font-size="22" fill="var(--muted)" font-family="JetBrains Mono, monospace">${a}</text></g>`).join('')}
    </svg>
    <div class="at didascalia sc-cap" style="left:150px;top:1000px">pesi del modello, scala logaritmica</div>
    <div class="at card sc-prompt" style="left:980px;top:320px;width:800px;font-family:var(--mono);font-size:36px;line-height:1.6">
      <div class="muted" style="font-size:22px">il testo da continuare</div>
      mare → sea<br>gatto → cat<br>formaggio → <span class="sc-out acc" style="font-weight:600">cheese</span></div>
    <p class="at sc-p" style="left:980px;top:700px;width:800px;font-size:32px">Nessuno gli ha insegnato a tradurre: lo capisce <b>dagli esempi scritti nel testo</b>. «Language Models are Few-Shot Learners», 2020.</p>
  `);

  F.passo({
    id: 'scala', scena: 'scala', titolo: 'La scala: GPT-1, 2, 3',
    note: `<p>In due anni i modelli diventano mille volte più grandi. E con GPT-3 compare una cosa che nessuno aveva programmato: impara un compito dagli esempi che gli scrivi.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.sc-tit')[0], { pos: '-=0.2' });
      disegna(t, q('.sc-asse'), { dur: 0.5 });
      t.fromTo(q('.sc-b'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, stagger: 0.35, duration: 0.7, ease: 'power3.out', immediateRender: false });
      entra(t, q('.sc-g text'), { da: 'niente', stagger: 0.05, pos: '<' });
      entra(t, q('.sc-cap'), { da: 'niente' });
    },
  });

  F.passo({
    id: 'few-shot', scena: 'scala', titolo: 'Few-shot: imparare dagli esempi nel testo',
    note: `<p>È l'esempio dell'articolo di GPT-3 (là era inglese → francese). È la prima volta che "scrivere bene la richiesta" diventa un modo di programmare.</p>`,
    anima: (t, q) => {
      entra(t, q('.sc-prompt'), { da: 'basso' });
      t.set(q('.sc-out'), { autoAlpha: 0 }, 0);
      t.to(q('.sc-out'), { autoAlpha: 1, duration: 0.3 }, '+=0.6');
      entra(t, q('.sc-p'), { pos: '+=0.2' });
    },
  });
})();
