import React from 'react';
import { FaLinkedinIn, FaGithub, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="ftco-footer ftco-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="footer-social-icons">
              <a
                href="https://www.linkedin.com/in/shikha-agrahari"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/ShikhaAgrahari"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="GitHub"
              >
                <FaGithub />
              </a>
            </div>

            <p style={{ color: 'var(--color-3)', fontSize: '0.9rem', marginBottom: '8px' }}>
              Copyright &copy; {new Date().getFullYear()} All rights reserved | Made with{' '}
              <FaHeart style={{ color: 'var(--color-4)', fontSize: '0.8rem' }} /> by{' '}
              <a href="#home-section" onClick={scrollToTop} style={{ color: 'var(--color-4)' }}>
                Shikha Agrahari
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
