// Per-page title, meta tags and JSON-LD. Used in the browser on every route
// change (applySeo) and at build time by the prerender script (renderSeoHead),
// so crawlers and visitors always see the same metadata.
import { FAQS } from "./content/faqs.js";
import { PAGE_PATHS, SITE_NAME, SITE_URL, blogPostPath } from "./site.js";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/c4qcrdad/image/upload/v1791043691/speech_connect/najiya-pm.jpg";
const LOGO =
  "https://res.cloudinary.com/c4qcrdad/image/upload/v1793698975/speech_connect/logo.jpg";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const PERSON_ID = `${SITE_URL}/#najiya`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const KERALA = { "@type": "State", name: "Kerala" };
const DEFAULT_AREA = [
  KERALA,
  { "@type": "Country", name: "India" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "United Kingdom" },
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
    title: "Online Speech Therapy in Kerala, India, UAE & UK | Speech Connect",
    description:
      "RCI-registered online speech therapy with Najiya P M. Live video sessions for children and adults in Kerala, across India, the UAE and the UK.",
  },
  about: {
    title: "Najiya P M, RCI-Registered Speech Therapist | Speech Connect",
    description:
      "Meet Najiya P M, M.Sc. SLP, OPT, an RCI-registered speech-language pathologist from Kerala, offering online therapy in India, the UAE and the UK.",
    crumb: "About",
  },
  services: {
    title: "Online Speech Therapy Services | Speech Connect",
    description:
      "Online therapy for language delay, autism, stuttering, misarticulation, OPT, aphasia and stroke recovery, for families in Kerala, India, the UAE and UK.",
    crumb: "Services",
  },
  appointment: {
    title: "Book Online Speech Therapy | Speech Connect",
    description:
      "Request an online speech therapy consultation with Najiya P M. Sessions Monday to Saturday for families in Kerala, India, the UAE and the UK.",
    crumb: "Book an appointment",
  },
  contact: {
    title: "Contact | Online Speech Therapy | Speech Connect",
    description:
      "Contact Speech Connect by WhatsApp, phone or email about online speech therapy for children and adults in Kerala, India, the UAE and the UK.",
    crumb: "Contact",
  },
  blog: {
    title: "Speech Therapy Blog for Parents | Speech Connect",
    description:
      "Practical guides on speech milestones, language delay, autism, stuttering and online therapy from Najiya P M, RCI-registered speech therapist.",
    crumb: "Blog",
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
    image: DEFAULT_IMAGE,
    description:
      "Online speech and language therapy from Kerala, India, for toddlers, children and adults across India, the UAE and the UK.",
    telephone: (therapist.call || "").replace(/\s+/g, ""),
    email: therapist.email,
    medicalSpecialty: "SpeechPathology",
    // Online-only practice: city-level location, no street address
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thrissur",
      addressRegion: "Kerala",
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
    image: therapist.aboutPhoto || therapist.photo || DEFAULT_IMAGE,
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
    const image = post.coverImage || DEFAULT_IMAGE;
    return {
      title: post.metaTitle || `${post.title} | ${SITE_NAME}`,
      description: post.metaDescription || post.excerpt,
      url,
      image,
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
          { "@type": "WebPage", "@id": url, url, name: page.title, isPartOf: { "@id": WEBSITE_ID } },
          breadcrumbEntity([HOME_CRUMB, { name: page.crumb, path: route.path }]),
        ];
  if (route.view === "about") nodes.push(personEntity(therapist));

  return { title: page.title, description: page.description, url, jsonLd: graph(...nodes) };
}

// Tag list shared by the browser and the prerenderer
function seoTags(seo) {
  const image = seo.image || DEFAULT_IMAGE;
  return [
    ["meta", { name: "description", content: seo.description }],
    ["meta", { name: "robots", content: seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large" }],
    ["link", { rel: "canonical", href: seo.url }],
    ["meta", { property: "og:type", content: seo.type || "website" }],
    ["meta", { property: "og:url", content: seo.url }],
    ["meta", { property: "og:title", content: seo.title }],
    ["meta", { property: "og:description", content: seo.description }],
    ["meta", { property: "og:image", content: image }],
    ["meta", { name: "twitter:title", content: seo.title }],
    ["meta", { name: "twitter:description", content: seo.description }],
    ["meta", { name: "twitter:image", content: image }],
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
