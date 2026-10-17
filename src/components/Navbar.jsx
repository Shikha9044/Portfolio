import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NAV_ITEMS = [
  { id: 'home-section', label: 'Home' },
  { id: 'about-section', label: 'About' },
  { id: 'resume-section', label: 'Resume' },
  { id: 'project-section', label: 'Projects' },
  { id: 'contact-section', label: 'Contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const scrollPosition = scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`editorial-navbar ${isScrolled ? 'scrolled' : ''}`}
      id="ftco-navbar"
    >
      <div className="editorial-navbar-container">
        {/* Stylish Monogram Logo SA */}
        <a
          className="editorial-brand stylish-logo-link"
          href="#home-section"
          onClick={(e) => handleNavClick(e, 'home-section')}
          aria-label="SA Logo"
          title="Shikha Agrahari (SA)"
        >
          <div className="stylish-sa-badge">
            <span className="sa-text">SA</span>
            <span className="sa-glow-ring"></span>
          </div>
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          className="editorial-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div className={`editorial-nav-menu ${isOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`editorial-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
