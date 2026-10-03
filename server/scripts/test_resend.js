import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.RESEND_API_KEY?.trim();
console.log('Testing Resend API Key:', apiKey ? `${apiKey.slice(0, 7)}...` : 'MISSING');

async function testResend() {
  try {
    const res = await fetch('https://api.resend.com/api-keys', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = await res.json();
    console.log('Resend API response status:', res.status);
    console.log('Resend API data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error connecting to Resend:', err);
  }
}

testResend();
