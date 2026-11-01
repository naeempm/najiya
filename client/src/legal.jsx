import React from "react";

const LAST_UPDATED = "1 November 2026";

function LegalSection({ title, children }) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function LegalShell({ eyebrow, title, intro, children }) {
  return (
    <section className="page-section legal-page">
      <div className="section-wrap legal-wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="page-main-heading">{title}</h1>
          <p className="lead">{intro}</p>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </div>
        <div className="legal-body">{children}</div>
      </div>
    </section>
  );
}

export function PrivacyPolicy({ therapist }) {
  const email = therapist.email || "speechconnect.in@gmail.com";
  return (
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How Speech Connect collects, uses and protects the personal information you share with us."
    >
      <LegalSection title="1. Who we are">
        <p>
          Speech Connect is an online speech and language telepractice led by{" "}
          {therapist.name || "Najiya P M"} ({therapist.degrees || "M.Sc. SLP, OPT"}),
          registered with the {therapist.council || "Rehabilitation Council of India (RCI)"}{" "}
          ({therapist.crr || "CRR No: A84512"}). In this policy, "we", "us" and "our"
          refer to Speech Connect.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>When you request an appointment or contact us, we may collect:</p>
        <ul>
          <li>Name, age and gender of the person seeking therapy</li>
          <li>Mobile number and email address</li>
          <li>The communication concerns or services you describe</li>
          <li>Messages you send us by WhatsApp, phone or email</li>
        </ul>
        <p>
          During therapy we may also keep clinical notes, assessment results and
          progress records needed to provide care.
        </p>
        <p>
          This website does not use advertising or analytics cookies. It stores
          only your light/dark theme choice in your browser's local storage.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use your information">
        <ul>
          <li>To respond to your enquiry and schedule consultations</li>
          <li>To plan, deliver and review therapy sessions</li>
          <li>To send appointment confirmations and follow-ups</li>
          <li>To meet legal, professional and record-keeping obligations</li>
        </ul>
        <p>We do not sell, rent or trade your personal information.</p>
      </LegalSection>

      <LegalSection title="4. Children's information">
        <p>
          Many of our clients are children. Information about a minor must be
          submitted by a parent or legal guardian, who consents to its use for
          the purposes described in this policy.
        </p>
      </LegalSection>

      <LegalSection title="5. Service providers">
        <p>
          We use trusted third-party services to run this website and our
          practice, which may process your data on our behalf:
        </p>
        <ul>
          <li>Secure cloud database hosting for appointment requests</li>
          <li>An email delivery service for confirmations and notifications</li>
          <li>Website hosting and image delivery providers</li>
          <li>WhatsApp and video-call platforms, when you choose to use them</li>
        </ul>
        <p>
          These providers may store data outside India. We share only what is
          needed for them to provide their service.
        </p>
      </LegalSection>

      <LegalSection title="6. Data retention and security">
        <p>
          We keep appointment and clinical records only as long as needed to
          provide care and meet professional or legal requirements. We use
          reasonable technical and organisational safeguards, but no method of
          transmission or storage over the internet is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="7. Your rights">
        <p>
          Subject to applicable law, including India's Digital Personal Data
          Protection Act, 2023, you may ask to access, correct or delete your
          personal information, or withdraw consent for its use. To make a
          request, email us at <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to this policy">
        <p>
          We may update this policy from time to time. The "Last updated" date
          above shows when it was last revised.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${email}`}>{email}</a>
          {therapist.call ? ` or ${therapist.call}` : ""}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

export function TermsAndConditions({ therapist }) {
  const email = therapist.email || "speechconnect.in@gmail.com";
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The terms that apply when you use this website and book therapy with Speech Connect."
    >
      <LegalSection title="1. Acceptance of terms">
        <p>
          By using this website or booking a session with Speech Connect, you
          agree to these terms and to our Privacy Policy. If you do not agree,
          please do not use the website or our services.
        </p>
      </LegalSection>

      <LegalSection title="2. Our services">
        <p>
          Speech Connect provides speech and language therapy, mainly through
          live online telepractice, delivered by{" "}
          {therapist.name || "Najiya P M"}, an RCI-registered Speech-Language
          Pathologist. Therapy plans are tailored to each client after
          assessment.
        </p>
      </LegalSection>

      <LegalSection title="3. Not for emergencies">
        <p>
          Our services are not emergency care. If you or someone in your care
          has a medical emergency, contact your local emergency services or
          nearest hospital immediately.
        </p>
      </LegalSection>

      <LegalSection title="4. Website information">
        <p>
          Content on this website is for general information only and is not a
          substitute for an individual assessment or professional advice.
        </p>
      </LegalSection>

      <LegalSection title="5. Appointments">
        <ul>
          <li>Submitting a booking request does not confirm an appointment until we confirm it with you.</li>
          <li>Please provide accurate information so we can plan suitable care.</li>
          <li>Sessions for minors must be booked by a parent or legal guardian, who should be available during sessions as advised.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Fees, cancellations and rescheduling">
        <p>
          Session fees and payment details are shared before your first session.
          Please give at least 24 hours' notice to cancel or reschedule. Missed
          sessions or late cancellations may be charged in full, at our
          discretion.
        </p>
      </LegalSection>

      <LegalSection title="7. Online sessions">
        <ul>
          <li>You are responsible for a stable internet connection, a suitable device and a quiet, private space.</li>
          <li>Sessions may not be recorded by either party without prior written consent.</li>
          <li>Time lost to technical problems on the client's side may not be extended or refunded.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Outcomes">
        <p>
          Therapy progress depends on many factors, including consistency of
          home practice. We use evidence-based methods but cannot guarantee any
          specific result or timeline.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual property">
        <p>
          The text, images, logo and therapy materials on this website and in
          sessions belong to Speech Connect or its licensors. They may be used
          for your personal therapy only and may not be copied or redistributed
          without permission.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of liability">
        <p>
          To the extent permitted by law, Speech Connect is not liable for any
          indirect or consequential loss arising from use of this website or
          our services, including losses caused by third-party platforms or
          internet outages.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to these terms">
        <p>
          We may update these terms from time to time. Continued use of the
          website or our services after changes means you accept the updated
          terms.
        </p>
      </LegalSection>

      <LegalSection title="12. Governing law">
        <p>
          These terms are governed by the laws of India, and any disputes are
          subject to the jurisdiction of the courts of India.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${email}`}>{email}</a>
          {therapist.call ? ` or ${therapist.call}` : ""}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
