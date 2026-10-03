import { useMemo, useState, useEffect } from "react";

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

const CLINIC_LOGO_URL = "https://res.cloudinary.com/c4qcrdad/image/upload/v1791043690/speech_connect/logo.jpg";

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
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    concerns: "",
  });
  const [status, setStatus] = useState("");
  const [toasts, setToasts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme toggle: dark (black) or light
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("speech_connect_theme");
      if (saved === "dark" || saved === "light") return saved;
      return "dark"; // Default to sleek black dark theme
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("speech_connect_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
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

  useEffect(() => {
    if (!heroPhotos.length) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroPhotos.length]);

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

  function handleQuickConcern(tag) {
    setForm((current) => {
      if (!current.concerns) return { ...current, concerns: tag };
      if (current.concerns.includes(tag)) return current;
      return { ...current, concerns: `${current.concerns}, ${tag}` };
    });
  }

  function changeView(view) {
    setActiveView(view);
    setStatus("");
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
      setForm({
        name: "",
        email: "",
        age: "",
        gender: "",
        phone: "",
        concerns: "",
      });
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

  return (
    <div className="site-wrapper">
      {/* Header */}
      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="brand-link"
            type="button"
            onClick={() => changeView("home")}
            aria-label="Speech Connect Home"
          >
            <img
              src={CLINIC_LOGO_URL}
              alt="Speech Connect Logo"
              className="brand-logo-img"
            />
            <div className="brand-text-wrap">
              <span className="brand-title">SPEECH CONNECT</span>
              <span className="brand-sub">ONLINE THERAPY</span>
            </div>
          </button>

          {/* Right Header Controls: Nav + Theme Toggle + Mobile Toggle */}
          <div className="topbar-right-group">
            {/* Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Primary navigation">
              {navItems.map((item) => (
                <button
                  className={`nav-btn ${activeView === item.id ? "active-nav" : ""}`}
                  key={item.id}
                  type="button"
                  onClick={() => changeView(item.id)}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="topbar-cta-btn"
                type="button"
                onClick={() => changeView("appointment")}
              >
                Book Session
              </button>
            </nav>

            {/* Dark (Black) / Light Theme Toggle Button */}
            <button
              className="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode (black)"}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode (Black)"}
            >
              {theme === "dark" ? (
                /* Sun Icon */
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${menuOpen ? "drawer-open" : ""}`}>
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <button
                className={`mobile-nav-btn ${activeView === item.id ? "active-mobile-nav" : ""}`}
                key={item.id}
                type="button"
                onClick={() => changeView(item.id)}
              >
                <span>{item.label}</span>
                <span className="mobile-nav-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-theme-row">
              <span className="mobile-theme-label">Appearance</span>
              <div className="theme-toggle-chips">
                <button
                  type="button"
                  className={`theme-chip ${theme === "light" ? "active" : ""}`}
                  onClick={() => setTheme("light")}
                >
                  ☀️ Light
                </button>
                <button
                  type="button"
                  className={`theme-chip ${theme === "dark" ? "active" : ""}`}
                  onClick={() => setTheme("dark")}
                >
                  🌙 Dark (Black)
                </button>
              </div>
            </div>

            <button
              className="primary-btn mobile-cta-btn"
              type="button"
              onClick={() => changeView("appointment")}
            >
              Book an Appointment
            </button>
            <a
              className="whatsapp-ghost-btn"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="btn-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
              </svg>
              <span>Quick Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="main-content">
        {/* HOME VIEW */}
        {activeView === "home" && (
          <section className="hero-section section-wrap" id="home">
            <div className="hero-grid">
              <div className="hero-text-col">
                <div className="pill-badge">
                  <span className="pill-dot"></span>
                  <span>{hero.badge}</span>
                </div>

                <h1 className="hero-heading">{hero.title}</h1>

                <p className="hero-description">{hero.description}</p>

                <div className="hero-cta-group">
                  <button
                    className="primary-btn"
                    type="button"
                    onClick={() => changeView("appointment")}
                  >
                    <span>Book an Appointment</span>
                    <span className="btn-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => changeView("services")}
                  >
                    View All Services
                  </button>
                </div>

                {/* Therapist quick credentials strip */}
                <div className="therapist-credential-bar">
                  <div className="cred-item">
                    <span className="cred-label">Lead Therapist</span>
                    <span className="cred-val">
                      {therapist.name || therapist.fullName}
                    </span>
                  </div>
                  <div className="cred-divider" />
                  <div className="cred-item">
                    <span className="cred-label">Qualification</span>
                    <span className="cred-val">{therapist.degrees}</span>
                  </div>
                  <div className="cred-divider" />
                  <div className="cred-item">
                    <span className="cred-label">Registration</span>
                    <span className="cred-val">{therapist.crr}</span>
                  </div>
                </div>
              </div>

              {/* Photo Showcase Carousel */}
              <div className="hero-media-col">
                <div className="hero-image-card">
                  <div className="hero-slider-wrap">
                    {heroPhotos.map((photo, index) => (
                      <img
                        key={photo}
                        src={photo}
                        alt="Speech therapy session showcase"
                        className={`hero-slide ${index === heroIndex ? "active-slide" : ""}`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ))}
                  </div>

                  {heroPhotos.length > 1 && (
                    <div className="slider-nav-controls">
                      {heroPhotos.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`slider-pill ${index === heroIndex ? "active-pill" : ""}`}
                          onClick={() => setHeroIndex(index)}
                          aria-label={`Show slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="hero-floating-badge">
                    <span className="floating-badge-title">
                      Online Consultations
                    </span>
                    <span className="floating-badge-sub">
                      Pediatrics & Adults
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Highlights Grid */}
            <div className="highlights-section">
              <div className="section-header-compact">
                <span className="section-eyebrow">Our Clinical Approach</span>
                <h2 className="section-subtitle">
                  Designed Around Your Individual Communication Needs
                </h2>
              </div>

              <div className="highlights-grid">
                {highlights.map((item, idx) => (
                  <article className="highlight-card" key={item.num || idx}>
                    <span className="highlight-num">
                      {item.num || `0${idx + 1}`}
                    </span>
                    <h3 className="highlight-title">{item.title}</h3>
                    <p className="highlight-desc">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ABOUT VIEW */}
        {activeView === "about" && (
          <section className="about-page section-wrap" id="about">
            <div className="section-header-centered">
              <span className="section-eyebrow">About The Specialist</span>
              <h1 className="page-main-heading">
                Clinical Excellence & Empathy
              </h1>
              <p className="page-main-intro">
                Dedicated to clinical precision, gentle guidance, and empowering
                individuals of all ages to speak with clarity and confidence.
              </p>
            </div>

            <div className="about-editorial-grid">
              <div className="about-image-column">
                <div className="about-portrait-card">
                  <img
                    src={therapist.aboutPhoto || therapist.photo}
                    alt={`${therapist.name} - Lead Speech-Language Pathologist`}
                    className="about-portrait-img"
                  />
                  <div className="portrait-caption">
                    <strong>{therapist.name}</strong>
                    <span>{therapist.role}</span>
                  </div>
                </div>

                <div className="about-quick-contact-card">
                  <h4>Direct Inquiries</h4>
                  <p>Have specific clinical questions before booking?</p>
                  <a
                    className="whatsapp-ghost-btn full-width"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="about-bio-column">
                <div className="bio-block">
                  <div className="badge-row">
                    <span className="clean-badge">{therapist.degrees}</span>
                    <span className="clean-badge">{therapist.crr}</span>
                    <span className="clean-badge">
                      {therapist.council || "RCI Certified"}
                    </span>
                  </div>

                  <h2 className="bio-title">{therapist.name}</h2>
                  <p className="bio-subtitle">{therapist.role}</p>

                  <div className="bio-prose">
                    {(therapist.bioParagraphs || []).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="expertise-block">
                  <h3 className="sub-heading">
                    Areas of Clinical Specialization
                  </h3>
                  <div className="expertise-tags-grid">
                    {specializations.map((spec) => (
                      <span className="expertise-tag" key={spec}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="about-action-strip">
                  <button
                    className="primary-btn"
                    type="button"
                    onClick={() => changeView("appointment")}
                  >
                    Schedule an Assessment
                  </button>
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => changeView("services")}
                  >
                    Explore All Services
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SERVICES VIEW */}
        {activeView === "services" && (
          <section className="services-page section-wrap" id="services">
            <div className="section-header-centered">
              <span className="section-eyebrow">Our Clinical Services</span>
              <h1 className="page-main-heading">
                Comprehensive Telepractice Care
              </h1>
              <p className="page-main-intro">
                Specialized evaluation and individualized therapeutic programs
                delivered online for toddlers, school-age children, teens, and
                adults.
              </p>
            </div>

            <div className="services-catalog-grid">
              {servicesList.map((service, idx) => (
                <article
                  className="service-editorial-card"
                  key={service.num || idx}
                >
                  <div className="service-card-top">
                    <span className="service-index">
                      {service.num || `0${idx + 1}`}
                    </span>
                    {service.tag && (
                      <span className="service-category-tag">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <h2 className="service-card-heading">{service.title}</h2>
                  <p className="service-card-text">{service.desc}</p>
                  <div className="service-card-footer">
                    <button
                      className="service-book-action"
                      type="button"
                      onClick={() => bookForService(service.title)}
                    >
                      <span>Book this service</span>
                      <span className="link-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="services-cta-banner">
              <div className="banner-content">
                <h3>Unsure which service fits your requirements?</h3>
                <p>
                  Reach out for an initial consultation and we will guide you to
                  the right therapeutic plan.
                </p>
              </div>
              <div className="banner-actions">
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => changeView("appointment")}
                >
                  Book Assessment
                </button>
                <a
                  className="whatsapp-ghost-btn"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </section>
        )}

        {/* APPOINTMENT VIEW */}
        {activeView === "appointment" && (
          <section className="appointment-page section-wrap" id="appointment">
            <div className="section-header-centered">
              <span className="section-eyebrow">Consultation Booking</span>
              <h1 className="page-main-heading">Book An Appointment</h1>
              <p className="page-main-intro">
                Fill in the details below to request a speech therapy
                consultation. We will get in touch with you promptly to confirm
                your schedule.
              </p>
            </div>

            <div className="booking-layout-wrap">
              <div className="booking-form-card">
                <form
                  className="booking-form-clean"
                  onSubmit={submitAppointment}
                >
                  <div className="form-field-group">
                    <label className="form-label" htmlFor="form-name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sarah Jenkins"
                      value={form.name}
                      onChange={updateField}
                      required
                    />
                  </div>

                  <div className="form-row-two-col">
                    <div className="form-field-group">
                      <label className="form-label" htmlFor="form-age">
                        Age (Years) <span className="req">*</span>
                      </label>
                      <input
                        id="form-age"
                        name="age"
                        type="number"
                        min="0"
                        max="120"
                        className="form-input"
                        placeholder="e.g. 5"
                        value={form.age}
                        onChange={updateField}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label" htmlFor="form-gender">
                        Gender <span className="req">*</span>
                      </label>
                      <select
                        id="form-gender"
                        name="gender"
                        className="form-select"
                        value={form.gender}
                        onChange={updateField}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-two-col">
                    <div className="form-field-group">
                      <label className="form-label" htmlFor="form-phone">
                        Mobile / WhatsApp <span className="req">*</span>
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

                    <div className="form-field-group">
                      <label className="form-label" htmlFor="form-email">
                        Email Address <span className="field-hint" style={{ fontSize: "11px", fontWeight: "normal", opacity: 0.8 }}>(for instant confirmation)</span>
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

                  <div className="form-field-group">
                    <div className="label-with-hint">
                      <label className="form-label" htmlFor="form-concerns">
                        Primary Concerns or Goals <span className="req">*</span>
                      </label>
                      <span className="field-hint">
                        Tap quick tags below or describe in your words
                      </span>
                    </div>

                    <div className="concern-chips-row">
                      {concernSuggestions.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="concern-chip"
                          onClick={() => handleQuickConcern(tag)}
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>

                    <textarea
                      id="form-concerns"
                      name="concerns"
                      className="form-textarea"
                      value={form.concerns}
                      onChange={updateField}
                      placeholder="Describe the primary communication concerns, difficulties, or goals..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-actions-wrap">
                    <button
                      className="primary-btn submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" aria-hidden="true" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <span>Submit Appointment Request</span>
                      )}
                    </button>

                    <a
                      className="whatsapp-alternative-btn"
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
                      </svg>
                      <span>Or Book via WhatsApp</span>
                    </a>
                  </div>

                  {status && (
                    <div className="status-notice-clean">
                      <p>{status}</p>
                    </div>
                  )}
                </form>
              </div>

              {/* Consultation sidebar notes */}
              <aside className="booking-info-sidebar">
                <div className="info-card-minimal">
                  <h4>What to Expect</h4>
                  <ul className="info-checklist">
                    <li>
                      <span className="check-bullet" aria-hidden="true">
                        ✓
                      </span>
                      <div>
                        <strong>Confidential Assessment</strong>
                        <p>
                          Detailed intake discussing speech history, milestones,
                          and challenges.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="check-bullet" aria-hidden="true">
                        ✓
                      </span>
                      <div>
                        <strong>Personalized Roadmap</strong>
                        <p>
                          Clear therapeutic objectives and realistic milestone
                          timeline.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="check-bullet" aria-hidden="true">
                        ✓
                      </span>
                      <div>
                        <strong>Flexible Sessions</strong>
                        <p>
                          Virtual appointments tailored around your family's
                          routine.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="info-card-minimal security-note">
                  <div className="lock-icon-wrap" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <strong>Privacy & Confidentiality</strong>
                    <p>
                      All clinical communications and medical records are
                      handled with strict professional confidentiality.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* CONTACT VIEW */}
        {activeView === "contact" && (
          <section className="contact-page section-wrap" id="contact">
            <div className="section-header-centered">
              <span className="section-eyebrow">Get In Touch</span>
              <h1 className="page-main-heading">We are here to help</h1>
              <p className="page-main-intro">
                Connect directly with {therapist.name} for inquiries,
                consultations, or appointment scheduling across all
                communication channels.
              </p>
            </div>

            <div className="contact-editorial-grid">
              {/* Phone */}
              <a
                className="contact-card-minimal"
                href={`tel:${(therapist.call || "").replace(/\s+/g, "")}`}
              >
                <div
                  className="contact-icon-bubble phone-bubble"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <span className="contact-category">Phone Consultation</span>
                  <strong className="contact-headline">{therapist.call}</strong>
                  <span className="contact-action-text">
                    Tap to Call Directly →
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                className="contact-card-minimal"
                href={`https://wa.me/${(therapist.whatsapp || "").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="contact-icon-bubble whatsapp-bubble"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <span className="contact-category">Instant Chat</span>
                  <strong className="contact-headline">
                    {therapist.whatsapp}
                  </strong>
                  <span className="contact-action-text">
                    Chat on WhatsApp →
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                className="contact-card-minimal"
                href={`mailto:${therapist.email}`}
              >
                <div
                  className="contact-icon-bubble email-bubble"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <span className="contact-category">Email Correspondence</span>
                  <strong className="contact-headline">
                    {therapist.email}
                  </strong>
                  <span className="contact-action-text">Write to Us →</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                className="contact-card-minimal"
                href={therapist.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="contact-icon-bubble linkedin-bubble"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63z" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <span className="contact-category">Professional Network</span>
                  <strong className="contact-headline">
                    {therapist.linkedInName}
                  </strong>
                  <span className="contact-action-text">
                    View LinkedIn Profile →
                  </span>
                </div>
              </a>
            </div>

            <div className="contact-service-hours-card">
              <div className="service-hours-col">
                <h4>Platform Availability</h4>
                <p>
                  Virtual appointments conducted via secure online telepractice.
                </p>
                <span className="hours-pill">{availabilityText}</span>
              </div>
              <div className="service-hours-cta">
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => changeView("appointment")}
                >
                  Book Your Consultation
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Enhanced Space-Conscious Minimalist Footer */}
      <footer className="site-footer">
        <div className="section-wrap footer-container">
          {/* Main Footer Row */}
          <div className="footer-main-row">
            {/* Column 1: Brand & Clinical Credibility */}
            <div className="footer-brand-pane">
              <div className="footer-brand-badge">
                <img
                  src={CLINIC_LOGO_URL}
                  alt="Speech Connect Logo"
                  className="footer-brand-logo"
                />
                <div className="footer-brand-meta">
                  <span className="footer-brand-name">SPEECH CONNECT</span>
                  <span className="footer-brand-tagline">Online Speech & Language Telepractice</span>
                </div>
              </div>
              <p className="footer-lead-text">
                Evidence-based virtual care founded by certified specialist{" "}
                <strong>{therapist.name || "Najiya P M"}</strong> ({therapist.degrees || "M.Sc. SLP, OPT"}). 
                Registered under Rehabilitation Council of India (<strong>{therapist.crr || "CRR No: A84512"}</strong>).
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="footer-links-pane">
              <span className="footer-pane-heading">Quick Navigation</span>
              <div className="footer-nav-grid">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`footer-link-pill ${activeView === item.id ? "active-footer-link" : ""}`}
                    onClick={() => {
                      changeView(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Direct Clinic Actions & Top Scroll */}
            <div className="footer-actions-pane">
              <span className="footer-pane-heading">Direct Clinical Care</span>
              <div className="footer-action-buttons">
                {therapist.whatsapp && (
                  <a
                    href={`https://wa.me/${(therapist.whatsapp || "").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-cta-pill whatsapp"
                    title="Direct WhatsApp Consultation"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                )}
                {therapist.call && (
                  <a
                    href={`tel:${(therapist.call || "").replace(/\s+/g, "")}`}
                    className="footer-cta-pill call"
                    title="Direct Phone Call"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Direct Call</span>
                  </a>
                )}
                <button
                  type="button"
                  className="footer-top-btn"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  title="Scroll to top of page"
                  aria-label="Scroll back to top"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                  <span>Top</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="footer-hairline" />

          {/* Bottom Bar: Telepractice availability & Copyright */}
          <div className="footer-bottom-bar">
            <div className="footer-bottom-meta">
              <span className="footer-availability-chip">
                <span className="live-dot" />
                {availabilityText || "Monday – Saturday • Flexible Timings"}
              </span>
              <span className="footer-telepractice-tag">Virtual Telepractice Worldwide</span>
            </div>

            <div className="footer-copy-text">
              © {new Date().getFullYear()} Speech Connect. All clinical rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Quick Action Bar */}
      <aside className="mobile-sticky-dock" aria-label="Quick mobile actions">
        <button
          className="dock-book-btn"
          type="button"
          onClick={() => changeView("appointment")}
        >
          Book Consultation
        </button>
        <a
          className="dock-whatsapp-btn"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </aside>

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
