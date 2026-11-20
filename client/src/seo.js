// Per-page title, meta tags and JSON-LD. Used in the browser on every route
// change (applySeo) and at build time by the prerender script (renderSeoHead),
// so crawlers and visitors always see the same metadata.
import { FAQS } from "./content/faqs.js";
import { PAGE_PATHS, PORTRAIT_PATH, SITE_NAME, SITE_URL, blogPostPath } from "./site.js";

// Najiya's real portrait, hosted on our own domain under a descriptive name
// so search engines and AI assistants tie it to her. Never use the hero
// images here: those are illustrations of other people. It is deliberately
// independent of the admin-editable photos.
export const PORTRAIT_URL = `${SITE_URL}${PORTRAIT_PATH}`;
const PORTRAIT_SIZE = 1600;
const DEFAULT_IMAGE = PORTRAIT_URL;

function portraitOf() {
  return PORTRAIT_URL;
}

function portraitAlt(therapist = {}) {
  return `${therapist.name || "Najiya P M"}, speech-language pathologist and founder of Speech Connect`;
}
const LOGO =
  "https://res.cloudinary.com/c4qcrdad/image/upload/v1793698975/speech_connect/logo.jpg";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const PERSON_ID = `${SITE_URL}/#najiya`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const DEFAULT_AREA = [
  { "@type": "Country", name: "India" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "Qatar" },
  { "@type": "Country", name: "Oman" },
  { "@type": "Country", name: "Kuwait" },
  { "@type": "Country", name: "Bahrain" },
  { "@type": "Country", name: "Canada" },
  { "@type": "Country", name: "Australia" },
  { "@type": "Country", name: "Ireland" },
];

const SERVICES = [
  "Online Speech Therapy",
  "Early Intervention for Language Delay",
  "Oral Placement Therapy (OPT)",
  "Stuttering & Fluency Therapy",
  "Neurodiversity-Affirming Autism Support",
  "Misarticulation & Speech Sound Disorders",
  "Aphasia Rehabilitation",
  "Stroke Rehabilitation & Dysarthria",
  "Cognitive Communication Therapy",
];

const STATIC_PAGES = {
  home: {
    title: "International Online Speech Therapy Platform | Speech Connect",
    description:
      "Speech Connect is an international online speech therapy platform led by RCI-registered Najiya P M. Live sessions in multiple languages for all ages.",
  },
  about: {
    title: "Najiya P M, RCI-Registered Speech Therapist | Speech Connect",
    description:
      "Meet Najiya P M, M.Sc. SLP, OPT, the RCI-registered speech-language pathologist who leads Speech Connect, an international online speech therapy platform.",
    crumb: "About",
  },
  services: {
    title: "Online Speech Therapy Services | Speech Connect",
    description:
      "Online therapy for language delay, autism, stuttering, misarticulation, OPT, aphasia and stroke recovery, for families in India and worldwide.",
    crumb: "Services",
  },
  appointment: {
    title: "Book Online Speech Therapy | Speech Connect",
    description:
      "Request an online speech therapy consultation with Najiya P M. Sessions Monday to Saturday for families in India and worldwide.",
    crumb: "Book an appointment",
  },
  contact: {
    title: "Contact | Online Speech Therapy | Speech Connect",
    description:
      "Contact Speech Connect by WhatsApp, phone or email about international online speech therapy for children and adults.",
    crumb: "Contact",
  },
  blog: {
    title: "Speech Therapy Blog for Parents | Speech Connect",
    description:
      "Practical guides on speech milestones, language delay, autism, stuttering and online therapy from Najiya P M, RCI-registered speech therapist.",
    crumb: "Blog",
  },
  areas: {
    title: "Areas We Serve | Online Speech Therapy | Speech Connect",
    description:
      "Online speech therapy in multiple languages for families in India, the UAE, the Gulf, the UK, Ireland, the US, Canada and Australia.",
    crumb: "Areas we serve",
  },
  privacy: {
    title: "Privacy Policy | Speech Connect",
    description: "How Speech Connect collects, uses and protects your personal information.",
    crumb: "Privacy Policy",
  },
  terms: {
    title: "Terms & Conditions | Speech Connect",
    description: "The terms that apply when you use the Speech Connect website and book online therapy.",
    crumb: "Terms & Conditions",
  },
};

