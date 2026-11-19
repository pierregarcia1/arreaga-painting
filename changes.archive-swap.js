// Design review suggestions go here. Previous rounds were applied or archived; see changes.archive*.js.
window.CHANGES = [
{id:'v-hero-swap-buttons',tier:'major',title:'Hero: "Explore our services" before the phone button',principle:'Visual hierarchy / task order',
problem:`The hero buttons currently read: Request a consultation, then the phone number, then Explore our services. The phone number sits second on both desktop and phones.`,
fix:`Swaps the second and third buttons so the order is Request a consultation, Explore our services, then the phone number. Same sizes and styling, on desktop and mobile. Nothing else changes.`,
at:'.hero .actions',
css:`.hero .actions .plain{order:1}
.hero .actions .phone-link{order:2}`}
];
