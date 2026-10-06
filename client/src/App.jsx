import { useMemo, useState, useEffect } from "react";
import { Icon, Blob, WaveDivider, iconFor } from "./ui.jsx";

const getApiUrl = () => {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168."));
  if (isLocal) {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && (envUrl.includes("localhost") || envUrl.includes("127.0.0.1"))) {
      let clean = envUrl.replace(/\/$/, "");
      return clean.endsWith("/api") ? clean : `${clean}/api`;
    }
    return "http://127.0.0.1:5001/api";
  }
  let url = import.meta.env.VITE_API_URL || "https://najiya.vercel.app";
  url = url.replace(/\/$/, "");
  return url.endsWith("/api") ? url : `${url}/api`;
};

const API_URL = getApiUrl();

// v2: the old key was written on every visit (defaulting to dark), so it
// can't distinguish a real choice from the old default.
const THEME_STORAGE_KEY = "speech_connect_theme_v2";

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    return null;
  }
}

const CLINIC_LOGO_URL ="https://res.cloudinary.com/c4qcrdad/image/upload/v1791043690/speech_connect/logo.jpg";

const DEFAULT_CONTENT = {
  therapist: {
    name: "Najiya P M",
    degrees: "M.Sc. SLP, OPT",
    role: "Founder & Lead Speech-Language Pathologist",
    crr: "CRR No: A84512",
    council: "Rehabilitation Council of India (RCI)",
    photo: "https://res.cloudinary.com/c4qcrdad/image/upload/v1791043691/speech_connect/najiya-pm.jpg",
    aboutPhoto: "https://res.cloudinary.com/c4qcrdad/image/upload/v1791043695/speech_connect/najiya-pm-about.jpg",
    email: "speechconnect.in@gmail.com",
    call: "+91 8281753253",
    whatsapp: "+91 9349412153",
    linkedIn: "https://www.linkedin.com/in/najiya-p-m-69b349322",
    linkedInName: "NAJIYA P M",
    bioParagraphs: [
      "Najiya P M is a certified Speech-Language Pathologist holding a Master of Science (M.Sc.) in Speech-Language Pathology and specialized certification in Oral Placement Therapy (OPT). Registered under the Rehabilitation Council of India (CRR No: A84512), she brings extensive clinical expertise and an empathetic, patient-centered approach.",
      "Recognizing the profound impact of timely communication therapy, she established Speech Connect to make premium, evidence-based speech and language therapy accessible to families and individuals anywhere in the world through secure online telepractice.",
      "Her therapy protocols integrate evidence-based clinical practices with practical, engaging home-stimulation plans. Whether helping a toddler find their first words, assisting a school-aged child with stuttering or clarity, or guiding an adult through post-stroke communication recovery, each treatment plan is customized to the person’s unique needs.",
    ],
  },
  hero: {
    badge: "Certified Telepractice • RCI Registered",
    title: "Empowering Speech & Language Through Expert Care",
    description:
      "Personalized, evidence-based online speech therapy led by certified specialist Najiya P M (M.Sc. SLP, OPT). Transforming communication for toddlers, children, and adults worldwide.",
    photos: [
      "https://res.cloudinary.com/c4qcrdad/image/upload/v1791043691/speech_connect/najiya-pm.jpg",
      "https://res.cloudinary.com/c4qcrdad/image/upload/v1791043693/speech_connect/najiya-pm-2.jpg",
    ],
  },
  highlights: [
    {
      num: "01",
      title: "Individualized Care",
      desc: "Bespoke therapy plans designed around your unique communication strengths and goals.",
    },
    {
      num: "02",
      title: "Pediatric & Adult",
      desc: "Specialized interventions across the lifespan — from early childhood to adult rehab.",
    },
    {
      num: "03",
      title: "Flexible Telepractice",
      desc: "Live interactive teletherapy sessions from the comfort and privacy of your home.",
    },
    {
      num: "04",
      title: "Early Intervention",
      desc: "Evidence-based developmental stimulation targeting essential speech milestones.",
    },
    {
      num: "05",
      title: "Caregiver Coaching",
      desc: "Actionable home plans and parental training for continuous daily progress.",
    },
    {
      num: "06",
      title: "Neurological Rehab",
      desc: "Rehabilitative clinical protocols for aphasia, dysarthria, apraxia, and stroke recovery.",
    },
  ],
  services: [
    {
      num: "01",
      tag: "Online Telepractice",
      title: "Speech Therapy & Online Teletherapy",
      desc: "Comprehensive evidence-based speech and language therapy delivered via secure interactive telepractice. Individualized for toddlers, children, and adults worldwide.",
    },
    {
      num: "02",
      tag: "Early Intervention",
      title: "Early Intervention for Language Delay",
      desc: "Milestone-focused developmental stimulation for toddlers and young children aged 1–5 years showing receptive, expressive, or developmental speech and language delays.",
    },
    {
      num: "03",
      tag: "Specialized Motor",
      title: "Oral Placement Therapy (OPT)",
      desc: "Certified tactile-proprioceptive therapy building jaw stability, lip closure, and tongue coordination for clear, effortless speech sound mechanics.",
    },
    {
      num: "04",
      tag: "Fluency Care",
      title: "Stuttering & Stammering Fluency Therapy",
      desc: "Evidence-based fluency shaping and stuttering modification techniques reducing speech tension, blocks, and anxiety to achieve smooth conversational flow.",
    },
    {
      num: "05",
      tag: "Affirming Care",
      title: "Neurodiversity Affirmation & Autism Spectrum Disorder (ASD)",
      desc: "Respectful, neurodiversity-affirming communication support honoring unique autistic communication profiles, authentic connection, self-advocacy, and gestalt language processing.",
    },
    {
      num: "06",
      tag: "Speech Clarity",
      title: "Misarticulation & Speech Sound Disorders",
      desc: "Targeted correction for misarticulation, lisping, and sound substitutions (/r/, /s/, /l/, /k/, /th/). Establishing crisp, intelligible articulation in everyday speech.",
    },
    {
      num: "07",
      tag: "Adult Neuro Rehab",
      title: "Aphasia Rehabilitation",
      desc: "Dedicated clinical rehabilitation restoring functional word finding, auditory comprehension, reading, and sentence expression after stroke or brain injury.",
    },
    {
      num: "08",
      tag: "Stroke Recovery",
      title: "Stroke Rehabilitation & Dysarthria Care",
      desc: "Intensive neuroplastic rehabilitation strengthening facial and vocal muscles, clarity, and independent communication for adult stroke survivors.",
    },
    {
      num: "09",
      tag: "Cognitive Skills",
      title: "Cognitive Communication Therapy",
      desc: "Structured exercises to improve attention, memory, executive functioning, and social communication dynamics for academic and career success.",
    },
    {
      num: "10",
      tag: "Parent Coaching",
      title: "Caregiver Training & Home Stimulation Plans",
      desc: "Actionable, evidence-based home routines empowering parents and caregivers to reinforce therapy progress in natural daily conversations.",
    },
  ],
  specializations: [
    "Speech Therapy & Online Teletherapy",
    "Early Intervention for Language Delay",
    "Oral Placement Therapy (OPT)",
    "Stuttering & Fluency Disorders",
    "Neurodiversity Affirmation & Autism (ASD)",
    "Misarticulation & Speech Sound Clarity",
    "Aphasia Rehabilitation",
    "Stroke Rehabilitation & Dysarthria",
    "Cognitive Communication Therapy",
    "Caregiver Coaching & Home Protocols",
  ],
  concernSuggestions: [
    "Language Delay",
    "Speech Therapy Online",
    "Stuttering / Stammering",
    "Oral Placement Therapy (OPT)",
    "Autism Spectrum Disorder",
    "Neurodiversity Affirmation",
    "Misarticulation & Clarity",
    "Aphasia Rehabilitation",
    "Stroke Rehabilitation",
    "Early Intervention (1-5 yrs)",
  ],
  availabilityText: "Monday – Saturday • Flexible Timings",
};

