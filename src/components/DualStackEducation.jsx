import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaGraduationCap,
  FaCode,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
  FaUniversity,
  FaCheckCircle
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_ITEMS = [
  {
    id: 0,
    number: '01',
    status: 'In Progress · 2022 - 2026',
    degree: 'Bachelor of Engineering (B.Tech)',
    department: 'Computer Science & Engineering [AI & ML]',
    institution: 'Allenhouse Institute of Technology',
    location: 'Rooma, Kanpur, U.P.',
    grade: 'First Class Distinction',
    period: '2022 - 2026',
    icon: FaCode,
    crestCode: 'B.TECH CSE [AI & ML]',
    crestSub: 'Artificial Intelligence & Machine Learning',
    emblemTag: 'AIT KANPUR',
    description:
      'Pursuing Bachelor of Technology in Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning. Building extensive hands-on expertise in algorithm design, intelligent models, and modern full-stack web applications.',
    tags: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Structures & Algorithms',
      'Full-Stack Web Dev',
      'Python & SQL',
      'React.js'
    ]
  },
  {
    id: 1,
    number: '02',
    status: 'Completed · 2020 - 2022',
    degree: 'Intermediate (Class XII)',
    department: 'Senior Secondary — Science & Mathematics (PCM)',
    institution: 'Vidya Niketan Education Centre',
    location: 'Kanpur, U.P.',
    grade: 'First Class Distinction',
    period: '2020 - 2022',
    icon: FaGraduationCap,
    crestCode: 'INTERMEDIATE [PCM]',
    crestSub: 'Physics, Chemistry & Mathematics',
    emblemTag: 'VNEC KANPUR',
    description:
      'Completed Senior Secondary education with First Class Distinction in the Science and Mathematics stream. Built a strong analytical and quantitative foundation through advanced coursework in higher mathematics and physics, nurturing a passion for technology and engineering.',
    tags: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Fundamentals',
      'Analytical Problem Solving'
    ]
  },
  {
    id: 2,
    number: '03',
    status: 'Completed · 2018 - 2020',
    degree: 'High School (Class X)',
    department: 'Matriculation — General Sciences & Computing',
    institution: 'Vidya Niketan Education Centre',
    location: 'Kanpur, U.P.',
    grade: 'First Class Distinction',
    period: '2018 - 2020',
    icon: FaAward,
    crestCode: 'HIGH SCHOOL [CLASS X]',
    crestSub: 'Science, Mathematics & IT Foundation',
    emblemTag: 'VNEC KANPUR',
    description:
      'Graduated secondary school matriculation with First Class Distinction. Demonstrated comprehensive academic excellence across core scientific disciplines, mathematics, and introductory computer applications, establishing early logical and problem-solving skills.',
    tags: [
      'Mathematics',
      'General Science',
      'Information Technology',
      'Logical Reasoning',
      'Academic Distinction'
    ]
  }
];

