// Design-review suggestions from two Sonnet subagents (v- = visual design, u- = UX/HCI).
// Every change is a pure CSS override injected after style.css. `overlaps` lists changes that touch the same area.
window.CHANGES = [
{id:'v-summary',summary:true,title:'Overall critique',problem:`Strong editorial identity: a disciplined red/ink/off-white palette, confident Barlow Condensed display type against Inter body, generous section padding, and a clear 4-5 level hierarchy. The main weaknesses are micro-typography and accessibility. About 20 text styles sit at 10-12px, there are no focus-visible styles, form field borders (about 1.4:1) fall below the 3:1 non-text contrast minimum, hit targets are thin, and inputs are 13px, which triggers iOS zoom. Light-on-dark text contrast is fine.`},
{id:'u-summary',summary:true,title:'Overall critique',problem:`The page has a clear editorial voice, a strong red accent, a coherent narrative and a consistent 'Request a consultation' CTA, with a sensible form and a native FAQ. Weaknesses are interaction-level: the header scrolls away and is the only navigation, 'Home' is hard-coded active, on mobile the CTA disappears and the hamburger is a bare glyph, many arrows imply links that do not exist while real links have no hover or focus feedback, and the form has no focus, hover or invalid styling.`},

// ---------------- MAJOR ----------------
{id:'u-form-states',tier:'major',title:'Form: sizing, focus, hover, error and valid states',principle:'Feedback & affordance / error prevention',overlaps:['v-field-borders','v-touch-targets'],
problem:`Inputs are 13px (iOS zooms below 16px), have a faint border, no hover/focus/invalid/valid styling and an 18px checkbox, yet the form is the conversion point.`,
fix:`56px / 16px fields with a stronger border, hover, red focus ring, red invalid and green valid cues, a 24px checkbox row and a full-width submit on mobile.`,
css:`form input:not([type=checkbox]),form select,form textarea{height:56px;font-size:16px;padding:0 16px;background:#fff;border:1.5px solid #8c8c88;border-radius:4px;transition:border-color .15s,box-shadow .15s}
form textarea{height:150px;padding:14px 16px;line-height:1.5}
form label{font-size:13px;gap:8px}
form input::placeholder,form textarea::placeholder{color:#767672}
form input:not([type=checkbox]):hover,form select:hover,form textarea:hover{border-color:var(--ink)}
form input:focus,form select:focus,form textarea:focus{outline:0;border-color:var(--red);box-shadow:0 0 0 4px rgba(187,23,54,.22)}
form input:user-invalid,form select:user-invalid,form textarea:user-invalid{border-color:var(--red);background:#fdf3f5}
form input:user-valid:not([type=checkbox]),form select:user-valid,form textarea:user-valid{border-color:#2e7d4f}
label.consent{font-size:13px;gap:14px;min-height:44px;align-items:center;cursor:pointer}
.consent input{width:24px!important;height:24px!important;accent-color:var(--red);cursor:pointer}
.submit .btn{height:60px;font-size:15px;transition:background .15s,transform .15s}
@media (max-width:800px){
.submit .btn{width:100%;justify-content:space-between}
form{gap:20px}
}`},
{id:'u-honest-links',tier:'major',title:'Remove fake affordances, add real link feedback',principle:'Affordance / signifiers',overlaps:['v-link-hover'],
problem:`Service cards and gallery captions show a ↗ that implies a link but are not anchors, while the genuinely clickable text links have no hover, underline or pressed state.`,
fix:`Hides the dead arrows, underlines the real inline CTAs with an animated offset and 44px hit height, and adds hover/active feedback to buttons.`,
css:`article h3 span,figcaption i{display:none!important}
.plain,.red-link,.white-link,.continue a,.top{display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:6px;transition:color .15s,text-underline-offset .15s}
.plain:hover,.white-link:hover,.continue a:hover{text-underline-offset:9px;color:#ff7b92}
.red-link:hover,.top:hover{text-underline-offset:9px;color:#8f1029}
.plain{font-weight:600;color:#fff}
.btn{transition:background .15s,transform .15s,box-shadow .15s}
.btn:hover{background:#9c1230;box-shadow:0 6px 16px rgba(187,23,54,.35)}
.btn:active{transform:translateY(1px);box-shadow:none}
.btn span{transition:transform .15s}
.btn:hover span{transform:translate(3px,-3px)}`},
{id:'u-mobile-header-cta',tier:'major',title:'Mobile header: visible CTA and thumb-friendly menu',principle:'Fitts\'s law / mobile ergonomics',overlaps:['v-touch-targets'],
problem:`At 800px and below the header CTA is hidden, the hamburger is a bare 28px glyph with no defined hit area, and menu links are cramped, well under 44px.`,
fix:`Shows a compact CTA in the header, gives the menu button a 48px target and turns the open menu into spaced, divided 56px rows.`,
css:`@media (max-width:800px){
.header .btn{display:inline-flex!important;height:44px;padding:0 14px;font-size:13px;gap:0;margin-left:auto;margin-right:8px}
.header .btn span{display:none}
.menu{width:48px;height:48px;font-size:28px;line-height:1;cursor:pointer;border-radius:4px}
.menu:active{background:var(--grey)}
nav#nav{padding:8px 20px 16px!important;gap:0}
nav#nav a{display:flex;align-items:center;min-height:56px;padding:0!important;border-bottom:1px solid var(--line)!important;border-image:none!important}
nav#nav a:last-child{border-bottom:0!important}
}`},
{id:'v-focus-visible',tier:'major',title:'Visible keyboard focus everywhere',principle:'Accessibility (WCAG 2.4.7)',overlaps:['u-focus-motion'],
problem:`No :focus styles are defined, so keyboard users get only the faint browser default, nearly invisible on the dark, red and photo sections. Red on ink is only ~2.9:1, so one outline colour cannot work everywhere.`,
fix:`A 3px outline on all interactive elements, red on light surfaces and white on dark and red surfaces, with an offset so it does not collide with the red buttons.`,
css:`a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid #bb1736!important;outline-offset:3px!important;border-radius:2px}
.dark a:focus-visible,.dark button:focus-visible,.contact a:focus-visible,.guide a:focus-visible,.hero a:focus-visible,.overview a:focus-visible,.header .btn:focus-visible,.btn:focus-visible{outline-color:#fff!important;box-shadow:0 0 0 6px #141414}
.header a:focus-visible,.header button:focus-visible,footer a:focus-visible,form :focus-visible{outline-color:#bb1736!important;box-shadow:none}
.header .btn:focus-visible,form .btn:focus-visible{outline-color:#141414!important}`},
{id:'v-type-floor',tier:'major',title:'Raise the micro-type floor',principle:'Legibility / typographic scale',overlaps:['u-microcopy-size'],
problem:`10px and 11px text carries real content (hero cue, overview label, captions, finish labels, consent text, footer notes, SOFT/BALANCED/BOLD chips), well below comfortable reading size, especially in uppercase with no tracking.`,
fix:`Sets a 12px minimum for captions and 13px for supporting text, adds tracking to the uppercase ones and leaves the layout otherwise intact.`,
css:`.cue,.overview small,.finish small,.contact small,.submit small,small.light,.opts p,.note-sm,label.consent,.notes,article small,form small,label,.foot nav,.top,.sm{font-size:13px!important}
.caption small,figcaption small,.cards div,.cue,.overview small,.finish small,.contact small{font-size:12px!important;letter-spacing:.08em;line-height:1.4}
.label{font-size:13px}
.opts p{font-size:14px!important;line-height:1.55}
.note-sm{line-height:1.6}
label.consent{line-height:1.55}
@media (max-width:800px){.cue,.overview small,.finish small{font-size:12.5px!important}.notes{gap:8px}}`},
{id:'v-body-readability',tier:'major',title:'Comfortable body copy size and measure',principle:'Readability / hierarchy of text levels',
problem:`Running text steps down through 16, 15, 14 and 13px, several in #666 at 14px, which is small for sentence-length copy. Paragraphs in wide layouts can also run past 80 characters.`,
fix:`Standardises running copy at 16px (15.5px for denser cards), caps line length in ch, and balances headings and wraps paragraphs with text-wrap.`,
css:`.body,article p,details p,.finish p,.steps p{font-size:16px!important;line-height:1.65!important}
.steps p,article p{font-size:15.5px!important}
.body,details p,.finish p,.steps p,article p{max-width:62ch}
.intro>.body{max-width:52ch}
h1,h2,h3,h4{text-wrap:balance}
.body,details p,article p,.steps p{text-wrap:pretty}
@media (max-width:800px){.body,article p,details p,.finish p,.steps p{font-size:16px!important}.principles b{font-size:16px}}`},
{id:'v-touch-targets',tier:'major',title:'44px hit targets and 16px form inputs on mobile',principle:'Fitts\'s law / WCAG 2.5.8',overlaps:['u-footer-targets','u-mobile-header-cta','u-form-states'],
problem:`The menu button has no sized box, footer and inline links are 13-14px text with no padding, the checkbox is 18px and inputs are 13px (iOS zooms the page on focus below 16px).`,
fix:`Gives every tappable control a minimum 44px target, enlarges the checkbox and sets form fields to 16px at mobile widths.`,
css:`.menu{min-width:44px;min-height:44px;padding:0;cursor:pointer;color:var(--ink)}
nav#nav a{display:inline-flex;align-items:center;min-height:44px}
.foot nav a,.top,.red-link,.white-link,.continue a,.actions .plain{display:inline-flex;align-items:center;min-height:44px}
.consent input{width:22px!important;height:22px!important;margin-top:0}
.btn{min-height:48px}
@media (max-width:800px){input,select,textarea{font-size:16px!important}.foot nav{gap:4px 20px}.actions{align-items:flex-start;gap:8px}}`},

// ---------------- MINOR ----------------
{id:'u-faq-affordance',tier:'minor',title:'Clearer FAQ accordion',principle:'Affordance / feedback',overlaps:['v-faq-no-shift'],
problem:`Each summary is a bare text row with a tiny '+', no hover cue, and the open state changes font-size (16 to 17px), so the text reflows and jumps.`,
fix:`Adds a circular +/- control, hover colour, a 64px row and removes the font-size jump.`,
css:`summary{min-height:64px;align-items:center;transition:color .15s}
summary:hover{color:var(--red)}
summary:after{flex-shrink:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid var(--soft);border-radius:50%;transition:border-color .15s,background .15s,color .15s}
summary:hover:after{border-color:var(--red);color:var(--red)}
details[open] summary{font-size:16px!important;align-items:center}
details[open] summary:after{background:var(--ink);border-color:var(--ink);color:#fff}`},
{id:'u-focus-motion',tier:'minor',title:'Visible focus and reduced motion',principle:'Accessibility (WCAG 2.4.7, 2.3.3)',overlaps:['v-focus-visible','v-reduced-motion'],
problem:`No custom focus styles (browser defaults vanish on red/dark areas) and smooth scrolling is forced with no prefers-reduced-motion opt-out.`,
fix:`A high-contrast focus ring with a white halo for dark and red areas, and smooth scroll and transitions disabled for reduced-motion users.`,
css:`:focus-visible{outline:3px solid #e8405c!important;outline-offset:3px;box-shadow:0 0 0 6px rgba(255,255,255,.85)}
.dark :focus-visible,.contact :focus-visible,.guide :focus-visible{outline-color:#fff!important;box-shadow:0 0 0 6px rgba(0,0,0,.6)}
form input:focus-visible,form select:focus-visible,form textarea:focus-visible{box-shadow:0 0 0 4px rgba(187,23,54,.22)}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*,*:before,*:after{transition:none!important;animation:none!important}}`},
{id:'u-microcopy-size',tier:'minor',title:'Raise 10-11px microcopy',principle:'Legibility / scannability',overlaps:['v-type-floor'],
problem:`Many labels sit at 10-11px (hero cue, overview label, captions, finish labels, chips, submit note, footer notes), too small for mobile, especially wide-tracked uppercase.`,
fix:`Lifts these to 12-14px with slight tracking, keeping the layout intact.`,
css:`.cue,.overview small,.caption small,figcaption small,.finish small,small.light,article small,.submit small,.notes,.contact small{font-size:12px!important;letter-spacing:.04em}
.cards div{font-size:12px!important;letter-spacing:.06em}
.opts p{font-size:14px!important}
.steps p,.finish p,details p{font-size:15px}
@media (max-width:800px){.body{font-size:17px}.lead{font-size:18px}}`},
{id:'u-nav-hover-active',tier:'minor',title:'Nav hover and wayfinding state',principle:'Wayfinding / feedback',overlaps:['v-link-hover'],
problem:`The hard-coded .active class keeps 'Home' red and underlined forever, even after jumping to Services; nav links also have no hover state and a short hit area.`,
fix:`Adds hover colour and a taller hit area, and uses :target to move the active style to the section the user jumped to.`,
css:`nav#nav a{transition:color .15s;padding-top:10px;padding-bottom:10px}
nav#nav a:hover{color:var(--red)}
html:has(:target:not(#home)) nav#nav a.active{color:inherit;font-weight:400;border-bottom:0;border-image:none}
html:has(#about:target) nav#nav a[href='#about'],html:has(#services:target) nav#nav a[href='#services'],html:has(#projects:target) nav#nav a[href='#projects'],html:has(#contact:target) nav#nav a[href='#contact'],html:has(#consultation:target) nav#nav a[href='#contact']{color:var(--red);font-weight:600;border-bottom:2px solid var(--red)}
@media (max-width:800px){nav#nav a{padding-top:0;padding-bottom:0}}`},
{id:'u-footer-targets',tier:'minor',title:'Footer link tap targets',principle:'Fitts\'s law / mobile ergonomics',overlaps:['v-touch-targets'],
problem:`Footer links are 13px inline text with 28px gaps and no hover state; on mobile they wrap tightly with sub-44px hit areas.`,
fix:`Gives footer nav and back-to-top links a 44px hit height, hover colour and comfortable wrap spacing.`,
css:`.foot nav a,.top{display:inline-flex;align-items:center;min-height:44px;transition:color .15s}
.foot nav a:hover{color:var(--red);text-decoration:underline;text-underline-offset:5px}
.foot nav{font-size:14px}
@media (max-width:800px){.foot nav{gap:0 24px}.top{align-self:flex-start}}`},
{id:'u-continue-cta',tier:'minor',title:'Stronger inline "Start your project" CTA',principle:'Hierarchy of attention / CTA clarity',
problem:`The gallery's closing CTA is a 14px text link in a grey row; the mid-page conversion prompts are visually weaker than the prose around them and easy to miss.`,
fix:`Turns the link into a bordered button-style target and enlarges the sibling prompt text, stacking cleanly on mobile.`,
css:`.continue{align-items:center;gap:24px;font-size:16px}
.continue a{padding:0 22px;min-height:48px;border:1.5px solid #fff;text-decoration:none!important;transition:background .15s,color .15s}
.continue a:hover{background:#fff;color:var(--ink)!important}
.red-link,.white-link{font-size:16px}
@media (max-width:800px){.continue{align-items:flex-start}.continue a{width:100%;justify-content:center}}`},
{id:'v-label-tracking',tier:'minor',title:'Tracking on uppercase eyebrow labels',principle:'Typographic refinement',
problem:`The 12px uppercase eyebrow labels and uppercase captions have default letter-spacing, which makes small caps look cramped and reduces legibility.`,
fix:`Adds modest letter-spacing to eyebrow labels and the condensed display captions.`,
css:`.label{letter-spacing:.14em}
.caption b,.note,.foot b,form h3,.contact h2{letter-spacing:.01em}
.overview span{letter-spacing:.02em}`},
{id:'v-mute-darken',tier:'minor',title:'Strengthen muted text colour',principle:'Contrast margin (WCAG 1.4.3)',
problem:`--mute #666 gives only 4.8:1 on the grey sections: a thin margin for 11-14px text.`,
fix:`Darkens --mute to #4f4f4f (about 7:1 on grey) and lifts --soft slightly for the dark sections.`,
css:`:root{--mute:#4f4f4f;--soft:#cdcdc9}`},
{id:'v-field-borders',tier:'minor',title:'Visible form field borders and placeholders',principle:'Affordance / non-text contrast (WCAG 1.4.11)',overlaps:['u-form-states'],
problem:`Input borders (#d4d4d0 on #f7f7f5) are about 1.4:1, so fields barely read as fields, and the default placeholder is close to 4.3:1.`,
fix:`A 3:1 border colour, a darker placeholder and a red border on focus.`,
css:`input,select,textarea{border:1px solid #858581!important;background:#fff!important}
input::placeholder,textarea::placeholder{color:#5f5f5f!important;opacity:1}
input:focus,select:focus,textarea:focus{border-color:#bb1736!important}
.consent input{accent-color:#bb1736}`},
{id:'v-reduced-motion',tier:'minor',title:'Respect reduced-motion preference',principle:'Accessibility / vestibular safety',overlaps:['u-focus-motion'],
problem:`html{scroll-behavior:smooth} is applied unconditionally, which can cause discomfort for users who prefer reduced motion.`,
fix:`Turns off smooth scrolling and transitions when prefers-reduced-motion is set.`,
css:`@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*,*:before,*:after{transition:none!important;animation:none!important}}`},
{id:'v-link-hover',tier:'minor',title:'Hover and active states for links and buttons',principle:'Feedback / affordance',overlaps:['u-honest-links','u-nav-hover-active'],
problem:`Nav links, text links and buttons have no hover state, so nothing signals that arrow links like 'Start your project' are clickable.`,
fix:`Subtle colour and underline hover states and a button darken, with short transitions.`,
css:`nav#nav a,.foot nav a,.top,.red-link,.white-link,.continue a,.actions .plain,.btn{transition:color .15s,background-color .15s,text-decoration-color .15s}
nav#nav a:hover,.foot nav a:hover{color:#bb1736}
.red-link:hover,.white-link:hover,.continue a:hover,.actions .plain:hover,.top:hover{text-decoration:underline;text-underline-offset:5px;text-decoration-thickness:2px}
.btn:hover{background:#9a122d}
.contact .btn:hover,.contact a:hover{background:#fff;color:#bb1736}
summary:hover{color:#bb1736}`},
{id:'v-swatch-outline',tier:'minor',title:'Outline pale colour swatches',principle:'Figure-ground',
problem:`The #e9e7e0 and #d4d2cc swatches sit on the #ececea section and nearly disappear (about 1.1:1 against the background).`,
fix:`Adds a hairline outline to the swatches and slightly larger chips on mobile.`,
css:`.swatches i{outline:1px solid rgba(20,20,20,.28);outline-offset:-1px;display:block}
@media (max-width:800px){.swatches i{width:56px;height:56px}}`},
{id:'v-faq-no-shift',tier:'minor',title:'Stop FAQ layout jump on open',principle:'Stability / consistency',overlaps:['u-faq-affordance'],
problem:`details[open] summary changes font-size from 16px to 17px, so the question reflows and jumps when toggled, and the +/- glyph has no fixed box.`,
fix:`Keeps one font size and gives the toggle glyph a fixed centred box.`,
css:`details[open] summary{font-size:16px!important}
summary{align-items:center}
summary:after{flex:0 0 28px;text-align:center;color:#bb1736;font-weight:500}`}
];
