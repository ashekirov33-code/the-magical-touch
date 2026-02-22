export interface NavItem {
  key: string;
  label: string;
  href: string;
}

export interface BrandContent {
  name: string;
  person: string;
}

export interface HeroContent {
  heading: string;
  subtext: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  fallbackPortraitSrc: string;
  imageAlt: string;
  imageFallback: string;
}

export interface SeoPageContent {
  title: string;
  description: string;
}

export interface SeoContent {
  home: SeoPageContent;
  sessions: SeoPageContent;
  shop: SeoPageContent;
  gallery: SeoPageContent;
  about: SeoPageContent;
  testimonials: SeoPageContent;
  contact: SeoPageContent;
}

export interface HowItWorksStep {
  title: string;
  text: string;
}

export interface HomeContent {
  howItWorksTitle: string;
  howItWorksSteps: HowItWorksStep[];
  sessionsTitle: string;
  shopTitle: string;
  aboutTitle: string;
  testimonialsTitle: string;
  finalCtaTitle: string;
  readMoreLabel: string;
  viewAllTestimonialsLabel: string;
  contactLabel: string;
  groupSessionCtaLabel: string;
  individualSessionCtaLabel: string;
}

export interface BioContent {
  short: string;
}

export interface MissionContent {
  statement: string;
}

export interface AboutSectionContent {
  title: string;
  body: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  intro: string;
  sections: AboutSectionContent[];
  kpiTitle: string;
  disclaimerTitle: string;
  disclaimerText: string;
  ctaBookLabel: string;
  ctaShopLabel: string;
  ctaBookHref: string;
  ctaShopHref: string;
  metadataTitle: string;
  metadataDescription: string;
}

export interface SessionGroup {
  title: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  bookCtaLabel: string;
}

export interface SessionPackage {
  id: string;
  title: string;
  price: string;
  bonus?: string;
  special?: string;
  includes: string[];
}

export interface SessionsBookingContent {
  title: string;
  subtitle: string;
  submitLabel: string;
  openEmailLabel: string;
  copyEmailTextLabel: string;
  copiedLabel: string;
  successTitle: string;
  successText: string;
  mailSubjectPrefix: string;
  sessionTypeGroupLabel: string;
  formLabels: {
    fullName: string;
    email: string;
    sessionType: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  };
  placeholders: {
    fullName: string;
    email: string;
    message: string;
    sessionType: string;
  };
  validation: {
    fullNameRequired: string;
    fullNameMin: string;
    emailRequired: string;
    emailInvalid: string;
    sessionTypeRequired: string;
    messageTooLong: string;
  };
  mailBodyLabels: {
    fullName: string;
    email: string;
    sessionType: string;
    preferredDate: string;
    preferredTime: string;
    message: string;
  };
  emptyValue: string;
  disclaimerTitle: string;
  disclaimerText: string;
}

export interface SessionsContent {
  title: string;
  subtitle: string;
  intro: string;
  group: SessionGroup;
  individual: {
    title: string;
    description: string;
    bookPackageLabel: string;
    packages: SessionPackage[];
  };
  experienceTitle: string;
  experienceList: string[];
  booking: SessionsBookingContent;
}

export type ShopCategoryMode = "products" | "inquiry-list" | "inquiry-custom";

export interface ShopCategory {
  key: "jewelry" | "accessories" | "orenda" | "grids" | "archangel";
  label: string;
  description: string;
  mode: ShopCategoryMode;
}

export interface ShopProduct {
  id: string;
  title: string;
  price: string;
  energyNote: string;
  imageIndexHint: number;
}

export interface ShopModalLabels {
  subjectPrefix: string;
  title: string;
  nameLabel: string;
  emailLabel: string;
  itemLabel: string;
  noteLabel: string;
  notePlaceholder: string;
  sendEmailLabel: string;
  copyEmailTextLabel: string;
  copiedLabel: string;
  closeLabel: string;
}

