import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, HelpCircle, BookOpen, Volume2, ArrowRight, Download, FileText, Check, Award, Search, RefreshCw, Send } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { api } from '../services/api';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);

  // PDF Lead Magnet state
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadPhrases() {
      setLoading(true);
      try {
        const data = await api.getPhrases({
          category: activeCategory !== 'all' ? activeCategory : undefined,
          search: searchQuery.trim() || undefined
        });
        setPhrases(data);
      } catch (err) {
        console.error("Error loading phrases:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPhrases();
  }, [activeCategory, searchQuery]);

  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    if (!downloadEmail) return;
    setDownloadLoading(true);
    try {
      await api.subscribeNewsletter(downloadEmail);
      setDownloadSuccess(true);
      setDownloadEmail('');
    } catch (err) {
      alert(err.message || 'Download request failed');
    } finally {
      setDownloadLoading(false);
    }
  };

  const quizQuestions = [
    {
      id: 1,
      scenario: 'You are taking an auto-rickshaw in Jaipur. How should you politely address the driver?',
      options: [
        { text: 'A) "Oye driver!" (Hey driver!)', correct: false },
        { text: 'B) "Bhaiya, metro station chalenge?" (Brother, will you go to the metro station?)', correct: true },
        { text: 'C) "Hey you, come here!"', correct: false }
      ],
      explanation: 'In India, addressing service providers as "Bhaiya" (brother) or "Uncle ji" creates instant respect and warmth.'
    },
    {
      id: 2,
      scenario: 'Your Indian host asks: "Aap chai lenge?" (Will you take tea?). How do you politely accept with less sugar?',
      options: [
        { text: 'A) "Haan, kripya kam cheeni" (Yes, with less sugar please)', correct: true },
        { text: 'B) "No sweet"', correct: false },
        { text: 'C) "Nahi chahiye" (I do not want)', correct: false }
      ],
      explanation: '"Haan, kripya kam cheeni" is polite and communicates your dietary preference without causing offense.'
    }
  ];

  const handleSelectOption = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <div>
      {/* SECTION 1: Resources Hero with Live Search & Category Navigator */}
      <section className="hero-wrapper" style={{ paddingBottom: '3.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
          <div className="badge floating-element">
            <Sparkles size={14} /> Free Audio Pronunciation Engine
          </div>
          <h1 className="hero-h1">Interactive Audio Phrasebook &amp; Cultural Guides</h1>
          <p className="hero-p" style={{ margin: '0 auto 1.5rem auto' }}>
            Equip yourself with practical phrases, clear native speech audio, and essential cultural etiquette before your flight touches down in India.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '540px', margin: '0 auto 1.5rem auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search phrases in English, Hindi, or pronunciation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem 0.85rem 3rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: '🌟 All Expressions' },
              { id: 'greetings', label: '🤝 Greetings & Respect' },
              { id: 'transit', label: '🛺 Rickshaws & Cabs' },
              { id: 'dining', label: '☕ Food & Chai Culture' },
              { id: 'market', label: '🛍️ Street Bargaining' },
              { id: 'respect', label: '🙏 Politeness Essentials' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={activeCategory === tab.id ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Dynamic Phrases Display with Web Speech Audio Engine */}
      <section className="section section-subtle">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="soundboard-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Key Spoken Phrases ({phrases.length})</h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click speaker to hear authentic Delhi accent pronunciation</span>
              </div>
              <span className="badge-mini" style={{ background: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}>
                Native Speech Engine
              </span>
            </div>

            {loading ? (
              <div className="api-loading-state">
                <RefreshCw size={32} className="spinner-icon" />
                <p>Loading phrasebook database...</p>
              </div>
            ) : phrases.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No phrases found matching "{searchQuery}".</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="phrase-grid">
                {phrases.map((phrase) => (
                  <div key={phrase.id} className="phrase-item" style={{ padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)' }}>
                    <div style={{ maxWidth: '80%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                        <span className="phrase-hindi" style={{ fontSize: '1.35rem', color: 'var(--brand-primary)' }}>{phrase.hindi}</span>
                        <span className="phrase-phonetic" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>({phrase.roman})</span>
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                        {phrase.english}
                      </div>
                      {phrase.context && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          💡 <strong>Cultural context:</strong> {phrase.context}
                        </div>
                      )}
                    </div>
                    <AudioPlayer text={phrase.hindi} label={phrase.english} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Tu vs Tum vs Aap Politeness Matrix */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Crucial Cultural Etiquette</div>
            <h2 className="section-title">The "Tu vs Tum vs Aap" Respect Navigator</h2>
            <p className="section-subtitle">
              English only has "You". Hindi has three distinct levels of respect. Here is how to use them safely as an international guest.
            </p>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto', overflowX: 'auto' }}>
            <table className="politeness-table" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Hindi Word</th>
                  <th style={{ padding: '1rem' }}>Politeness Level</th>
                  <th style={{ padding: '1rem' }}>Who to Use It With</th>
                  <th style={{ padding: '1rem' }}>Foreigner Safety Rule</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem' }}><strong className="phrase-hindi" style={{ fontSize: '1.2rem', color: 'var(--brand-primary)' }}>आप (Aap)</strong></td>
                  <td style={{ padding: '1rem' }}><span style={{ color: '#10b981', fontWeight: 700 }}>Highest Respect</span></td>
                  <td style={{ padding: '1rem' }}>Elders, strangers, bosses, in-laws, shopkeepers, drivers</td>
                  <td style={{ padding: '1rem' }}><strong>Always use this by default!</strong> It guarantees respect and admiration everywhere.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem' }}><strong className="phrase-hindi" style={{ fontSize: '1.2rem', color: 'var(--brand-amber)' }}>तुम (Tum)</strong></td>
                  <td style={{ padding: '1rem' }}><span style={{ color: '#f59e0b', fontWeight: 700 }}>Informal / Familiar</span></td>
                  <td style={{ padding: '1rem' }}>Close peers, university friends, younger siblings</td>
                  <td style={{ padding: '1rem' }}>Only use when a close friend explicitly invites you to drop formalities.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem' }}><strong className="phrase-hindi" style={{ fontSize: '1.2rem', color: '#ef4444' }}>तू (Tu)</strong></td>
                  <td style={{ padding: '1rem' }}><span style={{ color: '#ef4444', fontWeight: 700 }}>Intimate / Derogatory</span></td>
                  <td style={{ padding: '1rem' }}>Childhood soulmates, deities in prayer, or arguments</td>
                  <td style={{ padding: '1rem' }}><span style={{ color: '#ef4444', fontWeight: 600 }}>Avoid completely</span> until you have lived in India for years!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: Tricky Pronunciation & Tongue Placement Guide */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <div className="badge">Vocal Anatomy</div>
            <h2 className="section-title">Mastering Tricky Hindi Sounds</h2>
            <p className="section-subtitle">
              Sounds that do not exist in English, decoded using simple tongue gymnastics.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-card" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>ट / ठ (Retroflex T)</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong>How to pronounce:</strong> Curl your tongue backwards so the tip touches the hard roof of your mouth. Release with a crisp "pop" sound (like in <em>"Tamatar"</em> - Tomato).
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-teal)', marginBottom: '0.5rem' }}>ड / ढ (Retroflex D)</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong>How to pronounce:</strong> Similar tongue curling as above, but with a deeper voiced sound from your vocal cords (like in <em>"Dhaba"</em> - roadside eatery).
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-amber)', marginBottom: '0.5rem' }}>ख / घ (Aspirated Breath)</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong>How to pronounce:</strong> Place your hand 2 inches in front of your mouth. Pronounce "K" followed by an explosive puff of air so you feel warmth on your palm (as in <em>"Khaana"</em> - Food).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Interactive Cultural Quiz */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Interactive Test</div>
            <h2 className="section-title">Test Your Cultural Instincts</h2>
            <p className="section-subtitle">See if you are ready for your first day on the streets of India.</p>
          </div>

          <div className="quiz-box" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            {quizQuestions.map((q) => (
              <div key={q.id} style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Question {q.id}: {q.scenario}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    let bg = 'var(--bg-subtle)';
                    let border = '1px solid var(--border-light)';
                    if (submitted) {
                      if (opt.correct) {
                        bg = 'rgba(16, 185, 129, 0.15)';
                        border = '1px solid #10b981';
                      } else if (isSelected && !opt.correct) {
                        bg = 'rgba(239, 68, 68, 0.15)';
                        border = '1px solid #ef4444';
                      }
                    } else if (isSelected) {
                      bg = 'var(--brand-primary-light)';
                      border = '1px solid var(--brand-primary)';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        style={{
                          textAlign: 'left',
                          padding: '0.85rem 1.25rem',
                          borderRadius: 'var(--radius-md)',
                          background: bg,
                          border: border,
                          cursor: 'pointer',
                          color: 'var(--text-main)',
                          fontWeight: isSelected ? 700 : 500
                        }}
                        type="button"
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    💡 <strong>Guru Ji's Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={() => setSubmitted(true)}
                className="btn btn-primary"
                style={{ padding: '0.85rem 2rem' }}
                type="button"
              >
                Submit Answers &amp; Check Results
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Free Downloadable Cheatsheets & Dynamic PDF Download Engine */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <div className="badge">Instant Free Downloads</div>
            <h2 className="section-title">Printable Travel Pocket Guides &amp; PDF Cheatsheet</h2>
            <p className="section-subtitle">
              Enter your email to receive our high-resolution 25-page Expat Survival PDF directly from our server.
            </p>
          </div>

          <div style={{ maxWidth: '650px', margin: '0 auto 3rem auto', background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '2px solid var(--brand-primary)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', display: 'grid', placeItems: 'center' }}>
                <FileText size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Complete 25-Page Survival Hindi Kit</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Auto haggling, street food safety, and hospital emergency terms</p>
              </div>
            </div>

            {downloadSuccess ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Your PDF Download is Ready!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  A download link has been registered. You can also download it right now below:
                </p>
                <a
                  href="#download"
                  onClick={(e) => { e.preventDefault(); alert("Starting download of 'Survival-Hindi-Kit-Guru-Ji.pdf'..."); }}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex' }}
                >
                  <Download size={16} /> Download PDF Now (3.4 MB)
                </a>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={downloadEmail}
                  onChange={(e) => setDownloadEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '240px',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  disabled={downloadLoading}
                  className="cta-nav-button"
                  style={{ padding: '0.85rem 1.75rem' }}
                >
                  {downloadLoading ? <RefreshCw size={16} className="spinner-icon" /> : <Send size={16} />}
                  <span>Get Free PDF Kit</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA Banner */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: '3rem' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Want Custom Audio Flashcards For Your Phone?</h2>
            <p>Our enrolled students receive private Anki flashcard decks and audio loops for rapid passive memorization.</p>
            <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>
              Join Our Global Student Community &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
