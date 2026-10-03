import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { sendAppointmentNotificationEmails } from './emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory (server/)
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

// Configure Cloudinary
function configureCloudinary() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (cloudinaryUrl) {
    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
    });
  } else if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }
}
configureCloudinary();

function isCloudinaryConfigured() {
  configureCloudinary();
  const cfg = cloudinary.config();
  return Boolean(cfg.cloud_name && cfg.api_key && cfg.api_secret);
}

const app = express();
const PORT = process.env.PORT || 5001;
let MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  MONGODB_URI = MONGODB_URI.replace(/^["']|["']$/g, '').trim();
}

// Handle connection errors after initial connection is established to prevent unhandled error event crashes
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

function authenticateToken(request, response, next) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({ error: 'Access token required.' });
  }

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      return response.status(403).json({ error: 'Invalid or expired token.' });
    }
    request.user = user;
    next();
  });
}

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    age: {
      type: String,
      default: '',
      trim: true,
    },
    gender: {
      type: String,
      default: '',
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    service: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    concerns: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

appointmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

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
    description: 'Personalized, evidence-based online speech therapy led by certified specialist Najiya P M (M.Sc. SLP, OPT). Transforming communication for toddlers, children, and adults worldwide.',
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

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main_content', unique: true },
    content: { type: mongoose.Schema.Types.Mixed, default: DEFAULT_CONTENT },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

siteContentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
  },
});

const SiteContent = mongoose.model('SiteContent', siteContentSchema);

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }
  cachedConnection = await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 3000
  });
  console.log(`Connected to MongoDB database on: ${mongoose.connection.host}`);
  return cachedConnection;
}

