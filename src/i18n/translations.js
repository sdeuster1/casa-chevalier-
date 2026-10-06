// ============================================================
//  Casa Chevalier — site copy in English and Italian
// ============================================================
//  English is the original site copy. Italian is a draft to be
//  reviewed against the Brand Voice Guide before going live.
//  Any key missing from `it` falls back to English.
// ============================================================

const en = {
  lang: { en: 'EN', it: 'IT', switchTo: 'Switch language' },

  sections: {
    ALL: 'ALL',
    PANTS: 'PANTS',
    SHIRTS: 'SHIRTS',
    JACKETS: 'JACKETS',
    VESTS: 'VESTS',
    ACCESSORIES: 'ACCESSORIES',
  },

  menu: {
    collection: 'THE CAPSULE COLLECTION',
    philosophy: 'OUR PHILOSOPHY',
    news: 'CC NEWS',
    contacts: 'CONTACTS',
    close: 'Close menu',
  },

  nav: {
    menu: 'Menu',
    home: 'Casa Chevalier — home',
    search: 'Search',
    wishlist: 'Wishlist',
    account: 'Account',
    bag: 'Shopping bag',
    closeSearch: 'Close search',
    searchPlaceholder: 'Search the collection...',
    noResults: 'No results for "{query}"',
    startTyping: 'Start typing to browse the collection.',
  },

  footer: {
    subscribeTitle: 'Subscribe to our newsletter',
    subscribeOffer: 'Subscribe and receive 10% off your first order.',
    subscribeNote: 'Be the first to know about new collections and exclusive events.',
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
    getInTouch: 'Get in Touch',
    company: 'Company',
    contacts: 'Contacts',
    faq: 'FAQ',
    philosophy: 'Our Philosophy',
    news: 'CC News',
    rights: '© 2026 Casa Chevalier. All rights reserved.',
  },

  common: {
    discover: 'Discover',
    previous: 'Previous',
    next: 'Next',
    viewProduct: 'View Product',
    soldOut: 'Sold Out',
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    continueShopping: 'Continue Shopping',
  },

  home: {
    interlude1: 'Equestrian elegance, shaped by Italian craftsmanship.',
    interlude2: 'From saddle to table.',
    shopTheLook: 'Shop the Look',
    newsTitle: 'News from Casa Chevalier',
    newsCta: 'DISCOVER',
    newsItems: [
      { category: 'EQUESTRIAN', title: 'The Art of Riding in Style' },
      { category: 'EDITORIAL', title: 'Spring Summer 2026 Campaign' },
      { category: 'EVENTS', title: 'Casa Chevalier at Milano Fashion Week' },
    ],
  },

  newsletter: {
    close: 'Close popup',
    welcome: 'Welcome',
    codeOnWay: 'Your 10% discount code is on its way to your inbox.',
    title: '10% Off Your Next Purchase',
    body: 'Subscribe to our newsletter and receive a 10% discount on your next purchase.',
    emailPlaceholder: 'Your email',
    claim: 'Claim My 10%',
    decline: 'No, thank you',
  },

  products: {
    title: 'The Collection',
    subtitle: 'Equestrian sartorial pieces, handcrafted in Italy',
    unavailable: 'The collection is momentarily unavailable. Please try again shortly.',
    empty: 'No pieces in this category yet.',
    viewAll: 'View All',
  },

  product: {
    notFound: 'Product not found.',
    back: 'Back to Collection',
    view: '{name} view {n}',
    size: 'Size: {size}',
    sizeLabel: 'Size',
    sizeRequired: 'Please select a size to continue.',
    onlyInSize: 'Only {count} available in size {size}. Your bag has been updated.',
    sizeGone: 'Size {size} is no longer available.',
    addFailed: 'Could not add to bag. Please try again.',
    remaining: 'Only {count} remaining.',
    remainingInSize: 'Only {count} remaining in size {size}.',
    adding: 'Adding…',
    added: 'Added to Bag ✓',
    addToBag: 'Add to Bag',
    viewBag: 'View bag',
    details: 'Details',
    detailsFallback: 'Handcrafted in Italy.',
    composition: 'Composition',
    related: 'You May Also Like',
  },

  bag: {
    title: 'Your Bag',
    subtitle: 'Curated pieces, ready for checkout',
    empty: 'Your bag is currently empty. Discover our capsule collection and add your favourite pieces.',
    size: 'Size: {size}',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    remove: 'Remove',
    onlyAvailable: 'Only {count} available.',
    summary: 'Order Summary',
    subtotalOne: 'Subtotal ({count} item)',
    subtotalMany: 'Subtotal ({count} items)',
    taxes: 'Shipping and taxes calculated at checkout.',
    redirecting: 'Taking you to checkout…',
    checkout: 'Proceed to Checkout',
  },

  wishlist: {
    title: 'Wishlist',
    subtitle: 'Your saved pieces',
    empty: "You haven't saved any items yet. Browse the collection and tap the heart icon on pieces you love.",
    explore: 'Explore the Collection',
  },

  account: {
    createTitle: 'Create Account',
    welcomeBack: 'Welcome Back',
    createSubtitle: 'Join Casa Chevalier for a tailored experience',
    signInSubtitle: 'Sign in to your account',
    fullName: 'Full name',
    email: 'Email',
    password: 'Password',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    toSignIn: 'Already have an account? Sign in',
    toSignUp: "Don't have an account? Sign up",
  },

  contacts: {
    title: 'Contacts',
    subtitle: 'We are at your service',
    email: 'Email',
    telephone: 'Telephone',
    atelier: 'Atelier',
    address: 'Via Leonardo Bruni 25, Milano, Italia',
    hoursTitle: 'Concierge Hours',
    hoursWeek: 'Monday to Friday, 10:00 — 19:00 CET',
    hoursSaturday: 'Saturday, by appointment',
    name: 'Name',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    sent: 'Message Sent',
    thanks: 'Thank you — our concierge team will be in touch shortly.',
  },

  faq: {
    eyebrow: 'Frequently Asked Questions',
    titleLine1: 'Some answers',
    titleLine2: 'to your questions',
    items: [
      {
        question: 'Where are Casa Chevalier pieces made?',
        answer:
          'Every garment is designed and handcrafted in Italy, drawing on traditional equestrian tailoring techniques passed down through generations of artisans.',
      },
      {
        question: 'What is your shipping policy?',
        answer:
          'We offer complimentary shipping on all orders within the EU. International orders are delivered within 5-10 business days via our courier partners.',
      },
      {
        question: 'Can I return or exchange an item?',
        answer:
          'Yes. Unworn items may be returned within 30 days of delivery for a full refund or exchange. Please contact our concierge team to arrange a return.',
      },
      {
        question: 'Do you offer made-to-measure services?',
        answer:
          'Select pieces from the Capsule Collection can be tailored to measure. Reach out to our concierge team in Milan to discuss availability and lead times.',
      },
      {
        question: 'How do I care for my Casa Chevalier garments?',
        answer:
          'Each piece is delivered with detailed care instructions. In general, we recommend dry cleaning and storing garments away from direct sunlight.',
      },
      {
        question: 'How do I find my size?',
        answer:
          'A detailed size guide is available on every product page. For personalised advice, our concierge team is happy to assist over email or telephone.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes. We deliver worldwide via our courier partners. Duties and taxes for orders outside the EU are calculated at checkout.',
      },
    ],
  },

  news: {
    title: 'CC News',
    subtitle: 'Stories from the house',
    readMore: 'Read More',
    articles: {
      'atelier-milano': {
        category: 'Atelier',
        date: 'March 2026',
        title: 'Inside the Milan Atelier',
        excerpt:
          'A quiet morning behind the doors of Via Leonardo Bruni, where every stitch begins with a single length of Italian thread.',
      },
      'spring-collection': {
        category: 'Collection',
        date: 'February 2026',
        title: 'The Spring Capsule',
        excerpt:
          'Softly tailored blazers, poplin shirts, and heritage breeches — an ode to the ride and the return.',
      },
      concorso: {
        category: 'Events',
        date: 'January 2026',
        title: 'Concorso di Eleganza',
        excerpt:
          'Notes from an afternoon among horses and hand-finished lapels at the annual concorso in Lombardy.',
      },
      'craft-of-leather': {
        category: 'Craft',
        date: 'December 2025',
        title: 'The Craft of Leather',
        excerpt:
          'A conversation with the family tannery in Tuscany that has supplied our belts and saddles for three generations.',
      },
      'from-saddle-to-table': {
        category: 'Lifestyle',
        date: 'November 2025',
        title: 'From Saddle to Table',
        excerpt:
          'The Italian art of moving from stables to lunch — dressed, unhurried, and always in linen.',
      },
      'heritage-of-the-house': {
        category: 'Heritage',
        date: 'October 2025',
        title: 'Heritage of the House',
        excerpt:
          'Chapter one of a series on the sartorial traditions that shape every Casa Chevalier collection.',
      },
    },
  },

  philosophy: {
    title: 'Our Philosophy',
    subtitle: 'Equestrian elegance, shaped by Italian craftsmanship.',
    sections: [
      {
        eyebrow: 'The Foundation',
        title: 'Craftsmanship from the Saddle',
        body:
          'Casa Chevalier was born at the intersection of equestrian tradition and Italian sartorial precision. Every collection begins with the movement of the ride — the tension of the reins, the drape of a jacket in motion, the memory of leather softened by decades of use.',
      },
      {
        eyebrow: 'The Atelier',
        title: 'Made Slowly in Italy',
        body:
          'Our garments are cut and finished in small ateliers across Lombardy and Tuscany. We work with families who have supplied Italian houses for generations — tanneries, wool mills, button makers — and refuse to compromise on the time each piece deserves.',
      },
      {
        eyebrow: 'The Aesthetic',
        title: 'A Quiet Elegance',
        body:
          'We believe in restraint. No visible branding. No trend-led silhouettes. Just considered proportions, honest materials, and details that only reveal themselves to the person wearing them.',
      },
      {
        eyebrow: 'The Future',
        title: 'From Saddle to Table',
        body:
          'Casa Chevalier is not only about clothing. It is a way of moving through the world — from stables to lunch, from evening rides to unhurried conversations. Our capsule collections extend from tailoring into accessories, home, and the objects of a well-considered life.',
      },
    ],
  },
}

