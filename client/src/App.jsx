import { useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

const therapist = {
  name: 'Ms. Najiya P M',
  credentials: 'MSc.SLP, OPT',
  role: 'Speech Language Pathologist',
  crr: 'CRR NO. A84512',
  photo: '/images/najiya-pm.jpg',
  email: '',
  call: '+91 8281753253',
  whatsapp: '+91 9349412153',
  linkedIn: 'https://www.linkedin.com/in/najiya-p-m-69b349322',
};

const keywords = ['Online Therapy', 'Paediatrics & Adults', 'Flexible Days & Timings'];

const services = [
  'Speech & Language Consultation, Assessment & Therapy',
  'Oral Placement Therapy',
  'Counseling',
  'Home Training',
];

const concerns = [
  'Language Delay',
  'Clarity Issues',
  'Stammering',
  'Voice Disorders',
  'Stroke & Other Neurological Damage Related Communication Disorders',
];

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'contact', label: 'Contact' },
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
            className="brand brand-button"
            type="button"
            onClick={() => changeView('home')}
            aria-label="Speech Language Pathology Platform home"
          >
            <span>SLP</span> Online
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
            <p className="eyebrow">Online therapy platform</p>
            <h1>Speech Language Pathology Platform (Online)</h1>
            <p>
              Speech and language support for paediatrics and adults with
              flexible days and timings.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => changeView('appointment')}>
                Book an appointment
              </button>
              <a className="secondary-button" href={`https://wa.me/${therapist.whatsapp.replace(/\D/g, '')}`}>
                WhatsApp
              </a>
            </div>
            <div className="hero-stats" aria-label="Key platform details">
              {keywords.map((keyword) => (
                <div key={keyword}>
                  <strong>{keyword.split(' ')[0]}</strong>
                  <span>{keyword.replace(keyword.split(' ')[0], '').trim() || keyword}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="profile-panel" aria-label="Therapist profile">
            <div className="profile-photo">
              <img src={therapist.photo} alt={`${therapist.name}, speech language pathologist`} />
            </div>
            <div>
              <h2>{therapist.name}</h2>
              <p>{therapist.credentials}</p>
              <strong>{therapist.role}</strong>
              <p className="crr-number">{therapist.crr}</p>
            </div>
          </aside>
        </section>
      )}

      {activeView === 'about' && (
        <section className="split-section interface-page section-wrap" id="about">
          <div>
            <p className="section-label">About</p>
            <h2>{therapist.name}</h2>
          </div>
          <div className="about-layout">
            <div className="profile-photo about-photo">
              <img src={therapist.photo} alt={`${therapist.name}, speech language pathologist`} />
            </div>
            <div className="about-details">
              <p>{therapist.credentials}</p>
              <p>{therapist.role}</p>
              <p>{therapist.crr}</p>
            </div>
          </div>
        </section>
      )}

      {activeView === 'services' && (
        <section className="services-section interface-page section-wrap" id="services">
          <div className="section-heading">
            <div>
              <p className="section-label">Services</p>
              <h2>Speech, language, and communication support</h2>
            </div>
            <p>
              Consultation, assessment, therapy, counseling, and home training
              for common speech-language concerns.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service}>
                <span aria-hidden="true">{service.slice(0, 1)}</span>
                <h3>{service}</h3>
              </article>
            ))}
          </div>

          <div className="concerns-panel">
            <h3>Supported concerns</h3>
            <ul>
              {concerns.map((concern) => (
                <li key={concern}>{concern}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {activeView === 'appointment' && (
        <section className="appointment-section interface-page section-wrap" id="appointment">
          <div className="appointment-copy">
            <p className="section-label">Book an appointment</p>
            <h2>Share the basic details.</h2>
            <p>
              Name, age, gender, mobile number, and concerns are enough for the
              first contact.
            </p>
          </div>

          <form className="booking-form" onSubmit={submitAppointment}>
            <label>
              Name
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={updateField}
                placeholder="Full name"
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
                placeholder="Age"
                required
              />
            </label>
            <label>
              Gender
              <select name="gender" value={form.gender} onChange={updateField} required>
                <option value="">Select gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </label>
            <label>
              Mobile
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                placeholder="+91"
                required
              />
            </label>
            <label className="wide-field">
              Concerns
              <textarea
                name="concerns"
                value={form.concerns}
                onChange={updateField}
                placeholder="Language delay, clarity issue, stammering, voice concern, neurological communication difficulty..."
                rows="5"
                required
              />
            </label>
            <button type="submit">Send appointment request</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      )}

      {activeView === 'contact' && (
        <section className="contact-section interface-page section-wrap" id="contact">
          <div>
            <p className="section-label">Contact Us</p>
            <h2>Speech Language Pathology Platform (Online)</h2>
          </div>
          <div className="contact-grid">
            <a href={`tel:${therapist.call.replace(/\D/g, '')}`}>
              <span>Call</span>
              <strong>{therapist.call}</strong>
            </a>
            <a href={`https://wa.me/${therapist.whatsapp.replace(/\D/g, '')}`}>
              <span>WhatsApp</span>
              <strong>{therapist.whatsapp}</strong>
            </a>
            <div>
              <span>Email</span>
              <strong>{therapist.email || 'To be added'}</strong>
            </div>
            <a href={therapist.linkedIn}>
              <span>LinkedIn</span>
              <strong>Najiya P M</strong>
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
