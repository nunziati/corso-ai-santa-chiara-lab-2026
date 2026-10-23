// Blocco 5 — Chi controlla il modello: allineamento e guardrail, privacy, open weight, inferenza locale, steering, LoRA.
(() => {
  const { entra, esce, disegna, parole, scrivi, rischio, avvisa } = F;
  const C = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const qr = (nome, titolo, sotto, url, cls, x, y) => `<div class="at qr piccolo ${cls}" style="left:${x}px;top:${y}px"><img src="qr/${nome}.svg" alt="QR code">
    <div><div style="font-family:var(--head);font-weight:600;font-size:38px">${titolo}</div>
    <div style="font-size:26px;color:var(--muted);margin-top:4px">${sotto}</div><div class="url">${url}</div></div></div>`;

  F.blocco('5', 'Chi controlla il modello');

  F.scena('b5', `
    <div class="at grande b5-n" style="left:140px;top:170px">5</div>
    <h1 class="at b5-tit" style="left:140px;top:430px;width:1600px">Chi controlla<br><em>il modello</em></h1>
    <p class="at lead b5-lead" style="left:140px;top:760px;width:1400px">Valori, guardrail, dati, e cosa cambia se il modello ce l'hai in casa.</p>
  `);

  F.passo({
    id: 'b5', scena: 'b5', titolo: 'Blocco 5 · Chi controlla il modello',
    note: `<p>Ultimo blocco prima degli agenti. Chi decide come si comporta un modello? E chi vede i nostri dati?</p>`,
    anima: (t, q) => {
      entra(t, q('.b5-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b5-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b5-lead'), { pos: '-=0.2' });
    },
  });

  // ---------- i guardrail: il formaggio svizzero ----------
  const STRATI = [
    ['dati', 'si toglie dal pretraining quello che non si vuole insegnare'],
    ['post-training', 'esempi e premi per rifiutare, e principi scritti (una «costituzione»)'],
    ['prompt di sistema', 'istruzioni nascoste all\'inizio di ogni conversazione'],
    ['classificatori', 'altri modelli controllano domanda e risposta, a modello congelato'],
  ];
  const BUCHI = [[[300, 60], [620, 40]], [[180, 50], [470, 70]], [[380, 60], [640, 45]], [[250, 55], [520, 60]]];
  F.scena('guardrail', `
    <div class="kicker at" style="left:140px;top:110px">Allineamento e guardrail</div>
    <h2 class="at gr-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Strati di protezione, <em>tutti con dei buchi</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      ${STRATI.map((s, k) => `<g class="gr-s gr-s${k}"><rect x="${150 + k * 40}" y="${330 + k * 145}" width="800" height="110" rx="14" fill="${['#F2D8B8', '#EFCFA9', '#EBC59A', '#E6BB8B'][k]}"/>
        ${BUCHI[k].map(([x, r]) => `<ellipse cx="${150 + k * 40 + x}" cy="${385 + k * 145}" rx="${r}" ry="${r * 0.55}" fill="var(--bg)"/>`).join('')}
        <text x="${170 + k * 40}" y="${365 + k * 145}" font-size="26" font-weight="600">${s[0]}</text></g>`).join('')}
      <path class="gr-fr2" d="M560 290 L 450 385 L 360 520 L 660 670 L 670 825 L 960 905" fill="none" stroke="var(--accent)" stroke-width="6"/>
      <circle class="gr-x" cx="960" cy="905" r="18" fill="var(--accent)"/>
    </svg>
    ${STRATI.map((s, k) => `<div class="at gr-d gr-d${k}" style="left:1010px;top:${352 + k * 145}px;width:770px;font-size:27px">${s[1]}</div>`).join('')}
    <p class="at gr-p" style="left:1010px;top:890px;width:770px;font-size:26px">Una richiesta pericolosa che trova i buchi giusti passa: <b>nessuno strato è esatto al 100%</b>. E ogni strato rifiuta anche cose innocue.</p>
  `);

  F.passo({
    id: 'guardrail', scena: 'guardrail', titolo: 'Guardrail: gli strati',
    note: `<p>Allineamento: far fare al modello quello che vogliamo, secondo valori che qualcuno sceglie. I guardrail stanno a più livelli: nei dati, nell'addestramento, nelle istruzioni, e fuori dal modello (classificatori come Llama Guard o i "constitutional classifiers").</p><p>È il modello del formaggio svizzero della sicurezza: ogni fetta ha buchi, se ne mettono tante.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.gr-tit')[0], { pos: '-=0.2' });
      for (let k = 0; k < 4; k++) {
        entra(t, q('.gr-s' + k), { da: 'sinistra', dur: 0.5, pos: k ? '-=0.2' : '+=0' });
        entra(t, q('.gr-d' + k), { da: 'niente', dur: 0.4, pos: '<0.1' });
      }
    },
  });

  F.passo({
    id: 'guardrail-buchi', scena: 'guardrail', titolo: 'Guardrail: i buchi',
    note: `<p>La freccia arancione è un "jailbreak": una richiesta costruita per passare tutti i buchi. Dall'altra parte c'è l'eccesso di zelo: modelli che rifiutano domande di medicina o di storia del tutto legittime.</p><p><b>Demo esterna:</b> Gandalf (QR nel passo dopo).</p>`,
    anima: (t, q) => {
      disegna(t, q('.gr-fr2'), { dur: 1.8, ease: 'power1.inOut' });
      entra(t, q('.gr-x'), { da: 'scala', ease: 'back.out(3)', dur: 0.4 });
      entra(t, q('.gr-p'), { pos: '-=0.2' });
    },
  });

  F.scena('gandalf', `
    <div class="kicker at" style="left:140px;top:110px">Provate voi</div>
    <h2 class="at ga-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Fate dire a Gandalf <em>la password</em></h2>
    <p class="at ga-p" style="left:150px;top:330px;width:900px;font-size:34px">Un modello custodisce una password e ha l'ordine di non rivelarla. A ogni livello i guardrail diventano più forti. Fino a che livello arrivate?</p>
    ${qr('gandalf', '<em style="color:var(--accent)">Gandalf</em> · Lakera', 'Dal telefono, senza account.', 'gandalf.lakera.ai', 'ga-qr', 150, 560)}
    <div class="at card ga-t" style="left:1150px;top:330px;width:620px;font-size:28px"><b>Trucchi che funzionano</b> (almeno ai primi livelli): chiedere di scriverla al contrario, una lettera per riga, in una poesia, «per un test di sicurezza autorizzato»…</div>
  `);

  F.passo({
    id: 'gandalf', scena: 'gandalf', titolo: 'Demo: Gandalf',
    note: `<p><b>Demo esterna, 10 minuti.</b> Chiedete alla fine chi è arrivato più in alto e con quale trucco. Il punto: i guardrail scritti in linguaggio naturale si aggirano con il linguaggio naturale.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ga-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ga-p'));
      entra(t, q('.ga-qr'), { pos: '+=0.2' });
      entra(t, q('.ga-t'), { da: 'destra', pos: '+=0.3' });
    },
  });

  // ---------- i valori ----------
  F.scena('valori', `
    <div class="kicker at" style="left:140px;top:110px">Non sono super partes</div>
    <h2 class="at va-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Allineati, sì: <em>ma a che cosa?</em></h2>
    <div class="at card va-c1" style="left:150px;top:330px;width:790px;font-size:29px"><div class="mono acc" style="font-size:22px">gennaio 2025</div>
      Chiedete a DeepSeek di Piazza Tienanmen, 1989: il modello dell'app risponde che non può parlarne, o cambia argomento.</div>
    <div class="at card va-c2" style="left:980px;top:330px;width:790px;font-size:29px"><div class="mono acc" style="font-size:22px">luglio 2025</div>
      Grok, il modello di xAI, dopo un cambio delle istruzioni pubblica messaggi antisemiti; poco dopo si scopre che sui temi controversi cerca le opinioni di Elon Musk.</div>
    ${rischio({
      id: 'r-valori', x: 150, y: 640, w: 1620,
      titolo: 'I valori del modello li ha scelti qualcuno',
      testo: 'Ogni azienda decide che cosa il suo modello può dire, che cosa rifiuta e con che tono: secondo le sue regole, le leggi del suo paese, i suoi interessi. Non esiste un modello neutrale. Vale per i modelli cinesi, e vale anche per quelli americani ed europei.',
    })}
  `);

  F.passo({
    id: 'valori', scena: 'valori', titolo: 'Valori: due casi',
    note: `<p>Due casi opposti: censura per legge (i modelli cinesi devono rispettare le regole sui contenuti del loro paese) e istruzioni scritte da chi possiede l'azienda.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.va-tit')[0], { pos: '-=0.2' });
      entra(t, q('.va-c1'), { da: 'sinistra' });
      entra(t, q('.va-c2'), { da: 'destra', pos: '+=0.4' });
    },
  });

  F.passo({
    id: 'r-valori', scena: 'valori', titolo: 'Riquadro: i valori',
    note: `<p>Non è un'accusa a qualcuno in particolare: è una proprietà di tutti. Anche le "costituzioni" pubbliche (Anthropic) o le "model spec" (OpenAI) sono scelte di un'azienda.</p>`,
    anima: (t) => { avvisa(t, '#r-valori'); },
  });

  // ---------- privacy ----------
  F.scena('privacy', `
    <div class="kicker at" style="left:140px;top:110px">E i nostri dati?</div>
    <h2 class="at pv-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Quello che scrivi <em>esce dal tuo computer</em></h2>
    ${rischio({
      id: 'r-privacy', x: 150, y: 320, w: 900,
      titolo: 'Un problema vecchio, che ora vediamo di più',
      testo: 'Mandare dati a un server altrui è sempre stato un problema: dati di clienti o sanitari su un documento online con un account personale, senza contratto per il trattamento, magari fuori dall\'UE. Con gli LLM ce ne accorgiamo di più perché sappiamo che vivono di dati. Piani personali e contratti aziendali trattano le chat in modo diverso: le prime possono finire nell\'addestramento.',
    })}
    <div class="at pv-g" style="left:1120px;top:320px;width:660px">
      <div class="mono acc" style="font-size:22px;margin-bottom:14px">il Garante italiano</div>
      ${[['marzo 2023', 'blocca ChatGPT in Italia per un mese'], ['dicembre 2024', 'multa OpenAI per 15 milioni di euro'], ['gennaio 2025', 'blocca DeepSeek']].map(([d, s]) => `<div class="card pv-c" style="margin-bottom:14px;padding:18px 24px"><div class="mono" style="font-size:20px;color:var(--muted)">${d}</div><div style="font-size:28px">${s}</div></div>`).join('')}
      <div style="font-size:24px;color:var(--muted)">Come Clearview e Glovo, nel modulo A.</div>
    </div>
  `);

  F.passo({
    id: 'privacy', scena: 'privacy', titolo: 'Riquadro: privacy',
    note: `<p>Il punto: non è un problema nuovo. Mettere dati sanitari di pazienti su un Google Docs personale è sempre stato un problema (dati "particolari" per il GDPR, nessun contratto di trattamento, trasferimento fuori UE: sentenza Schrems II, 2020; il Garante su Google Analytics, 2022). Con un contratto aziendale e le misure giuste, si può fare. Per gli LLM vale lo stesso.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.pv-tit')[0], { pos: '-=0.2' });
      avvisa(t, '#r-privacy', { pos: '+=0.2' });
      entra(t, q('.pv-g .mono'), { da: 'niente', pos: '+=0.3' });
      entra(t, q('.pv-c'), { da: 'destra', stagger: 0.2 });
      entra(t, q('.pv-g > div:last-child'), { da: 'niente' });
    },
  });

  // ---------- open weight ----------
  const APERTI = [['feb 2023', 'LLaMA', 'Meta', 'pesi trapelati, poi rilasciati'], ['set 2023', 'Mistral 7B', 'Mistral (Francia)', 'licenza Apache'], ['feb 2024', 'OLMo', 'AI2', 'aperti anche dati e codice'],
    ['gen 2025', 'DeepSeek-R1', 'DeepSeek (Cina)', 'il mercato trema'], ['ago 2025', 'gpt-oss', 'OpenAI', 'il primo dal 2019'], ['2026', 'DeepSeek V4, Qwen, Kimi, GLM…', '', 'i migliori aperti sono cinesi']];
  F.scena('aperti', `
    <div class="kicker at" style="left:140px;top:110px">Modelli aperti</div>
    <h2 class="at ap-tit" style="left:140px;top:160px;width:1640px;font-size:72px">I pesi <em>si possono scaricare</em></h2>
    <div class="at ap-def" style="left:150px;top:320px;width:1620px;display:flex;gap:30px">
      <div class="card" style="flex:1;font-size:28px"><b>Open weight</b>: puoi scaricare il modello e usarlo dove vuoi. Ma non sai su quali dati è stato addestrato, né come.</div>
      <div class="card" style="flex:1;font-size:28px"><b>Open source</b> davvero: aperti anche dati, codice e ricetta di addestramento. Sono pochi.</div></div>
    ${APERTI.map(([d, n, c, s], k) => `<div class="at ap-m" style="left:${150 + (k % 3) * 545}px;top:${560 + Math.floor(k / 3) * 190}px;width:510px">
      <div class="mono acc" style="font-size:20px">${d}</div><div style="font:600 36px var(--head)">${n}</div><div style="font-size:24px;color:var(--muted)">${c}${c ? ' · ' : ''}${s}</div></div>`).join('')}
  `);

  F.passo({
    id: 'aperti', scena: 'aperti', titolo: 'Open weight e open source',
    note: `<p>DeepSeek-R1 (20 gennaio 2025): un modello che ragiona, con pesi scaricabili e licenza MIT, addestrato a costi dichiarati molto bassi. Il 27 gennaio Nvidia perde circa il 17% in borsa in un giorno.</p><p>Oggi i modelli aperti più forti sono quasi tutti cinesi (DeepSeek, Qwen di Alibaba, Kimi di Moonshot, GLM di Z.ai).</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ap-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ap-def .card'), { stagger: 0.25 });
      entra(t, q('.ap-m'), { stagger: 0.18, pos: '+=0.2' });
    },
  });

  // ---------- inferenza locale ----------
  F.scena('locale', `
    <div class="kicker at" style="left:140px;top:110px">Inferenza locale</div>
    <h2 class="at lo-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Il modello <em>in casa</em></h2>
    <div class="at card lo-terminale" style="left:150px;top:320px;width:900px;height:420px;background:#1A1A1A;color:#E8E1D4;font-family:var(--mono);font-size:26px;line-height:1.55">
      <span style="color:#8B98A8">$</span> ssh minipc<br><span style="color:#8B98A8">$</span> ollama run qwen3.5<br>
      <span style="color:#E4572E">&gt;&gt;&gt;</span> <span class="lo-dom">Chi ha scritto Pinocchio?</span><br>
      <span class="lo-risp">Carlo Collodi, nel 1881–1883, a puntate sul «Giornale per i bambini».</span></div>
    <div class="at lo-pezzi" style="left:1110px;top:320px;width:670px">
      <div style="font-size:28px;margin-bottom:10px"><b>Motori</b> che fanno girare i pesi</div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px">${['llama.cpp', 'Ollama', 'LM Studio', 'vLLM', 'MLX (Apple)'].map(s => `<span class="pill">${s}</span>`).join('')}</div>
      <div style="font-size:28px;margin-bottom:10px"><b>Harness</b>: il programma attorno al modello</div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px">${['opencode', 'pi', 'la chat di Ollama'].map(s => `<span class="pill">${s}</span>`).join('')}</div>
      <div style="font-size:26px;color:var(--muted)">Con la <b>quantizzazione</b> (numeri a 4 bit invece di 16) un modello occupa circa un quarto della memoria.</div></div>
    <div class="at card lo-ds4" style="left:150px;top:790px;width:1630px;font-size:28px"><b>DwarfStar 4</b> di antirez (il creatore di Redis): invece di inseguire ogni modello che esce, un motore costruito per uno solo, DeepSeek V4 Flash, ottimizzato fino in fondo. Gira su un Mac con 96 GB di memoria.</div>
  `);

  F.passo({
    id: 'locale', scena: 'locale', titolo: 'Inferenza locale',
    note: `<p><b>Dal vivo:</b> collegati in SSH al mini PC e fai una domanda a Qwen 3.5 con Ollama. Dite che devono fidarsi: è tutto lì, nessun dato esce.</p><p>Motore e harness sono due cose diverse: il motore fa i calcoli, l'harness gestisce la conversazione, gli strumenti, i file. Lo ritroviamo negli agenti.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.lo-tit')[0], { pos: '-=0.2' });
      entra(t, q('.lo-terminale'), { da: 'scala' });
      scrivi(t, q('.lo-dom')[0], { stagger: 0.03 });
      entra(t, q('.lo-risp'), { da: 'niente', pos: '+=0.5' });
      entra(t, q('.lo-pezzi > *'), { stagger: 0.12, pos: '-=0.2' });
    },
  });

  F.passo({
    id: 'ds4', scena: 'locale', titolo: 'DwarfStar 4',
    note: `<p>Salvatore Sanfilippo, antirez, siciliano: il suo approccio è l'opposto della corsa a supportare tutto. Un solo modello, un motore piccolo e leggibile, ogni dettaglio ottimizzato per quello.</p>`,
    anima: (t, q) => { entra(t, q('.lo-ds4')); },
  });

  // ---------- cosa abilita ----------
  F.scena('pesi-in-mano', `
    <div class="kicker at" style="left:140px;top:110px">Con i pesi in mano</div>
    <h2 class="at pm-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Si può <em>mettere le mani dentro</em></h2>
    <svg class="tela" viewBox="0 0 1920 1080">
      <rect x="150" y="330" width="760" height="460" rx="24" fill="var(--surface)" class="pm-sp"/>
      <circle class="pm-a" cx="420" cy="620" r="16" fill="var(--fg)"/>
      <line class="pm-dir" x1="420" y1="620" x2="760" y2="430" stroke="var(--accent)" stroke-width="6"/>
      <polygon class="pm-dirp" points="772,423 748,428 760,448" fill="var(--accent)"/>
      <text class="pm-dirl" x="620" y="490" font-size="26" fill="var(--accent)" transform="rotate(-29 620 490)">direzione «Golden Gate»</text>
      <circle class="pm-b" cx="420" cy="620" r="16" fill="var(--accent)" opacity="0"/>
    </svg>
    <div class="at didascalia pm-cap" style="left:150px;top:806px">le attivazioni interne del modello, per un certo testo</div>
    <div class="at pm-c1" style="left:980px;top:330px;width:800px;font-size:28px"><b>Steering.</b> Dentro il modello certe idee sono direzioni. Spingendo le attivazioni lungo una direzione si cambia il comportamento: nel 2024 Anthropic ha creato un Claude che si credeva il Golden Gate Bridge.</div>
    <div class="at pm-c2" style="left:980px;top:560px;width:800px;font-size:28px"><b>Togliere i rifiuti.</b> Anche il rifiuto è (quasi) una direzione sola: si può cancellare (Arditi e colleghi, 2024). Oppure si scrive in anticipo l'inizio della risposta, «Certo, ecco come…», e il modello continua.</div>
    <div class="at pm-c3" style="left:980px;top:800px;width:800px;font-size:28px"><b>LoRA.</b> Per specializzare un modello non serve riaddestrarlo: si aggiungono poche matrici piccole e si allenano solo quelle (circa 10.000 volte meno pesi da allenare per GPT-3).</div>
  `);

  F.passo({
    id: 'steering', scena: 'pesi-in-mano', titolo: 'Steering',
    note: `<p>Golden Gate Claude (maggio 2024): un esperimento di interpretabilità. Amplificando la "caratteristica" del ponte, il modello parlava del ponte in ogni risposta, fino a dire di esserlo.</p><p>Neuronpedia permette di provarlo su modelli aperti, se volete mostrarlo.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.pm-tit')[0], { pos: '-=0.2' });
      entra(t, q('.pm-sp'), { da: 'niente' });
      entra(t, q('.pm-a'), { da: 'scala', ease: 'back.out(3)' });
      entra(t, q('.pm-cap'), { da: 'niente', pos: '<' });
      disegna(t, q('.pm-dir'), { dur: 0.7 });
      entra(t, q('.pm-dirp, .pm-dirl'), { da: 'niente' });
      t.to(q('.pm-b'), { opacity: 1, duration: 0.01 });
      t.to(q('.pm-b'), { attr: { cx: 700, cy: 465 }, duration: 1, ease: 'power2.inOut' });
      entra(t, q('.pm-c1'), { pos: '-=0.6' });
    },
  });

  F.passo({
    id: 'rifiuti-lora', scena: 'pesi-in-mano', titolo: 'Togliere i rifiuti, LoRA',
    note: `<p>Il lato scomodo dei modelli aperti: i guardrail si possono togliere. Il lato utile: si possono adattare a un dominio (un ospedale, un tribunale, un'azienda) con pochi dati e una sola scheda grafica, con LoRA (Hu e colleghi, Microsoft, 2021).</p>`,
    anima: (t, q) => {
      entra(t, q('.pm-c2'));
      entra(t, q('.pm-c3'), { pos: '+=0.4' });
    },
  });
})();
