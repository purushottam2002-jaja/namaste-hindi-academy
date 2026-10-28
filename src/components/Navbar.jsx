import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Sparkles, MessageCircle, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nh_theme') || 'light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nh_theme', theme);
  }, [theme]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top International Announcement Bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="top-banner-left">
            <span className="live-pulse"></span>
            <span className="badge-mini">20+ YRS EXCELLENCE</span>
            <span className="top-banner-text">
              Teaching Expats, Diplomats &amp; Travelers Worldwide (US, UK &amp; EU Timezones)
            </span>
          </div>

          <div className="top-banner-right">
            <a
              href="https://wa.me/917665441102?text=Namaste%20Guru%20Ji,%20I%20want%20to%20learn%20Hindi"
              target="_blank"
              rel="noopener noreferrer"
              className="top-wa-link"
              aria-label="Direct WhatsApp helpline"
            >
              <MessageCircle size={14} color="#25D366" />
              <span>WhatsApp: <strong>+91 76654 41102</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`site-nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-container">
          
          {/* Logo with Lotus Icon */}
          <Link to="/" className="site-logo" onClick={closeMenu} aria-label="Namaste Hindi Academy Home">
            <div className="logo-icon-box">
              <svg viewBox="0 0 40 40" className="lotus-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="url(#logo-grad-nav)" stroke="#fff" strokeWidth="1.5" />
                <path d="M20 9C20 9 23.5 15.5 23.5 19C23.5 21 21.9 22.5 20 22.5C18.1 22.5 16.5 21 16.5 19C16.5 15.5 20 9 20 9Z" fill="#fff" />
                <path d="M20 22.5C22 22.5 27 20 28.5 16C29 18.5 27.5 23 23.5 24.5C21.5 25.2 20 23.5 20 22.5Z" fill="#fed7aa" />
                <path d="M20 22.5C18 22.5 13 20 11.5 16C11 18.5 12.5 23 16.5 24.5C18.5 25.2 20 23.5 20 22.5Z" fill="#fed7aa" />
                <path d="M14 27C17 28.5 23 28.5 26 27C24.5 30 15.5 30 14 27Z" fill="#fff" />
                <defs>
                  <linearGradient id="logo-grad-nav" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f97316" />
                    <stop offset="1" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text-group">
              <div className="logo-main-title">
                Namaste<span className="logo-highlight">Hindi</span>
              </div>
              <div className="logo-sub-tag">Expat &amp; Global Academy</div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean, Single Line) */}
          <nav className="desktop-navigation" aria-label="Main Navigation">
            <ul className="nav-items-list">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/resources" className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}>
                  Phrasebook
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}>
                  Contact &amp; FAQ
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Header Actions */}
          <div className="nav-actions-group">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-btn"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              type="button"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Quick WhatsApp Pill */}
            <a
              href="https://wa.me/917665441102?text=Namaste%20Guru%20Ji,%20I%20want%20to%20learn%20Hindi"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-wa-btn"
              title="Chat with Guru Ji on WhatsApp"
              aria-label="Chat with Guru Ji on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            {/* Single Prominent Book Free Demo CTA */}
            <Link to="/contact" className="cta-nav-button pulse-effect">
              <Sparkles size={16} className="sparkle-anim" />
              <span>Book Free Demo</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="hamburger-btn"
              aria-label="Open mobile navigation menu"
              type="button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with 100% Solid Opaque Independent Layer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-root">
          <div className="drawer-backdrop" onClick={closeMenu} />
          <aside className="mobile-drawer-panel" aria-label="Mobile Navigation">
            <div className="drawer-header">
              <div className="site-logo">
                <div className="logo-icon-box" style={{ width: '38px', height: '38px' }}>
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#ea580c" />
                    <path d="M20 9C20 9 23.5 15.5 23.5 19C23.5 21 21.9 22.5 20 22.5C18.1 22.5 16.5 21 16.5 19C16.5 15.5 20 9 20 9Z" fill="#fff" />
                  </svg>
                </div>
                <div className="logo-text-group">
                  <div className="logo-main-title" style={{ fontSize: '1.2rem' }}>
                    Namaste<span className="logo-highlight">Hindi</span>
                  </div>
                </div>
              </div>

              <button onClick={closeMenu} className="close-drawer-btn" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <nav className="drawer-links-nav">
              <Link to="/" onClick={closeMenu} className="drawer-link-item">
                <span>Home</span> <ChevronRight size={16} />
              </Link>
              <Link to="/about" onClick={closeMenu} className="drawer-link-item">
                <span>About Guru Ji</span> <ChevronRight size={16} />
              </Link>
              <Link to="/courses" onClick={closeMenu} className="drawer-link-item">
                <span>Courses &amp; Tuition Plans</span> <ChevronRight size={16} />
              </Link>
              <Link to="/resources" onClick={closeMenu} className="drawer-link-item">
                <span>Free Audio Phrasebook</span> <ChevronRight size={16} />
              </Link>
              <Link to="/contact" onClick={closeMenu} className="drawer-link-item">
                <span>Contact &amp; FAQ</span> <ChevronRight size={16} />
              </Link>
            </nav>

            <div className="drawer-footer-actions">
              <Link to="/contact" onClick={closeMenu} className="cta-nav-button" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem', padding: '0.85rem' }}>
                <Sparkles size={16} /> Book Free 30-Min Demo
              </Link>
              <a
                href="https://wa.me/917665441102?text=Namaste%20Guru%20Ji,%20I%20want%20to%20learn%20Hindi"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-wa-btn"
              >
                <MessageCircle size={18} color="#25D366" /> Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
