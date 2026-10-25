import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // Ignore in sandboxed runtimes
}

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { store } from './data/store.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://purushottamjaga89_db_user:U9qAMlZzrNg5ifMz@cluster0.fyzycie.mongodb.net/namaste_hindi?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('====================================================');
    console.log('🍃 MONGODB ATLAS CLOUD CONNECTED SUCCESSFULLY!');
    console.log('Cluster: cluster0.fyzycie.mongodb.net');
    console.log('Database: namaste_hindi');
    console.log('====================================================');
  })
  .catch((err) => {
    console.warn('MongoDB connection note (running on persistent store):', err.message);
  });

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger for enterprise diagnostics
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

/* ==========================================================================
   REST API ROUTES
   ========================================================================== */

// 1. System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    academy: 'Namaste Hindi Academy API',
    database: mongoose.connection.readyState === 1 ? 'MongoDB Atlas Cloud Connected' : 'Persistent Storage Active',
    timestamp: new Date().toISOString()
  });
});

// 2. Platform Stats
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: store.getStats()
  });
});

// 3. Courses API
app.get('/api/courses', (req, res) => {
  const { deliveryMode, search } = req.query;
  const courses = store.getCourses({ deliveryMode, search });
  res.json({
    success: true,
    count: courses.length,
    data: courses
  });
});

app.get('/api/courses/:id', (req, res) => {
  const course = store.getCourseById(req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({
    success: true,
    data: course
  });
});

// 4. Testimonials & Reviews API
app.get('/api/testimonials', (req, res) => {
  res.json({
    success: true,
    data: store.getTestimonials()
  });
});

app.post('/api/testimonials', async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote) {
    return res.status(400).json({ success: false, message: 'Name and quote are required' });
  }
  const created = await store.addTestimonial(req.body);
  res.status(201).json({
    success: true,
    message: 'Thank you for your review! It has been posted to our global wall.',
    data: created
  });
});

// 5. Audio Phrasebook API
app.get('/api/phrases', (req, res) => {
  const { category, search } = req.query;
  const phrases = store.getPhrases({ category, search });
  res.json({
    success: true,
    count: phrases.length,
    data: phrases
  });
});

// 6. FAQs API
app.get('/api/faqs', (req, res) => {
  const { category } = req.query;
  const faqs = store.getFaqs({ category });
  res.json({
    success: true,
    count: faqs.length,
    data: faqs
  });
});

// 7. Demo Class Booking API (Instant Zoom Confirmation)
app.post('/api/bookings', async (req, res) => {
  const { name, email, whatsapp, timezone, preferredSlot, goal, currentLevel, nativeLanguage } = req.body;
  
  if (!name || !email || !timezone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide full name, international email address, and timezone.'
    });
  }

  const booking = await store.addBooking({
    name,
    email,
    whatsapp: whatsapp || 'Not provided',
    timezone,
    preferredSlot: preferredSlot || 'Morning',
    goal: goal || 'General Conversational Fluency',
    currentLevel: currentLevel || 'Absolute Beginner',
    nativeLanguage: nativeLanguage || 'English'
  });

  res.status(201).json({
    success: true,
    message: 'Congratulations! Your Free 30-Minute 1-on-1 Demo Class with Guru Ji is confirmed.',
    data: booking
  });
});

app.get('/api/bookings', (req, res) => {
  res.json({
    success: true,
    data: store.getBookings()
  });
});

// 8. Contact & General Inquiries API
app.post('/api/inquiries', async (req, res) => {
  const { name, email, subject, message, organization } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required inquiry fields.'
    });
  }

  const inquiry = await store.addInquiry({
    name,
    email,
    subject: subject || 'General Question',
    message,
    organization: organization || 'Individual Expat'
  });

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been received. Guru Ji or our academic coordinator will reply within 4 hours.',
    data: inquiry
  });
});

// 9. Newsletter & Lead Magnet Download API
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const result = await store.addSubscriber(email);
  res.json({
    success: true,
    message: 'Success! Your free 25-Page Expat Survival Hindi Cheatsheet PDF link has been sent.',
    downloadUrl: 'https://cdn.namastehindi.academy/downloads/survival-hindi-cheatsheet-guru-ji.pdf'
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 NAMASTE HINDI ACADEMY BACKEND RUNNING ON PORT ${PORT}`);
  console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