function absolute(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function clinicEntity(therapist, areaServed = DEFAULT_AREA) {
  return {
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: LOGO,
    image: portraitOf(therapist),
    description:
      "An international online speech therapy platform led by Najiya P M, for toddlers, children and adults in India, the Middle East, Europe, North America and Australia.",
    telephone: (therapist.call || "").replace(/\s+/g, ""),
    email: therapist.email,
    medicalSpecialty: "SpeechPathology",
    alternateName: ["Speech Connect by Najiya P M", "Speech Connect International Online Speech Therapy Platform", "Speech Connect Online Speech Therapy"],
    slogan: "International online speech therapy platform",
    availableLanguage: ["English", "Malayalam"],
    // Online-only practice: city-level location, no street address
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed,
    availableService: SERVICES.map((name) => ({ "@type": "MedicalTherapy", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
    founder: { "@id": PERSON_ID },
  };
}

function personEntity(therapist) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: therapist.name,
    jobTitle: therapist.role,
    honorificSuffix: therapist.degrees,
    image: {
      "@type": "ImageObject",
      url: portraitOf(therapist),
      contentUrl: portraitOf(therapist),
      width: PORTRAIT_SIZE,
      height: PORTRAIT_SIZE,
      caption: portraitAlt(therapist),
    },
    description: `${therapist.name} is an RCI-registered speech-language pathologist (${therapist.crr}) and the founder of Speech Connect, an international online speech therapy platform. She offers online speech therapy in multiple languages for children and adults in India, the UAE and the UK.`,
    knowsLanguage: ["English", "Malayalam"],
    worksFor: { "@id": CLINIC_ID },
    knowsAbout: SERVICES,
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "M.Sc. Speech-Language Pathology",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional registration",
        name: `Rehabilitation Council of India, ${therapist.crr}`,
        recognizedBy: { "@type": "Organization", name: "Rehabilitation Council of India" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional registration",
        name: "Department of Health (DOH), UAE",
        recognizedBy: { "@type": "Organization", name: "Department of Health, UAE" },
      },
    ],
    sameAs: therapist.linkedIn ? [therapist.linkedIn] : [],
  };
}

function websiteEntity() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": CLINIC_ID },
  };
}

