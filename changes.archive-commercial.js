// Design review suggestions go here. Previous rounds were applied to the site; see changes.archive*.js.
window.CHANGES = [
{id:'f-summary',summary:true,title:'Commercial focus: what to check',problem:`Everything in this preview is draft copy written to show the direction. Before it goes live, confirm each promise (after-hours work, written scope, one point of contact, multi-site jobs) is something Arreaga actually offers, and add real proof such as licences, insurance, references and logos of businesses you have worked for. The photography is still residential, so commercial photos would complete the effect. The residential services are hidden while this toggle is on.`},

{id:'f-commercial-focus',tier:'major',title:'Commercial-first site',principle:'Audience focus / message match',
problem:`The site speaks to homeowners and businesses at once ("Residential & commercial", cabinets and trim, "your room"), so a facilities manager or property owner has to translate it into their own situation, and nothing answers their main questions: disruption, scheduling and getting a clear quote.`,
fix:`Rewrites the page for business clients: a commercial headline and CTA ("Request a commercial quote"), a trust strip (after-hours scheduling, minimal disruption, clear written scope, one point of contact), commercial services (offices, retail and hospitality, multi-unit and property, exteriors), a site-visit-to-handover process, business FAQs, and a quote form with company name, number of locations and commercial service types.`,
css:`.rvtrust{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #414141;background:#1a1a1a}
.rvtrust>div{display:flex;flex-direction:column;gap:8px;padding:26px 28px 30px;border-left:1px solid #414141}
.rvtrust>div:first-child{border-left:0;padding-left:72px}
.rvtrust>div:last-child{padding-right:72px}
.rvtrust i{display:block;width:24px;height:3px;background:var(--red)}
.rvtrust b{font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:600;color:#f7f7f5}
.rvtrust span{font-size:13px;line-height:1.55;color:var(--soft)}
@media (max-width:1100px){.rvtrust>div:first-child{padding-left:32px}.rvtrust>div:last-child{padding-right:32px}.rvtrust b{font-size:21px}}
@media (max-width:800px){.rvtrust{grid-template-columns:1fr 1fr}.rvtrust>div,.rvtrust>div:first-child,.rvtrust>div:last-child{padding:22px 20px;border-left:0;border-top:1px solid #414141}.rvtrust>div:nth-child(-n+2){border-top:0}.rvtrust>div:nth-child(even){border-left:1px solid #414141}}
@media (max-width:520px){.rvtrust{grid-template-columns:1fr}.rvtrust>div:nth-child(even){border-left:0}.rvtrust>div:nth-child(2){border-top:1px solid #414141}}`,
js:`var undo=[];
function $(s){return document.querySelector(s)}
function $$(s){return [].slice.call(document.querySelectorAll(s))}
function html(el,v){if(!el)return;var o=el.innerHTML;el.innerHTML=v;undo.push(function(){el.innerHTML=o})}
function txt(el,v){
  if(!el)return;
  var nodes=[].slice.call(el.childNodes).filter(function(n){return n.nodeType===3&&n.textContent.trim()!==''});
  if(!nodes.length){html(el,v);return}
  var n=nodes[0],o=n.textContent,a=0,b=o.length;
  while(a<b&&o.charAt(a).trim()==='')a++;
  while(b>a&&o.charAt(b-1).trim()==='')b--;
  n.textContent=o.slice(0,a)+v+o.slice(b);
  undo.push(function(){n.textContent=o});
}
function attr(el,k,v){if(!el)return;var o=el.getAttribute(k);el.setAttribute(k,v);undo.push(function(){if(o===null)el.removeAttribute(k);else el.setAttribute(k,o)})}
function heading(h,lines){
  if(!h)return;
  var o=h.innerHTML,wrapped=!!h.querySelector('.rvh');
  h.innerHTML=wrapped?lines.map(function(l,i){return '<span class="rvh" style="--i:'+i+'"><span>'+l+'</span></span>'}).join(''):lines.join('<br>');
  undo.push(function(){h.innerHTML=o});
}
var oldTitle=document.title;document.title='Arreaga Painting · Commercial painting';undo.push(function(){document.title=oldTitle});

/* header and calls to action */
$$('.header .btn,.actions .btn,.nav-cta,.submit .btn').forEach(function(b){txt(b,'Request a commercial quote')});
txt($('.actions .plain'),'See commercial services');

/* hero */
txt($('.hero-msg .label'),'Arreaga Painting · Commercial painting');
heading($('.hero-msg h1'),['Spaces that','work harder.']);
txt($('.hero-msg .lead'),'Painting for offices, retail, hospitality and multi-unit properties. Planned around your business hours and finished to a standard your customers notice.');
txt($('.hero-msg .cue'),'BUILT AROUND YOUR BUSINESS');
txt($('.caption small'),'MINIMAL DISRUPTION');
html($('.caption b'),'Open for business.<br>Freshly painted.');
txt($('.overview small'),'COMMERCIAL PAINTING FOR');
var ov=$$('.overview span');
['Offices','Retail','Hospitality','Multi-unit'].forEach(function(t,i){txt(ov[i],t)});

/* trust strip under the hero */
var strip=document.createElement('div');strip.className='rvtrust';
strip.innerHTML='<div><i></i><b>After-hours scheduling</b><span>Work planned around your opening times.</span></div><div><i></i><b>Minimal disruption</b><span>Protected areas, tidy sites and clear updates.</span></div><div><i></i><b>Clear written scope</b><span>Scope, schedule and price agreed before we start.</span></div><div><i></i><b>One point of contact</b><span>The same person from quote to handover.</span></div>';
var ovEl=$('.overview');if(ovEl&&ovEl.parentNode){ovEl.parentNode.insertBefore(strip,ovEl.nextSibling);undo.push(function(){strip.remove()})}

/* about */
heading($('#about h2'),['More than paint.','A reliable partner.']);
var ab=$$('#about .body');
txt(ab[0],'Your premises are part of your brand. Arreaga Painting helps businesses keep their spaces looking sharp, with work planned around how the building is used.');
txt(ab[1],'From the first site visit to the final walk-through, the focus is simple: understand your operation, protect what surrounds the work, and finish on the agreed schedule.');
var pr=$$('#about .principles b');
['Scheduled around you','Clean, protected sites','Clear communication'].forEach(function(t,i){txt(pr[i],t)});

/* services */
txt($('#services .label'),'Commercial services');
heading($('#services h2'),['Built for','business.']);
txt($('#services .intro .body'),'From a single office floor to multi-site rollouts. Painting services shaped around your premises, your brand and your schedule.');
var svc=[
 ['Offices & workplaces','Refresh workspaces and common areas with durable finishes, scheduled to keep your team working.','Open plan · Meeting rooms · Reception · Corridors'],
 ['Retail & hospitality','Keep customer-facing spaces looking their best, with painting planned around trading hours.','Shopfronts · Dining rooms · Hotels · Showrooms'],
 ['Multi-unit & property','Turnovers, common areas and exteriors for landlords and property managers.','Apartments · Stairwells · Lobbies · Exteriors'],
 ['Exteriors & facades','Restore curb appeal and protect the building with coatings suited to the surface and its exposure.','Facades · Entrances · Railings · Trim']
];
$$('#services article').forEach(function(a,i){
  if(!svc[i])return;
  txt(a.querySelector('h3'),svc[i][0]);txt(a.querySelector('p'),svc[i][1]);txt(a.querySelector('small'),svc[i][2]);
});

/* projects */
txt($('#projects .label'),'Commercial inspiration');
txt($('#projects h2'),'Commercial spaces, refreshed.');
txt($('#projects .note-sm'),'Illustrative concepts, not completed Arreaga projects. A starting point for your premises.');
txt($('figure.big figcaption small'),'INTERIOR CONCEPT / WELCOMING SPACES');
txt($('figure.big figcaption b'),'A welcoming first impression');
txt($('figure.small figcaption small'),'EXTERIOR CONCEPT / CURB APPEAL');
txt($('figure.small figcaption b'),'A facade worth a second look');
txt($('.continue span'),'Planning a refresh for your premises? Let’s talk about the scope.');
txt($('.continue a'),'Request a commercial quote');

/* contrast story, process, colour guide */
txt($('.story .label'),'Inside the idea / Contrast and finish');
txt($('.story .body'),'A deeper color gives familiar architecture a new presence. In a lobby, showroom or workplace, the right contrast feels intentional rather than overpowering.');
txt($('.story .red-link'),'Explore finishes for your premises');
txt($('#process .label'),'From site visit to handover');
heading($('#process h2'),['A clear plan.','Minimal disruption.']);
txt($('#process .intro .body'),'Good work starts with a shared plan. Here’s how a commercial painting project comes together.');
var steps=[
 ['Site walk-through','We visit, review the surfaces and learn how the space is used, and when.'],
 ['Scope, schedule and price','A clear written scope with a schedule built around your operating hours.'],
 ['Prepare and paint','Protect furniture, floors and stock, then paint in agreed stages, after hours if needed.'],
 ['Final walk-through','Review the finished work together and hand the space back ready to use.']
];
$$('#process .steps>div').forEach(function(s,i){if(!steps[i])return;txt(s.querySelector('h4'),steps[i][0]);txt(s.querySelector('p'),steps[i][1])});
txt($('.guide-text .body'),'Color changes with the room, the light and the materials around it. Start with your brand palette and the finish your traffic demands, then consider samples on site.');

/* FAQ */
txt($('.faq-intro .body'),'Every property is different. A site walk-through is the place to ask questions and agree the details.');
var qa=[
 ['What should I include in a quote request?','Tell us the property type, the areas to be painted, the number of locations and your ideal timing. Photos, floor plans and brand colours help us scope the work.'],
 ['Can you work outside business hours?','Yes, where the project calls for it. We’ll plan the schedule around your opening hours and agree it in writing before we start.'],
 ['How do you limit disruption to staff and customers?','We protect furniture and floors, stage the work area by area, and keep you updated throughout.'],
 ['Can you manage more than one location?','Yes. Share the list of sites and we’ll plan a consistent scope and schedule across them.'],
 ['What affects the schedule and cost?','The size and condition of the surfaces, preparation, access and working hours, the number of coats and your finish choices.']
];
$$('.qs details').forEach(function(d,i){if(!qa[i])return;txt(d.querySelector('summary'),qa[i][0]);txt(d.querySelector('p'),qa[i][1])});

/* contact banner and quote form */
txt($('#contact small'),'COMMERCIAL ENQUIRIES');
txt($('#contact h2'),'LET’S TALK BUSINESS.');
txt($('#contact p'),'Planning a refresh for your premises? Use the form below to request a commercial quote from Arreaga Painting.');
txt($('.invite .label'),'Request a commercial quote');
heading($('.invite h2'),['Let’s refresh','your premises.']);
txt($('.invite .body.light:not(.sm)'),'Tell us about your property and what you need. We’ll use your details to arrange a site walk-through and prepare a clear written quote.');
var li=$$('.invite li');
['Property type and areas to be painted','Schedule and working hours','Number of locations and timing'].forEach(function(t,i){txt(li[i],t)});
txt($('.invite .sm'),'Just have a question? Choose “General inquiry” in the form. You don’t need a finished brief to get in touch.');
txt($('form h3'),'TELL US ABOUT YOUR PROPERTY.');
var form=$('form');
if(form){
  var rows=form.querySelectorAll('.row');
  if(rows[0]){
    var extra=document.createElement('div');extra.className='row';
    extra.innerHTML='<label>Company or property name<input name="company" placeholder="Your company"></label><label>Number of locations<select name="locations"><option>1</option><option>2–5</option><option>6 or more</option></select></label>';
    rows[0].parentNode.insertBefore(extra,rows[0].nextSibling);undo.push(function(){extra.remove()});
  }
  var labels=[].slice.call(form.querySelectorAll('label'));
  labels.forEach(function(l){
    var t=l.firstChild&&l.firstChild.nodeType===3?l.firstChild.textContent.trim():'';
    if(t==='Project location *'){txt(l,'Property address *');attr(l.querySelector('input'),'placeholder','Street address or city')}
    if(t==='I’m interested in *'){txt(l,'Service needed *');html(l.querySelector('select'),'<option value="">Select a service</option><option>Offices &amp; workplaces</option><option>Retail &amp; hospitality</option><option>Multi-unit &amp; property</option><option>Exteriors &amp; facades</option><option>General inquiry</option>')}
    if(t==='Project details *'){txt(l,'About the project *');attr(l.querySelector('textarea'),'placeholder','Which areas need painting? Share the size of the space, working hours, access and any questions.')}
  });
}
return function(){while(undo.length)undo.pop()()};`}
];
