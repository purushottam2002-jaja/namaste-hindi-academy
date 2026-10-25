import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Clock, Calendar, Users, Video, FileText, ArrowRight, PlayCircle, ShieldCheck, CreditCard, Award, HelpCircle, Search, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export default function Courses() {
  const [currency, setCurrency] = useState('USD');
  const [learningMode, setLearningMode] = useState('all'); // 'all' | 'live-1on1' | 'recorded' | 'hybrid'
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Multi-currency price conversion
  const rates = {
    USD: { symbol: '$', mult: 1 },
    EUR: { symbol: '€', mult: 0.92 },
    GBP: { symbol: '£', mult: 0.78 },
    INR: { symbol: '₹', mult: 83 }
  };

  const getPrice = (usdAmount) => {
    const { symbol, mult } = rates[currency];
    const converted = Math.round(usdAmount * mult);
    return `${symbol}${converted.toLocaleString()}`;
  };

  // Fetch courses dynamically from Node.js API
  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const data = await api.getCourses({
          deliveryMode: learningMode !== 'all' ? learningMode : undefined,
          search: searchQuery.trim() || undefined
        });
        setCourses(data);
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, [learningMode, searchQuery]);

  return (
    <div>
      {/* SECTION 1: Page Header & Currency Selector */}
      <section className="section-pad" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge floating-element">Tailored For Adult Foreigners</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
            Transparent Tuition Plans &amp; Course Tracks
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '750px', margin: '0 auto 2rem auto' }}>
            Choose between private 1-on-1 Zoom sessions, self-paced recorded video vaults, or comprehensive hybrid mentorship. All live classes include 24/7 WhatsApp audio feedback directly with Guru Ji.
          </p>

          {/* Controls: Mode Switcher & Currency Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            {/* Mode Switcher */}
            <div style={{ display: 'inline-flex', background: 'var(--bg-subtle)', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
              <button
                onClick={() => setLearningMode('all')}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  background: learningMode === 'all' ? 'var(--brand-primary)' : 'transparent',
                  color: learningMode === 'all' ? '#fff' : 'var(--text-muted)',
                  transition: 'all 200ms ease'
                }}
              >
                All Courses ({courses.length})
              </button>
              <button
                onClick={() => setLearningMode('live-1on1')}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  background: learningMode === 'live-1on1' ? 'var(--brand-primary)' : 'transparent',
                  color: learningMode === 'live-1on1' ? '#fff' : 'var(--text-muted)',
                  transition: 'all 200ms ease'
                }}
              >
                Live 1-on-1 Zoom
              </button>
              <button
                onClick={() => setLearningMode('hybrid')}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  background: learningMode === 'hybrid' ? 'var(--brand-primary)' : 'transparent',
                  color: learningMode === 'hybrid' ? '#fff' : 'var(--text-muted)',
                  transition: 'all 200ms ease'
                }}
              >
                Hybrid Mentorship
              </button>
              <button
                onClick={() => setLearningMode('recorded')}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  background: learningMode === 'recorded' ? 'var(--brand-primary)' : 'transparent',
                  color: learningMode === 'recorded' ? '#fff' : 'var(--text-muted)',
                  transition: 'all 200ms ease'
                }}
              >
                Self-Paced Vault
              </button>
            </div>

            {/* Currency Selector */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-subtle)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>CURRENCY:</span>
              {['USD', 'EUR', 'GBP', 'INR'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    background: currency === curr ? 'var(--brand-secondary)' : 'transparent',
                    color: currency === curr ? '#fff' : 'var(--text-muted)',
                    transition: 'all 150ms ease'
                  }}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Search Filter Bar */}
          <div style={{ maxWidth: '480px', margin: '1.5rem auto 0 auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by topic, e.g. survival, diplomatic, culture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Dynamic Course Grid from Node.js Backend */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="api-loading-state">
              <RefreshCw size={36} className="spinner-icon" />
              <p>Loading course modules from academy server...</p>
            </div>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
              <h3>No courses found matching "{searchQuery}"</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try clearing the search query or switching tabs.</p>
              <button onClick={() => { setSearchQuery(''); setLearningMode('all'); }} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="course-pricing-card"
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: course.badge === 'Most Popular' ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                    boxShadow: course.badge === 'Most Popular' ? 'var(--shadow-lg)' : 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Photo Banner */}
                  <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: 'var(--brand-secondary)',
                        color: '#fff',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.725rem',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}
                    >
                      {course.badge}
                    </span>
                  </div>

                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      {course.level}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                      {course.tagline}
                    </p>

                    {/* Price and Duration */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--brand-primary)' }}>
                          {getPrice(course.basePriceUSD)}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>one-time / all-inclusive</span>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{course.duration}</div>
                        <div>{course.classLength}</div>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
                      {course.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                          <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action */}
                    <Link
                      to="/contact"
                      state={{ selectedCourse: course.title }}
                      className="cta-nav-button"
                      style={{ width: '100%', justifyContent: 'center', textAlign: 'center', padding: '0.85rem' }}
                    >
                      <Sparkles size={16} /> Book Free Demo for This Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: What is Included in Every Enrollment */}
      <section className="section section-subtle">
        <div className="container">
          <div className="section-header">
            <div className="badge">The Senior Architect Standard</div>
            <h2 className="section-title">What Every Student Receives Automatically</h2>
            <p className="section-subtitle">No hidden fees, no paywalled extras. Every student gets the full enterprise learning suite.</p>
          </div>

          <div className="grid-3">
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--brand-primary)', display: 'grid', placeItems: 'center', marginBottom: '1.25rem' }}>
                <Video size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>1080p HD Class Recordings</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Never worry about taking frantic notes during class. Every live Zoom session is recorded in HD and uploaded to your personal Google Drive / student vault within 2 hours.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', display: 'grid', placeItems: 'center', marginBottom: '1.25rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>24/7 WhatsApp Audio Mentorship</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Send Guru Ji voice notes whenever you are stuck practicing in an Indian auto or restaurant. Get patient pronunciation feedback directly on your phone.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--brand-teal)', display: 'grid', placeItems: 'center', marginBottom: '1.25rem' }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>Custom PDF Cheatsheets &amp; Audio</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Download laminated, print-ready 2-page pocket guides for bargaining, restaurant dining, medical terms, and polite conversation formulas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Delivery Format Comparison Table */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Format Comparison</div>
            <h2 className="section-title">Which Learning Delivery Suits Your Lifestyle?</h2>
            <p className="section-subtitle">A clear breakdown to help you pick the right balance of live coaching and self-study.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, fontSize: '0.9rem' }}>Feature</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-primary)' }}>Live 1-on-1 Zoom</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-teal)' }}>Recorded Video Vault</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, fontSize: '0.9rem', color: '#10b981' }}>Hybrid Mentorship</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem' }}>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>Teacher Interaction</td>
                  <td style={{ padding: '1rem 1.5rem' }}>100% Private Live with Guru Ji</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Self-study videos only</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Weekly live review + Video</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>Accent &amp; Tongue Correction</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#10b981', fontWeight: 700 }}>Real-time live correction</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Self-assessment audio</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#10b981', fontWeight: 700 }}>Bi-weekly checks</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>Curriculum Pace</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Customized to your schedule</td>
                  <td style={{ padding: '1rem 1.5rem' }}>100% Self-paced</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Structured 8-week track</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>WhatsApp Voice Feedback</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#10b981', fontWeight: 700 }}>Included (Priority 24/7)</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Not included</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#10b981', fontWeight: 700 }}>Included</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>Best Suited For</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Diplomats, expats, urgent moves</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Budget-conscious self-starters</td>
                  <td style={{ padding: '1rem 1.5rem' }}>Working professionals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: 100% Risk-Free Guarantee & International Payments */}
      <section className="section section-subtle">
        <div className="container">
          <div style={{ background: 'var(--bg-card)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '2px solid rgba(16, 185, 129, 0.3)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'grid', placeItems: 'center' }}>
              <ShieldCheck size={44} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                14-Day Unconditional Fluency Guarantee
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                We stand behind our 20-year pedagogy completely. If after your first two live 1-on-1 classes you feel your pronunciation and conversational confidence are not accelerating, simply email us for a 100% prompt refund. No friction, no awkward questions.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                <span>🔒 Secure Stripe &amp; PayPal</span>
                <span>💳 Visa &bull; MasterCard &bull; Amex</span>
                <span>⚡ Wise (TransferWise)</span>
                <span>🇮🇳 UPI Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Corporate & Institutional Group Inquiries */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="badge">Corporate &amp; Diplomatic Enclaves</div>
              <h2 className="section-title">Relocating Your Entire Team to India?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                We have conducted bespoke group corporate training for multinationals, foreign embassies, and international NGOs in New Delhi, Gurugram, Bengaluru, and Hyderabad.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} color="#10b981" /> Customized industry vocabulary (tech, healthcare, logistics, diplomacy).
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} color="#10b981" /> Cultural sensitivity seminars on hierarchy, festival schedules, and non-verbal cues.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} color="#10b981" /> Direct corporate invoicing with GST and international wire support.
                </li>
              </ul>
              <Link to="/contact" className="btn btn-secondary">
                Request Corporate Proposal &rarr;
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80"
                alt="Corporate Training Room"
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%', height: '340px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Bottom CTA */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Not Sure Which Level You Need?</h2>
            <p>
              Take our free 30-minute diagnostic session. Guru Ji will assess your speech rhythm, current vocabulary, and recommend the exact module that fits your timeline.
            </p>
            <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--brand-primary)', fontWeight: 800, padding: '1rem 2.2rem', fontSize: '1.05rem' }}>
              Schedule Your Free 30-Min Demo &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
