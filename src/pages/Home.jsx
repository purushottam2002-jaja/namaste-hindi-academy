import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Award, Users, BookOpen, ArrowRight, ShieldCheck, Smile, Calendar, Video, Play, Volume2, Star } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { api } from '../services/api';

export default function Home() {
  const [stats, setStats] = useState({
    yearsExperience: 20,
    studentsTrained: 1450,
    countriesReached: 42,
    fluencySuccessRate: "98%"
  });

  const [testimonials, setTestimonials] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, testimonialsData, phrasesData] = await Promise.all([
          api.getStats(),
          api.getTestimonials(),
          api.getPhrases()
        ]);
        if (statsData) setStats(statsData);
        if (testimonialsData && testimonialsData.length > 0) setTestimonials(testimonialsData);
        if (phrasesData && phrasesData.length > 0) setPhrases(phrasesData);
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const defaultPhrases = [
    { hindi: 'नमस्ते', roman: 'Namaste', english: 'Hello / Universal Respect' },
    { hindi: 'आप कैसे हैं?', roman: 'Aap kaise hain?', english: 'How are you? (Polite)' },
    { hindi: 'भैया, मीटर से चलोगे?', roman: 'Bhaiya, meter se chaloge?', english: 'Will you go by meter? (Auto)' }
  ];

  const soundboardPhrases = phrases.length > 0 ? phrases.slice(0, 3) : defaultPhrases;

  return (
    <div>
      {/* SECTION 1: Hero Section with Real Photo & Dynamic Audio Soundboard */}
      <section className="hero-wrapper">
        <div className="container hero-grid">
          <div>
            <div className="badge floating-element">
              <Sparkles size={14} />
              {stats.yearsExperience}+ Years Mentoring International Learners
            </div>
            <h1 className="hero-h1">
              Speak Fluent <span className="devanagari-highlight">हिंदी</span> With Confidence &amp; Cultural Charm.
            </h1>
            <p className="hero-p">
              Stop memorizing robotic textbook drills. Learn conversational Hindi from a veteran Indian educator who has guided over {stats.studentsTrained ? stats.studentsTrained.toLocaleString() : '1,450'}+ expats, diplomats, travelers, and foreign spouses across {stats.countriesReached || 42} countries.
            </p>

            <div className="hero-actions-row">
              <Link to="/contact" className="cta-nav-button pulse-effect" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>
                <Sparkles size={18} /> Book Free 30-Min Demo Class
              </Link>
              <Link to="/courses" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}>
                View Course Modules
              </Link>
            </div>

            {/* Live Stats from Node Backend */}
            <div className="hero-stats-row">
              <div className="stat-box">
                <h3>{stats.yearsExperience}+</h3>
                <p>Years Teaching Expats</p>
              </div>
              <div className="stat-box">
                <h3>{stats.studentsTrained ? stats.studentsTrained.toLocaleString() : '1,450'}+</h3>
                <p>Foreign Students Taught</p>
              </div>
              <div className="stat-box">
                <h3>{stats.fluencySuccessRate || '98%'}</h3>
                <p>Conversational Fluency</p>
              </div>
            </div>
          </div>

          {/* Hero Media Showcase Card (Real Teacher + Floating Pronunciation Soundboard) */}
          <div className="hero-media-card">
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Pandit Rajeshwar Sharma - 20+ Years Experienced Hindi Teacher"
                loading="eager"
              />
              <div className="hero-img-badge">
                <span className="live-pulse"></span>
                <span>Pandit Rajeshwar Sharma (Guru Ji)</span>
              </div>
            </div>

            {/* Floating Audio Soundboard */}
            <div className="floating-sound-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Click &amp; Hear Authentic Hindi:</strong>
                <span className="badge-mini" style={{ background: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>Audio</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {soundboardPhrases.map((phrase, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <span className="phrase-hindi" style={{ fontSize: '1.1rem' }}>{phrase.hindi}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{phrase.roman || phrase.phonetic}</div>
                    </div>
                    <AudioPlayer text={phrase.hindi} label={phrase.english} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Trusted International Community & Institutional Recognition */}
      <section style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '2.5rem 0', background: 'var(--bg-card)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Trusted by Professionals &amp; Scholars From Global Institutions Worldwide
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.9 }}>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏛️ Diplomatic Enclaves (US, UK &amp; EU)
            </span>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎓 Fulbright &amp; Heidelberg Scholars
            </span>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💼 Google &amp; Amazon India Expats
            </span>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌐 United Nations (UN) Personnel
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Target Audience: Who We Teach with High-Res Photos */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <div className="badge">Specialized For International Minds</div>
            <h2 className="section-title">Designed Specifically For Non-Native English Speakers</h2>
            <p className="section-subtitle">
              School textbooks treat adults like Indian kindergarteners. Our 20-year curriculum is reverse-engineered around how Western minds process verbs and social hierarchies.
            </p>
          </div>

          <div className="grid-4">
            {/* Card 1: Expats & Diplomats */}
            <div className="photo-feature-card">
              <div className="card-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  alt="Expats & Diplomats in India"
                />
                <span className="card-category-tag">Expats &amp; Diplomats</span>
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">Work &amp; Living in India</h3>
                <p className="card-p">
                  Relocated to Delhi, Mumbai, or Bengaluru? Build effortless rapport with domestic staff, drivers, landlords, and Indian colleagues.
                </p>
              </div>
            </div>

            {/* Card 2: NRI Spouses & In-Laws */}
            <div className="photo-feature-card">
              <div className="card-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
                  alt="Indian Wedding & Family Traditions"
                />
                <span className="card-category-tag">Spouses &amp; In-Laws</span>
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">Connect with In-Laws</h3>
                <p className="card-p">
                  Married into an Indian family? Surprise your in-laws at Diwali gatherings by understanding conversations and speaking with heartfelt respect.
                </p>
              </div>
            </div>

            {/* Card 3: Travelers & Yogis */}
            <div className="photo-feature-card">
              <div className="card-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80"
                  alt="Travelers in India"
                />
                <span className="card-category-tag">Travelers &amp; Yogis</span>
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">India Backpacking</h3>
                <p className="card-p">
                  Traveling through Rajasthan, Varanasi, or Kerala? Learn to bargain confidently, navigate railways, and unlock genuine Indian hospitality.
                </p>
              </div>
            </div>

            {/* Card 4: Scholars & Indologists */}
            <div className="photo-feature-card">
              <div className="card-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="International Scholar learning Hindi"
                />
                <span className="card-category-tag">Scholars &amp; Students</span>
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">Academic Research</h3>
                <p className="card-p">
                  Need Hindi for South Asian research or literature? Master both colloquial street Hindi and refined formal grammatical registers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Free Demo Class Section with Live Zoom Preview */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="badge">Experience It Live</div>
              <h2 className="section-title">What Happens in Your Free 30-Minute Demo Class?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                You should never pay a single rupee before experiencing our teaching style. In your private 30-minute Zoom call, Guru Ji will:
              </p>

              <div className="demo-agenda-box" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div className="demo-step">
                  <span className="demo-step-time">00 – 10m</span>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem' }}>Vocal Accent &amp; Tongue Check</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Master tricky Indian sounds (ट, ठ, ड) with anatomical tongue-placement tricks.</p>
                  </div>
                </div>

                <div className="demo-step">
                  <span className="demo-step-time">10 – 20m</span>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem' }}>Speak 3 Real Sentences On The Call</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Practice ordering customized tea and negotiating fares with instant feedback.</p>
                  </div>
                </div>

                <div className="demo-step">
                  <span className="demo-step-time">20 – 30m</span>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.95rem' }}>Custom Learning Roadmap</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Honest guidance on whether Live, Recorded, or Hybrid suits your timeline.</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="cta-nav-button pulse-effect" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                Reserve Your Free Demo Call Now <ArrowRight size={18} />
              </Link>
            </div>

            {/* Real Zoom Video Grid Mockup with Actual Faces */}
            <div className="zoom-classroom-box">
              <div className="zoom-top-bar">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="live-pulse"></span>
                  Live 1-on-1 Zoom Classroom Preview
                </span>
                <span>HD 1080p &bull; Secure</span>
              </div>

              <div className="zoom-video-grid">
                <div className="zoom-participant">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
                    alt="Teacher Guru Ji"
                  />
                  <span className="zoom-caption-tag">Pandit Rajeshwar (Guru Ji)</span>
                </div>

                <div className="zoom-participant">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Student Sarah M."
                  />
                  <span className="zoom-caption-tag">Sarah M. (San Francisco, USA)</span>
                </div>
              </div>

              <div style={{ background: '#070a12', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} /> Patient vocal correction &bull; No shame
                </span>
                <span style={{ color: '#94a3b8' }}>1,450+ foreign students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dynamic Student Testimonials from API */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <div className="badge">Student Stories (Live Dynamic Wall)</div>
            <h2 className="section-title">Loved by Foreign Learners Worldwide</h2>
            <p className="section-subtitle">Real experiences from students who went from zero to chatting comfortably in India.</p>
          </div>

          <div className="grid-3">
            {testimonials.slice(0, 3).map((item) => (
              <div key={item.id} className="student-card">
                <div style={{ display: 'flex', gap: '0.25rem', color: '#f59e0b', marginBottom: '0.75rem' }}>
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" />
                  ))}
                </div>
                <p className="student-quote">
                  "{item.quote}"
                </p>
                <div className="student-meta">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="student-photo"
                  />
                  <div>
                    <div className="student-name">{item.name} {item.flag}</div>
                    <div className="student-location">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Pedagogy Breakdown (Why Expats Learn 3x Faster) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Pedagogy Breakdown</div>
            <h2 className="section-title">Why Expats Learn 3x Faster With Guru Ji</h2>
            <p className="section-subtitle">Compare conventional grammar schools with our conversational immersion approach.</p>
          </div>

          <div className="grid-2">
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                ❌ Typical School Methods
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-muted)' }}>
                <li>&bull; Forces you to memorize 44 Devanagari script letters before speaking a word.</li>
                <li>&bull; Focuses on archaic formal grammar you will never hear on Delhi streets.</li>
                <li>&bull; Leaves students paralyzed with fear over masculine vs feminine noun endings.</li>
                <li>&bull; Zero guidance on cultural hierarchy (accidentally insulting elders with 'Tu').</li>
              </ul>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '2px solid var(--brand-primary)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ color: 'var(--brand-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                ✅ Guru Ji's 20-Year Method
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> Speak practical complete sentences on Day 1 using Roman phonetics.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> Real street roleplay (autos, fruit vendors, restaurant spice levels).
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> 'Aap-First Safety Protocol' so you never offend Indian in-laws or colleagues.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> 24/7 WhatsApp voice-note feedback directly from Guru Ji between lessons.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA Banner */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Experience Your Free Demo?</h2>
            <p>
              Book a complimentary 30-minute diagnostic session with Guru Ji. We will assess your goals, teach you 5 practical Hindi phrases, and build your custom learning roadmap.
            </p>
            <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--brand-primary)', fontWeight: 800, padding: '1rem 2.2rem', fontSize: '1.05rem' }}>
              Claim Your Free 30-Min Demo Class &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
