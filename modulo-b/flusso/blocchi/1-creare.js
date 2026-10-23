// Blocco 1 — Da prevedere a creare: il falsario e il detective, i volti che non esistono, su cosa si sono allenati.
(() => {
  const { entra, esce, disegna, parole, rischio, avvisa } = F;

  F.blocco('1', 'Da prevedere a creare');

  F.scena('b1', `
    <div class="at grande b1-n" style="left:140px;top:170px">1</div>
    <h1 class="at b1-tit" style="left:140px;top:430px;width:1500px">Da prevedere<br><em>a creare</em></h1>
    <p class="at lead b1-lead" style="left:140px;top:760px;width:1400px">Immagini, video, suoni e voci: come nascono, e perché a volte non tornano.</p>
  `);

  F.passo({
    id: 'b1', scena: 'b1', titolo: 'Blocco 1 · Da prevedere a creare',
    note: `<p>Prima tappa: le immagini. Partiamo dall'idea più semplice e più "cattiva": due reti che giocano una contro l'altra.</p>`,
    anima: (t, q) => {
      entra(t, q('.b1-n'), { da: 'scala', dur: 0.9, ease: 'back.out(1.6)' });
      parole(t, q('.b1-tit')[0], { pos: '-=0.4' });
      entra(t, q('.b1-lead'), { pos: '-=0.2' });
    },
  });

  // Il gioco del falsario e del detective (GAN). Le immagini del falsario sono il volto finale
  // con sempre meno rumore: servono a far vedere l'idea, non sono le uscite vere di un addestramento.
  const ROUND = ['round 1', 'round 50', 'round 500', 'round 5.000', 'round 50.000'];
  const SICUREZZA = [99, 93, 81, 64, 50];
  F.scena('gan', `
    <div class="kicker at" style="left:140px;top:110px">Il falsario e il detective</div>
    <h2 class="at g-tit" style="left:140px;top:160px;width:1640px;font-size:72px">Due reti, <em>una contro l'altra</em></h2>

    <img class="at foto g-vera" src="img/vera-cristoforetti.jpg" style="left:150px;top:400px;width:250px;height:250px" alt="foto vera">
    <img class="at foto g-vera" src="img/vera-parmitano.jpg" style="left:200px;top:450px;width:250px;height:250px" alt="foto vera">
    <div class="at didascalia g-vera-cap" style="left:150px;top:722px;width:320px">foto vere<br>(esempi di addestramento)</div>

    <svg class="tela" viewBox="0 0 1920 1080">
      <line class="g-fr1" x1="470" y1="560" x2="830" y2="560" stroke="var(--muted)" stroke-width="4"/>
      <line class="g-fr2" x1="1220" y1="560" x2="1092" y2="560" stroke="var(--muted)" stroke-width="4"/>
      <g class="g-det"><circle cx="960" cy="560" r="118" fill="var(--fg)"/><text x="960" y="586" text-anchor="middle" font-size="76" fill="#fff">Σ</text></g>
      <text class="g-det-l" x="960" y="730" text-anchor="middle" font-size="36" font-weight="600">il detective</text>
      <text class="g-det-l" x="960" y="772" text-anchor="middle" font-size="28" fill="var(--muted)">vero o falso?</text>
      <text class="g-det-a" x="960" y="410" text-anchor="middle" font-size="24" fill="var(--accent)" font-family="JetBrains Mono, monospace">il classificatore del modulo A</text>
      <line class="g-fr3" x1="1660" y1="560" x2="1520" y2="560" stroke="var(--muted)" stroke-width="4"/>
    </svg>

    <div class="at g-imm" style="left:1230px;top:430px;width:260px;height:260px">
      ${[0, 1, 2, 3].map(k => `<img class="foto g-f g-f${k}" src="img/falsario-${k}.jpg" style="position:absolute;inset:0;width:260px;height:260px" alt="">`).join('')}
      <img class="foto g-f g-f4" src="img/gan-donna.jpg" style="position:absolute;inset:0;width:260px;height:260px" alt="">
      <div class="timbro g-falso" style="position:absolute;left:30px;top:180px">FALSO</div>
      <div class="timbro g-boh" style="position:absolute;left:58px;top:180px;color:var(--accent-2);border-color:var(--accent-2)">BOH?</div>
    </div>
    ${ROUND.map((r, k) => `<div class="at didascalia g-round g-r${k}" style="left:1230px;top:390px">${r}</div>`).join('')}

    <div class="at card g-fals" style="left:1670px;top:440px;width:210px;height:240px;padding:22px;text-align:center">
      <div style="font-family:var(--head);font-weight:600;font-size:34px;line-height:1.1">il<br>falsario</div>
      <div style="margin:18px auto 0;width:96px;height:72px;border-radius:8px;background:url(img/falsario-0.jpg) center/cover"></div>
      <div class="didascalia" style="margin-top:8px">parte dal rumore</div>
    </div>

    <div class="at g-metro" style="left:760px;top:830px;width:400px">
      <div class="didascalia" style="margin-bottom:8px">sicuro che sia falsa: <b style="color:var(--fg)"><span class="g-perc">99</span>%</b></div>
      <div style="height:16px;border-radius:8px;background:var(--line);overflow:hidden"><div class="g-barra" style="height:100%;width:100%;background:var(--accent);transform-origin:0 0;transform:scaleX(.99)"></div></div>
    </div>
    <p class="at g-fine" style="left:140px;top:940px;width:1640px;font-size:34px">Ognuno impara dagli errori dell'altro, finché il detective non distingue più. Si chiama <b>GAN</b> (Goodfellow e colleghi, 2014).</p>
  `);

  F.passo({
    id: 'detective', scena: 'gan', titolo: 'Il detective',
    note: `<p>Il detective è un classificatore come quelli del modulo A: guarda una foto e dice "vera" o "falsa". Lo alleniamo con foto vere.</p><p>Le due foto vere sono ritratti ufficiali NASA di Samantha Cristoforetti e Luca Parmitano.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      parole(t, q('.g-tit')[0], { pos: '-=0.2' });
      entra(t, q('.g-vera'), { da: 'sinistra', stagger: 0.15 });
      entra(t, q('.g-vera-cap'), { da: 'niente', pos: '-=0.3' });
      disegna(t, q('.g-fr1'), { dur: 0.6 });
      entra(t, q('.g-det'), { da: 'scala', ease: 'back.out(1.5)', pos: '-=0.2' });
      entra(t, q('.g-det-l'), { stagger: 0.1, pos: '-=0.3' });
      entra(t, q('.g-det-a'), { da: 'basso', pos: '+=0.2' });
    },
  });

  F.passo({
    id: 'falsario', scena: 'gan', titolo: 'Il falsario',
    note: `<p>Il falsario è un'altra rete: riceve numeri a caso, il rumore, e deve produrre un'immagine. All'inizio produce solo rumore, e il detective lo smaschera subito.</p>`,
    anima: (t, q) => {
      entra(t, q('.g-fals'), { da: 'destra' });
      disegna(t, q('.g-fr3'), { dur: 0.5 });
      entra(t, q('.g-f0'), { da: 'scala', dur: 0.6 });
      entra(t, q('.g-r0'), { da: 'niente', pos: '<' });
      disegna(t, q('.g-fr2'), { dur: 0.5 });
      entra(t, q('.g-falso'), { da: 'scala', dur: 0.35, ease: 'back.out(3)', pos: '+=0.2' });
      entra(t, q('.g-metro'), { pos: '-=0.1' });
    },
  });

  F.passo({
    id: 'gara', scena: 'gan', titolo: 'La gara',
    note: `<p>Il detective gli dice dove ha sbagliato, il falsario corregge i pesi; poi si allena di nuovo il detective, e così via. Dopo decine di migliaia di round il detective tira a indovinare: 50%.</p><p>Le immagini intermedie sono una ricostruzione per far vedere l'idea, non le uscite vere di un addestramento.</p>`,
    anima: (t, q) => {
      for (let k = 1; k <= 4; k++) {
        esce(t, q('.g-falso'), { dur: 0.15, pos: k === 1 ? '+=0' : '+=0.25' });
        entra(t, q('.g-f' + k), { da: 'niente', dur: 0.55 });
        esce(t, q('.g-r' + (k - 1)), { dur: 0.2, pos: '<' });
        entra(t, q('.g-r' + k), { da: 'niente', dur: 0.3, pos: '<' });
        t.to(q('.g-barra'), { scaleX: SICUREZZA[k] / 100, duration: 0.55, ease: 'power2.out' }, '<');
        t.to(q('.g-perc'), { innerText: SICUREZZA[k], snap: { innerText: 1 }, duration: 0.55 }, '<');
        if (k < 4) entra(t, q('.g-falso'), { da: 'scala', dur: 0.3, ease: 'back.out(3)', pos: '+=0.1' });
      }
      entra(t, q('.g-boh'), { da: 'scala', dur: 0.4, ease: 'back.out(3)', pos: '+=0.15' });
      entra(t, q('.g-fine'), { pos: '+=0.3' });
    },
  });

  const VOLTI = ['gan-donna', 'gan-uomo', 'gan-ragazzo', 'gan-tpdne'];
  F.scena('volti', `
    <h2 class="at v-tit" style="left:140px;top:130px;width:1640px">Queste persone <em>non esistono</em></h2>
    ${VOLTI.map((v, k) => `<img class="at foto v-foto" src="img/${v}.jpg" style="left:${140 + k * 410}px;top:290px;width:370px;height:370px" alt="volto generato">`).join('')}
    <div class="at didascalia v-cap" style="left:140px;top:686px">StyleGAN (2019) · immagini di pubblico dominio da Wikimedia Commons</div>
    <div class="at qr v-qr" style="left:140px;top:770px">
      <img src="qr/whichfaceisreal.svg" alt="QR code">
      <div><div style="font-family:var(--head);font-weight:600;font-size:44px">Quale delle due è vera?</div>
        <div style="font-size:30px;color:var(--muted);margin-top:6px">Provate voi: ogni volta un volto vero e uno generato.</div>
        <div class="url">whichfaceisreal.com</div></div>
    </div>
  `);

  F.passo({
    id: 'volti', scena: 'volti', titolo: 'Queste persone non esistono',
    note: `<p>Volti generati da StyleGAN nel 2019; il sito thispersondoesnotexist ne mostrava uno nuovo a ogni ricarica.</p><p><b>Demo:</b> Which Face Is Real (Università di Washington). Due minuti, poi chiedete: da cosa li avete riconosciuti? (sfondi, orecchini, capelli che si fondono con lo sfondo). I generatori di oggi non hanno più quei difetti.</p>`,
    anima: (t, q) => {
      parole(t, q('.v-tit')[0]);
      entra(t, q('.v-foto'), { da: 'scala', stagger: 0.15, dur: 0.8, pos: '-=0.3' });
      entra(t, q('.v-cap'), { da: 'niente', pos: '-=0.2' });
      entra(t, q('.v-qr'), { pos: '+=0.2' });
    },
  });

  // Il dataset FFHQ: un provino di ritratti stilizzati al posto delle foto vere.
  const TONI = ['var(--line)', '#CDBFAD', 'var(--muted)', '#A89A8A'];
  const mosaico = Array.from({ length: 160 }, (_, k) => {
    const c = k % 16, r = Math.floor(k / 16), x = c * 52, y = r * 52, tono = TONI[(c * 7 + r * 5 + (c * r) % 3) % 4];
    return `<g class="m-q"><rect x="${x}" y="${y}" width="46" height="46" rx="6" fill="var(--surface)"/>
      <circle cx="${x + 23}" cy="${y + 18}" r="8" fill="${tono}"/><path d="M${x + 9} ${y + 44} Q${x + 23} ${y + 24} ${x + 37} ${y + 44} Z" fill="${tono}"/></g>`;
  }).join('');
  F.scena('dati-volti', `
    <div class="kicker at" style="left:140px;top:130px">Su cosa si è allenato?</div>
    <div class="at grande dv-n" style="left:130px;top:180px;font-size:210px">0</div>
    <p class="at dv-t" style="left:140px;top:400px;width:820px;font-size:44px;line-height:1.25">foto di volti prese da Flickr, scelte tra quelle con licenze libere.</p>
    <div class="at didascalia dv-c" style="left:140px;top:540px">dataset FFHQ · Karras, Laine e Aila (NVIDIA), 2019</div>
    <svg class="at dv-m" viewBox="0 0 830 520" style="left:140px;top:600px;width:830px;height:390px">${mosaico}</svg>
    ${rischio({
      id: 'r-consenso', x: 1100, y: 330, w: 680,
      titolo: 'Copyright e consenso',
      testo: 'Quelle foto si potevano riusare. Ma chi era ritratto non aveva mai detto sì a diventare un dato di addestramento. E per le immagini prese dal web senza permesso, artisti ed editori sono in tribunale.',
      fonte: 'FFHQ: licenze CC BY, CC BY-NC, pubblico dominio',
    })}
  `);

  F.passo({
    id: 'dati-volti', scena: 'dati-volti', titolo: 'Il dataset dei volti',
    note: `<p>Un generatore impara da esempi, come ogni modello del modulo A. Per i volti di StyleGAN: 70.000 foto da Flickr, solo con licenze che ne permettevano il riuso.</p>`,
    anima: (t, q) => {
      entra(t, q('.kicker'), { dur: 0.5 });
      entra(t, q('.dv-n'), { da: 'scala', ease: 'back.out(1.4)' });
      t.to(q('.dv-n'), { innerText: 70000, snap: { innerText: 1000 }, duration: 1.2, ease: 'power2.out',
        modifiers: { innerText: v => Number(v).toLocaleString('it-IT') } }, '<');
      entra(t, q('.dv-t'), { pos: '-=0.6' });
      entra(t, q('.dv-c'), { da: 'niente', pos: '-=0.3' });
      entra(t, q('.m-q'), { da: 'scala', dur: 0.3, stagger: { each: 0.006, from: 'random' }, pos: '-=0.5' });
    },
  });

  F.passo({
    id: 'consenso', scena: 'dati-volti', titolo: 'Riquadro: copyright e consenso',
    note: `<p>Primo riquadro della giornata. Il punto non è "è illegale", è che la licenza di una foto non è il consenso di chi c'è dentro.</p><p>Cause in corso: Getty Images contro Stability AI, gli artisti contro Stability e Midjourney. Ne riparliamo con i testi (gli editori e gli autori contro OpenAI e Anthropic).</p>`,
    anima: (t, q) => { avvisa(t, '#r-consenso'); },
  });
})();
