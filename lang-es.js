/* Spanish version of the site. Loaded last by index.html.
 *
 * How it works: the page is written in English. Switching to Spanish walks every text node and a few attributes
 * (placeholder, alt, title, aria-label) and swaps each string for its Spanish twin from the ES table below, remembering
 * the English original so it can be put back. Any string that is not in the table simply stays English, so adding or
 * editing English copy never breaks the page: add the new English text and its Spanish to ES to translate it.
 *
 * To add or fix a translation: the key must be the English text exactly as it appears in the page (curly apostrophes
 * and all); the value is the Spanish. The Spanish is written in the formal "usted" form and should be reviewed by a
 * native speaker before launch.
 */
(function () {
  'use strict';

  var ES = {
    /* header and navigation */
    "Home": "Inicio", "About": "Nosotros", "Services": "Servicios", "Projects": "Proyectos", "Contact": "Contacto",
    "Request a consultation": "Solicitar consulta",
    "Menu": "Menú",
    "Call Arreaga Painting": "Llamar a Arreaga Painting",
    "Arreaga Painting · Commercial painting": "Arreaga Painting · Pintura comercial",

    /* hero */
    "Arreaga Painting · Commercial & residential": "Arreaga Painting · Comercial y residencial",
    "Commercial": "Pintura",
    "painting.": "comercial.",
    "Professional painting for commercial and residential spaces.": "Pintura profesional para espacios comerciales y residenciales.",
    "Explore our services": "Nuestros servicios",
    "SEE WHAT WE DO": "VEA LO QUE HACEMOS",
    "QUALITY FINISHES": "ACABADOS DE CALIDAD",
    "Clean lines.": "Líneas limpias.",
    "Lasting results.": "Acabado duradero.",
    "A FINISH FOR EVERY SPACE": "UN ACABADO PARA TODO",
    "Interior painting": "Pintura interior",
    "Exterior painting": "Pintura exterior",
    "Commercial spaces": "Espacios comerciales",
    "Cabinets & trim": "Gabinetes y molduras",
    "Aerial view of a commercial building being repainted by Arreaga Painting": "Vista aérea de un edificio comercial siendo repintado por Arreaga Painting",

    /* about */
    "THE DETAILS MAKE": "LOS DETALLES HACEN",
    "THE DIFFERENCE.": "LA DIFERENCIA.",
    "About Arreaga": "Sobre Arreaga",
    "Quality work.": "Trabajo de calidad.",
    "Done right.": "Bien hecho.",
    "Arreaga Painting delivers professional painting and finishing for commercial and residential properties.": "Arreaga Painting ofrece pintura y acabados profesionales para propiedades comerciales y residenciales.",
    "We plan carefully, protect your space and finish every surface to a high standard.": "Planificamos con cuidado, protegemos su espacio y terminamos cada superficie con un alto estándar.",
    "Careful preparation": "Preparación cuidadosa",
    "Quality finishes": "Acabados de calidad",
    "Respect for your space": "Respeto por su espacio",
    "Precision brushwork": "Trabajo de brocha de precisión",

    /* services */
    "What we do": "Lo que hacemos",
    "Painting and": "Pintura y",
    "finishing.": "acabados.",
    "Interior, exterior, commercial and cabinet painting for projects of any size.": "Pintura interior, exterior, comercial y de gabinetes para proyectos de cualquier tamaño.",
    "Walls, ceilings, doors and trim, prepared and finished cleanly.": "Paredes, techos, puertas y molduras, preparados y terminados con limpieza.",
    "Walls · Ceilings · Doors · Trim": "Paredes · Techos · Puertas · Molduras",
    "Durable coatings matched to the surface and the weather exposure.": "Recubrimientos duraderos adaptados a la superficie y a la exposición al clima.",
    "Siding · Fascia · Entryways · Exterior trim": "Fachadas · Aleros · Entradas · Molduras",
    "Painting for offices, retail and shared spaces, scheduled around your operations.": "Pintura para oficinas, comercios y espacios compartidos, programada según su operación.",
    "Offices · Retail · Shared interiors": "Oficinas · Comercios · Interiores compartidos",
    "Cabinets & woodwork": "Gabinetes y madera",
    "Cabinets, built-ins and woodwork refinished for a smooth, durable surface.": "Gabinetes, muebles empotrados y carpintería renovados con una superficie lisa y duradera.",
    "Cabinets · Built-ins · Doors · Millwork": "Gabinetes · Puertas · Carpintería",

    /* our services */
    "Our services": "Nuestros servicios",
    "Everything your surfaces need.": "Todo lo que sus superficies necesitan.",
    "Painting": "Pintura",
    "Drywall Finishing": "Paneles de yeso",
    "Wallcoverings": "Revestimientos de pared",
    "Concrete & Flooring": "Concreto y pisos",
    "Interior Painting": "Pintura interior",
    "Exterior Painting": "Pintura exterior",
    "Repainting & Renovations": "Repintado y renovaciones",
    "Surface Preparation": "Preparación de superficies",
    "Taping & Mudding": "Cinta y masilla",
    "Texture Matching": "Igualado de texturas",
    "Wall Repairs & Smoothing": "Reparación y alisado",
    "Level 4 & 5 Finishes": "Acabados nivel 4 y 5",
    "Wallpaper Installation": "Instalación de papel tapiz",
    "Decorative Wall Finishes": "Acabados decorativos de pared",
    "Commercial Wallcovering Solutions": "Revestimiento comercial",
    "Concrete Sealer": "Sellador de concreto",
    "Color Flooring": "Pisos de color",
    "Epoxy Flooring": "Pisos epóxicos",
    "Interior & Exterior": "Interior y exterior",

    /* who we serve */
    "Who we serve": "A quién servimos",
    "Every kind of space.": "Todo tipo de espacios.",
    "Offices": "Oficinas",
    "Restaurants": "Restaurantes",
    "Retail stores": "Comercios",
    "Hotels": "Hoteles",
    "Warehouses": "Almacenes",
    "Schools": "Escuelas",
    "Churches": "Iglesias",
    "Hospitals": "Hospitales",
    "Homes": "Viviendas",

    /* suppliers */
    "Trusted suppliers": "Proveedores de confianza",
    "Quality paint from names you know.": "Pintura de calidad de marcas conocidas.",
    "Sherwin-Williams": "Sherwin-Williams",
    "Spectrum Paint": "Spectrum Paint",
    "HIS Paint": "HIS Paint",

    /* projects */
    "Our work": "Nuestro trabajo",
    "Real spaces. Real finishes.": "Espacios reales. Obra real.",
    "Photos from Arreaga Painting commercial projects.": "Fotos de proyectos comerciales de Arreaga Painting.",
    "EDUCATION / INSTITUTIONAL": "EDUCACIÓN / INSTITUCIONAL",
    "Lindsey Public Schools": "Lindsey Public Schools",
    "RETAIL / COMMERCIAL EXTERIOR": "COMERCIO / EXTERIOR COMERCIAL",
    "Britton Building": "Britton Building",
    "COMMERCIAL / INTERIOR": "COMERCIAL / INTERIOR",
    "A clean, finished interior": "Un interior impecable",
    "Indoor athletic facility with a turf field and tiger mural at Lindsey Public Schools": "Instalación deportiva techada con campo de césped artificial y un mural de tigre en Lindsey Public Schools",
    "Exterior of the Britton Building, a white-painted brick commercial building with arched storefronts": "Exterior del Britton Building, un edificio comercial de ladrillo pintado de blanco con locales de entrada en arco",
    "Finished commercial interior with polished concrete floors and open workspace": "Interior comercial terminado con pisos de concreto pulido y espacio de trabajo abierto",
    "Have a project? Let’s talk.": "¿Tiene un proyecto? Hablemos.",
    "Start your project": "Comience su proyecto",

    /* cabinet story */
    "Cabinet refinishing": "Renovación de gabinetes",
    "Small details.": "Pequeños toques.",
    "Big shift.": "Gran cambio.",
    "A deeper cabinet color adds depth to the room. Paired with a soft wall tone, the contrast stays clean and balanced.": "Un color más profundo en los gabinetes aporta profundidad al espacio. Con un tono suave en la pared, el contraste se mantiene limpio y equilibrado.",
    "THE PALETTE": "LA PALETA",
    "THE INTENT": "LA INTENCIÓN",
    "Balanced contrast.": "Contraste equilibrado.",
    "A refined finish.": "Un acabado refinado.",
    "Refinish your cabinets": "Renueve sus gabinetes",
    "Cabinet concept": "Concepto de gabinetes",
    "BEFORE": "ANTES",
    "AFTER": "DESPUÉS",

    /* process */
    "Our process": "Nuestro proceso",
    "A clear process,": "Un proceso claro,",
    "start to finish.": "de principio a fin.",
    "Four steps from first call to final walkthrough.": "Cuatro pasos, de la primera llamada a la revisión final.",
    "Consultation": "Consulta",
    "Tell us the surfaces, scope and timing.": "Indíquenos las superficies, el alcance y los plazos.",
    "Plan": "Plan",
    "We confirm preparation, color, finish and scope before work starts.": "Confirmamos preparación, color, acabado y alcance antes de empezar.",
    "Prepare & paint": "Preparar y pintar",
    "We protect surrounding areas, prepare surfaces and apply the finish.": "Protegemos las áreas cercanas, preparamos las superficies y aplicamos el acabado.",
    "Final walkthrough": "Revisión final",
    "We review the finished work with you.": "Revisamos el trabajo terminado con usted.",

    /* colour and finish guide */
    "Color & finish": "Color y acabado",
    "The right color.": "El color ideal.",
    "In the right light.": "Con buena luz.",
    "Color changes with light and surroundings. We recommend testing samples in your space before you decide.": "El color cambia con la luz y el entorno. Recomendamos probar muestras en su espacio antes de decidir.",
    "Discuss your options": "Analice sus opciones",
    "SOFT": "SUAVE", "BALANCED": "EQUILIBRADO", "BOLD": "INTENSO",
    "Matte": "Mate",
    "A soft, understated look.": "Aspecto suave, discreto.",
    "Eggshell": "Cascarón",
    "A subtle, gentle sheen.": "Brillo sutil y delicado.",
    "Satin": "Satinado",
    "A more luminous finish.": "Acabado más luminoso.",
    "Final product and sheen depend on the surface and its use.": "El producto y el brillo finales dependen de la superficie y su uso.",
    "Wall texture": "Textura de pared",

    /* FAQ */
    "FAQ": "Preguntas frecuentes",
    "Common": "Preguntas",
    "questions.": "frecuentes.",
    "Answers to common questions before you request a consultation.": "Respuestas a preguntas comunes antes de solicitar una consulta.",
    "What should I include in a consultation request?": "¿Qué debo incluir en mi solicitud de consulta?",
    "Include the spaces or surfaces, your location and your timing. Photos and approximate dimensions help.": "Indique los espacios o superficies, su ubicación y sus plazos. Las fotos y dimensiones aproximadas ayudan.",
    "Can you help with color and finish?": "¿Pueden ayudar con el color y el acabado?",
    "Yes. We’ll recommend options and samples to test in your space.": "Sí. Recomendamos opciones y muestras para probar en su espacio.",
    "What preparation might my surfaces need?": "¿Qué preparación necesitan mis paredes?",
    "It depends on the surface and its condition. We’ll confirm it before work begins.": "Depende de la superficie y su estado. Lo confirmamos antes de empezar.",
    "How should I prepare my space for painting?": "¿Cómo debo preparar mi espacio para pintar?",
    "We’ll give you clear instructions for clearing and protecting the area.": "Le daremos instrucciones claras para despejar y proteger el área.",
    "What affects the project schedule and cost?": "¿Qué influye en el plazo y el costo?",
    "Scope, surface condition, preparation, finishes and timing.": "Alcance, estado de la superficie, preparación, acabados y plazos.",

    /* contact band and quote form */
    "CONTACT ARREAGA PAINTING": "CONTACTE A ARREAGA PAINTING",
    "LET’S TALK PAINT.": "PINTEMOS JUNTOS.",
    "Have a project or a question? Use the form below to get started.": "¿Tiene un proyecto o una pregunta? Use el formulario para comenzar.",
    "Start your": "Comience su",
    "project": "proyecto",
    "today.": "hoy.",
    "Tell us about your space and what you need. We’ll follow up to discuss the project.": "Cuéntenos sobre su espacio y lo que necesita. Nos comunicaremos para hablar del proyecto.",
    "Spaces and surfaces involved": "Espacios y superficies involucrados",
    "Color, finish and preparation": "Color, acabado y preparación",
    "Scope and timing": "Alcance y plazos",
    "Just have a question? Choose “General inquiry”. No finished plan needed.": "¿Solo una pregunta? Elija “Consulta general”. No necesita un plan terminado.",
    "TELL US ABOUT YOUR PROJECT.": "CUÉNTENOS SOBRE SU PROYECTO.",
    "Fields marked * are required.": "* indica campo obligatorio.",
    "Full name *": "Nombre completo *",
    "Email address *": "Correo electrónico *",
    "Phone number *": "Teléfono *",
    "Project location *": "Ubicación del proyecto *",
    "I’m interested in *": "Me interesa *",
    "Select a service": "Seleccione un servicio",
    "General inquiry": "Consulta general",
    "Preferred timing": "Plazo preferido",
    "Select a timeframe": "Seleccione un plazo",
    "As soon as possible": "Lo antes posible",
    "Within 1–2 months": "En 1–2 meses",
    "In 3–6 months": "En 3–6 meses",
    "Just exploring": "Solo estoy explorando",
    "Not sure? Select General inquiry.": "¿Duda? Elija Consulta general.",
    "Project details *": "Detalles del proyecto *",
    "I agree to be contacted about this inquiry.": "Acepto que me contacten sobre esta consulta.",
    "No obligation.": "Sin compromiso.",
    "We’ll follow up to discuss your project.": "Nos comunicaremos para hablar de su proyecto.",
    "Your name": "Su nombre",
    "Your phone number": "Su número de teléfono",
    "City or ZIP / postal code": "Ciudad o código postal",
    "Which spaces or surfaces would you like to refresh? Share your ideas, approximate scope or any questions.": "¿Qué espacios o superficies desea renovar? Comparta sus ideas, el alcance aproximado o cualquier pregunta.",
    "Thank you. We’ll be in touch.": "Gracias. Nos pondremos en contacto.",

    /* colour palette field */
    "Colour you have in mind": "Color que tiene en mente",
    "Optional": "Opcional",
    "No colour chosen yet": "Aún no ha elegido un color",
    "Clear": "Borrar",
    "Choose a swatch or pick your own. We will find the closest match when we talk.": "Elija una muestra o escoja su propio color. Encontraremos la coincidencia más cercana cuando hablemos.",
    "Pick any colour": "Elija cualquier color",
    "Pick your own colour": "Escoja su propio color",
    "Custom": "Personalizado",
    "closest match": "coincidencia más cercana",
    "Warm White": "Blanco cálido", "Linen": "Lino", "Greige": "Greige", "Taupe": "Taupe", "Mist": "Niebla",
    "Soft Grey": "Gris suave", "Slate": "Pizarra", "Charcoal": "Carbón", "Sage": "Salvia", "Sea Blue": "Azul mar",
    "Navy": "Azul marino", "Terracotta": "Terracota",

    /* map and footer */
    "Our location": "Nuestra ubicación",
    "Map showing Arreaga Painting at 4200 Perimeter Center Dr #245, Oklahoma City, OK 73112": "Mapa que muestra Arreaga Painting en 4200 Perimeter Center Dr #245, Oklahoma City, OK 73112",
    "Visit us": "Visítenos",
    "Google Maps": "Google Maps",
    "Apple Maps": "Apple Maps",
    "Get directions": "Cómo llegar",
    "QUALITY FINISHES.": "ACABADOS DE CALIDAD.",
    "RELIABLE SERVICE.": "SERVICIO CONFIABLE.",
    "Back to top": "Volver arriba",
    "Project photos by Arreaga Painting.": "Fotos de proyectos de Arreaga Painting."
  };

  /* strings that contain a phone number (which will change) are matched by pattern */
  var PATTERNS = [
    [/^Call Arreaga Painting on (.+)$/, 'Llamar a Arreaga Painting al $1'],
    [/^Call (\+?[\d\s().-]+)$/, 'Llamar $1']
  ];

  var ATTRS = ['placeholder', 'alt', 'title', 'aria-label'];
  var KEY = 'arreaga-lang';
  var lang = 'en';
  var REV = null;

  function tr(s) {
    var k = s.trim();
    if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(ES, k)) return ES[k];
    for (var i = 0; i < PATTERNS.length; i++) if (PATTERNS[i][0].test(k)) return k.replace(PATTERNS[i][0], PATTERNS[i][1]);
    return null;
  }
  function rev(s) {
    if (!REV) { REV = {}; for (var k in ES) if (!(ES[k] in REV)) REV[ES[k]] = k; }
    var k2 = s.trim();
    return Object.prototype.hasOwnProperty.call(REV, k2) ? REV[k2] : null;
  }
  /* used by other scripts (the colour palette) to translate text they build at run time */
  window.__t = function (s) { return lang === 'es' ? (tr(s) || s) : s; };

  function skip(node) {
    var p = node.parentNode;
    if (!p || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|SVG)$/i.test(p.nodeName)) return true;
    return !!(p.closest && p.closest('.langbtn,.nav-lang'));
  }
  function textNodes() {
    var out = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) if (!skip(n) && n.nodeValue.trim()) out.push(n);
    return out;
  }
  function swap(node, to) {
    var o = node.nodeValue, a = 0, b = o.length;
    while (a < b && /\s/.test(o.charAt(a))) a++;
    while (b > a && /\s/.test(o.charAt(b - 1))) b--;
    node.nodeValue = o.slice(0, a) + to + o.slice(b);
  }

  function toSpanish() {
    textNodes().forEach(function (n) {
      var t = tr(n.nodeValue);
      if (t !== null && t !== n.nodeValue.trim()) { if (n.__en === undefined) n.__en = n.nodeValue; swap(n, t); n.__es = n.nodeValue; }
    });
    ATTRS.forEach(function (a) {
      [].slice.call(document.querySelectorAll('[' + a + ']')).forEach(function (el) {
        if (el.closest('.langbtn,.nav-lang')) return;
        var t = tr(el.getAttribute(a));
        if (t !== null) { (el.__en = el.__en || {})[a] = el.__en[a] === undefined ? el.getAttribute(a) : el.__en[a]; el.setAttribute(a, t); }
      });
    });
  }
  function toEnglish() {
    textNodes().forEach(function (n) {
      if (n.__en !== undefined && n.nodeValue === n.__es) { n.nodeValue = n.__en; return; }
      var r = rev(n.nodeValue);                       // text another script wrote while in Spanish (e.g. the form's thank-you)
      if (r !== null) swap(n, r);
    });
    [].slice.call(document.querySelectorAll('*')).forEach(function (el) {
      if (el.__en && typeof el.__en === 'object') for (var a in el.__en) el.setAttribute(a, el.__en[a]);
    });
  }

  function labels() {
    var es = lang === 'es';
    [].slice.call(document.querySelectorAll('.langbtn,.nav-lang')).forEach(function (b) {
      b.setAttribute('lang', es ? 'en' : 'es');
      b.setAttribute('aria-label', es ? 'English' : 'Español');
      var lf = b.querySelector('.lf'), sh = b.querySelector('.sh');
      if (lf) lf.textContent = es ? 'English' : 'Español';
      if (sh) sh.textContent = es ? 'EN' : 'ES';
    });
  }
  function title() {
    var t = document.querySelector('title');
    if (!t) return;
    if (lang === 'es') { t.__en = t.__en || t.textContent; t.textContent = tr(t.textContent) || t.textContent; }
    else if (t.__en) t.textContent = t.__en;
  }

  function apply(l, save) {
    lang = l === 'es' ? 'es' : 'en';
    if (lang === 'es') toSpanish(); else toEnglish();
    document.documentElement.setAttribute('lang', lang);
    title(); labels();
    if (save) { try { localStorage.setItem(KEY, lang); } catch (e) {} }
    document.dispatchEvent(new Event('langchange'));   // lets the colour palette re-render its text
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.langbtn,.nav-lang')) {
      apply(lang === 'es' ? 'en' : 'es', true);
      if (typeof window.setMenu === 'function') window.setMenu(false);
    }
  });

  /* developer helper: in the browser console, __langMissing() lists visible English text that has no Spanish entry yet */
  window.__langMissing = function () {
    var seen = {}, out = [];
    textNodes().forEach(function (n) {
      var t = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (!seen[t] && /[A-Za-z]{3}/.test(t) && tr(t) === null && rev(t) === null && !/^[\d\s+().#,·–-]+$/.test(t)) { seen[t] = 1; out.push(t); }
    });
    return out;
  };

  var want = null;
  try { var m = /[?&]lang=(es|en)\b/.exec(location.search); want = m ? m[1] : localStorage.getItem(KEY); } catch (e) {}
  labels();
  if (want === 'es') apply('es', false);
})();
