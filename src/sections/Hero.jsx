import React, { useEffect, useRef } from 'react';
import { FaLinkedinIn, FaGithub, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.editorial-hero-bg', {
        opacity: 0,
        scale: 1.05,
        duration: 1.5
      });

      tl.from(
        '.hero-animate-item',
        {
          opacity: 0,
          y: 25,
          stagger: 0.15,
          duration: 0.8
        },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home-section" className="editorial-hero" ref={heroRef}>
      {/* 16:9 Widescreen Image as Full Hero Background (Matching Reference) */}
      <div className="editorial-hero-bg"></div>

      {/* Floating Greeting & Pointing Arrow (Left of Image) */}
      <div className="hero-animate-item hero-left-greeting">
        <div className="greeting-text-wrap">
          <span className="greeting-intro">Hey! I Am</span>
          <h1 className="greeting-name">Shikha Agrahari.</h1>
        </div>

        {/* Curved Dashed S-Wave Arrow matching Figma Reference */}
        <div className="greeting-arrow-wrap">
          <svg
            className="greeting-curved-arrow"
            viewBox="0 0 320 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* S-wave curve: starts from picture on right, arches into gentle crest, slopes diagonally down, scoops into valley, and hooks vertically up */}
            <path
              d="M 295 48 C 245 12, 195 18, 142 56 C 92 94, 64 94, 52 45"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="2.2"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            {/* Arrowhead pointing vertically up towards the name */}
            <path
              d="M 45 56 L 52 45 L 59 56"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Spacer so face is clearly visible */}
      <div className="editorial-hero-spacer"></div>

      {/* Bottom Information Row matching Image 2 */}
      <div className="editorial-hero-bottom" ref={bottomBarRef}>
        {/* Bottom Left: Location Info */}
        <div className="hero-animate-item hero-location">
          <span className="location-icon">
            <FaMapMarkerAlt />
          </span>
          <span className="location-text">BASED IN KANPUR, INDIA</span>
        </div>

        {/* Center: Action Buttons */}
        <div className="hero-animate-item hero-actions">
          <a
            href="https://www.linkedin.com/in/shikha-agrahari"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-pill-btn"
          >
            <FaLinkedinIn /> LinkedIn
          </a>
          <a
            href="https://github.com/Shikha9044?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-pill-btn"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://drive.google.com/drive/folders/1fJFElB-zwtJgS6QnCwHtL8P_DTUa_Da3"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-pill-btn primary"
          >
            <FaFileDownload /> Resume
          </a>
        </div>

        {/* Bottom Right: Headline Role (Matching Image 2 layout) */}
        <div className="hero-animate-item hero-role">
          <h2>Web Developer</h2>
        </div>
      </div>
    </section>
  );
}