app.use(async (_req, _res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.post('/api/admin/login', (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: 'Username and password are required.' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    return response.json({ token });
  }

  return response.status(401).json({ error: 'Invalid username or password.' });
});

app.get('/api/health', (_request, response) => {
  const cfg = cloudinary.config();
  response.json({
    ok: true,
    service: 'lead-slp-server',
    databaseState: mongoose.connection.readyState,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    hasUri: !!process.env.MONGODB_URI,
    cloudinary: isCloudinaryConfigured() ? 'connected' : 'not_configured',
    cloudinaryCloudName: cfg.cloud_name || null,
    nodeEnv: process.env.NODE_ENV
  });
});

app.get('/api/cloudinary/status', (_request, response) => {
  const configured = isCloudinaryConfigured();
  const cfg = cloudinary.config();
  response.json({
    configured,
    cloudName: cfg.cloud_name || null,
  });
});

app.get('/robots.txt', (_request, response) => {
  response.type('text/plain');
  response.send(`# Robots.txt for https://www.speechconnect.in/
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://www.speechconnect.in/sitemap.xml
Host: https://www.speechconnect.in
`);
});

app.get('/sitemap.xml', (_request, response) => {
  response.type('application/xml');
  response.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.speechconnect.in/</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://www.speechconnect.in/#services</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://www.speechconnect.in/#appointment</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://www.speechconnect.in/#about</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.speechconnect.in/#faq</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.speechconnect.in/#contact</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
</urlset>`);
});

app.post('/api/upload', authenticateToken, async (request, response) => {
  try {
    if (!isCloudinaryConfigured()) {
      return response.status(400).json({
        error: 'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET (or CLOUDINARY_URL) to server/.env',
      });
    }

    const { image, folder = 'speech_connect' } = request.body;
    if (!image) {
      return response.status(400).json({ error: 'No image provided for upload.' });
    }

    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: folder || 'speech_connect',
      resource_type: 'image',
    });

    return response.json({
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
      width: uploadRes.width,
      height: uploadRes.height,
      format: uploadRes.format,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return response.status(500).json({
      error: error.message || 'Failed to upload image to Cloudinary.',
    });
  }
});

app.post('/api/cloudinary/migrate-local-images', authenticateToken, async (request, response) => {
  try {
    if (!isCloudinaryConfigured()) {
      return response.status(400).json({
        error: 'Cloudinary is not configured. Please add credentials to server/.env first.',
      });
    }

    const localDir = path.join(__dirname, '..', '..', 'client', 'public', 'images');
    const imagesToUpload = [
      { key: 'logo', filename: 'logo.jpeg' },
      { key: 'mainPhoto', filename: 'najiya-pm.jpg' },
      { key: 'hero2', filename: 'najiya-pm-2.jpg' },
      { key: 'aboutPhoto', filename: 'najiya-pm-about.jpg' },
      { key: 'brownBg', filename: 'najiya-pm-brown-bg.jpg' },
    ];

    const results = {};
    for (const item of imagesToUpload) {
      const fullPath = path.join(localDir, item.filename);
      try {
        const uploadRes = await cloudinary.uploader.upload(fullPath, {
          folder: 'speech_connect/presets',
          public_id: path.basename(item.filename, path.extname(item.filename)),
          overwrite: true,
          resource_type: 'image',
        });
        results[item.key] = {
          filename: item.filename,
          url: uploadRes.secure_url,
          public_id: uploadRes.public_id,
        };
      } catch (err) {
        results[item.key] = {
          filename: item.filename,
          error: err.message,
        };
      }
    }

    let siteContent = await SiteContent.findOne({ key: 'main_content' });
    if (!siteContent) {
      siteContent = await SiteContent.create({ key: 'main_content', content: DEFAULT_CONTENT });
    }
    const current = siteContent.content || { ...DEFAULT_CONTENT };

    let updated = false;
    if (results.mainPhoto?.url) {
      current.therapist = current.therapist || {};
      current.therapist.photo = results.mainPhoto.url;
      updated = true;
    }
    if (results.aboutPhoto?.url) {
      current.therapist = current.therapist || {};
      current.therapist.aboutPhoto = results.aboutPhoto.url;
      updated = true;
    }
    if (results.mainPhoto?.url && results.hero2?.url) {
      current.hero = current.hero || {};
      current.hero.photos = [results.mainPhoto.url, results.hero2.url];
      updated = true;
    }

    if (updated) {
      siteContent.content = current;
      siteContent.markModified('content');
      await siteContent.save();
    }

    return response.json({
      success: true,
      results,
      contentUpdated: updated,
      newContent: current,
    });
  } catch (error) {
    console.error('Migration error:', error);
    return response.status(500).json({ error: error.message || 'Migration failed' });
  }
});

app.get('/api/content', async (_request, response) => {
  try {
    let siteContent = await SiteContent.findOne({ key: 'main_content' });
    if (!siteContent) {
      siteContent = await SiteContent.create({
        key: 'main_content',
        content: DEFAULT_CONTENT,
      });
    }
    response.json(siteContent.content || DEFAULT_CONTENT);
  } catch (error) {
    console.error('Error fetching site content, returning defaults:', error);
    response.json(DEFAULT_CONTENT);
  }
});

app.put('/api/content', authenticateToken, async (request, response, next) => {
  try {
    const updatedContent = request.body;
    if (!updatedContent || typeof updatedContent !== 'object') {
      return response.status(400).json({ error: 'Invalid content payload.' });
    }

    const doc = await SiteContent.findOneAndUpdate(
      { key: 'main_content' },
      { content: updatedContent },
      { new: true, upsert: true }
    );

    response.json(doc.content);
  } catch (error) {
    next(error);
  }
});

app.get('/api/appointments', authenticateToken, async (_request, response, next) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    response.json(appointments);
  } catch (error) {
    next(error);
  }
});

app.post('/api/appointments', async (request, response, next) => {
  const { name, email, age, gender, phone, service, message, concerns } = request.body;

  if (!name || !phone || !concerns) {
    return response.status(400).json({ error: 'Name, mobile, and concerns are required.' });
  }

  try {
    const appointment = await Appointment.create({
      name,
      email: email || '',
      age: age || '',
      gender: gender || '',
      phone: phone || '',
      service: service || 'Appointment request',
      message: message || '',
      concerns: concerns || '',
    });

    // Send thank-you email to client and alert to admin via Resend
    let emailStatus = null;
    try {
      emailStatus = await sendAppointmentNotificationEmails(appointment);
      console.log('[Resend Notification Status]:', emailStatus);
    } catch (emailErr) {
      console.error('[Resend Notification Error]:', emailErr);
    }

    return response.status(201).json({
      ...appointment.toJSON(),
      emailStatus,
    });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/appointments/:id/resend-emails', authenticateToken, async (request, response, next) => {
  try {
    const appointment = await Appointment.findById(request.params.id);
    if (!appointment) {
      return response.status(404).json({ error: 'Appointment not found' });
    }
    const results = await sendAppointmentNotificationEmails(appointment);
    return response.json({ success: true, results });
  } catch (error) {
    next(error);
  }
});

app.patch('/api/appointments/:id', authenticateToken, async (request, response, next) => {
  try {
    const { status } = request.body;
    if (!['new', 'contacted', 'completed'].includes(status)) {
      return response.status(400).json({ error: 'Invalid status value.' });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      request.params.id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return response.status(404).json({ error: 'Appointment request not found.' });
    }
    response.json(appointment);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/appointments/:id', authenticateToken, async (request, response, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(request.params.id);
    if (!appointment) {
      return response.status(404).json({ error: 'Appointment request not found.' });
    }
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Server error. Please try again later.' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Lead SLP server running${PORT}`);
  });
}

export default app;
