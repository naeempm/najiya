import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui.jsx";
import { API_URL, PAGE_PATHS } from "./site.js";

const DELAY_MS = 10000;
const SEEN_KEY = "enquiry-popup-seen"; // sessionStorage: once per visit
const SENT_KEY = "enquiry-popup-sent"; // localStorage: never after an enquiry

const EMPTY_ENQUIRY = { name: "", phone: "", concerns: "" };

function alreadyHandled() {
  try {
    return Boolean(sessionStorage.getItem(SEEN_KEY) || localStorage.getItem(SENT_KEY));
  } catch {
    return false;
  }
}

function remember(storage, key) {
  try {
    window[storage].setItem(key, "1");
  } catch {
    // Private browsing can block storage; the popup just shows again next visit
  }
}

// paused: don't start the countdown (e.g. on the booking page or with the menu open)
export default function EnquiryPopup({ paused, whatsappLink }) {
  const dialogRef = useRef(null);
  const shownRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_ENQUIRY);
  const [state, setState] = useState("idle"); // idle | sending | sent | failed

  useEffect(() => {
    if (paused || shownRef.current || alreadyHandled()) return undefined;
    const timer = setTimeout(() => {
      shownRef.current = true;
      remember("sessionStorage", SEEN_KEY);
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, [paused]);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitEnquiry(event) {
    event.preventDefault();
    setState("sending");

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // The API requires concerns, but the message is optional here
          concerns: form.concerns.trim() || "No message left",
          service: "Website enquiry",
        }),
      });
      if (!response.ok) throw new Error("Request failed");

      remember("localStorage", SENT_KEY);
      setState("sent");
      if (typeof window.fbq === "function") window.fbq("track", "Lead");
    } catch {
      setState("failed");
    }
  }

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="enquiry-dialog"
      aria-labelledby="enquiry-title"
      onClose={() => setOpen(false)}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="enquiry-panel">
        <button
          className="enquiry-close"
          type="button"
          aria-label="Close enquiry form"
          onClick={() => dialogRef.current.close()}
        >
          <Icon name="close" size={18} />
        </button>

        {state === "sent" ? (
          <div className="enquiry-sent" role="status">
            <span className="icon-badge small tint-0">
              <Icon name="check" size={18} />
            </span>
            <h2 id="enquiry-title">Thank you!</h2>
            <p>We have received your enquiry and will contact you shortly.</p>
            <button className="primary-btn" type="button" onClick={() => dialogRef.current.close()}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="enquiry-title">Have a question about speech therapy?</h2>
            <p className="enquiry-lead">
              Leave your details and we will get back to you. It only takes a minute.
            </p>

            <form className="enquiry-form" onSubmit={submitEnquiry}>
              <div className="form-field">
                <label className="form-label" htmlFor="enquiry-name">
                  Your name <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="form-input"
                  value={form.name}
                  onChange={updateField}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="enquiry-phone">
                  Mobile / WhatsApp <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="form-input"
                  placeholder="With country code, e.g. +971"
                  value={form.phone}
                  onChange={updateField}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="enquiry-concerns">
                  How can we help? <span className="field-hint">(optional)</span>
                </label>
                <textarea
                  id="enquiry-concerns"
                  name="concerns"
                  className="form-input form-textarea"
                  rows="3"
                  placeholder="e.g. My 3-year-old is not talking yet"
                  value={form.concerns}
                  onChange={updateField}
                />
              </div>

              <button
                className="primary-btn submit-btn"
                type="submit"
                disabled={state === "sending"}
              >
                {state === "sending" ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send enquiry</span>
                )}
              </button>

              <div className="status-region" aria-live="polite">
                {state === "failed" && (
                  <p className="status-notice">
                    We couldn't send your enquiry. Please try again or{" "}
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      message us on WhatsApp
                    </a>
                    .
                  </p>
                )}
              </div>

              <p className="form-legal-note">
                By submitting, you agree to our{" "}
                <a href={PAGE_PATHS.terms} target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a href={PAGE_PATHS.privacy} target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
