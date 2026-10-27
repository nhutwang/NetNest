# NÉT NEST project instructions

The website starts from net-nest-3d.zip and now implements the user-approved Những điểm cần sửa.pdf and follow-up model/ruler/logo corrections. index.html and assets/ are the only browser runtime. The latest sửa web.docx explicitly removes the repeated LINEA introduction and ending; the current direction has seven sections. Preserve model mechanics and ruler geometry. The latest feedback authorizes the hero logo correction and replaces the collection photographs with animated live typography on ivory/olive panels. Do not restore older cinematic renderers or generators.

- English website; Vietnamese README. LINEA proposed $99.99; ROAM proposed $74.99, confirmed in NỘI DUNG EEC.docx / SLIDE CONTENT and the Canva listing on 27/10/2026.
- Models and mechanisms are proposed concepts, not verified CAD or tested performance.
- Keep this a static site. No checkout, analytics or backend. Do not publish without authorization.
- index.html deliberately contains its own CSS and JavaScript. Do not split or migrate it as part of unrelated maintenance.
- Three.js r152.2, GSAP/ScrollTrigger 3.12.5, optional Lenis 1.3.27 and Google Fonts currently load from CDN; Internet is required.
- npm run dev serves the root page and 4 JPEG assets. npm run check validates deterministic story state, ruler modes, folding order, reverse/jump behavior, image references, syntax and README images.
- Dimension and height values belong on SVG rulers attached to the model. Do not restore Low/Middle/High position text blocks, infographic side cards or the HUD.
- Latest bạc liêu.pdf replaces the market-number chapter with collection navigation and adds brand meaning, vision and product copy. Treat Canva Amazon-style listing UI as reference, not verified returns/payment/weight claims.
- Scene and text reveals are deterministic in sceneFrameAt / collectionTypeAt; do not reintroduce lazy per-element opacity fromTo/staggers that flash before appearing. All product narration must come from bạc liêu.pdf / NỘI DUNG EEC.docx; avoid invented editorial headings.
- Latest feedback replaces the collection photos with two text-only ivory/olive panels: live animated SPACE/MOTION lettering, tagline, description and Explore links. Do not restore the photographs unless requested.
- The opening hero photograph has no overlay heading, tagline or Scroll to explore hint. Keep the later NÉT/NEST brand explanation intact.
- Keep one GSAP ticker and one master scroll timeline. Caption visibility must be exclusive.
- Read docs/PDF_FIXES.md for implemented details and actual verification.
- README.md is the current handoff. Old dist/, reference/, alternate renderers, build scripts and stale QA records were removed during the requested cleanup.
