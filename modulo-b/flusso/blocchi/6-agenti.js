// Blocco 6 — Gli agenti: il percorso, quando sono diventati efficaci (METR), l'anatomia, il contesto,
// il cambio di paradigma, gli eval, la produttività, Claude Code dal vivo.
(() => {
  const { entra, esce, disegna, parole, scrivi, rischio, avvisa } = F;
  const qr = (nome, titolo, sotto, url, cls, x, y) => `<div class="at qr piccolo ${cls}" style="left:${x}px;top:${y}px"><img src="qr/${nome}.svg" alt="QR code">
    <div><div style="font-family:var(--head);font-weight:600;font-size:38px">${titolo}</div>
    <div style="font-size:26px;color:var(--muted);margin-top:4px">${sotto}</div><div class="url">${url}</div></div></div>`;

  F.blocco('6', 'Gli agenti');

  F.scena('b6', `
    <div class="at grande b6-n" style="left:140px;top:170px">6</div>
    <h1 class="at b6-tit" style="left:140px;top:430px;width:1600px">Gli <em>agenti</em></h1>
    <p class="at lead b6-lead" style="left:140px;top:640px;width:1500px">Lo stesso classificatore di token, a cui si permette di scrivere comandi che un programma esegue.</p>
    <div class="at card b6-disc" style="left:140px;top:800px;width:1500px;font-size:28px"><b>Avvertenza:</b> questo è lo stato delle cose oggi, 26 ottobre 2026. Tra sei mesi molti dettagli saranno cambiati.</div>
  `);

  F.passo({
    id: 'b6', scena: 'b6', titolo: 'Blocco 6 · Gli agenti',
    note: `<p>Il dolce alla fine. Tutto quello che abbiamo visto oggi serve qui: token, contesto, tool calling, RLVR.</p><p><b>Adesso:</b> fai partire Claude Code sul portatile della studentessa con la fase 1 (capire il modello e il compromesso). Ci torniamo alla fine del blocco.</p>`,
    anima: (t, q) => {
      entra(t, q('.b6-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b6-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b6-lead'), { pos: '-=0.2' });
      entra(t, q('.b6-disc'), { pos: '+=0.3' });
    },
  });

  // ---------- dai chatbot agli agenti, nella programmazione ----------
  const TAPPE = [
    ['giu 2021', 'GitHub Copilot', 'completa la riga che stai scrivendo (sul modello Codex di OpenAI)'],
    ['nov 2022', 'ChatGPT', 'copia-incolla tra la chat e l\'editor'],
    ['2023', 'Copilot Chat, Cursor', 'la chat dentro l\'editor, che vede il tuo file'],
    ['feb 2025', 'Claude Code', 'un agente nel terminale: legge il progetto, modifica i file, esegue i comandi'],
    ['apr–mag 2025', 'Codex CLI e Codex cloud', 'l\'agente lavora da solo, anche su una copia del progetto in cloud'],
    ['nov 2025', 'Antigravity (Google)', 'un editor costruito attorno a più agenti'],
  ];
  F.scena('percorso', `
    <div class="kicker at" style="left:140px;top:110px">Dai chatbot agli agenti</div>
    <h2 class="at pc-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Il caso della programmazione</h2>
    <svg class="tela" viewBox="0 0 1920 1080"><line class="pc-linea" x1="200" y1="320" x2="200" y2="980" stroke="var(--fg)" stroke-width="4"/>
      ${TAPPE.map((_, k) => `<circle class="pc-pt" cx="200" cy="${350 + k * 118}" r="13" fill="${k >= 3 ? 'var(--accent)' : 'var(--fg)'}"/>`).join('')}</svg>
    ${TAPPE.map(([d, n, s], k) => `<div class="at pc-t" style="left:240px;top:${322 + k * 118}px;width:1500px">
      <span class="mono acc" style="font-size:22px;display:inline-block;width:200px">${d}</span><span style="font:600 36px var(--head)">${n}</span>
      <div style="font-size:26px;color:var(--muted);margin-left:200px">${s}</div></div>`).join('')}
  `);

  F.passo({
    id: 'percorso', scena: 'percorso', titolo: 'Dai chatbot agli agenti',
    note: `<p>Prima il modello suggerisce, poi conversa, poi agisce. Il salto è nel 2025: il modello non scrive più codice da copiare, lo scrive nei file, lo prova, legge gli errori e corregge.</p><p>Curiosità: "Codex" nel 2021 era il nome del modello dietro il primo Copilot; nel 2025 OpenAI ha riusato il nome per il suo agente. Codex CLI è uscito ad aprile, la versione cloud a maggio.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.pc-tit')[0], { pos: '-=0.2' });
      disegna(t, q('.pc-linea'), { dur: 1.2, ease: 'none' });
      entra(t, q('.pc-pt'), { da: 'scala', stagger: 0.2, dur: 0.3, pos: '<' });
      entra(t, q('.pc-t'), { da: 'destra', stagger: 0.2, pos: '<' });
    },
  });

  // ---------- METR ----------
  // Durata dei compiti che un agente porta a termine con il 50% di successo (METR).
  // GPT-2, GPT-3 e GPT-4 sono letti dal grafico METR del 2025: valori approssimati.
  const METR = [['GPT-2', 2019.1, 0.04], ['GPT-3', 2020.4, 0.15], ['GPT-4', 2023.2, 5], ['o1', 2024.95, 39], ['Claude 3.7 Sonnet', 2025.15, 59],
    ['Claude Opus 4.5', 2025.9, 293], ['Claude Opus 4.6', 2026.1, 720], ['GPT-5.6 Sol', 2026.5, 678]];
  const mx = a => 260 + (a - 2019) / 8 * 1100, my = m => 900 - (Math.log10(m * 60) / Math.log10(86400)) * 560;
  const TICK = [[1 / 60, '1 s'], [10 / 60, '10 s'], [1, '1 min'], [10, '10 min'], [60, '1 ora'], [600, '10 ore']];
  const trend = a => 0.04 * Math.pow(59 / 0.04, (a - 2019.1) / (2025.15 - 2019.1));
  F.scena('metr', `
    <div class="kicker at" style="left:140px;top:110px">Quando sono diventati efficaci?</div>
    <h2 class="at me-tit" style="left:140px;top:160px;width:1640px;font-size:66px">Quanto è lungo un compito <em>che sanno finire da soli</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <g class="me-assi"><line x1="260" y1="900" x2="1380" y2="900" stroke="var(--fg)" stroke-width="3"/><line x1="260" y1="900" x2="260" y2="320" stroke="var(--fg)" stroke-width="3"/>
        ${TICK.map(([m, l]) => `<line x1="252" y1="${my(m)}" x2="1380" y2="${my(m)}" stroke="var(--line)" stroke-width="1.5"/><text x="240" y="${my(m) + 8}" text-anchor="end" font-size="22" fill="var(--muted)">${l}</text>`).join('')}
        ${[2019, 2021, 2023, 2025, 2027].map(a => `<text x="${mx(a)}" y="940" text-anchor="middle" font-size="22" fill="var(--muted)">${a}</text>`).join('')}</g>
      <line class="me-trend" x1="${mx(2019.1)}" y1="${my(trend(2019.1))}" x2="${mx(2026.6)}" y2="${my(trend(2026.6))}" stroke="var(--accent-2)" stroke-width="4" stroke-dasharray="1 0"/>
      ${METR.map(([n, a, m], k) => `<g class="me-p"><circle cx="${mx(a)}" cy="${my(m)}" r="11" fill="${a > 2025.5 ? 'var(--accent)' : 'var(--fg)'}"/>
        <text x="${mx(a) + ([0, 3, 7].includes(k) ? 16 : -16)}" y="${my(m) + ([3, 7].includes(k) ? 34 : -16)}" text-anchor="${[0, 3, 7].includes(k) ? 'start' : 'end'}" font-size="22">${n}</text></g>`).join('')}
    </svg>
    <div class="at me-l" style="left:1470px;top:340px;width:320px;font-size:28px"><b style="color:var(--accent-2)">raddoppia circa ogni 7 mesi</b> dal 2019; negli ultimi due anni ancora più in fretta.</div>
    <div class="at me-l2" style="left:1470px;top:560px;width:320px;font-size:28px">Inizio 2025: <b>un'ora</b>. Inizio 2026: <b>mezza giornata di lavoro</b>.</div>
    <div class="at didascalia me-cap" style="left:260px;top:975px">METR, «Measuring AI Ability to Complete Long Tasks» (2025) e misure successive · successo al 50% · scala logaritmica</div>
    <a class="at play me-live" href="disegna/" target="_blank" style="left:1470px;top:800px;text-decoration:none">▶ esperimento: lo disegna lui</a>
  `);

  F.passo({
    id: 'metr-esperimento', scena: 'metr', titolo: 'METR: esperimento del grafico dal vivo',
    note: `<p><b>Esperimento (5 minuti).</b> Il pulsante apre la pagina che ascolta e disegna. Racconta il grafico a voce: "nel 2019 GPT-2 riusciva a finire compiti da un paio di secondi; GPT-3, nel 2020, una decina di secondi; GPT-4, nel 2023, cinque minuti; o1, alla fine del 2024, una quarantina di minuti; Claude 3.7 Sonnet, a febbraio 2025, un'ora; Claude Opus 4.5, a novembre 2025, quasi cinque ore; Opus 4.6, a febbraio 2026, dodici ore". Poi torna qui: il passo dopo mostra il grafico preparato.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.me-tit')[0], { pos: '-=0.2' });
      entra(t, q('.me-assi'), { da: 'niente', dur: 0.6 });
      entra(t, q('.me-live'), { da: 'scala', ease: 'back.out(2)' });
    },
  });

  F.passo({
    id: 'metr', scena: 'metr', titolo: 'METR: il grafico',
    note: `<p>Il grafico preparato, per confronto. Attenzione ai limiti: "50%" vuole dire che metà delle volte fallisce; e oltre le 16 ore METR dice che le sue misure non sono affidabili. Claude Mythos Preview (anteprima, marzo 2026) arriva a circa 17 ore, fuori dalla scala misurabile.</p>`,
    anima: (t, q) => {
      esce(t, q('.me-live'), { dur: 0.3 });
      entra(t, q('.me-p'), { da: 'scala', stagger: 0.3, dur: 0.4, ease: 'back.out(2)' });
      disegna(t, q('.me-trend'), { dur: 1.2 });
      entra(t, q('.me-l'), { pos: '-=0.6' });
      entra(t, q('.me-l2'), { pos: '+=0.2' });
      entra(t, q('.me-cap'), { da: 'niente' });
    },
  });

  // ---------- anatomia: il loop ----------
  const ATTR = [['leggi file', 400, 740], ['scrivi file', 640, 820], ['terminale', 960, 850], ['cerca sul web', 1280, 820], ['browser, schermo', 1520, 740]];
  F.scena('loop', `
    <div class="kicker at" style="left:140px;top:110px">Anatomia di un agente</div>
    <h2 class="at lp-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Un modello <em>in un ciclo</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <g class="lp-mod"><circle cx="560" cy="500" r="110" fill="var(--fg)"/><text x="560" y="522" text-anchor="middle" font-size="64" fill="#fff">Σ</text>
        <text x="560" y="660" text-anchor="middle" font-size="30" font-weight="600">il modello</text><text x="560" y="696" text-anchor="middle" font-size="24" fill="var(--muted)">decide il prossimo passo</text></g>
      <g class="lp-har"><rect x="1180" y="400" width="320" height="200" rx="22" fill="var(--surface)"/><text x="1340" y="490" text-anchor="middle" font-size="36" font-weight="600" font-family="Fraunces, serif">l'harness</text>
        <text x="1340" y="530" text-anchor="middle" font-size="24" fill="var(--muted)">esegue davvero</text></g>
      <path class="lp-a1" d="M680 450 C 850 360, 1000 360, 1170 440" fill="none" stroke="var(--accent)" stroke-width="6"/>
      <text class="lp-l1" x="925" y="360" text-anchor="middle" font-size="26" fill="var(--accent)" font-family="JetBrains Mono, monospace">chiama uno strumento</text>
      <path class="lp-a2" d="M1170 560 C 1000 640, 850 640, 680 550" fill="none" stroke="var(--accent-2)" stroke-width="6"/>
      <text class="lp-l2" x="925" y="668" text-anchor="middle" font-size="26" fill="var(--accent-2)" font-family="JetBrains Mono, monospace">il risultato entra nel contesto</text>
      ${ATTR.map(([n, x, y]) => `<g class="lp-t"><rect x="${x - 110}" y="${y - 32}" width="220" height="64" rx="32" fill="var(--bg)" stroke="var(--line)" stroke-width="3"/><text x="${x}" y="${y + 9}" text-anchor="middle" font-size="24">${n}</text></g>`).join('')}
    </svg>
    <p class="at lp-p" style="left:150px;top:920px;width:1620px;font-size:28px">…e si ricomincia, finché il compito è finito. Claude Code, Codex, opencode, pi sono <b>harness</b>: il ciclo, gli strumenti, i permessi.</p>
  `);

  F.passo({
    id: 'loop', scena: 'loop', titolo: 'Il loop agentico',
    note: `<p>È il tool calling del pomeriggio, ripetuto in ciclo. Il modello sceglie; l'harness esegue (e chiede il permesso per le azioni rischiose); il risultato torna nel testo; il modello sceglie di nuovo.</p><p>Computer use e browser use (dall'ottobre 2024): lo strumento è lo schermo, il modello vede screenshot e decide dove cliccare.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.lp-tit')[0], { pos: '-=0.2' });
      entra(t, q('.lp-mod'), { da: 'scala', ease: 'back.out(1.5)' });
      entra(t, q('.lp-har'), { da: 'scala', ease: 'back.out(1.5)', pos: '-=0.3' });
      disegna(t, q('.lp-a1'), { dur: 0.6 });
      entra(t, q('.lp-l1'), { da: 'niente' });
      entra(t, q('.lp-t'), { da: 'scala', stagger: 0.12, dur: 0.4 });
      disegna(t, q('.lp-a2'), { dur: 0.6 });
      entra(t, q('.lp-l2'), { da: 'niente' });
      entra(t, q('.lp-p'), { pos: '+=0.2' });
    },
  });

  // ---------- il contesto ----------
  const PEZZI = [['prompt di sistema', 6, '#E8DFD2'], ['descrizioni degli strumenti', 9, '#D6E0F0'], ['skill (solo i titoli)', 3, '#D9EAD9'], ['istruzioni del progetto', 4, '#F6D5C9'],
    ['la conversazione', 14, '#EFE6D8'], ['file letti', 26, '#DCD3F0'], ['risultati dei comandi', 22, '#F2D8B8']];
  let acc = 0;
  const POS = PEZZI.map(([, w]) => { const x = acc; acc += w; return x; });
  F.scena('contesto', `
    <div class="kicker at" style="left:140px;top:110px">La finestra di contesto</div>
    <h2 class="at cx-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Tutto quello che il modello <em>ha davanti</em></h2>
    <div class="at cx-bar" style="left:150px;top:330px;width:1620px;height:120px;border-radius:16px;background:var(--surface);overflow:hidden;border:3px solid var(--fg)">
      ${PEZZI.map(([n, w, c], k) => `<div class="cx-seg" style="position:absolute;left:${POS[k]}%;top:0;bottom:0;width:${w}%;background:${c};border-right:2px solid var(--bg)"></div>`).join('')}</div>
    <div class="at cx-leg" style="left:150px;top:475px;width:1620px;display:flex;flex-wrap:wrap;gap:10px 26px">
      ${PEZZI.map(([n, , c]) => `<span class="cx-lab" style="display:inline-flex;align-items:center;gap:10px;font-size:23px"><i style="width:22px;height:22px;border-radius:5px;background:${c};border:1.5px solid var(--fg)"></i>${n}</span>`).join('')}</div>
    <div class="at cx-pieno" style="left:1500px;top:290px;font-family:var(--mono);font-size:22px;color:var(--accent)">quasi pieno →</div>
    <div class="at cx-c cx-c1 card" style="left:150px;top:620px;width:520px;font-size:26px"><b>Ogni turno rilegge tutto.</b> La chat intera, i file aperti, i risultati: per questo le conversazioni lunghe costano e «si confondono».</div>
    <div class="at cx-c cx-c2 card" style="left:700px;top:620px;width:520px;font-size:26px"><b>Quando è pieno</b>, l'harness riassume tutto e ricomincia dal riassunto: la <b>compattazione</b>. Qualcosa si perde.</div>
    <div class="at cx-c cx-c3 card" style="left:1250px;top:620px;width:520px;font-size:26px"><b>Skill</b>: istruzioni caricate solo quando servono. <b>MCP</b> (2024): una presa standard per collegare strumenti. <b>Plugin e connettori</b>: pacchetti di skill e strumenti, collegamenti a Gmail, Drive, GitHub…</div>
  `);

  F.passo({
    id: 'contesto', scena: 'contesto', titolo: 'La finestra di contesto',
    note: `<p>Le proporzioni sono indicative. Oggi le finestre vanno da circa 200.000 a oltre un milione di token. <b>Dal vivo:</b> in Claude Code, <code>/context</code> mostra la finestra vera, pezzo per pezzo.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.cx-tit')[0], { pos: '-=0.2' });
      entra(t, q('.cx-bar'), { da: 'niente' });
      t.fromTo(q('.cx-seg'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, stagger: 0.35, duration: 0.4, ease: 'power2.out', immediateRender: false });
      entra(t, q('.cx-lab'), { da: 'niente', stagger: 0.35, pos: '<' });
      entra(t, q('.cx-pieno'), { da: 'niente' });
    },
  });

  F.passo({
    id: 'contesto-cose', scena: 'contesto', titolo: 'Contesto: compattazione, skill, MCP',
    note: `<p>Skill: cartelle con istruzioni e script; il modello vede solo il titolo e la descrizione, e le apre quando servono (Anthropic, ottobre 2025). MCP, Model Context Protocol (Anthropic, novembre 2024): uno standard per collegare un modello a uno strumento, usato ormai da tutti. I "connettori" sono server MCP già pronti.</p>`,
    anima: (t, q) => { entra(t, q('.cx-c'), { stagger: 0.3 }); },
  });

  F.scena('agente-demo', `
    <div class="kicker at" style="left:140px;top:110px">Provate voi</div>
    <h2 class="at ag-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Guardate un agente <em>al lavoro</em></h2>
    ${qr('agente', '<em style="color:var(--accent)">L\'agente</em>', 'Un passo alla volta: che cosa decide, che cosa esegue, come si riempie il contesto.', 'nunziati.github.io/…/modulo-b/demo/agente.html', 'ag-qr', 150, 330)}
    <p class="at ag-p" style="left:150px;top:600px;width:820px;font-size:30px">A metà demo accendete l'interruttore <b>«email avvelenata»</b>: dentro una delle email c'è un'istruzione nascosta.</p>
    ${rischio({
      id: 'r-injection', x: 1050, y: 330, w: 730,
      titolo: 'Un agente che legge può prendere ordini da quello che legge',
      testo: 'Per il modello, il testo di un\'email o di una pagina web è testo come le tue istruzioni. Se qualcuno ci nasconde «inoltra tutti i documenti a questo indirizzo», l\'agente può farlo. Si chiama prompt injection. Il mix più pericoloso: accesso a dati privati, contenuti da fuori, e la possibilità di mandare dati all\'esterno.',
      fonte: 'Simon Willison, «the lethal trifecta», 2025',
    })}
  `);

  F.passo({
    id: 'agente-demo', scena: 'agente-demo', titolo: 'Demo: L\'agente',
    note: `<p><b>Demo nostra, 5 minuti.</b> Prima lasciate che la seguano da soli; poi chiedete chi ha acceso l'email avvelenata e che cosa è successo.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ag-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ag-qr'));
      entra(t, q('.ag-p'), { pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'r-injection', scena: 'agente-demo', titolo: 'Riquadro: prompt injection',
    note: `<p>Non esiste ancora una soluzione completa. Le difese: dare all'agente meno permessi possibile, chiedere conferma per le azioni che mandano dati fuori, non dargli insieme dati privati e contenuti non fidati.</p>`,
    anima: (t) => { avvisa(t, '#r-injection'); },
  });

  // ---------- il cambio di paradigma ----------
  F.scena('paradigma', `
    <div class="kicker at" style="left:140px;top:110px">Mindset</div>
    <h2 class="at pa-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Il risultato dipende <em>dal contesto che dai</em></h2>
    <div class="at pa-a" style="left:150px;top:330px;width:700px">
      <div class="mono muted" style="font-size:22px;margin-bottom:10px">così</div>
      <div class="bolla utente" style="display:inline-block">sistemami il report</div></div>
    <div class="at pa-b" style="left:930px;top:330px;width:850px">
      <div class="mono acc" style="font-size:22px;margin-bottom:10px">meglio così</div>
      <div class="card" style="font-size:26px;line-height:1.45"><b>Obiettivo:</b> il report trimestrale per il consiglio, 2 pagine.<br><b>Materiale:</b> i dati sono in vendite.xlsx; il report dell'anno scorso è in report-2025.pdf, segui quello stile.<br><b>Vincoli:</b> niente numeri senza fonte; tono sobrio.<br><b>Verifica:</b> alla fine controlla che i totali tornino con il foglio.</div></div>
    <p class="at pa-p" style="left:150px;top:780px;width:1620px;font-size:34px">Chi usa bene un agente lavora come chi <b>delega a un collega bravo ma appena arrivato</b>: spiega il perché, dà i materiali, dice come controllare. Poi controlla.</p>
  `);

  F.passo({
    id: 'paradigma', scena: 'paradigma', titolo: 'Il cambio di paradigma',
    note: `<p>È il "mindset digitale" del titolo del modulo: la competenza non è più scrivere tutto, è dare il contesto giusto e verificare il risultato.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.pa-tit')[0], { pos: '-=0.2' });
      entra(t, q('.pa-a'), { da: 'sinistra' });
      entra(t, q('.pa-b'), { da: 'destra', pos: '+=0.4' });
      entra(t, q('.pa-p'), { pos: '+=0.3' });
    },
  });

  // ---------- eval ----------
  F.scena('eval', `
    <div class="kicker at" style="left:140px;top:110px">Prima di automatizzare</div>
    <h2 class="at ev-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Come sai <em>che funziona?</em></h2>
    <div class="at card ev-c" style="left:150px;top:320px;width:520px;height:440px">
      <div style="font:600 38px var(--head)">Misure automatiche</div>
      <p style="font-size:26px;margin-top:12px">Risposta esatta, test che passano o no, numeri che tornano. Veloci e oggettive.</p>
      <p style="font-size:26px;margin-top:12px;color:var(--muted)">Ma solo per quello che si può misurare.</p></div>
    <div class="at card ev-c" style="left:700px;top:320px;width:520px;height:440px">
      <div style="font:600 38px var(--head)">Persone</div>
      <p style="font-size:26px;margin-top:12px">Un esperto giudica, con una griglia scritta prima. Il riferimento più affidabile.</p>
      <p style="font-size:26px;margin-top:12px;color:var(--muted)">Ma lento e costoso: si fa su un campione.</p></div>
    <div class="at card ev-c" style="left:1250px;top:320px;width:520px;height:440px">
      <div style="font:600 38px var(--head)">Un LLM come giudice</div>
      <p style="font-size:26px;margin-top:12px">Un altro modello legge e dà un voto con la stessa griglia. Veloce, scala.</p>
      <p style="font-size:26px;margin-top:12px;color:var(--muted)">Ma ha i suoi difetti: preferisce la risposta che legge per prima, quella più lunga, e la propria.</p></div>
    <p class="at ev-p" style="left:150px;top:810px;width:1620px;font-size:32px">Un buon eval è <b>il test set del modulo A</b>: esempi veri, tenuti da parte, con la risposta giusta. Ed è anche il verificatore dell'RLVR, usato come voto.</p>
  `);

  F.passo({
    id: 'eval', scena: 'eval', titolo: 'Eval',
    note: `<p>Se in azienda si vuole automatizzare un flusso (smistare email, estrarre dati da fatture, rispondere ai clienti), il primo lavoro è costruire un insieme di casi veri con la risposta giusta, e misurare. Senza eval, ogni modifica è un'impressione.</p><p>I difetti del giudice LLM: Zheng e colleghi, "Judging LLM-as-a-Judge", 2023.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ev-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ev-c'), { stagger: 0.3 });
      entra(t, q('.ev-p'), { pos: '+=0.3' });
    },
  });

  // ---------- produttività e frontiera frastagliata ----------
  const zig = 'M200 760 L330 520 L400 640 L520 380 L600 560 L700 420 L760 700 L880 470 L950 600 L1080 360';
  const DENTRO = [[300, 690], [450, 600], [560, 470], [640, 620], [820, 610], [990, 560], [700, 520]], FUORI = [[400, 520], [760, 560], [880, 400], [350, 440]];
  F.scena('frontiera', `
    <div class="kicker at" style="left:140px;top:110px">La frontiera frastagliata</div>
    <h2 class="at fr-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Bravissimi, <em>ma non dappertutto</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <rect x="150" y="320" width="980" height="520" rx="24" fill="var(--surface)" class="fr-sp"/>
      <path class="fr-z" d="${zig}" fill="none" stroke="var(--fg)" stroke-width="5"/>
      ${DENTRO.map(([x, y]) => `<circle class="fr-d" cx="${x}" cy="${y}" r="13" fill="var(--ok)"/>`).join('')}
      ${FUORI.map(([x, y]) => `<circle class="fr-f" cx="${x}" cy="${y}" r="13" fill="var(--accent)"/>`).join('')}
      <text class="fr-l" x="1100" y="810" text-anchor="end" font-size="24" fill="var(--ok)">sotto la linea: compiti che sa fare</text>
      <text class="fr-l" x="180" y="360" font-size="24" fill="var(--accent)">sopra: compiti che sembrano simili, ma sbaglia</text>
    </svg>
    <p class="at fr-p" style="left:1200px;top:320px;width:580px;font-size:26px">758 consulenti di BCG, con e senza GPT-4 (2023). Sui compiti <b>dentro</b> la frontiera: il 12% di compiti in più, il 25% più veloci, qualità più alta del 40%. Su un compito <b>fuori</b>: 19 punti percentuali di risposte giuste in meno.</p>
    ${rischio({
      id: 'r-produttivita', x: 1200, y: 610, w: 580,
      titolo: 'Sentirsi più veloci non vuol dire esserlo',
      testo: '16 programmatori esperti, 246 compiti veri (METR, 2025): con l\'IA ci hanno messo il 19% in più. Eppure, finito, credevano di aver guadagnato il 20%.',
      fonte: 'Dell\'Acqua e colleghi, 2023 · METR, 2025',
    })}
  `);

  F.passo({
    id: 'frontiera', scena: 'frontiera', titolo: 'La frontiera frastagliata',
    note: `<p>Dell'Acqua, Mollick e colleghi (Harvard e BCG, 2023): la "jagged frontier". Il confine tra quello che il modello sa fare e quello che non sa fare non è liscio, e non coincide con quello che a noi sembra facile o difficile. Il rischio: fidarsi anche fuori dal confine.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.fr-tit')[0], { pos: '-=0.2' });
      entra(t, q('.fr-sp'), { da: 'niente' });
      disegna(t, q('.fr-z'), { dur: 1.4, ease: 'none' });
      entra(t, q('.fr-d'), { da: 'scala', stagger: 0.08, dur: 0.3 });
      entra(t, q('.fr-f'), { da: 'scala', stagger: 0.1, dur: 0.3 });
      entra(t, q('.fr-l'), { da: 'niente' });
      entra(t, q('.fr-p'), { pos: '-=0.2' });
    },
  });

  F.passo({
    id: 'r-produttivita', scena: 'frontiera', titolo: 'Riquadro: produttività',
    note: `<p>Lo studio METR è piccolo e su un caso particolare (programmatori esperti nei loro progetti, con strumenti di inizio 2025). Il punto non è "l'IA rallenta", è che la nostra sensazione non è una misura: torniamo agli eval.</p>`,
    anima: (t) => { avvisa(t, '#r-produttivita'); },
  });

  // ---------- Claude Code dal vivo ----------
  F.scena('studentessa', `
    <div class="kicker at" style="left:140px;top:110px">Dal vivo</div>
    <h2 class="at st-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Un problema vero, <em>con Claude Code</em></h2>
    <p class="at st-p" style="left:150px;top:310px;width:1620px;font-size:32px">Un modello di ottimizzazione (MILP) per far collaborare dei produttori nelle consegne: <b>meno chilometri</b> o <b>più equità</b> tra i partner? E perché è così lento già con pochi nodi?</p>
    ${[['1', 'Capire e bilanciare', 'Spiegare il modello, trovare perché il compromesso non si vede, proporre modi di bilanciare i due obiettivi.'],
      ['2', 'Le domande', 'Tutto quello che viene in mente: per esempio, CPLEX è deterministico? Tra due soluzioni ugualmente ottime, quale sceglie?'],
      ['3', 'Più veloce', '<code>/goal</code> con una condizione verificabile: «stesso ottimo di prima, su tre istanze, in meno di N secondi».']].map(([n, tt, d], k) =>
      `<div class="at card st-c" style="left:${150 + k * 550}px;top:470px;width:520px;height:330px"><div class="mono acc" style="font-size:24px">${n}</div><div style="font:600 36px var(--head);margin:6px 0 12px">${tt}</div><div style="font-size:26px">${d}</div></div>`).join('')}
    <p class="at lead st-l" style="left:150px;top:850px;width:1620px;font-size:28px">Lo lanciamo all'inizio del blocco e intanto parliamo: un agente lavora per minuti, da solo. Poi si controlla.</p>
  `);

  F.passo({
    id: 'studentessa', scena: 'studentessa', titolo: 'Claude Code dal vivo',
    note: `<p><b>Dal vivo, sul portatile della studentessa</b> (il suo Claude Code, il suo CPLEX). Lanciare la fase 1 all'inizio del blocco 6, tornarci qui. Indizi se serve: con 2 produttori il "fronte di Pareto" è un punto solo; gMIN stampato coincide con epsilon perché è vincolato solo dall'alto; le corse t sono intercambiabili (simmetria).</p><p>La condizione di /goal è un eval: ricollegalo alla scena di prima.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.st-tit')[0], { pos: '-=0.2' });
      entra(t, q('.st-p'));
      entra(t, q('.st-c'), { stagger: 0.25, pos: '+=0.2' });
      entra(t, q('.st-l'), { pos: '+=0.2' });
    },
  });
})();
