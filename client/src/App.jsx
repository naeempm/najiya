import { useMemo, useState } from 'react';

const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL;
  if (url) {
    url = url.replace(/\/$/, '');
    if (!url.endsWith('/api')) {
      url = `${url}/api`;
    }
    return url;
  }
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.startsWith('192.168.')
  );
  return isLocal ? 'http://127.0.0.1:5001/api' : 'https://najiya.vercel.app/api';
};

const API_URL = getApiUrl();

const therapist = {
  name: 'Najiya P M (Msc. SLP, OPT)',
  fullName: 'Najiya P M',
  role: 'Founder & Lead SLP',
  crr: 'CRR No: A84512',
  photo: '/images/najiya-pm.jpg',
  email: 'speechconnect.in@gmail.com',
  call: '+91 8281753253',
  whatsapp: '+91 9349412153',
  linkedIn: 'https://www.linkedin.com/in/najiya-p-m-69b349322',
  linkedInName: 'NAJIYA P M',
};

const keywords = [
  { title: 'Individualized', desc: 'Therapy' },
  { title: 'Population', desc: 'Paediatrics & Adults' },
  { title: 'Flexible', desc: 'Days & Timings' },
];

const services = [
  'Speech & Language Consultations & Assessment',
  'Early Intervention',
  'Speech Therapy',
  'Pair Sessions & Group Therapy',
  'Oral Placement Therapy',
  'Neurological Rehabilitation',
  'Cognitive Communication Therapy',
  'Caregiver / Parental Training',
  'Home Programs',
  'Counselling',
];

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Get In Touch' },
];

