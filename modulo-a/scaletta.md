# Modulo A — Fondamenti di IA · Scaletta della giornata

**AI for Future** · Santa Chiara Lab, Università di Siena · mercoledì 21 ottobre 2026, 9:00–18:00

Pubblico misto (studenti, neolaureati, dottorandi di ogni area). Niente codice, poca matematica e sempre disegnata. IA "prima dei transformer": LLM e generazione di immagini restano al modulo B, mercato del lavoro e professioni al modulo C.

## Cosa portare e cosa controllare

- Portatile con il deck aperto in locale: `modulo-a/slides/index.html` (funziona offline). Tasto `S` per le note del relatore, `F` per lo schermo intero.
- Le demo dei partecipanti si aprono dal QR code in slide (GitHub Pages). Prima di iniziare, aprile una volta dal telefono per controllare che la rete dell'aula funzioni; i partecipanti UniSi hanno eduroam.
- Demo esterne (servono internet): Quick, Draw!, TensorFlow Playground, Survival of the Best Fit, CNN Explainer, video Hide and Seek. In ogni slide c'è uno screenshot di riserva.
- Adattatore HDMI/USB-C e telecomando per le slide, se li hai.

## Il filo della giornata

1. Per decenni abbiamo dato al computer **regole**. Per vedere e ascoltare le regole non bastano.
2. Il nuovo paradigma: diamo **esempi**, e la macchina ricava le regole da sola.
3. Il mattone è il **neurone artificiale**: somma pesata e soglia. Imparare vuol dire spostare i pesi.
4. Tanti neuroni in **strati** risolvono problemi che uno solo non risolve. Si addestrano scendendo lungo l'errore.
5. Oltre agli esempi etichettati c'è l'**apprendimento per rinforzo**: tentativi e premi.
6. Nel mondo reale il modello impara **quello che c'è nei dati**, anche quando è la cosa sbagliata. Da qui nascono successi enormi e danni concreti.

---

## 9:00–9:15 · Apertura

| Min | Slide / attività | Note |
|---|---|---|
| 3 | Titolo | |
| 5 | **Chi sono** (2 slide): percorso (Siena → dottorato a Firenze → Radboud), e cosa faccio oggi (eye tracking clinico, robot di ispezione, proteine) | Una frase per progetto: torneranno nel pomeriggio. |
| 5 | **Giro d'aula**: "Che corso fate? Avete mai addestrato un modello? Avete usato un'IA stamattina?" | Serve a calibrare gli esempi. Annota 2–3 corsi di laurea per citarli più avanti. |
| 2 | Programma della giornata | I quattro blocchi e le pause. |

## 9:15–10:45 · Blocco 1 — Dalle regole agli esempi (frontale lungo)

| Min | Slide / attività | Note |
|---|---|---|
| 8 | **L'IA intorno a noi**: sblocco col volto, feed e suggerimenti, filtro antispam, traduttore, navigatore, sottotitoli automatici | Chiedi quante di queste hanno usato oggi. Quasi tutte sono "IA che classifica o predice", non che genera. |
| 7 | **IA ⊃ machine learning ⊃ deep learning** (cerchi animati) | IA = obiettivo (comportamento "intelligente"); ML = un metodo (imparare dai dati); DL = un tipo di ML (reti con molti strati). Deep Blue (1997) era IA ma non ML. |
| 10 | **Quando i computer erano persone**: "computer" era un mestiere (NACA, foto). Turing (1936): bastano carta, matita e un insieme finito di regole | Citazione di Turing: il computer umano "segue regole fisse e non ha autorità per discostarsene". |
| 8 | **L'algoritmo è una ricetta**: ingredienti → passi → biscotti. Esempio animato: confrontare due parole lettera per lettera | Sequenza finita di passi non ambigui. Funziona benissimo quando sappiamo scrivere i passi. |
| 10 | **Il muro delle regole**: scrivete le regole per riconoscere un "7" scritto a mano, o un gatto in una foto. L'animazione mostra le eccezioni che si moltiplicano | Paradosso di Moravec: ciò che per noi è facile (vedere, ascoltare) è difficilissimo da scrivere in regole, mentre il calcolo per noi difficile è facile per la macchina. |
| 15 | **Attività: Quick, Draw!** dal telefono (QR) | "Disegnate quello che vi chiede, in 20 secondi." Poi chiedi: come fa? Quando sbaglia? Nessuno ha scritto la regola del gatto: ha visto 50 milioni di disegni. |
| 10 | **Il nuovo paradigma** (animazione): programmazione classica = regole + dati → risposte; machine learning = dati + risposte → regole | È la slide più importante della mattina: tornaci più volte durante il giorno. |
| 15 | **Una storia in 80 anni** (linea del tempo animata): 1943 McCulloch & Pitts · 1950 Turing, "Le macchine possono pensare?" · 1956 Dartmouth, nasce il nome · 1958 percettrone · 1969 Minsky & Papert, primo inverno · 1986 backpropagation · 1997 Deep Blue · 2012 AlexNet · 2016 AlphaGo | Due stagioni: entusiasmo → inverno → entusiasmo. Deep Blue = regole + forza bruta; AlphaGo = imparato. Tieni l'aggancio: "il percettrone del 1958 lo costruiamo dopo la pausa". |
| 7 | Domande | |

