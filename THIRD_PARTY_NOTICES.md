# Third-party notices — Facturo client

Facturo itself is proprietary; see `LICENSE`. This file lists third-party work
whose **source or visual design was adapted into our own source files**, so the
adaptation carries a licence notice even though the file sits in our tree.

Runtime dependencies installed from npm (Next.js, React, Tailwind CSS,
TanStack Query, framer-motion, next-intl and the rest) are not repeated here:
they are declared in `package.json`, they ship with their own licence files
inside `node_modules`, and nothing in this repository copies their source.

## Adapted components

| File in this repository | What was adapted | Origin | Licence |
|---|---|---|---|
| `src/components/ui/bento.tsx` | Layout and hover behaviour of a "bento" card: a graphic panel above a translucent text panel. | Open-source React/Tailwind bento card component (shadcn-style snippet). | MIT |
| `src/components/ui/sign-in-flow-1.tsx` | Structure of the sign-in screen and the dot-reveal entrance effect. | Open-source React sign-in flow component with a dot-field reveal. | MIT |
| `src/app/globals.css` — the `.auth-dot-field` rule and the `dot-reveal` keyframes | The masked dot grid and its reveal animation, used by the sign-in screen above. | Same sign-in flow component as above. | MIT |
| `src/shared/ui/shader-background.tsx` | The idea and the general shape of an animated mesh-gradient ("plasma") WebGL background. The GLSL and the React wrapper are our own; no external package is used at runtime. | Open-source animated gradient / shader background components. | MIT |
| `src/shared/ui/topo-field.tsx` | The idea of drifting topographic contour lines drawn from 2D simplex noise, and the standard simplex-noise GLSL helper functions. | Open-source WebGL topographic background components; the simplex-noise GLSL functions originate with Ashima Arts / Stefan Gustavson. | MIT |
| `src/shared/ui/hero-canvas.tsx` | The idea of a full-bleed animated grain/noise canvas behind the hero. Shader and wrapper written here. | Open-source animated noise background components. | MIT |

Where the exact upstream project could not be identified with certainty, the
row says what was taken rather than claiming an attribution we cannot verify.
If you are the author of one of these components and want the entry corrected
or removed, write to legal@facturo.md and it will be changed.

## MIT Licence

The components listed above are made available by their authors under the MIT
Licence, reproduced here in full:

```
MIT License

Copyright (c) the original authors of the adapted components

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Names that are not ours

"e-Factura" is the electronic invoicing system of the Republic of Moldova, run
by the State Tax Service. "maib" is a trademark of BC Maib S.A. "Google",
"Excel" and "OpenAI" belong to their respective owners. These names appear in
Facturo only to describe what the product works with. They do not indicate any
partnership, certification, sponsorship or endorsement, and no third-party logo
or brand identity is used anywhere in the interface.

## Keeping this file honest

Add a row whenever a component, a shader or a CSS effect is adapted from
someone else's source instead of written from scratch. A file added without its
notice is the kind of thing found during due diligence, not before it.