function App() {
  const [activeView, setActiveView] = useState('home');
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    concerns: '',
  });
  const [status, setStatus] = useState('');
  const [toasts, setToasts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function showToast(message, type = 'success') {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  }

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(
      `Appointment Request\nName: ${form.name}\nAge: ${form.age}\nGender: ${form.gender}\nMobile: ${form.phone}\nConcerns: ${form.concerns}`,
    );

    return `https://wa.me/${therapist.whatsapp.replace(/\D/g, '')}?text=${message}`;
  }, [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function changeView(view) {
    setActiveView(view);
    setStatus('');
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submitAppointment(event) {
    event.preventDefault();
    setStatus('Sending request...');

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('Appointment request sent. We will contact you soon.');
      showToast('Appointment request submitted successfully!', 'success');
      setForm({
        name: '',
        age: '',
        gender: '',
        phone: '',
        concerns: '',
      });
    } catch (current) {
      setStatus('Server is not running. Opening WhatsApp instead.');
      showToast('Server is offline. Redirecting to WhatsApp...', 'info');
      setTimeout(() => {
        window.location.href = whatsappLink;
      }, 1500);
    }
  }

  return (
    <main>
      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="brand-link"
            type="button"
            onClick={() => changeView('home')}
            aria-label="Speech Connect Home"
          >
            <span className="brand-dot"></span>
            <strong>SPEECH CONNECT</strong>
          </button>

          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={activeView === item.id ? 'active-nav' : ''}
                key={item.id}
                type="button"
                onClick={() => changeView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {activeView === 'home' && (
        <section className="hero interface-page" id="home">
          <div className="hero-copy section-wrap">
            <h1 className="hero-title">SPEECH CONNECT</h1>
            <p className="hero-subtitle">online speech therapy platform</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => changeView('appointment')}>
                BOOK AN APPOINTMENT
              </button>
            </div>
            <div className="hero-stats" aria-label="Key platform details">
              {keywords.map((item) => (
                <div key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="profile-panel" aria-label="Therapist profile">
            <div className="profile-photo">
              <img src={therapist.photo} alt="Najiya P M, Founder & Lead SLP" />
            </div>
          </aside>
        </section>
      )}

      {activeView === 'about' && (
        <section className="about-section interface-page section-wrap" id="about">
          <div className="about-card-clean">
            <div className="profile-photo about-photo-clean">
              <img src={therapist.photo} alt="Najiya P M, Founder & Lead SLP" />
            </div>
            <div className="about-details-clean">
              <h2 className="about-name">Najiya P M (Msc. SLP, OPT)</h2>
              <p className="about-role">Founder & Lead SLP</p>
              <p className="about-crr">CRR No: A84512</p>
            </div>
          </div>
        </section>
      )}

      {activeView === 'services' && (
        <section className="services-section interface-page section-wrap" id="services">
          <div className="services-grid-clean">
            {services.map((service, index) => (
              <article className="service-card-clean" key={service}>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="service-title">{service}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeView === 'appointment' && (
        <section className="appointment-section interface-page section-wrap" id="appointment">
          <div className="appointment-copy">
            <h2 className="appointment-title">APPOINTMENT FORM</h2>
          </div>

          <form className="booking-form" onSubmit={submitAppointment}>
            <label>
              Full Name
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Age
              <input
                name="age"
                type="number"
                min="0"
                value={form.age}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Gender
              <select name="gender" value={form.gender} onChange={updateField} required>
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Mobile
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                required
              />
            </label>
            <label className="wide-field">
              Concerns
              <textarea
                name="concerns"
                value={form.concerns}
                onChange={updateField}
                placeholder="Speech & language assessment, clarity issues, stammering, cognitive communication, etc."
                rows="5"
                required
              />
            </label>
            <button type="submit">Submit</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      )}

      {activeView === 'contact' && (
        <section className="contact-section interface-page section-wrap" id="contact">
          <div className="contact-heading-clean">
            <h2>GET IN TOUCH</h2>
          </div>
          <div className="contact-grid-clean">
            <a className="contact-item-card" href={`tel:${therapist.call.replace(/\s+/g, '')}`}>
              <div className="contact-symbol-box call-symbol-box" aria-hidden="true">
                <svg className="contact-symbol" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-text-content">
                <span className="contact-type">Call</span>
                <strong className="contact-detail">{therapist.call}</strong>
              </div>
            </a>

            <a className="contact-item-card" href={`https://wa.me/${therapist.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
              <div className="contact-symbol-box whatsapp-symbol-box" aria-hidden="true">
                <svg className="contact-symbol" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 2c-5.518 0-10 4.475-10 9.993a9.96 9.96 0 0 0 1.543 5.342L2 22l4.814-1.528a9.957 9.957 0 0 0 5.217 1.487h.004c5.518 0 10-4.475 10-9.993 0-2.67-1.04-5.18-2.929-7.069A9.927 9.927 0 0 0 12.031 2zm0 18.286c-1.59 0-3.14-.424-4.502-1.23l-.323-.192-3.342 1.06 1.085-3.256-.21-.334a8.287 8.287 0 0 1-1.271-4.341c0-4.566 3.719-8.28 8.29-8.28a8.243 8.243 0 0 1 5.867 2.43 8.257 8.257 0 0 1 2.428 5.86c0 4.567-3.719 8.28-8.29 8.28zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062a6.788 6.788 0 0 1-2.001-1.234 7.494 7.494 0 0 1-1.385-1.724c-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.754 2.678 4.249 3.755.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/>
                </svg>
              </div>
              <div className="contact-text-content">
                <span className="contact-type">Whatsapp</span>
                <strong className="contact-detail">{therapist.whatsapp}</strong>
              </div>
            </a>

            <a className="contact-item-card" href={`mailto:${therapist.email}`}>
              <div className="contact-symbol-box email-symbol-box" aria-hidden="true">
                <svg className="contact-symbol" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-text-content">
                <span className="contact-type">Email</span>
                <strong className="contact-detail">{therapist.email}</strong>
              </div>
            </a>

            <a className="contact-item-card" href={therapist.linkedIn} target="_blank" rel="noopener noreferrer">
              <div className="contact-symbol-box linkedin-symbol-box" aria-hidden="true">
                <svg className="contact-symbol" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63z"/>
                </svg>
              </div>
              <div className="contact-text-content">
                <span className="contact-type">LinkedIn</span>
                <strong className="contact-detail">{therapist.linkedInName}</strong>
              </div>
            </a>
          </div>
        </section>
      )}

      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
