// Design review suggestions go here. Previous rounds were applied or archived; see changes.archive*.js.
window.CHANGES = [
{id:'v-bigger-logo',tier:'major',title:'Bigger header logo',principle:'Brand recognition / visual hierarchy',
problem:`The logo is the smallest element in the header: its artwork measures only about 157px wide on desktop and 103px on phones, because the image carries a lot of empty white margin that the header crops away.`,
fix:`Scales the logo up about 35% on desktop (artwork about 211px wide), 20% on tablet-width screens, and 55% on phones (artwork about 160px wide, with the phone bar 8px taller). The empty margin is still cropped, so the header stays a similar height.`,
css:(function(){
  var P='html.biglogo ';
  function r(sel,body){return sel.split(',').map(function(s){return P+s.trim()}).join(',')+'{'+body+'}'}
  var out=[];
  // the logo link becomes a clipping window as tall as the header, so the oversized image never spills onto the page
  out.push(r('.header>a:first-child','display:flex;align-items:center;height:100%;overflow:hidden;line-height:0;flex:none'));
  out.push(r('.logo','display:block;height:197px;width:229px;max-width:none;flex:none'));
  out.push('@media(max-width:1100px){'+r('.logo','height:176px;width:205px')+'}');
  out.push('@media(max-width:960px){'+r('.header','height:104px')+r('.logo','height:150px;width:175px')+r('[id]','scroll-margin-top:112px')+'}');
  return out.join('\n');
})(),
js:`var de=document.documentElement;
de.classList.add('biglogo');
return function(){de.classList.remove('biglogo')};`}
];
