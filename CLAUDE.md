# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Teaching material for the course *AI for Future* (Santa Chiara Lab, Università di Siena), modules A and B, taught by Giacomo Nunziati. Everything is static HTML/CSS/JS with no build step, published with GitHub Pages from `main` at `https://nunziati.github.io/corso-ai-santa-chiara-lab-2026/`. The QR codes in the slides point to those URLs, so paths under `modulo-a/demo/` must not be renamed.

All content is in Italian. The audience is mixed (any degree course, no programming or maths assumed); module A covers pre-transformer AI, generative AI belongs to module B.

## Layout

- `vendor/` — reveal.js 5.1.0 and woff2 fonts, copied in so slides work offline. No CDNs.
- `modulo-a/comune/tema.css` — colour and font tokens shared by slides and demos. The chosen theme is "editoriale" (the `:root` block); the other blocks are alternatives kept from the theme trial in `modulo-a/temi/`.
- `modulo-a/comune/demo.css` — layout for the demo pages (single column on phones, two columns from 900px).
- `modulo-a/demo/*.html` — self-contained interactive demos, one canvas each, vanilla JS, touch-friendly.
- `modulo-a/slides/index.html` — the deck. `deck.css` holds slide styles and CSS animations (they run when a section has `.present`); `deck.js` initialises reveal.js and runs JS-driven animations for sections with `data-js="name"`.
- `modulo-a/scaletta.md` — timed lesson plan with speaker notes and the sources for every figure quoted in class.

## Commands

Preview locally (fonts and relative paths need a server only for some browsers; opening the file directly usually works):

```bash
python3 -m http.server 8000
```

Append `?tutto` to the deck URL to show every fragment and the final state of animations (useful for checking layout). Export the PDF with `?print-pdf` (reveal's print mode, one page per slide because `pdfSeparateFragments` is false).

## Conventions

- Colours and fonts only through the CSS variables in `tema.css`.
- In SVG, a `fill="..."` attribute on `<text>` works only because the default fill rule is `svg text:not([fill])`; keep it that way.
- Do not put a CSS animation that sets `transform` on an SVG element that also needs a `transform` attribute: wrap it in an outer `<g>` instead.
- Numbers quoted on slides must have a source listed in `scaletta.md` and in the credits slide.