**10:45–11:00 · Pausa**

## 11:00–13:00 · Blocco 2 — Come impara una macchina

| Min | Slide / attività | Note |
|---|---|---|
| 10 | **Esempi con l'etichetta** (apprendimento supervisionato). Classificazione (piatto o bottiglia? spam o no?) e regressione (quanto costa questa casa?) | Lo "studente" vede domanda e risposta giusta, tante volte. |
| 10 | **Dalle cose ai numeri: le feature**. Un oggetto diventa una riga di tabella (diametro, altezza), poi un punto nel piano (animazione oggetto → riga → punto) | Le feature le sceglie chi progetta il sistema. Scelte sbagliate = modello cieco. |
| 8 | **Training e test** (animazione: i dati vengono mescolati e divisi) | Si studia sugli esercizi, l'esame è su esercizi mai visti. Se l'esame è sugli stessi esercizi, il voto non dice niente. |
| 10 | **L'ispirazione: il neurone biologico**. Dendriti, corpo, assone, sinapsi; circa 86 miliardi di neuroni, migliaia di connessioni ciascuno; si attiva "tutto o niente" sopra una soglia; imparare = rafforzare o indebolire connessioni (Hebb, 1949) | È una metafora, non una copia: il neurone artificiale è enormemente più semplice. |
| 10 | **Il neurone artificiale** (McCulloch & Pitts, 1943; animazione): ingressi × pesi → somma → confronto con la soglia → 0 o 1 | Mostra la formula una sola volta, poi un esempio con numeri veri su un piatto e una bottiglia. |
| 7 | **I pesi disegnano una retta** (animazione: cambiando i pesi la retta ruota e si sposta) | Tutto quello che un neurone sa fare è tagliare il piano in due con una retta. |
| 8 | **Il percettrone di Rosenblatt** (1958, Mark I, 400 fotocellule). La regola: se sbagli, sposta un po' i pesi verso la risposta giusta (animazione su un punto sbagliato) | Il New York Times scrisse che la Marina si aspettava una macchina capace di "camminare, parlare, vedere, scrivere, riprodursi ed essere consapevole della propria esistenza". |
| 30 | **Attività: Sii tu il percettrone** (demo dal telefono) | 1) Muovete i cursori e separate piatti e bottiglie a mano: quanti errori? 2) Premete "Impara" e guardate l'algoritmo. 3) Aggiungete un punto "strano" e guardate cosa succede. Chiedi chi ci è riuscito a mano e in quanti tentativi. |
| 10 | **Il limite: lo XOR** (animazione: nessuna retta separa i punti) → Minsky & Papert (1969) → primo inverno dell'IA | Cliffhanger per il pomeriggio: "come si risolve? Con più neuroni." |
| 7 | Riepilogo della mattina e domande | Le 5 parole: esempi, feature, pesi, soglia, errore. |

**13:00–14:00 · Pranzo**

## 14:00–15:45 · Blocco 3 — Dal neurone alla rete profonda

