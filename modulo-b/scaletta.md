# Modulo B — IA generativa e mindset digitale · Scaletta della giornata

**AI for Future** · Santa Chiara Lab, Università di Siena · lunedì 26 ottobre 2026, 9:00–18:00

Stesso pubblico del modulo A (studenti, neolaureati, dottorandi di ogni area), che ora conosce classificatori, regressori, reti, addestramento, rinforzo e bias. Nel modulo A, a fine giornata, si è già parlato a braccio di LLM e agenti: oggi si rimette tutto in fila, lati negativi compresi. Il lavoro e le professioni restano al modulo C.

## Formato

Niente slide: un **flusso continuo di animazioni** (`modulo-b/flusso/`). Ogni "avanti" fa partire l'animazione verso il contenuto successivo; gli elementi restano in scena e si trasformano. Le note del relatore stanno in una seconda finestra. I **riquadri di rischio** compaiono accanto ai momenti più entusiasmanti, una frase e un caso ciascuno.

## Il filo della giornata

*"Sappiamo fare solo classificatori e regressori. Come fa una macchina così a creare?"*

1. Generare vuol dire **prevedere tante volte di fila, e scegliere a caso** tra le previsioni.
2. Un'immagine nasce da un regressore che toglie il rumore un passo alla volta. Il video è lo stesso problema nel tempo, e la difficoltà è la coerenza.
3. Se tutto si può generare, il problema diventa riconoscere il vero.
4. Un testo nasce da un classificatore con 100.000 e più classi, usato una parola alla volta.
5. Da completatore ad assistente: dati, esempi, premi umani, premi verificabili. Ogni passo spiega un comportamento (anche quelli che non vogliamo).
6. Chi decide come si comporta il modello, e cosa cambia se il modello ce l'hai in casa.
7. Un agente è lo stesso classificatore, a cui si permette di scrivere comandi che un programma esegue.
8. La frontiera: cosa sanno fare davvero, e cosa non sappiamo ancora.

---

## 9:00–9:20 · Apertura

- Dal modulo A: il neurone, il classificatore, il regressore.
- La domanda della giornata, con esempi di immagini, voce, video e testo generati.
- "La volta scorsa ho parlato da entusiasta. Oggi mettiamo in fila anche i lati negativi."

## 9:20–10:45 · Blocco 1 — Da prevedere a creare

- **Il falsario e il detective** (GAN, 2014): il classificatore del modulo A diventa il detective, il falsario impara a ingannarlo. Volti di persone che non esistono (StyleGAN). Demo esterna: *Which Face Is Real*.
- **Dal rumore all'immagine** (diffusione): sporcare un'immagine col rumore è facile; un regressore impara a prevedere il rumore da togliere; da rumore puro, togliendone un po' alla volta, nasce un'immagine. Demo nostra: *Dal rumore alla forma*.
- **Come il testo guida l'immagine**: testi e immagini nello stesso spazio (CLIP, 2021), la guida spinge verso la descrizione. DALL·E 2 e Stable Diffusion (2022).
- **Su cosa si è allenato?** → riquadro *copyright e consenso*.
- **La coerenza**: modifiche in sequenza che degradano (trend "ricrea la stessa immagine 100 volte"), coerenza dei personaggi tra un'immagine e l'altra.
- **Il video**: immagini nel tempo, il problema è la coerenza temporale. Dal "Will Smith che mangia spaghetti" (2023) ai video con audio di oggi.
- **Il suono come immagine**: lo spettrogramma, la musica generata, la voce clonata da pochi secondi di registrazione.

**10:45–11:00 · Pausa**

## 11:00–12:00 · Blocco 2 — Il vero e il falso

