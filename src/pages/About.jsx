import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Heart, Sparkles, CheckCircle2, Globe2, Compass, ShieldCheck, ArrowRight, Star, FileText, Check } from 'lucide-react';
import { api } from '../services/api';

export default function About() {
  const [stats, setStats] = useState({
    yearsExperience: 20,
    studentsTrained: 1450,
    countriesReached: 42,
    fluencySuccessRate: "98%"
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getStats();
        if (data) setStats(data);
      } catch (err) {
        console.error("Error loading stats for about page:", err);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      {/* SECTION 1: Hero with Guru Ji's Portrait */}
      <section className="hero-wrapper" style={{ paddingBottom: '3.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
          <div className="badge floating-element">
            <Sparkles size={14} /> Master Educator &amp; Cultural Guide
          </div>
          <h1 className="hero-h1">
            {stats.yearsExperience}+ Years of Dedication: Guiding Foreigners to Love &amp; Speak Hindi
          </h1>
          <p className="hero-p" style={{ margin: '0 auto 2rem auto' }}>
            "Teaching a foreigner your mother tongue isn't just about grammar rules. It's about opening a doorway into India's soul, hospitality, and philosophy."
          </p>
        </div>
      </section>

      {/* SECTION 2: The Origin Story (2004 - Present) */}
      <section className="section section-subtle">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="badge">The Origin Story (2004 – Present)</div>
              <h2 className="section-title">From Chanakyapuri Embassies to Global Zoom Classrooms</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                My journey began in 2004 in New Delhi. I noticed that foreign diplomats, UN staff, and visiting scholars were struggling with rigid schoolbooks that treated adult professionals like Indian kindergarteners.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                I discarded the old rote methods and developed the <strong>Natural Immersion Framework</strong>: a method specifically designed around how English and European language speakers conceptualize verbs, postpositions, and social hierarchies.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.8rem', color: 'var(--brand-primary)' }}>
                    {stats.studentsTrained ? stats.studentsTrained.toLocaleString() : '1,450'}+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Students Guided to Fluency</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.8rem', color: 'var(--brand-primary)' }}>22,000+</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hours of 1-on-1 Instruction</div>
                </div>
              </div>
            </div>

            {/* Cultural Card Visual with Real Teacher Photo */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.25rem auto', border: '4px solid var(--brand-primary)', boxShadow: 'var(--shadow-md)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
                    alt="Pandit Rajeshwar Sharma"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Pandit Rajeshwar Sharma</h3>
                <p style={{ color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.9rem' }}>Founder &amp; Principal Hindi Linguist</p>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.925rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> M.A. in Hindi Literature &amp; Applied Linguistics (DU)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> {stats.yearsExperience}+ Years Specialized Foreign Expat Pedagogy
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> Former Language Consultant for US &amp; German Embassies
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10b981" /> Cross-Cultural Trainer for Fortune 500 Execs in India
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The 4 Pedagogical Pillars with Real Photos */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Teaching Creed</div>
            <h2 className="section-title">The 4 Pillars of Our {stats.yearsExperience}-Year Method</h2>
            <p className="section-subtitle">
              How we ensure you never feel embarrassed, lost, or overwhelmed in class.
            </p>
          </div>

          <div className="grid-4">
            <div className="photo-feature-card">
              <div className="card-img-wrap" style={{ height: '160px' }}>
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80"
                  alt="Chai and conversation"
                />
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">1. The "Zero Shame" Zone</h3>
                <p className="card-p">
                  Pronunciation errors are celebrated as signs of progress. You will never feel judged for your accent or grammatical slip-ups.
                </p>
              </div>
            </div>

            <div className="photo-feature-card">
              <div className="card-img-wrap" style={{ height: '160px' }}>
                <img
                  src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80"
                  alt="Indian market spices"
                />
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">2. Cultural Decoders</h3>
                <p className="card-p">
                  We don't just translate words; we teach you why Indians nod, how hospitality works, and how to use terms like <em>"Arre yaar!"</em> naturally.
                </p>
              </div>
            </div>

            <div className="photo-feature-card">
              <div className="card-img-wrap" style={{ height: '160px' }}>
                <img
                  src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=400&q=80"
                  alt="Online video learning"
                />
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">3. Word Order Simplified</h3>
                <p className="card-p">
                  English is Subject-Verb-Object (SVO), while Hindi is Subject-Object-Verb (SOV). We teach this switch using intuitive visual sentence blocks.
                </p>
              </div>
            </div>

            <div className="photo-feature-card">
              <div className="card-img-wrap" style={{ height: '160px' }}>
                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80"
                  alt="Auto-rickshaw street"
                />
              </div>
              <div className="card-body-content">
                <h3 className="card-h3">4. Street Practicums</h3>
                <p className="card-p">
                  Simulate ordering at a Dhaba, bargaining with an auto driver, and talking to your landlord right inside our virtual classroom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Foreigner Obstacles Solved */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <div className="badge">Linguistic Solutions</div>
            <h2 className="section-title">Common Foreigner Stumbling Blocks Solved</h2>
            <p className="section-subtitle">
              How our tailored approach solves the most notorious headaches of learning Hindi for non-natives.
            </p>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.75rem', marginBottom: '1.75rem' }}>
              <div>
                <h4 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>The Difficulty: Noun Genders</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                  In Hindi, every inanimate object (from a chair to a cup of tea) is masculine or feminine, which alters the entire verb!
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--brand-primary)', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Guru Ji's Solution: Sound Rhythms</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                  We don't teach rule lists. We train your ear on <em>"-aa"</em> (masculine) vs <em>"-ee"</em> (feminine) musical patterns so your tongue instinctively picks the right ending.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.75rem', marginBottom: '1.75rem' }}>
              <div>
                <h4 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>The Difficulty: Retroflex Sounds (ट, ठ, ड)</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                  Curling the tongue backwards to pronounce sounds that do not exist in English, German, or French.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--brand-primary)', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Guru Ji's Solution: Tongue Placement Drills</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                  Using precise anatomical vocal coaching, we guide you on exact roof-of-the-mouth contact points, making these sounds natural in days.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>The Difficulty: Fear of Causing Offense</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                  Worrying about using informal words like <em>Tum</em> or <em>Tu</em> with the wrong person.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--brand-primary)', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Guru Ji's Solution: The "Aap-First" Protocol</h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                  We anchor your conversational habit in the universally polite, charming <em>Aap</em> forms, guaranteeing respect and smiles everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Institutional Advisory & Credentials Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Recognized Authority</div>
            <h2 className="section-title">Credentials, Advisory Roles &amp; Mentorship</h2>
            <p className="section-subtitle">
              Trusted by educational boards, diplomatic corps, and multinational corporations.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-card" style={{ background: 'var(--bg-card)', padding: '2rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)' }}>
              <Award size={32} color="var(--brand-primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>University of Delhi (DU)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Master of Arts in Hindi Literature &amp; Sanskrit Linguistics with highest academic honors. Research in second-language phonetic acquisition for Indo-European speakers.
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg-card)', padding: '2rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)' }}>
              <ShieldCheck size={32} color="var(--brand-teal)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Diplomatic Mission Trainer</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Appointed cultural language mentor for foreign diplomats and embassy staff stationed in New Delhi (US, German, French, and Japanese embassies).
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg-card)', padding: '2rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)' }}>
              <FileText size={32} color="var(--brand-amber)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Published Curriculum Author</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Author of <em>"Survival Hindi for Global Expats"</em> audio series and creator of the 45-module spoken Hindi phonetics audio repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Cultural & Spiritual Philosophy */}
      <section className="section section-subtle">
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
          <div className="badge">The Soul of Language</div>
          <h2 className="section-title">"भाषा केवल शब्द नहीं, आत्मा का संवाद है"</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--brand-primary)', fontWeight: 700, marginBottom: '1.5rem' }}>
            (Language is not mere words; it is a communion of souls.)
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            When you travel to India and speak to someone in their mother tongue—even just a few sentences—their faces light up. In that singular moment, you are no longer a foreign tourist or an outsider; you become an honored guest, a friend, a part of the family. That is the magic we build together in every lesson.
          </p>
          <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/contact" className="cta-nav-button pulse-effect" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              <Sparkles size={18} /> Book Your Free Demo Class
            </Link>
            <Link to="/courses" className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              Explore Tuition Programs
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA Banner */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: '3rem' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Experience The {stats.yearsExperience}-Year Difference Firsthand</h2>
            <p>Schedule a 30-minute introductory meeting directly with Guru Ji. No pushy sales, just warm mentorship.</p>
            <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>
              Book an Introductory Meeting &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
