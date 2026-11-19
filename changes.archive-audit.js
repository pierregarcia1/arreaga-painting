// Design review round from the two-agent audit. Applied items are in style.css / index.html; the items below were reviewed and NOT applied.
window.CHANGES_NOT_APPLIED = [
 {
  "id": "m2-sticky-call-bar",
  "tier": "major",
  "title": "Sticky Call + Request bar on phones",
  "principle": "Persistent CTA, Fitts's law, thumb reach, click-to-call prominence",
  "problem": "The page is ~13,500px tall (about 16 screens at 390px) and the only tap-to-call links are in the hero (y=494) and the contact band (y=10,797); the header call icon is top-left, the far corner from the thumb. After the hero there is no persistent way to call or ask for a quote.",
  "fix": "Adds a thumb-zone bar fixed to the bottom with a Call button and Request a consultation button. It slides away while the hero, contact band or form is on screen so it never duplicates a visible CTA.",
  "at": "body",
  "css": "@media(max-width:1024px){\n.m2-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;gap:8px;padding:8px 12px calc(8px + env(safe-area-inset-bottom));background:#141414;border-top:1px solid #414141;box-shadow:0 -6px 18px rgba(0,0,0,.28);transition:transform .22s}\n.m2-bar.m2-off{transform:translateY(110%);pointer-events:none}\n.m2-bar a{flex:1 1 auto;min-height:48px;display:flex;align-items:center;justify-content:center;gap:8px;padding:0 10px;border-radius:3px;color:#fff;font:600 13px/1.15 Inter,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.01em;text-align:center;text-decoration:none}\n.m2-bar .m2-c{flex:0 0 auto;border:1px solid #fff}\n.m2-bar .m2-r{background:#bb1736}\n.m2-bar svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;flex:none}\nhtml body{padding-bottom:64px}\n}\n@media(min-width:601px) and (max-width:1024px){.m2-bar{justify-content:center}.m2-bar a{flex:0 1 300px}}\n@media(min-width:1025px){.m2-bar{display:none}}",
  "js": "var T=function(s){return window.__t?window.__t(s):s};\nvar b=document.createElement('div');b.className='m2-bar m2-off';b.id='m2-bar';\nb.innerHTML='<a class=\"m2-c\" href=\"tel:+14054218629\" aria-label=\"Call Arreaga Painting\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z\"/></svg>(405) 421-8629</a><a class=\"m2-r\" href=\"#consultation\">'+T('Request a consultation')+'</a>';\ndocument.body.appendChild(b);\nvar vis=new Set();\nvar io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?vis.add(e.target):vis.delete(e.target)});b.classList.toggle('m2-off',vis.size>0)},{threshold:.15});\nvar hero=document.querySelector('#home .hero-msg')||document.getElementById('home');\n[hero,document.getElementById('contact'),document.getElementById('consultation')].forEach(function(e){e&&io.observe(e)});\n/* hero is first: bar starts hidden, appears once the hero scrolls out */\nreturn function(){io.disconnect();b.remove()};"
 },
 {
  "id": "m2-compact-header",
  "tier": "major",
  "title": "Slimmer sticky header on phones",
  "principle": "Content-first hierarchy, screen real estate, scroll fatigue",
  "problem": "The sticky header is 104px tall at 390px, which is 12% of an 844px viewport (14% at 740px visible Safari height) permanently covering content; the logo is centred inside a tall white bar.",
  "fix": "Shrinks the bar to 72px and scales the logo to match, keeping the call icon, ES pill and hamburger centred, and updates the anchor scroll offset so section headings still land clear of the bar.",
  "at": ".header",
  "css": "@media(max-width:1024px){\nhtml.biglogo .header,.header{height:72px}\nhtml.biglogo .logo,.logo{height:108px;width:126px}\nhtml.biglogo [id],[id]{scroll-margin-top:80px}\n}"
 },
 {
  "id": "d-hero-ghost-buttons",
  "tier": "minor",
  "title": "Hero secondary buttons stay readable over video",
  "principle": "Text over imagery contrast / legibility",
  "problem": "The phone and Explore buttons are only 10% white over the video; at 1100-1280px they sit past the gradient's dark zone on the bright roof and parking lot, so the white label loses contrast.",
  "fix": "Gives both a 60% dark-navy fill, a stronger 70% white border and a light backdrop blur, so contrast no longer depends on which video frame is playing.",
  "at": ".hero .actions",
  "css": "html.drl .hero-msg .actions .plain,html.drl .phone-link{background:rgba(23,32,43,.6);border-color:rgba(255,255,255,.7);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}"
 },
 {
  "id": "m2-hero-scrim",
  "tier": "minor",
  "title": "Hero: vertical scrim and equal-width buttons",
  "principle": "Text-over-video contrast (WCAG AA), alignment, visual hierarchy",
  "problem": "The hero overlay is a left-to-right gradient that fades to 32% on the right; on phones the text spans the full width and the lower buttons sit over the bright green jacket, and the three CTAs are three different widths (ragged edge).",
  "fix": "Uses a top-to-bottom dark scrim on phones, and makes the three hero actions one equal full-width column with the primary button first.",
  "at": ".hero",
  "css": "@media(max-width:800px){\nhtml.drl .hero-img:after{background:linear-gradient(180deg,rgba(23,32,43,.82),rgba(23,32,43,.78) 55%,rgba(23,32,43,.9))}\nhtml.drl .hero .actions{flex-direction:column;align-items:stretch;gap:10px;max-width:420px}\nhtml.drl .hero .actions .btn,html.drl .hero .actions .phone-link,html.drl .hero .actions .plain{width:100%;min-height:52px;justify-content:center;box-sizing:border-box}\nhtml.drl .hero .actions .phone-link{border:1px solid #fff;border-radius:3px;background:rgba(0,0,0,.25)}\nhtml.drl .hero .actions .plain{border:1px solid #6b6b6b;border-radius:3px}\n}"
 },
 {
  "id": "m2-contact-band-tap",
  "tier": "minor",
  "title": "Contact band: stacked full-width buttons",
  "principle": "Click-to-call prominence, Fitts's law, consistency",
  "problem": "The Let's talk paint band holds the only mid-page phone link, a 'Call (405) 421-8629' text link in a wrapped row of two differently sized buttons.",
  "fix": "Stacks the two actions as equal full-width 52px buttons with the call button outlined for equal weight.",
  "at": ".contact",
  "css": "@media(max-width:800px){\nhtml.drl .contact .rvbtns{display:flex;flex-direction:column;gap:10px;width:100%}\nhtml.drl .contact .rvbtns a{display:flex;align-items:center;justify-content:center;min-height:52px;box-sizing:border-box;width:100%;text-align:center}\n}"
 }
];
