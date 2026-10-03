import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const CLINIC_LOGO_URL = 'https://res.cloudinary.com/c4qcrdad/image/upload/v1791043690/speech_connect/logo.jpg';

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.replace(/^["']|["']$/g, '').trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.replace(/^["']|["']$/g, '').trim() || 'Speech Connect <onboarding@resend.dev>';
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL?.replace(/^["']|["']$/g, '').trim() || 'speechconnect.in@gmail.com';

  return { apiKey, fromEmail, adminEmail };
}

/**
 * Send an email via Resend REST API
 */
async function sendResendMail({ to, subject, html }) {
  const { apiKey, fromEmail } = getResendConfig();

  if (!apiKey) {
    console.warn('[Resend] Warning: RESEND_API_KEY is not configured in server/.env');
    return { success: false, error: 'RESEND_API_KEY is not configured' };
  }

  const recipients = Array.isArray(to) ? to : [to];

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Resend Error]', response.status, data);
      return { success: false, status: response.status, error: data.message || 'Resend API error', data };
    }

    console.log('[Resend Success] Email sent successfully:', data.id, 'to:', recipients.join(', '));
    return { success: true, id: data.id, data };
  } catch (error) {
    console.error('[Resend Exception]', error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate beautiful HTML template for Patient / Client confirmation
 */
function buildClientEmailHtml(appointment) {
  const patientName = appointment.name || 'Valued Patient';
  const cleanPhone = (appointment.phone || '').replace(/\D/g, '');
  const waUrl = cleanPhone ? `https://wa.me/919349412153?text=Hi%20Najiya,%20I%20just%20submitted%20a%20consultation%20request%20for%20${encodeURIComponent(patientName)}` : 'https://wa.me/919349412153';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Request Received • Speech Connect</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f7f9f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; }
    .email-wrapper { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); }
    .header-bar { background: linear-gradient(135deg, #173b34 0%, #235e52 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .logo-img { width: 56px; height: 56px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.4); margin-bottom: 12px; }
    .header-title { font-size: 20px; font-weight: 800; letter-spacing: 0.04em; margin: 0; text-transform: uppercase; color: #ffffff; }
    .header-sub { font-size: 13px; color: #a7f3d0; margin-top: 4px; font-weight: 500; letter-spacing: 0.02em; }
    .content-body { padding: 32px 28px; }
    .greeting { font-size: 18px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 14px; }
    .intro-p { font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 24px; }
    .summary-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 24px; }
    .summary-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6b7280; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
    .summary-row:last-child { margin-bottom: 0; }
    .summary-label { color: #6b7280; font-weight: 500; min-width: 120px; }
    .summary-value { color: #111827; font-weight: 600; text-align: right; }
    .concerns-box { margin-top: 12px; padding-top: 12px; border-top: 1px dashed #e5e7eb; }
    .concerns-text { font-size: 14px; color: #374151; line-height: 1.5; margin: 4px 0 0; background: #ffffff; padding: 10px 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
    .next-steps-card { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 18px 20px; margin-bottom: 28px; }
    .next-steps-title { font-size: 14px; font-weight: 750; color: #065f46; margin: 0 0 10px; display: flex; align-items: center; }
    .next-steps-list { margin: 0; padding-left: 20px; font-size: 13.5px; color: #047857; line-height: 1.6; }
    .cta-center { text-align: center; margin: 28px 0 20px; }
    .btn-wa { display: inline-block; background-color: #25d366; color: #ffffff !important; text-decoration: none; padding: 13px 28px; border-radius: 50px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25); }
    .signature-block { border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 28px; font-size: 13px; color: #6b7280; line-height: 1.5; }
    .sig-name { font-weight: 700; color: #111827; font-size: 14px; }
    .sig-creds { color: #235e52; font-weight: 600; }
    .footer-bar { background-color: #111827; color: #9ca3af; text-align: center; padding: 20px 24px; font-size: 12px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header-bar">
      <img src="${CLINIC_LOGO_URL}" alt="Speech Connect Logo" class="logo-img" />
      <h1 class="header-title">Speech Connect</h1>
      <div class="header-sub">Online Speech & Language Telepractice • RCI Registered</div>
    </div>

    <!-- Body -->
    <div class="content-body">
      <h2 class="greeting">Thank You, ${patientName}!</h2>
      <p class="intro-p">
        We have successfully received your consultation inquiry. Founder & Lead Speech-Language Pathologist 
        <strong>Najiya P M</strong> (M.Sc. SLP, OPT) will review your information and get back to you within 
        <strong>24 hours</strong> to confirm a convenient virtual time slot.
      </p>

      <!-- Summary Details -->
      <div class="summary-card">
        <div class="summary-title">Consultation Request Summary</div>
        <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 14px;">
          <tr>
            <td style="color: #6b7280; font-weight: 500; padding: 4px 0;">Patient Name:</td>
            <td style="color: #111827; font-weight: 600; text-align: right; padding: 4px 0;">${patientName}</td>
          </tr>
          ${appointment.age ? `
          <tr>
            <td style="color: #6b7280; font-weight: 500; padding: 4px 0;">Age:</td>
            <td style="color: #111827; font-weight: 600; text-align: right; padding: 4px 0;">${appointment.age} Years</td>
          </tr>` : ''}
          ${appointment.gender ? `
          <tr>
            <td style="color: #6b7280; font-weight: 500; padding: 4px 0;">Gender:</td>
            <td style="color: #111827; font-weight: 600; text-align: right; padding: 4px 0;">${appointment.gender}</td>
          </tr>` : ''}
          <tr>
            <td style="color: #6b7280; font-weight: 500; padding: 4px 0;">Contact Phone:</td>
            <td style="color: #111827; font-weight: 600; text-align: right; padding: 4px 0;">${appointment.phone}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-weight: 500; padding: 4px 0;">Requested Service:</td>
            <td style="color: #235e52; font-weight: 700; text-align: right; padding: 4px 0;">${appointment.service || 'Speech Therapy'}</td>
          </tr>
        </table>

        ${appointment.concerns ? `
        <div class="concerns-box">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280;">Primary Concern / Message:</div>
          <div class="concerns-text">${appointment.concerns}</div>
        </div>` : ''}
      </div>

      <!-- What to Expect Next -->
      <div class="next-steps-card">
        <div class="next-steps-title">What Happens Next?</div>
        <ul class="next-steps-list">
          <li><strong>Clinical Review:</strong> Your concerns are evaluated to tailor the best assessment protocol.</li>
          <li><strong>Scheduling Confirmation:</strong> We will connect via phone or WhatsApp to coordinate a suitable session time.</li>
          <li><strong>Online Session Link:</strong> You will receive a private, high-definition video link for your teletherapy consultation.</li>
        </ul>
      </div>

      <!-- WhatsApp Quick Button -->
      <div class="cta-center">
        <a href="${waUrl}" target="_blank" class="btn-wa">
          💬 Need Immediate Assistance? Chat on WhatsApp
        </a>
      </div>

      <!-- Professional Sign-off -->
      <div class="signature-block">
        <div class="sig-name">Najiya P M</div>
        <div class="sig-creds">M.Sc. SLP, OPT • Founder & Lead Speech-Language Pathologist</div>
        <div>Rehabilitation Council of India Registration: <strong>CRR No: A84512</strong></div>
        <div style="margin-top: 8px;">
          📞 Call: <a href="tel:+918281753253" style="color: #235e52; text-decoration: none;">+91 8281753253</a> | 
          💬 WhatsApp: <a href="https://wa.me/919349412153" style="color: #235e52; text-decoration: none;">+91 9349412153</a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <div>Speech Connect • Certified Clinical Telepractice Worldwide</div>
      <div style="margin-top: 4px; font-size: 11px; color: #6b7280;">
        This email was sent to confirm your consultation booking at speechconnect.in
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate clean executive HTML template for Admin / Therapist Alert
 */
function buildAdminAlertEmailHtml(appointment) {
  const patientName = appointment.name || 'Anonymous Patient';
  const cleanPhone = (appointment.phone || '').replace(/\D/g, '');
  const waDirectUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=Hello%20${encodeURIComponent(patientName)},%20this%20is%20Najiya%20from%20Speech%20Connect%20following%20up%20on%20your%20consultation%20request.` : 'https://wa.me/919349412153';
  const callUrl = cleanPhone ? `tel:+${cleanPhone}` : `tel:${appointment.phone}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Patient Consultation Request • Speech Connect</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    .email-wrapper { max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
    .header-bar { background: #0f172a; padding: 26px 28px; border-bottom: 3px solid #10b981; }
    .brand-row { display: flex; align-items: center; justify-content: space-between; }
    .badge-alert { background-color: #064e3b; color: #34d399; font-size: 12px; font-weight: 750; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.05em; }
    .title-h1 { font-size: 20px; font-weight: 800; color: #f8fafc; margin: 12px 0 2px; }
    .time-sub { font-size: 12px; color: #94a3b8; }
    .content-body { padding: 30px 28px; }
    .action-bar { display: flex; gap: 12px; margin-bottom: 26px; }
    .btn-action { flex: 1; text-align: center; padding: 12px 16px; border-radius: 8px; font-weight: 700; font-size: 13.5px; text-decoration: none !important; }
    .btn-wa { background-color: #22c55e; color: #ffffff !important; }
    .btn-call { background-color: #0f172a; color: #ffffff !important; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .detail-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .detail-table tr:last-child td { border-bottom: none; }
    .lbl { width: 140px; color: #64748b; font-weight: 600; }
    .val { color: #0f172a; font-weight: 700; }
    .concerns-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #10b981; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
    .concerns-heading { font-size: 12px; font-weight: 750; text-transform: uppercase; color: #64748b; margin-top: 0; margin-bottom: 6px; letter-spacing: 0.05em; }
    .concerns-body { font-size: 14px; color: #1e293b; line-height: 1.5; margin: 0; white-space: pre-wrap; }
    .footer-bar { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header-bar">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span class="badge-alert">● New Patient Inquiry</span>
        <span style="font-size: 12px; color: #94a3b8;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
      </div>
      <div class="title-h1">${patientName}</div>
      <div class="time-sub">Consultation Inquiry for: <strong>${appointment.service || 'Speech Therapy'}</strong></div>
    </div>

    <!-- Content -->
    <div class="content-body">
      <!-- Quick Action Buttons for Therapist -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 22px;">
        <tr>
          <td width="48%" style="padding-right: 6px;">
            <a href="${waDirectUrl}" target="_blank" style="display: block; background: #25d366; color: #ffffff; text-decoration: none; padding: 13px; text-align: center; border-radius: 8px; font-weight: 750; font-size: 14px;">
              💬 WhatsApp Patient
            </a>
          </td>
          <td width="48%" style="padding-left: 6px;">
            <a href="${callUrl}" style="display: block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 13px; text-align: center; border-radius: 8px; font-weight: 750; font-size: 14px;">
              📞 Call Directly
            </a>
          </td>
        </tr>
      </table>

      <!-- Breakdown Table -->
      <table class="detail-table">
        <tr style="background-color: #f8fafc;">
          <td class="lbl">Patient Name</td>
          <td class="val">${patientName}</td>
        </tr>
        <tr>
          <td class="lbl">Phone / Mobile</td>
          <td class="val"><a href="${callUrl}" style="color: #0f172a; text-decoration: none;">${appointment.phone}</a></td>
        </tr>
        ${appointment.email ? `
        <tr style="background-color: #f8fafc;">
          <td class="lbl">Email Address</td>
          <td class="val"><a href="mailto:${appointment.email}" style="color: #2563eb; text-decoration: none;">${appointment.email}</a></td>
        </tr>` : ''}
        <tr>
          <td class="lbl">Age & Gender</td>
          <td class="val">${appointment.age ? `${appointment.age} yrs` : 'Not specified'} • ${appointment.gender || 'Not specified'}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td class="lbl">Service</td>
          <td class="val" style="color: #047857;">${appointment.service || 'Consultation Request'}</td>
        </tr>
      </table>

      <!-- Reported Concerns -->
      <div class="concerns-card">
        <div class="concerns-heading">Reported Clinical Concerns / Message:</div>
        <p class="concerns-body">${appointment.concerns || appointment.message || 'No additional concerns entered by patient.'}</p>
      </div>

      <!-- Action Note -->
      <div style="font-size: 13px; color: #64748b; background: #f1f5f9; padding: 12px 14px; border-radius: 6px;">
        💡 <strong>Tip:</strong> This request has been saved in the MongoDB database and is visible on your 
        <strong>Speech Connect Admin Dashboard</strong> under the Inquiries tab.
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      Speech Connect Automated Clinical Notification System • Lead SLP Console
    </div>
  </div>
</body>
</html>`;
}

/**
 * Handle new appointment submission emails
 * Sends both client confirmation (if email provided) and admin notification alert
 */
export async function sendAppointmentNotificationEmails(appointment) {
  const { adminEmail } = getResendConfig();
  const results = {
    clientEmailSent: false,
    adminEmailSent: false,
    errors: [],
  };

  // 1. Send confirmation email to client if an email was provided
  if (appointment.email && appointment.email.includes('@')) {
    try {
      const clientHtml = buildClientEmailHtml(appointment);
      const clientRes = await sendResendMail({
        to: appointment.email.trim(),
        subject: 'Consultation Request Received • Speech Connect',
        html: clientHtml,
      });

      if (clientRes.success) {
        results.clientEmailSent = true;
        results.clientEmailId = clientRes.id;
      } else {
        results.errors.push(`Client email error: ${clientRes.error || 'Failed'}`);
      }
    } catch (err) {
      console.error('[EmailService] Error sending client confirmation:', err);
      results.errors.push(`Client email exception: ${err.message}`);
    }
  } else {
    results.clientEmailSkipped = 'No patient email provided';
  }

  // 2. Send executive alert email to Admin / Lead SLP
  if (adminEmail && adminEmail.includes('@')) {
    try {
      const adminHtml = buildAdminAlertEmailHtml(appointment);
      const adminRes = await sendResendMail({
        to: adminEmail,
        subject: `[New Consultation Request] ${appointment.name || 'Patient'} • ${appointment.service || 'Speech Therapy'}`,
        html: adminHtml,
      });

      if (adminRes.success) {
        results.adminEmailSent = true;
        results.adminEmailId = adminRes.id;
      } else {
        results.errors.push(`Admin email error: ${adminRes.error || 'Failed'}`);
      }
    } catch (err) {
      console.error('[EmailService] Error sending admin alert:', err);
      results.errors.push(`Admin email exception: ${err.message}`);
    }
  }

  return results;
}

export default {
  sendAppointmentNotificationEmails,
};