| Min | Slide / attività | Note |
|---|---|---|
| 8 | **Più neuroni, più rette**: due neuroni + uno che li combina risolvono lo XOR (animazione) | Ogni strato trasforma lo spazio; alla fine una retta basta. |
| 7 | **Gli strati piegano lo spazio** (animazione della spirale) | Immagine utile: un foglio accartocciato che lo strato "stira" finché le classi si separano. |
| 15 | **Come si addestra una rete: scendere a valle**. L'errore come altitudine, la discesa del gradiente come una pallina (demo dal telefono). Il learning rate: troppo piccolo è lenta, troppo grande rimbalza | Backpropagation a parole: l'errore finale viene "ripartito all'indietro" fra tutti i pesi, ognuno corregge la sua parte. Niente derivate. |
| 20 | **Attività: TensorFlow Playground** (proiettato, e dal telefono per chi vuole) | 1) Dataset "cerchio", zero strati nascosti: non ci riesce. 2) Aggiungi uno strato con 4 neuroni: ci riesce. 3) Dataset "spirale": servono più strati. Fai notare la perdita (loss) che scende. |
| 10 | **Il "deep" del deep learning**: feature gerarchiche, bordi → forme → parti → oggetti (animazione della convoluzione + CNN Explainer) | Nessuno ha detto alla rete di cercare i bordi: li ha trovati da sola perché servivano. |
| 7 | **Perché proprio ora?** Dati (ImageNet: 14 milioni di immagini etichettate), calcolo (GPU dei videogiochi), algoritmi. AlexNet 2012: errore top-5 dal 26% al 15% in un anno | Le idee c'erano dagli anni '80; mancavano dati e potenza. |
| 13 | **Overfitting** (demo dal telefono): la curva che si contorce per passare da tutti i punti. Errore di training giù, errore di test su | Lo studente che impara a memoria le soluzioni: perfetto sugli esercizi, disastroso all'esame. |
| 25 | **Apprendimento per rinforzo**: agente, ambiente, azione, premio (animazione). Esplorare o sfruttare. **Demo del labirinto** dal telefono. **Video OpenAI Hide and Seek** (2019) | Nessuno dice all'agente la risposta giusta: riceve solo un premio, spesso in ritardo. Nel video gli agenti scoprono strategie (bloccare le porte, saltare sulle scatole) che nessuno ha programmato. Anticipa AlphaGo. |

**15:45–16:00 · Pausa**

## 16:00–17:30 · Blocco 4 — L'IA nel mondo reale

Tutti i casi li racconti tu. Per ognuno, la domanda guida è: **cosa ha imparato davvero il modello, e da quali dati?**