export interface ShopContent {
  title: string;
  subtitle: string;
  defaultCategoryKey: ShopCategory["key"];
  tabsAriaLabel: string;
  categories: ShopCategory[];
  jewelryProducts: ShopProduct[];
  accessoriesProducts: ShopProduct[];
  orendaChoices: string[];
  gridChoices: string[];
  addToBagLabel: string;
  addToBagToastPrefix: string;
  requestLabel: string;
  requestCustomLabel: string;
  customItemLabel: string;
  customPanelDescription: string;
  inquiryPanelTitle: string;
  inquiryPanelSubtitle: string;
  modal: ShopModalLabels;
}

export type TestimonialCountryKey = "USA" | "Canada" | "Bulgaria" | "Cyprus" | "Other";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  countryKey: TestimonialCountryKey;
  excerpt: string;
  highlight?: boolean;
}

export interface TestimonialsPageContent {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  filterAllLabel: string;
  filters: Array<{
    key: TestimonialCountryKey;
    label: string;
  }>;
  emptyTitle: string;
  emptyText: string;
  ctaBookLabel: string;
  ctaBookHref: string;
  ctaContactLabel: string;
  ctaContactHref: string;
  metadataTitle: string;
  metadataDescription: string;
  resultsLabel: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  company: string;
  form: {
    title: string;
    submitLabel: string;
    copyLabel: string;
    copiedLabel: string;
    successTitle: string;
    successText: string;
    defaultSubject: string;
    labels: {
      fullName: string;
      email: string;
      subject: string;
      message: string;
    };
    placeholders: {
      fullName: string;
      email: string;
      subject: string;
      message: string;
    };
    errors: {
      fullNameRequired: string;
      fullNameMin: string;
      emailRequired: string;
      emailInvalid: string;
      subjectRequired: string;
      subjectMin: string;
      messageRequired: string;
      messageMin: string;
      messageMax: string;
    };
    mailBodyLabels: {
      name: string;
      email: string;
      subject: string;
      message: string;
      page: string;
    };
    pageValue: string;
  };
  socials: Array<{
    key: "facebook" | "youtube" | "telegram";
    label: string;
    href: string;
  }>;
  disclaimerTitle: string;
  disclaimerText: string;
  metadataTitle: string;
  metadataDescription: string;
  ctaBookLabel: string;
  ctaBookHref: string;
  ctaShopLabel: string;
  ctaShopHref: string;
}

export interface FooterContent {
  note: string;
  copyright: string;
}

export interface SiteContent {
  brand: BrandContent;
  nav: NavItem[];
  hero: HeroContent;
  seo: SeoContent;
  home: HomeContent;
  bio: BioContent;
  mission: MissionContent;
  about: AboutContent;
  kpi: string[];
  sessions: SessionsContent;
  shop: ShopContent;
  testimonials: Testimonial[];
  testimonialsPage: TestimonialsPageContent;
  contact: ContactContent;
  footer: FooterContent;
}

const WELLNESS_DISCLAIMER =
  "Услугите са с цел релаксация и личностно благополучие и не заместват медицинска консултация.";