export default function DualStackEducation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const autoPlayRef = useRef(null);

  const stageRef = useRef(null);
  const deckARef = useRef(null);
  const deckBRef = useRef(null);

  // Keep ref synchronized with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Initial layout positioning for 3D card stacks
  const applyStackPositions = useCallback((active) => {
    if (!deckARef.current || !deckBRef.current) return;

    const cardsA = deckARef.current.children;
    const cardsB = deckBRef.current.children;
    const total = EDUCATION_ITEMS.length;

    for (let i = 0; i < total; i++) {
      const cardA = cardsA[i];
      const cardB = cardsB[i];
      if (!cardA || !cardB) continue;

      const offset = (i - active + total) % total;

      if (offset === 0) {
        // Active Front Card
        gsap.set([cardA, cardB], {
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          zIndex: 10,
          pointerEvents: 'auto'
        });
      } else if (offset === 1) {
        // Second card stacked behind (in depth)
        gsap.set([cardA, cardB], {
          x: 10,
          y: 0,
          z: -45,
          rotateY: 0,
          rotateZ: 0,
          scale: 0.95,
          opacity: 0.45,
          zIndex: 5,
          pointerEvents: 'none'
        });
      } else {
        // Third card stacked furthest back
        gsap.set([cardA, cardB], {
          x: 18,
          y: 0,
          z: -90,
          rotateY: 0,
          rotateZ: 0,
          scale: 0.9,
          opacity: 0.2,
          zIndex: 2,
          pointerEvents: 'none'
        });
      }
    }
  }, []);

  // GSAP Dual-Stack Flip Animation (Matching Tutorial 056 from Made With GSAP)
  const flipCards = useCallback((direction = 1) => {
    if (isAnimatingRef.current) return;
    if (!deckARef.current || !deckBRef.current) return;

    isAnimatingRef.current = true;
    const current = activeIndexRef.current;
    const total = EDUCATION_ITEMS.length;
    const next = (current + direction + total) % total;
    const third = (next + direction + total) % total;

    const cardsA = deckARef.current.children;
    const cardsB = deckBRef.current.children;

    const curCardA = cardsA[current];
    const curCardB = cardsB[current];
    const nextCardA = cardsA[next];
    const nextCardB = cardsB[next];
    const thirdCardA = cardsA[third];
    const thirdCardB = cardsB[third];

    const tl = gsap.timeline({
      onComplete: () => {
        applyStackPositions(next);
        setActiveIndex(next);
        isAnimatingRef.current = false;
      }
    });

    // 1. Deck A active card flips outward left, twists in 3D and weaves past Deck B
    tl.to(curCardA, {
      x: direction > 0 ? -110 : 110,
      y: -28,
      z: 150,
      rotateY: direction > 0 ? -36 : 36,
      rotateZ: direction > 0 ? -12 : 12,
      scale: 1.05,
      duration: 0.42,
      ease: 'power2.inOut'
    })
      .set(curCardA, { zIndex: 1 })
      .to(curCardA, {
        x: 18,
        y: 0,
        z: -90,
        rotateY: 0,
        rotateZ: 0,
        scale: 0.9,
        opacity: 0.2,
        duration: 0.58,
        ease: 'back.out(2)'
      });

    // 2. Deck B active card flips outward right, trades angles and weaves across depth
    tl.to(
      curCardB,
      {
        x: direction > 0 ? 110 : -110,
        y: 28,
        z: 170,
        rotateY: direction > 0 ? 36 : -36,
        rotateZ: direction > 0 ? 10 : -10,
        scale: 1.05,
        duration: 0.42,
        ease: 'power2.inOut'
      },
      0
    )
      .set(curCardB, { zIndex: 1 }, 0.42)
      .to(
        curCardB,
        {
          x: 18,
          y: 0,
          z: -90,
          rotateY: 0,
          rotateZ: 0,
          scale: 0.9,
          opacity: 0.2,
          duration: 0.58,
          ease: 'back.out(2)'
        },
        0.42
      );

    // 3. Incoming next cards ascend smoothly to front
    tl.to(
      [nextCardA, nextCardB],
      {
        x: 0,
        y: 0,
        z: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        duration: 0.65,
        ease: 'power3.out'
      },
      0.18
    );

    // 4. Middle card moves into offset position
    if (thirdCardA && thirdCardB && third !== current) {
      tl.to(
        [thirdCardA, thirdCardB],
        {
          x: 10,
          y: 0,
          z: -45,
          scale: 0.95,
          opacity: 0.45,
          zIndex: 5,
          duration: 0.55,
          ease: 'power2.out'
        },
        0.18
      );
    }
  }, []);

  // Apply initial layout once mounted
  useEffect(() => {
    applyStackPositions(0);
  }, [applyStackPositions]);

  // Entrance scroll animation using GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(stageRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 1,
        ease: 'power3.out'
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  // Auto-play timer (flips every 5s, pauses on hover)
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        flipCards(1);
      }, 5000);
    };

    startAutoPlay();

    const stageEl = stageRef.current;
    const pause = () => clearInterval(autoPlayRef.current);
    const resume = () => startAutoPlay();

    if (stageEl) {
      stageEl.addEventListener('mouseenter', pause);
      stageEl.addEventListener('mouseleave', resume);
    }

    return () => {
      clearInterval(autoPlayRef.current);
      if (stageEl) {
        stageEl.removeEventListener('mouseenter', pause);
        stageEl.removeEventListener('mouseleave', resume);
      }
    };
  }, [flipCards]);

  const currentItem = EDUCATION_ITEMS[activeIndex];

  return (
    <div className="dual-stack-section">
      <div className="dual-stack-stage" ref={stageRef}>
        {/* Header Bar */}
        <div className="dual-stage-header">
          <div className="dual-stage-badge">
            <span className="dual-pulse-dot"></span>
            <span>Academic Qualifications</span>
            <span className="dual-gsap-tag">GSAP Dual-Stack Flip</span>
          </div>

          <div className="dual-controls">
            <div className="dual-counter">
              <span className="dual-counter-current">{currentItem.number}</span>
              <span> / 0{EDUCATION_ITEMS.length}</span>
            </div>

            <button
              className="dual-nav-btn"
              onClick={() => flipCards(-1)}
              aria-label="Previous Education"
              title="Previous (GSAP Flip)"
            >
              <FaChevronLeft />
            </button>
            <button
              className="dual-nav-btn"
              onClick={() => flipCards(1)}
              aria-label="Next Education"
              title="Next (GSAP Flip)"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* 3D Arena with Synchronized Dual Decks */}
        <div className="dual-arena">
          {/* Deck A: Left Visual Emblem Stack (medias-a) */}
          <div
            className="dual-deck dual-deck-a"
            ref={deckARef}
            onClick={() => flipCards(1)}
            title="Click to Flip (GSAP 3D Animation)"
          >
            {EDUCATION_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={`deckA-${item.id}`} className="dual-card dual-card-visual">
                  {/* Top Bar */}
                  <div className="visual-top-bar">
                    <span className="visual-idx">{item.number}</span>
                    <span className="visual-status-pill">{item.period}</span>
                  </div>

                  {/* Center Emblem */}
                  <div className="visual-center-emblem">
                    <div className="visual-icon-wrap">
                      <Icon />
                    </div>
                    <div className="visual-degree-code">{item.crestCode}</div>
                    <div className="visual-specialization">{item.crestSub}</div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="visual-bottom-bar">
                    <span className="visual-institution-name">{item.emblemTag}</span>
                    <span className="visual-location">{item.location}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deck B: Right Text & Details Stack (medias-b) */}
          <div
            className="dual-deck dual-deck-b"
            ref={deckBRef}
            onClick={() => flipCards(1)}
            title="Click to Flip (GSAP 3D Animation)"
          >
            {EDUCATION_ITEMS.map((item) => (
              <div key={`deckB-${item.id}`} className="dual-card dual-card-info">
                <div>
                  <div className="info-header">
                    <span className="info-year-pill">{item.period}</span>
                    <span className="info-grade-pill">
                      <FaCheckCircle style={{ marginRight: '6px', color: '#ffffff' }} />
                      {item.grade}
                    </span>
                  </div>

                  <h3 className="info-title">{item.degree}</h3>
                  <div className="info-institution">
                    <FaUniversity style={{ marginRight: '8px', color: 'var(--text-white)' }} />
                    {item.institution}
                  </div>

                  <p className="info-description">{item.description}</p>
                </div>

                <div className="info-tags">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="info-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Pagination */}
        <div className="dual-dots">
          {EDUCATION_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              className={`dual-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                if (idx !== activeIndex) {
                  const dir = idx > activeIndex ? 1 : -1;
                  flipCards(dir);
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
