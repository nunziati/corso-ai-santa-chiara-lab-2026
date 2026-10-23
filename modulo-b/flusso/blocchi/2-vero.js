// Blocco 2 — Il vero e il falso: casi, l'onere della prova, riconoscere e certificare, le regole, l'AI-slop.
(() => {
  const { entra, esce, disegna, parole, rischio, avvisa } = F;

  F.blocco('2', 'Il vero e il falso');

  F.scena('b2', `
    <div class="at grande b2-n" style="left:140px;top:170px">2</div>
    <h1 class="at b2-tit" style="left:140px;top:430px;width:1500px">Il vero<br><em>e il falso</em></h1>
    <p class="at lead b2-lead" style="left:140px;top:760px;width:1400px">Deepfake, voci clonate, e come si prova che una cosa è vera.</p>
  `);

  F.passo({
    id: 'b2', scena: 'b2', titolo: 'Blocco 2 · Il vero e il falso',
    note: `<p>Tre casi veri, poi le contromisure: riconoscere il falso, certificare il vero, le regole.</p>`,
    anima: (t, q) => {
      entra(t, q('.b2-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b2-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b2-lead'), { pos: '-=0.2' });
    },
  });

  // ---------- tre casi ----------
  const faccia = (src, x, y, nome) => `<div style="position:absolute;left:${x}px;top:${y}px;width:228px;height:150px;border-radius:10px;overflow:hidden;background:#111">
      <img src="img/${src}.jpg" style="width:100%;height:100%;object-fit:cover;opacity:.92" alt="">
      <div style="position:absolute;left:8px;bottom:6px;font:600 14px var(--body);color:#fff;text-shadow:0 1px 2px #000">${nome}</div></div>`;
  F.scena('casi', `
    <div class="kicker at" style="left:140px;top:110px">Tre casi</div>
    <h2 class="at ca-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Non è fantascienza, <em>è cronaca</em></h2>

    <div class="at ca-p ca-p1" style="left:140px;top:300px;width:500px">
      <div style="position:relative;height:330px;border-radius:16px;background:#1A1A1A">
        ${faccia('gan-uomo', 14, 14, 'direttore finanziario')}${faccia('gan-donna', 258, 14, 'collega')}
        ${faccia('gan-ragazzo', 14, 172, 'collega')}${faccia('gan-tpdne', 258, 172, 'collega')}
        <div style="position:absolute;right:16px;top:-12px" class="timbro" >tutti falsi</div>
      </div>
      <div class="mono acc" style="font-size:20px;margin-top:18px">Hong Kong · gennaio 2024</div>
      <p style="font-size:26px;margin-top:6px">Un impiegato di Arup è in videochiamata con il direttore finanziario e alcuni colleghi. Sono tutti deepfake. Fa 15 bonifici: <b>circa 25 milioni di dollari</b>.</p>
    </div>

    <div class="at ca-p ca-p2" style="left:710px;top:300px;width:500px">
      <div style="position:relative;height:330px;border-radius:16px;background:var(--surface);overflow:hidden">
        <div style="position:absolute;left:30px;top:30px;font:600 22px var(--mono);color:var(--muted)">chiamata in arrivo</div>
        <div style="position:absolute;left:30px;top:66px;font:600 40px var(--head)">Ministero della Difesa</div>
        <svg viewBox="0 0 1200 300" style="position:absolute;left:30px;top:150px;width:440px;height:110px"><path d="${window.ONDA_PINOCCHIO}" fill="var(--accent-2)"/></svg>
        <div style="position:absolute;left:30px;bottom:24px;font:22px var(--body);color:var(--muted)">«Sono il ministro, ho bisogno del suo aiuto…»</div>
      </div>
      <div class="mono acc" style="font-size:20px;margin-top:18px">Italia · febbraio 2025</div>
      <p style="font-size:26px;margin-top:6px">Una voce identica a quella del ministro Crosetto chiama grandi imprenditori: servono soldi per liberare giornalisti rapiti. <b>Almeno uno paga.</b></p>
    </div>

    <div class="at ca-p ca-p3" style="left:1280px;top:300px;width:500px">
      <div style="position:relative;height:330px;border-radius:16px;background:var(--surface);overflow:hidden">
        <div style="position:absolute;left:24px;top:22px;width:452px;height:200px;border-radius:12px;background:linear-gradient(135deg,#cdbfad,#a89a8a);filter:blur(2px)"></div>
        <div style="position:absolute;left:24px;top:240px;right:24px;font:26px var(--body);background:var(--bg);border-radius:12px;padding:14px 18px"><b>@grok</b> mettila in bikini</div>
      </div>
      <div class="mono acc" style="font-size:20px;margin-top:18px">X · gennaio 2026</div>
      <p style="font-size:26px;margin-top:6px">Sotto la foto di una persona reale bastava un comando. Stima del CCDH: <b>circa 3 milioni</b> di immagini sessualizzate in 11 giorni, anche di minori.</p>
    </div>
  `);

  F.passo({
    id: 'caso-arup', scena: 'casi', titolo: 'Caso: Arup, Hong Kong',
    note: `<p>Arup è una grande società di ingegneria britannica. Il dipendente aveva sospetti per la mail, ma la videochiamata "con i colleghi" lo ha convinto. 200 milioni di dollari di Hong Kong in 15 bonifici (polizia di Hong Kong, febbraio 2024; Arup ha confermato a maggio).</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ca-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ca-p1'), { da: 'basso' });
    },
  });

  F.passo({
    id: 'caso-crosetto', scena: 'casi', titolo: 'Caso: la voce di Crosetto',
    note: `<p>Numeri con il prefisso del ministero, una voce clonata, una storia urgente. Tra i contattati Moratti, Armani, Tronchetti Provera, Della Valle; la procura di Milano ha aperto un'indagine. Moratti ha detto: "sembrava tutto vero".</p>`,
    anima: (t, q) => { entra(t, q('.ca-p2'), { da: 'basso' }); },
  });

  F.passo({
    id: 'caso-grok', scena: 'casi', titolo: 'Caso: Grok e le immagini sessualizzate',
    note: `<p>Fine dicembre 2025 – inizio gennaio 2026: una funzione di modifica delle immagini su X permetteva di "spogliare" persone reali. Stima del Center for Countering Digital Hate: circa 3 milioni di immagini in 11 giorni, circa 23.000 che sembrano ritrarre bambini. Indagini in California e in Europa.</p><p>In Italia dal 2025 è un reato (lo vediamo tra poco).</p>`,
    anima: (t, q) => { entra(t, q('.ca-p3'), { da: 'basso' }); },
  });

  // ---------- l'onere della prova ----------
  F.scena('prova', `
    <div class="kicker at" style="left:140px;top:150px">E quindi?</div>
    <div class="at pr-1" style="left:140px;top:250px;width:1640px;font-family:var(--head);font-size:76px;line-height:1.1">Vero, <span class="muted">finché non si dimostra che è falso.</span></div>
    <svg class="tela" viewBox="0 0 1920 1080"><line class="pr-barra" x1="130" y1="300" x2="1700" y2="300" stroke="var(--accent)" stroke-width="8"/></svg>
    <div class="at pr-2" style="left:140px;top:400px;width:1640px;font-family:var(--head);font-size:76px;line-height:1.1"><em style="color:var(--accent)">Falso</em>, <span class="muted">finché non si dimostra che è vero?</span></div>
    ${rischio({
      id: 'r-prova', x: 140, y: 640, w: 1100,
      titolo: 'Una prova di verità',
      testo: 'Oggi chiediamo a un contenuto di dimostrare che è falso. Domani forse partiremo dall\'idea che lo sia, e gli chiederemo una prova che è vero: chi l\'ha fatto, con che cosa, quando.',
    })}
  `);

  F.passo({
    id: 'prova', scena: 'prova', titolo: 'Vero finché non si prova il falso',
    note: `<p>Finora una foto, una voce, un video erano "veri fino a prova contraria".</p>`,
    anima: (t, q) => { entra(t, q('.kicker'), { dur: 0.5 }); parole(t, q('.pr-1')[0]); },
  });

  F.passo({
    id: 'prova-inversa', scena: 'prova', titolo: 'Riquadro: una prova di verità',
    note: `<p>È una possibilità, non una certezza: ma è la direzione in cui vanno banche, tribunali, redazioni. La prossima parte è proprio questo: come si prova che una cosa è vera.</p>`,
    anima: (t, q) => {
      disegna(t, q('.pr-barra'), { dur: 0.6, ease: 'power2.in' });
      parole(t, q('.pr-2')[0], { pos: '+=0.1' });
      avvisa(t, '#r-prova', { pos: '+=0.3' });
    },
  });

  // ---------- riconoscere il falso ----------
  F.scena('riconoscere', `
    <div class="kicker at" style="left:140px;top:110px">Riconoscere il falso</div>
    <h2 class="at ri2-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Un detector è <em>un classificatore</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <g class="ri2-det"><circle cx="420" cy="560" r="110" fill="var(--fg)"/><text x="420" y="584" text-anchor="middle" font-size="72" fill="#fff">Σ</text>
        <text x="420" y="720" text-anchor="middle" font-size="32" font-weight="600">il detector</text></g>
      <g class="ri2-fal"><rect x="1080" y="455" width="240" height="210" rx="20" fill="var(--surface)"/>
        <text x="1200" y="545" text-anchor="middle" font-size="36" font-family="Fraunces, serif" font-weight="600">il</text>
        <text x="1200" y="590" text-anchor="middle" font-size="36" font-family="Fraunces, serif" font-weight="600">falsario</text>
        <text x="1200" y="720" text-anchor="middle" font-size="32" font-weight="600">chi genera</text></g>
      <path class="ri2-a1" d="M520 470 C 700 330, 900 330, 1070 470" fill="none" stroke="var(--accent)" stroke-width="5"/>
      <polygon class="ri2-a1p" points="1062,452 1086,478 1054,482" fill="var(--accent)"/>
      <path class="ri2-a2" d="M1070 660 C 900 800, 700 800, 520 660" fill="none" stroke="var(--accent-2)" stroke-width="5"/>
      <polygon class="ri2-a2p" points="530,678 506,652 538,648" fill="var(--accent-2)"/>
      <text class="ri2-l1" x="795" y="345" text-anchor="middle" font-size="26" fill="var(--accent)">«qui si vede che è falso»</text>
      <text class="ri2-l2" x="795" y="808" text-anchor="middle" font-size="26" fill="var(--accent-2)">«allora correggo quel difetto»</text>
    </svg>
    <p class="at ri2-p" style="left:1400px;top:430px;width:400px;font-size:32px">È la gara del falsario e del detective: <b>ogni detector</b> può diventare l'allenatore di un falsario migliore.</p>
    <p class="at lead ri2-p2" style="left:140px;top:900px;width:1640px;font-size:32px">Nessun detector è affidabile al 100%, e più è usato più diventa un bersaglio.</p>
  `);

  F.passo({
    id: 'detector', scena: 'riconoscere', titolo: 'Detector: la corsa agli armamenti',
    note: `<p>Primo approccio: riconoscere il falso con un classificatore addestrato su esempi veri e generati. Funziona per un po', poi i generatori migliorano proprio sui difetti che il detector usava.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ri2-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ri2-det'), { da: 'scala', ease: 'back.out(1.5)' });
      entra(t, q('.ri2-fal'), { da: 'scala', ease: 'back.out(1.5)', pos: '-=0.4' });
      disegna(t, q('.ri2-a1'), { dur: 0.7 });
      entra(t, q('.ri2-a1p, .ri2-l1'), { da: 'niente', pos: '-=0.1' });
      disegna(t, q('.ri2-a2'), { dur: 0.7 });
      entra(t, q('.ri2-a2p, .ri2-l2'), { da: 'niente', pos: '-=0.1' });
      entra(t, q('.ri2-p'), { pos: '-=0.2' });
      entra(t, q('.ri2-p2'), { pos: '+=0.2' });
    },
  });

  F.scena('filigrana-img', `
    <div class="kicker at" style="left:140px;top:110px">Seconda strada</div>
    <h2 class="at fi-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Una firma <em>invisibile</em>, messa da chi genera</h2>
    <div class="at fi-box" style="left:150px;top:300px;width:600px;height:600px;border-radius:16px;overflow:hidden">
      <img src="img/astronauta.jpg" style="width:600px;height:600px;display:block" alt="">
      <div class="fi-trama" style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(228,87,46,.75) 0 3px,transparent 3px 11px),repeating-linear-gradient(-45deg,rgba(46,94,170,.6) 0 2px,transparent 2px 13px);clip-path:circle(0px at 150px 150px)"></div>
      <div class="fi-lente" style="position:absolute;left:60px;top:60px;width:180px;height:180px;border-radius:50%;border:6px solid var(--bg);box-shadow:0 0 0 3px var(--fg);opacity:0"></div>
    </div>
    <p class="at fi-p1" style="left:840px;top:320px;width:940px;font-size:34px"><b>SynthID</b> (Google, 2023): chi genera l'immagine nasconde un segnale nei pixel. A occhio non si vede; un programma con la chiave lo ritrova, anche dopo ritagli e compressione.</p>
    <p class="at fi-p2" style="left:840px;top:560px;width:940px;font-size:34px">Il limite: funziona solo se <b>chi genera collabora</b>. Un modello scaricato e usato in casa non mette nessuna firma.</p>
    <p class="at lead fi-p3" style="left:840px;top:760px;width:940px;font-size:28px">Lo stesso si può fare con i testi: lo vediamo nel pomeriggio, con una demo.</p>
  `);

  F.passo({
    id: 'filigrana-img', scena: 'filigrana-img', titolo: 'Filigrane invisibili',
    note: `<p>La trama arancione è solo un modo di disegnare l'idea: la firma vera è statistica, distribuita su tutta l'immagine. Dal 2025 Google offre un portale per verificarla (SynthID Detector).</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.fi-tit')[0], { pos: '-=0.2' });
      entra(t, q('.fi-box'), { da: 'scala' });
      t.to(q('.fi-lente'), { opacity: 1, duration: 0.3 });
      t.fromTo(q('.fi-trama'), { clipPath: 'circle(90px at 150px 150px)' }, { clipPath: 'circle(90px at 150px 150px)', duration: 0.01, immediateRender: false }, '<');
      t.to(q('.fi-lente'), { x: 300, y: 260, duration: 1.6, ease: 'sine.inOut' });
      t.to(q('.fi-trama'), { clipPath: 'circle(90px at 450px 410px)', duration: 1.6, ease: 'sine.inOut' }, '<');
      entra(t, q('.fi-p1'), { pos: '-=1.2' });
      entra(t, q('.fi-p2'), { pos: '+=0.2' });
      entra(t, q('.fi-p3'), { pos: '+=0.1' });
    },
  });

  // ---------- certificare il vero ----------
  const BADGE = [['scattata', 'la fotocamera firma file, ora e luogo'], ['ritagliata', 'il programma aggiunge la sua firma'], ['pubblicata', 'chi la riceve può controllare tutta la catena']];
  F.scena('certificare', `
    <div class="kicker at" style="left:140px;top:110px">L'approccio inverso</div>
    <h2 class="at ce-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Non scovare il falso: <em>certificare il vero</em></h2>
    <div class="at ce-foto" style="left:150px;top:300px;width:420px;height:420px">
      <img class="foto" src="img/vera-parmitano.jpg" style="width:420px;height:420px" alt="">
      <div class="ce-cr" style="position:absolute;right:14px;top:14px;width:64px;height:64px;border-radius:50%;background:var(--bg);display:grid;place-items:center;font:600 26px var(--mono);box-shadow:0 4px 12px rgba(0,0,0,.25)">cr</div>
    </div>
    ${BADGE.map(([n, d], k) => `<div class="at card ce-b" style="left:660px;top:${300 + k * 145}px;width:560px;padding:18px 26px">
      <div style="font:600 30px var(--head)"><span class="acc mono" style="font-size:22px">${k + 1}</span> &nbsp;${n}</div><div class="muted" style="font-size:24px">${d}</div></div>`).join('')}
    <p class="at ce-p" style="left:1290px;top:310px;width:490px;font-size:30px"><b>Content Credentials</b> (standard C2PA): la storia del file, firmata passo per passo. Ci sono già fotocamere che lo fanno (Leica dal 2023) e telefoni (Google Pixel 10, 2025).</p>
    <div class="at card ce-apple" style="left:150px;top:790px;width:1630px;font-size:30px"><b>Apple, settembre 2026</b> (iPhone 18 Pro): «Reference Image», una seconda copia firmata al momento dello scatto: <i>questo è ciò che ha visto il sensore</i>. Si attiva a mano, ed è un sistema di Apple, non lo standard C2PA.</div>
    <div class="at didascalia ce-cap" style="left:150px;top:734px">Foto: Luca Parmitano, ritratto ufficiale NASA, pubblico dominio</div>
  `);

  F.passo({
    id: 'c2pa', scena: 'certificare', titolo: 'Content Credentials',
    note: `<p>È la strada inversa, quella del riquadro di prima. La prova non è nell'immagine ma nella sua storia firmata. Il "cr" è il simbolo delle Content Credentials.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ce-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ce-foto'), { da: 'scala' });
      entra(t, q('.ce-cap'), { da: 'niente', pos: '<' });
      entra(t, q('.ce-cr'), { da: 'scala', ease: 'back.out(3)', dur: 0.4 });
      entra(t, q('.ce-b'), { da: 'destra', stagger: 0.25 });
      entra(t, q('.ce-p'), { pos: '-=0.2' });
    },
  });

  F.passo({
    id: 'apple', scena: 'certificare', titolo: 'Apple Reference Image',
    note: `<p>Annunciata a settembre 2026: tre settimane fa. Il limite di tutti questi sistemi: funzionano solo se diventa normale chiedere la prova.</p>`,
    anima: (t, q) => { entra(t, q('.ce-apple')); },
  });

  // ---------- le regole ----------
  F.scena('regole', `
    <div class="kicker at" style="left:140px;top:110px">Le regole</div>
    <h2 class="at re-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Cosa dice la legge, <em>oggi</em></h2>
    <div class="at card re-c1" style="left:150px;top:310px;width:790px;height:560px">
      <div class="mono acc" style="font-size:22px">Unione europea · AI Act, art. 50</div>
      <div style="font:600 42px var(--head);margin:10px 0 18px">In vigore dal 2 agosto 2026</div>
      <p style="font-size:29px;margin-bottom:14px">Chi diffonde un <b>deepfake</b> deve dichiarare che è generato o manipolato.</p>
      <p style="font-size:29px;margin-bottom:14px">Chi fornisce un generatore deve marcare i contenuti in modo leggibile da una macchina (per i sistemi già in commercio: entro il 2 dicembre 2026).</p>
      <p style="font-size:29px">Un chatbot deve dire che è un chatbot.</p>
    </div>
    <div class="at card re-c2" style="left:980px;top:310px;width:790px;height:560px">
      <div class="mono acc" style="font-size:22px">Italia · legge 132/2025</div>
      <div style="font:600 42px var(--head);margin:10px 0 18px">Art. 612-quater del codice penale</div>
      <p style="font-size:29px;margin-bottom:14px">Diffondere senza consenso immagini, video o voci generati o alterati con l'IA, capaci di ingannare sulla loro autenticità, se causano un danno ingiusto: <b>da 1 a 5 anni</b> di reclusione.</p>
      <p style="font-size:29px">In vigore dal 10 ottobre 2025.</p>
    </div>
  `);

  F.passo({
    id: 'regole', scena: 'regole', titolo: 'Le regole: AI Act e legge italiana',
    note: `<p>L'AI Act è stato rivisto dal "Digital Omnibus" (regolamento 2026/1744): alcune scadenze sui sistemi ad alto rischio slittano al 2027-2028, ma gli obblighi di trasparenza dell'art. 50 valgono dal 2 agosto 2026. La marcatura leggibile dalle macchine per i sistemi già in commercio ha tempo fino al 2 dicembre 2026.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.re-tit')[0], { pos: '-=0.2' });
      entra(t, q('.re-c1'), { da: 'sinistra' });
      entra(t, q('.re-c2'), { da: 'destra', pos: '+=0.3' });
    },
  });

  // ---------- AI-slop e model collapse ----------
  // Simulazione del collasso: ogni generazione stima media e varianza da 25 campioni della precedente.
  const gen = (() => {
    let s = 21;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const g = () => Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd());
    let mu = 0, sd = 1;
    const out = [[0, 0, 1]];
    for (let k = 1; k <= 60; k++) {
      const xs = Array.from({ length: 25 }, () => mu + sd * g());
      mu = xs.reduce((a, b) => a + b) / xs.length;
      sd = Math.sqrt(xs.reduce((a, b) => a + (b - mu) ** 2, 0) / xs.length);
      out.push([k, mu, sd]);
    }
    return out;
  })();
  const curva = (mu, sd) => {
    const pts = [];
    for (let x = -4; x <= 4.001; x += 0.05) {
      const y = Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
      pts.push(`${(700 + x * 140).toFixed(1)} ${(880 - Math.min(y, 2.6) * 200).toFixed(1)}`);
    }
    return 'M' + pts.join(' L');
  };
  const GEN = [0, 10, 30, 60];
  F.scena('slop', `
    <div class="kicker at" style="left:140px;top:110px">AI-slop</div>
    <h2 class="at sl-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Il web si riempie di <em>contenuti generati</em></h2>
    <div class="at card sl-c" style="left:150px;top:320px;width:520px;transform:rotate(-1.5deg)"><div class="mono acc" style="font-size:20px">Facebook · 2024</div><p style="font-size:28px;margin-top:8px">«Shrimp Jesus»: immagini assurde generate in serie per raccogliere like e follower.</p></div>
    <div class="at card sl-c" style="left:700px;top:340px;width:520px;transform:rotate(1deg)"><div class="mono acc" style="font-size:20px">Spotify · luglio 2025</div><p style="font-size:28px;margin-top:8px">The Velvet Sundown: oltre un milione di ascoltatori al mese. La band non esiste: è generata.</p></div>
    <div class="at card sl-c" style="left:1250px;top:320px;width:520px;transform:rotate(-0.8deg)"><div class="mono acc" style="font-size:20px">Web · 2025</div><p style="font-size:28px;margin-top:8px">Circa <b>metà</b> dei nuovi articoli in inglese sul web è generata (stima di Graphite, con i detector).</p></div>
    <p class="at lead sl-p" style="left:150px;top:640px;width:1620px;font-size:34px">«Slop»: brodaglia. Contenuto prodotto in massa, senza nessuno che lo voglia davvero.</p>
  `);

  F.passo({
    id: 'slop', scena: 'slop', titolo: 'AI-slop',
    note: `<p>Nel 2025 «slop» è stata scelta come parola dell'anno da più di un dizionario inglese. La stima di Graphite (2025) usa i detector, quindi è approssimata; ma l'ordine di grandezza è quello.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.sl-tit')[0], { pos: '-=0.2' });
      entra(t, q('.sl-c'), { da: 'scala', stagger: 0.3, ease: 'back.out(1.3)' });
      entra(t, q('.sl-p'), { pos: '+=0.2' });
    },
  });

  F.scena('collasso', `
    <div class="kicker at" style="left:140px;top:110px">E poi?</div>
    <h2 class="at mc-tit" style="left:140px;top:160px;width:1100px;font-size:72px">Un modello che impara <em>dai propri prodotti</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <line class="mc-asse" x1="120" y1="880" x2="1280" y2="880" stroke="var(--fg)" stroke-width="3"/>
      ${GEN.map((k, j) => `<path class="mc-c mc-c${j}" d="${curva(gen[k][1], gen[k][2])}" fill="none" stroke="${['var(--accent-2)', 'var(--muted)', 'var(--fg)', 'var(--accent)'][j]}" stroke-width="${j === 3 ? 6 : 4}"/>`).join('')}
      <text class="mc-code" x="250" y="840" font-size="24" fill="var(--accent-2)" text-anchor="middle">le code: i casi rari</text>
      <text class="mc-code" x="1150" y="840" font-size="24" fill="var(--accent-2)" text-anchor="middle">le code: i casi rari</text>
    </svg>
    ${GEN.map((k, j) => `<div class="at mono mc-l mc-l${j}" style="left:1340px;top:${360 + j * 46}px;font-size:22px;color:${['var(--accent-2)', 'var(--muted)', 'var(--fg)', 'var(--accent)'][j]}">— generazione ${k}</div>`).join('')}
    ${rischio({
      id: 'r-collasso', x: 1340, y: 600, w: 440,
      titolo: 'Model collapse',
      testo: 'Se i modelli futuri si allenano su contenuti generati, generazione dopo generazione perdono le code: le cose rare spariscono per prime.',
      fonte: 'Shumailov et al., Nature, 2024',
    })}
  `);

  F.passo({
    id: 'collasso', scena: 'collasso', titolo: 'Model collapse',
    note: `<p>Simulazione vera: ogni generazione impara media e varianza da 25 esempi prodotti dalla precedente. La curva si stringe e si sposta: si perdono i casi rari. Per i modelli veri lo hanno mostrato Shumailov e colleghi (Nature, 2024).</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.mc-tit')[0], { pos: '-=0.2' });
      disegna(t, q('.mc-asse'), { dur: 0.6 });
      for (let j = 0; j < GEN.length; j++) {
        disegna(t, q('.mc-c' + j), { dur: 1, pos: j ? '+=0.15' : '+=0' });
        entra(t, q('.mc-l' + j), { da: 'niente', pos: '<' });
        if (j === 0) entra(t, q('.mc-code'), { da: 'niente', pos: '<0.6' });
      }
    },
  });

  F.passo({
    id: 'r-collasso', scena: 'collasso', titolo: 'Riquadro: model collapse',
    note: `<p>Per questo i dati "scritti da umani prima del 2022" valgono sempre di più. E per questo chi addestra modelli cerca di riconoscere e scartare il generato.</p>`,
    anima: (t) => { avvisa(t, '#r-collasso'); },
  });
})();