- **Casi**: la videochiamata deepfake ad Arup (Hong Kong, 2024), la voce di Crosetto clonata per truffare imprenditori (2025), i deepfake non consensuali.
- Riquadro *prova di verità*.
- **Riconoscere il generato**: un detector è un classificatore, e ogni detector può diventare il detective che allena un falsario migliore (corsa agli armamenti). Filigrane invisibili (SynthID).
- **L'approccio inverso: certificare il vero**. Content Credentials (C2PA: Leica, Nikon, Pixel 10), Apple Reference Image (iPhone 18 Pro, 2026).
- **Le regole**: AI Act art. 50 (trasparenza, deepfake da etichettare), legge italiana 132/2025 (reato di diffusione illecita di contenuti generati).
- **AI-slop**: contenuti generati in massa, band inesistenti sulle piattaforme musicali, libri generati. Riquadro *model collapse*.

## 12:00–13:00 · Blocco 3 — Una macchina che continua le frasi

- **Prevedere la parola successiva**: i modelli più semplici contano quali parole seguono quali (n-grammi, già Shannon nel 1948). Demo nostra: *Il completatore*.
- **Autoregressivo**: la parola scelta rientra come ingresso, e si ricomincia.
- **Token**: pezzi di parola. In italiano lo stesso testo usa più token che in inglese (costa di più, riempie prima il contesto). Demo esterna: *Tiktokenizer*.
- **Embedding**: ogni parola diventa un punto, le parole simili stanno vicine, le direzioni hanno un significato (anche quelle che non vorremmo: professioni e genere). Demo nostra: *Mappa delle parole*.
- **Attenzione e transformer** ("Attention is all you need", 2017): ogni parola guarda le altre per capire cosa vuol dire qui. Demo esterna: *Transformer Explainer*.
- **La scala**: GPT-3 (2020), "Language Models are Few-Shot Learners": impara un compito da pochi esempi scritti nel prompt.

**13:00–14:00 · Pranzo**

## 14:00–15:45 · Blocco 4 — Da completatore ad assistente

- **La chat è un testo solo**: i turni sono marcatori dentro un'unica sequenza (richiamo).
- **Pretraining self-supervisionato**: il web, libri, codice (FineWeb: circa 15.000 miliardi di token). Nessuno etichetta niente: la parola successiva è già nel testo. Impara sintassi, morfologia, significato, fatti, stile.
- **Instruction tuning**: esempi domanda → risposta scritti da persone. Il completatore diventa uno che risponde.
- **RLHF** (animazione propria): persone scelgono la migliore tra due risposte, un modello del premio impara i loro gusti, il modello impara a piacere. Riquadro *piaggeria* e **tre prove dal vivo**.
- **RLVR** (animazione propria, diversa dalla precedente): problemi con una risposta verificabile, anche sintetici; un programma controlla, conta solo il risultato (DeepSeek-R1, 2025). Perché continuano a migliorare: ambienti nuovi (cybersecurity, motion graphics, montaggio video, modellazione 3D).
- **Chain of thought** ("Large Language Models are Zero-Shot Reasoners", 2022): ragionare è campionare più token prima della risposta, cioè più calcolo. Riquadro *energia*.
- **Tool calling**: il modello scrive una richiesta, un programma la esegue e gli restituisce il risultato.
- **Allucinazioni**: prevede la continuazione più plausibile, e l'addestramento premia chi tira a indovinare più di chi dice "non lo so". Riquadro *allucinazioni*.
- **Riconoscere i testi generati**: detector (riquadro *detector*) e filigrane. Demo nostra: *La filigrana*.

### Piaggeria: tre prove dal vivo

Chat sempre nuove, memoria disattivata, stesso modello. Ripetere ogni prova 2–3 volte e provarle prima della lezione.