| Min | Slide / attività | Note |
|---|---|---|
| 8 | **AlphaGo** (marzo 2016, Seul, 4–1 contro Lee Sedol). La mossa 37 della partita 2: probabilità stimata che un umano la giocasse, 1 su 10.000. Poi AlphaGo Zero (2017): solo partite contro sé stesso, batte la versione precedente 100–0 | Rinforzo + reti neurali. Lee Sedol risponde nella partita 4 con la sua "mossa divina" (78). |
| 8 | **AlphaFold**: prevedere la forma 3D di una proteina dalla sequenza, problema aperto da 50 anni. CASP14 (2020). Oltre 200 milioni di strutture pubblicate. Nobel per la Chimica 2024 a Hassabis e Jumper (con David Baker) | Supervisionato, addestrato su decenni di strutture misurate in laboratorio (Protein Data Bank). |
| 5 | **See & Spray (John Deere)**: telecamere sulla barra di irrorazione, una rete riconosce le erbacce e spruzza solo lì. Nel 2024, in media il 59% di erbicida in meno (dato dell'azienda, oltre 1 milione di acri) | Visione artificiale in tempo reale, in campo. |
| 10 | **Quando il modello impara la scorciatoia**: lupo o husky? (Ribeiro et al., 2016: classificatore volutamente addestrato su lupi fotografati sulla neve, guarda la neve). I righelli nelle foto dei melanomi (Narla et al., 2018): le lesioni sospette venivano fotografate col righello, e il modello aveva imparato il righello | Effetto Clever Hans. Il modello non sa cosa "dovrebbe" guardare: guarda quello che funziona sui dati. |
| 7 | **Dal laboratorio alla clinica: retinopatia diabetica in Thailandia** (Google, CHI 2020). In laboratorio precisione da specialista; in 11 cliniche oltre un'immagine su cinque scartata per qualità (luce, camere, connessione) | I dati di training non sono il mondo. Il modello è un pezzo di un sistema fatto di persone e procedure. |
| 10 | **Soglia, falsi positivi e falsi negativi** (demo dal telefono: screening medico) | Nessun modello è perfetto: qualcuno sceglie **dove** sbagliare. In uno screening un falso negativo costa più di un falso positivo; in un filtro antispam il contrario. |
| 15 | **Attività: Survival of the Best Fit** (dal telefono o dal portatile, ~10 minuti), poi discussione breve | Fate i selezionatori; poi l'IA impara dalle vostre scelte e ne eredita il bias. Riprende il caso reale Amazon (2018). |
| 7 | **Gender Shades** (Buolamwini & Gebru, 2018): riconoscimento del genere da una foto, IBM: errore 0,3% su uomini con pelle chiara, 34,7% su donne con pelle scura. **Demo del bias dai dati** | Il gruppo era raro nei dati di training. Le aziende hanno migliorato i modelli entro un anno dalla pubblicazione. |
| 7 | **Toeslagenaffaire (Paesi Bassi)**: l'algoritmo antifrode dei sussidi per l'infanzia usava anche la doppia cittadinanza come fattore di rischio. Decine di migliaia di famiglie accusate ingiustamente; il governo Rutte si dimette nel gennaio 2021; il Garante olandese multa l'amministrazione fiscale per 2,75 milioni (2021) | Bias nell'obiettivo e nell'uso, non solo nei dati. Nessuna possibilità reale di contestare. |
| 5 | **Clearview AI e il Garante italiano**: miliardi di volti raccolti dal web senza consenso per un motore di riconoscimento facciale. Marzo 2022: multa da 20 milioni di euro e ordine di cancellare i dati degli italiani | Il modello è buono *perché* i dati sono stati presi senza permesso. |
| 5 | **Foodinho (Glovo) e il Garante**: assegnazione di turni e ordini decisa dall'algoritmo, senza intervento umano né possibilità di contestare. 2,6 milioni di multa nel 2021, 5 milioni nel novembre 2024 (oltre 35.000 rider) | Chi decide, con quali dati, e chi può fare ricorso. |
| 5 | **AI Act** (Regolamento UE 2024/1689) in una slide: la piramide del rischio (inaccettabile, alto, limitato, minimo) | Vietati, ad esempio, il social scoring e lo scraping indiscriminato di volti (cioè quello che ha fatto Clearview). |
| 15 | **Dal mio laboratorio** (3 casi): **SADIC e le mutazioni** (profondità degli atomi come feature per prevedere quanto una mutazione destabilizza una proteina) → oggi **AlphaMissense** (2023, 71 milioni di possibili mutazioni classificate) → **AlphaGenome** (Nature, gennaio 2026: effetto delle varianti del DNA sulla regolazione, fino a 1 milione di basi). **Eye tracking clinico**: dalla telecamera al software usato da ortottisti. **Robot di ispezione per le perdite di gas** (progetto CARES con Nuovo Pignone/Baker Hughes) | Il messaggio: il modello è spesso il 20% del lavoro. Il resto sono dati, acquisizione, integrazione e chi lo usa. |

## 17:30–18:00 · Chiusura

| Min | Slide / attività | Note |
|---|---|---|
| 10 | **Cinque idee da portare a casa**: 1) il ML ricava regole dagli esempi; 2) un neurone è una somma pesata con una soglia, una rete ne mette insieme tanti; 3) imparare = ridurre l'errore spostando i pesi; 4) il modello impara ciò che c'è nei dati, scorciatoie e bias compresi; 5) ogni sistema sceglie dove sbagliare, e qualcuno ne risponde | |
| 5 | **Ponte al modulo B**: lo stesso meccanismo, applicato a predire la parola successiva su miliardi di frasi, diventa un chatbot | Non entrare nei dettagli: è il prossimo modulo. |
| 15 | Domande, link al materiale (QR alla repo) | |

---

## Fonti dei numeri usati in aula

- AlphaGo, mossa 37 e 1 su 10.000: documentario *AlphaGo* (2017) e DeepMind.
- AlphaFold: Jumper et al., *Nature* 2021; AlphaFold DB (2022); Nobel per la Chimica 2024.
- AlphaMissense: Cheng et al., *Science* 2023.
- AlphaGenome: Avsec et al., *Nature* 649, 2026.
- See & Spray: comunicato John Deere, 18 settembre 2024.
- Lupo/husky: Ribeiro, Singh, Guestrin, "Why Should I Trust You?", KDD 2016.
- Righelli e melanomi: Narla et al., *J. Invest. Dermatol.* 2018 (sul modello di Esteva et al., *Nature* 2017).
- Retinopatia in Thailandia: Beede et al., CHI 2020.
- Gender Shades: Buolamwini & Gebru, FAT* 2018 (tabella per IBM).
- Toeslagenaffaire: dimissioni del governo Rutte (15 gennaio 2021); multa dell'Autoriteit Persoonsgegevens (dicembre 2021).
- Clearview AI: provvedimento del Garante privacy, 10 febbraio 2022, comunicato marzo 2022.
- Foodinho: provvedimenti del Garante privacy, giugno 2021 e 22 novembre 2024.
- AlexNet: Krizhevsky, Sutskever, Hinton, NeurIPS 2012.