const it = {
  lang: { en: 'EN', it: 'IT', switchTo: 'Cambia lingua' },

  sections: {
    ALL: 'TUTTO',
    PANTS: 'PANTALONI',
    SHIRTS: 'CAMICIE',
    JACKETS: 'GIACCHE',
    VESTS: 'GILET',
    ACCESSORIES: 'ACCESSORI',
  },

  menu: {
    collection: 'LA CAPSULE COLLECTION',
    philosophy: 'LA NOSTRA FILOSOFIA',
    news: 'CC NEWS',
    contacts: 'CONTATTI',
    close: 'Chiudi menu',
  },

  nav: {
    menu: 'Menu',
    home: 'Casa Chevalier — home',
    search: 'Cerca',
    wishlist: 'Lista dei desideri',
    account: 'Account',
    bag: 'Shopping bag',
    closeSearch: 'Chiudi ricerca',
    searchPlaceholder: 'Cerca nella collezione...',
    noResults: 'Nessun risultato per "{query}"',
    startTyping: 'Inizia a digitare per esplorare la collezione.',
  },

  footer: {
    subscribeTitle: 'Iscriviti alla newsletter',
    subscribeOffer: 'Iscriviti e ricevi il 10% di sconto sul tuo primo ordine.',
    subscribeNote: 'Scopri in anteprima le nuove collezioni e gli eventi esclusivi.',
    emailPlaceholder: 'La tua email',
    subscribe: 'Iscriviti',
    getInTouch: 'Contattaci',
    company: 'La Maison',
    contacts: 'Contatti',
    faq: 'FAQ',
    philosophy: 'La nostra filosofia',
    news: 'CC News',
    rights: '© 2026 Casa Chevalier. Tutti i diritti riservati.',
  },

  common: {
    discover: 'Scopri',
    previous: 'Precedente',
    next: 'Successivo',
    viewProduct: 'Vedi prodotto',
    soldOut: 'Esaurito',
    addToWishlist: 'Aggiungi alla lista dei desideri',
    removeFromWishlist: 'Rimuovi dalla lista dei desideri',
    continueShopping: 'Continua lo shopping',
  },

  home: {
    // Homepage quotes stay in English in both languages, by brand choice.
    interlude1: 'Equestrian elegance, shaped by Italian craftsmanship.',
    interlude2: 'From saddle to table.',
    shopTheLook: 'Shop the Look',
    newsTitle: 'News da Casa Chevalier',
    newsCta: 'SCOPRI',
    newsItems: [
      { category: 'EQUITAZIONE', title: "L'arte di cavalcare con stile" },
      { category: 'EDITORIALE', title: 'Campagna Primavera Estate 2026' },
      { category: 'EVENTI', title: 'Casa Chevalier alla Milano Fashion Week' },
    ],
  },

  newsletter: {
    close: 'Chiudi',
    welcome: 'Benvenuto',
    codeOnWay: 'Il tuo codice sconto del 10% sta arrivando nella tua casella email.',
    title: '10% di sconto sul tuo prossimo acquisto',
    body: 'Iscriviti alla newsletter e ricevi uno sconto del 10% sul tuo prossimo acquisto.',
    emailPlaceholder: 'La tua email',
    claim: 'Ottieni il 10%',
    decline: 'No, grazie',
  },

  products: {
    title: 'La Collezione',
    subtitle: 'Capi sartoriali equestri, realizzati a mano in Italia',
    unavailable: 'La collezione è momentaneamente non disponibile. Riprova tra poco.',
    empty: 'Non ci sono ancora capi in questa categoria.',
    viewAll: 'Vedi tutto',
  },

  product: {
    notFound: 'Prodotto non trovato.',
    back: 'Torna alla collezione',
    view: '{name} vista {n}',
    size: 'Taglia: {size}',
    sizeLabel: 'Taglia',
    sizeRequired: 'Seleziona una taglia per continuare.',
    onlyInSize: 'Solo {count} disponibili nella taglia {size}. La tua shopping bag è stata aggiornata.',
    sizeGone: 'La taglia {size} non è più disponibile.',
    addFailed: 'Impossibile aggiungere alla shopping bag. Riprova.',
    remaining: 'Solo {count} rimasti.',
    remainingInSize: 'Solo {count} rimasti nella taglia {size}.',
    adding: 'Aggiunta in corso…',
    added: 'Aggiunto alla shopping bag ✓',
    addToBag: 'Aggiungi alla shopping bag',
    viewBag: 'Vedi shopping bag',
    details: 'Dettagli',
    detailsFallback: 'Realizzato a mano in Italia.',
    composition: 'Composizione',
    related: 'Potrebbe piacerti anche',
  },

  bag: {
    title: 'La tua shopping bag',
    subtitle: 'Capi selezionati, pronti per il checkout',
    empty: 'La tua shopping bag è vuota. Scopri la nostra capsule collection e aggiungi i tuoi capi preferiti.',
    size: 'Taglia: {size}',
    decrease: 'Diminuisci quantità',
    increase: 'Aumenta quantità',
    remove: 'Rimuovi',
    onlyAvailable: 'Solo {count} disponibili.',
    summary: "Riepilogo dell'ordine",
    subtotalOne: 'Subtotale ({count} articolo)',
    subtotalMany: 'Subtotale ({count} articoli)',
    taxes: 'Spedizione e tasse calcolate al checkout.',
    redirecting: 'Ti stiamo portando al checkout…',
    checkout: 'Procedi al checkout',
  },

  wishlist: {
    title: 'Lista dei desideri',
    subtitle: 'I tuoi capi salvati',
    empty: "Non hai ancora salvato nessun capo. Esplora la collezione e tocca l'icona del cuore sui capi che ami.",
    explore: 'Esplora la collezione',
  },

  account: {
    createTitle: 'Crea un account',
    welcomeBack: 'Bentornato',
    createSubtitle: "Unisciti a Casa Chevalier per un'esperienza su misura",
    signInSubtitle: 'Accedi al tuo account',
    fullName: 'Nome e cognome',
    email: 'Email',
    password: 'Password',
    signUp: 'Registrati',
    signIn: 'Accedi',
    toSignIn: 'Hai già un account? Accedi',
    toSignUp: 'Non hai un account? Registrati',
  },

  contacts: {
    title: 'Contatti',
    subtitle: 'Siamo al vostro servizio',
    email: 'Email',
    telephone: 'Telefono',
    atelier: 'Atelier',
    address: 'Via Leonardo Bruni 25, Milano, Italia',
    hoursTitle: 'Orari del concierge',
    hoursWeek: 'Dal lunedì al venerdì, 10:00 — 19:00',
    hoursSaturday: 'Sabato, su appuntamento',
    name: 'Nome',
    subject: 'Oggetto',
    message: 'Messaggio',
    send: 'Invia messaggio',
    sent: 'Messaggio inviato',
    thanks: 'Grazie — il nostro team concierge ti contatterà a breve.',
  },

  faq: {
    eyebrow: 'Domande frequenti',
    titleLine1: 'Alcune risposte',
    titleLine2: 'alle vostre domande',
    items: [
      {
        question: 'Dove vengono realizzati i capi Casa Chevalier?',
        answer:
          "Ogni capo è disegnato e realizzato a mano in Italia, secondo le tecniche della sartoria equestre tradizionale tramandate da generazioni di artigiani.",
      },
      {
        question: 'Quali sono le condizioni di spedizione?',
        answer:
          "La spedizione è gratuita per tutti gli ordini all'interno dell'UE. Gli ordini internazionali vengono consegnati in 5-10 giorni lavorativi tramite i nostri corrieri partner.",
      },
      {
        question: 'Posso restituire o cambiare un articolo?',
        answer:
          'Sì. I capi non indossati possono essere restituiti entro 30 giorni dalla consegna per un rimborso completo o un cambio. Contatta il nostro team concierge per organizzare il reso.',
      },
      {
        question: 'Offrite un servizio su misura?',
        answer:
          'Alcuni capi della Capsule Collection possono essere realizzati su misura. Contatta il nostro team concierge a Milano per disponibilità e tempi di realizzazione.',
      },
      {
        question: 'Come devo prendermi cura dei capi Casa Chevalier?',
        answer:
          'Ogni capo viene consegnato con istruzioni di cura dettagliate. In generale, consigliamo il lavaggio a secco e di conservare i capi lontano dalla luce diretta del sole.',
      },
      {
        question: 'Come trovo la mia taglia?',
        answer:
          'Su ogni pagina prodotto è disponibile una guida alle taglie dettagliata. Per un consiglio personalizzato, il nostro team concierge è a tua disposizione via email o telefono.',
      },
      {
        question: 'Spedite in tutto il mondo?',
        answer:
          "Sì. Consegniamo in tutto il mondo tramite i nostri corrieri partner. Dazi e tasse per gli ordini al di fuori dell'UE vengono calcolati al checkout.",
      },
    ],
  },

  news: {
    title: 'CC News',
    subtitle: 'Storie dalla Maison',
    readMore: 'Leggi di più',
    articles: {
      'atelier-milano': {
        category: 'Atelier',
        date: 'Marzo 2026',
        title: "Dentro l'atelier di Milano",
        excerpt:
          'Una mattina silenziosa dietro le porte di Via Leonardo Bruni, dove ogni punto nasce da un unico filo italiano.',
      },
      'spring-collection': {
        category: 'Collezione',
        date: 'Febbraio 2026',
        title: 'La Capsule di Primavera',
        excerpt:
          'Blazer dalla linea morbida, camicie in popeline e breeches di tradizione — un omaggio alla cavalcata e al ritorno.',
      },
      concorso: {
        category: 'Eventi',
        date: 'Gennaio 2026',
        title: 'Concorso di Eleganza',
        excerpt:
          "Appunti da un pomeriggio tra cavalli e revers rifiniti a mano all'annuale concorso in Lombardia.",
      },
      'craft-of-leather': {
        category: 'Artigianato',
        date: 'Dicembre 2025',
        title: "L'arte della pelle",
        excerpt:
          'Una conversazione con la conceria di famiglia in Toscana che da tre generazioni realizza le nostre cinture e le nostre selle.',
      },
      'from-saddle-to-table': {
        category: 'Lifestyle',
        date: 'Novembre 2025',
        title: 'Dalla sella alla tavola',
        excerpt:
          "L'arte tutta italiana di passare dalle scuderie al pranzo — eleganti, senza fretta e sempre in lino.",
      },
      'heritage-of-the-house': {
        category: 'Heritage',
        date: 'Ottobre 2025',
        title: 'Il patrimonio della Maison',
        excerpt:
          'Il primo capitolo di una serie dedicata alle tradizioni sartoriali che danno forma a ogni collezione Casa Chevalier.',
      },
    },
  },

  philosophy: {
    title: 'La nostra filosofia',
    subtitle: "Eleganza equestre, plasmata dall'artigianalità italiana.",
    sections: [
      {
        eyebrow: 'Le origini',
        title: 'Artigianalità dalla sella',
        body:
          "Casa Chevalier nasce dall'incontro tra la tradizione equestre e la precisione sartoriale italiana. Ogni collezione prende vita dal movimento della cavalcata — la tensione delle redini, la caduta di una giacca in movimento, il ricordo di una pelle ammorbidita da decenni di utilizzo.",
      },
      {
        eyebrow: "L'atelier",
        title: 'Fatto con lentezza in Italia',
        body:
          'I nostri capi vengono tagliati e rifiniti in piccoli atelier tra Lombardia e Toscana. Lavoriamo con famiglie che da generazioni servono le maison italiane — concerie, lanifici, bottonifici — e non scendiamo a compromessi sul tempo che ogni capo merita.',
      },
      {
        eyebrow: "L'estetica",
        title: 'Un’eleganza silenziosa',
        body:
          'Crediamo nella misura. Nessun logo in vista. Nessuna silhouette dettata dalle tendenze. Solo proporzioni studiate, materiali autentici e dettagli che si rivelano soltanto a chi li indossa.',
      },
      {
        eyebrow: 'Il futuro',
        title: 'Dalla sella alla tavola',
        body:
          'Casa Chevalier non è solo abbigliamento. È un modo di attraversare il mondo — dalle scuderie al pranzo, dalle cavalcate serali alle conversazioni senza fretta. Le nostre capsule collection si estendono dalla sartoria agli accessori, alla casa e agli oggetti di una vita vissuta con cura.',
      },
    ],
  },
}

export default { en, it }
