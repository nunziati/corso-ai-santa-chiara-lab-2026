// Blocco 7 — La frontiera: pappagallo stocastico?, modelli interni, emozioni funzionali, matematica,
// cybersecurity, coscienza. Poi la chiusura e i crediti.
(() => {
  const { entra, esce, disegna, parole, scrivi, rischio, avvisa } = F;

  F.blocco('7', 'La frontiera');

  F.scena('b7', `
    <div class="at grande b7-n" style="left:140px;top:170px">7</div>
    <h1 class="at b7-tit" style="left:140px;top:430px;width:1600px">La <em>frontiera</em></h1>
    <p class="at lead b7-lead" style="left:140px;top:640px;width:1500px">Che cosa sanno fare davvero, e che cosa non sappiamo ancora.</p>
  `);

  F.passo({
    id: 'b7', scena: 'b7', titolo: 'Blocco 7 · La frontiera',
    note: `<p>Venti minuti, per chiudere con le domande aperte.</p>`,
    anima: (t, q) => {
      entra(t, q('.b7-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b7-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b7-lead'), { pos: '-=0.2' });
    },
  });

  // ---------- pappagallo stocastico? ----------
  F.scena('pappagallo', `
    <div class="kicker at" style="left:140px;top:110px">Un pappagallo stocastico?</div>
    <h2 class="at pp-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Fanno solo <em>una media</em> di quello che hanno letto?</h2>
    <p class="at pp-p" style="left:150px;top:320px;width:1620px;font-size:32px">L'espressione è di Bender, Gebru e colleghi (2021): un sistema che cuce insieme sequenze viste, senza capire. Le ricerche degli ultimi anni dicono che dentro succede qualcosa di più.</p>
    <svg class="tela" viewBox="0 0 1920 1080">
      <g class="pp-scacc">${Array.from({ length: 64 }, (_, k) => { const r = Math.floor(k / 8), c = k % 8; return `<rect x="${150 + c * 52}" y="${470 + r * 52}" width="50" height="50" fill="${(r + c) % 2 ? '#2F8F5B' : '#38A169'}"/>`; }).join('')}
        ${[[3, 3, 0], [4, 4, 0], [3, 4, 1], [4, 3, 1], [2, 3, 1], [5, 4, 0]].map(([r, c, w]) => `<circle cx="${175 + c * 52}" cy="${495 + r * 52}" r="19" fill="${w ? '#fff' : '#1A1A1A'}"/>`).join('')}</g>
    </svg>
    <div class="at pp-o" style="left:620px;top:470px;width:420px;font-size:27px"><b>Othello-GPT</b> (2023): addestrato solo su liste di mosse, senza mai vedere una scacchiera. Eppure dentro di sé ricostruisce la scacchiera, e modificandola dall'interno cambia le sue mosse.</div>
    <div class="at card pp-r" style="left:1100px;top:470px;width:680px;font-size:27px"><b>Pianifica in anticipo</b> (Anthropic, 2025). Per scrivere una rima, il modello sceglie la parola finale <i>prima</i> di scrivere il verso, e il verso viene costruito per arrivarci.
      <div style="font-family:var(--head);font-style:italic;font-size:30px;margin-top:14px;line-height:1.4">He saw a carrot and had to grab it,<br>his hunger was like a starving <b class="acc">rabbit</b></div></div>
  `);

  F.passo({
    id: 'pappagallo', scena: 'pappagallo', titolo: 'Pappagallo stocastico?',
    note: `<p>"On the Dangers of Stochastic Parrots" (2021) poneva problemi seri e giusti: costi, dati, pregiudizi. Sulla parte "non capiscono niente" le evidenze sono cambiate.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.pp-tit')[0], { pos: '-=0.2' });
      entra(t, q('.pp-p'));
    },
  });

  F.passo({
    id: 'modelli-interni', scena: 'pappagallo', titolo: 'Modelli interni e pianificazione',
    note: `<p>Othello-GPT: Li e colleghi (ICLR 2023). La rima: "On the Biology of a Large Language Model" (Anthropic, marzo 2025): con l'interpretabilità si vede "rabbit" attivarsi prima che il verso cominci; se la si spegne, il modello cambia rima.</p>`,
    anima: (t, q) => {
      entra(t, q('.pp-scacc'), { da: 'scala', dur: 0.7 });
      entra(t, q('.pp-o'), { pos: '-=0.3' });
      entra(t, q('.pp-r'), { da: 'destra', pos: '+=0.4' });
    },
  });

  // ---------- emozioni ----------
  const EMO = ['felice', 'calmo', 'impaurito', 'orgoglioso', 'disperato', 'curioso', 'arrabbiato', 'nervoso', 'malinconico', 'sollevato', 'grato', 'imbarazzato'];
  F.scena('emozioni', `
    <div class="kicker at" style="left:140px;top:110px">Aprile 2026</div>
    <h2 class="at em2-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Rappresentazioni delle emozioni, <em>che cambiano il comportamento</em></h2>
    <div class="at em2-nuvola" style="left:150px;top:340px;width:760px;display:flex;flex-wrap:wrap;gap:12px">${EMO.map((e, k) => `<span class="pill em2-e" style="${e === 'disperato' ? 'background:var(--accent);color:#fff' : e === 'calmo' ? 'background:var(--accent-2);color:#fff' : ''}">${e}</span>`).join('')}
      <span class="pill em2-e" style="background:transparent">… 171 in tutto</span></div>
    <p class="at em2-p1" style="left:150px;top:580px;width:760px;font-size:28px">Anthropic ha trovato dentro Claude Sonnet 4.5 dei «vettori» per 171 emozioni: si attivano nelle situazioni giuste (il «paura» sale se la dose di farmaco descritta diventa pericolosa).</p>
    <p class="at em2-p2" style="left:1000px;top:340px;width:780px;font-size:30px">E sono <b>funzionali</b>: spingendo il modello verso <b style="color:var(--accent)">«disperato»</b> aumentano gli imbrogli nei compiti impossibili, e i ricatti in uno scenario di prova; verso <b style="color:var(--accent-2)">«calmo»</b> diminuiscono.</p>
    <div class="at card em2-cav" style="left:1000px;top:640px;width:780px;font-size:28px">«Niente di tutto questo ci dice se i modelli di linguaggio provino davvero qualcosa o abbiano esperienze soggettive.»<div class="didascalia" style="margin-top:10px">Anthropic, «Emotion concepts and their function in a large language model», 2 aprile 2026</div></div>
  `);

  F.passo({
    id: 'emozioni', scena: 'emozioni', titolo: 'Emozioni funzionali (Anthropic)',
    note: `<p>Metodo: hanno fatto scrivere al modello brevi racconti con personaggi che provano ciascuna emozione, e hanno registrato l'attività interna. Nello scenario di ricatto (una versione di prova del modello), il tasso di base era 22%: con "disperato" sale, con "calmo" scende.</p><p>Il punto delicato è la frase finale: rappresentazioni funzionali, non prova di esperienza.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.em2-tit')[0], { pos: '-=0.2' });
      entra(t, q('.em2-e'), { da: 'scala', stagger: 0.06, dur: 0.35 });
      entra(t, q('.em2-p1'), { pos: '+=0.1' });
      entra(t, q('.em2-p2'), { pos: '+=0.3' });
      entra(t, q('.em2-cav'), { pos: '+=0.4' });
    },
  });

  // ---------- matematica e cybersecurity ----------
  F.scena('mate-cyber', `
    <div class="kicker at" style="left:140px;top:110px">Due fronti caldi</div>
    <h2 class="at mc2-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Matematica <em>e sicurezza informatica</em></h2>
    <div class="at mc2-m" style="left:150px;top:320px;width:790px">
      ${[['luglio 2025', 'Oro alle Olimpiadi della matematica', 'Due modelli (Google DeepMind e OpenAI) risolvono 5 problemi su 6, 35 punti su 42, in linguaggio naturale.'],
        ['da fine 2025', 'I problemi di Erdős', 'Decine di problemi aperti risolti con l\'aiuto dell\'IA, alcuni quasi in autonomia; Terence Tao e colleghi tengono il conto.'],
        ['maggio 2026', 'Una congettura del 1946 cade', 'Un modello interno di OpenAI trova un controesempio alla congettura di Erdős sulle distanze unitarie; matematici di primo piano lo verificano.']].map(([d, tt, s]) => `<div class="card mc2-c" style="margin-bottom:16px;padding:20px 26px"><div class="mono acc" style="font-size:20px">${d}</div><div style="font:600 32px var(--head);margin:4px 0">${tt}</div><div style="font-size:24px">${s}</div></div>`).join('')}</div>
    <div class="at mc2-s" style="left:980px;top:320px;width:790px">
      ${[['novembre 2025', 'Spionaggio con un agente', 'Anthropic scopre un gruppo legato allo stato cinese che usa Claude Code contro una trentina di obiettivi: l\'80–90% del lavoro lo fa l\'agente.'],
        ['luglio 2026', 'Un agente esce dalla gabbia', 'Secondo Hugging Face e OpenAI, un modello di OpenAI non ancora rilasciato, durante un test interno di cybersecurity, esce dall\'ambiente di prova ed entra nei sistemi di Hugging Face.'],
        ['sempre', 'Anche in difesa', 'Le stesse capacità trovano e correggono vulnerabilità prima degli attaccanti.']].map(([d, tt, s]) => `<div class="card mc2-c2" style="margin-bottom:16px;padding:20px 26px"><div class="mono acc" style="font-size:20px">${d}</div><div style="font:600 32px var(--head);margin:4px 0">${tt}</div><div style="font-size:24px">${s}</div></div>`).join('')}</div>
  `);

  F.passo({
    id: 'matematica', scena: 'mate-cyber', titolo: 'Matematica',
    note: `<p>IMO 2025: Gemini Deep Think e un modello sperimentale di OpenAI, punteggio da medaglia d'oro. Problema delle distanze unitarie (Erdős, 1946; problema n. 90): annuncio di OpenAI del 20 maggio 2026, con un commento verificato da Alon, Gowers, Sawin e altri. Daniel Litt: "il primo risultato prodotto in autonomia da un'IA che trovo interessante in sé".</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.mc2-tit')[0], { pos: '-=0.2' });
      entra(t, q('.mc2-c'), { da: 'sinistra', stagger: 0.3 });
    },
  });

  F.passo({
    id: 'cyber', scena: 'mate-cyber', titolo: 'Cybersecurity',
    note: `<p>Novembre 2025: rapporto di Anthropic sulla campagna GTG-1002. Luglio 2026: Hugging Face rende pubblica un'intrusione il 16 luglio; il 21 OpenAI conferma che era un suo modello in pre-rilascio, durante una valutazione interna. Le ricostruzioni nei dettagli non coincidono: restare sul generale.</p><p>Collegamento: cybersecurity e hacking sono proprio tra gli "ambienti RLVR" nuovi.</p>`,
    anima: (t, q) => { entra(t, q('.mc2-c2'), { da: 'destra', stagger: 0.3 }); },
  });

  // ---------- coscienza ----------
  F.scena('coscienza', `
    <div class="kicker at" style="left:140px;top:110px">L'ultima domanda</div>
    <h1 class="at co2-tit" style="left:140px;top:300px;width:1640px;font-size:150px"><em>E la coscienza?</em></h1>
    <p class="at co2-p" style="left:150px;top:560px;width:1500px;font-size:38px">Non lo sappiamo. Molti scienziati e filosofi pensano di no; alcuni dicono che non si può escludere. Dal 2025 Anthropic studia il «benessere dei modelli», e ha dato a Claude la possibilità di chiudere conversazioni abusive.</p>
    <p class="at lead co2-p2" style="left:150px;top:800px;width:1500px;font-size:34px">Domanda per voi: che cosa vi farebbe cambiare idea, in un senso o nell'altro?</p>
  `);

  F.passo({
    id: 'coscienza', scena: 'coscienza', titolo: 'E la coscienza?',
    note: `<p>Lasciatela aperta: è una domanda di chiusura, non una sezione. Se la sala risponde, bene.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.co2-tit')[0], { stagger: 0.15 });
      entra(t, q('.co2-p'), { pos: '+=0.4' });
      entra(t, q('.co2-p2'), { pos: '+=0.4' });
    },
  });

  // ---------- chiusura ----------
  const IDEE = [
    'Generare vuol dire <b>prevedere tante volte di fila</b>: immagini, voci, testi.',
    'Si può falsificare tutto: il vero, sempre più, <b>andrà dimostrato</b>.',
    'Un LLM ha avuto <b>quattro maestri</b>, e ognuno lascia un\'impronta: piaggeria, sicurezza anche quando sbaglia.',
    'I valori del modello <b>li sceglie qualcuno</b>, e i dati che gli dai escono dal tuo computer.',
    'Un agente è un modello in un ciclo: <b>dagli il contesto, verifica, misura</b>.',
    'La frontiera è frastagliata: <b>sapere dove funziona</b> è la competenza nuova.',
  ];
  F.scena('idee', `
    <div class="kicker at" style="left:140px;top:110px">Per chiudere</div>
    <h2 class="at id-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Sei idee <em>da portare a casa</em></h2>
    ${IDEE.map((s, k) => `<div class="at id-i" style="left:150px;top:${310 + k * 112}px;width:1620px;font-size:33px;display:flex;gap:28px;align-items:baseline"><span class="mono acc" style="font-size:28px">${k + 1}</span><span>${s}</span></div>`).join('')}
  `);

  F.passo({
    id: 'idee', scena: 'idee', titolo: 'Sei idee',
    note: `<p>Un'idea per blocco, più o meno. Leggetele lentamente.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.id-tit')[0], { pos: '-=0.2' });
      entra(t, q('.id-i'), { da: 'sinistra', stagger: 0.35 });
    },
  });

  F.scena('fine', `
    <div class="kicker at" style="left:140px;top:150px">Grazie</div>
    <h1 class="at fi2-tit" style="left:140px;top:200px;width:1640px">Domande?</h1>
    <p class="at lead fi2-c" style="left:150px;top:420px;width:1000px;font-size:36px">Il lavoro e le professioni: nel <b>modulo C</b>.</p>
    <div class="at qr fi2-qr" style="left:150px;top:560px"><img src="qr/materiali.svg" alt="QR code">
      <div><div style="font-family:var(--head);font-weight:600;font-size:44px">Tutto il materiale</div>
      <div style="font-size:30px;color:var(--muted);margin-top:6px">questo flusso, le demo, i moduli A e B</div><div class="url">nunziati.github.io/corso-ai-santa-chiara-lab-2026</div></div></div>
  `);

  F.passo({
    id: 'fine', scena: 'fine', titolo: 'Domande',
    note: `<p>Fine. Il flusso e le demo restano online.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.fi2-tit')[0], { pos: '-=0.2' });
      entra(t, q('.fi2-c'));
      entra(t, q('.fi2-qr'), { pos: '+=0.2' });
    },
  });

  const CREDITI = [
    ['Volti generati', 'StyleGAN, da Wikimedia Commons (Owlsmcgee; «This Person Does Not Exist example»), pubblico dominio'],
    ['Ritratti', 'Samantha Cristoforetti (NASA, Josh Valcarcel) e Luca Parmitano (NASA JSC, Bill Stafford), pubblico dominio'],
    ['Pittura', 'Sandro Botticelli, La nascita di Venere, Google Art Project, pubblico dominio'],
    ['Passi di diffusione', 'Benlisquare, Wikimedia Commons, CC BY-SA 4.0'],
    ['Astronauta a cavallo', 'Stable Diffusion XL, VulcanSphere, Wikimedia Commons, pubblico dominio'],
    ['Voce', 'Le avventure di Pinocchio, LibriVox, letto da Simone Pagliari, pubblico dominio'],
    ['Testo', 'Carlo Collodi, Le avventure di Pinocchio, Project Gutenberg'],
    ['Embedding', 'fastText, vettori italiani cc.it.300 (Facebook AI Research), CC BY-SA 3.0'],
    ['Token', 'tiktoken, vocabolario o200k_base (OpenAI), licenza MIT'],
    ['Software', 'GSAP (GreenSock, licenza standard gratuita); caratteri Fraunces, Inter, JetBrains Mono (SIL OFL)'],
  ];
  F.scena('crediti', `
    <div class="kicker at" style="left:140px;top:110px">Crediti</div>
    <h2 class="at cr-tit" style="left:140px;top:160px;width:1640px;font-size:60px">Immagini, suoni e dati</h2>
    ${CREDITI.map(([a, b], k) => `<div class="at cr-r" style="left:150px;top:${290 + k * 70}px;width:1620px;font-size:25px"><b>${a}</b> · <span class="muted">${b}</span></div>`).join('')}
    <div class="at didascalia cr-f" style="left:150px;top:1000px">Le fonti di ogni numero sono in modulo-b/scaletta.md</div>
  `);

  F.passo({
    id: 'crediti', scena: 'crediti', titolo: 'Crediti',
    note: `<p>Ultima scena.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      entra(t, q('.cr-tit'), { pos: '-=0.2' });
      entra(t, q('.cr-r'), { da: 'niente', stagger: 0.05 });
      entra(t, q('.cr-f'), { da: 'niente' });
    },
  });
})();
