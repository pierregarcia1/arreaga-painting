// Design review suggestions go here. Previous rounds were applied to the site; see changes.archive.js and changes.archive-motion.js.
window.CHANGES = [
{id:'f-colour-palette',tier:'major',title:'Colour palette in the consultation form',principle:'Reduce effort / capture intent early',
problem:`The form asks about services and timing but not the colour the customer is imagining, which is the first thing a painter needs to quote and prepare samples. Typing "something warm and greyish" in the details box is vague and easy to skip.`,
fix:`A "Colour you have in mind" field: 12 curated paint-friendly swatches plus a pick-your-own colour wheel. A custom pick shows its closest named match. The choice is sent with the request as colour_hex and colour_name, and it is optional.`,
css:`.pal-field{display:flex;flex-direction:column;gap:12px}
.pal-hd{display:flex;justify-content:space-between;align-items:baseline;font-size:12px}
.pal-hd b{font-weight:600}
.pal-hd span{color:var(--mute);font-weight:400}
.pal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:10px}
.pal-sw,.pal-custom{position:relative;display:block!important;aspect-ratio:1;min-height:44px;border-radius:10px;border:1px solid rgba(20,20,20,.18);cursor:pointer;padding:0;transition:transform .2s cubic-bezier(.2,.7,.1,1),box-shadow .2s}
.pal-sw:hover,.pal-custom:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(20,20,20,.14)}
.pal-sw[aria-checked=true],.pal-custom.on{outline:2px solid var(--red);outline-offset:3px}
.pal-sw[aria-checked=true]:after{content:"✓";position:absolute;inset:0;display:grid;place-items:center;font:700 18px Inter,sans-serif}
.pal-sw:focus-visible,.pal-custom:focus-within{outline:3px solid var(--ink);outline-offset:3px}
.pal-custom{background:conic-gradient(from 0deg,#e5484d,#f5a524,#e9e143,#46c35f,#3aa7e5,#8a63d2,#e5484d);overflow:hidden}
.pal-custom.on{background:var(--c)}
.pal-plus{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:600 22px Inter,sans-serif;text-shadow:0 1px 3px rgba(0,0,0,.5);pointer-events:none}
form .pal-custom input[type=color]{position:absolute;inset:0;width:100%;height:100%;min-height:0;padding:0;border:0;opacity:0;cursor:pointer}
.pal-sel{display:flex;align-items:center;gap:10px;min-height:44px;padding:8px 12px;font-size:13px;background:var(--bg);border:1px dashed #b9b9b5;border-radius:8px}
.pal-chip{flex:none;width:24px;height:24px;border-radius:50%;border:1px solid rgba(20,20,20,.2);background:repeating-conic-gradient(#e7e7e4 0 25%,#fff 0 50%) 0 0/10px 10px}
.pal-name{flex:1;color:var(--ink)}
.pal-clear{color:var(--red);font:600 12px Inter,sans-serif;cursor:pointer;padding:8px}
.pal-clear[hidden]{display:none}
.pal-note{font-size:12px;line-height:1.5;color:var(--mute)}`,
js:`var form=document.querySelector('form'),ta=form&&form.querySelector('textarea');
if(!form||!ta)return function(){};
var anchor=ta.closest('label');
var P=[['Warm White','#F4EFE6'],['Linen','#E6DCCB'],['Greige','#C9BFAF'],['Taupe','#9C8F80'],['Mist','#DDE2E3'],['Soft Grey','#B9BEBE'],['Slate','#5E6A70'],['Charcoal','#353737'],['Sage','#9BAA95'],['Sea Blue','#6F8FA3'],['Navy','#2B3A52'],['Terracotta','#B9674A']];
function rgb(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function lum(h){var c=rgb(h);return (0.299*c[0]+0.587*c[1]+0.114*c[2])/255}
function closest(h){var c=rgb(h),best=P[0],bd=1e12;P.forEach(function(p){var q=rgb(p[1]),d=Math.pow(c[0]-q[0],2)+Math.pow(c[1]-q[1],2)+Math.pow(c[2]-q[2],2);if(d<bd){bd=d;best=p}});return best}
// note: spans, not buttons. The form's own submit handler edits the first button in the form.
var wrap=document.createElement('div');wrap.className='pal-field';
wrap.innerHTML='<div class="pal-hd"><b>Colour you have in mind</b><span>Optional</span></div>'+
 '<div class="pal-grid" role="radiogroup" aria-label="Colour you have in mind">'+
 P.map(function(p){return '<span class="pal-sw" role="radio" tabindex="0" aria-checked="false" aria-label="'+p[0]+'" title="'+p[0]+'" data-h="'+p[1]+'" data-n="'+p[0]+'" style="background:'+p[1]+';color:'+(lum(p[1])>0.6?'#141414':'#fff')+'"></span>'}).join('')+
 '<label class="pal-custom" title="Pick any colour"><span class="pal-plus" aria-hidden="true">+</span><input type="color" value="#C9BFAF" aria-label="Pick your own colour"></label></div>'+
 '<div class="pal-sel" aria-live="polite"><i class="pal-chip"></i><span class="pal-name">No colour chosen yet</span><span class="pal-clear" role="button" tabindex="0" hidden>Clear</span></div>'+
 '<p class="pal-note">Choose a swatch or pick your own. We will find the closest match when we talk.</p>'+
 '<input type="hidden" name="colour_hex"><input type="hidden" name="colour_name">';
anchor.parentNode.insertBefore(wrap,anchor);
var sws=[].slice.call(wrap.querySelectorAll('.pal-sw')),custom=wrap.querySelector('.pal-custom'),picker=custom.querySelector('input'),
    chip=wrap.querySelector('.pal-chip'),nm=wrap.querySelector('.pal-name'),clr=wrap.querySelector('.pal-clear'),
    hex=wrap.querySelector('input[name=colour_hex]'),hname=wrap.querySelector('input[name=colour_name]');
function pick(h,n,isCustom){
  sws.forEach(function(s){s.setAttribute('aria-checked',(!isCustom&&s.getAttribute('data-h')===h)?'true':'false')});
  custom.classList.toggle('on',!!isCustom);
  if(isCustom)custom.style.setProperty('--c',h);
  chip.style.background=h;
  var c=closest(h)[0];
  nm.textContent=isCustom?('Custom '+h.toUpperCase()+' · closest match: '+c):(n+' · '+h.toUpperCase());
  hex.value=h.toUpperCase();hname.value=isCustom?(c+' (custom '+h.toUpperCase()+')'):n;
  clr.hidden=false;
}
function reset(){
  sws.forEach(function(s){s.setAttribute('aria-checked','false')});
  custom.classList.remove('on');chip.style.background='';nm.textContent='No colour chosen yet';hex.value='';hname.value='';clr.hidden=true;
}
function onClick(e){var s=e.target.closest('.pal-sw');if(s){pick(s.getAttribute('data-h'),s.getAttribute('data-n'),false);return}if(e.target.closest('.pal-clear'))reset()}
function onKey(e){if(e.key!=='Enter'&&e.key!==' ')return;var t=e.target;if(t.classList.contains('pal-sw')||t.classList.contains('pal-clear')){e.preventDefault();t.click()}}
function onPick(){pick(picker.value,'',true)}
wrap.addEventListener('click',onClick);wrap.addEventListener('keydown',onKey);picker.addEventListener('input',onPick);
return function(){wrap.remove()};`}
];