export const siteContent: SiteContent = {
  brand: {
    name: "The Magical Touch",
    person: "Елена Михайлова — Енергиен Кристало Лечител",
  },
  nav: [
    { key: "home", label: "Home", href: "/" },
    { key: "sessions", label: "Sessions", href: "/sessions" },
    { key: "shop", label: "Shop", href: "/shop" },
    { key: "gallery", label: "Gallery", href: "/gallery" },
    { key: "about", label: "About", href: "/about" },
    { key: "testimonials", label: "Testimonials", href: "/testimonials" },
    { key: "contact", label: "Contact", href: "/contact" },
  ],
  hero: {
    heading: "Докосни енергията на Вселената",
    subtext:
      "Сканирам енергийното тяло на човека и пренареждам енергията така, че да бъде в хармония и баланс със себе си. Работя с Висшите сили, Архангелите и естествени камъни.",
    primaryCta: {
      label: "Book a Session",
      href: "/sessions#book",
    },
    secondaryCta: {
      label: "Shop Jewelry",
      href: "/shop?cat=jewelry",
    },
    fallbackPortraitSrc: "/placeholders/portrait.webp",
    imageAlt: "The Magical Touch gallery",
    imageFallback: "Gallery image placeholder",
  },
  seo: {
    home: {
      title: "The Magical Touch — Докосни енергията на Вселената",
      description:
        "Premium crystal wellness sessions, soulful rituals and calm cosmic guidance in Chicago + Online.",
    },
    sessions: {
      title: "Sessions — The Magical Touch",
      description:
        "Personal and group crystal sessions designed for relaxation, energetic balance and mindful integration in Chicago + Online.",
    },
    shop: {
      title: "Shop — The Magical Touch",
      description:
        "Explore premium crystal jewelry, ritual accessories and intentional wellness tools curated with calm elegance.",
    },
    gallery: {
      title: "Gallery — The Magical Touch",
      description:
        "Browse the full mystical gallery collection in a serene lightbox experience crafted for calm visual exploration.",
    },
    about: {
      title: "About — The Magical Touch",
      description:
        "Meet Elena Mihaylova and discover a serene crystal wellness approach rooted in intuition, presence and energetic harmony.",
    },
    testimonials: {
      title: "Testimonials — The Magical Touch",
      description:
        "Read client stories and reflections after crystal sessions, shared with gratitude and gentle transformation.",
    },
    contact: {
      title: "Contact — The Magical Touch",
      description:
        "Connect for crystal wellness sessions and inquiries in a calm, premium experience available in Chicago + Online.",
    },
  },
  home: {
    howItWorksTitle: "Как протича една сесия",
    howItWorksSteps: [
      {
        title: "Energy Scan",
        text: "Детайлно енергийно сканиране за ясно разбиране къде е нужна хармонизация.",
      },
      {
        title: "Crystal Alignment",
        text: "Фина кристална работа за подреждане на енергийното поле и възстановяване на поток.",
      },
      {
        title: "Integration",
        text: "Спокойна интеграция и насоки за поддържане на баланса след сесията.",
      },
    ],
    sessionsTitle: "Сесии",
    shopTitle: "Shop",
    aboutTitle: "За мен",
    testimonialsTitle: "Отзиви",
    finalCtaTitle: "Готов/а ли си да се свържеш с вътрешната си светлина?",
    readMoreLabel: "Read more",
    viewAllTestimonialsLabel: "View all testimonials",
    contactLabel: "Contact",
    groupSessionCtaLabel: "View group session",
    individualSessionCtaLabel: "Book individual session",
  },
  bio: {
    short:
      "Владея движението на енергията. Сканирам енергийно тялото на човек и пренареждам енергийното му тяло така, че да бъде в хармония и баланс със себе си.",
  },
  mission: {
    statement:
      "Мисията ми е да БЪДА СЕБЕ СИ и да покажа на 1, 000, 000 човека, че това е пътят към щастието. Следвайки сърцето си, което всъщност е гласът на интуицията.",
  },
  about: {
    title: "За мен",
    subtitle: "Елена Михайлова — Енергиен Кристало Лечител",
    intro:
      "Работя с фина енергия, кристали и осъзнато присъствие, за да подкрепя вътрешен баланс, лекота и връзка с интуицията.",
    sections: [
      {
        title: "Моята работа",
        body:
          "Сканирам енергийното тяло и пренареждам енергийния поток така, че човек да се почувства по-центриран, хармоничен и свързан със себе си.",
      },
      {
        title: "Мисия",
        body:
          "Мисията ми е да БЪДА СЕБЕ СИ и да покажа на 1, 000, 000 човека, че това е пътят към щастието — следвайки сърцето и гласа на интуицията.",
      },
      {
        title: "Какво водя и създавам",
        body:
          "Водя индивидуални и групови сесии, духовни събития и уъркшопове с присъствие Chicago + Online, където хората намират яснота, спокойствие и нова вътрешна посока.",
      },
    ],
    kpiTitle: "Доверие и опит",
    disclaimerTitle: "Важно",
    disclaimerText: WELLNESS_DISCLAIMER,
    ctaBookLabel: "Book a Session",
    ctaShopLabel: "Shop",
    ctaBookHref: "/sessions#book",
    ctaShopHref: "/shop",
    metadataTitle: "About — The Magical Touch",
    metadataDescription:
      "Premium crystal sessions and soulful wellness guidance in Chicago + Online, crafted with calm presence and intention.",
  },
  kpi: [
    "2,500+ енергийни кристални сесии",
    "100+ духовни събития и уъркшопове",
    "Chicago + Online",
  ],
  sessions: {
    title: "Сесии",
    subtitle: "Chicago + Online",
    intro:
      "Сесиите са създадени като пространство за вътрешно успокояване, енергиен баланс и ясна връзка с личното намерение.",
    group: {
      title: "Групови кристални сесии",
      duration: "1 час + споделяния",
      location: "Chicago + Online",
      description: "Енергийна хармонизация в група с работа с кристали и споделяне.",
      highlights: [
        "Водена практика в спокойно и защитено пространство",
        "Кристална работа за фино балансиране на енергията",
        "Време за интеграция и осъзнато споделяне",
      ],
      bookCtaLabel: "Запази място в групова сесия",
    },
    individual: {
      title: "Индивидуални пакети",
      description:
        "Избери пакет според своя ритъм и дълбочината на промяната, която искаш да подкрепиш.",
      bookPackageLabel: "Book this package",
      packages: [
        {
          id: "package1",
          title: "1 Индивидуална сесия",
          price: "$288",
          includes: [
            "Индивидуална енергийна работа",
            "Кратка интеграционна насока след сесия",
          ],
        },
        {
          id: "package3",
          title: "Пакет 3 сесии",
          price: "$999",
          bonus: "1 подарък",
          includes: [
            "3 индивидуални енергийни сесии",
            "Подкрепа за по-стабилен вътрешен баланс",
          ],
        },
        {
          id: "package7",
          title: "Пакет 7 сесии",
          price: "$1,777",
          bonus: "1 подарък",
          special: "Печата на Соломон — привличане на възможности в живота",
          includes: [
            "7 индивидуални енергийни сесии",
            "По-дълбок процес на лична трансформация",
          ],
        },
      ],
    },
    experienceTitle: "Какво можеш да усетиш след сесия",
    experienceList: [
      "Осезаема лекота и освобождаване от вътрешно напрежение",
      "По-ясна мисъл и по-спокоен емоционален ритъм",
      "Усещане за по-добър енергиен баланс в ежедневието",
      "По-дълбока връзка с интуицията и личното намерение",
      "Повече вътрешна устойчивост и увереност",
    ],
    booking: {
      title: "Запази своята сесия",
      subtitle: "Изпрати запитване — ще се свържа с теб за потвърждение.",
      submitLabel: "Send Booking Request",
      openEmailLabel: "Open Email",
      copyEmailTextLabel: "Copy Email Text",
      copiedLabel: "Copied",
      successTitle: "Запитването е подготвено",
      successText:
        "Използвай един от бутоните по-долу, за да изпратиш или копираш текста на запитването си.",
      mailSubjectPrefix: "Booking Request",
      sessionTypeGroupLabel: "Group Session",
      formLabels: {
        fullName: "Full Name",
        email: "Email",
        sessionType: "Session Type",
        preferredDate: "Preferred Date",
        preferredTime: "Preferred Time",
        message: "Message",
      },
      placeholders: {
        fullName: "Your full name",
        email: "you@example.com",
        message: "Share your intention or any important details",
        sessionType: "Select a session",
      },
      validation: {
        fullNameRequired: "Please enter your full name.",
        fullNameMin: "Full name should be at least 2 characters.",
        emailRequired: "Please enter your email.",
        emailInvalid: "Please enter a valid email address.",
        sessionTypeRequired: "Please select a session type.",
        messageTooLong: "Message should be up to 1000 characters.",
      },
      mailBodyLabels: {
        fullName: "Full Name",
        email: "Email",
        sessionType: "Session Type",
        preferredDate: "Preferred Date",
        preferredTime: "Preferred Time",
        message: "Message",
      },
      emptyValue: "-",
      disclaimerTitle: "Важно",
      disclaimerText: WELLNESS_DISCLAIMER,
    },
  },
  shop: {
    title: "Shop",
    subtitle: "Избрани енергийни бижута и ритуални аксесоари, създадени за хармония и намерение.",
    defaultCategoryKey: "jewelry",
    tabsAriaLabel: "Shop categories",
    categories: [
      {
        key: "jewelry",
        label: "Crystal Jewelry",
        description: "Фини бижута с кристали за ежедневна защита и баланс.",
        mode: "products",
      },
      {
        key: "accessories",
        label: "Accessories",
        description: "Ритуални аксесоари за осъзната практика и поддръжка на енергията.",
        mode: "products",
      },
      {
        key: "orenda",
        label: "Orenda Ritual Cups",
        description: "Избери своята Оренда и изпрати запитване за персонална насока.",
        mode: "inquiry-list",
      },
      {
        key: "grids",
        label: "Crystal Grids",
        description: "Кристални решетки за фокус, изобилие и подравняване на намеренията.",
        mode: "inquiry-list",
      },
      {
        key: "archangel",
        label: "Archangel Bracelets",
        description: "Индивидуална гривна по заявка с насочена енергийна символика.",
        mode: "inquiry-custom",
      },
    ],
    jewelryProducts: [
      {
        id: "jewel-aurora-drop",
        title: "Aurora Drop Necklace",
        price: "$49",
        energyNote: "Подкрепя спокойствие и доверие към интуицията през целия ден.",
        imageIndexHint: 1,
      },
      {
        id: "jewel-seraphina-ring",
        title: "Seraphina Ring",
        price: "$62",
        energyNote: "Усилва меката концентрация и стабилността в емоционалното поле.",
        imageIndexHint: 2,
      },
      {
        id: "jewel-ether-earrings",
        title: "Ether Earrings",
        price: "$44",
        energyNote: "Носи лекота и фин енергиен баланс в комуникацията.",
        imageIndexHint: 3,
      },
      {
        id: "jewel-lotus-bracelet",
        title: "Lotus Crystal Bracelet",
        price: "$58",
        energyNote: "Създава усещане за защитено пространство и вътрешен център.",
        imageIndexHint: 4,
      },
      {
        id: "jewel-moonstone-pendant",
        title: "Moonstone Pendant",
        price: "$71",
        energyNote: "Подсилва интуитивната чувствителност и плавния вътрешен ритъм.",
        imageIndexHint: 5,
      },
      {
        id: "jewel-solar-charm",
        title: "Solar Charm Chain",
        price: "$53",
        energyNote: "Поддържа сърдечна отвореност и усещане за доверие в пътя.",
        imageIndexHint: 2,
      },
    ],
    accessoriesProducts: [
      {
        id: "acc-alignment-pouch",
        title: "Alignment Pouch",
        price: "$35",
        energyNote: "Съхранява кристалите в чисто поле и запазва тяхната настройка.",
        imageIndexHint: 3,
      },
      {
        id: "acc-ritual-cloth",
        title: "Ritual Cloth",
        price: "$29",
        energyNote: "Създава подредено и спокойно пространство за ритуална практика.",
        imageIndexHint: 4,
      },
      {
        id: "acc-candle-holder",
        title: "Ceremony Candle Holder",
        price: "$42",
        energyNote: "Фокусира намерението и носи меко присъствие в ритуала.",
        imageIndexHint: 1,
      },
      {
        id: "acc-aura-mist",
        title: "Aura Mist Bottle",
        price: "$27",
        energyNote: "Подкрепя изчистване и освежаване на енергийното поле.",
        imageIndexHint: 5,
      },
      {
        id: "acc-meditation-bowl",
        title: "Meditation Bowl",
        price: "$48",
        energyNote: "Синхронизира вниманието и въвежда ума в спокоен ритъм.",
        imageIndexHint: 2,
      },
      {
        id: "acc-sacred-box",
        title: "Sacred Intention Box",
        price: "$39",
        energyNote: "Поддържа ясно намерение и енергийна последователност всеки ден.",
        imageIndexHint: 4,
      },
    ],
    orendaChoices: [
      "Универсална Оренда",
      "Любов Божествена",
      "Благословия",
      "Вяра, Любов, Мъдрост",
      "Любов",
      "Късмет",
      "Благополучие",
      "Здраве",
      "Енергиен баланс",
      "Изчистване на карма",
      "Лекуване на карма",
      "Промяна",
    ],
    gridChoices: [
      "Балансиране на мъжката и женската енергия",
      "Творчество и плодовитост",
      "Кариера и житейска мисия",
      "Цветето на живота",
    ],
    addToBagLabel: "Add to bag",
    addToBagToastPrefix: "Added to bag",
    requestLabel: "Request",
    requestCustomLabel: "Request a custom bracelet",
    customItemLabel: "Archangel Bracelet (Custom)",
    customPanelDescription:
      "Сподели своето намерение и ще подготвим персонален Archangel Bracelet с най-подходящата символика.",
    inquiryPanelTitle: "Изпрати запитване",
    inquiryPanelSubtitle: "Избери опция и изпрати детайли по имейл.",
    modal: {
      subjectPrefix: "Inquiry",
      title: "Inquiry Details",
      nameLabel: "Name",
      emailLabel: "Email",
      itemLabel: "Selected item",
      noteLabel: "Note",
      notePlaceholder: "Share any intention or preferred details",
      sendEmailLabel: "Send Email",
      copyEmailTextLabel: "Copy email text",
      copiedLabel: "Copied",
      closeLabel: "Close",
    },
  },
  testimonials: [
    {
      id: "testi-lora-georgieva",
      name: "Лора Георгиева",
      location: "Chicago, USA",
      countryKey: "USA",
      excerpt:
        "След сесиите усещам дълбоко спокойствие, повече увереност и много повече любов към себе си и хората около мен.",
      highlight: true,
    },
    {
      id: "testi-violina-dimitrova",
      name: "Виолина Димитрова",
      location: "Плевен, Bulgaria",
      countryKey: "Bulgaria",
      excerpt:
        "Работата с Елена ми помогна да премахна страхове, които носех от години, и да се върна към вътрешната си сила.",
    },
    {
      id: "testi-vanya-nikolova",
      name: "Ваня Николова",
      location: "Toronto, Canada",
      countryKey: "Canada",
      excerpt:
        "Преживяването е на космическо ниво — финно, мощно и точно навреме за всичко, което ми беше нужно.",
      highlight: true,
    },
    {
      id: "testi-tsenka-simeonova",
      name: "Ценка Симеонова",
      location: "Cyprus",
      countryKey: "Cyprus",
      excerpt: "Почувствах как освобождавам огромен товар и дишането ми стана по-леко още след първата сесия.",
    },
    {
      id: "testi-zlati-peneva",
      name: "Злати Пенева",
      location: "Chicago, USA",
      countryKey: "USA",
      excerpt:
        "Оренда и символите, които получих, ми дадоха ясно намерение и ежедневна опора за баланс и посока.",
    },
    {
      id: "testi-maria-stoyanova",
      name: "Мария Стоянова",
      location: "Sofia, Bulgaria",
      countryKey: "Bulgaria",
      excerpt: "Усещам повече лекота в мислите и емоциите си, а решенията ми идват много по-ясно.",
    },
    {
      id: "testi-desislava-kostova",
      name: "Десислава Костова",
      location: "Varna, Bulgaria",
      countryKey: "Bulgaria",
      excerpt: "Сесиите ми помогнаха да се заземя и да върна спокойния ритъм в ежедневието си.",
    },
    {
      id: "testi-nikolay-petrov",
      name: "Николай Петров",
      location: "Seattle, USA",
      countryKey: "USA",
      excerpt:
        "Комбинацията от енергийна работа и кристали внесе мека, но стабилна промяна в начина, по който се чувствам.",
    },
  ],
  testimonialsPage: {
    title: "Отзиви",
    subtitle: "Истории и споделяния след кристални сесии",
    searchPlaceholder: "Търси по име или ключова дума…",
    filterAllLabel: "All",
    filters: [
      { key: "USA", label: "USA" },
      { key: "Canada", label: "Canada" },
      { key: "Bulgaria", label: "Bulgaria" },
      { key: "Cyprus", label: "Cyprus" },
      { key: "Other", label: "Other" },
    ],
    emptyTitle: "Няма резултати",
    emptyText: "Опитай с друга дума или премахни филтрите.",
    ctaBookLabel: "Book a Session",
    ctaBookHref: "/sessions#book",
    ctaContactLabel: "Contact",
    ctaContactHref: "/contact",
    metadataTitle: "Testimonials — The Magical Touch",
    metadataDescription:
      "Client stories from crystal sessions and wellness rituals with a calm, premium approach in Chicago + Online.",
    resultsLabel: "results",
  },
  contact: {
    title: "Контакт",
    subtitle: "Свържи се с мен — ще ти отговоря възможно най-скоро.",
    email: "themagicaltouch1111@gmail.com",
    company: "The Magical Touch LLC",
    form: {
      title: "Изпрати съобщение",
      submitLabel: "Open Email",
      copyLabel: "Copy Email Text",
      copiedLabel: "Copied",
      successTitle: "Готово!",
      successText:
        "Съобщението е подготвено. Натисни “Open Email” или копирай текста и го изпрати.",
      defaultSubject: "Inquiry — The Magical Touch",
      labels: {
        fullName: "Full Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
      },
      placeholders: {
        fullName: "Your full name",
        email: "you@example.com",
        subject: "Inquiry — The Magical Touch",
        message: "Share your question or intention",
      },
      errors: {
        fullNameRequired: "Please enter your full name.",
        fullNameMin: "Full name should be at least 2 characters.",
        emailRequired: "Please enter your email.",
        emailInvalid: "Please enter a valid email address.",
        subjectRequired: "Please enter a subject.",
        subjectMin: "Subject should be at least 3 characters.",
        messageRequired: "Please enter a message.",
        messageMin: "Message should be at least 10 characters.",
        messageMax: "Message can be up to 1500 characters.",
      },
      mailBodyLabels: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        page: "Page",
      },
      pageValue: "Contact",
    },
    socials: [
      { key: "facebook", label: "Facebook", href: "#" },
      { key: "youtube", label: "YouTube", href: "#" },
      { key: "telegram", label: "Telegram", href: "#" },
    ],
    disclaimerTitle: "Важно",
    disclaimerText: WELLNESS_DISCLAIMER,
    metadataTitle: "Contact — The Magical Touch",
    metadataDescription:
      "Reach out for crystal sessions and wellness guidance in a calm, premium space with support in Chicago + Online.",
    ctaBookLabel: "Book a Session",
    ctaBookHref: "/sessions#book",
    ctaShopLabel: "Shop",
    ctaShopHref: "/shop",
  },
  footer: {
    note: "Cosmic serenity, crafted with intention.",
    copyright: "© The Magical Touch — All rights reserved.",
  },
};
