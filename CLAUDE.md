# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Teaching material for the course *AI for Future* (Santa Chiara Lab, Università di Siena), modules A and B, taught by Giacomo Nunziati. Everything is static HTML/CSS/JS with no build step, published with GitHub Pages from `main` at `https://nunziati.github.io/corso-ai-santa-chiara-lab-2026/`. The QR codes in the slides point to those URLs, so paths under `modulo-a/demo/` must not be renamed.

All content is in Italian. The audience is mixed (any degree course, no programming or maths assumed); module A covers pre-transformer AI, generative AI belongs to module B.

## Layout

- `vendor/` — reveal.js 5.1.0, GSAP 3.15.0, the Anthropic TypeScript SDK (0.132.1, bundled with esbuild into one ES module) and woff2 fonts, copied in so everything works offline. No CDNs.
- `modulo-a/comune/tema.css` — colour and font tokens shared by slides and demos. The chosen theme is "editoriale" (the `:root` block); the other blocks are alternatives kept from the theme trial in `modulo-a/temi/`.
- `modulo-a/comune/demo.css` — layout for the demo pages (single column on phones, two columns from 900px).
- `modulo-a/demo/*.html` — self-contained interactive demos, one canvas each, vanilla JS, touch-friendly.
- `modulo-a/slides/index.html` — the deck. `deck.css` holds slide styles and CSS animations (they run when a section has `.present`); `deck.js` initialises reveal.js and runs JS-driven animations for sections with `data-js="name"`.
- `modulo-a/scaletta.md` — timed lesson plan with speaker notes and the sources for every figure quoted in class.
- `modulo-b/flusso/` — module B is not a slide deck but one continuous animated "flow". `motore.js` puts every scene in a single world, moves a camera between them, and builds one paused GSAP timeline with a label per step; "next" tweens the timeline to the next label. `blocchi/*.js` define scenes (`F.scena`) and steps (`F.passo`) with the helpers `F.entra`, `F.esce`, `F.disegna`, `F.parole`, `F.scrivi`, `F.rivela`, `F.tela`, `F.rischio`/`F.avvisa`. `note.html` is the speaker-notes window (key `N`), synced over `BroadcastChannel`. `disegna/` is the live-drawing experiment (speech → Claude API tool call → chart).
- `modulo-b/demo/*.html` — phone demos for module B; they reuse `modulo-a/comune/demo.css`. Data files live in `modulo-b/demo/dati/`.
- `modulo-b/scaletta.md` — module B plan, risk boxes, live tests, and sources.

## Commands

Preview locally (fonts and relative paths need a server only for some browsers; opening the file directly usually works):

```bash
python3 -m http.server 8000
```

Append `?tutto` to the deck URL to show every fragment and the final state of animations (useful for checking layout). Export the PDF with `?print-pdf` (reveal's print mode, one page per slide because `pdfSeparateFragments` is false).

Module B flow: `modulo-b/flusso/index.html#<step-id>` jumps to a step; `?stampa` disables the ambient loops. `window.flusso.vai(i, { istantaneo: true })` jumps to step `i` (used by Playwright checks).

## Conventions

- Colours and fonts only through the CSS variables in `tema.css`.
- In SVG, a `fill="..."` attribute on `<text>` works only because the default fill rule is `svg text:not([fill])`; keep it that way.
- Do not put a CSS animation that sets `transform` on an SVG element that also needs a `transform` attribute: wrap it in an outer `<g>` instead.
- Numbers quoted on slides must have a source listed in `scaletta.md` and in the credits slide.
- Flow animations must only tween properties (no `onUpdate`/`call` callbacks): `seek` suppresses callbacks, and every step must be reachable by jumping. Canvas drawings go through `F.tela`, which redraws from a tweened state object. Elements that move with `x`/`y`/`scale` are offset relative to their own base transform, so SVG groups with a `transform` attribute are safe.
