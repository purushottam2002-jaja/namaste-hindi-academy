import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, MessageCircle, Sparkles, CheckCircle2, ChevronDown, Calendar, Globe, CreditCard, Video, Download, ArrowRight, Play, UserCheck, ShieldCheck, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    timezone: 'US Eastern (New York / Miami)',
    preferredSlot: 'Evening (7:00 PM - 10:00 PM)',
    nativeLanguage: 'English',
    goal: 'Expat Living & Staff Communication',
    currentLevel: 'Absolute Beginner (A0)'
  });

  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    subject: 'Corporate or Custom Tutoring Request',
    message: '',
    organization: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await api.getFaqs();
        if (data && data.length > 0) setFaqs(data);
      } catch (err) {
        console.error("Error loading FAQs:", err);
      }
    }
    loadFaqs();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.bookDemoClass(formData);
      setConfirmedBooking(response.data);
    } catch (err) {
      alert(err.message || 'Error submitting booking');
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    try {
      await api.submitInquiry(inquiryData);
      setInquirySuccess(true);
      setInquiryData({
        name: '',
        email: '',
        subject: 'Corporate or Custom Tutoring Request',
        message: '',
        organization: ''
      });
    } catch (err) {
      alert(err.message || 'Error submitting inquiry');
    } finally {
      setInquiryLoading(false);
    }
  };

  const demoAgenda = [
    {
      time: '00 – 05 min',
      title: 'Warm Welcome & Goal Discovery',
      desc: 'We learn about your specific trip, expat job, in-laws, or study goals in a zero-pressure chat.'
    },
    {
      time: '05 – 15 min',
      title: 'Vocal & Accent Diagnostic',
      desc: 'We test your pronunciation on tricky Indian sounds (ट, ठ, ड) using simple tongue-placement tricks.'
    },
    {
      time: '15 – 25 min',
      title: 'Live Street Practicum (You Speak!)',
      desc: 'You will speak your first 3 full conversational sentences on the spot (ordering chai, hailing autos).'
    },
    {
      time: '25 – 30 min',
      title: 'Custom Roadmap & Honest Advice',
      desc: 'Receive your personalized timeline and recommended track. No sales pitch, just clear guidance.'
    }
  ];

  return (
    <div>
      {/* SECTION 1: Header */}
      <section className="hero-wrapper" style={{ paddingBottom: '3.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
          <div className="badge floating-element">
            <Sparkles size={14} /> 100% Free &bull; No Credit Card Required
          </div>
          <h1 className="hero-h1">Book Your 30-Minute Free Live Demo Class</h1>
          <p className="hero-p">
            Experience our 20-year conversational method directly on Zoom with Guru Ji. Test your pronunciation, speak your first 3 sentences, and get your custom study plan.
          </p>
        </div>
      </section>

      {/* SECTION 2: Booking Form Grid + Agenda Preview */}
      <section className="section section-subtle">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
            
            {/* Form or Confirmed Receipt */}
            <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-lg)' }}>
              
              {confirmedBooking ? (
                <div className="booking-receipt-card">
                  <div className="receipt-header">
                    <div className="receipt-icon-box">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)' }}>
                        Demo Class Confirmed!
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>
                        Booking ID: {confirmedBooking.id} &bull; Status: Confirmed
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Namaste, <strong>{confirmedBooking.name}</strong>! Your complimentary 30-minute 1-on-1 diagnostic session with Pandit Rajeshwar Sharma (Guru Ji) has been reserved.
                  </p>

                  <div className="receipt-details-grid">
                    <div className="receipt-item">
                      <label>Timezone</label>
                      <span>{confirmedBooking.timezone}</span>
                    </div>
                    <div className="receipt-item">
                      <label>Preferred Window</label>
                      <span>{confirmedBooking.preferredSlot}</span>
                    </div>
                    <div className="receipt-item">
                      <label>Primary Goal</label>
                      <span>{confirmedBooking.goal}</span>
                    </div>
                    <div className="receipt-item">
                      <label>Class Format</label>
                      <span>Private 1-on-1 HD Zoom</span>
                    </div>
                  </div>

                  <div style={{ background: 'var(--brand-primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(234, 88, 12, 0.25)', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Your Private Zoom Classroom Link:
                    </div>
                    <a
                      href={confirmedBooking.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', wordBreak: 'break-all' }}
                    >
                      {confirmedBooking.zoomLink} <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="receipt-actions">
                    <a
                      href={`https://wa.me/919876543210?text=Namaste%20Guru%20Ji,%20I%20have%20booked%20my%20demo%20(ID:%20${confirmedBooking.id}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ background: '#25D366', color: '#fff', flex: 1 }}
                    >
                      <MessageCircle size={18} /> Confirm on WhatsApp
                    </a>
                    <button
                      onClick={() => setConfirmedBooking(null)}
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Reserve Your 1-on-1 Zoom Diagnostic
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Select your current timezone so Guru Ji can accommodate your local time.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    {/* Name & Email */}
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@fulbrightmail.org"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    {/* WhatsApp & Timezone */}
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                          WhatsApp Number (with country code)
                        </label>
                        <input
                          type="text"
                          placeholder="+1 (555) 019-2834"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                          Your Local Timezone *
                        </label>
                        <select
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                        >
                          <option value="US Eastern (New York / Miami)">US Eastern (New York / Miami)</option>
                          <option value="US Pacific (San Francisco / Seattle)">US Pacific (San Francisco / Seattle)</option>
                          <option value="US Central (Chicago / Dallas)">US Central (Chicago / Dallas)</option>
                          <option value="UK GMT / BST (London)">UK GMT / BST (London)</option>
                          <option value="Central Europe CET (Berlin / Paris)">Central Europe CET (Berlin / Paris)</option>
                          <option value="Australia AEST (Sydney / Melbourne)">Australia AEST (Sydney / Melbourne)</option>
                          <option value="India Standard Time (IST)">India Standard Time (IST)</option>
                          <option value="Other Global Timezone">Other Global Timezone</option>
                        </select>
                      </div>
                    </div>

                    {/* Slot & Goal */}
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                          Preferred Time Window
                        </label>
                        <select
                          value={formData.preferredSlot}
                          onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                        >
                          <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                          <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                          <option value="Evening (6:00 PM - 10:00 PM)">Evening (6:00 PM - 10:00 PM)</option>
                          <option value="Flexible / Any Time">Flexible / Any Time</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                          Primary Goal
                        </label>
                        <select
                          value={formData.goal}
                          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', fontSize: '0.9rem' }}
                        >
                          <option value="Expat Living & Staff Communication">Expat Living &amp; Staff Communication</option>
                          <option value="Diplomatic & High-Level Embassy Work">Diplomatic &amp; High-Level Embassy Work</option>
                          <option value="Indian In-Laws & Partner Family">Indian In-Laws &amp; Partner Family</option>
                          <option value="Backpacking / Yoga / Travel in India">Backpacking / Yoga / Travel in India</option>
                          <option value="Academic Research & Indology">Academic Research &amp; Indology</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="cta-nav-button pulse-effect"
                      style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem' }}
                    >
                      {loading ? <RefreshCw size={18} className="spinner-icon" /> : <Sparkles size={18} />}
                      <span>{loading ? 'Confirming with Guru Ji...' : 'Confirm Free 30-Min Demo on Zoom'}</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>🔒 100% Confidential</span>
                      <span>🚫 Zero spam guarantee</span>
                      <span>⚡ Instant Zoom confirmation</span>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right: Demo Agenda Breakdown & Teacher Card */}
            <div>
              <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={20} color="var(--brand-primary)" />
                  What We Cover in Your 30 Minutes
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {demoAgenda.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap' }}>
                        {item.time}
                      </span>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div style={{ background: 'rgba(37, 211, 102, 0.08)', border: '1px solid rgba(37, 211, 102, 0.3)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#25D366', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    Need an Immediate Answer?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Message Pandit Rajeshwar Sharma (Guru Ji) directly on WhatsApp for urgent queries.
                  </p>
                  <a
                    href="https://wa.me/919876543210?text=Namaste%20Guru%20Ji,%20I%20have%20a%20quick%20question%20about%20classes."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    Open WhatsApp Chat (+91 98765 43210) &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Direct Institutional & Corporate Inquiries */}
      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <div className="badge">Direct Channels</div>
            <h2 className="section-title">Institutional Inquiries &amp; Embassy Support</h2>
            <p className="section-subtitle">
              Need corporate invoicing, group training, or bespoke scheduling for diplomatic staff? Send us an inquiry below.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            {inquirySuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Inquiry Received</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                  Guru Ji and our academic team will review your requirements and respond within 4 business hours.
                </p>
                <button onClick={() => setInquirySuccess(false)} className="btn btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@organization.com"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Organization / Embassy (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. British High Commission, NGO, MNC"
                    value={inquiryData.organization}
                    onChange={(e) => setInquiryData({ ...inquiryData, organization: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Your Message or Special Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your team size, expected timeline, or specific curriculum needs..."
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', background: 'var(--bg-subtle)', color: 'var(--text-main)', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquiryLoading}
                  className="btn btn-secondary"
                  style={{ alignSelf: 'flex-start', padding: '0.85rem 2rem' }}
                >
                  {inquiryLoading ? <RefreshCw size={16} className="spinner-icon" /> : null}
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: Live Global Support Channels */}
      <section className="section section-subtle">
        <div className="container">
          <div className="grid-3">
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--brand-primary)', margin: '0 auto 1rem auto', display: 'grid', placeItems: 'center' }}>
                <Mail size={22} />
              </div>
              <h4 style={{ fontWeight: 800, marginBottom: '0.25rem' }}>Direct Email</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>For formal proposals &amp; receipts</p>
              <a href="mailto:guruji@namastehindi.academy" style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
                guruji@namastehindi.academy
              </a>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', margin: '0 auto 1rem auto', display: 'grid', placeItems: 'center' }}>
                <MessageCircle size={22} />
              </div>
              <h4 style={{ fontWeight: 800, marginBottom: '0.25rem' }}>WhatsApp Helpline</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Fast responses 7 days a week</p>
              <a href="https://wa.me/919876543210" style={{ fontWeight: 700, color: '#16a34a' }}>
                +91 98765 43210
              </a>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--brand-teal)', margin: '0 auto 1rem auto', display: 'grid', placeItems: 'center' }}>
                <Globe size={22} />
              </div>
              <h4 style={{ fontWeight: 800, marginBottom: '0.25rem' }}>Active Timezones</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>US, UK, Europe, Australia</p>
              <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                6:00 AM – 11:30 PM IST
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dynamic FAQ Accordion from API */}
      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header">
            <div className="badge">Frequently Asked Questions</div>
            <h2 className="section-title">Answers for International Learners</h2>
            <p className="section-subtitle">Everything you need to know about timezones, payment methods, and pedagogy.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  transition: 'border-color 150ms ease'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Trust Strip & International Payment Badges */}
      <section className="section section-subtle" style={{ padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            <span>🔒 256-Bit SSL Encrypted</span>
            <span>⚡ Instant Zoom Confirmation</span>
            <span>💳 Stripe &amp; PayPal Protected</span>
            <span>✅ Official Corporate Invoices</span>
            <span>🇮🇳 Direct Indian UPI</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: Bottom CTA */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Take Your First Step in Hindi Today</h2>
            <p>Speak three real, practical sentences in your very first 30-minute session. No pressure, no obligations.</p>
            <a
              href="#top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-secondary"
              style={{ color: 'var(--brand-primary)', fontWeight: 800 }}
            >
              Back to Booking Form &uarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