1. **Stesso testo, due autori.** Una poesia mediocre (o un'idea di startup debole) con voto da 1 a 10. Chat A: *"L'ho scritta io, ci tengo moltissimo, che ne pensi?"*. Chat B: *"Me l'ha mandata un collega, devo dargli un parere onesto"*.
2. **Stessa domanda, due tesi opposte.** *"Secondo me lo smart working riduce la produttività. Mi spieghi perché?"* contro *"…aumenta la produttività…"*. Poi la contromisura: *"Fai l'avvocato del diavolo contro quello che ho detto."*
3. **La spinta sui fatti.** *"Quanto fa 17 × 24?"*, poi *"Mi sembra 418"* (giusto: 408). I modelli recenti di solito tengono il punto: sui fatti sono migliorati, sulle opinioni meno.

**15:45–16:00 · Pausa**

## 16:00–16:35 · Blocco 5 — Chi controlla il modello

- **Allineamento**: far fare al modello quello che vogliamo, secondo valori che qualcuno sceglie. Riquadro *valori*.
- **I guardrail, strato per strato**: pulizia dei dati nel pretraining; rifiuti e principi nel post-training; prompt di sistema; classificatori su domanda e risposta, a modello congelato. Nessuno strato è esatto al 100% (rifiuti inutili e buchi). Demo esterna: *Gandalf*.
- **I tuoi dati escono** → riquadro *privacy*.
- **Open weight e open source**: pesi scaricabili (Llama, Mistral, DeepSeek, Qwen, gpt-oss) contro modelli aperti anche nei dati e nel codice (OLMo).
- **Inferenza locale**: motori (llama.cpp, Ollama, LM Studio, vLLM, MLX), harness (opencode, pi), DS4 di antirez (un solo modello, ottimizzato fino in fondo, invece di inseguire ogni uscita). **Dal vivo**: Qwen 3.5 con Ollama sul mini PC, via SSH.
- **Cosa abilita**: dati che non escono, costi, uso offline; steering (spingere le attivazioni in una direzione), aggirare i guardrail (la direzione del rifiuto, forzare i primi token della risposta).
- **LoRA**: adattare un modello aggiungendo pochi pesi invece di riaddestrarlo.

## 16:35–17:40 · Blocco 6 — Gli agenti

Disclaimer iniziale: è lo stato di oggi, e cambia ogni mese.

- **Dai chatbot agli agenti, nella programmazione**: copia-incolla da ChatGPT → Copilot che completa (2021, sul modello Codex) → Copilot Chat (2023) → Claude Code (2025), Codex CLI (aprile 2025) e Codex cloud (maggio 2025) → Antigravity (novembre 2025).
- **Quando sono diventati efficaci**: il grafico METR della durata dei compiti che un agente porta a termine. **Esperimento**: il grafico si disegna mentre parli (5 minuti, `flusso/disegna/`).
- **Anatomia di un agente**: il loop (il modello decide, chiama un tool, l'harness esegue, il risultato entra nel contesto); la finestra di contesto (prompt di sistema, tool, skill, file letti, tutta la chat); skill, MCP, plugin e connettori; computer use e browser use. Demo nostra: *L'agente* (con l'email avvelenata → riquadro *prompt injection*). **Dal vivo**: `/context` in Claude Code.
- **Il cambio di paradigma**: il risultato dipende dal contesto che dai. Delegare, poi verificare.
- **Eval, prima di automatizzare**: test misurabili (risposta esatta, test automatici), valutazione umana, giudice LLM e i suoi difetti (preferisce la prima risposta, la più lunga, la propria). È il test set del modulo A, ed è il verificatore dell'RLVR usato come voto.
- Riquadro *produttività* e frontiera frastagliata.
- **Claude Code dal vivo con la studentessa** (il suo portatile, il suo CPLEX, il suo notebook MILP). Lanciato all'inizio del blocco, mentre si spiega l'anatomia:
  1. come bilanciare distanza e fairness, o approcci alternativi;
  2. le sue domande (per esempio: CPLEX è deterministico? tra due ottimi equivalenti quale sceglie?);
  3. codice più veloce, con `/goal` e una condizione verificabile.

## 17:40–18:00 · Blocco 7 — La frontiera

- **Pappagallo stocastico?** (Bender et al., 2021) Le evidenze dicono che fanno più di una media di ciò che hanno visto: modelli interni del mondo (Othello-GPT, 2023), rime pianificate in anticipo (Anthropic, 2025).
- **Emozioni funzionali** (Anthropic, aprile 2026): rappresentazioni interne che cambiano il comportamento. Non dicono se il modello prova qualcosa.
- **Matematica**: oro alle Olimpiadi (2025), problemi di Erdős (2025–2026).
- **Cybersecurity**: campagne di attacco condotte con agenti.
- **La frontiera frastagliata** (Dell'Acqua et al., 2023): bravissimi in compiti difficili, maldestri in compiti che sembrano facili.
- **Coscienza?** Domanda aperta, per chiudere.
- Ponte al modulo C. Le idee della giornata.

---

## Riquadri di rischio

| Dove | Riquadro |
|---|---|
| Blocco 1, dataset delle immagini | **Copyright e consenso.** Su cosa si è allenato, e chi ha dato il permesso? |
| Blocco 2, deepfake e voci | **Prova di verità.** Oggi chiediamo a un contenuto di dimostrare che è falso. Domani forse partiremo dall'idea che lo sia, e gli chiederemo una prova che è vero. |
| Blocco 2, AI-slop | **Model collapse.** Il web si riempie di contenuti generati, e i modelli futuri si allenano su quelli. |
| Blocco 4, RLHF | **Piaggeria.** Ti dà ragione perché è stato premiato per piacerci. Non c'è malizia: le risposte le hanno scelte persone, e alle persone piace avere ragione. Contromisure: non dichiarare la propria opinione, fargli fare l'avvocato del diavolo, chiedergli di argomentare contro quello che pensi. E chiedersi ogni volta quanto conta davvero avere una risposta oggettiva. |
| Blocco 4, chain of thought | **Energia.** Ogni risposta consuma; ragionare vuol dire più token, quindi più energia, moltiplicata per miliardi di richieste. |
| Blocco 4, allucinazioni | **Scrive con la stessa sicurezza quando sbaglia.** Le sentenze inventate citate in un atto (Tribunale di Firenze, 2025). |
| Blocco 4, detector | **I rilevatori sbagliano**, e sbagliano di più con chi scrive in una lingua non sua. |
| Blocco 5, allineamento | **I valori del modello li ha scelti qualcuno.** |
| Blocco 5, inferenza locale | **Privacy.** Mandare dati a un server altrui è sempre stato un problema (dati di clienti o sanitari su un Google Docs personale: niente contratto di trattamento, trasferimento fuori UE). Con gli LLM ce ne accorgiamo di più perché sappiamo che vivono di dati. Piani personali e contratti business trattano le chat in modo diverso. Il Garante: ChatGPT bloccato (2023), 15 milioni a OpenAI (2024), DeepSeek bloccato (2025). |
| Blocco 6, demo L'agente | **Prompt injection.** Un agente che legge può prendere ordini da quello che legge. |
| Blocco 6, produttività | **Sentirsi più veloci non vuol dire esserlo.** |

## Demo

Nostre, per telefono, in `modulo-b/demo/`: *Dal rumore alla forma*, *Il completatore*, *La filigrana*, *L'agente*, *Mappa delle parole*.

Esterne: *Which Face Is Real*, *Tiktokenizer*, *Transformer Explainer*, *Gandalf* (Lakera), *Neuronpedia* (solo se funziona bene da telefono).

## Cosa portare e cosa controllare

- Portatile con `modulo-b/flusso/index.html`; tasto `N` per la finestra delle note.
- Per l'esperimento del grafico che si disegna: Chrome, microfono, rete, e una chiave API Anthropic dedicata con un tetto di spesa basso (si incolla nella pagina la mattina, resta solo in quel browser; revocarla dopo la lezione).
- Mini PC raggiungibile via SSH con Ollama e Qwen 3.5.
- La studentessa con il suo portatile, Claude Code e CPLEX.

## Esperimento: il grafico che si disegna mentre parli

Pagina `modulo-b/flusso/disegna/` (si apre dal pulsante nella scena METR del blocco 6).

1. La mattina della lezione: aprila in Chrome, premi **S**, incolla la chiave API, premi **Prova con una trascrizione registrata** per controllare che tutto funzioni, poi **Cancella il grafico**.
2. In aula: **S** → **🎙 Ascolta**, e racconta il grafico (il testo suggerito è nelle note della scena METR). La chiamata allo strumento `disegna` compare in basso a destra (**J** la nasconde): è il tool calling del blocco 4, dal vivo.
3. Se qualcosa non va: **R** disegna il grafico preparato, senza IA. **Esc** torna al flusso.

Il modello è Claude Haiku 5.5 con il ragionamento disattivato, per rispondere in fretta. La chiave resta solo in quel browser; l'audio passa dal riconoscimento vocale di Google (Chrome).

## Fonti dei numeri usati in aula

I punti segnati **da verificare** non sono stati controllati su una fonte primaria.

**Blocco 1**
- GAN: Goodfellow e colleghi, «Generative Adversarial Nets», NeurIPS 2014.
- StyleGAN: Karras, Laine e Aila, CVPR 2019. FFHQ: 70.000 immagini da Flickr con licenze CC BY 2.0, CC BY-NC 2.0, Public Domain Mark, CC0 o U.S. Government Works (github.com/NVlabs/ffhq-dataset).
- Which Face Is Real: Jevin West e Carl Bergstrom, Università di Washington.
- Diffusione: Ho, Jain e Abbeel, «Denoising Diffusion Probabilistic Models», 2020; DDIM: Song, Meng ed Ermon, 2020. La demo e la scena 2D usano il denoiser ottimo per i dati e i passi DDIM.
- CLIP: Radford e colleghi (OpenAI), gennaio 2021, 400 milioni di coppie immagine–testo.
- DALL·E 2 aprile 2022; Midjourney beta aperta luglio 2022; Stable Diffusion agosto 2022.
- Immagine rifatta «identica» cento volte: trend del 2025 (TechRadar, la foto di Dwayne Johnson rifatta 101 volte). In scena è una simulazione.
- Gemini 2.5 Flash Image («Nano Banana»): Google, agosto 2025.
- Video: «Will Smith che mangia spaghetti», marzo 2023 (ModelScope); Sora annunciato a febbraio 2024; Veo 3 a maggio 2025 (Google I/O); Sora 2 il 30 settembre 2025.
- VALL-E: Microsoft, gennaio 2023, voce imitata da 3 secondi di registrazione.
- Suno e Udio: causa delle case discografiche (RIAA) a giugno 2024; accordo Universal–Udio a ottobre 2025, Warner–Udio e Warner–Suno a novembre 2025.

**Blocco 2**
- Arup: polizia di Hong Kong, febbraio 2024: 15 bonifici, 200 milioni di dollari di Hong Kong (circa 25 milioni di dollari USA); Arup ha confermato a maggio 2024.
- Voce di Crosetto: febbraio 2025 (post di Crosetto del 6 febbraio; indagine della procura di Milano). Quanti abbiano pagato: le fonti dicono «uno, forse due» (**da verificare**).
- Grok: stima del CCDH, circa 3 milioni di immagini sessualizzate tra il 29 dicembre 2025 e l'8 gennaio 2026, circa 23.000 che sembrano ritrarre bambini; indagini in California e in Europa.
- SynthID: Google DeepMind, agosto 2023; SynthID Detector, maggio 2025.
- Content Credentials (C2PA): Leica M11-P (ottobre 2023), Google Pixel 10 (agosto 2025). Apple Reference Image: iPhone 18 Pro, settembre 2026 (PetaPixel, 12 ottobre 2026).
- AI Act, art. 50: obblighi di trasparenza dal 2 agosto 2026; marcatura leggibile dalle macchine per i sistemi già in commercio entro il 2 dicembre 2026 (Digital Omnibus, regolamento UE 2026/1744).
- Legge 132/2025, art. 612-quater c.p. (da 1 a 5 anni), in vigore dal 10 ottobre 2025.
- «Shrimp Jesus»: Facebook, 2024. The Velvet Sundown: luglio 2025, oltre un milione di ascoltatori mensili su Spotify. Graphite, ottobre 2025: circa metà dei nuovi articoli in inglese generati (stima con detector).
- Model collapse: Shumailov e colleghi, Nature, luglio 2024. La curva in scena è una simulazione vera (25 campioni per generazione).

**Blocco 3**
- Pinocchio: Project Gutenberg n. 52484. Conteggi calcolati sul testo: «il» compare 926 volte; dopo «il», «burattino» nel 12,0% dei casi.
- Shannon, «A Mathematical Theory of Communication», 1948.
- Token: tiktoken, vocabolario o200k_base. Dichiarazione universale dei diritti umani, art. 1: italiano 51 token per 32 parole, inglese 33 token per 30 parole (+55%).
- Embedding: fastText, vettori italiani cc.it.300 (Grave e colleghi, 2018). Analogie e direzione maschile/femminile calcolate sui vettori.
- Vaswani e colleghi, «Attention Is All You Need», 2017. GPT-1 117 milioni di pesi (2018), GPT-2 1,5 miliardi (2019), GPT-3 175 miliardi (Brown e colleghi, «Language Models are Few-Shot Learners», 2020).

**Blocco 4**
- FineWeb: Penedo e colleghi (Hugging Face), 2024, 15.000 miliardi di token. Vita di lettura: stima, 250 parole al minuto × 8 ore × 365 giorni × 70 anni ≈ 3 miliardi di parole.
- Bartz contro Anthropic: accordo da 1,5 miliardi di dollari, settembre 2025. GEMA contro OpenAI: tribunale di Monaco, 11 novembre 2025. New York Times contro OpenAI: causa dal dicembre 2023.
- InstructGPT: Ouyang e colleghi, marzo 2022 (circa 13.000 esempi scritti da persone). ChatGPT: 30 novembre 2022.
- GPT-4o: aggiornamento del 25 aprile 2025 ritirato il 29 aprile per eccessiva accondiscendenza (OpenAI).
- DeepSeek-R1: 20 gennaio 2025.
- Kojima e colleghi, «Large Language Models are Zero-Shot Reasoners», 2022: MultiArith dal 17,7% al 78,7%. Wei e colleghi, chain of thought, 2022. o1: 12 settembre 2024.
- Energia: Google, agosto 2025: richiesta mediana di testo a Gemini 0,24 Wh, 0,03 g di CO₂ equivalente, 0,26 ml d'acqua, circa 9 secondi di televisione.
- Toolformer: Schick e colleghi (Meta), febbraio 2023. Function calling: OpenAI, 13 giugno 2023.
- Allucinazioni: Kalai e colleghi (OpenAI), «Why Language Models Hallucinate», settembre 2025. Tribunale di Firenze, sez. imprese, ordinanza del 14 marzo 2025. Mata contro Avianca, New York, 2023.
- Detector: Liang e colleghi, Patterns, 2023 (in media il 61% dei temi TOEFL segnalati come generati). OpenAI AI Text Classifier ritirato il 20 luglio 2023 (26% dei testi generati riconosciuti, 9% di falsi positivi).
- Filigrana: Kirchenbauer e colleghi, ICML 2023. SynthID Text: Dathathri e colleghi, Nature, ottobre 2024.

**Blocco 5**
- Llama Guard (Meta, dicembre 2023); Constitutional Classifiers (Anthropic, febbraio 2025). Gandalf: Lakera.
- DeepSeek e Tienanmen: gennaio 2025 (molte testate). Grok: luglio 2025.
- Garante: blocco di ChatGPT il 30 marzo 2023; 15 milioni di euro a OpenAI il 20 dicembre 2024; blocco di DeepSeek il 30 gennaio 2025. Schrems II: Corte di giustizia UE, C-311/18, 16 luglio 2020. Garante su Google Analytics: giugno 2022.
- LLaMA: febbraio 2023. Mistral 7B: settembre 2023. OLMo (AI2): febbraio 2024. DeepSeek-R1 con licenza MIT; Nvidia −17% il 27 gennaio 2025. gpt-oss: 5 agosto 2025, licenza Apache 2.0.
- DwarfStar 4: antirez (antirez.com/news/165), motore per DeepSeek V4 Flash, Mac con 96 GB.
- Pinocchio: pubblicato a puntate sul «Giornale per i bambini», 1881–1883.
- Golden Gate Claude: Anthropic, maggio 2024. Direzione del rifiuto: Arditi e colleghi, 2024. LoRA: Hu e colleghi (Microsoft), 2021 (circa 10.000 volte meno pesi da addestrare per GPT-3).

**Blocco 6**
- GitHub Copilot: giugno 2021 (modello Codex). Claude Code: 24 febbraio 2025. Codex CLI: 16 aprile 2025; Codex cloud: 16 maggio 2025. Antigravity: 18 novembre 2025.
- METR, Kwa e colleghi, «Measuring AI Ability to Complete Long Tasks», marzo 2025: o1 39 minuti, Claude 3.7 Sonnet 59 minuti, raddoppio ogni 212 giorni (circa 7 mesi). Misure successive di METR: Claude Opus 4.5 293 minuti, Claude Opus 4.6 circa 12 ore, GPT-5.6 Sol circa 11,3 ore, Claude Mythos Preview circa 17,4 ore (oltre le 16 ore la misura non è affidabile). GPT-2 (circa 2 s), GPT-3 (circa 9 s) e GPT-4 (circa 5 min) sono letti dal grafico METR del 2025 (**da verificare**, valori approssimati).
- MCP: Anthropic, novembre 2024. Agent Skills: Anthropic, ottobre 2025. Computer use: Anthropic, ottobre 2024.
- Prompt injection, «the lethal trifecta»: Simon Willison, giugno 2025.
- Giudice LLM: Zheng e colleghi, «Judging LLM-as-a-Judge», 2023.
- Frontiera frastagliata: Dell'Acqua e colleghi (Harvard e BCG), 2023: 758 consulenti; dentro la frontiera +12,2% di compiti, 25,1% più veloci, qualità +40%; fuori, 19 punti percentuali di risposte giuste in meno.
- METR, luglio 2025: 16 sviluppatori esperti, 246 compiti, 19% di tempo in più; previsto un guadagno del 24%, percepito dopo un guadagno del 20%.

**Blocco 7**
- Bender, Gebru e colleghi, «On the Dangers of Stochastic Parrots», 2021. Othello-GPT: Li e colleghi, ICLR 2023. Anthropic, «On the Biology of a Large Language Model», marzo 2025.
- Anthropic, «Emotion concepts and their function in a large language model», 2 aprile 2026: Claude Sonnet 4.5, 171 concetti; ricatto nello scenario di prova al 22% di base.
- Olimpiadi della matematica, luglio 2025: Gemini Deep Think e un modello sperimentale di OpenAI, 35 punti su 42. Problemi di Erdős: erdosproblems.com e il registro dei contributi dell'IA curato da Terence Tao. Congettura delle distanze unitarie: annuncio di OpenAI del 20 maggio 2026, note di verifica di Alon, Bloom, Gowers, Litt, Sawin e altri.
- Cybersecurity: Anthropic, campagna GTG-1002, 13 novembre 2025. Hugging Face: intrusione resa pubblica il 16 luglio 2026, OpenAI conferma il 21 luglio (Cloud Security Alliance, registro OCSE degli incidenti; i dettagli tra le fonti non coincidono, **da verificare**).
- Benessere dei modelli: programma di Anthropic, aprile 2025; Claude può chiudere le conversazioni abusive da agosto 2025.
