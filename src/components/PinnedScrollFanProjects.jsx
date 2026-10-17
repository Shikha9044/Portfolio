import React, { useState, useEffect, useRef } from 'react';
import { FaExternalLinkAlt, FaGithub, FaEye, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import whackImg from '../assets/image.png';
import careCrewImg from '../assets/image copy.png';
import weatherImg from '../assets/image copy 5.png';
import allenEateryImg from '../assets/image copy 4.png';
import ecommImg from '../assets/Screenshot (145).png';
import elementumImg from '../assets/Screenshot (2043).png';
import mistvaleImg from '../assets/Screenshot (2044).png';

gsap.registerPlugin(ScrollTrigger);

const FAN_PROJECTS = [
  {
    id: 0,
    stamp: 'MISTVALE',
    cityTag: 'TEA E-COMMERCE',
    title: 'Mistvale Artisan Tea Platform',
    tagline: '"More than a Tea, It\'s a Feeling — Sip Nature\'s Goodness"',
    description:
      'Modern, premium artisan tea brand storefront and e-commerce web platform deployed on Vercel. Features interactive whole-leaf tea catalogs, tasting notes, delivery coverage checker, brewing guides, and smooth responsive ordering workflows.',
    image: mistvaleImg,
    accentColor: '#10b981',
    cardGradient: 'linear-gradient(145deg, #09261a 0%, #03140d 60%, #010805 100%)',
    tags: ['React.js', 'Vercel', 'E-Commerce', 'UI/UX Design', 'Responsive'],
    liveUrl: 'https://mistavale-assessment-5knm.vercel.app/',
    githubUrl: 'https://github.com/Shikha9044'
  },
  {
    id: 1,
    stamp: 'ELEMENTUM',
    cityTag: 'CREATIVE STUDIO',
    title: 'Elementum Studio Platform',
    tagline: '"The Thinkers and Doers Changing the Status Quo"',
    description:
      'High-end creative studio and digital agency platform deployed on Vercel. Features modern editorial typography, interactive agency team roster, dynamic services showcase, and sleek responsive layout.',
    image: elementumImg,
    accentColor: '#ec4899',
    cardGradient: 'linear-gradient(145deg, #2b0b26 0%, #140412 60%, #080108 100%)',
    tags: ['React.js', 'Vercel', 'UI/UX Design', 'Modern Frontend', 'Responsive'],
    liveUrl: 'https://assessment-eosin-five.vercel.app/',
    githubUrl: 'https://github.com/Shikha9044'
  },
  {
    id: 2,
    stamp: 'WHACK-A-MOLE',
    cityTag: 'WEB GAME',
    title: 'Whack A Mole Game',
    tagline: '"Whack your way to victory!"',
    description:
      'Fast-paced, responsive web game built with vanilla JavaScript. Features dynamic mole popping algorithms, real-time score tracking, countdown timers, sound feedback, and responsive difficulty curves.',
    image: whackImg,
    accentColor: '#ff4d4d',
    cardGradient: 'linear-gradient(145deg, #2a0e0e 0%, #120707 60%, #080303 100%)',
    tags: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Game Engine'],
    liveUrl: 'https://shikha9044.github.io/whack-a-mole-game/',
    githubUrl: 'https://github.com/Shikha9044/whack-a-mole-game'
  },
  {
    id: 3,
    stamp: 'CARE CREW',
    cityTag: 'COMMUNITY APP',
    title: 'Care Crew Helper Website',
    tagline: 'Community Care & Volunteer Platform',
    description:
      'A community support web portal facilitating volunteer coordination, emergency requests, care worker schedules, and resident support initiatives.',
    image: careCrewImg,
    accentColor: '#ff8c00',
    cardGradient: 'linear-gradient(145deg, #2b1706 0%, #140b03 60%, #080401 100%)',
    tags: ['React.js', 'Frontend Development', 'Responsive Design', 'Agile'],
    liveUrl: null,
    githubUrl: 'https://github.com/Shikha9044'
  },
  {
    id: 4,
    stamp: 'WEATHER API',
    cityTag: 'LIVE FORECAST',
    title: 'Global Weather Intelligence',
    tagline: 'Real-Time Meteorological API System',
    description:
      'API-based meteorological platform providing instant temperature, atmospheric pressure, wind speeds, humidity, and forecast predictions for thousands of global cities.',
    image: weatherImg,
    accentColor: '#f59e0b',
    cardGradient: 'linear-gradient(145deg, #2a2007 0%, #140f03 60%, #080601 100%)',
    tags: ['Weather API', 'JavaScript', 'REST APIs', 'Async/Await'],
    liveUrl: 'https://shikha9044.github.io/Api_Weather-/',
    githubUrl: 'https://github.com/Shikha9044/Api_Weather-'
  },
  {
    id: 5,
    stamp: 'ALLEN EATERY',
    cityTag: 'ENTERPRISE SYSTEM',
    title: 'College Canteen Management System',
    tagline: 'Full-Stack Campus Food & Inventory System',
    description:
      'Software application designed to streamline college canteen operations. Manages digital menu catalogs, student orders, billing transactions, inventory tracking, and chef fulfillment workflows.',
    image: allenEateryImg,
    accentColor: '#14b8a6',
    cardGradient: 'linear-gradient(145deg, #07261f 0%, #03120f 60%, #010605 100%)',
    tags: ['PHP', 'MySQL', 'Web Engineering', 'Inventory Management'],
    liveUrl: null,
    githubUrl: 'https://github.com/Shikha9044/Final_year_Project/blob/main/README.md'
  },
  {
    id: 6,
    stamp: 'E-COMM DASHBOARD',
    cityTag: 'DATA ANALYTICS',
    title: 'Madhan-Mohan Sales Dashboard',
    tagline: 'Business Intelligence & Revenue Analytics',
    description:
      'Comprehensive e-commerce analytics dashboard visualizing multi-year sales trends, profitability by state, customer segment distribution, payment breakdowns, and inventory metrics.',
    image: ecommImg,
    accentColor: '#06b6d4',
    cardGradient: 'linear-gradient(145deg, #062229 0%, #021114 60%, #010607 100%)',
    tags: ['Power BI', 'SQL', 'Data Analytics', 'Excel', 'Data Viz'],
    liveUrl: null,
    githubUrl: 'https://github.com/Shikha9044/Madhan-Mohan-E-commerce-sale-Dashboard/blob/main/README.md'
  }
];

export default function PinnedScrollFanProjects() {
  const [selectedProject, setSelectedProject] = useState(FAN_PROJECTS[0]);
  const [spreadProgress, setSpreadProgress] = useState(1); // 0 = deck, 1 = full fan spread
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const containerRef = useRef(null);
  const deckRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);

  // Calculate fan transformation coordinates
  // Returns rotation, x, y for each card given a progress 0..1
  const getCardTransform = (index, total, progress) => {
    const center = (total - 1) / 2;
    const diff = index - center;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // Angle: from -26deg to +26deg (or -18 to +18 on mobile)
    const maxAngle = isMobile ? 18 : 26;
    const angle = (diff / center) * maxAngle * progress;

    // X displacement: from -290px to +290px (or -140px to +140px on mobile)
    const maxX = isMobile ? 140 : 290;
    const x = (diff / center) * maxX * progress;

    // Y displacement: arched curve (edges drop down slightly)
    const y = Math.pow(diff, 2) * (isMobile ? 2.2 : 3.6) * progress;

    // Subtle scale
    const scale = 1 - Math.abs(diff) * 0.02 * progress;

    return { angle, x, y, scale };
  };

  // Scatter all cards outward into radial spread with staggered spring physics
  const scatterCards = (duration = 1.1) => {
    const cards = cardsRef.current;
    const total = FAN_PROJECTS.length;
    const center = (total - 1) / 2;
    setSpreadProgress(1);

    cards.forEach((card, i) => {
      if (!card) return;
      const { angle, x, y, scale } = getCardTransform(i, total, 1);
      const distFromCenter = Math.abs(i - center);

      gsap.to(card, {
        rotation: angle,
        x: x,
        y: y,
        scale: scale,
        duration: duration,
        delay: distFromCenter * 0.08,
        ease: 'back.out(1.2)',
        overwrite: 'auto'
      });
    });
  };

  // Collapse all cards back into a stacked deck in the center
  const collapseCards = (duration = 0.7) => {
    const cards = cardsRef.current;
    const total = FAN_PROJECTS.length;
    const center = (total - 1) / 2;
    setSpreadProgress(0);

    cards.forEach((card, i) => {
      if (!card) return;
      const distFromCenter = Math.abs(i - center);

      gsap.to(card, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 0.96,
        duration: duration,
        delay: distFromCenter * 0.04,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
    });
  };

  // GSAP ScrollTrigger: Scatter all cards when user opens/scrolls into Featured Projects
  useEffect(() => {
    // Set initial stacked position before scattering
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, { rotation: 0, x: 0, y: 0, scale: 0.96 });
      }
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        onEnter: () => {
          scatterCards(1.15);
        },
        onEnterBack: () => {
          scatterCards(1.0);
        }
      });
    }, containerRef);

    // If section is already within viewport on page load/refresh, scatter immediately
    const checkTimer = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          scatterCards(1.2);
        }
      }
    }, 200);

    // Listen for hashchange (e.g. clicking "Projects" in navbar)
    const handleHashChange = () => {
      if (window.location.hash === '#project-section') {
        setTimeout(() => scatterCards(1.15), 150);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(checkTimer);
      window.removeEventListener('hashchange', handleHashChange);
      ctx.revert();
    };
  }, []);

  // Auto-play fan animation toggle (scattering and collapsing in a cycle)
  useEffect(() => {
    if (isAutoPlaying) {
      let expanding = true;
      autoPlayIntervalRef.current = setInterval(() => {
        if (expanding) {
          scatterCards(1.0);
          expanding = false;
        } else {
          collapseCards(0.7);
          expanding = true;
        }
      }, 2600);
    } else {
      clearInterval(autoPlayIntervalRef.current);
    }

    return () => clearInterval(autoPlayIntervalRef.current);
  }, [isAutoPlaying]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="pinned-fan-section" ref={containerRef}>
      <div className="fan-stage-box">
        {/* Top Header Bar */}
        <div className="fan-stage-header">
        <div className="fan-badge-wrap">
          <span className="fan-pulse-dot"></span>
          <span className="fan-badge-text">Interactive Works</span>
          <span className="fan-gsap-tag">GSAP Pinned Scroll Fan (076)</span>
        </div>

        {/* Controls: Play/Pause Auto Fan & Spread Toggle */}
        <div className="fan-controls">
          <button
            className={`fan-ctrl-btn ${spreadProgress === 0 ? 'active' : ''}`}
            onClick={() => {
              setIsAutoPlaying(false);
              collapseCards(0.7);
            }}
            title="Stack Cards into Center Deck"
          >
            Stacked Deck
          </button>

          <button
            className={`fan-ctrl-btn ${spreadProgress > 0 ? 'active' : ''}`}
            onClick={() => {
              setIsAutoPlaying(false);
              scatterCards(1.0);
            }}
            title="Scatter All Cards"
          >
            Scatter Cards
          </button>

          <button
            className="fan-ctrl-icon-btn"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            title={isAutoPlaying ? 'Pause Animation' : 'Auto Scatter & Stack Cycle'}
          >
            {isAutoPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>

      {/* Fan Cards Stage Container */}
      <div className="fan-stage">
        <div className="fan-deck" ref={deckRef}>
          {FAN_PROJECTS.map((proj, idx) => {
            const isSelected = selectedProject.id === proj.id;

            return (
              <div
                key={proj.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`fan-card ${isSelected ? 'selected' : ''}`}
                style={{
                  background: proj.cardGradient,
                  borderColor: isSelected ? proj.accentColor : 'rgba(255, 255, 255, 0.12)',
                  zIndex: isSelected ? 30 : idx + 1
                }}
                onClick={() => handleCardClick(proj)}
                title={`Click to view ${proj.title}`}
              >
                {/* Image Screenshot Frame */}
                <div className="fan-card-img-wrap">
                  <img src={proj.image} alt={proj.title} className="fan-card-img" />
                  <div
                    className="fan-card-glow"
                    style={{ background: `radial-gradient(circle, ${proj.accentColor}33 0%, transparent 70%)` }}
                  ></div>
                </div>

                {/* Big Stamp Typography matching Tutorial 076 */}
                <div className="fan-card-stamp-wrap">
                  <span className="fan-card-city" style={{ color: proj.accentColor }}>
                    {proj.cityTag}
                  </span>
                  <h3 className="fan-card-stamp">{proj.stamp}</h3>
                </div>

                {/* Bottom View Badge */}
                <div className="fan-card-footer">
                  <span className="fan-card-indicator" style={{ background: proj.accentColor }}></span>
                  <span className="fan-card-view-text">Click To Explore</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Project Full Details Drawer Panel */}
      {selectedProject && (
        <div className="fan-project-details-panel">
          <div className="fan-details-grid">
            {/* Left: Project Media Preview */}
            <div className="fan-details-media">
              <div
                className="fan-details-img-wrap"
                style={{ borderColor: selectedProject.accentColor }}
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="fan-details-img"
                />
              </div>
            </div>

            {/* Right: Detailed Content & Actions */}
            <div className="fan-details-content">
              <div className="fan-details-top">
                <span
                  className="fan-details-badge"
                  style={{
                    color: selectedProject.accentColor,
                    borderColor: `${selectedProject.accentColor}55`,
                    background: `${selectedProject.accentColor}15`
                  }}
                >
                  {selectedProject.cityTag}
                </span>
                <span className="fan-details-num">
                  0{selectedProject.id + 1} / 0{FAN_PROJECTS.length}
                </span>
              </div>

              <h2 className="fan-details-title">{selectedProject.title}</h2>
              <p className="fan-details-tagline">{selectedProject.tagline}</p>
              <p className="fan-details-desc">{selectedProject.description}</p>

              {/* Tech Stack Pills */}
              <div className="fan-details-tags">
                {selectedProject.tags.map((t, idx) => (
                  <span key={idx} className="fan-details-tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="fan-details-actions">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fan-action-btn primary"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fan-action-btn secondary"
                  >
                    <FaGithub /> View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
