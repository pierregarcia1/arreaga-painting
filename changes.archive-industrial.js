// Design review suggestions go here. Previous rounds were applied or archived; see changes.archive*.js.
window.CHANGES = [
{id:'f-summary',summary:true,title:'Industrial commercial look: what this is',problem:`A restyle inspired by the design language of a commercial painting contractor's website: heavy uppercase Work Sans headings, deep red and navy, light blue-grey sections, a full-bleed photo hero, square uppercase buttons, white shadowed cards, an underlined-field quote form and a solid red call-to-action band. Only the styling is borrowed. All wording, photos and the logo stay Arreaga's own. Work Sans loads from Google Fonts while the toggle is on.`},

{id:'f-industrial-style',tier:'major',title:'Industrial commercial look',principle:'Brand fit / visual hierarchy',
problem:`The current look is editorial and residential (condensed headings, soft off-whites, a bright red). For a business audience it reads more boutique than trustworthy and heavy-duty, and the call to action does not stand out as a clear next step.`,
fix:`Switches to a bold commercial look: Work Sans 900 uppercase headings, deep red (#921a12) and navy, cool light-grey sections, a full-bleed photo hero under a dark overlay, uppercase square buttons (with a second "call" button in the header), white shadowed cards for projects and process steps, a navy colour guide and footer, a solid red call-to-action band with two buttons, and a quote form card with underlined fields.`,
css:(function(){
  var P='html.drl ';
  function r(sel,body){return sel.split(',').map(function(s){return P+s.trim()}).join(',')+'{'+body+'}'}
  var WS="'Work Sans',-apple-system,'Segoe UI',Roboto,Arial,sans-serif";
  var out=[];
  // palette: the site reads these variables everywhere
  out.push('html.drl{--red:#921a12;--ink:#17202b;--bg:#f6fafe;--grey:#f0f4f8;--line:#d6dade;--mute:#4a5560;--soft:#c5ccd4}');
  // typography
  out.push(r('body,input,select,textarea,button','font-family:'+WS));
  out.push(r('h1,h2,h3,h4,em,.caption b,.note,.opts b,.foot b,figcaption b,.overview span,.rvtrust b','font-family:'+WS+';font-style:normal'));
  out.push(r('h1,h2','font-weight:900;letter-spacing:-.01em;line-height:1.04'));
  out.push(r('h1','font-size:clamp(36px,6.2vw,84px);line-height:1'));
  out.push(r('h2','font-size:clamp(28px,3.6vw,48px)'));
  out.push(r('.s58','font-size:clamp(28px,3.4vw,44px)'));
  out.push(r('.s76','font-size:clamp(30px,4.2vw,56px)'));
  out.push(r('.contact h2','font-size:clamp(28px,3.8vw,52px);color:#fff'));
  out.push(r('h3,h4,.opts b,figcaption b','font-weight:800'));
  out.push(r('.caption b','font-size:20px;line-height:1.2'));
  out.push(r('.note','font-size:20px;line-height:1.2;background:var(--red)'));
  out.push(r('.overview span','font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:.05em'));
  out.push(r('.foot b','font-size:18px;font-weight:800;line-height:1.25'));
  out.push(r('article h3','font-size:20px;text-transform:uppercase'));
  out.push(r('article h3 em','font-family:'+WS));
  out.push(r('.steps h4','font-size:18px;text-transform:none'));
  out.push(r('.steps em','font-size:44px;font-weight:900;color:var(--line)'));
  out.push(r('form h3','font-size:22px;font-weight:900;text-transform:uppercase'));
  out.push(r('figcaption b','font-size:22px;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:5px'));
  out.push(r('.opts b','font-size:22px'));
  // buttons
  out.push(r('.btn','border-radius:3px;font-size:15px;font-weight:500;letter-spacing:0;text-transform:uppercase;height:52px;padding:0 28px;gap:12px'));
  out.push(r('.btn:hover','background:#6f130d'));
  out.push(r('.header .btn','font-size:15px;height:48px;padding:0 22px;gap:10px'));
  out.push(r('.rvcall svg','width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round'));
  out.push('@media(max-width:1280px){'+r('.header .rvcall','display:none')+'}');
  out.push('@media(min-width:961px){'+r('nav#nav','font-size:15px;font-weight:500;text-transform:uppercase;letter-spacing:.03em;gap:26px')+'}');
  // hero: full-bleed photo under a dark overlay, text on the left
  out.push(r('.hero','display:block;position:relative;height:auto;min-height:620px;padding:0 72px;overflow:hidden'));
  out.push(r('.hero-msg','position:relative;z-index:2;width:min(780px,100%);padding:104px 0 112px;gap:26px'));
  out.push(r('.hero-img','position:absolute;inset:0;z-index:0;flex:none;min-height:0;height:auto;margin:0'));
  out.push(r('.hero-img img','position:absolute;inset:0;width:100%;height:100%;object-fit:cover'));
  out.push(r('.hero-img:after','content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(23,32,43,.92),rgba(23,32,43,.72) 52%,rgba(23,32,43,.32))'));
  out.push(r('.caption','z-index:3;left:auto;right:72px;bottom:40px;width:250px;padding:18px'));
  out.push(r('.lead','font-size:18px;max-width:560px;width:auto;color:#e9edf1'));
  out.push(r('.hero-msg .actions .plain,.phone-link','border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.1);padding:0 22px;border-radius:3px;text-transform:uppercase;font-weight:500;min-height:52px;text-decoration:none;color:#fff'));
  out.push(r('.phone-link','padding:0 22px 0 14px'));
  out.push(r('.phone-link .pi','border:0;width:auto;height:auto'));
  out.push(r('.phone-link:hover .pi','background:transparent'));
  out.push(r('.overview','background:var(--ink);border-top:0'));
  // sections
  out.push(r('.dark:before,.guide:before','display:none'));
  out.push(r('.guide','background:var(--ink)'));
  out.push(r('article','border-top:0;padding:24px 0'));
  out.push(r('article:before','content:"";display:block;width:64px;height:2px;background:var(--red);margin-bottom:22px'));
  // projects: light band with white cards
  out.push(r('#projects.dark','background:var(--bg);color:var(--ink)'));
  out.push(r('#projects h2.on-dark','color:var(--ink)'));
  out.push(r('#projects .label.light,.request .label.light','color:var(--mute)'));   // light labels sit on light bands now
  out.push(r('.note-sm','color:var(--mute)'));
  out.push(r('.gallery','align-items:flex-start'));
  out.push(r('figure','background:#fff;padding:0 0 22px;box-shadow:0 4px 18px rgba(23,32,43,.08);gap:16px'));
  out.push(r('figure.small','padding-top:0'));
  out.push(r('figcaption','padding:0 22px'));
  out.push(r('figcaption small','color:var(--red);font-weight:700;letter-spacing:.08em'));
  out.push(r('figcaption b','color:var(--ink)'));
  out.push(r('.continue','border-top:1px solid var(--line);color:var(--mute)'));
  out.push(r('.continue a','color:var(--ink);border-color:var(--ink)'));
  out.push(r('.continue a:hover','background:var(--ink);color:#fff!important'));
  // process: white cards on a grey band
  out.push(r('#process','background:var(--line)'));
  out.push(r('.steps>div','background:#fff;border-top:0;padding:26px;box-shadow:0 2px 10px rgba(23,32,43,.06)'));
  // solid red call-to-action band
  out.push(r('.contact','flex-direction:column;text-align:center;justify-content:center;gap:14px;padding:64px 32px;background:var(--red)'));
  out.push(r('.contact>div','width:auto;flex:none;align-items:center'));
  out.push(r('.contact p','flex:none;max-width:640px;color:#f6dcda'));
  out.push(r('.contact small','color:#f6dcda;letter-spacing:4px;font-weight:600'));
  out.push(r('.contact .arrow','display:none'));
  out.push(r('.rvbtns','display:flex;flex-direction:row;gap:16px;flex-wrap:wrap;justify-content:center;margin-top:10px'));
  out.push(r('.rvbtns a','display:inline-flex;align-items:center;height:52px;padding:0 28px;border-radius:3px;font-size:15px;font-weight:500;text-transform:uppercase;text-decoration:none'));
  out.push(r('.rvb1','background:#f4d9d6;color:var(--red)'));
  out.push(r('.rvb2','background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.45)'));
  // quote form: light section, shadowed card, underlined fields
  out.push(r('.request.dark','background:var(--bg);color:var(--ink)'));
  out.push(r('.invite h2.on-dark','color:var(--ink)'));
  out.push(r('.invite .body.light,.invite ul','color:var(--mute)'));
  out.push(r('form','box-shadow:0 18px 50px rgba(23,32,43,.16)'));
  out.push(r('form input:not([type=checkbox]),form select,form textarea','border:0;border-bottom:1px solid #9aa3ad;border-radius:0;background:transparent;height:44px;padding:8px 0;font-size:15px'));
  out.push(r('form textarea','height:96px;border:0;border-bottom:1px solid #9aa3ad'));
  out.push(r('form input:focus,form select:focus,form textarea:focus','border-bottom-color:var(--red);box-shadow:none;background:transparent'));
  out.push(r('form input:user-invalid,form select:user-invalid,form textarea:user-invalid','background:transparent;border-bottom-color:var(--red)'));
  out.push(r('form label','font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:rgba(0,0,0,.85)'));
  out.push(r('form label.consent','text-transform:none;letter-spacing:0;font-size:13px;font-weight:400;color:var(--mute)'));
  out.push(r('.submit','flex-direction:column;align-items:stretch;gap:14px'));
  out.push(r('.submit .btn','width:100%;justify-content:center'));
  out.push(r('.submit small','text-align:center;font-style:italic'));
  // footer: navy
  out.push(r('footer','background:var(--ink);color:#fff'));
  out.push(r('.foot nav,.notes','color:var(--soft)'));
  out.push(r('.foot b,.top','color:#fff'));
  out.push(r('footer hr','background:#2d3a4a'));
  out.push(r('.brand img','background:#fff;padding:6px 10px;border-radius:3px;width:150px;height:112px'));
  // smaller screens
  out.push('@media(max-width:1100px){'+r('.hero','padding:0 32px')+r('.hero-msg','padding:80px 0 88px')+r('.caption','right:32px')+r('.contact','padding:56px 32px')+'}');
  out.push('@media(max-width:800px){'+r('.hero','padding:0 20px;min-height:0')+r('.hero-msg','padding:64px 0 72px')+r('.hero-img','height:auto;margin:0')+r('.caption','display:none')+r('.contact','padding:48px 20px')+r('.brand img','width:130px;height:98px')+r('.submit','align-items:stretch')+'}');
  return out.join('\n');
})(),
js:`var de=document.documentElement;
de.classList.add('drl');
var link=document.createElement('link');
link.rel='stylesheet';link.href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800;900&display=swap';
document.head.appendChild(link);
var hb=document.querySelector('.header .btn'),ph=null;
if(hb){
  ph=document.createElement('a');ph.className='btn rvcall';ph.href='tel:+15550100000';
  ph.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>+1 555 010 0000';
  hb.parentNode.insertBefore(ph,hb.nextSibling);
}
var ct=document.querySelector('#contact'),bx=null;
if(ct){
  bx=document.createElement('div');bx.className='rvbtns';
  bx.innerHTML='<a class="rvb1" href="#consultation">Request a consultation</a><a class="rvb2" href="tel:+15550100000">Call +1 555 010 0000</a>';
  ct.appendChild(bx);
}
return function(){de.classList.remove('drl');link.remove();if(ph)ph.remove();if(bx)bx.remove()};`}
];
