import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendAppointmentNotificationEmails } from '../api/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const testAppointment = {
  name: 'Aarav Sharma (Official Test)',
  email: 'speechconnect.in@gmail.com', // also testing client confirmation
  age: '6',
  gender: 'Male',
  phone: '+91 98765 43210',
  service: 'Speech Therapy & Online Teletherapy',
  concerns: 'Testing verified speechconnect.in domain for admin & client notifications.',
};

console.log('Testing sendAppointmentNotificationEmails with verified domain...');
console.log('From:', process.env.RESEND_FROM_EMAIL);
console.log('Admin Email:', process.env.ADMIN_NOTIFICATION_EMAIL);

sendAppointmentNotificationEmails(testAppointment)
  .then((res) => {
    console.log('Notification Results:', JSON.stringify(res, null, 2));
  })
  .catch((err) => {
    console.error('Error:', err);
  });