const HOW_IT_WORKS = [
  {
    icon: "calendar",
    title: "Request a session",
    desc: "Share a few details through the booking form or WhatsApp.",
  },
  {
    icon: "message",
    title: "Intake consultation",
    desc: "A relaxed first conversation about history, milestones and goals.",
  },
  {
    icon: "map",
    title: "Personalised plan",
    desc: "A clear therapy roadmap with realistic, measurable milestones.",
  },
  {
    icon: "home",
    title: "Sessions & home coaching",
    desc: "Live online sessions plus simple routines to practise at home.",
  },
];

const TRUST_POINTS = [
  { icon: "award", title: "RCI registered", sub: "Licensed clinical practice" },
  { icon: "graduation", title: "M.Sc. SLP · OPT", sub: "Specialist qualifications" },
  { icon: "users", title: "Toddlers to adults", sub: "Care across the lifespan" },
  { icon: "globe", title: "100% online", sub: "Join from anywhere" },
];

const WHO_WE_HELP = [
  {
    title: "Children & teens",
    image: "/images/gallery/child-session.jpg",
    alt: "A young girl and her mother taking part in an online speech therapy session",
    desc: "Playful, structured sessions that help little ones find their words and older children speak with clarity and confidence.",
    topics: ["Language delay", "Stuttering", "Autism (ASD)", "Speech sound clarity"],
  },
  {
    title: "Adults",
    image: "/images/gallery/adult-session.jpg",
    alt: "An adult joining a video therapy session from her kitchen table",
    desc: "Patient, goal-focused rehabilitation to rebuild everyday communication after stroke, brain injury or long-standing fluency difficulties.",
    topics: ["Stroke recovery", "Aphasia", "Dysarthria", "Fluency"],
  },
];

const HOME_BENEFITS = [
  { icon: "home", title: "No travel, no waiting rooms", desc: "Sessions fit around school, work and family life." },
  { icon: "heart", title: "Familiar, relaxed surroundings", desc: "Children often open up more in their own space." },
  { icon: "users", title: "Parents learn alongside", desc: "You see every strategy and can use it in daily routines." },
  { icon: "globe", title: "Care that travels with you", desc: "Continue therapy wherever your family is in the world." },
];

// Mirrors the FAQPage JSON-LD in index.html; keep the two in sync.
const FAQS = [
  {
    q: "What is online speech therapy and how does teletherapy work?",
    a: "Online speech therapy (teletherapy) is the delivery of professional speech-language pathology services via secure, interactive video conferencing. At Speech Connect, Lead SLP Najiya P M provides live, one-on-one virtual evaluations and therapy sessions with digital activities, parent coaching, and real-time guidance, making premier therapy accessible from the comfort of your home anywhere in the world.",
  },
  {
    q: "How does Speech Connect treat language delay and early intervention in toddlers?",
    a: "Our Early Intervention Programme targets speech and language delays in toddlers and preschoolers through naturalistic, play-based stimulation. We assess receptive understanding, expressive vocabulary, and communicative intent, equipping parents with daily conversational home routines to accelerate language milestones.",
  },
  {
    q: "What is Oral Placement Therapy (OPT) and who needs it?",
    a: "Oral Placement Therapy (OPT) is a specialized tactile-proprioceptive approach that builds structural muscle strength, stability, and coordination in the jaw, lips, and tongue. It bridges the gap between oral motor control and clear speech sound production, especially beneficial for children and adults with dysarthria, apraxia, Down syndrome, or persistent misarticulation.",
  },
  {
    q: "How is stuttering and stammering treated online?",
    a: "Speech Connect utilizes holistic fluency therapy combining evidence-based fluency shaping, stuttering modification, breathing coordination, and psychological confidence-building. We help individuals speak smoothly and comfortably while reducing anxiety around speaking.",
  },
  {
    q: "How does Speech Connect support autistic children through neurodiversity affirmation?",
    a: "Our neurodiversity-affirming approach honors each individual's unique communicative style. Rather than forcing conformity, we foster authentic connection, self-advocacy, multimodal communication (including AAC where appropriate), and regulation, supporting individuals on the Autism Spectrum Disorder (ASD) to thrive.",
  },
  {
    q: "Can adults receive stroke rehabilitation and aphasia recovery through online telepractice?",
    a: "Yes. Clinical research confirms telepractice is highly effective for adult neurological rehabilitation. We provide targeted therapies for post-stroke aphasia (word retrieval and sentence formulation), dysarthria (muscle weakness), and cognitive-communication deficits to regain independence in daily conversations.",
  },
  {
    q: "What is misarticulation and how can online therapy fix it?",
    a: "Misarticulation refers to difficulty correctly pronouncing specific speech sounds (such as 'r', 's', 'l', 'k', or 'th'), leading to lisping, sound substitutions, or omissions. Through visual modeling, auditory discrimination, and oral placement guidance, our online therapy systematically teaches correct tongue placement and establishes crisp, clear articulation.",
  },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  age: "",
  gender: "",
  phone: "",
  concerns: "",
};

