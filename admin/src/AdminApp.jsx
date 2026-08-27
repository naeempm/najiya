import { useEffect, useState } from 'react';

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

function AdminApp() {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('Loading appointments...');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toasts, setToasts] = useState([]);
  const [activeSection, setActiveSection] = useState('requests');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function showToast(message, type = 'success') {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  }

  async function loadAppointments(isManual = false) {
    try {
      const response = await fetch(`${API_URL}/appointments`);
      const data = await response.json();
      setAppointments(data);
      setStatus(data.length ? '' : 'No appointment requests yet.');
      if (isManual) {
        showToast('Appointments list updated.', 'success');
      }
    } catch {
      setStatus('Server is not running. Start the server to view appointments.');
      showToast('Error connecting to backend server.', 'error');
    }
  }

  async function updateAppointmentStatus(id, newStatus) {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        showToast(`Request marked as ${newStatus}.`, 'success');
      } else {
        showToast('Failed to update request status.', 'error');
      }
    } catch {
      showToast('Connection error. Server is unreachable.', 'error');
    }
  }

  async function deleteAppointment(id) {
    if (!window.confirm('Are you sure you want to delete this request permanently?')) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        showToast('Appointment request permanently deleted.', 'success');
      } else {
        showToast('Failed to delete appointment request.', 'error');
      }
    } catch {
      showToast('Connection error. Server is unreachable.', 'error');
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  // Stats calculation
  const totalCount = appointments.length;
  const newCount = appointments.filter((app) => (app.status || 'new') === 'new').length;
  const contactedCount = appointments.filter((app) => app.status === 'contacted').length;
  const completedCount = appointments.filter((app) => app.status === 'completed').length;

  // Filtering logic
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus =
      statusFilter === 'all' || (app.status || 'new') === statusFilter;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      app.name.toLowerCase().includes(query) ||
      (app.phone && app.phone.toLowerCase().includes(query)) ||
      (app.concerns && app.concerns.toLowerCase().includes(query)) ||
      (app.service && app.service.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  return (
    <main>
      <header className="mobile-admin-header">
        <button
          className={`admin-menu-toggle ${sidebarOpen ? 'open' : ''}`}
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle admin sidebar menu"
          aria-expanded={sidebarOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <div className="mobile-admin-brand">
          <span>Lead</span> SLP Admin
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`} aria-label="Admin navigation">
        <a className="admin-brand" href="/" onClick={(e) => { e.preventDefault(); setActiveSection('requests'); setSidebarOpen(false); }}>
          <span>Lead</span> SLP
        </a>
        <nav>
          <button
            type="button"
            className={activeSection === 'requests' ? 'active-link' : ''}
            onClick={() => {
              setActiveSection('requests');
              setSidebarOpen(false);
            }}
          >
            Requests
          </button>
          <button
            type="button"
            className={activeSection === 'overview' ? 'active-link' : ''}
            onClick={() => {
              setActiveSection('overview');
              setSidebarOpen(false);
            }}
          >
            Overview
          </button>
        </nav>
      </aside>

      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <p>Clinic workspace</p>
            <h1>Appointment Dashboard</h1>
          </div>
          <button onClick={() => loadAppointments(true)} type="button">
            Refresh requests
          </button>
        </header>

        {activeSection === 'overview' && (
          <section className="stats-grid" id="overview">
            <article className="stat-active">
              <span>Total requests</span>
              <strong>{totalCount}</strong>
              <small>Total inquiries received</small>
            </article>
            <article className="stat-new">
              <span>New requests</span>
              <strong>{newCount}</strong>
              <small>Pending contact</small>
            </article>
            <article className="stat-server">
              <span>Server Status</span>
              <strong>{status.includes('Server') ? 'Offline' : 'Online'}</strong>
              <small>Connected to MongoDB Atlas</small>
            </article>
          </section>
        )}

        {activeSection === 'requests' && (
          <section className="panel" id="requests">
            <div className="panel-title">
              <div>
                <p>Requests</p>
                <h2>Appointment Requests</h2>
            </div>
            <span>{filteredAppointments.length} visible</span>
          </div>

          <div className="controls-row">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, phone, or concern..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-tabs">
              <button
                type="button"
                className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                className={`filter-tab ${statusFilter === 'new' ? 'active' : ''}`}
                onClick={() => setStatusFilter('new')}
              >
                New ({newCount})
              </button>
              <button
                type="button"
                className={`filter-tab ${statusFilter === 'contacted' ? 'active' : ''}`}
                onClick={() => setStatusFilter('contacted')}
              >
                Contacted ({contactedCount})
              </button>
              <button
                type="button"
                className={`filter-tab ${statusFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {status && <p className="status">{status}</p>}

          <div className="appointments">
            {filteredAppointments.map((appointment) => (
              <article className="appointment-card" key={appointment.id}>
                <div className="card-head">
                  <div>
                    <h3>{appointment.name}</h3>
                    <p>{appointment.concerns || appointment.service || 'Appointment request'}</p>
                  </div>
                  <span className={`badge badge-${appointment.status || 'new'}`}>
                    {appointment.status || 'new'}
                  </span>
                </div>
                <dl>
                  <div>
                    <dt>Age</dt>
                    <dd>{appointment.age || 'Not shared'}</dd>
                  </div>
                  <div>
                    <dt>Gender</dt>
                    <dd>{appointment.gender || 'Not shared'}</dd>
                  </div>
                  <div>
                    <dt>Mobile</dt>
                    <dd>{appointment.phone || 'Not shared'}</dd>
                  </div>
                  <div className="message-row">
                    <dt>Concerns</dt>
                    <dd>{appointment.concerns || appointment.message || 'No concerns shared'}</dd>
                  </div>
                  <div>
                    <dt>Received</dt>
                    <dd>{new Date(appointment.createdAt).toLocaleString()}</dd>
                  </div>
                </dl>
                <div className="card-actions">
                  {(appointment.status || 'new') === 'new' && (
                    <button
                      type="button"
                      className="btn-action btn-contacted"
                      onClick={() => updateAppointmentStatus(appointment.id, 'contacted')}
                    >
                      Mark as Contacted
                    </button>
                  )}
                  {(appointment.status || 'new') === 'contacted' && (
                    <button
                      type="button"
                      className="btn-action btn-completed"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    >
                      Mark as Completed
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-action btn-delete"
                    onClick={() => deleteAppointment(appointment.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        )}
      </section>

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

export default AdminApp;
