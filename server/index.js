import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

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

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }
  cachedConnection = await mongoose.connect(MONGODB_URI);
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
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'lead-slp-server',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/appointments', async (_request, response, next) => {
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

    return response.status(201).json(appointment);
  } catch (error) {
    return next(error);
  }
});

app.patch('/api/appointments/:id', async (request, response, next) => {
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

app.delete('/api/appointments/:id', async (request, response, next) => {
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
