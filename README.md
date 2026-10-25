# Namaste Hindi Academy - React Web Application for Foreign Learners

A modern, culturally immersive, and accessible **5-page React web platform** designed specifically for **teaching conversational Hindi to international learners, expatriates, travelers, diplomats, and foreign spouses**.

Engineered with **20+ years of web architecture and language pedagogy craftsmanship**.

---

## 📁 Project Architecture & Structure

```
hindi-for-foreigners-react/
├── index.html                 # Google Fonts (Inter + Noto Sans Devanagari + Rozha One), SEO meta
├── src/
│   ├── main.jsx               # React 19 root bootstrap
│   ├── App.jsx                # React Router v7 configuration & ScrollToTop handler
│   ├── index.css              # Custom Warm Saffron & Royal Indigo Design System, Dark/Light mode
│   ├── components/
│   │   ├── Navbar.jsx         # Accessible navigation, theme toggle, mobile drawer
│   │   ├── Footer.jsx         # Global class hours, WhatsApp quick links, cultural blessings
│   │   └── AudioPlayer.jsx    # Native SpeechSynthesis (hi-IN) audio pronunciation engine
│   └── pages/
│       ├── Home.jsx           # Page 1: Hero, Live soundboard, Student stats, 4 Archetypes, Reviews
│       ├── About.jsx          # Page 2: 20-Year Story, 4 Teaching Pillars, Stumbling blocks solved
│       ├── Courses.jsx        # Page 3: 4 Structured programs, Multi-currency ($/€/£/₹) switcher
│       ├── Resources.jsx      # Page 4: Interactive Phrasebook with Audio, Tu/Tum/Aap Matrix, Quiz
│       └── Contact.jsx        # Page 5: Timezone-aware Trial booking form, WhatsApp link, FAQ Accordion
```

---

## 🌟 The 5 Dedicated Pages

1. **Home (`/`)**:
   - Welcome Hero: *"Speak Fluent हिंदी With Confidence & Cultural Charm"*
   - **Interactive Audio Pronunciation Soundboard**: Foreigners can click to hear authentic Hindi sounds (*Namaste, Aap kaise hain?, Bhaiya meter se chaloge?*).
   - Real metrics: 20+ Years teaching expats, 1,450+ students from 48 countries.
   - The 4 Student Archetypes: Expats & Diplomats, Spouses & In-Laws, Travelers & Yogis, Scholars.
   - Authentic international student reviews (USA 🇺🇸, UK 🇬🇧, Germany 🇩🇪).

2. **About Guru Ji (`/about`)**:
   - Origin Story (2004–Present): From teaching diplomats at New Delhi embassies to global online classrooms.
   - The 4 Pedagogical Pillars: *"Zero Shame" Zone*, Cultural Decoders, SVO $\rightarrow$ SOV Word Order, Street Practicums.
   - Common Foreigner Stumbling Blocks Solved (Noun Genders, Retroflex sounds ट/ठ/ड, Politeness levels).

3. **Courses & Tuition (`/courses`)**:
   - **Multi-Currency Pricing Calculator**: Learners can toggle between **USD ($)**, **EUR (€)**, **GBP (£)**, and **INR (₹)** dynamically.
   - 4 Signature Programs:
     1. *Survival Hindi for Travelers & Expats* (4 Weeks)
     2. *Conversational Fluency & Social Hindi* (12 Weeks - Flagship)
     3. *Hindi for Spouses & Indian In-Laws* (8 Weeks)
     4. *Devanagari Script Mastery & Reading* (6 Weeks)
   - What's included: HD recordings, custom PDF notes, 24/7 WhatsApp voice assistance.

4. **Free Resources & Audio Tools (`/resources`)**:
   - Filterable Interactive Phrasebook by categories: Greetings, Transport/Autos, Food & Dining, Market Bargaining.
   - Built-in Browser Voice Synthesis for native audio pronunciation.
   - **The "Tu vs Tum vs Aap" Respect Navigator Table** (Essential etiquette for foreigners).
   - **Interactive Cultural Quiz**: 3 real-world scenarios with instant score feedback.

5. **Contact & Trial Booking (`/contact`)**:
   - Timezone-Aware Trial Booking Form (US-EST, US-PST, UK-GMT, Europe-CET, Japan-JST, Australia-AEST, India-IST).
   - Direct WhatsApp helpline button for instant connection.
   - **Interactive FAQ Accordion**: Addresses foreigners' top anxieties (*"Is Hindi hard?", "Do I need the script first?", "What if I miss a class?"*).

---

## 🚀 Running the Project

```powershell
cd C:\Users\golu\.gemini\antigravity\scratch\hindi-for-foreigners-react

# Start the local development server:
npm run dev

# Or build for production:
npm run build
```
