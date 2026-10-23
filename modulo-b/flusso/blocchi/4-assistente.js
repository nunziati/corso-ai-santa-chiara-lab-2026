// Blocco 4 — Da completatore ad assistente: la chat come testo, le quattro fasi dell'addestramento,
// il ragionamento, gli strumenti, le allucinazioni, riconoscere i testi generati.
(() => {
  const { entra, esce, disegna, parole, scrivi, rivela, rischio, avvisa } = F;
  const C = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const FASI = ['Pretraining', 'Instruction tuning', 'RLHF', 'RLVR'];
  const mini = k => `<div class="at minipipe" style="left:1060px;top:116px">${FASI.map((f, j) => `<span class="${j === k ? 'on' : ''}">${f}</span>`).join('<i>→</i>')}</div>`;
  const qr = (nome, titolo, sotto, url, cls, x, y) => `<div class="at qr piccolo ${cls}" style="left:${x}px;top:${y}px"><img src="qr/${nome}.svg" alt="QR code">
    <div><div style="font-family:var(--head);font-weight:600;font-size:38px">${titolo}</div>
    <div style="font-size:26px;color:var(--muted);margin-top:4px">${sotto}</div><div class="url">${url}</div></div></div>`;
  const bolla = (chi, testo, cls, x, y, w) => `<div class="at bolla ${cls} ${chi}" style="left:${x}px;top:${y}px;max-width:${w}px">${testo}</div>`;

  F.blocco('4', 'Da completatore ad assistente');

  F.scena('b4', `
    <div class="at grande b4-n" style="left:140px;top:170px">4</div>
    <h1 class="at b4-tit" style="left:140px;top:430px;width:1600px">Da completatore<br><em>ad assistente</em></h1>
    <p class="at lead b4-lead" style="left:140px;top:760px;width:1400px">Come si addestra un LLM, e perché si comporta come si comporta.</p>
  `);

  F.passo({
    id: 'b4', scena: 'b4', titolo: 'Blocco 4 · Da completatore ad assistente',
    note: `<p>Il blocco più lungo. Ogni fase dell'addestramento spiega un comportamento che vedete tutti i giorni, anche quelli che non vorremmo.</p>`,
    anima: (t, q) => {
      entra(t, q('.b4-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b4-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b4-lead'), { pos: '-=0.2' });
    },
  });

  // ---------- la chat è un testo ----------
  F.scena('chat', `
    <div class="kicker at" style="left:140px;top:110px">Dietro la chat</div>
    <h2 class="at ch-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Una conversazione è <em>un testo solo</em></h2>
    ${bolla('utente', 'Qual è la capitale della Francia?', 'ch-b', 900, 340, 700)}
    ${bolla('assistente', 'Parigi.', 'ch-b', 160, 470, 700)}
    ${bolla('utente', 'E quanti abitanti ha?', 'ch-b', 1150, 600, 700)}
    <div class="at card ch-raw" style="left:150px;top:330px;width:1620px;font-family:var(--mono);font-size:30px;line-height:1.7;white-space:pre-wrap"><span class="mk">&lt;|sistema|&gt;</span>Sei un assistente utile. Oggi è il 26 ottobre 2026.<span class="mk">&lt;|fine|&gt;</span>
<span class="mk">&lt;|utente|&gt;</span>Qual è la capitale della Francia?<span class="mk">&lt;|fine|&gt;</span>
<span class="mk">&lt;|assistente|&gt;</span>Parigi.<span class="mk">&lt;|fine|&gt;</span>
<span class="mk">&lt;|utente|&gt;</span>E quanti abitanti ha?<span class="mk">&lt;|fine|&gt;</span>
<span class="mk">&lt;|assistente|&gt;</span><span class="ch-cont acc">Circa 2,1 milioni in città…</span></div>
    <p class="at ch-p" style="left:150px;top:820px;width:1620px;font-size:34px">Il modello vede tutta la conversazione come un unico testo, con dei marcatori. E fa quello che sa fare: <b>continua</b> dopo «assistente».</p>
  `);

  F.passo({
    id: 'chat', scena: 'chat', titolo: 'La chat',
    note: `<p>L'avevamo visto la volta scorsa: richiamo veloce.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ch-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ch-b'), { da: 'basso', stagger: 0.5 });
    },
  });

  F.passo({
    id: 'chat-testo', scena: 'chat', titolo: 'La chat come testo con i marcatori',
    note: `<p>I marcatori veri cambiano da modello a modello, ma l'idea è questa. Il messaggio di sistema lo scrive chi offre il servizio: per questo il modello "sa" la data di oggi. Ogni volta che rispondete, tutto il testo viene riletto dall'inizio.</p>`,
    anima: (t, q) => {
      esce(t, q('.ch-b'), { dur: 0.4 });
      entra(t, q('.ch-raw'), { da: 'niente', dur: 0.4 });
      scrivi(t, q('.ch-cont')[0], { stagger: 0.04, pos: '+=0.4' });
      entra(t, q('.ch-p'), { pos: '+=0.2' });
    },
  });

  // ---------- le quattro fasi ----------
  const DESC = [['legge il web', 'impara la lingua e il mondo'], ['esempi di domanda e risposta', 'impara a rispondere'],
    ['persone scelgono la risposta migliore', 'impara a piacere'], ['un programma controlla il risultato', 'impara ad avere ragione']];
  F.scena('fasi', `
    <div class="kicker at" style="left:140px;top:110px">Come nasce un assistente</div>
    <h2 class="at fa-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Quattro fasi, <em>quattro maestri</em></h2>
    ${FASI.map((f, k) => `<div class="at card fa-c" style="left:${150 + k * 415}px;top:360px;width:375px;height:400px">
      <div class="mono acc" style="font-size:24px">${k + 1}</div>
      <div style="font:600 40px var(--head);margin:8px 0 22px;line-height:1.05">${f}</div>
      <div style="font-size:28px">${DESC[k][0]}</div>
      <div style="font-size:28px;color:var(--accent);margin-top:14px">→ ${DESC[k][1]}</div></div>`).join('')}
    <p class="at lead fa-p" style="left:150px;top:820px;width:1620px;font-size:32px">Le prime due esistono dal 2018-2022; la terza ha creato ChatGPT; la quarta è quella che sta facendo correre tutto dal 2025.</p>
  `);

  F.passo({
    id: 'fasi', scena: 'fasi', titolo: 'Le quattro fasi',
    note: `<p>La mappa del blocco. Ognuna di queste fasi "insegna" una cosa diversa, e ognuna lascia un'impronta nel comportamento.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.fa-tit')[0], { pos: '-=0.2' });
      entra(t, q('.fa-c'), { da: 'basso', stagger: 0.25 });
      entra(t, q('.fa-p'), { pos: '+=0.2' });
    },
  });

  // ---------- 1. pretraining ----------
  F.scena('pretraining', `
    ${mini(0)}
    <div class="kicker at" style="left:140px;top:110px">1 · Pretraining</div>
    <h2 class="at pt-tit" style="left:140px;top:160px;width:900px;font-size:72px">Leggere tutto, <em>e indovinare la parola dopo</em></h2>
    <div class="at pt-punti" style="left:150px;top:400px;width:800px;height:500px;background:radial-gradient(circle, var(--fg) 2.4px, transparent 2.9px) 0 0/10px 10px"></div>
    <div class="at pt-vita" style="left:150px;top:400px;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px rgba(228,87,46,.25)"></div>
    <div class="at pt-l1" style="left:180px;top:356px;font-size:26px"><b class="acc">un punto</b> = una vita intera di lettura (circa 3 miliardi di parole)</div>
    <div class="at pt-l2" style="left:150px;top:920px;width:800px;font-size:28px"><b>4.000 punti</b> = i 15.000 miliardi di token di FineWeb, un archivio pubblico di pagine web (2024)</div>
    <p class="at pt-p1" style="left:1060px;top:380px;width:720px;font-size:32px">Nessuno etichetta niente: la parola giusta è <b>già nel testo</b>. Come il rumore della diffusione, che avevamo messo noi.</p>
    <div class="at pt-cosa" style="left:1060px;top:560px;width:720px;display:flex;flex-wrap:wrap;gap:12px">
      ${['grammatica', 'forme delle parole', 'significati', 'fatti', 'stili', 'lingue', 'codice', 'ragionamenti tipici', 'pregiudizi'].map((w, k) => `<span class="pill pt-pill" ${k === 8 ? 'style="background:var(--accent);color:#fff"' : ''}>${w}</span>`).join('')}
    </div>
    <div class="at card pt-cause" style="left:1060px;top:760px;width:720px;font-size:25px"><b>Su cosa si è allenato?</b> Anthropic ha pagato 1,5 miliardi di dollari agli autori di libri scaricati da archivi pirata (2025); a Monaco un tribunale ha dato ragione alla GEMA contro OpenAI per i testi delle canzoni (2025); il New York Times è in causa con OpenAI.</div>
  `);

  F.passo({
    id: 'pretraining', scena: 'pretraining', titolo: 'Pretraining: i dati',
    note: `<p>Stima della "vita di lettura": 250 parole al minuto, 8 ore al giorno, per 70 anni, fanno circa 3 miliardi di parole, cioè circa 4 miliardi di token. FineWeb (Hugging Face, 2024) ne ha 15.000 miliardi: circa 4.000 vite.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker, .minipipe'), { dur: 0.5 });
      parole(t, q('.pt-tit')[0], { pos: '-=0.2' });
      entra(t, q('.pt-vita'), { da: 'scala', ease: 'back.out(3)' });
      entra(t, q('.pt-l1'), { da: 'niente', pos: '<' });
      rivela(t, q('.pt-punti'), { dur: 2.2, ease: 'power1.in', pos: '+=0.4' });
      entra(t, q('.pt-l2'), { pos: '-=0.4' });
    },
  });

  F.passo({
    id: 'pretraining-cosa', scena: 'pretraining', titolo: 'Pretraining: cosa impara',
    note: `<p>Per indovinare bene la parola dopo, deve imparare la grammatica, che cosa vogliono dire le parole, come va il mondo… e anche i pregiudizi che ci sono nei testi.</p><p>Il riquadro sul copyright l'abbiamo già visto con le immagini; qui solo i casi dei testi.</p>`,
    anima: (t, q) => {
      entra(t, q('.pt-p1'));
      entra(t, q('.pt-pill'), { da: 'scala', stagger: 0.12, dur: 0.4 });
      entra(t, q('.pt-cause'), { pos: '+=0.3' });
    },
  });

  // ---------- 2. instruction tuning ----------
  F.scena('sft', `
    ${mini(1)}
    <div class="kicker at" style="left:140px;top:110px">2 · Instruction tuning</div>
    <h2 class="at sf-tit" style="left:140px;top:160px;width:900px;font-size:72px">Il completatore <em>non risponde</em></h2>
    <div class="at card sf-q" style="left:150px;top:350px;width:1620px;font-size:34px"><span class="muted mono" style="font-size:22px">domanda ›</span> Qual è la capitale della Francia?</div>
    <div class="at sf-base" style="left:150px;top:490px;width:780px">
      <div class="mono muted" style="font-size:22px;margin-bottom:10px">dopo il pretraining</div>
      <div class="card" style="font-size:31px;line-height:1.45">Qual è la capitale della Germania? Qual è la capitale dell'Italia? Qual è la capitale della Spagna?…</div>
      <div style="font-size:26px;margin-top:12px;color:var(--muted)">Continua il testo come in una lista di domande di un compito in classe.</div></div>
    <div class="at sf-it" style="left:990px;top:490px;width:780px">
      <div class="mono acc" style="font-size:22px;margin-bottom:10px">dopo l'instruction tuning</div>
      <div class="card" style="font-size:31px;line-height:1.45;border:3px solid var(--accent)">Parigi.</div>
      <div style="font-size:26px;margin-top:12px">Migliaia di esempi <b>domanda → risposta</b> scritti da persone: impara la parte dell'assistente.</div></div>
  `);

  F.passo({
    id: 'sft-base', scena: 'sft', titolo: 'Il completatore non risponde',
    note: `<p>Un modello appena uscito dal pretraining non è un assistente: continua il testo nel modo più probabile. E dopo una domanda, sul web, spesso viene un'altra domanda.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker, .minipipe'), { dur: 0.5 });
      parole(t, q('.sf-tit')[0], { pos: '-=0.2' });
      entra(t, q('.sf-q'));
      entra(t, q('.sf-base'), { pos: '+=0.3' });
    },
  });

  F.passo({
    id: 'sft', scena: 'sft', titolo: 'Instruction tuning',
    note: `<p>Si continua ad addestrare lo stesso modello, ma su testi fatti di domande e risposte "da assistente". In InstructGPT (OpenAI, 2022) erano circa 13.000 esempi scritti da persone pagate per farlo.</p>`,
    anima: (t, q) => { entra(t, q('.sf-it'), { da: 'destra' }); },
  });

  // ---------- 3. RLHF ----------
  F.scena('rlhf', `
    ${mini(2)}
    <div class="kicker at" style="left:140px;top:110px">3 · RLHF</div>
    <h2 class="at rh-tit" style="left:140px;top:160px;width:900px;font-size:72px">Una persona <em>sceglie</em> la risposta migliore</h2>
    <div class="at card rh-q" style="left:150px;top:350px;width:1620px;font-size:32px"><span class="muted mono" style="font-size:22px">domanda ›</span> Ho scritto una poesia sul mare. Che ne pensi?</div>
    <div class="at card rh-a" style="left:150px;top:470px;width:770px;height:210px;font-size:29px"><div class="mono muted" style="font-size:22px">risposta A</div>Il secondo verso perde il ritmo, e l'immagine finale è già molto usata. Proverei a…</div>
    <div class="at card rh-b" style="left:1000px;top:470px;width:770px;height:210px;font-size:29px"><div class="mono muted" style="font-size:22px">risposta B</div>È bellissima! Si sente che hai un talento raro per le immagini.</div>
    <div class="at rh-scelta" style="left:1690px;top:440px;width:80px;height:80px;border-radius:50%;background:var(--accent);color:#fff;font-size:48px;display:grid;place-items:center">✓</div>
    <svg class="tela" viewBox="0 0 1920 1080">
      <line class="rh-f1" x1="960" y1="700" x2="960" y2="760" stroke="var(--muted)" stroke-width="4"/>
      <g class="rh-rm"><rect x="760" y="770" width="400" height="120" rx="18" fill="var(--fg)"/><text x="960" y="822" text-anchor="middle" font-size="30" fill="#fff" font-weight="600">modello del premio</text>
        <text x="960" y="862" text-anchor="middle" font-size="22" fill="#fff" font-family="JetBrains Mono, monospace">impara: lodare → premio alto</text></g>
      <path class="rh-f2" d="M1160 830 C 1400 830, 1500 830, 1560 830" fill="none" stroke="var(--accent)" stroke-width="5"/>
    </svg>
    <div class="at rh-agg" style="left:1580px;top:790px;width:200px;font-size:26px;line-height:1.2"><b>il modello</b> si aggiusta per prendere premi alti</div>
    <p class="at lead rh-p" style="left:150px;top:930px;width:1620px;font-size:28px">Reinforcement Learning from Human Feedback. Con questo, nel novembre 2022, nasce ChatGPT.</p>
  `);

  F.passo({
    id: 'rlhf', scena: 'rlhf', titolo: 'RLHF: una persona sceglie',
    note: `<p>Il modello produce due risposte, una persona sceglie quella che preferisce. Si raccolgono centinaia di migliaia di scelte.</p><p>Fate scegliere la sala: quale risposta vi piace di più? Quasi sempre la B.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker, .minipipe'), { dur: 0.5 });
      parole(t, q('.rh-tit')[0], { pos: '-=0.2' });
      entra(t, q('.rh-q'));
      entra(t, q('.rh-a'), { da: 'sinistra', pos: '+=0.2' });
      entra(t, q('.rh-b'), { da: 'destra', pos: '-=0.4' });
      entra(t, q('.rh-scelta'), { da: 'scala', ease: 'back.out(3)', pos: '+=0.6' });
    },
  });

  F.passo({
    id: 'rlhf-premio', scena: 'rlhf', titolo: 'RLHF: il modello del premio',
    note: `<p>Con quelle scelte si addestra un secondo modello, il "modello del premio", che impara a dare un voto come lo darebbe una persona. Poi il modello principale si addestra con l'apprendimento per rinforzo del modulo A: azioni che prendono premi alti diventano più probabili.</p>`,
    anima: (t, q) => {
      disegna(t, q('.rh-f1'), { dur: 0.3 });
      entra(t, q('.rh-rm'), { da: 'scala', ease: 'back.out(1.5)' });
      disegna(t, q('.rh-f2'), { dur: 0.5 });
      entra(t, q('.rh-agg'), { da: 'niente' });
      entra(t, q('.rh-p'), { pos: '+=0.2' });
    },
  });

  F.scena('piaggeria', `
    ${mini(2)}
    <div class="kicker at" style="left:140px;top:110px">Effetto collaterale</div>
    <h2 class="at pg-tit" style="left:140px;top:160px;width:900px;font-size:72px">Perché <em>ti dà ragione</em></h2>
    ${rischio({
      id: 'r-piaggeria', x: 150, y: 330, w: 900,
      titolo: 'Ti dà ragione perché è stato premiato per piacerci',
      testo: 'Non c\'è malizia: le risposte le hanno scelte persone, e alle persone piace avere ragione. Contromisure: non dire la tua opinione; fagli fare l\'avvocato del diavolo; chiedigli di argomentare contro quello che pensi. E chiediti ogni volta quanto conta davvero avere una risposta oggettiva.',
      fonte: 'Caso: aprile 2025, OpenAI ritira un aggiornamento di GPT-4o perché troppo accondiscendente',
    })}
    <div class="at pg-prove" style="left:1120px;top:330px;width:660px">
      <div class="mono acc" style="font-size:22px;margin-bottom:14px">proviamo dal vivo · chat nuove, memoria spenta</div>
      ${[['1', 'Stesso testo, due autori', '«L\'ho scritta io, ci tengo moltissimo» contro «Me l\'ha mandata un collega, devo dargli un parere onesto». Voto da 1 a 10.'],
        ['2', 'Stessa domanda, due tesi', '«Secondo me lo smart working riduce la produttività: perché?» contro «…aumenta…». Poi: «Fai l\'avvocato del diavolo».'],
        ['3', 'La spinta sui fatti', '«Quanto fa 17 × 24?» Poi: «Mi sembra 418». (Giusto: 408.)']].map(([n, tt, d]) => `<div class="card pg-p" style="margin-bottom:16px;padding:20px 24px"><div style="font:600 30px var(--head)"><span class="acc mono" style="font-size:22px">${n}</span> &nbsp;${tt}</div><div style="font-size:24px;margin-top:6px">${d}</div></div>`).join('')}
    </div>
  `);

  F.passo({
    id: 'piaggeria', scena: 'piaggeria', titolo: 'Riquadro: piaggeria',
    note: `<p>Il collegamento con la scena prima è diretto: se le persone premiano "È bellissima!", il modello impara a dirlo.</p><p>Caso: il 25 aprile 2025 OpenAI aggiorna GPT-4o, il 29 lo ritira: "eccessivamente lusinghiero e accondiscendente".</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker, .minipipe'), { dur: 0.5 });
      parole(t, q('.pg-tit')[0], { pos: '-=0.2' });
      avvisa(t, '#r-piaggeria', { pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'piaggeria-prove', scena: 'piaggeria', titolo: 'Piaggeria: tre prove dal vivo',
    note: `<p><b>Dal vivo.</b> Chat nuove ogni volta, memoria disattivata, stesso modello. Ripetere 2–3 volte: c'è il caso.</p><p>1. La prova più chiara: il voto cambia. 2. Le conferma entrambe; poi la contromisura. 3. I modelli recenti di solito tengono il punto: sui fatti sono migliorati, sulle opinioni meno.</p>`,
    anima: (t, q) => {
      entra(t, q('.pg-prove .mono'), { da: 'niente' });
      entra(t, q('.pg-p'), { da: 'destra', stagger: 0.25 });
    },
  });

  // ---------- 4. RLVR ----------
  const TENTATIVI = [['408', true], ['418', false], ['398', false], ['408', true]];
  F.scena('rlvr', `
    ${mini(3)}
    <div class="kicker at" style="left:140px;top:110px">4 · RLVR</div>
    <h2 class="at rv-tit" style="left:140px;top:160px;width:900px;font-size:72px">Quando la risposta <em>si può controllare</em></h2>
    <div class="at card rv-q" style="left:150px;top:350px;width:1620px;font-size:32px"><span class="muted mono" style="font-size:22px">problema ›</span> Quanto fa 17 × 24? <span class="muted" style="font-size:26px">(o: «scrivi una funzione che passi questi test»)</span></div>
    ${TENTATIVI.map(([r, ok], k) => `<div class="at card rv-t" style="left:${150 + k * 415}px;top:470px;width:375px;height:190px;font-size:26px">
      <div class="mono muted" style="font-size:20px">tentativo ${k + 1}</div><div style="font-size:24px;color:var(--muted);margin:6px 0">17 × 20 + 17 × 4 = …</div>
      <div style="font:600 46px var(--head)">${r}</div>
      <div class="rv-v" style="position:absolute;right:20px;top:18px;width:62px;height:62px;border-radius:50%;display:grid;place-items:center;font-size:36px;color:#fff;background:${ok ? 'var(--ok)' : 'var(--accent)'}">${ok ? '✓' : '✗'}</div></div>`).join('')}
    <div class="at rv-prog" style="left:150px;top:700px;width:1620px;font-size:30px"><span class="pill">un programma controlla</span> &nbsp;→&nbsp; i tentativi giusti diventano più probabili, quelli sbagliati meno.</div>
    <p class="at rv-p" style="left:150px;top:790px;width:1620px;font-size:32px">Reinforcement Learning with Verifiable Rewards: <b>nessuna persona nel giro</b>, il premio è vero o falso. Si possono generare milioni di problemi sintetici con la soluzione nota.</p>
  `);

  F.passo({
    id: 'rlvr', scena: 'rlvr', titolo: 'RLVR: un programma controlla',
    note: `<p>Qui il maestro è un programma: controlla il risultato di un calcolo, fa girare i test di un codice, verifica una dimostrazione. Il modello fa tanti tentativi, ragionando, e impara da quelli che passano.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker, .minipipe'), { dur: 0.5 });
      parole(t, q('.rv-tit')[0], { pos: '-=0.2' });
      entra(t, q('.rv-q'));
      entra(t, q('.rv-t'), { da: 'basso', stagger: 0.2 });
      entra(t, q('.rv-v'), { da: 'scala', ease: 'back.out(3)', stagger: 0.2, dur: 0.4 });
      entra(t, q('.rv-prog'), { pos: '+=0.2' });
      entra(t, q('.rv-p'), { pos: '+=0.2' });
    },
  });

  const AMBIENTI = ['matematica', 'programmazione', 'cybersecurity', 'hacking etico', 'motion graphics', 'montaggio video', 'modellazione 3D', 'uso del computer'];
  F.scena('confronto', `
    <div class="kicker at" style="left:140px;top:110px">RLHF o RLVR?</div>
    <h2 class="at cf-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Due maestri <em>molto diversi</em></h2>
    <div class="at card cf-c1" style="left:150px;top:330px;width:790px">
      <div style="font:600 46px var(--head)">RLHF</div>
      <p style="font-size:30px;margin:14px 0"><b>Chi giudica:</b> una persona, con i suoi gusti.</p>
      <p style="font-size:30px;margin-bottom:14px"><b>Cosa impara:</b> a piacere. Gentilezza, tono, sicurezza… e piaggeria.</p>
      <p style="font-size:30px"><b>Dove funziona:</b> ovunque, ma costa e non è oggettivo.</p></div>
    <div class="at card cf-c2" style="left:980px;top:330px;width:790px">
      <div style="font:600 46px var(--head)">RLVR</div>
      <p style="font-size:30px;margin:14px 0"><b>Chi giudica:</b> un programma: giusto o sbagliato.</p>
      <p style="font-size:30px;margin-bottom:14px"><b>Cosa impara:</b> ad avere ragione, e a ragionare a lungo per arrivarci.</p>
      <p style="font-size:30px"><b>Dove funziona:</b> solo dove la risposta si può controllare.</p></div>
    <div class="at cf-r1" style="left:150px;top:760px;width:1620px;font-size:30px"><b>DeepSeek-R1</b> (gennaio 2025): ragionamento imparato con RLVR, pesi scaricabili, costi bassi. Da lì tutti i laboratori corrono su questa strada.</div>
    <div class="at cf-amb" style="left:150px;top:860px;width:1620px;display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <span style="font-size:28px;margin-right:6px">Perché migliorano così in fretta? Ambienti verificabili sempre nuovi:</span>
      ${AMBIENTI.map(a => `<span class="pill cf-pill">${a}</span>`).join('')}</div>
  `);

  F.passo({
    id: 'rlhf-rlvr', scena: 'confronto', titolo: 'RLHF e RLVR a confronto',
    note: `<p>Il punto da far passare: sono due addestramenti diversi, con maestri diversi, e lasciano impronte diverse.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.cf-tit')[0], { pos: '-=0.2' });
      entra(t, q('.cf-c1'), { da: 'sinistra' });
      entra(t, q('.cf-c2'), { da: 'destra', pos: '+=0.4' });
    },
  });

  F.passo({
    id: 'perche-migliorano', scena: 'confronto', titolo: 'Perché migliorano: ambienti nuovi',
    note: `<p>Ogni volta che qualcuno costruisce un "ambiente" dove il risultato si può controllare in automatico, i modelli migliorano rapidamente lì. Gli ultimi: cybersecurity, hacking, motion graphics, montaggio video, modellazione 3D, l'uso del computer. Lo ritroviamo negli agenti.</p>`,
    anima: (t, q) => {
      entra(t, q('.cf-r1'));
      entra(t, q('.cf-amb > span:first-child'), { da: 'niente', pos: '+=0.2' });
      entra(t, q('.cf-pill'), { da: 'scala', stagger: 0.1, dur: 0.4 });
    },
  });

  // ---------- ragionare ----------
  F.scena('cot', `
    <div class="kicker at" style="left:140px;top:110px">Chain of thought</div>
    <h2 class="at ct-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Ragionare è <em>scrivere prima di rispondere</em></h2>
    <div class="at card ct-q" style="left:150px;top:330px;width:1620px;font-size:31px">Un panino e una bibita costano 1,10 €. Il panino costa 1 € più della bibita. <b>Quanto costa la bibita?</b></div>
    <div class="at ct-a1" style="left:150px;top:470px;width:600px">
      <div class="mono muted" style="font-size:22px;margin-bottom:8px">risposta diretta</div>
      <div class="card" style="font:600 46px var(--head)">0,10 € <span style="color:var(--accent)">✗</span></div></div>
    <div class="at ct-a2" style="left:820px;top:470px;width:950px">
      <div class="mono acc" style="font-size:22px;margin-bottom:8px">«pensiamo passo per passo»</div>
      <div class="card" style="font-size:29px;line-height:1.5;font-family:var(--mono)"><span class="ct-r">bibita = x, panino = x + 1</span><br><span class="ct-r">x + (x + 1) = 1,10 → 2x = 0,10</span><br><span class="ct-r" style="font:600 40px var(--head)">x = 0,05 € <span style="color:var(--ok)">✓</span></span></div></div>
    <p class="at ct-k" style="left:150px;top:780px;width:1620px;font-size:30px">Con «pensiamo passo per passo», nel 2022, le risposte giuste a un test di aritmetica passano dal <b>17,7%</b> al <b>78,7%</b> (Kojima e colleghi).</p>
    <p class="at ct-c" style="left:150px;top:870px;width:1620px;font-size:30px">Perché funziona? Ogni token in più è un altro giro della macchina: <b>più token, più calcolo</b>. I modelli «che ragionano» (dal 2024) sono addestrati con RLVR a farlo da soli.</p>
  `);

  F.passo({
    id: 'cot', scena: 'cot', titolo: 'Ragionare: la risposta diretta',
    note: `<p>È il problema della mazza e della palla di Kahneman, in versione italiana. Fatelo rispondere alla sala, di getto.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.ct-tit')[0], { pos: '-=0.2' });
      entra(t, q('.ct-q'));
      entra(t, q('.ct-a1'), { pos: '+=0.4' });
    },
  });

  F.passo({
    id: 'cot-passo', scena: 'cot', titolo: 'Ragionare: passo per passo',
    note: `<p>Kojima e colleghi, "Large Language Models are Zero-Shot Reasoners" (2022): aggiungere "Let's think step by step" faceva passare il modello di allora dal 17,7% al 78,7% sul test MultiArith.</p><p>La catena di pensiero è campionamento: il modello sceglie un token alla volta anche mentre "ragiona". Ragionare più a lungo vuol dire fare più calcolo, e costa di più.</p>`,
    anima: (t, q) => {
      entra(t, q('.ct-a2 .mono, .ct-a2 .card'), { da: 'niente', dur: 0.3 });
      entra(t, q('.ct-r'), { da: 'sinistra', stagger: 0.5, dur: 0.5 });
      entra(t, q('.ct-k'), { pos: '+=0.3' });
      entra(t, q('.ct-c'), { pos: '+=0.3' });
    },
  });

  F.scena('energia', `
    <div class="kicker at" style="left:140px;top:110px">Il costo del pensiero</div>
    <h2 class="at en-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Ogni token <em>consuma</em></h2>
    <div class="at en-n" style="left:150px;top:320px;width:880px"><div class="grande" style="font-size:180px">0,24 Wh</div>
      <div style="font-size:32px;margin-top:6px">per una domanda di testo tipica a Gemini <span class="muted">(stima di Google, agosto 2025)</span></div>
      <div style="font-size:32px;margin-top:6px">≈ <b>9 secondi</b> di televisione accesa</div></div>
    ${rischio({
      id: 'r-energia', x: 1100, y: 330, w: 680,
      titolo: 'Poco per una domanda, tanto per miliardi',
      testo: 'Una risposta consuma poco. Ma le richieste sono miliardi al giorno, e un modello che ragiona a lungo, o un video generato, consuma molto più di una risposta breve. I data center per l\'IA sono tra le prime cause di crescita della domanda di elettricità.',
    })}
  `);

  F.passo({
    id: 'energia', scena: 'energia', titolo: 'Riquadro: energia',
    note: `<p>Il dato di Google (agosto 2025) è una mediana: 0,24 Wh, 0,03 grammi di CO₂ equivalente, 0,26 millilitri d'acqua per una richiesta di testo. Le richieste lunghe, con ragionamento o con immagini e video, costano molto di più.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.en-tit')[0], { pos: '-=0.2' });
      entra(t, q('.en-n'), { da: 'scala' });
      avvisa(t, '#r-energia', { pos: '+=0.4' });
    },
  });

  // ---------- strumenti ----------
  F.scena('tool', `
    <div class="kicker at" style="left:140px;top:110px">Tool calling</div>
    <h2 class="at tl-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Il modello non fa: <em>chiede</em></h2>
    ${bolla('utente', 'Che tempo fa a Siena adesso?', 'tl-1', 900, 330, 800)}
    <div class="at card tl-2" style="left:160px;top:440px;width:820px;font-family:var(--mono);font-size:28px"><div class="muted" style="font-size:20px">il modello scrive</div>{"strumento": "meteo", "città": "Siena"}</div>
    <div class="at tl-3" style="left:1040px;top:470px;width:720px;font-size:28px">→ <span class="pill">un programma</span> chiama davvero il servizio meteo</div>
    <div class="at card tl-4" style="left:160px;top:600px;width:820px;font-family:var(--mono);font-size:28px"><div class="muted" style="font-size:20px">il risultato rientra nel testo</div>{"temperatura": 14, "cielo": "nuvoloso"}</div>
    ${bolla('assistente', 'A Siena ci sono 14 gradi, con cielo nuvoloso.', 'tl-5', 160, 770, 820)}
    <p class="at tl-p" style="left:1040px;top:640px;width:720px;font-size:30px">Il modello sa solo scrivere testo. Ma se un programma esegue quello che scrive, il testo diventa un'<b>azione</b>. Toolformer (Meta) e le «function call» (OpenAI): 2023.</p>
    <p class="at lead tl-p2" style="left:1040px;top:880px;width:720px;font-size:28px">È il seme degli agenti.</p>
  `);

  F.passo({
    id: 'tool', scena: 'tool', titolo: 'Tool calling',
    note: `<p>Il modello impara (con esempi e rinforzo) a scrivere richieste in un formato preciso. Il programma che lo ospita le riconosce, le esegue e rimette il risultato nel testo. Poi il modello continua.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.tl-tit')[0], { pos: '-=0.2' });
      entra(t, q('.tl-1'), { da: 'basso' });
      entra(t, q('.tl-2'), { da: 'sinistra', pos: '+=0.3' });
      entra(t, q('.tl-3'), { pos: '+=0.2' });
      entra(t, q('.tl-4'), { da: 'sinistra', pos: '+=0.4' });
      entra(t, q('.tl-5'), { da: 'basso', pos: '+=0.4' });
      entra(t, q('.tl-p'), { pos: '-=0.2' });
      entra(t, q('.tl-p2'), { pos: '+=0.2' });
    },
  });

  // ---------- allucinazioni ----------
  F.scena('allucinazioni', `
    <div class="kicker at" style="left:140px;top:110px">Allucinazioni</div>
    <h2 class="at al-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Perché <em>inventa</em></h2>
    <p class="at al-p1" style="left:150px;top:320px;width:820px;font-size:32px">Il modello prevede la continuazione <b>più plausibile</b>. Una citazione inventata, un libro che non esiste, una sentenza mai scritta possono essere plausibilissimi.</p>
    <div class="at card al-esame" style="left:150px;top:540px;width:820px;font-size:29px">
      <div class="mono muted" style="font-size:22px;margin-bottom:10px">e poi c'è l'esame</div>
      Domanda a crocette: 4 risposte, una giusta.<br>
      «Non lo so» → <b>0 punti</b>. Tirare a indovinare → <b>0,25 punti</b> in media.<br>
      <span class="acc">Se i test premiano chi risponde sempre, il modello impara a rispondere sempre.</span>
      <div class="didascalia" style="margin-top:10px">OpenAI, «Why language models hallucinate», 2025</div></div>
    ${rischio({
      id: 'r-alluc', x: 1080, y: 330, w: 700,
      titolo: 'Scrive con la stessa sicurezza quando sbaglia',
      testo: 'Il tono non dice niente sulla verità. Marzo 2025, Tribunale di Firenze: in un atto compaiono sentenze della Cassazione che non esistono, trovate con ChatGPT. Ogni fonte, numero e citazione va controllato.',
      fonte: 'Tribunale di Firenze, sez. imprese, ordinanza del 14 marzo 2025',
    })}
  `);

  F.passo({
    id: 'allucinazioni', scena: 'allucinazioni', titolo: 'Allucinazioni: perché',
    note: `<p>Due cause: il modello genera ciò che è plausibile, non ciò che è vero; e l'addestramento e i test (benchmark) premiano chi risponde rispetto a chi ammette di non sapere.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.al-tit')[0], { pos: '-=0.2' });
      entra(t, q('.al-p1'));
      entra(t, q('.al-esame'), { pos: '+=0.3' });
    },
  });

  F.passo({
    id: 'r-allucinazioni', scena: 'allucinazioni', titolo: 'Riquadro: allucinazioni',
    note: `<p>Il caso di Firenze è italiano; il più famoso è Mata contro Avianca (New York, 2023): avvocati multati per sei precedenti inventati. Da allora i casi sono centinaia.</p>`,
    anima: (t) => { avvisa(t, '#r-alluc'); },
  });

  // ---------- testi generati ----------
  const FRASE_F = ['Il', 'mare', 'di', 'sera', 'ha', 'un', 'colore', 'che', 'sembra', 'quasi', 'viola', 'e', 'le', 'barche', 'tornano', 'piano'];
  const VERDI = [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1];
  F.scena('testi', `
    <div class="kicker at" style="left:140px;top:110px">Riconoscere un testo generato</div>
    <h2 class="at tg-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Detector e <em>filigrane</em></h2>
    ${rischio({
      id: 'r-detector', x: 150, y: 320, w: 760,
      titolo: 'I rilevatori sbagliano',
      testo: 'E sbagliano di più con chi scrive in una lingua non sua: più di metà dei temi di studenti non madrelingua (TOEFL) segnalati come generati. OpenAI ha ritirato il suo rilevatore nel 2023: riconosceva il 26% dei testi generati.',
      fonte: 'Liang e colleghi, Patterns, 2023',
    })}
    <div class="at tg-fil" style="left:1000px;top:320px;width:780px">
      <div style="font:600 38px var(--head);margin-bottom:12px">La filigrana</div>
      <p style="font-size:28px;margin-bottom:18px">Chi genera divide le parole in «verdi» e «rosse» con una chiave segreta, e sceglie un po' più spesso le verdi. Chi ha la chiave conta le verdi.</p>
      <div class="tg-frase" style="font-family:var(--head);font-size:34px;line-height:1.7">${FRASE_F.map((w, k) => `<span class="tg-w" data-v="${VERDI[k]}">${w}</span>`).join(' ')}</div>
      <div class="tg-conto mono" style="font-size:24px;margin-top:10px">verdi: 13 su 16 · in un testo umano ci si aspetta circa la metà</div>
      <div class="didascalia" style="margin-top:8px">Kirchenbauer e colleghi, 2023 · SynthID Text (Google), Nature, 2024</div></div>
    ${qr('filigrana', 'Provate voi: <em style="color:var(--accent)">La filigrana</em>', 'Generate un testo con la filigrana, poi provate a toglierla.', 'nunziati.github.io/…/modulo-b/demo/filigrana.html', 'tg-qr', 150, 830)}
  `);

  F.passo({
    id: 'detector-testo', scena: 'testi', titolo: 'Riquadro: i rilevatori sbagliano',
    note: `<p>Il caso tocca scuola e università: un detector che sbaglia su chi scrive in una lingua non sua accusa ingiustamente proprio chi è già in difficoltà. Liang e colleghi (Stanford, 2023): in media il 61% dei temi TOEFL segnalati come generati.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.tg-tit')[0], { pos: '-=0.2' });
      avvisa(t, '#r-detector', { pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'filigrana-testo', scena: 'testi', titolo: 'La filigrana nei testi',
    note: `<p>La filigrana funziona solo se chi genera la mette, e si indebolisce se il testo viene riscritto. Nella demo si vede bene.</p><p><b>Demo nostra:</b> La filigrana.</p>`,
    anima: (t, q) => {
      entra(t, q('.tg-fil'), { da: 'destra' });
      t.to(q('.tg-w[data-v="1"]'), { color: C('--ok'), stagger: 0.06, duration: 0.2 }, '+=0.2');
      t.to(q('.tg-w[data-v="0"]'), { color: C('--accent'), duration: 0.2 }, '<0.3');
      entra(t, q('.tg-qr'), { pos: '+=0.3' });
    },
  });
})();