function splitConcerns(text) {
  return text
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "appointment", label: "Appointment" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [activeView, setActiveView] = useState("home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("");
  const [toasts, setToasts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedServices, setExpandedServices] = useState(() => new Set());

  // Compact header once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gentle fade-up reveal as sections enter the viewport. Content stays
  // visible when IntersectionObserver is missing or motion is reduced.
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeView, submitted]);

  // Theme: explicit user choice wins, otherwise follow the OS preference.
  // The inline script in index.html applies the same rule before first paint.
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = readSavedTheme();
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Track OS theme changes until the visitor picks one explicitly
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return;
    const handleChange = (e) => {
      if (!readSavedTheme()) setTheme(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  function chooseTheme(next) {
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); choice lasts for this visit only
    }
  }

  const toggleTheme = () => {
    chooseTheme(theme === "dark" ? "light" : "dark");
  };

  // Fetch dynamic content updated from Admin Panel
  useEffect(() => {
    async function loadSiteContent() {
      try {
        const response = await fetch(`${API_URL}/content?t=${Date.now()}`);
        if (response.ok) {
          const liveData = await response.json();
          if (liveData && typeof liveData === "object") {
            setContent((prev) => ({
              ...DEFAULT_CONTENT,
              ...liveData,
              therapist: {
                ...DEFAULT_CONTENT.therapist,
                ...(liveData.therapist || {}),
                bioParagraphs:
                  Array.isArray(liveData.therapist?.bioParagraphs) && liveData.therapist.bioParagraphs.length
                    ? liveData.therapist.bioParagraphs
                    : (prev.therapist?.bioParagraphs || DEFAULT_CONTENT.therapist.bioParagraphs),
              },
              hero: {
                ...DEFAULT_CONTENT.hero,
                ...(liveData.hero || {}),
                photos:
                  Array.isArray(liveData.hero?.photos) && liveData.hero.photos.length
                    ? liveData.hero.photos
                    : (prev.hero?.photos || DEFAULT_CONTENT.hero.photos),
              },
              highlights:
                Array.isArray(liveData.highlights)
                  ? liveData.highlights
                  : (prev.highlights || DEFAULT_CONTENT.highlights),
              services:
                Array.isArray(liveData.services)
                  ? liveData.services
                  : (prev.services || DEFAULT_CONTENT.services),
              specializations:
                Array.isArray(liveData.specializations)
                  ? liveData.specializations
                  : (prev.specializations || DEFAULT_CONTENT.specializations),
              concernSuggestions:
                Array.isArray(liveData.concernSuggestions)
                  ? liveData.concernSuggestions
                  : (prev.concernSuggestions || DEFAULT_CONTENT.concernSuggestions),
              availabilityText:
                liveData.availabilityText || prev.availabilityText || DEFAULT_CONTENT.availabilityText,
            }));
          }
        }
      } catch (err) {
        console.warn("Using default content fallback:", err);
      }
    }

    loadSiteContent();

    // Re-fetch when user returns to this tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadSiteContent();
      }
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", loadSiteContent);

    // Cross-tab real-time sync with Admin panel
    let channel;
    try {
      channel = new BroadcastChannel("speech_connect_sync");
      channel.onmessage = (event) => {
        if (event.data === "content_updated") {
          loadSiteContent();
        }
      };
    } catch {
      // BroadcastChannel optional fallback
    }

    const handleStorage = (e) => {
      if (e.key === "speech_connect_content_updated") {
        loadSiteContent();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", loadSiteContent);
      window.removeEventListener("storage", handleStorage);
      if (channel) channel.close();
    };
  }, []);

  const therapist = content.therapist || DEFAULT_CONTENT.therapist;
  const hero = content.hero || DEFAULT_CONTENT.hero;
  const heroPhotos =
    hero.photos && hero.photos.length
      ? hero.photos
      : DEFAULT_CONTENT.hero.photos;
  const highlights =
    content.highlights && content.highlights.length
      ? content.highlights
      : DEFAULT_CONTENT.highlights;
  const servicesList =
    content.services && content.services.length
      ? content.services
      : DEFAULT_CONTENT.services;
  const specializations =
    content.specializations && content.specializations.length
      ? content.specializations
      : DEFAULT_CONTENT.specializations;
  const concernSuggestions =
    content.concernSuggestions && content.concernSuggestions.length
      ? content.concernSuggestions
      : DEFAULT_CONTENT.concernSuggestions;
  const availabilityText =
    content.availabilityText || DEFAULT_CONTENT.availabilityText;

  // Hero photos change only when the visitor picks one (no auto-rotation)
  const activeHeroPhoto = heroPhotos[heroIndex % heroPhotos.length];

  function showToast(message, type = "success") {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4500);
  }

  const whatsappLink = useMemo(() => {
    const textParts = [
      `Hello ${therapist.name ? therapist.name.split(" ")[0] : "Najiya"}, I would like to enquire about Speech Therapy consultation.`,
      form.name ? `Name: ${form.name}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.age ? `Age: ${form.age}` : "",
      form.gender ? `Gender: ${form.gender}` : "",
      form.phone ? `Mobile: ${form.phone}` : "",
      form.concerns ? `Concern: ${form.concerns}` : "",
    ].filter(Boolean);

    const message = encodeURIComponent(textParts.join("\n"));
    return `https://wa.me/${(therapist.whatsapp || "919349412153").replace(/\D/g, "")}?text=${message}`;
  }, [form, therapist.whatsapp]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  const selectedConcerns = splitConcerns(form.concerns);

  function toggleConcern(tag) {
    setForm((current) => {
      const parts = splitConcerns(current.concerns);
      const next = parts.includes(tag)
        ? parts.filter((part) => part !== tag)
        : [...parts, tag];
      return { ...current, concerns: next.join(", ") };
    });
  }

  function toggleService(key) {
    setExpandedServices((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function changeView(view) {
    setActiveView(view);
    setStatus("");
    setSubmitted(false);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bookForService(serviceTitle) {
    setForm((current) => ({
      ...current,
      concerns: `Interested in: ${serviceTitle}`,
    }));
    changeView("appointment");
  }

  async function submitAppointment(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Submitting your appointment request...");

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("Appointment request received! We will contact you shortly.");
      showToast("Appointment request submitted successfully!", "success");
      setForm(EMPTY_FORM);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("Unable to connect to server. Redirecting you to WhatsApp...");
      showToast("Opening WhatsApp to send your request directly.", "info");
      setTimeout(() => {
        window.open(whatsappLink, "_blank");
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  }

  const whatsappDirect = `https://wa.me/${(therapist.whatsapp || "").replace(/\D/g, "")}`;
  const callHref = `tel:${(therapist.call || "").replace(/\s+/g, "")}`;

  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Header */}
      <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="topbar-inner">
          <button
            className="brand-link"
            type="button"
            onClick={() => changeView("home")}
            aria-label="Speech Connect home"
          >
            <img
              src={CLINIC_LOGO_URL}
              alt=""
              className="brand-logo-img"
            />
            <span className="brand-text-wrap">
              <span className="brand-title">Speech Connect</span>
              <span className="brand-sub">Online therapy</span>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={`nav-btn ${activeView === item.id ? "active-nav" : ""}`}
                key={item.id}
                type="button"
                aria-current={activeView === item.id ? "page" : undefined}
                onClick={() => changeView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="topbar-right-group">
            <button
              className="topbar-cta-btn"
              type="button"
              onClick={() => changeView("appointment")}
            >
              Book a session
            </button>

            <button
              className="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
            </button>

            <button
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-drawer"
          className={`mobile-drawer ${menuOpen ? "drawer-open" : ""}`}
        >
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                className={`mobile-nav-btn ${activeView === item.id ? "active-mobile-nav" : ""}`}
                key={item.id}
                type="button"
                aria-current={activeView === item.id ? "page" : undefined}
                onClick={() => changeView(item.id)}
              >
                <span>{item.label}</span>
                <Icon name="arrowRight" size={18} className="mobile-nav-arrow" />
              </button>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <div className="mobile-theme-row">
              <span className="mobile-theme-label">Appearance</span>
              <div className="theme-toggle-chips" role="group" aria-label="Colour theme">
                <button
                  type="button"
                  className={`theme-chip ${theme === "light" ? "active" : ""}`}
                  aria-pressed={theme === "light"}
                  onClick={() => chooseTheme("light")}
                >
                  <Icon name="sun" size={16} /> Light
                </button>
                <button
                  type="button"
                  className={`theme-chip ${theme === "dark" ? "active" : ""}`}
                  aria-pressed={theme === "dark"}
                  onClick={() => chooseTheme("dark")}
                >
                  <Icon name="moon" size={16} /> Dark
                </button>
              </div>
            </div>

            <button
              className="primary-btn"
              type="button"
              onClick={() => changeView("appointment")}
            >
              Book an appointment
            </button>
            <a
              className="whatsapp-btn"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="main-content" id="main" tabIndex={-1}>
        {/* HOME VIEW */}
        {activeView === "home" && (
          <>
            <section className="hero-section" id="home">
              <div className="section-wrap hero-grid">
                <div className="hero-text-col">
                  <span className="eyebrow reveal">
                    <span className="eyebrow-dot" aria-hidden="true" />
                    {hero.badge}
                  </span>

                  <h1 className="hero-heading reveal">{hero.title}</h1>

                  <p className="lead reveal">{hero.description}</p>

                  <div className="hero-cta-group reveal">
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={() => changeView("appointment")}
                    >
                      <span>Book an appointment</span>
                      <Icon name="arrowRight" size={18} className="btn-arrow" />
                    </button>
                    <a
                      className="whatsapp-btn"
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="whatsapp" size={18} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <p className="hero-note reveal">
                    <Icon name="clock" size={16} />
                    {availabilityText}
                  </p>
                </div>

                <div className="hero-visual reveal">
                  <Blob variant={2} className="hero-accent-blob" />
                  <div className="blob-frame hero-photo-frame">
                    <img
                      key={activeHeroPhoto}
                      src={activeHeroPhoto}
                      alt={`${therapist.name}, speech-language pathologist, during an online session`}
                      className="blob-photo"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>

                  <div className="floating-card float-a">
                    <span className="icon-badge small tint-0">
                      <Icon name="video" size={18} />
                    </span>
                    <span>
                      <strong>Live online sessions</strong>
                      <small>From the comfort of home</small>
                    </span>
                  </div>
                  <div className="floating-card float-b">
                    <span className="icon-badge small tint-1">
                      <Icon name="users" size={18} />
                    </span>
                    <span>
                      <strong>Children &amp; adults</strong>
                      <small>Individualised care</small>
                    </span>
                  </div>

                  {heroPhotos.length > 1 && (
                    <div className="photo-dots" role="group" aria-label="Choose photo">
                      {heroPhotos.map((photo, index) => (
                        <button
                          key={photo}
                          type="button"
                          className={`photo-dot ${index === heroIndex ? "active" : ""}`}
                          aria-label={`Show photo ${index + 1}`}
                          aria-pressed={index === heroIndex}
                          onClick={() => setHeroIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Trust strip */}
              <div className="section-wrap">
                <ul className="trust-strip reveal" aria-label="Why families choose Speech Connect">
                  {TRUST_POINTS.map((point, idx) => (
                    <li className="trust-item" key={point.title}>
                      <span className={`icon-badge small tint-${idx % 4}`}>
                        <Icon name={point.icon} size={20} />
                      </span>
                      <span>
                        <strong>{point.title}</strong>
                        <small>{point.sub}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Who we help */}
            <section className="who-section" aria-labelledby="who-title">
              <div className="section-wrap">
                <div className="section-head centered reveal">
                  <span className="eyebrow">Who we help</span>
                  <h2 className="section-title" id="who-title">
                    Support for every stage of life
                  </h2>
                  <p className="lead">
                    Whether it is a toddler's first words or an adult relearning
                    to speak after a stroke, every plan starts with listening.
                  </p>
                </div>

                <div className="who-grid">
                  {WHO_WE_HELP.map((group, idx) => (
                    <article className={`who-card tint-${idx === 0 ? 1 : 2} reveal`} key={group.title}>
                      <div className="who-media">
                        <img src={group.image} alt={group.alt} loading="lazy" />
                      </div>
                      <div className="who-body">
                        <h3 className="card-title who-title">{group.title}</h3>
                        <p>{group.desc}</p>
                        <ul className="who-topics" aria-label={`Common areas for ${group.title.toLowerCase()}`}>
                          {group.topics.map((topic) => (
                            <li key={topic}>{topic}</li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="text-link"
                          onClick={() => changeView("services")}
                        >
                          Explore services <Icon name="arrowRight" size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Highlights band */}
            <WaveDivider />
            <section className="band highlights-section" aria-labelledby="approach-title">
              <div className="section-wrap">
                <div className="section-head centered reveal">
                  <span className="eyebrow">Our clinical approach</span>
                  <h2 className="section-title" id="approach-title">
                    Care designed around you
                  </h2>
                  <p className="lead">
                    Evidence-based therapy, delivered with warmth and tailored to
                    each person's strengths and goals.
                  </p>
                </div>

                <div className="highlights-grid" role="list">
                  {highlights.map((item, idx) => (
                    <article
                      className={`highlight-card tint-${idx % 4} reveal`}
                      key={item.num || idx}
                      role="listitem"
                    >
                      <span className="icon-badge">
                        <Icon name={iconFor(item.title)} />
                      </span>
                      <h3 className="card-title">{item.title}</h3>
                      <p>{item.desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <WaveDivider flip />

            {/* Meet the therapist */}
            <section className="meet-section" aria-labelledby="meet-title">
              <div className="section-wrap meet-grid">
                <div className="meet-visual reveal">
                  <Blob variant={1} className="meet-blob" />
                  <div className="blob-frame meet-photo-frame">
                    <img
                      src={therapist.aboutPhoto || therapist.photo}
                      alt={`${therapist.name}, ${therapist.role}`}
                      className="blob-photo"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="meet-body">
                  <span className="eyebrow reveal">Meet your therapist</span>
                  <h2 className="section-title reveal" id="meet-title">
                    Hello, I'm {therapist.name}
                  </h2>
                  <p className="meet-role reveal">{therapist.role}</p>
                  {therapist.bioParagraphs?.[1] && (
                    <p className="lead reveal">{therapist.bioParagraphs[1]}</p>
                  )}
                  <ul className="credential-pills reveal" aria-label="Credentials">
                    <li className="chip">
                      <Icon name="graduation" size={18} />
                      {therapist.degrees}
                    </li>
                    <li className="chip">
                      <Icon name="award" size={18} />
                      {therapist.crr}
                    </li>
                  </ul>
                  <div className="action-row reveal">
                    <button
                      className="secondary-btn"
                      type="button"
                      onClick={() => changeView("about")}
                    >
                      Read full profile
                      <Icon name="arrowRight" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* How it works */}
            <section className="steps-section" aria-labelledby="steps-title">
              <div className="section-wrap">
                <div className="section-head centered reveal">
                  <span className="eyebrow">How online therapy works</span>
                  <h2 className="section-title" id="steps-title">
                    Four gentle steps to clearer communication
                  </h2>
                </div>

                <div className="steps-track">
                  <svg
                    className="steps-path"
                    viewBox="0 0 1000 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M125,60 C220,0 280,120 375,60 S530,0 625,60 S780,120 875,60" />
                  </svg>
                  <ol className="steps-list">
                    {HOW_IT_WORKS.map((step, idx) => (
                      <li className="step reveal" key={step.title}>
                        <span className={`step-circle tint-${idx % 4}`}>
                          <span className="step-num">{idx + 1}</span>
                        </span>
                        <div className="step-body">
                          <h3 className="card-title">{step.title}</h3>
                          <p>{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* Therapy from home */}
            <section className="home-benefits" aria-labelledby="benefits-title">
              <div className="section-wrap benefits-grid">
                <div className="benefits-media reveal">
                  <img
                    src="/images/gallery/therapy-at-home.jpg"
                    alt="A parent joining an online therapy session on a tablet from her living room"
                    loading="lazy"
                  />
                  <div className="floating-card benefits-badge">
                    <span className="icon-badge small tint-0">
                      <Icon name="lock" size={18} />
                    </span>
                    <span>
                      <strong>Private &amp; secure</strong>
                      <small>Confidential video sessions</small>
                    </span>
                  </div>
                </div>
                <div className="benefits-body">
                  <span className="eyebrow reveal">Therapy from home</span>
                  <h2 className="section-title reveal" id="benefits-title">
                    Real progress, right where life happens
                  </h2>
                  <ul className="benefit-list">
                    {HOME_BENEFITS.map((benefit, idx) => (
                      <li className="benefit reveal" key={benefit.title}>
                        <span className={`icon-badge small tint-${idx % 4}`}>
                          <Icon name={benefit.icon} size={18} />
                        </span>
                        <span>
                          <strong>{benefit.title}</strong>
                          <small>{benefit.desc}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="faq-section" aria-labelledby="faq-title">
              <div className="section-wrap faq-grid">
                <div className="section-head faq-head reveal">
                  <span className="eyebrow">Questions parents ask</span>
                  <h2 className="section-title" id="faq-title">
                    Frequently asked questions
                  </h2>
                  <p className="lead">
                    Can't find your answer? Message us on WhatsApp and we will
                    get back to you.
                  </p>
                  <a
                    className="whatsapp-btn"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={18} />
                    <span>Ask a question</span>
                  </a>
                </div>
                <div className="faq-list">
                  {FAQS.map((item, idx) => (
                    <details className="faq-item reveal" key={item.q} open={idx === 0}>
                      <summary>
                        <span>{item.q}</span>
                        <span className="faq-icon" aria-hidden="true">
                          <Icon name="chevronDown" size={18} />
                        </span>
                      </summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Closing CTA */}
            <section className="section-wrap cta-section">
              <div className="cta-band reveal">
                <Blob variant={2} className="cta-blob" />
                <div className="cta-band-text">
                  <h2>Every voice deserves to be heard</h2>
                  <p>
                    Take the first step today. Tell us a little about your
                    concerns and we will guide you to the right therapy plan.
                  </p>
                </div>
                <div className="cta-band-actions">
                  <button
                    className="primary-btn"
                    type="button"
                    onClick={() => changeView("appointment")}
                  >
                    Book an appointment
                  </button>
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => changeView("services")}
                  >
                    Explore services
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ABOUT VIEW */}
        {activeView === "about" && (
          <section className="page-section about-page" id="about">
            <div className="section-wrap about-grid">
              <div className="about-visual reveal">
                <Blob variant={2} className="about-photo-blob" />
                <div className="blob-frame about-photo-frame">
                  <img
                    src={therapist.aboutPhoto || therapist.photo}
                    alt={`${therapist.name}, ${therapist.role}`}
                    className="blob-photo"
                  />
                </div>
                <div className="floating-card about-caption">
                  <span className="icon-badge small tint-0">
                    <Icon name="award" size={18} />
                  </span>
                  <span>
                    <strong>{therapist.council || "RCI Certified"}</strong>
                    <small>{therapist.crr}</small>
                  </span>
                </div>
              </div>

              <div className="about-bio-column">
                <span className="eyebrow reveal">About the specialist</span>
                <h1 className="bio-title reveal">{therapist.name}</h1>
                <p className="bio-subtitle reveal">{therapist.role}</p>

                <ul className="credential-pills reveal" aria-label="Credentials">
                  <li className="chip">
                    <Icon name="graduation" size={18} />
                    {therapist.degrees}
                  </li>
                  <li className="chip">
                    <Icon name="award" size={18} />
                    {therapist.crr}
                  </li>
                </ul>

                <div className="bio-prose reveal">
                  {(therapist.bioParagraphs || []).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="expertise-block reveal">
                  <h2 className="card-title">Areas of clinical specialisation</h2>
                  <ul className="expertise-tags">
                    {specializations.map((spec, idx) => (
                      <li className={`expertise-tag tint-${idx % 4}`} key={spec}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="action-row reveal">
                  <button
                    className="primary-btn"
                    type="button"
                    onClick={() => changeView("appointment")}
                  >
                    Schedule an assessment
                  </button>
                  <a
                    className="whatsapp-btn"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={18} />
                    <span>Ask a question</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SERVICES VIEW */}
        {activeView === "services" && (
          <section className="page-section services-page" id="services">
            <div className="section-wrap">
              <div className="section-head centered reveal">
                <span className="eyebrow">Our clinical services</span>
                <h1 className="page-main-heading">Comprehensive telepractice care</h1>
                <p className="lead">
                  Specialised evaluation and individualised therapy programmes,
                  delivered online for toddlers, school-age children, teens and
                  adults.
                </p>
              </div>

              <div className="services-bento">
                {servicesList.map((service, idx) => {
                  const key = service.num || String(idx);
                  const expanded = expandedServices.has(key);
                  const descId = `service-desc-${idx}`;
                  return (
                    <article
                      className={`service-card tint-${idx % 4} ${idx % 5 === 0 ? "wide" : ""} reveal`}
                      key={key}
                    >
                      <div className="service-card-top">
                        <span className="icon-badge">
                          <Icon name={iconFor(service.title)} />
                        </span>
                        {service.tag && (
                          <span className="service-tag">{service.tag}</span>
                        )}
                      </div>
                      <h2 className="card-title">{service.title}</h2>
                      <p
                        id={descId}
                        className={`service-desc ${expanded ? "expanded" : ""}`}
                      >
                        {service.desc}
                      </p>
                      <div className="service-card-actions">
                        <button
                          type="button"
                          className="text-link"
                          aria-expanded={expanded}
                          aria-controls={descId}
                          onClick={() => toggleService(key)}
                        >
                          {expanded ? "Show less" : "Learn more"}
                          <Icon
                            name="chevronDown"
                            size={16}
                            className={`chevron ${expanded ? "up" : ""}`}
                          />
                        </button>
                        <button
                          type="button"
                          className="book-pill"
                          onClick={() => bookForService(service.title)}
                        >
                          Book this
                          <Icon name="arrowRight" size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="cta-band reveal">
                <Blob variant={0} className="cta-blob" />
                <div className="cta-band-text">
                  <h2>Unsure which service fits?</h2>
                  <p>
                    Reach out for an initial consultation and we will guide you
                    to the right therapeutic plan.
                  </p>
                </div>
                <div className="cta-band-actions">
                  <button
                    className="primary-btn"
                    type="button"
                    onClick={() => changeView("appointment")}
                  >
                    Book an assessment
                  </button>
                  <a
                    className="whatsapp-btn"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={18} />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* APPOINTMENT VIEW */}
        {activeView === "appointment" && (
          <section className="booking-page" id="appointment">
            <div className="section-wrap section-head centered reveal booking-head">
              <span className="eyebrow">Consultation booking</span>
              <h1 className="page-main-heading">Book an appointment</h1>
              <p className="lead">
                Share a few details and we will get in touch promptly to confirm
                a time that suits you.
              </p>
            </div>

            <WaveDivider />
            <div className="band booking-band">
              <div className="section-wrap booking-layout">
                {submitted ? (
                  <div className="booking-card success-card" role="status">
                    <span className="success-icon">
                      <Icon name="check" size={30} strokeWidth={2.2} />
                    </span>
                    <h2>Thank you, your request is in</h2>
                    <p className="lead">
                      {therapist.name} will review your details and contact you
                      shortly to confirm your consultation.
                    </p>
                    <ol className="next-steps">
                      <li>
                        <strong>We review your request</strong>
                        <span>Usually the same or next working day.</span>
                      </li>
                      <li>
                        <strong>We contact you to confirm</strong>
                        <span>By phone or WhatsApp, at a time that suits you.</span>
                      </li>
                      <li>
                        <strong>Your first session</strong>
                        <span>A relaxed intake consultation, fully online.</span>
                      </li>
                    </ol>
                    <div className="action-row">
                      <button
                        className="primary-btn"
                        type="button"
                        onClick={() => changeView("home")}
                      >
                        Back to home
                      </button>
                      <button
                        className="secondary-btn"
                        type="button"
                        onClick={() => setSubmitted(false)}
                      >
                        Send another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="booking-card">
                    <form className="booking-form" onSubmit={submitAppointment}>
                      <div className="form-field">
                        <label className="form-label" htmlFor="form-name">
                          Full name <span className="req" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="form-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          className="form-input"
                          placeholder="e.g. Sarah Jenkins"
                          value={form.name}
                          onChange={updateField}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label className="form-label" htmlFor="form-age">
                            Age (years) <span className="req" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="form-age"
                            name="age"
                            type="number"
                            min="0"
                            max="120"
                            inputMode="numeric"
                            className="form-input"
                            placeholder="e.g. 5"
                            value={form.age}
                            onChange={updateField}
                            required
                          />
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="form-gender">
                            Gender <span className="req" aria-hidden="true">*</span>
                          </label>
                          <select
                            id="form-gender"
                            name="gender"
                            className="form-input form-select"
                            value={form.gender}
                            onChange={updateField}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label className="form-label" htmlFor="form-phone">
                            Mobile / WhatsApp <span className="req" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="form-phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="form-input"
                            placeholder="e.g. +91 98765 43210"
                            value={form.phone}
                            onChange={updateField}
                            required
                          />
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="form-email">
                            Email <span className="field-hint">(for instant confirmation)</span>
                          </label>
                          <input
                            id="form-email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="form-input"
                            placeholder="e.g. parent@gmail.com"
                            value={form.email}
                            onChange={updateField}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <div className="label-with-hint">
                          <label className="form-label" htmlFor="form-concerns">
                            Primary concerns or goals <span className="req" aria-hidden="true">*</span>
                          </label>
                          <span className="field-hint" id="concern-hint">
                            Tap the topics that apply, or describe in your own words
                          </span>
                        </div>

                        <div className="concern-chips" role="group" aria-describedby="concern-hint">
                          {concernSuggestions.map((tag) => {
                            const selected = selectedConcerns.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                className={`concern-chip ${selected ? "selected" : ""}`}
                                aria-pressed={selected}
                                onClick={() => toggleConcern(tag)}
                              >
                                {selected && <Icon name="check" size={14} strokeWidth={2.4} />}
                                {tag}
                              </button>
                            );
                          })}
                        </div>

                        <textarea
                          id="form-concerns"
                          name="concerns"
                          className="form-input form-textarea"
                          value={form.concerns}
                          onChange={updateField}
                          placeholder="Describe the main communication concerns, difficulties or goals..."
                          rows="4"
                          required
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          className="primary-btn submit-btn"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner" aria-hidden="true" />
                              <span>Sending request...</span>
                            </>
                          ) : (
                            <span>Submit appointment request</span>
                          )}
                        </button>

                        <a
                          className="whatsapp-btn"
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="whatsapp" size={18} />
                          <span>Or book via WhatsApp</span>
                        </a>
                      </div>

                      <div className="status-region" aria-live="polite">
                        {status && <p className="status-notice">{status}</p>}
                      </div>
                    </form>
                  </div>
                )}

                <aside className="booking-aside">
                  <div className="aside-card tint-0">
                    <h2 className="card-title">What to expect</h2>
                    <ul className="info-checklist">
                      <li>
                        <span className="check-bullet" aria-hidden="true">
                          <Icon name="check" size={14} strokeWidth={2.4} />
                        </span>
                        <div>
                          <strong>Confidential assessment</strong>
                          <p>A detailed intake on speech history, milestones and challenges.</p>
                        </div>
                      </li>
                      <li>
                        <span className="check-bullet" aria-hidden="true">
                          <Icon name="check" size={14} strokeWidth={2.4} />
                        </span>
                        <div>
                          <strong>Personalised roadmap</strong>
                          <p>Clear therapy objectives and a realistic milestone timeline.</p>
                        </div>
                      </li>
                      <li>
                        <span className="check-bullet" aria-hidden="true">
                          <Icon name="check" size={14} strokeWidth={2.4} />
                        </span>
                        <div>
                          <strong>Flexible sessions</strong>
                          <p>Online appointments planned around your family's routine.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="aside-card tint-2 privacy-card">
                    <span className="icon-badge small">
                      <Icon name="lock" size={18} />
                    </span>
                    <div>
                      <strong>Privacy &amp; confidentiality</strong>
                      <p>
                        All clinical communication and records are handled with
                        strict professional confidentiality.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
            <WaveDivider flip />
          </section>
        )}

        {/* CONTACT VIEW */}
        {activeView === "contact" && (
          <section className="page-section contact-page" id="contact">
            <div className="section-wrap">
              <div className="section-head centered reveal">
                <span className="eyebrow">Get in touch</span>
                <h1 className="page-main-heading">We are here to help</h1>
                <p className="lead">
                  Reach {therapist.name} directly for questions, consultations or
                  scheduling, whichever way suits you best.
                </p>
              </div>

              <div className="contact-tiles">
                <a className="contact-tile tint-0 reveal" href={callHref}>
                  <span className="icon-badge">
                    <Icon name="phone" />
                  </span>
                  <span className="contact-category">Phone consultation</span>
                  <strong className="contact-headline">{therapist.call}</strong>
                  <span className="contact-action">
                    Call now <Icon name="arrowRight" size={16} />
                  </span>
                </a>

                <a
                  className="contact-tile tint-1 reveal"
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon-badge">
                    <Icon name="whatsapp" />
                  </span>
                  <span className="contact-category">Instant chat</span>
                  <strong className="contact-headline">{therapist.whatsapp}</strong>
                  <span className="contact-action">
                    Chat on WhatsApp <Icon name="arrowRight" size={16} />
                  </span>
                </a>

                <a className="contact-tile tint-2 reveal" href={`mailto:${therapist.email}`}>
                  <span className="icon-badge">
                    <Icon name="mail" />
                  </span>
                  <span className="contact-category">Email</span>
                  <strong className="contact-headline">{therapist.email}</strong>
                  <span className="contact-action">
                    Write to us <Icon name="arrowRight" size={16} />
                  </span>
                </a>

                <a
                  className="contact-tile tint-3 reveal"
                  href={therapist.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon-badge">
                    <Icon name="linkedin" />
                  </span>
                  <span className="contact-category">Professional network</span>
                  <strong className="contact-headline">{therapist.linkedInName}</strong>
                  <span className="contact-action">
                    View LinkedIn profile <Icon name="arrowRight" size={16} />
                  </span>
                </a>
              </div>

              <div className="hours-card reveal">
                <div>
                  <h2 className="card-title">Availability</h2>
                  <p>Online appointments through secure telepractice.</p>
                  <span className="hours-pill">
                    <Icon name="clock" size={16} />
                    {availabilityText}
                  </span>
                </div>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => changeView("appointment")}
                >
                  Book your consultation
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="section-wrap footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-badge">
              <img src={CLINIC_LOGO_URL} alt="" className="brand-logo-img" />
              <span className="brand-text-wrap">
                <span className="brand-title">Speech Connect</span>
                <span className="brand-sub">Online speech &amp; language telepractice</span>
              </span>
            </div>
            <p>
              Evidence-based online care led by{" "}
              <strong>{therapist.name || "Najiya P M"}</strong> (
              {therapist.degrees || "M.Sc. SLP, OPT"}), registered with the
              Rehabilitation Council of India ({therapist.crr || "CRR No: A84512"}).
            </p>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`footer-link ${activeView === item.id ? "active" : ""}`}
                    onClick={() => changeView(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-heading">Get in touch</h2>
            <ul className="footer-links">
              {therapist.whatsapp && (
                <li>
                  <a className="footer-link" href={whatsappDirect} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" size={16} /> WhatsApp
                  </a>
                </li>
              )}
              {therapist.call && (
                <li>
                  <a className="footer-link" href={callHref}>
                    <Icon name="phone" size={16} /> {therapist.call}
                  </a>
                </li>
              )}
              {therapist.email && (
                <li>
                  <a className="footer-link" href={`mailto:${therapist.email}`}>
                    <Icon name="mail" size={16} /> Email us
                  </a>
                </li>
              )}
            </ul>
            <span className="hours-pill footer-hours">
              <Icon name="clock" size={15} />
              {availabilityText}
            </span>
          </div>
        </div>

        <div className="section-wrap footer-bottom">
          <span>© {new Date().getFullYear()} Speech Connect. All rights reserved.</span>
          <span>Online telepractice, worldwide</span>
        </div>
      </footer>

      {/* Mobile sticky quick actions (hidden on the booking page) */}
      {activeView !== "appointment" && (
        <aside className="mobile-sticky-dock" aria-label="Quick actions">
          <button
            className="dock-book-btn"
            type="button"
            onClick={() => changeView("appointment")}
          >
            Book a consultation
          </button>
          <a
            className="dock-whatsapp-btn"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on WhatsApp"
          >
            <Icon name="whatsapp" size={20} />
            <span>WhatsApp</span>
          </a>
        </aside>
      )}

      {/* Toast Notifications */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-dot" />
            <span className="toast-text">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
