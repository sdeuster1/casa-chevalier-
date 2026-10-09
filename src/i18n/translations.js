// ============================================================
//  Casa Chevalier — site copy in English and Italian
// ============================================================
//  English is the original site copy. Italian is a draft to be
//  reviewed against the Brand Voice Guide before going live.
//  Any key missing from `it` falls back to English.
// ============================================================

const en = {
  lang: { en: 'EN', it: 'IT', switchTo: 'Switch language' },

  instagram: {
    tagline: 'In & beyond the saddle',
    follow: 'Follow us',
    post: 'Instagram post',
  },

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
    shop: 'Collection',
    philosophy: 'Philosophy',
    news: 'CC News',
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
    legal: 'Legal',
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
    heroEyebrow: 'The Capsule Collection',
    heroTitle: 'In & beyond the saddle',
    heroCta: 'Shop the collection',
    heroCta2: 'Our philosophy',
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

  legal: {
    notFound: 'Page not found',
    error: 'This page is momentarily unavailable. Please try again shortly.',
    backHome: 'Back to home',
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
    sending: 'Sending…',
    invalidEmail: 'Please enter a valid email address.',
    error: 'Something went wrong. Please try again in a moment.',
    consent: 'By subscribing you agree to receive emails from Casa Chevalier. You can unsubscribe at any time.',
    privacy: 'Privacy Policy',
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
    moreColours: '{count} colours',
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
          'Shipping costs €8 within Italy and €20 within the European Union, and is free on orders over €350. Orders are delivered within 7 days of purchase. Full details are in our Shipping & Returns policy.',
      },
      {
        question: 'Can I return or exchange an item?',
        answer:
          'Yes. You may withdraw from your purchase within 14 days of delivery. Items must be unworn and unwashed, with all original labels and tags attached. Your first return is free. To start a return, write to eshop@baldangroup.it.',
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
          'Yes. Outside the European Union, including the United Kingdom and Switzerland, shipping costs €60 and is free on orders over €600. Customs duties, import taxes and other local charges are not included and are paid by the customer.',
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
    intro: [
      'Born from a passion for the equestrian world.',
      'Created to bring its timeless elegance into everyday life.',
    ],
    body: [
      'Casa Chevalier was created around the belief that performance and elegance should never have to exist apart.',
      'Rooted in the timeless codes of the equestrian world and the heritage of Made in Italy, Casa Chevalier brings together craftsmanship, refined fabrics and thoughtful design with the functionality required in the saddle. Each piece is conceived to transcend seasons and trends, defined by quality, versatility and an understated sense of elegance.',
      'But Casa Chevalier is not only for riders.',
      'It embraces everything the equestrian world represents: its timeless elegance, its sophistication, its connection to nature and a way of life that extends far beyond the stables. It is for those who live in this world, but equally for every woman who is drawn to its aesthetic and wishes to bring its elegance into her everyday life.',
      'This is the philosophy behind our motto, From Saddle to Table: creating pieces that belong naturally in the saddle, yet transition with the same elegance and versatility to lunch, dinner, the countryside or the city.',
    ],
    closing: 'Designed for a way of living.',
    motto: ['From Saddle to Table.', 'In & beyond the saddle.'],
  },
}

const it = {
  lang: { en: 'EN', it: 'IT', switchTo: 'Cambia lingua' },

  instagram: {
    tagline: 'In & beyond the saddle',
    follow: 'Seguici',
    post: 'Post Instagram',
  },

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
    shop: 'Collezione',
    philosophy: 'Filosofia',
    news: 'CC News',
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
    legal: 'Informazioni legali',
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
    heroEyebrow: 'La Capsule Collection',
    heroTitle: 'In & beyond the saddle',
    heroCta: 'Scopri la collezione',
    heroCta2: 'La nostra filosofia',
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

  legal: {
    notFound: 'Pagina non trovata',
    error: 'Questa pagina è momentaneamente non disponibile. Riprova tra poco.',
    backHome: 'Torna alla home',
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
    sending: 'Invio in corso…',
    invalidEmail: 'Inserisci un indirizzo email valido.',
    error: 'Si è verificato un errore. Riprova tra qualche istante.',
    consent: 'Iscrivendoti accetti di ricevere email da Casa Chevalier. Puoi annullare l’iscrizione in qualsiasi momento.',
    privacy: 'Informativa sulla privacy',
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
    moreColours: '{count} colori',
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
          "La spedizione costa 8 € in Italia e 20 € nei paesi dell’Unione Europea ed è gratuita per ordini superiori a 350 €. Gli ordini vengono consegnati entro 7 giorni dall’acquisto. Tutti i dettagli sono nella pagina Spedizioni e resi.",
      },
      {
        question: 'Posso restituire o cambiare un articolo?',
        answer:
          'Sì. Puoi recedere dall’acquisto entro 14 giorni dalla consegna. I capi devono essere non indossati e non lavati, con tutte le etichette e i cartellini originali. Il primo reso è gratuito. Per avviare un reso scrivi a eshop@baldangroup.it.',
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
          "Sì. Al di fuori dell’Unione Europea, inclusi Regno Unito e Svizzera, la spedizione costa 60 € ed è gratuita per ordini superiori a 600 €. Dazi doganali, imposte di importazione e altri oneri locali non sono inclusi e sono a carico del cliente.",
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
    intro: [
      'Nata dalla passione per il mondo equestre.',
      'Creata per portare la sua eleganza senza tempo nella vita di ogni giorno.',
    ],
    body: [
      'Casa Chevalier nasce dalla convinzione che performance ed eleganza non debbano mai essere separate.',
      'Radicata nei codici senza tempo del mondo equestre e nell’eccellenza del Made in Italy, Casa Chevalier unisce artigianalità, tessuti ricercati e cura del design alla funzionalità necessaria in sella. Ogni creazione nasce per andare oltre le stagioni e le tendenze, espressione di qualità, versatilità e di un’eleganza discreta e senza tempo.',
      'Casa Chevalier non parla soltanto a chi monta a cavallo.',
      'Racchiude tutto ciò che il mondo equestre rappresenta: la sua eleganza senza tempo, la sua sofisticatezza, il legame con la natura e uno stile di vita che va ben oltre le scuderie. È pensata per chi vive questo mondo, ma anche per ogni donna che ne ama l’estetica e desidera portarne l’eleganza nella propria quotidianità.',
      'Da qui nasce il nostro motto, From Saddle to Table: creare pezzi che appartengano con naturalezza alla sella e che, con la stessa eleganza e versatilità, possano accompagnare un pranzo, una cena, una giornata in campagna o la vita in città.',
    ],
    closing: 'L’espressione di uno stile di vita.',
    motto: ['From Saddle to Table.', 'In & beyond the saddle.'],
  },
}

export default { en, it }
