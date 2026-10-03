import { useEffect, useState, useMemo, useRef } from 'react';

const CLINIC_LOGO_URL = 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043690/speech_connect/logo.jpg';

const PRESET_PHOTOS = [
  { label: 'Profile 1 (Hero)', url: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043691/speech_connect/najiya-pm.jpg' },
  { label: 'Profile 2 (Alt Hero)', url: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043693/speech_connect/najiya-pm-2.jpg' },
  { label: 'About Portrait', url: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043695/speech_connect/najiya-pm-about.jpg' },
  { label: 'Brown Background Portrait', url: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043697/speech_connect/najiya-pm-brown-bg.jpg' },
  { label: 'Clinic Logo', url: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043690/speech_connect/logo.jpg' },
];

const DEFAULT_CONTENT = {
  therapist: {
    name: 'Najiya P M',
    degrees: 'M.Sc. SLP, OPT',
    role: 'Founder & Lead Speech-Language Pathologist',
    crr: 'CRR No: A84512',
    council: 'Rehabilitation Council of India (RCI)',
    photo: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043691/speech_connect/najiya-pm.jpg',
    aboutPhoto: 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043695/speech_connect/najiya-pm-about.jpg',
    email: 'speechconnect.in@gmail.com',
    call: '+91 8281753253',
    whatsapp: '+91 9349412153',
    linkedIn: 'https://www.linkedin.com/in/najiya-p-m-69b349322',
    linkedInName: 'NAJIYA P M',
    bioParagraphs: [
      'Najiya P M is a certified Speech-Language Pathologist holding a Master of Science (M.Sc.) in Speech-Language Pathology and specialized certification in Oral Placement Therapy (OPT). Registered under the Rehabilitation Council of India (CRR No: A84512), she brings extensive clinical expertise and an empathetic, patient-centered approach.',
      'Recognizing the profound impact of timely communication therapy, she established Speech Connect to make premium, evidence-based speech and language therapy accessible to families and individuals anywhere in the world through secure online telepractice.',
      'Her therapy protocols integrate evidence-based clinical practices with practical, engaging home-stimulation plans. Whether helping a toddler find their first words, assisting a school-aged child with stuttering or clarity, or guiding an adult through post-stroke communication recovery, each treatment plan is customized to the person’s unique needs.',
    ],
  },
  hero: {
    badge: 'Certified Telepractice • RCI Registered',
    title: 'Empowering Speech & Language Through Expert Care',
    description:
      'Personalized, evidence-based online speech therapy led by certified specialist Najiya P M (M.Sc. SLP, OPT). Transforming communication for toddlers, children, and adults worldwide.',
    photos: [
      'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043691/speech_connect/najiya-pm.jpg',
      'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043693/speech_connect/najiya-pm-2.jpg',
    ],
  },
  highlights: [
    {
      num: '01',
      title: 'Individualized Care',
      desc: 'Bespoke therapy plans designed around your unique communication strengths and goals.',
    },
    {
      num: '02',
      title: 'Pediatric & Adult',
      desc: 'Specialized interventions across the lifespan — from early childhood to adult rehab.',
    },
    {
      num: '03',
      title: 'Flexible Telepractice',
      desc: 'Live interactive teletherapy sessions from the comfort and privacy of your home.',
    },
    {
      num: '04',
      title: 'Early Intervention',
      desc: 'Evidence-based developmental stimulation targeting essential speech milestones.',
    },
    {
      num: '05',
      title: 'Caregiver Coaching',
      desc: 'Actionable home plans and parental training for continuous daily progress.',
    },
    {
      num: '06',
      title: 'Neurological Rehab',
      desc: 'Rehabilitative clinical protocols for aphasia, dysarthria, apraxia, and stroke recovery.',
    },
  ],
  services: [
    {
      num: '01',
      tag: 'Online Telepractice',
      title: 'Speech Therapy & Online Teletherapy',
      desc: 'Comprehensive evidence-based speech and language therapy delivered via secure interactive telepractice. Individualized for toddlers, children, and adults worldwide.',
    },
    {
      num: '02',
      tag: 'Early Intervention',
      title: 'Early Intervention for Language Delay',
      desc: 'Milestone-focused developmental stimulation for toddlers and young children aged 1–5 years showing receptive, expressive, or developmental speech and language delays.',
    },
    {
      num: '03',
      tag: 'Specialized Motor',
      title: 'Oral Placement Therapy (OPT)',
      desc: 'Certified tactile-proprioceptive therapy building jaw stability, lip closure, and tongue coordination for clear, effortless speech sound mechanics.',
    },
    {
      num: '04',
      tag: 'Fluency Care',
      title: 'Stuttering & Stammering Fluency Therapy',
      desc: 'Evidence-based fluency shaping and stuttering modification techniques reducing speech tension, blocks, and anxiety to achieve smooth conversational flow.',
    },
    {
      num: '05',
      tag: 'Affirming Care',
      title: 'Neurodiversity Affirmation & Autism Spectrum Disorder (ASD)',
      desc: 'Respectful, neurodiversity-affirming communication support honoring unique autistic communication profiles, authentic connection, self-advocacy, and gestalt language processing.',
    },
    {
      num: '06',
      tag: 'Speech Clarity',
      title: 'Misarticulation & Speech Sound Disorders',
      desc: 'Targeted correction for misarticulation, lisping, and sound substitutions (/r/, /s/, /l/, /k/, /th/). Establishing crisp, intelligible articulation in everyday speech.',
    },
    {
      num: '07',
      tag: 'Adult Neuro Rehab',
      title: 'Aphasia Rehabilitation',
      desc: 'Dedicated clinical rehabilitation restoring functional word finding, auditory comprehension, reading, and sentence expression after stroke or brain injury.',
    },
    {
      num: '08',
      tag: 'Stroke Recovery',
      title: 'Stroke Rehabilitation & Dysarthria Care',
      desc: 'Intensive neuroplastic rehabilitation strengthening facial and vocal muscles, clarity, and independent communication for adult stroke survivors.',
    },
    {
      num: '09',
      tag: 'Cognitive Skills',
      title: 'Cognitive Communication Therapy',
      desc: 'Structured exercises to improve attention, memory, executive functioning, and social communication dynamics for academic and career success.',
    },
    {
      num: '10',
      tag: 'Parent Coaching',
      title: 'Caregiver Training & Home Stimulation Plans',
      desc: 'Actionable, evidence-based home routines empowering parents and caregivers to reinforce therapy progress in natural daily conversations.',
    },
  ],
  specializations: [
    'Speech Therapy & Online Teletherapy',
    'Early Intervention for Language Delay',
    'Oral Placement Therapy (OPT)',
    'Stuttering & Fluency Disorders',
    'Neurodiversity Affirmation & Autism (ASD)',
    'Misarticulation & Speech Sound Clarity',
    'Aphasia Rehabilitation',
    'Stroke Rehabilitation & Dysarthria',
    'Cognitive Communication Therapy',
    'Caregiver Coaching & Home Protocols',
  ],
  concernSuggestions: [
    'Language Delay',
    'Speech Therapy Online',
    'Stuttering / Stammering',
    'Oral Placement Therapy (OPT)',
    'Autism Spectrum Disorder',
    'Neurodiversity Affirmation',
    'Misarticulation & Clarity',
    'Aphasia Rehabilitation',
    'Stroke Rehabilitation',
    'Early Intervention (1-5 yrs)',
  ],
  availabilityText: 'Monday – Saturday • Flexible Timings',
};

const getApiUrl = () => {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.'));
  if (isLocal) {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
      let clean = envUrl.replace(/\/$/, '');
      return clean.endsWith('/api') ? clean : `${clean}/api`;
    }
    return 'http://127.0.0.1:5001/api';
  }
  let url = import.meta.env.VITE_API_URL || 'https://najiya.vercel.app';
  url = url.replace(/\/$/, '');
  return url.endsWith('/api') ? url : `${url}/api`;
};

const getClientUrl = () => {
  if (typeof window !== 'undefined') {
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      return 'http://127.0.0.1:6174';
    }
    return 'https://najiya.vercel.app';
  }
  return 'http://127.0.0.1:6174';
};

const API_URL = getApiUrl();
const CLIENT_URL = getClientUrl();

function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // App navigation
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'requests' | 'overview' | 'settings'
  const [contentSection, setContentSection] = useState('therapist'); // 'therapist' | 'hero' | 'services' | 'highlights' | 'tags' | 'availability'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Appointments
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Content state
  const [savedContent, setSavedContent] = useState(DEFAULT_CONTENT);
  const [draftContent, setDraftContent] = useState(DEFAULT_CONTENT);
  const [loadingContent, setLoadingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Server health state
  const [serverHealth, setServerHealth] = useState({
    online: false,
    pingMs: null,
    database: 'checking',
    cloudinary: 'checking',
    cloudinaryCloudName: null,
  });

  // Notifications
  const [toasts, setToasts] = useState([]);

  // Tag inputs helper
  const [newSpecTag, setNewSpecTag] = useState('');
  const [newConcernTag, setNewConcernTag] = useState('');

  // Hidden file input for photo upload
  const fileInputRef = useRef(null);
  const [currentUploadTarget, setCurrentUploadTarget] = useState(null); // 'therapist.photo', 'therapist.aboutPhoto', 'hero.photos'

  function showToast(message, type = 'success') {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  }

  // Check if draft has unsaved changes compared to server
  const isDirty = useMemo(() => {
    return JSON.stringify(draftContent) !== JSON.stringify(savedContent);
  }, [draftContent, savedContent]);

  // Check server health
  async function checkHealth() {
    const startTime = performance.now();
    try {
      const res = await fetch(`${API_URL}/health`);
      const pingMs = Math.round(performance.now() - startTime);
      if (res.ok) {
        const data = await res.json();
        setServerHealth({
          online: true,
          pingMs,
          database: data.database || (data.databaseState === 1 ? 'connected' : 'disconnected'),
          cloudinary: data.cloudinary || 'not_configured',
          cloudinaryCloudName: data.cloudinaryCloudName || null,
        });
      } else {
        setServerHealth({ online: false, pingMs, database: 'error', cloudinary: 'offline', cloudinaryCloudName: null });
      }
    } catch {
      setServerHealth({ online: false, pingMs: null, database: 'disconnected', cloudinary: 'offline', cloudinaryCloudName: null });
    }
  }

  // Load appointments
  async function loadAppointments(manual = false) {
    if (!token) return;
    setLoadingAppointments(true);
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401 || response.status === 403) {
        handleLogout();
        throw new Error('Session expired');
      }
      const data = await response.json();
      setAppointments(Array.isArray(data) ? data : []);
      if (manual) showToast('Appointments refreshed.', 'success');
    } catch (err) {
      if (err.message !== 'Session expired') {
        showToast('Could not load appointment requests.', 'error');
      }
    } finally {
      setLoadingAppointments(false);
    }
  }

  // Load site content
  async function loadContent(manual = false) {
    setLoadingContent(true);
    try {
      const response = await fetch(`${API_URL}/content?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        const merged = {
          ...DEFAULT_CONTENT,
          ...data,
          therapist: { ...DEFAULT_CONTENT.therapist, ...(data.therapist || {}) },
          hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
          highlights: Array.isArray(data.highlights) && data.highlights.length ? data.highlights : DEFAULT_CONTENT.highlights,
          services: Array.isArray(data.services) && data.services.length ? data.services : DEFAULT_CONTENT.services,
          specializations: Array.isArray(data.specializations) && data.specializations.length ? data.specializations : DEFAULT_CONTENT.specializations,
          concernSuggestions: Array.isArray(data.concernSuggestions) && data.concernSuggestions.length ? data.concernSuggestions : DEFAULT_CONTENT.concernSuggestions,
          availabilityText: data.availabilityText || DEFAULT_CONTENT.availabilityText,
        };
        setSavedContent(merged);
        setDraftContent(merged);
        setLastSavedTime(new Date());
        if (manual) showToast('Site content synced from database.', 'success');
      }
    } catch {
      showToast('Could not load site content from server.', 'error');
    } finally {
      setLoadingContent(false);
    }
  }

  // Save content to backend and notify client
  async function saveContent() {
    if (!token) {
      showToast('You must be signed in to save changes.', 'error');
      return;
    }
    setSavingContent(true);
    try {
      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draftContent),
      });

      if (response.status === 401 || response.status === 403) {
        handleLogout();
        showToast('Session expired. Please sign in again.', 'error');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update content');
      }

      const updated = await response.json();
      setSavedContent(draftContent);
      setLastSavedTime(new Date());

      // Broadcast update to open client tabs
      try {
        const ch = new BroadcastChannel('speech_connect_sync');
        ch.postMessage('content_updated');
        ch.close();
      } catch {
        // BroadcastChannel fallback
      }
      localStorage.setItem('speech_connect_content_updated', String(Date.now()));

      showToast('Website content updated! Live on client.', 'success');
    } catch (err) {
      showToast(err.message || 'Error updating content.', 'error');
    } finally {
      setSavingContent(false);
    }
  }

  // Discard draft edits
  function discardChanges() {
    if (window.confirm('Discard all unsaved changes and revert to database version?')) {
      setDraftContent(savedContent);
      showToast('Edits discarded. Reverted to saved content.', 'info');
    }
  }

  // Reset to default template
  function resetToDefaultTemplate() {
    if (window.confirm('Reset ALL content to original factory defaults? You will still need to click "Save Changes" to publish.')) {
      setDraftContent(DEFAULT_CONTENT);
      showToast('Reset to factory template. Click "Save Changes" to persist.', 'info');
    }
  }

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (isDirty && !savingContent) {
          saveContent();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, savingContent, draftContent, token]);

  // Appointment status update
  async function updateAppointmentStatus(id, newStatus) {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }
      if (response.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        showToast(`Request marked as ${newStatus}.`, 'success');
      } else {
        showToast('Failed to update status.', 'error');
      }
    } catch {
      showToast('Connection error.', 'error');
    }
  }

  // Delete appointment
  async function deleteAppointment(id) {
    if (!window.confirm('Delete this appointment inquiry permanently?')) return;
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        showToast('Appointment inquiry deleted.', 'success');
      } else {
        showToast('Failed to delete request.', 'error');
      }
    } catch {
      showToast('Connection error.', 'error');
    }
  }

  // Authentication
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      showToast('Welcome back, Admin.', 'success');
      setLoginUsername('');
      setLoginPassword('');
    } catch (err) {
      setLoginError(err.message || 'Login failed');
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setLoggingIn(false);
    }
  }

  function handleLogout() {
    setToken('');
    localStorage.removeItem('admin_token');
    showToast('Signed out of admin workspace.', 'info');
  }

  // Initial data loading
  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadContent();
    if (token) {
      loadAppointments();
    }
  }, [token]);

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [migratingCloudinary, setMigratingCloudinary] = useState(false);

  // Image Upload Handler (uploads to Cloudinary via backend)
  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB.', 'error');
      return;
    }

    setUploadingImage(true);
    showToast('Uploading image to Cloudinary...', 'info');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result;
      if (!base64 || typeof base64 !== 'string') {
        setUploadingImage(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image: base64,
            folder: 'speech_connect',
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to upload image to Cloudinary');
        }

        const cloudinaryUrl = data.url;

        if (currentUploadTarget === 'therapist.photo') {
          updateTherapistField('photo', cloudinaryUrl);
          showToast('Profile photo uploaded to Cloudinary!', 'success');
        } else if (currentUploadTarget === 'therapist.aboutPhoto') {
          updateTherapistField('aboutPhoto', cloudinaryUrl);
          showToast('About photo uploaded to Cloudinary!', 'success');
        } else if (currentUploadTarget === 'hero.photos') {
          setDraftContent((prev) => ({
            ...prev,
            hero: {
              ...prev.hero,
              photos: [...(prev.hero.photos || []), cloudinaryUrl],
            },
          }));
          showToast('Photo uploaded to Cloudinary and added to Hero Slideshow!', 'success');
        }
      } catch (err) {
        showToast(err.message || 'Cloudinary upload failed.', 'error');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  async function migrateLocalImagesToCloudinary() {
    if (!token) return;
    setMigratingCloudinary(true);
    showToast('Uploading local clinic assets to Cloudinary...', 'info');
    try {
      const res = await fetch(`${API_URL}/cloudinary/migrate-local-images`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Migration failed');
      }
      showToast('All clinic images successfully synced to Cloudinary!', 'success');
      loadContent(true);
      checkHealth();
    } catch (err) {
      showToast(err.message || 'Error migrating to Cloudinary', 'error');
    } finally {
      setMigratingCloudinary(false);
    }
  }

  function triggerUpload(target) {
    setCurrentUploadTarget(target);
    fileInputRef.current?.click();
  }

  // Helper updater functions for draftContent
  function updateTherapistField(field, value) {
    setDraftContent((prev) => ({
      ...prev,
      therapist: {
        ...prev.therapist,
        [field]: value,
      },
    }));
  }

  function updateHeroField(field, value) {
    setDraftContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  }

  // Bio paragraphs
  function updateBioParagraph(index, text) {
    setDraftContent((prev) => {
      const bio = [...(prev.therapist.bioParagraphs || [])];
      bio[index] = text;
      return { ...prev, therapist: { ...prev.therapist, bioParagraphs: bio } };
    });
  }

  function addBioParagraph() {
    setDraftContent((prev) => ({
      ...prev,
      therapist: {
        ...prev.therapist,
        bioParagraphs: [...(prev.therapist.bioParagraphs || []), ''],
      },
    }));
  }

  function removeBioParagraph(index) {
    setDraftContent((prev) => {
      const bio = [...(prev.therapist.bioParagraphs || [])];
      bio.splice(index, 1);
      return { ...prev, therapist: { ...prev.therapist, bioParagraphs: bio } };
    });
  }

  // Hero photos
  function addHeroPhoto(url) {
    if (!url.trim()) return;
    setDraftContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        photos: [...(prev.hero.photos || []), url.trim()],
      },
    }));
  }

  function removeHeroPhoto(index) {
    setDraftContent((prev) => {
      const photos = [...(prev.hero.photos || [])];
      photos.splice(index, 1);
      return { ...prev, hero: { ...prev.hero, photos } };
    });
  }

  // Services
  function updateService(index, field, value) {
    setDraftContent((prev) => {
      const services = [...(prev.services || [])];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  }

  function addService() {
    setDraftContent((prev) => {
      const services = [...(prev.services || [])];
      const nextNum = String(services.length + 1).padStart(2, '0');
      services.push({
        num: nextNum,
        tag: 'New Service',
        title: 'New Clinical Service Title',
        desc: 'Comprehensive clinical description of the assessment and intervention provided.',
      });
      return { ...prev, services };
    });
  }

  function removeService(index) {
    if (!window.confirm('Remove this service from the website?')) return;
    setDraftContent((prev) => {
      const services = [...(prev.services || [])];
      services.splice(index, 1);
      return { ...prev, services };
    });
  }

  // Highlights
  function updateHighlight(index, field, value) {
    setDraftContent((prev) => {
      const highlights = [...(prev.highlights || [])];
      highlights[index] = { ...highlights[index], [field]: value };
      return { ...prev, highlights };
    });
  }

  function addHighlight() {
    setDraftContent((prev) => {
      const highlights = [...(prev.highlights || [])];
      const nextNum = String(highlights.length + 1).padStart(2, '0');
      highlights.push({
        num: nextNum,
        title: 'New Clinical Focus',
        desc: 'Description of key therapeutic pillar or treatment methodology.',
      });
      return { ...prev, highlights };
    });
  }

  function removeHighlight(index) {
    setDraftContent((prev) => {
      const highlights = [...(prev.highlights || [])];
      highlights.splice(index, 1);
      return { ...prev, highlights };
    });
  }

  // Specialization tags
  function addSpecializationTag() {
    if (!newSpecTag.trim()) return;
    if ((draftContent.specializations || []).includes(newSpecTag.trim())) {
      showToast('Specialization tag already exists.', 'info');
      return;
    }
    setDraftContent((prev) => ({
      ...prev,
      specializations: [...(prev.specializations || []), newSpecTag.trim()],
    }));
    setNewSpecTag('');
  }

  function removeSpecializationTag(tag) {
    setDraftContent((prev) => ({
      ...prev,
      specializations: (prev.specializations || []).filter((t) => t !== tag),
    }));
  }

  // Concern suggestions tags
  function addConcernTag() {
    if (!newConcernTag.trim()) return;
    if ((draftContent.concernSuggestions || []).includes(newConcernTag.trim())) {
      showToast('Concern chip already exists.', 'info');
      return;
    }
    setDraftContent((prev) => ({
      ...prev,
      concernSuggestions: [...(prev.concernSuggestions || []), newConcernTag.trim()],
    }));
    setNewConcernTag('');
  }

  function removeConcernTag(tag) {
    setDraftContent((prev) => ({
      ...prev,
      concernSuggestions: (prev.concernSuggestions || []).filter((t) => t !== tag),
    }));
  }

  // Stats calculation
  const totalCount = appointments.length;
  const newCount = appointments.filter((app) => (app.status || 'new') === 'new').length;
  const contactedCount = appointments.filter((app) => app.status === 'contacted').length;
  const completedCount = appointments.filter((app) => app.status === 'completed').length;

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesStatus =
        statusFilter === 'all' || (app.status || 'new') === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (app.name && app.name.toLowerCase().includes(q)) ||
        (app.phone && app.phone.toLowerCase().includes(q)) ||
        (app.concerns && app.concerns.toLowerCase().includes(q)) ||
        (app.service && app.service.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [appointments, statusFilter, searchQuery]);

  // LOGIN SCREEN (Minimalist)
  if (!token) {
    return (
      <main className="min-login-root">
        <div className="min-login-card">
          <div className="min-login-brand">
            <img src={CLINIC_LOGO_URL} alt="Speech Connect Logo" className="login-logo-img" />
            <span className="brand-name">Speech Connect</span>
            <span className="brand-tag">Admin</span>
          </div>

          <div className="min-login-header">
            <h1>Workspace Login</h1>
            <p>Access client website controls, inquiries, and content synchronization.</p>
          </div>

          {loginError && <div className="min-alert error">{loginError}</div>}

          <form onSubmit={handleLogin} className="min-form">
            <div className="input-group">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                autoComplete="username"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin"
                disabled={loggingIn}
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loggingIn}
              />
            </div>

            <button type="submit" className="min-btn primary full" disabled={loggingIn}>
              {loggingIn ? (
                <>
                  <span className="spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <div className="min-login-footer">
            <span className="status-pill">
              <span className={`status-dot ${serverHealth.online ? 'online' : 'offline'}`} />
              {serverHealth.online ? 'Server Online' : 'Connecting to Server...'}
            </span>
          </div>
        </div>

        <div className="toast-rack" aria-live="polite">
          {toasts.map((toast) => (
            <div key={toast.id} className={`min-toast ${toast.type}`}>
              {toast.message}
            </div>
          ))}
        </div>
      </main>
    );
  }

  // MAIN ADMIN DASHBOARD (Minimalist Modern Theme)
  return (
    <div className="min-app-root">
      {/* Hidden file input for direct photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Mobile Header Bar */}
      <header className="min-mobile-nav">
        <div className="mobile-nav-left">
          <button
            type="button"
            className={`admin-hamburger-btn ${sidebarOpen ? 'open' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={sidebarOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <div className="min-brand-inline">
            <img src={CLINIC_LOGO_URL} alt="Speech Connect Logo" className="mobile-logo-img" />
            <span className="brand-text">Speech Connect</span>
          </div>
        </div>

        <div className="mobile-nav-right">
          {activeTab === 'content' && isDirty && (
            <button
              type="button"
              className="min-btn primary sm mobile-quick-save"
              onClick={saveContent}
              disabled={savingContent}
              title="Save changes to live website"
            >
              {savingContent ? '...' : 'Save'}
            </button>
          )}

          <a
            href={CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-btn ghost sm mobile-site-link"
            title="Open patient-facing website"
          >
            <span>Site</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <div
        className={`min-drawer-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`min-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-badge">
            <img src={CLINIC_LOGO_URL} alt="Speech Connect Logo" className="sidebar-logo-img" />
            <span className="brand-title">Speech Connect</span>
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
          <span className="badge-sub">Admin Console</span>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('content');
              setSidebarOpen(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Site Content</span>
            {isDirty && <span className="dirty-dot" title="Unsaved changes" />}
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('requests');
              setSidebarOpen(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Inquiries</span>
            {newCount > 0 && <span className="pill-counter">{newCount}</span>}
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('overview');
              setSidebarOpen(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            <span>Overview & Stats</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              setSidebarOpen(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>System & Sync</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="health-indicator">
            <span className={`status-dot ${serverHealth.online ? 'online' : 'offline'}`} />
            <div className="health-meta">
              <span className="health-label">
                {serverHealth.online ? 'API Online' : 'API Disconnected'}
              </span>
              <span className="health-sub">
                {serverHealth.pingMs !== null ? `${serverHealth.pingMs}ms latency` : 'offline'}
              </span>
            </div>
          </div>

          <div className="health-indicator" style={{ marginTop: '0.4rem' }}>
            <span className={`status-dot ${serverHealth.cloudinary === 'connected' ? 'online' : 'warn'}`} />
            <div className="health-meta">
              <span className="health-label">
                {serverHealth.cloudinary === 'connected' ? 'Cloudinary CDN' : 'Cloudinary Offline'}
              </span>
              <span className="health-sub">
                {serverHealth.cloudinaryCloudName ? `cloud: ${serverHealth.cloudinaryCloudName}` : 'not configured'}
              </span>
            </div>
          </div>

          <div className="user-profile-strip">
            <div className="avatar-chip">A</div>
            <div className="user-meta">
              <span className="user-name">Administrator</span>
              <span className="user-sub">Lead SLP</span>
            </div>
            <button
              type="button"
              className="icon-btn-subtle"
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign out"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="min-main-shell">
        {/* Top Header Bar */}
        <header className="min-topbar">
          <div className="topbar-left">
            <span className="crumb-root">Portal</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">
              {activeTab === 'content' && 'Site Content Manager'}
              {activeTab === 'requests' && 'Patient Inquiries'}
              {activeTab === 'overview' && 'System Overview'}
              {activeTab === 'settings' && 'System Settings'}
            </span>
          </div>

          <div className="topbar-actions">
            {activeTab === 'content' && isDirty && (
              <span className="unsaved-badge">
                <span className="pulsing-amber-dot" />
                <span>Unsaved edits</span>
              </span>
            )}

            {activeTab === 'content' && (
              <button
                type="button"
                className="min-btn primary sm"
                onClick={saveContent}
                disabled={savingContent || !isDirty}
                title="Save changes to live website (Ctrl+S)"
              >
                {savingContent ? (
                  <>
                    <span className="spinner sm" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Save to Live Site</span>
                  </>
                )}
              </button>
            )}

            <a
              href={CLIENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-btn secondary sm"
              title="Preview changes on client website in a new tab"
            >
              <span>View Site</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </header>

        {/* SECTION 1: CONTENT MANAGER */}
        {activeTab === 'content' && (
          <main className="min-content-area">
            {/* Mobile Section Switcher */}
            <div className="mobile-section-picker">
              <label htmlFor="mobile-sec-select" className="mobile-picker-label">Section:</label>
              <select
                id="mobile-sec-select"
                className="mobile-picker-select"
                value={contentSection}
                onChange={(e) => setContentSection(e.target.value)}
              >
                <option value="therapist">👤 Therapist Profile</option>
                <option value="hero">🌟 Hero & Slideshow</option>
                <option value="services">🩺 Services ({draftContent.services?.length || 0})</option>
                <option value="highlights">✨ Highlights ({draftContent.highlights?.length || 0})</option>
                <option value="tags">🏷️ Clinical Tags</option>
                <option value="availability">🕒 Availability</option>
              </select>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="section-tabs-bar">
              <button
                type="button"
                className={`tab-btn ${contentSection === 'therapist' ? 'active' : ''}`}
                onClick={() => setContentSection('therapist')}
              >
                Therapist Profile
              </button>
              <button
                type="button"
                className={`tab-btn ${contentSection === 'hero' ? 'active' : ''}`}
                onClick={() => setContentSection('hero')}
              >
                Hero & Slideshow
              </button>
              <button
                type="button"
                className={`tab-btn ${contentSection === 'services' ? 'active' : ''}`}
                onClick={() => setContentSection('services')}
              >
                Services ({draftContent.services?.length || 0})
              </button>
              <button
                type="button"
                className={`tab-btn ${contentSection === 'highlights' ? 'active' : ''}`}
                onClick={() => setContentSection('highlights')}
              >
                Key Highlights ({draftContent.highlights?.length || 0})
              </button>
              <button
                type="button"
                className={`tab-btn ${contentSection === 'tags' ? 'active' : ''}`}
                onClick={() => setContentSection('tags')}
              >
                Clinical Tags & Concerns
              </button>
              <button
                type="button"
                className={`tab-btn ${contentSection === 'availability' ? 'active' : ''}`}
                onClick={() => setContentSection('availability')}
              >
                Availability & Timings
              </button>
            </div>

            {/* TAB: THERAPIST PROFILE */}
            {contentSection === 'therapist' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Lead Therapist Profile</h2>
                    <p>Update credentials, contact coordinates, portrait photos, and clinical biography.</p>
                  </div>
                </div>

                <div className="grid-two-col">
                  {/* Basic Credentials Card */}
                  <div className="min-card">
                    <div className="card-title">Professional Identity</div>

                    <div className="input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={draftContent.therapist?.name || ''}
                        onChange={(e) => updateTherapistField('name', e.target.value)}
                        placeholder="Najiya P M"
                      />
                    </div>

                    <div className="input-group">
                      <label>Qualifications & Degrees</label>
                      <input
                        type="text"
                        value={draftContent.therapist?.degrees || ''}
                        onChange={(e) => updateTherapistField('degrees', e.target.value)}
                        placeholder="M.Sc. SLP, OPT"
                      />
                    </div>

                    <div className="input-group">
                      <label>Official Role / Title</label>
                      <input
                        type="text"
                        value={draftContent.therapist?.role || ''}
                        onChange={(e) => updateTherapistField('role', e.target.value)}
                        placeholder="Founder & Lead Speech-Language Pathologist"
                      />
                    </div>

                    <div className="grid-row-two">
                      <div className="input-group">
                        <label>CRR Registration No</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.crr || ''}
                          onChange={(e) => updateTherapistField('crr', e.target.value)}
                          placeholder="CRR No: A84512"
                        />
                      </div>
                      <div className="input-group">
                        <label>Governing Council</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.council || ''}
                          onChange={(e) => updateTherapistField('council', e.target.value)}
                          placeholder="Rehabilitation Council of India (RCI)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Channels Card */}
                  <div className="min-card">
                    <div className="card-title">Communication & Channels</div>

                    <div className="input-group">
                      <label>Official Email</label>
                      <input
                        type="email"
                        value={draftContent.therapist?.email || ''}
                        onChange={(e) => updateTherapistField('email', e.target.value)}
                        placeholder="speechconnect.in@gmail.com"
                      />
                    </div>

                    <div className="grid-row-two">
                      <div className="input-group">
                        <label>Direct Phone (Call)</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.call || ''}
                          onChange={(e) => updateTherapistField('call', e.target.value)}
                          placeholder="+91 8281753253"
                        />
                      </div>
                      <div className="input-group">
                        <label>WhatsApp Number</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.whatsapp || ''}
                          onChange={(e) => updateTherapistField('whatsapp', e.target.value)}
                          placeholder="+91 9349412153"
                        />
                      </div>
                    </div>

                    <div className="grid-row-two">
                      <div className="input-group">
                        <label>LinkedIn Profile URL</label>
                        <input
                          type="url"
                          value={draftContent.therapist?.linkedIn || ''}
                          onChange={(e) => updateTherapistField('linkedIn', e.target.value)}
                          placeholder="https://www.linkedin.com/in/..."
                        />
                      </div>
                      <div className="input-group">
                        <label>LinkedIn Display Name</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.linkedInName || ''}
                          onChange={(e) => updateTherapistField('linkedInName', e.target.value)}
                          placeholder="NAJIYA P M"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portrait Photos Card */}
                <div className="min-card mt-lg">
                  <div className="card-title">Therapist Portrait Photos</div>
                  <p className="card-desc">
                    Specify image URLs or choose from available clinic library presets. You can also upload a local image directly.
                  </p>

                  <div className="grid-two-col">
                    {/* Main Portrait */}
                    <div className="photo-editor-box">
                      <div className="photo-preview-wrap">
                        {draftContent.therapist?.photo ? (
                          <img
                            src={draftContent.therapist.photo}
                            alt="Main portrait preview"
                            className="preview-img"
                          />
                        ) : (
                          <div className="photo-placeholder">No photo set</div>
                        )}
                      </div>
                      <div className="photo-inputs">
                        <label>Main Portrait Photo URL</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.photo || ''}
                          onChange={(e) => updateTherapistField('photo', e.target.value)}
                          placeholder="/images/najiya-pm.jpg"
                        />
                        <div className="photo-action-row">
                          <button
                            type="button"
                            className="min-btn secondary sm"
                            onClick={() => triggerUpload('therapist.photo')}
                          >
                            Upload Local Photo
                          </button>
                        </div>
                        <div className="preset-chips">
                          <span className="preset-label">Presets:</span>
                          {PRESET_PHOTOS.map((p) => (
                            <button
                              key={p.url}
                              type="button"
                              className="preset-chip"
                              onClick={() => updateTherapistField('photo', p.url)}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* About Section Portrait */}
                    <div className="photo-editor-box">
                      <div className="photo-preview-wrap">
                        {draftContent.therapist?.aboutPhoto ? (
                          <img
                            src={draftContent.therapist.aboutPhoto}
                            alt="About portrait preview"
                            className="preview-img"
                          />
                        ) : (
                          <div className="photo-placeholder">No about photo</div>
                        )}
                      </div>
                      <div className="photo-inputs">
                        <label>About Section Photo URL</label>
                        <input
                          type="text"
                          value={draftContent.therapist?.aboutPhoto || ''}
                          onChange={(e) => updateTherapistField('aboutPhoto', e.target.value)}
                          placeholder="/images/najiya-pm-about.jpg"
                        />
                        <div className="photo-action-row">
                          <button
                            type="button"
                            className="min-btn secondary sm"
                            onClick={() => triggerUpload('therapist.aboutPhoto')}
                          >
                            Upload Local Photo
                          </button>
                        </div>
                        <div className="preset-chips">
                          <span className="preset-label">Presets:</span>
                          {PRESET_PHOTOS.map((p) => (
                            <button
                              key={p.url}
                              type="button"
                              className="preset-chip"
                              onClick={() => updateTherapistField('aboutPhoto', p.url)}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biography Paragraphs Card */}
                <div className="min-card mt-lg">
                  <div className="card-head-row">
                    <div>
                      <div className="card-title">Clinical Biography Paragraphs</div>
                      <p className="card-desc">Paragraphs displayed in the "About" section of the website.</p>
                    </div>
                    <button type="button" className="min-btn secondary sm" onClick={addBioParagraph}>
                      + Add Paragraph
                    </button>
                  </div>

                  <div className="paragraphs-list">
                    {(draftContent.therapist?.bioParagraphs || []).map((paragraph, idx) => (
                      <div className="paragraph-row" key={idx}>
                        <div className="paragraph-num">P{idx + 1}</div>
                        <textarea
                          rows="4"
                          value={paragraph}
                          onChange={(e) => updateBioParagraph(idx, e.target.value)}
                          placeholder="Enter paragraph text..."
                        />
                        <button
                          type="button"
                          className="icon-btn-danger"
                          onClick={() => removeBioParagraph(idx)}
                          title="Delete paragraph"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HERO & SLIDESHOW */}
            {contentSection === 'hero' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Hero Banner & Slideshow</h2>
                    <p>Customize the landing headline, intro statement, and looping slideshow gallery.</p>
                  </div>
                </div>

                <div className="min-card">
                  <div className="card-title">Hero Copy & Headlines</div>

                  <div className="input-group">
                    <label>Eyebrow Badge Text</label>
                    <input
                      type="text"
                      value={draftContent.hero?.badge || ''}
                      onChange={(e) => updateHeroField('badge', e.target.value)}
                      placeholder="Certified Telepractice • RCI Registered"
                    />
                  </div>

                  <div className="input-group">
                    <label>Main Headline</label>
                    <input
                      type="text"
                      value={draftContent.hero?.title || ''}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      placeholder="Empowering Speech & Language Through Expert Care"
                    />
                  </div>

                  <div className="input-group">
                    <label>Hero Description / Subtitle</label>
                    <textarea
                      rows="3"
                      value={draftContent.hero?.description || ''}
                      onChange={(e) => updateHeroField('description', e.target.value)}
                      placeholder="Personalized, evidence-based online speech therapy..."
                    />
                  </div>
                </div>

                {/* Hero Slideshow Images */}
                <div className="min-card mt-lg">
                  <div className="card-head-row">
                    <div>
                      <div className="card-title">Hero Slideshow Carousel Images</div>
                      <p className="card-desc">
                        These images loop smoothly on the homepage showcase card.
                      </p>
                    </div>
                    <div className="flex-row-gap">
                      <button
                        type="button"
                        className="min-btn secondary sm"
                        onClick={() => triggerUpload('hero.photos')}
                      >
                        + Upload Photo
                      </button>
                      <button
                        type="button"
                        className="min-btn secondary sm"
                        onClick={() => {
                          const url = prompt('Enter photo image URL or path:');
                          if (url) addHeroPhoto(url);
                        }}
                      >
                        + Add Photo URL
                      </button>
                    </div>
                  </div>

                  <div className="hero-photos-grid">
                    {(draftContent.hero?.photos || []).map((photoUrl, idx) => (
                      <div className="hero-photo-card" key={idx}>
                        <div className="hero-photo-thumb">
                          <img src={photoUrl} alt={`Slide ${idx + 1}`} />
                          <span className="slide-num-badge">Slide {idx + 1}</span>
                          <button
                            type="button"
                            className="thumb-delete-btn"
                            onClick={() => removeHeroPhoto(idx)}
                            title="Remove slide"
                          >
                            ×
                          </button>
                        </div>
                        <div className="hero-photo-meta">
                          <input
                            type="text"
                            value={photoUrl}
                            onChange={(e) => {
                              const updated = [...(draftContent.hero?.photos || [])];
                              updated[idx] = e.target.value;
                              updateHeroField('photos', updated);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="quick-add-presets">
                    <span className="preset-label">Add from Library:</span>
                    {PRESET_PHOTOS.map((p) => (
                      <button
                        key={p.url}
                        type="button"
                        className="preset-chip"
                        onClick={() => addHeroPhoto(p.url)}
                      >
                        + {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CLINICAL SERVICES */}
            {contentSection === 'services' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Clinical Services Catalog</h2>
                    <p>Manage all clinical service offerings shown on the Services page and booking dropdowns.</p>
                  </div>
                  <button type="button" className="min-btn primary sm" onClick={addService}>
                    + Add New Service
                  </button>
                </div>

                <div className="services-admin-grid">
                  {(draftContent.services || []).map((service, idx) => (
                    <div className="service-admin-card" key={idx}>
                      <div className="service-card-header">
                        <div className="service-index-badge">{service.num || String(idx + 1).padStart(2, '0')}</div>
                        <input
                          type="text"
                          className="service-tag-input"
                          value={service.tag || ''}
                          onChange={(e) => updateService(idx, 'tag', e.target.value)}
                          placeholder="Category Tag (e.g. Assessment)"
                        />
                        <button
                          type="button"
                          className="icon-btn-danger sm"
                          onClick={() => removeService(idx)}
                          title="Delete service"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>

                      <div className="input-group">
                        <label>Service Title</label>
                        <input
                          type="text"
                          value={service.title || ''}
                          onChange={(e) => updateService(idx, 'title', e.target.value)}
                          placeholder="Service Title"
                        />
                      </div>

                      <div className="input-group">
                        <label>Description</label>
                        <textarea
                          rows="3"
                          value={service.desc || ''}
                          onChange={(e) => updateService(idx, 'desc', e.target.value)}
                          placeholder="Detailed clinical scope and therapy process..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: KEY HIGHLIGHTS */}
            {contentSection === 'highlights' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Key Approach Highlights</h2>
                    <p>Core therapeutic pillars displayed on the homepage grid.</p>
                  </div>
                  <button type="button" className="min-btn primary sm" onClick={addHighlight}>
                    + Add Highlight Pillar
                  </button>
                </div>

                <div className="highlights-admin-grid">
                  {(draftContent.highlights || []).map((item, idx) => (
                    <div className="highlight-admin-card" key={idx}>
                      <div className="highlight-card-head">
                        <input
                          type="text"
                          className="highlight-num-input"
                          value={item.num || String(idx + 1).padStart(2, '0')}
                          onChange={(e) => updateHighlight(idx, 'num', e.target.value)}
                          placeholder="01"
                        />
                        <button
                          type="button"
                          className="icon-btn-danger sm"
                          onClick={() => removeHighlight(idx)}
                          title="Delete highlight"
                        >
                          ×
                        </button>
                      </div>

                      <div className="input-group">
                        <label>Pillar Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => updateHighlight(idx, 'title', e.target.value)}
                          placeholder="Individualized Care"
                        />
                      </div>

                      <div className="input-group">
                        <label>Description</label>
                        <textarea
                          rows="3"
                          value={item.desc || ''}
                          onChange={(e) => updateHighlight(idx, 'desc', e.target.value)}
                          placeholder="Description of clinical approach..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TAGS & CLINICAL CONCERNS */}
            {contentSection === 'tags' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Clinical Tags & Booking Suggestions</h2>
                    <p>Manage the specialization pills and interactive concern tags that patients tap on booking forms.</p>
                  </div>
                </div>

                <div className="grid-two-col">
                  {/* Specializations Card */}
                  <div className="min-card">
                    <div className="card-title">Areas of Clinical Specialization</div>
                    <p className="card-desc">Shown on the About page under clinical expertise.</p>

                    <div className="tag-input-row">
                      <input
                        type="text"
                        value={newSpecTag}
                        onChange={(e) => setNewSpecTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecializationTag())}
                        placeholder="Add new specialization..."
                      />
                      <button type="button" className="min-btn secondary sm" onClick={addSpecializationTag}>
                        Add
                      </button>
                    </div>

                    <div className="tags-interactive-rack">
                      {(draftContent.specializations || []).map((tag) => (
                        <span className="interactive-tag" key={tag}>
                          <span>{tag}</span>
                          <button
                            type="button"
                            className="tag-remove-btn"
                            onClick={() => removeSpecializationTag(tag)}
                            title={`Remove ${tag}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking Concern Suggestions Card */}
                  <div className="min-card">
                    <div className="card-title">Booking Form Quick Concern Chips</div>
                    <p className="card-desc">Clickable chips displayed for patients when booking an appointment.</p>

                    <div className="tag-input-row">
                      <input
                        type="text"
                        value={newConcernTag}
                        onChange={(e) => setNewConcernTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addConcernTag())}
                        placeholder="Add quick concern chip..."
                      />
                      <button type="button" className="min-btn secondary sm" onClick={addConcernTag}>
                        Add
                      </button>
                    </div>

                    <div className="tags-interactive-rack">
                      {(draftContent.concernSuggestions || []).map((tag) => (
                        <span className="interactive-tag concern" key={tag}>
                          <span>{tag}</span>
                          <button
                            type="button"
                            className="tag-remove-btn"
                            onClick={() => removeConcernTag(tag)}
                            title={`Remove ${tag}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: AVAILABILITY & HOURS */}
            {contentSection === 'availability' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Operating Hours & Availability</h2>
                    <p>Information shown in the contact section and consultation booking badges.</p>
                  </div>
                </div>

                <div className="min-card max-w-md">
                  <div className="card-title">Consultation Schedule Banner</div>

                  <div className="input-group">
                    <label>Platform Availability Text</label>
                    <input
                      type="text"
                      value={draftContent.availabilityText || ''}
                      onChange={(e) =>
                        setDraftContent((prev) => ({ ...prev, availabilityText: e.target.value }))
                      }
                      placeholder="Monday – Saturday • Flexible Timings"
                    />
                    <small className="field-hint">
                      This text appears as a highlight pill on the Contact page and in footer notices.
                    </small>
                  </div>
                </div>
              </div>
            )}

            {/* Sticky Unsaved Changes Floating Bar */}
            {isDirty && (
              <div className="unsaved-dock-bar">
                <div className="dock-meta">
                  <span className="pulsing-amber-dot" />
                  <strong>You have unsaved changes</strong>
                  <span>Press Ctrl+S or click Save to update live website.</span>
                </div>
                <div className="dock-actions">
                  <button type="button" className="min-btn ghost sm" onClick={discardChanges}>
                    Discard Edits
                  </button>
                  <button
                    type="button"
                    className="min-btn primary sm"
                    onClick={saveContent}
                    disabled={savingContent}
                  >
                    {savingContent ? 'Publishing...' : 'Save & Publish Live'}
                  </button>
                </div>
              </div>
            )}
          </main>
        )}

        {/* SECTION 2: APPOINTMENTS & INQUIRIES */}
        {activeTab === 'requests' && (
          <main className="min-content-area">
            <div className="pane-header">
              <div>
                <h2>Patient Inquiries & Appointments</h2>
                <p>Track booking consultations, patient contact details, and follow-up status.</p>
              </div>
              <button
                type="button"
                className="min-btn secondary sm"
                onClick={() => loadAppointments(true)}
                disabled={loadingAppointments}
              >
                {loadingAppointments ? 'Refreshing...' : 'Refresh Inquiries'}
              </button>
            </div>

            {/* Controls Bar: Filter tabs + Search */}
            <div className="inquiry-controls-bar">
              <div className="filter-pill-group">
                <button
                  type="button"
                  className={`pill-tab ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  All ({totalCount})
                </button>
                <button
                  type="button"
                  className={`pill-tab ${statusFilter === 'new' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('new')}
                >
                  New ({newCount})
                </button>
                <button
                  type="button"
                  className={`pill-tab ${statusFilter === 'contacted' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('contacted')}
                >
                  Contacted ({contactedCount})
                </button>
                <button
                  type="button"
                  className={`pill-tab ${statusFilter === 'completed' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('completed')}
                >
                  Completed ({completedCount})
                </button>
              </div>

              <div className="search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by patient name, phone, concern..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button type="button" className="clear-btn" onClick={() => setSearchQuery('')}>
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Inquiries Grid */}
            <div className="inquiries-stack">
              {filteredAppointments.length === 0 ? (
                <div className="empty-inquiries-card">
                  <div className="empty-icon">📭</div>
                  <h3>No appointment inquiries found</h3>
                  <p>
                    {searchQuery
                      ? 'No inquiries match your search filter.'
                      : 'New inquiries submitted via the client booking form will appear here.'}
                  </p>
                </div>
              ) : (
                filteredAppointments.map((app) => {
                  const cleanPhone = (app.phone || '').replace(/\D/g, '');
                  const waGreeting = encodeURIComponent(
                    `Hello ${app.name}, this is Speech Connect regarding your Speech Therapy inquiry.`
                  );
                  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${waGreeting}` : null;

                  return (
                    <article className="inquiry-card" key={app.id}>
                      <div className="inquiry-head">
                        <div className="patient-meta">
                          <h3 className="patient-name">{app.name}</h3>
                          <span className={`status-badge ${(app.status || 'new').toLowerCase()}`}>
                            {app.status || 'new'}
                          </span>
                        </div>
                        <span className="timestamp">
                          {app.createdAt ? new Date(app.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Recent'}
                        </span>
                      </div>

                      <div className="inquiry-body-grid">
                        <div className="meta-col">
                          <span className="field-lbl">Phone</span>
                          <span className="field-val highlight">{app.phone || '—'}</span>
                        </div>
                        <div className="meta-col">
                          <span className="field-lbl">Email</span>
                          <span className="field-val">{app.email || '—'}</span>
                        </div>
                        <div className="meta-col">
                          <span className="field-lbl">Age / Gender</span>
                          <span className="field-val">
                            {[app.age && `${app.age} yrs`, app.gender].filter(Boolean).join(' • ') || 'Not shared'}
                          </span>
                        </div>
                        <div className="meta-col">
                          <span className="field-lbl">Service</span>
                          <span className="field-val">{app.service || 'Consultation'}</span>
                        </div>
                        <div className="meta-col full-width">
                          <span className="field-lbl">Reported Concerns / Notes</span>
                          <p className="concerns-text">{app.concerns || app.message || 'No details provided.'}</p>
                        </div>
                      </div>

                      <div className="inquiry-actions-bar">
                        <div className="direct-contact-group">
                          {cleanPhone && (
                            <>
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-btn sm whatsapp-btn"
                                title="Open WhatsApp chat with patient"
                              >
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`tel:${cleanPhone}`}
                                className="min-btn sm secondary"
                                title="Call patient directly"
                              >
                                <span>Call</span>
                              </a>
                            </>
                          )}
                          {app.email && (
                            <a
                              href={`mailto:${app.email}?subject=Speech%20Connect%20Consultation%20Inquiry&body=Hi%20${encodeURIComponent(app.name || 'there')},`}
                              className="min-btn sm ghost"
                              title="Send email to patient"
                            >
                              <span>Email</span>
                            </a>
                          )}
                        </div>

                        <div className="status-change-group">
                          {(app.status || 'new') === 'new' && (
                            <button
                              type="button"
                              className="min-btn sm secondary"
                              onClick={() => updateAppointmentStatus(app.id, 'contacted')}
                            >
                              Mark Contacted
                            </button>
                          )}

                          {(app.status || 'new') === 'contacted' && (
                            <button
                              type="button"
                              className="min-btn sm primary"
                              onClick={() => updateAppointmentStatus(app.id, 'completed')}
                            >
                              Mark Completed
                            </button>
                          )}

                          {(app.status || 'new') === 'completed' && (
                            <button
                              type="button"
                              className="min-btn sm ghost"
                              onClick={() => updateAppointmentStatus(app.id, 'new')}
                            >
                              Reopen Inquiry
                            </button>
                          )}

                          <button
                            type="button"
                            className="icon-btn-danger sm"
                            onClick={() => deleteAppointment(app.id)}
                            title="Delete this inquiry"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </main>
        )}

        {/* SECTION 3: SYSTEM OVERVIEW & METRICS */}
        {activeTab === 'overview' && (
          <main className="min-content-area">
            <div className="pane-header">
              <div>
                <h2>System Overview & Metrics</h2>
                <p>High-level summary of patient inquiries, sync status, and database connectivity.</p>
              </div>
            </div>

            <div className="stats-kpi-grid">
              <div className="kpi-card">
                <span className="kpi-title">Total Inquiries</span>
                <span className="kpi-value">{totalCount}</span>
                <span className="kpi-note">Received via website</span>
              </div>

              <div className="kpi-card highlight-amber">
                <span className="kpi-title">New Inquiries</span>
                <span className="kpi-value">{newCount}</span>
                <span className="kpi-note">Pending therapist review</span>
              </div>

              <div className="kpi-card highlight-emerald">
                <span className="kpi-title">Contacted</span>
                <span className="kpi-value">{contactedCount}</span>
                <span className="kpi-note">Initial follow-up initiated</span>
              </div>

              <div className="kpi-card">
                <span className="kpi-title">Completed Consultations</span>
                <span className="kpi-value">{completedCount}</span>
                <span className="kpi-note">Successfully addressed</span>
              </div>
            </div>

            <div className="grid-two-col mt-lg">
              <div className="min-card">
                <div className="card-title">Backend Connectivity</div>
                <div className="system-status-list">
                  <div className="status-row">
                    <span>API Endpoint</span>
                    <code>{API_URL}</code>
                  </div>
                  <div className="status-row">
                    <span>API Latency</span>
                    <span>{serverHealth.pingMs !== null ? `${serverHealth.pingMs} ms` : 'Offline'}</span>
                  </div>
                  <div className="status-row">
                    <span>MongoDB Database</span>
                    <span className={`pill-status ${serverHealth.database === 'connected' ? 'ok' : 'err'}`}>
                      {serverHealth.database}
                    </span>
                  </div>
                  <div className="status-row">
                    <span>Last Saved Sync</span>
                    <span>{lastSavedTime ? lastSavedTime.toLocaleTimeString() : 'Not updated this session'}</span>
                  </div>
                </div>
              </div>

              <div className="min-card">
                <div className="card-title">Quick Actions</div>
                <div className="quick-actions-col">
                  <button
                    type="button"
                    className="min-btn secondary full"
                    onClick={() => {
                      loadContent(true);
                      loadAppointments(true);
                      checkHealth();
                    }}
                  >
                    Sync All Data from Server
                  </button>

                  <a
                    href={CLIENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-btn primary full"
                  >
                    Open Live Client Site ↗
                  </a>

                  <button
                    type="button"
                    className="min-btn ghost full"
                    onClick={resetToDefaultTemplate}
                  >
                    Reset Content to Factory Template
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* SECTION 4: SETTINGS & HEALTH */}
        {activeTab === 'settings' && (
          <main className="min-content-area">
            <div className="pane-header">
              <div>
                <h2>System & Sync Settings</h2>
                <p>Manage connection parameters, reset content defaults, and inspect runtime health.</p>
              </div>
            </div>

            <div className="min-card max-w-lg">
              <div className="card-title">Database & Backend Diagnostic</div>

              <div className="diagnostic-block">
                <div className="diag-row">
                  <span>Server Connection</span>
                  <strong>{serverHealth.online ? 'Online (200 OK)' : 'Offline / Error'}</strong>
                </div>
                <div className="diag-row">
                  <span>MongoDB Atlas Cluster</span>
                  <strong>{serverHealth.database}</strong>
                </div>
                <div className="diag-row">
                  <span>API Target URL</span>
                  <code>{API_URL}</code>
                </div>
                <div className="diag-row">
                  <span>Client Website URL</span>
                  <code>{CLIENT_URL}</code>
                </div>
                <div className="diag-row">
                  <span>Cloudinary Media CDN</span>
                  <span className={`pill-status ${serverHealth.cloudinary === 'connected' ? 'ok' : 'err'}`}>
                    {serverHealth.cloudinary === 'connected' ? `Connected (${serverHealth.cloudinaryCloudName})` : 'Not Configured'}
                  </span>
                </div>
              </div>

              <div className="card-divider" />

              <div className="card-title">Cloudinary Media Library</div>
              <p className="card-desc">
                Sync and host clinic portrait assets on your Cloudinary CDN. Photos uploaded through the editor are automatically optimized and served via high-speed Cloudinary CDN.
              </p>

              <div className="flex-row-gap mt-md">
                <button
                  type="button"
                  className="min-btn secondary sm"
                  onClick={migrateLocalImagesToCloudinary}
                  disabled={migratingCloudinary}
                >
                  {migratingCloudinary ? 'Syncing to Cloudinary...' : 'Re-sync Local Assets to Cloudinary'}
                </button>
              </div>

              <div className="card-divider" />

              <div className="card-title">Content Backup & Restore</div>
              <p className="card-desc">
                You can download the current website content as a JSON file, or restore factory defaults if you ever need to reset.
              </p>

              <div className="flex-row-gap mt-md">
                <button
                  type="button"
                  className="min-btn secondary sm"
                  onClick={() => {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftContent, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', `speech_connect_content_${Date.now()}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showToast('Website content exported as JSON.', 'success');
                  }}
                >
                  Export Content Backup (.json)
                </button>

                <button
                  type="button"
                  className="min-btn ghost sm danger-text"
                  onClick={resetToDefaultTemplate}
                >
                  Restore Factory Defaults
                </button>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Floating Toast Notification Rack */}
      <div className="toast-rack" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`min-toast ${toast.type}`}>
            {toast.type === 'success' && <span className="toast-icon">✓</span>}
            {toast.type === 'error' && <span className="toast-icon">✕</span>}
            {toast.type === 'info' && <span className="toast-icon">ℹ</span>}
            <span className="toast-msg">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminApp;
