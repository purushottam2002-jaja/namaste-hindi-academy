import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Heart, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission */}
          <div>
            <div className="brand-link" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-symbol">
                <span className="devanagari" style={{ color: '#fff' }}>ह</span>
              </div>
              <div className="brand-text">
                <h2>Namaste Hindi</h2>
                <span>Global Expat Academy</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Bridging continents and cultures through patient, conversational Hindi instruction tailored for Western and international learners. Over 20 years of personalized mentorship.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://wa.me/917665441102"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <MessageCircle size={16} color="#10b981" /> WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Curriculum &amp; Pages</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-muted)' }}>About Guru Ji (20+ Yrs Exp)</Link></li>
              <li><Link to="/courses" style={{ color: 'var(--text-muted)' }}>Courses &amp; Tuition Plans</Link></li>
              <li><Link to="/resources" style={{ color: 'var(--text-muted)' }}>Free Audio Phrasebook</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-muted)' }}>Book Free Trial Class</Link></li>
            </ul>
          </div>

          {/* Courses For Specific Audiences */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Targeted Programs</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem', color: 'var(--text-muted)' }}>
              <li>&bull; Hindi for Expats &amp; Diplomats</li>
              <li>&bull; Travel &amp; Survival Hindi (Bargaining &amp; Autos)</li>
              <li>&bull; NRI Spouses &amp; In-Laws Immersion</li>
              <li>&bull; Yoga &amp; Ayurveda Sanskrit-Hindi Terminology</li>
              <li>&bull; Devanagari Reading in 14 Days</li>
            </ul>
          </div>

          {/* Global Operations & Timezones */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Global Class Hours</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Online 1-on-1 classes scheduled across your local time:
            </p>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <li><strong>US East/West:</strong> 06:00 AM – 11:00 PM EST</li>
              <li><strong>Europe &amp; UK:</strong> 07:00 AM – 09:00 PM GMT</li>
              <li><strong>Australia &amp; Japan:</strong> Flexible slots</li>
            </ul>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              Email: purushottamjaga89@gmail.com
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Namaste Hindi Academy. 20+ Years of Hindi Teaching for Foreign Learners.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Made with <Heart size={14} color="#ea580c" fill="#ea580c" /> for lovers of Indian culture worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
