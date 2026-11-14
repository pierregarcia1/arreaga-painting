// Design review: motion & aesthetics round. m- = motion/aesthetic. Each change has css and/or js.
// js runs inside the frame's window as a function body (document, window) and may return a cleanup function.
// Previous round (applied to style.css) is kept in changes.archive.js.
window.CHANGES = [
{id:'m-summary',summary:true,title:'Motion & polish direction',problem:`The site's editorial look (condensed type, one red accent, big photography) is already strong, so motion should reinforce it rather than decorate. These changes add scroll reveals tied to the brand, a paint-themed signature moment in the hero, and an interactive colour tool, using only transform and opacity so they stay smooth. Previews skip animation if your system has "reduce motion" turned on.`},

// ---------------- MAJOR ----------------
{id:'m-headline-reveal',tier:'major',title:'Headline line reveals',principle:'Motion hierarchy / delight',
problem:`Every big uppercase heading simply appears; the strongest typography on the page has no entrance.`,
fix:`Each heading line rises out from behind a mask as it scrolls into view (about 0.9s, ease-out, lines staggered 90ms).`,
css:`.rvh{display:block;overflow:hidden;padding-bottom:.06em;margin-bottom:-.06em}
.rvh>span{display:block;transform:translateY(112%);transition:transform .9s cubic-bezier(.2,.7,.1,1);transition-delay:calc(var(--i)*90ms)}
.rvh-in .rvh>span{transform:none}
@media (prefers-reduced-motion:reduce){.rvh>span{transform:none!important;transition:none!important}}`,
js:`var hs=[].slice.call(document.querySelectorAll('h1,h2')),saved=[];
hs.forEach(function(h){
  saved.push([h,h.innerHTML]);
  h.innerHTML=h.innerHTML.split('<br>').map(function(p,i){return '<span class="rvh" style="--i:'+i+'"><span>'+p+'</span></span>'}).join('');
});
var io=new window.IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rvh-in');io.unobserve(e.target)}})},{threshold:.35});
hs.forEach(function(h){io.observe(h)});
return function(){io.disconnect();saved.forEach(function(s){s[0].innerHTML=s[1];s[0].classList.remove('rvh-in')})};`},

{id:'m-image-reveal',tier:'major',title:'Photo wipe-in with slow settle',principle:'Focal emphasis / continuity',overlaps:['m-parallax'],
problem:`Large photos pop in as static rectangles, so the page's best content arrives with no sense of reveal.`,
fix:`Each photo wipes open left to right while settling from a slight zoom, triggered as it enters the viewport.`,
css:`.rvi{clip-path:inset(0 100% 0 0);transform:scale(1.12);transition:clip-path 1.1s cubic-bezier(.7,0,.2,1),transform 1.6s cubic-bezier(.2,.7,.1,1)}
.rvi.rvi-in{clip-path:inset(0 0 0 0);transform:none}
@media (prefers-reduced-motion:reduce){.rvi{clip-path:none!important;transform:none!important;transition:none!important}}`,
js:`var imgs=[].slice.call(document.querySelectorAll('.hero-img img,.photo img,figure img,.story>img,.study img'));
imgs.forEach(function(i){i.classList.add('rvi')});
void document.body.offsetWidth;
// observe each image's container: a fully clipped image would never report as visible
var parents=[];
var io=new window.IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){(e.target.__rvi||[]).forEach(function(i){i.classList.add('rvi-in')});io.unobserve(e.target)}
})},{threshold:.2});
imgs.forEach(function(i){var p=i.parentNode;if(!p.__rvi){p.__rvi=[];parents.push(p);io.observe(p)}p.__rvi.push(i)});
return function(){io.disconnect();parents.forEach(function(p){delete p.__rvi});imgs.forEach(function(i){i.classList.remove('rvi','rvi-in')})};`},

{id:'m-hero-wall-wipe',tier:'major',title:'Hero "fresh coat" wall wipe',principle:'Brand storytelling / signature moment',
problem:`The hero says "Same space. Entirely new feeling." but shows it as a still image.`,
fix:`A flat wall colour is rolled away left to right by a red roller edge, revealing the finished interior. Plays once when the hero is visible.`,
css:`.hero-img{overflow:hidden}
.rvwall{position:absolute;inset:0;z-index:3;background:#d9d7d0;pointer-events:none;will-change:transform}
.rvwall:before{content:"";position:absolute;left:-18px;top:0;bottom:0;width:18px;background:#bb1736}
.rvwall.go{animation:rvwall 1.7s cubic-bezier(.7,0,.2,1) .25s forwards}
@keyframes rvwall{to{transform:translateX(calc(100% + 20px))}}
@media (prefers-reduced-motion:reduce){.rvwall{display:none}}`,
js:`var h=document.querySelector('.hero-img'),w=document.createElement('div');
w.className='rvwall';h.appendChild(w);
var io=new window.IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){w.classList.add('go');io.disconnect()}})},{threshold:.4});
io.observe(h);
return function(){io.disconnect();w.remove()};`},

{id:'m-colour-lab',tier:'major',title:'Interactive colour lab',principle:'Utility as delight / direct manipulation',
problem:`The palette swatches and SOFT / BALANCED / BOLD chips look clickable but do nothing; visitors can't see a colour on a wall, which is the question they actually have.`,
fix:`Hover, focus or click a swatch or chip and the photo beside it re-tints to that colour with a smooth blend. Click again to lock or unlock it.`,
css:`.rvtint{position:absolute;z-index:2;pointer-events:none;mix-blend-mode:multiply;opacity:0;transition:background-color .45s ease,opacity .45s ease}
.swatches i,.cards div{cursor:pointer;transition:transform .3s cubic-bezier(.2,.7,.1,1),outline-color .2s}
.swatches i:hover,.cards div:hover{transform:translateY(-4px)}
.swatches i.rvsel,.cards div.rvsel{outline:2px solid #bb1736;outline-offset:3px}`,
js:`var undo=[];
function wire(items,img,host){
  if(!items.length||!img||!host)return;
  var oldPos=host.style.position;host.style.position='relative';
  var t=document.createElement('div');t.className='rvtint';host.appendChild(t);
  function fit(){t.style.left=img.offsetLeft+'px';t.style.top=img.offsetTop+'px';t.style.width=img.offsetWidth+'px';t.style.height=img.offsetHeight+'px'}
  fit();window.addEventListener('resize',fit);
  var locked=null;
  function show(el){t.style.backgroundColor=window.getComputedStyle(el).backgroundColor;t.style.opacity='.92'}
  function hide(){if(locked)show(locked);else t.style.opacity='0'}
  items.forEach(function(el){
    el.setAttribute('tabindex','0');
    var enter=function(){show(el)},leave=hide,click=function(){
      if(locked===el){locked=null;el.classList.remove('rvsel');hide()}
      else{if(locked)locked.classList.remove('rvsel');locked=el;el.classList.add('rvsel');show(el)}
    },key=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();click()}};
    el.addEventListener('mouseenter',enter);el.addEventListener('mouseleave',leave);el.addEventListener('focus',enter);el.addEventListener('blur',leave);
    el.addEventListener('click',click);el.addEventListener('keydown',key);
    undo.push(function(){el.removeEventListener('mouseenter',enter);el.removeEventListener('mouseleave',leave);el.removeEventListener('focus',enter);el.removeEventListener('blur',leave);el.removeEventListener('click',click);el.removeEventListener('keydown',key);el.removeAttribute('tabindex');el.classList.remove('rvsel')});
  });
  undo.push(function(){window.removeEventListener('resize',fit);t.remove();host.style.position=oldPos});
}
wire([].slice.call(document.querySelectorAll('.swatches i')),document.querySelector('.story>img'),document.querySelector('.story'));
wire([].slice.call(document.querySelectorAll('.cards div')),document.querySelector('.study img'),document.querySelector('.study'));
return function(){undo.forEach(function(f){f()})};`},

// ---------------- MINOR ----------------
{id:'m-hide-header',tier:'minor',title:'Hide header on scroll down, show on scroll up',principle:'Content focus / ergonomic access',
problem:`The 120px header stays pinned at all times and covers a lot of the screen, especially on phones.`,
fix:`The header slides away while you read down and slides back as soon as you scroll up. It never changes size, so no layout shifts.`,
css:`.header{transition:transform .4s cubic-bezier(.4,0,.2,1),box-shadow .25s}
.header.rv-hide{transform:translateY(-130%)}
@media (prefers-reduced-motion:reduce){.header{transition:none}}`,
js:`var h=document.querySelector('.header'),nav=document.getElementById('nav'),last=window.scrollY,ticking=false;
function check(){
  ticking=false;var y=window.scrollY;
  if(nav&&nav.classList.contains('open')){last=y;return}
  if(y>240&&y>last+6)h.classList.add('rv-hide');
  else if(y<last-6||y<=240)h.classList.remove('rv-hide');
  last=y;
}
function onScroll(){if(!ticking){ticking=true;window.requestAnimationFrame(check)}}
window.addEventListener('scroll',onScroll,{passive:true});
return function(){window.removeEventListener('scroll',onScroll);h.classList.remove('rv-hide')};`},

{id:'m-stagger',tier:'minor',title:'Staggered card and list entrances',principle:'Rhythm / perceived performance',
problem:`Service cards, process steps and FAQ rows all appear at once, which reads as a wall of content.`,
fix:`Each group rises and fades in one item after another (80ms apart) as the group enters view.`,
css:`.rvs{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .8s cubic-bezier(.2,.7,.1,1);transition-delay:calc(var(--i,0)*80ms)}
.rvs.rvs-in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.rvs{opacity:1!important;transform:none!important;transition:none!important}}`,
js:`var groups=[['.services','article'],['.steps','div'],['.qs','details'],['.principles','div'],['.opts','div']],els=[],io;
io=new window.IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){[].slice.call(e.target.querySelectorAll('.rvs')).forEach(function(c){c.classList.add('rvs-in')});io.unobserve(e.target)}
})},{threshold:.15});
groups.forEach(function(g){
  var host=document.querySelector(g[0]);if(!host)return;
  var kids=[].slice.call(host.querySelectorAll(g[1])).filter(function(k){return g[1]!=='div'||k.parentNode===host});
  kids.forEach(function(k,i){k.classList.add('rvs');k.style.setProperty('--i',i);els.push(k)});
  io.observe(host);
});
return function(){io.disconnect();els.forEach(function(k){k.classList.remove('rvs','rvs-in');k.style.removeProperty('--i')})};`},

{id:'m-button-fill',tier:'minor',title:'Button fill sweep and arrow nudge',principle:'Feedback / affordance',
problem:`Buttons only flip to a slightly darker red on hover, which feels flat.`,
fix:`A darker red slides across the button from the left on hover, and the ↗ arrow nudges diagonally.`,
css:`.btn{position:relative;overflow:hidden;isolation:isolate}
.btn:before{content:"";position:absolute;inset:0;background:#8f1029;transform:scaleX(0);transform-origin:0 50%;transition:transform .45s cubic-bezier(.2,.7,.1,1);z-index:-1}
.btn:hover:before,.btn:focus-visible:before{transform:scaleX(1)}
.btn span{display:inline-block;transition:transform .3s cubic-bezier(.2,.7,.1,1)}
.btn:hover span{transform:translate(4px,-4px)}
@media (prefers-reduced-motion:reduce){.btn:before,.btn span{transition:none}}`},

{id:'m-card-hover',tier:'minor',title:'Service and process card hover',principle:'Affordance / feedback',
problem:`Service cards and process steps show no response when you point at them.`,
fix:`Cards lift 4px, a red line draws across the top edge, and the number slides slightly and turns to ink.`,
css:`article{position:relative;transition:transform .35s cubic-bezier(.2,.7,.1,1)}
article:hover{transform:translateY(-4px)}
article:after{content:"";position:absolute;left:0;top:-1px;height:2px;width:100%;background:#bb1736;transform:scaleX(0);transform-origin:0 50%;transition:transform .5s cubic-bezier(.2,.7,.1,1)}
article:hover:after{transform:scaleX(1)}
article h3 em{transition:color .3s,transform .3s}
article:hover h3 em{color:#141414;transform:translateX(4px)}
.steps>div{transition:transform .35s cubic-bezier(.2,.7,.1,1)}
.steps>div:hover{transform:translateY(-4px)}
.steps em{display:inline-block;transition:transform .35s cubic-bezier(.2,.7,.1,1)}
.steps>div:hover em{transform:translateX(6px)}
@media (prefers-reduced-motion:reduce){article,article:after,.steps>div,.steps em{transition:none}}`},

{id:'m-parallax',tier:'minor',title:'Subtle photo parallax',principle:'Depth / continuity',overlaps:['m-image-reveal'],
problem:`Photos scroll at exactly the same speed as the text, so the page feels flat.`,
fix:`Photos drift slightly slower than the page (at most about 22px) while staying fully inside their frames.`,
css:`.hero-img,.photo,figure,.story{overflow:hidden}
.hero-img img,.photo img,figure img,.story>img{scale:1.12;translate:0 var(--py,0px);will-change:translate}
@media (prefers-reduced-motion:reduce){.hero-img img,.photo img,figure img,.story>img{scale:1;translate:none}}`,
js:`var imgs=[].slice.call(document.querySelectorAll('.hero-img img,.photo img,figure img,.story>img')),ticking=false;
function update(){
  ticking=false;var vh=window.innerHeight;
  imgs.forEach(function(i){
    var r=i.parentNode.getBoundingClientRect();
    if(r.bottom<0||r.top>vh)return;
    var d=(r.top+r.height/2-vh/2)*-0.07;
    i.style.setProperty('--py',Math.max(-22,Math.min(22,d))+'px');
  });
}
function onScroll(){if(!ticking){ticking=true;window.requestAnimationFrame(update)}}
window.addEventListener('scroll',onScroll,{passive:true});update();
return function(){window.removeEventListener('scroll',onScroll);imgs.forEach(function(i){i.style.removeProperty('--py')})};`},

{id:'m-before-after',tier:'minor',title:'Before / after slider on the cabinet story',principle:'Show, don\'t tell',
problem:`"Small details. Big shift." claims a transformation but only shows the finished result.`,
fix:`Drag across the cabinet photo to compare a washed-out "before" with the finished "after". The before is a simulated desaturated copy until you have a real before photo.`,
css:`.rvba{position:absolute;z-index:2;cursor:ew-resize;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.rvba .rvc{position:absolute;inset:0;overflow:hidden}
.rvba .rvc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(1.2) contrast(.7);pointer-events:none}
.rvba .rvl{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.15)}
.rvba .rvk{position:absolute;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#bb1736;color:#fff;display:grid;place-items:center;font:600 15px Inter,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.35);transition:transform .2s}
.rvba:hover .rvk{transform:scale(1.1)}
.rvba b{position:absolute;top:14px;padding:5px 10px;background:#141414;color:#fff;font:600 11px Inter,sans-serif;letter-spacing:.12em}`,
js:`var story=document.querySelector('.story'),img=document.querySelector('.story>img');
var oldPos=story.style.position;story.style.position='relative';
var box=document.createElement('div');box.className='rvba';
box.innerHTML='<div class="rvc"><img alt="" src="'+img.src+'"></div><div class="rvl"></div><div class="rvk">&harr;</div><b style="left:14px">BEFORE</b><b style="right:14px">AFTER</b>';
story.appendChild(box);
var clip=box.querySelector('.rvc'),line=box.querySelector('.rvl'),knob=box.querySelector('.rvk'),p=50,down=false;
function fit(){box.style.left=img.offsetLeft+'px';box.style.top=img.offsetTop+'px';box.style.width=img.offsetWidth+'px';box.style.height=img.offsetHeight+'px'}
function set(v){p=Math.max(0,Math.min(100,v));clip.style.clipPath='inset(0 '+(100-p)+'% 0 0)';line.style.left=p+'%';knob.style.left=p+'%'}
function move(e){var r=box.getBoundingClientRect();set((e.clientX-r.left)/r.width*100)}
function dn(e){down=true;box.setPointerCapture(e.pointerId);move(e)}
function mv(e){if(down)move(e)}
function up(){down=false}
fit();set(50);
box.addEventListener('pointerdown',dn);box.addEventListener('pointermove',mv);box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
window.addEventListener('resize',fit);
return function(){window.removeEventListener('resize',fit);box.remove();story.style.position=oldPos};`},

{id:'m-grain',tier:'minor',title:'Film grain on dark sections',principle:'Texture / atmosphere',
problem:`The large black sections (hero, projects, consultation) look flat and digital next to the textured photography.`,
fix:`A very faint grain texture sits behind the content on every dark section. Static, so it costs nothing in motion.`,
css:`.dark,.guide{position:relative;isolation:isolate}
.dark:before,.guide:before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.09;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}`},

{id:'m-footer-wordmark',tier:'minor',title:'Oversized footer wordmark',principle:'Brand memorability / confident close',
problem:`The footer ends quietly with small links, so the page loses its voice at the bottom.`,
fix:`A huge outlined RREAGA wordmark closes the page, echoing the condensed headline type.`,
css:`footer:after{content:"RREAGA";display:block;margin-top:6px;text-align:center;font:700 clamp(80px,21vw,330px)/.78 'Barlow Condensed',sans-serif;letter-spacing:.01em;color:transparent;-webkit-text-stroke:2px #d4d4d0;overflow:hidden;user-select:none}
@media (max-width:800px){footer:after{-webkit-text-stroke-width:1.5px}}`}
];
