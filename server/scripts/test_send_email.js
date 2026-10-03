import { sendAppointmentNotificationEmails } from '../api/emailService.js';

const mockAppointment = {
  name: 'Aarav Sharma',
  email: 'client.test@example.com',
  age: '6',
  gender: 'Male',
  phone: '+91 98765 43210',
  service: 'Speech Therapy & Telepractice',
  concerns: 'Difficulty with speech sound clarity and language delay.',
};

console.log('Testing sendAppointmentNotificationEmails...');
sendAppointmentNotificationEmails(mockAppointment)
  .then((res) => {
    console.log('Notification Results:', JSON.stringify(res, null, 2));
  })
  .catch((err) => {
    console.error('Error:', err);
  });
