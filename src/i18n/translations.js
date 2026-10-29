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
    companyDetails: 'B&M S.r.l. · Via Leonardo Bruni 25, 20158 Milano · VAT no. 03247930278 · REA MI-1780714',
  },

  cookies: {
    label: 'Cookie preferences',
    text: 'We use analytics cookies only with your consent.',
    policy: 'Cookie Policy',
    accept: 'Accept',
    decline: 'Decline',
    settings: 'Cookie settings',
  },

  common: {
    discover: 'Discover',
    previous: 'Previous',
    next: 'Next',
    soldOut: 'Sold Out',
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    continueShopping: 'Continue Shopping',
    retry: 'Try again',
  },

  pageErrors: {
    notFoundTitle: 'Page not found',
    notFoundBody: 'The page you are looking for has moved or no longer exists.',
    toCollection: 'Discover the collection',
    crashTitle: 'Something went wrong',
    crashBody: 'Please reload the page. If the problem persists, write to info@casachevalier.com.',
    reload: 'Reload page',
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
    title: '10% Off Your First Order',
    body: 'Subscribe to our newsletter and receive a 10% discount on your first order.',
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
    filterLabel: 'Category',
    empty: 'No pieces in this category yet.',
    viewAll: 'View All',
  },

  product: {
    notFound: 'Product not found.',
    unavailable: 'This piece is momentarily unavailable. Please try again shortly.',
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
    madeIn: 'Made in Italy',
    details: 'Details',
    detailsFallback: 'Handcrafted in Italy.',
    composition: 'Composition',
    colour: 'Colour',
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
    taxes: 'VAT included. Shipping calculated at checkout.',
    freeShippingEu: 'Free shipping in Italy and the EU on orders over €350.',
    freeShippingIntl: 'Free shipping outside the EU on orders over €600.',
    redirecting: 'Taking you to checkout…',
    checkout: 'Proceed to Checkout',
    drawerTitle: 'Shopping Bag ({count})',
    view: 'View Bag',
    close: 'Close bag',
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
    office: 'Office',
    address: 'Via Leonardo Bruni 25, Milano, Italia',
    hoursTitle: 'Concierge Hours',
    hoursWeek: 'Monday to Friday, 9:00 — 17:00 CET',
    writeTitle: 'Write to Us',
    writeBody: 'For orders, returns or any other question, write to us by email and we will reply as soon as possible.',
    writeButton: 'Write to Us',
  },

  faq: {
    eyebrow: 'Frequently Asked Questions',
    titleLine1: 'Some answers',
    titleLine2: 'to your questions',
    items: [
      {
        question: 'Where are Casa Chevalier pieces made?',
        answer:
          'Every garment is designed and handcrafted in Italy, drawing on traditional tailoring techniques passed down through generations of artisans.',
      },
      {
        question: 'What is your shipping policy?',
        answer:
          'Shipping costs €8 within Italy and €20 within the European Union, and is free on orders over €350. Orders are delivered within 7 working days of purchase, with BRT in Italy and DHL elsewhere. Full details are in our Shipping & Returns policy.',
      },
      {
        question: 'Can I return or exchange an item?',
        answer:
          'Yes. You may withdraw from your purchase within 14 days of delivery. Items must be unworn and unwashed, with all original labels and tags attached. Return shipping is paid by the customer, unless the item is defective. To start a return, write to info@casachevalier.com.',
      },
      {
        question: 'How do I find my size?',
        answer:
          'A detailed size guide is available on every product page. For personalised advice, our concierge team is happy to help by email at info@casachevalier.com.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes. Outside the European Union we ship to the United Kingdom, Switzerland, the United States, Canada, Australia, Japan, South Korea, Hong Kong, Singapore, Malaysia, the United Arab Emirates, Israel, Norway and New Zealand. Shipping to these countries costs €60 and is free on orders over €600. Customs duties, import taxes and other local charges are not included and are paid by the customer.',
      },
    ],
  },

  news: {
    title: 'CC News',
    subtitle: 'Stories from the house',
    readMore: 'Read the story',
    allNews: 'All news',
    gallery: 'The Gallery',
    photoAlt: '{title}, photo {n} of {total}',
    articles: {
      'the-madrid-ride': {
        kicker: 'Casa Chevalier × Riding Safari Club',
        title: 'The Madrid Ride',
        place: 'La Granja',
        standfirst: 'Ten women, ten horses, and one day to celebrate the beginning of Casa Chevalier.',
        paragraphs: [
          'Just outside Madrid, in the wild surroundings of La Granja, we came together to celebrate the launch of our first capsule collection, BOX 95, and the beginning of our collaboration with Riding Safari Club.',
          'For the occasion, every guest was dressed in Casa Chevalier, including the two pieces created exclusively for the Casa Chevalier × RSC collaboration: the Signature Bombacha in Sand and the Sweatshirt Polo.',
          'We set off on horseback and rode for two hours through an ever-changing landscape — from open grasslands to dense forest, crossing rivers and riding alongside horses roaming freely in the distance.',
          'There was something particularly beautiful about the contrast: refined silhouettes against the rawness of nature. It is a contrast that lies at the heart of Casa Chevalier and of our desire to bring elegance back to equestrian clothing — where refined fabrics, craftsmanship and elegance can coexist naturally with function, comfort and performance. Because one should never have to come at the expense of the other.',
          'Deep in the forest, a long wooden table was waiting for us.',
          'We left the horses tied safely nearby and gathered around the table for a picnic surrounded by nature. Each guest found her place marked by a personalised Casa Chevalier keyring, together with a basket of special gifts from Gil Cagne Makeup, selected in the neutral, earthy tones that define the Casa Chevalier world.',
          'We ate, raised our glasses, talked and spent the afternoon together.',
          'Because beyond the clothes and the horses, the day was also about women supporting women. About making time for one another, sharing ideas, celebrating each other’s projects and dreams, and simply enjoying being together. There are few things more special than a table filled with women supporting one another — surrounded by nature, with horses waiting just a few steps away.',
          'After the picnic, we got back in the saddle and began our ride home, returning around sunset.',
          'It was a day that captured exactly what Casa Chevalier means to us: elegance that can be lived in. Clothes made to move, ride, sit around a table, and carry you through an entire day without compromise.',
        ],
        closing: [
          'Wild nature and refined details.',
          'Friendship and horses.',
          'The saddle and the table.',
        ],
        signoff: 'From Saddle to Table.',
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
    ALL: 'LA COLLEZIONE',
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
    companyDetails: 'B&M S.r.l. · Via Leonardo Bruni 25, 20158 Milano · P.IVA 03247930278 · REA MI-1780714',
  },

  cookies: {
    label: 'Preferenze cookie',
    text: 'Usiamo cookie di analisi solo con il tuo consenso.',
    policy: 'Cookie Policy',
    accept: 'Accetta',
    decline: 'Rifiuta',
    settings: 'Impostazioni cookie',
  },

  common: {
    discover: 'Scopri',
    previous: 'Precedente',
    next: 'Successivo',
    soldOut: 'Esaurito',
    addToWishlist: 'Aggiungi alla lista dei desideri',
    removeFromWishlist: 'Rimuovi dalla lista dei desideri',
    continueShopping: 'Continua lo shopping',
    retry: 'Riprova',
  },

  pageErrors: {
    notFoundTitle: 'Pagina non trovata',
    notFoundBody: 'La pagina che stai cercando è stata spostata o non esiste più.',
    toCollection: 'Scopri la collezione',
    crashTitle: 'Si è verificato un errore',
    crashBody: 'Ricarica la pagina. Se il problema persiste, scrivi a info@casachevalier.com.',
    reload: 'Ricarica la pagina',
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
    title: '10% di sconto sul tuo primo ordine',
    body: 'Iscriviti alla newsletter e ricevi uno sconto del 10% sul tuo primo ordine.',
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
    filterLabel: 'Categoria',
    empty: 'Non ci sono ancora capi in questa categoria.',
    viewAll: 'Vedi tutto',
  },

  product: {
    notFound: 'Prodotto non trovato.',
    unavailable: 'Questo capo è momentaneamente non disponibile. Riprova tra poco.',
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
    madeIn: 'Made in Italy',
    details: 'Dettagli',
    detailsFallback: 'Realizzato a mano in Italia.',
    composition: 'Composizione',
    colour: 'Colore',
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
    taxes: 'IVA inclusa. Spedizione calcolata al checkout.',
    freeShippingEu: 'Spedizione gratuita in Italia e nell’Unione Europea per ordini superiori a 350 €.',
    freeShippingIntl: 'Spedizione gratuita fuori dall’UE per ordini superiori a 600 €.',
    redirecting: 'Ti stiamo portando al checkout…',
    checkout: 'Procedi al checkout',
    drawerTitle: 'Shopping bag ({count})',
    view: 'Vedi la shopping bag',
    close: 'Chiudi la shopping bag',
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
    office: 'Ufficio',
    address: 'Via Leonardo Bruni 25, Milano, Italia',
    hoursTitle: 'Orari del concierge',
    hoursWeek: 'Dal lunedì al venerdì, 9:00 — 17:00',
    writeTitle: 'Scrivici',
    writeBody: 'Per ordini, resi o qualsiasi altra domanda, scrivici via email: ti risponderemo il prima possibile.',
    writeButton: 'Scrivici',
  },

  faq: {
    eyebrow: 'Domande frequenti',
    titleLine1: 'Alcune risposte',
    titleLine2: 'alle vostre domande',
    items: [
      {
        question: 'Dove vengono realizzati i capi Casa Chevalier?',
        answer:
          "Ogni capo è disegnato e realizzato a mano in Italia, secondo le tecniche della sartoria tradizionale tramandate da generazioni di artigiani.",
      },
      {
        question: 'Quali sono le condizioni di spedizione?',
        answer:
          "La spedizione costa 8 € in Italia e 20 € nei paesi dell’Unione Europea ed è gratuita per ordini superiori a 350 €. Gli ordini vengono consegnati entro 7 giorni lavorativi dall’acquisto, con BRT in Italia e DHL negli altri paesi. Tutti i dettagli sono nella pagina Spedizioni e resi.",
      },
      {
        question: 'Posso restituire o cambiare un articolo?',
        answer:
          'Sì. Puoi recedere dall’acquisto entro 14 giorni dalla consegna. I capi devono essere non indossati e non lavati, con tutte le etichette e i cartellini originali. Le spese di reso sono a carico del cliente, salvo in caso di prodotto difettoso. Per avviare un reso scrivi a info@casachevalier.com.',
      },
      {
        question: 'Come trovo la mia taglia?',
        answer:
          'Su ogni pagina prodotto è disponibile una guida alle taglie dettagliata. Per un consiglio personalizzato, il nostro team concierge è a tua disposizione via email all’indirizzo info@casachevalier.com.',
      },
      {
        question: 'Spedite in tutto il mondo?',
        answer:
          "Sì. Al di fuori dell’Unione Europea spediamo in Regno Unito, Svizzera, Stati Uniti, Canada, Australia, Giappone, Corea del Sud, Hong Kong, Singapore, Malesia, Emirati Arabi Uniti, Israele, Norvegia e Nuova Zelanda. Verso questi paesi la spedizione costa 60 € ed è gratuita per ordini superiori a 600 €. Dazi doganali, imposte di importazione e altri oneri locali non sono inclusi e sono a carico del cliente.",
      },
    ],
  },

  news: {
    title: 'CC News',
    subtitle: 'Storie dalla Maison',
    readMore: 'Leggi la storia',
    allNews: 'Tutte le news',
    gallery: 'La galleria',
    photoAlt: '{title}, foto {n} di {total}',
    articles: {
      'the-madrid-ride': {
        kicker: 'Casa Chevalier × Riding Safari Club',
        title: 'The Madrid Ride',
        place: 'La Granja',
        standfirst: 'Dieci donne, dieci cavalli e una giornata per celebrare l’inizio di Casa Chevalier.',
        paragraphs: [
          'Appena fuori Madrid, nella natura incontaminata de La Granja, ci siamo ritrovate per celebrare il lancio della nostra prima capsule collection, BOX 95, e l’inizio della collaborazione con Riding Safari Club.',
          'Per l’occasione, ogni invitata indossava Casa Chevalier, compresi i due capi creati in esclusiva per la collaborazione Casa Chevalier × RSC: la Signature Bombacha in Sand e la Sweatshirt Polo.',
          'Siamo partite a cavallo e abbiamo montato per due ore attraversando paesaggi in continuo cambiamento: grandi distese di prati, boschi, fiumi e cavalli liberi in lontananza.',
          'C’era qualcosa di particolarmente bello nel contrasto tra le nostre silhouette raffinate e la natura nella sua forma più autentica e selvaggia. Un contrasto che racchiude perfettamente l’essenza di Casa Chevalier e il nostro desiderio di riportare l’eleganza nell’abbigliamento equestre: tessuti raffinati, artigianalità ed eleganza possono convivere naturalmente con funzionalità, comfort e performance. Perché scegliere l’una non dovrebbe mai significare rinunciare all’altra.',
          'Nel cuore del bosco, ad aspettarci, una lunga tavolata in legno.',
          'Abbiamo lasciato i cavalli legati in sicurezza poco distante e ci siamo sedute per un picnic immerso nella natura. Ogni ragazza ha trovato il proprio posto segnato da un portachiavi Casa Chevalier personalizzato con il suo nome e un cesto di regali speciali firmati Gil Cagne Makeup, scelti nelle tonalità neutre e della terra che caratterizzano il mondo Casa Chevalier.',
          'Abbiamo mangiato, brindato, parlato e trascorso il pomeriggio insieme.',
          'Perché, oltre agli abiti e ai cavalli, questa giornata parlava anche di donne che sostengono altre donne. Del valore di dedicarsi del tempo, condividere idee, celebrare i progetti e i sogni l’una dell’altra e, semplicemente, godersi il piacere di stare insieme. Poche cose sono più belle di una tavola piena di donne che si sostengono a vicenda, immerse nella natura, con i cavalli ad aspettarle a pochi passi.',
          'Dopo il picnic siamo tornate in sella e abbiamo ripreso il cammino, rientrando al tramonto.',
          'È stata una giornata che ha racchiuso esattamente ciò che Casa Chevalier vuole rappresentare: un’eleganza da vivere. Capi pensati per muoversi, montare a cavallo, sedersi intorno a una tavola e accompagnare una donna durante un’intera giornata, senza compromessi.',
        ],
        closing: [
          'Natura selvaggia e dettagli raffinati.',
          'Amicizia e cavalli.',
          'La sella e la tavola.',
        ],
        signoff: 'From Saddle to Table.',
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