function breadcrumbEntity(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function faqEntity(faqs, url) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function graph(...nodes) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

const HOME_CRUMB = { name: "Home", path: "/" };

// route: from resolvePath(); post: the full blog post when on a post page
export function buildSeo(route, { therapist, post } = {}) {
  const url = absolute(route.path);

  if (route.view === "landing") {
    const page = route.landing;
    return {
      title: page.seoTitle,
      description: page.seoDescription,
      url,
      image: portraitOf(therapist),
      imageAlt: portraitAlt(therapist),
      jsonLd: graph(
        clinicEntity(therapist, page.areaServed),
        personEntity(therapist),
        { "@type": "WebPage", "@id": url, url, name: page.seoTitle, about: { "@id": CLINIC_ID } },
        breadcrumbEntity([HOME_CRUMB, { name: page.heading.join(" "), path: route.path }]),
        faqEntity(page.faqs, url)
      ),
    };
  }

  if (route.view === "post") {
    // undefined while loading; null when the post doesn't exist
    if (!post) {
      return {
        title: post === null ? `Article not found | ${SITE_NAME}` : `Blog | ${SITE_NAME}`,
        description: STATIC_PAGES.blog.description,
        url,
        noindex: post === null,
      };
    }
    const image = post.coverImage || portraitOf(therapist);
    return {
      title: post.metaTitle || `${post.title} | ${SITE_NAME}`,
      description: post.metaDescription || post.excerpt,
      url,
      image,
      imageAlt: post.coverImage ? post.coverAlt || post.title : portraitAlt(therapist),
      type: "article",
      jsonLd: graph(
        {
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          image,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: { "@id": PERSON_ID },
          publisher: { "@id": CLINIC_ID },
          mainEntityOfPage: url,
          articleSection: post.category || undefined,
          keywords: post.tags?.length ? post.tags.join(", ") : undefined,
          inLanguage: "en-IN",
        },
        personEntity(therapist),
        clinicEntity(therapist),
        breadcrumbEntity([
          HOME_CRUMB,
          { name: "Blog", path: PAGE_PATHS.blog },
          { name: post.title, path: blogPostPath(post.slug) },
        ])
      ),
    };
  }

  if (route.view === "notFound") {
    return {
      title: `Page not found | ${SITE_NAME}`,
      description: STATIC_PAGES.home.description,
      url,
      noindex: true,
    };
  }

  const page = STATIC_PAGES[route.view];
  const nodes =
    route.view === "home"
      ? [clinicEntity(therapist), personEntity(therapist), websiteEntity(), faqEntity(FAQS, url)]
      : [
          {
            // The About page is Najiya's profile page
            "@type": route.view === "about" ? "ProfilePage" : "WebPage",
            "@id": url,
            url,
            name: page.title,
            isPartOf: { "@id": WEBSITE_ID },
            ...(route.view === "about" && { mainEntity: { "@id": PERSON_ID } }),
          },
          breadcrumbEntity([HOME_CRUMB, { name: page.crumb, path: route.path }]),
        ];
  if (route.view === "about") nodes.push(personEntity(therapist));

  return {
    title: page.title,
    description: page.description,
    url,
    image: portraitOf(therapist),
    imageAlt: portraitAlt(therapist),
    jsonLd: graph(...nodes),
  };
}

// Tag list shared by the browser and the prerenderer
function seoTags(seo) {
  const image = seo.image || DEFAULT_IMAGE;
  const imageAlt = seo.imageAlt || portraitAlt();
  return [
    ["meta", { name: "description", content: seo.description }],
    ["meta", { name: "robots", content: seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large" }],
    ["link", { rel: "canonical", href: seo.url }],
    ["meta", { property: "og:type", content: seo.type || "website" }],
    ["meta", { property: "og:url", content: seo.url }],
    ["meta", { property: "og:title", content: seo.title }],
    ["meta", { property: "og:description", content: seo.description }],
    ["meta", { property: "og:image", content: image }],
    ["meta", { property: "og:image:alt", content: imageAlt }],
    ["meta", { name: "twitter:title", content: seo.title }],
    ["meta", { name: "twitter:description", content: seo.description }],
    ["meta", { name: "twitter:image", content: image }],
    ["meta", { name: "twitter:image:alt", content: imageAlt }],
  ];
}

function jsonLdText(jsonLd) {
  // Keep "</script>" inside strings from closing the tag early
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export function applySeo(seo) {
  document.title = seo.title;
  for (const [tag, attrs] of seoTags(seo)) {
    const key = attrs.name ? "name" : attrs.property ? "property" : "rel";
    let el = document.head.querySelector(`${tag}[${key}="${attrs[key]}"]`);
    if (!el) {
      el = document.createElement(tag);
      el.setAttribute(key, attrs[key]);
      document.head.appendChild(el);
    }
    for (const [attr, value] of Object.entries(attrs)) el.setAttribute(attr, value ?? "");
  }

  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  if (seo.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = jsonLdText(seo.jsonLd);
    document.head.appendChild(script);
  }
}

function escapeAttr(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderSeoHead(seo) {
  const tags = seoTags(seo).map(([tag, attrs]) => {
    const attrText = Object.entries(attrs)
      .map(([attr, value]) => `${attr}="${escapeAttr(value)}"`)
      .join(" ");
    return `<${tag} ${attrText} />`;
  });
  return [
    `<title>${escapeAttr(seo.title)}</title>`,
    ...tags,
    seo.jsonLd ? `<script type="application/ld+json">${jsonLdText(seo.jsonLd)}</script>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");
}
