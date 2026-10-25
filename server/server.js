import express from 'express';
import cors from 'cors';
import { store } from './data/store.js';

const app = express();
const PORT = process.env.PORT || 5000;

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
   REST API ROUTES (Swappable with MongoDB / PostgreSQL in the future)
   ========================================================================== */

// 1. System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    academy: 'Namaste Hindi Academy API',
    architectExperience: '20+ Years',
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

app.post('/api/testimonials', (req, res) => {
  const { name, country, role, quote, courseTaken, rating } = req.body;
  if (!name || !quote) {
    return res.status(400).json({ success: false, message: 'Name and quote are required' });
  }
  const created = store.addTestimonial(req.body);
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
app.post('/api/bookings', (req, res) => {
  const { name, email, whatsapp, timezone, preferredSlot, goal, currentLevel, nativeLanguage } = req.body;
  
  if (!name || !email || !timezone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide full name, international email address, and timezone.'
    });
  }

  // Create booking with confirmed receipt
  const booking = store.addBooking({
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
app.post('/api/inquiries', (req, res) => {
  const { name, email, subject, message, organization } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required inquiry fields.'
    });
  }

  const inquiry = store.addInquiry({
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
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const result = store.addSubscriber(email);
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
  console.log(`💾 Data Store Engine: File-Persisted In-Memory DB (Ready for MongoDB/Postgres)`);
  console.log(`====================================================`);
});
