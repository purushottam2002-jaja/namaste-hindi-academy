import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Mongoose Schemas for MongoDB Atlas
const bookingSchema = new mongoose.Schema({
  bookingId: String,
  name: String,
  email: String,
  whatsapp: String,
  timezone: String,
  preferredSlot: String,
  goal: String,
  currentLevel: String,
  nativeLanguage: String,
  status: { type: String, default: 'confirmed' },
  zoomLink: String,
  createdAt: { type: Date, default: Date.now }
});

const inquirySchema = new mongoose.Schema({
  inquiryId: String,
  name: String,
  email: String,
  subject: String,
  message: String,
  organization: String,
  createdAt: { type: Date, default: Date.now }
});

const subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const testimonialSchema = new mongoose.Schema({
  name: String,
  country: String,
  flag: String,
  role: String,
  avatar: String,
  quote: String,
  courseTaken: String,
  rating: Number,
  date: String,
  verified: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export const BookingModel = mongoose.model('Booking', bookingSchema);
export const InquiryModel = mongoose.model('Inquiry', inquirySchema);
export const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);
export const TestimonialModel = mongoose.model('Testimonial', testimonialSchema);

// Initial seed data with rich real-world enterprise content
const initialData = {
  stats: {
    yearsExperience: 20,
    studentsTrained: 1450,
    countriesReached: 42,
    fluencySuccessRate: "98%",
    averageRating: 4.95,
    liveTimezones: ["US Eastern", "US Pacific", "UK GMT", "Central Europe", "Australia AEDT", "India IST"]
  },
  courses: [
    {
      id: "survival-hindi",
      title: "14-Day Expat & Tourist Survival Hindi",
      tagline: "Essential spoken phrases for markets, autos, street food & emergency navigation",
      level: "Absolute Beginner (A0-A1)",
      deliveryMode: "live-1on1",
      duration: "2 Weeks (10 Live Sessions)",
      classLength: "45 Mins / Class",
      basePriceUSD: 149,
      basePriceINR: 12499,
      badge: "Fast Track",
      color: "emerald",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      description: "Designed specifically for foreigners arriving in India for tourism, NGO volunteering, or initial relocation. Master crucial everyday interactions without getting bogged down by complicated grammar.",
      features: [
        "Master street haggling, taxi/auto booking, and address giving",
        "Ordering food, explaining spice tolerance ('Bina mirch ka')",
        "Emergency safety, police & pharmacy medical vocabulary",
        "Everyday pleasantries and polite refusals ('Nahi chahiye, shukriya')",
        "10 Real-life roleplay simulations with Guru Ji",
        "Laminated printable Pocket Survival Cheatsheet"
      ],
      idealFor: "Tourists, travel bloggers, short-term exchange students, and new expats."
    },
    {
      id: "conversational-expat",
      title: "Comprehensive Conversational Expat Fluency",
      tagline: "Speak fluid Hindi with landlords, domestic staff, colleagues & local friends",
      level: "Beginner to Intermediate (A1-B1)",
      deliveryMode: "hybrid",
      duration: "8 Weeks (24 Live Sessions + Video Vault)",
      classLength: "60 Mins / Class",
      basePriceUSD: 399,
      basePriceINR: 32999,
      badge: "Most Popular",
      color: "saffron",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      description: "Our flagship program that has turned over 900+ foreign expats into confident speakers. Demystifies Hindi verb conjugations, tense structures, gender rules, and the Nuances of Tu / Tum / Aap respect levels.",
      features: [
        "Flawless mastery of Hindi verb tenses (Past, Present, Future)",
        "Managing household staff, maids, cooks & maintenance contractors",
        "Navigating Indian social gatherings, weddings & festival etiquette",
        "Tu, Tum & Aap mastery to avoid cultural disrespect",
        "Lifetime access to 40+ hours recorded video library & flashcards",
        "Direct 24/7 WhatsApp homework & voice message feedback from Guru Ji"
      ],
      idealFor: "Long-term expats, embassy staff, foreign spouses of Indians, corporate transplants."
    },
    {
      id: "diplomatic-corporate",
      title: "Diplomatic, NGO & High-Stakes Corporate Hindi",
      tagline: "Formal Hindi vocabulary, government meeting etiquette & public address",
      level: "Intermediate to Advanced (B1-C1)",
      deliveryMode: "live-1on1",
      duration: "12 Weeks (36 Live Sessions)",
      classLength: "60 Mins / Class",
      basePriceUSD: 699,
      basePriceINR: 57999,
      badge: "Executive",
      color: "slate",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      description: "Tailored for international diplomats, embassy officers, UN personnel, multinational executives, and foreign correspondents reporting from South Asia.",
      features: [
        "Formal Sanskritic & Shuddh Hindi vocabulary for official briefings",
        "Deciphering Indian government gazettes, news debates & press releases",
        "Nuanced business negotiation tactics and socio-political idioms",
        "Speech delivery training for public ceremonies and press conferences",
        "Strict Non-Disclosure Agreement (NDA) confidential 1-on-1 sessions",
        "Bespoke curriculum tailored to your specific industry or mission"
      ],
      idealFor: "Diplomats, Embassy staff, journalists, NGO directors, MNC executives."
    },
    {
      id: "devanagari-script",
      title: "Devanagari Script Mastery & Speed Reading",
      tagline: "Learn to read street signboards, restaurant menus, and Hindi literature",
      level: "All Levels (No Prior Knowledge Needed)",
      deliveryMode: "recorded",
      duration: "4 Weeks (Self-Paced with 4 Live Check-ins)",
      classLength: "Self-Paced + 4 1-on-1 Reviews",
      basePriceUSD: 119,
      basePriceINR: 9999,
      badge: "Self-Paced",
      color: "teal",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
      description: "Stop relying on phonetic Roman Hindi. Unlock the phonetic beauty and mathematical logic of Devanagari script. Learn consonants, vowels, matras, and conjunct letters in 30 days.",
      features: [
        "Logical stroke order animation videos for all 33 consonants & 11 vowels",
        "Matra (vowel diacritics) deciphering guide with mnemonic memory cards",
        "Read real Indian street hoardings, metro train maps & Hindi menus",
        "High-resolution printable calligraphy handwriting practice workbooks",
        "Interactive reading drills with native audio accompaniment",
        "Devanagari keyboard typing module for Mac, Windows & iOS/Android"
      ],
      idealFor: "Anyone wanting to read signs in India, language enthusiasts, academics."
    },
    {
      id: "bollywood-culture",
      title: "Bollywood Cinema, Poetry & Shayari Appreciation",
      tagline: "Understand classic movie dialogues, Ghazal lyrics & poetic metaphors",
      level: "Intermediate (B1+)",
      deliveryMode: "live-1on1",
      duration: "6 Weeks (12 Live Masterclasses)",
      classLength: "60 Mins / Class",
      basePriceUSD: 249,
      basePriceINR: 19999,
      badge: "Cultural",
      color: "purple",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
      description: "Dive deep into the lyrical charm of Hindustani cinema and literature. Break down iconic Bollywood film scripts, understand Urdu loanwords, and appreciate Urdu-Hindi shayari.",
      features: [
        "Scene-by-scene script breakdown of legendary films (Sholay, 3 Idiots, Lagaan)",
        "Ghazal & song lyrical interpretation (Gulzar, Javed Akhtar, Sahir Ludhianvi)",
        "Distinction between pure Hindi, Urdu poetry and Mumbai slang",
        "Cultural metaphors, romantic tropes, and comedic double-entendres",
        "Sing-along pronunciation coaching and emotional intonation",
        "Curated watch-lists and cultural context guides"
      ],
      idealFor: "Cinema lovers, musicians, dancers, cultural enthusiasts."
    },
    {
      id: "heritage-roots",
      title: "Indian Heritage & NRI Family Reconnect",
      tagline: "Reconnect with your grandparents, in-laws & Indian cultural ancestry",
      level: "Beginner to Intermediate",
      deliveryMode: "hybrid",
      duration: "8 Weeks (16 Live Sessions + Homework Vault)",
      classLength: "50 Mins / Class",
      basePriceUSD: 299,
      basePriceINR: 24999,
      badge: "Family Focused",
      color: "amber",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      description: "For 2nd and 3rd generation Non-Resident Indians (NRIs) or foreign partners of Indians wanting to converse naturally with family elders and participate warmly in family gatherings.",
      features: [
        "Comfortable family talk: greeting grandparents, asking about health and food",
        "Wedding rituals, puja terminology, and festive customs explained",
        "Overcoming pronunciation anxiety in front of native-speaking relatives",
        "Family kinship vocabulary (Chacha, Mausa, Bhabhi, Nanad distinctions)",
        "Cooking vocabulary: recipes, spices, and dining room praise ('Khana lajawab hai!')",
        "Child-friendly modules available for young heritage kids"
      ],
      idealFor: "Foreign spouses of Indians, 2nd-gen NRIs in USA/UK/Canada, adoptive parents."
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Marcus Vance",
      country: "United Kingdom",
      flag: "🇬🇧",
      role: "British High Commission Diplomat, New Delhi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Before discovering Guru Ji, I was struggling with formal diplomatic Hindi and kept accidentally using the informal 'Tum' with senior ministers. His 20 years of experience shone through immediately. In 3 months, I could conduct press debriefs in Hindi without an interpreter.",
      courseTaken: "Diplomatic, NGO & High-Stakes Corporate Hindi",
      rating: 5,
      date: "2 months ago",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Jenkins, Ph.D.",
      country: "United States",
      flag: "🇺🇸",
      role: "Fulbright Anthropologist & Field Researcher",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "Most Indian tutors try to teach foreigners like they teach 5-year-old school children. Guru Ji understands adult foreign second-language pedagogy. He explained the psychological rhythm of Hindi. I lived in Varanasi for 8 months conducting interviews completely in Hindi!",
      courseTaken: "Conversational Expat Fluency",
      rating: 5,
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: "Dr. Klaus Weber",
      country: "Germany",
      flag: "🇩🇪",
      role: "Siemens India Senior Engineering Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "Being German, I needed logical grammar rules rather than vague translations. Guru Ji mapped Hindi syntax so mathematically that my hesitation evaporated within weeks. My factory team in Pune was astonished when I greeted them in flawless Hindi.",
      courseTaken: "14-Day Expat & Tourist Survival Hindi",
      rating: 5,
      date: "3 weeks ago",
      verified: true
    },
    {
      id: 4,
      name: "Chloe Dubois",
      country: "France",
      flag: "🇫🇷",
      role: "International Yoga & Ayurvedic Wellness Instructor",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      quote: "The free 30-minute demo was what convinced me. No pushy sales pitch, just a patient assessment of my tongue placement for aspirated sounds like 'Dh' and 'Th'. Today I can discuss ancient scriptures with Swamis in Rishikesh.",
      courseTaken: "Devanagari Script & Spoken Mastery",
      rating: 5,
      date: "Just now",
      verified: true
    }
  ],
  phrases: [
    {
      id: "p1",
      category: "greetings",
      hindi: "नमस्ते! आप कैसे हैं?",
      roman: "Namaste! Aap kaise hain?",
      english: "Hello! How are you? (Polite / Respectful)",
      context: "The universal greeting in India. Join hands together at chest level.",
      audioKey: "namaste-aap-kaise-hain"
    },
    {
      id: "p2",
      category: "greetings",
      hindi: "मेरा नाम जॉन है। आपसे मिलकर बहुत खुशी हुई।",
      roman: "Mera naam John hai. Aapse milkar bahut khushi hui.",
      english: "My name is John. Very pleased to meet you.",
      context: "Essential formal self-introduction for expats & diplomats.",
      audioKey: "mera-naam-john-hai"
    },
    {
      id: "p3",
      category: "market",
      hindi: "भैया, इसका दाम कितना है? थोड़ा कम कीजिए।",
      roman: "Bhaiya, iska daam kitna hai? Thoda kam kijiye.",
      english: "Brother, how much is this? Please lower the price a bit.",
      context: "The golden formula for flea markets like Sarojini Nagar or Colaba.",
      audioKey: "iska-daam-kitna-hai"
    },
    {
      id: "p4",
      category: "market",
      hindi: "नहीं चाहिए, शुक्रिया!",
      roman: "Nahi chahiye, shukriya!",
      english: "I don't need it, thank you!",
      context: "Firm yet polite phrase to decline persistent street hawkers without offending.",
      audioKey: "nahi-chahiye-shukriya"
    },
    {
      id: "p5",
      category: "transit",
      hindi: "कृपया मीटर से चलिए।",
      roman: "Kripya meter se chaliye.",
      english: "Please go by the fare meter.",
      context: "Use with auto-rickshaw and taxi drivers in Mumbai and Delhi.",
      audioKey: "kripya-meter-se-chaliye"
    },
    {
      id: "p6",
      category: "transit",
      hindi: "मुझे कनॉट प्लेस जाना है, कितना समय लगेगा?",
      roman: "Mujhe Connaught Place jaana hai, kitna samay lagega?",
      english: "I have to go to Connaught Place, how long will it take?",
      context: "Asking destination and estimated travel time in traffic.",
      audioKey: "kitna-samay-lagega"
    },
    {
      id: "p7",
      category: "dining",
      hindi: "कृपया खाना बिना मिर्च का बनाइए, मुझे तीखा नहीं जमता।",
      roman: "Kripya khana bina mirch ka banaiye, mujhe teekha nahi jamta.",
      english: "Please make the food without chili, I cannot tolerate spicy.",
      context: "Life-saving phrase for foreigners sensitive to Indian chili heat.",
      audioKey: "bina-mirch-ka-khana"
    },
    {
      id: "p8",
      category: "dining",
      hindi: "खाना बहुत स्वादिष्ट था, बिल ले आइए।",
      roman: "Khana bahut swadisht tha, bill le aaiye.",
      english: "The food was delicious, please bring the bill.",
      context: "Praising the chef / restaurant staff at the conclusion of dining.",
      audioKey: "khana-bahut-swadisht-tha"
    },
    {
      id: "p9",
      category: "respect",
      hindi: "माफ़ कीजिए, क्या आप अंग्रेज़ी बोलते हैं?",
      roman: "Maaf kijiye, kya aap angrezi bolte hain?",
      english: "Excuse me, do you speak English?",
      context: "Polite opening before seeking urgent street directions.",
      audioKey: "kya-aap-angrezi-bolte-hain"
    },
    {
      id: "p10",
      category: "respect",
      hindi: "कृपया धीरे बोलिए, मैं हिंदी सीख रहा हूँ।",
      roman: "Kripya dheere boliye, main Hindi seekh raha hoon.",
      english: "Please speak slowly, I am learning Hindi.",
      context: "Native speakers speak very rapidly; this immediately slows them down with a smile.",
      audioKey: "kripya-dheere-boliye"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      category: "pedagogy",
      question: "I am an adult foreign expat with zero background in Hindi. Can I really speak in 30 days?",
      answer: "Yes, absolutely! Unlike traditional Indian school rote memorization, Guru Ji uses 'Conversational Scaffolding'. We don't force you to learn the 44 Devanagari script letters before speaking. You speak full, practical sentences on Day 1 using phonetic English (Roman Hindi). Over 98% of our foreign students conduct grocery shopping, auto-rickshaw rides, and landlord chats comfortably within 4 weeks."
    },
    {
      id: "faq-2",
      category: "scheduling",
      question: "I live in New York / London / Sydney. How do live classes work across timezones?",
      answer: "Guru Ji teaches across all international timezones. We have dedicated live morning and evening slots matched to US Eastern (EST), US Pacific (PST), UK (GMT/BST), Central European Time (CET), and Australia (AEST). When you book your demo, our system automatically detects your local timezone."
    },
    {
      id: "faq-3",
      category: "pedagogy",
      question: "What is the difference between Tu, Tum, and Aap, and why are foreign learners terrified of it?",
      answer: "In English, there is only 'You'. In Hindi, there is a three-tier respect hierarchy: 'Tu' (very informal / intimate), 'Tum' (informal / friendly peer), and 'Aap' (formal / respectful elder / professional). Foreigners often offend locals by accident. In our academy, we teach the 'Aap-First Safety Protocol', ensuring you never make an embarrassing cultural blunder in public or business."
    },
    {
      id: "faq-4",
      category: "payments",
      question: "How do I pay for courses from outside India? Which currencies are accepted?",
      answer: "We accept all international Credit/Debit cards (Visa, MasterCard, Amex) via Stripe and PayPal, as well as Wise (TransferWise) and Indian UPI. You can pay in USD ($), GBP (£), EUR (€), AUD ($), or INR (₹) without paying exorbitant international bank wire fees."
    },
    {
      id: "faq-5",
      category: "format",
      question: "What if I miss a live 1-on-1 class due to travel or work meetings?",
      answer: "Every 1-on-1 session comes with a 12-hour flexible rescheduling policy. If you travel or get called into a meeting, simply notify Guru Ji via WhatsApp, and your session is rescheduled with zero penalty. Furthermore, all Zoom sessions are recorded in HD and uploaded to your private student portal."
    },
    {
      id: "faq-6",
      category: "demo",
      question: "Is the 30-Minute Free Demo class genuinely free, or is there a hidden commitment?",
      answer: "It is 100% free with no credit card required. You get 30 minutes of real, personalized 1-on-1 interaction with Guru Ji. He analyzes your native linguistic background (e.g. how German, French, or English speakers shape vowels), provides an instant tongue-placement diagnosis, and teaches you 3 high-impact phrases. You decide afterwards if you wish to enroll."
    }
  ],
  bookings: [],
  inquiries: [],
  subscribers: []
};

// Database Initializer & Persistence Engine
class DataStore {
  constructor() {
    this.data = initialData;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = { ...initialData, ...JSON.parse(fileContent) };
      } else {
        this.save();
      }
    } catch (err) {
      console.warn("Could not load db.json, falling back to memory seed:", err.message);
      this.data = initialData;
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error("Error persisting to db.json:", err.message);
    }
  }

  getStats() {
    return this.data.stats;
  }

  getCourses(filters = {}) {
    let list = [...this.data.courses];
    if (filters.deliveryMode && filters.deliveryMode !== 'all') {
      list = list.filter(c => c.deliveryMode === filters.deliveryMode);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    return list;
  }

  getCourseById(id) {
    return this.data.courses.find(c => c.id === id);
  }

  getTestimonials() {
    return this.data.testimonials;
  }

  async addTestimonial(testimonial) {
    const newTestimonial = {
      id: Date.now(),
      name: testimonial.name || "Anonymous Learner",
      country: testimonial.country || "International",
      flag: testimonial.flag || "🌍",
      role: testimonial.role || "Foreign Hindi Learner",
      avatar: testimonial.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(testimonial.name || 'HL')}`,
      quote: testimonial.quote,
      courseTaken: testimonial.courseTaken || "Conversational Expat Fluency",
      rating: Number(testimonial.rating) || 5,
      date: "Just now",
      verified: true
    };
    this.data.testimonials.unshift(newTestimonial);
    this.save();

    // Async save to MongoDB if connected
    try {
      if (mongoose.connection.readyState === 1) {
        await TestimonialModel.create(newTestimonial);
      }
    } catch (e) {
      console.warn("MongoDB Testimonial save notice:", e.message);
    }

    return newTestimonial;
  }

  getPhrases(filters = {}) {
    let list = [...this.data.phrases];
    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => 
        p.hindi.toLowerCase().includes(q) || 
        p.roman.toLowerCase().includes(q) || 
        p.english.toLowerCase().includes(q) ||
        p.context.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getFaqs(filters = {}) {
    let list = [...this.data.faqs];
    if (filters.category && filters.category !== 'all') {
      list = list.filter(f => f.category === filters.category);
    }
    return list;
  }

  async addBooking(bookingData) {
    const bookingId = "DEMO-" + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: "confirmed",
      zoomLink: `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}?pwd=NAMASTE-GURUJI`,
      createdAt: new Date().toISOString()
    };
    this.data.bookings.unshift(newBooking);
    this.data.stats.studentsTrained += 1;
    this.save();

    // Async save to MongoDB if connected
    try {
      if (mongoose.connection.readyState === 1) {
        await BookingModel.create({
          bookingId: newBooking.id,
          ...bookingData,
          zoomLink: newBooking.zoomLink
        });
      }
    } catch (e) {
      console.warn("MongoDB Booking save notice:", e.message);
    }

    return newBooking;
  }

  getBookings() {
    return this.data.bookings;
  }

  async addInquiry(inquiryData) {
    const newInquiry = {
      id: "INQ-" + Date.now(),
      ...inquiryData,
      createdAt: new Date().toISOString()
    };
    this.data.inquiries.unshift(newInquiry);
    this.save();

    // Async save to MongoDB if connected
    try {
      if (mongoose.connection.readyState === 1) {
        await InquiryModel.create({
          inquiryId: newInquiry.id,
          ...inquiryData
        });
      }
    } catch (e) {
      console.warn("MongoDB Inquiry save notice:", e.message);
    }

    return newInquiry;
  }

  async addSubscriber(email) {
    if (!this.data.subscribers.includes(email)) {
      this.data.subscribers.push(email);
      this.save();
    }

    // Async save to MongoDB if connected
    try {
      if (mongoose.connection.readyState === 1) {
        await SubscriberModel.updateOne({ email }, { email }, { upsert: true });
      }
    } catch (e) {
      console.warn("MongoDB Subscriber save notice:", e.message);
    }

    return { success: true, email };
  }
}

export const store = new DataStore();
