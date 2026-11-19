// Directions options reviewed. The menu version was applied; the two-links version was not.
window.CHANGES_ARCHIVED = [
 {
  "id": "v-directions-menu",
  "tier": "major",
  "title": "Directions: pick-an-app menu",
  "principle": "User control / fewer assumptions",
  "problem": "\"Get directions\" is one Google Maps link, so iPhone and Mac users never get an Apple Maps option.",
  "fix": "Clicking \"Get directions\" opens a small menu with Google Maps and Apple Maps. It closes when you click elsewhere or press Esc, and works with the keyboard. Try this one or the two-links version, not both.",
  "at": ".mapcard",
  "css": ".mapcard{overflow:visible}\n.mapcard .dirwrap{position:relative;display:inline-block}\n.mapcard .dirmenu{position:absolute;left:0;top:calc(100% + 8px);z-index:5;min-width:200px;display:flex;flex-direction:column;background:#fff;border:2px solid #000;box-shadow:0 12px 30px rgba(23,32,43,.25)}\n.mapcard .dirmenu[hidden]{display:none}\n.mapcard .dirmenu a{display:flex;align-items:center;min-height:48px;padding:0 18px;color:#141414;font-weight:700;font-size:15px;text-decoration:none;text-transform:uppercase;letter-spacing:.04em}\n.mapcard .dirmenu a+a{border-top:1px solid #d6dbe1}\n.mapcard .dirmenu a:hover,.mapcard .dirmenu a:focus-visible{background:#bb1736;color:#fff;outline:none}",
  "js": "var card=document.querySelector('.mapcard'),orig=card&&card.querySelector('.red-link');\nif(!orig)return function(){};\nvar T=function(s){return window.__t?window.__t(s):s};\nvar addr=encodeURIComponent('4200 Perimeter Center Dr #245, Oklahoma City, OK 73112');\nvar wrap=document.createElement('span');wrap.className='dirwrap';\norig.parentNode.insertBefore(wrap,orig);wrap.appendChild(orig);\nvar menu=document.createElement('div');menu.className='dirmenu';menu.hidden=true;menu.setAttribute('role','menu');\nmenu.innerHTML='<a role=\"menuitem\" target=\"_blank\" rel=\"noopener\" href=\"'+orig.href+'\">'+T('Google Maps')+'</a><a role=\"menuitem\" target=\"_blank\" rel=\"noopener\" href=\"https://maps.apple.com/?daddr='+addr+'\">'+T('Apple Maps')+'</a>';\nwrap.appendChild(menu);\nvar oldHref=orig.getAttribute('href'),oldTarget=orig.getAttribute('target');\norig.setAttribute('aria-haspopup','true');orig.setAttribute('aria-expanded','false');orig.setAttribute('href','#');orig.removeAttribute('target');\nfunction close(){menu.hidden=true;orig.setAttribute('aria-expanded','false')}\nfunction toggle(e){e.preventDefault();var o=menu.hidden;menu.hidden=!o;orig.setAttribute('aria-expanded',o?'true':'false');if(o)menu.querySelector('a').focus()}\nfunction out(e){if(!wrap.contains(e.target))close()}\nfunction key(e){if(e.key==='Escape'&&!menu.hidden){close();orig.focus()}}\nmenu.addEventListener('click',close);\norig.addEventListener('click',toggle);document.addEventListener('click',out);document.addEventListener('keydown',key);\nreturn function(){orig.removeEventListener('click',toggle);document.removeEventListener('click',out);document.removeEventListener('keydown',key);\norig.setAttribute('href',oldHref);if(oldTarget)orig.setAttribute('target',oldTarget);orig.removeAttribute('aria-haspopup');orig.removeAttribute('aria-expanded');\nwrap.parentNode.insertBefore(orig,wrap);wrap.remove()};"
 },
 {
  "id": "v-directions-two-links",
  "tier": "major",
  "title": "Directions: Google Maps and Apple Maps links",
  "principle": "User control / fewer assumptions",
  "problem": "\"Get directions\" is one Google Maps link, so iPhone and Mac users never get an Apple Maps option.",
  "fix": "Replaces the single link with two side-by-side links, Google Maps and Apple Maps. Always visible, no extra click. Try this one or the menu version, not both.",
  "at": ".mapcard",
  "css": ".mapcard .dirs{display:flex;flex-wrap:wrap;gap:8px 22px}\n.mapcard .dirs a{display:inline-flex;align-items:center;gap:6px}",
  "js": "var card=document.querySelector('.mapcard'),orig=card&&card.querySelector('.red-link');\nif(!orig)return function(){};\nvar T=function(s){return window.__t?window.__t(s):s};\nvar addr=encodeURIComponent('4200 Perimeter Center Dr #245, Oklahoma City, OK 73112');\nvar box=document.createElement('div');box.className='dirs';\nvar g=orig.cloneNode(true),a=orig.cloneNode(true);\nfunction label(el,t){var n=el.firstChild;while(n&&n.nodeType!==3)n=n.nextSibling;if(n)n.nodeValue=T(t)+' '}\nlabel(g,'Google Maps');label(a,'Apple Maps');a.href='https://maps.apple.com/?daddr='+addr;\na.removeAttribute('aria-label');g.removeAttribute('aria-label');\nbox.appendChild(g);box.appendChild(a);\norig.style.display='none';orig.parentNode.insertBefore(box,orig.nextSibling);\nreturn function(){box.remove();orig.style.display=''};"
 }
];
