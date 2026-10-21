import React, { useState, useEffect, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DualStackEducation from '../components/DualStackEducation';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    id: 0,
    number: '01',
    category: 'Internship · On-Site',
    company: 'Unifers.ai',
    role: 'ReactJS Intern',
    duration: 'June 2026 – Aug 2026',
    bullets: [
      'Built responsive UI components and managed application flows using React.js and Next.js.',
      'Integrated REST APIs via Axios, handling requests, responses, loading states, and errors for reliable frontend-backend communication.',
      'Implemented Cloudflare Turnstile bot protection on login/signup flows, integrating token verification with the backend.',
      'Integrated Amplitude, GA4, and Microsoft Clarity to track user behavior and identify UI/UX issues.',
      'Debugged API failures, authentication errors, CORS issues, and integration bugs using Chrome DevTools and backend logs, then optimized API interactions and tested across scenarios to improve performance and catch edge cases.'
    ],
    tags: ['React.js', 'Next.js', 'REST APIs', 'Axios', 'Cloudflare Turnstile', 'Amplitude', 'GA4', 'Chrome DevTools']
  },
  {
    id: 1,
    number: '02',
    category: 'Internship · Remote',
    company: 'Blue Planet InfoSolutions Pvt. Ltd.',
    role: 'Frontend Intern',
    duration: 'June 2025 – Dec 2025',
    bullets: [
      'Reduced UI render time by 22% by optimizing reusable React components using memoization.',
      'Identified and resolved 8+ UI bugs, improving application performance and overall stability.',
      'Implemented Redux and Context API for scalable state management and collaborated via Bitbucket.',
      'Collaborated with a team of 6–8 members to develop and deliver project features.'
    ],
    tags: ['React.js', 'Redux', 'Context API', 'Performance Optimization', 'Memoization', 'Bitbucket', 'Agile']
  }
];

export default function Resume() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const accordionRef = useRef(null);
  const contentAnimRef = useRef(null);

  // Two-way slide content animation with GSAP
  useEffect(() => {
    const direction = activeIndex >= prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = activeIndex;

    if (contentAnimRef.current) {
      gsap.fromTo(
        contentAnimRef.current,
        {
          opacity: 0,
          x: direction * 40
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out'
        }
      );
    }
  }, [activeIndex]);

  // Scroll entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Accordion entrance
      gsap.from('.two-way-panel', {
        scrollTrigger: {
          trigger: accordionRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Download Resume CTA Button
      gsap.from('.gsap-resume-btn', {
        scrollTrigger: {
          trigger: '.gsap-resume-btn',
          start: 'top 90%'
        },
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }, accordionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ftco-section ftco-no-pb" id="resume-section">
      <div className="container">


        {/* Experience Wrapper */}
        <div className="experience-wrapper">
          {/* Experience Header */}
          <div className="row">
            <h1 className="big-4">Experience</h1>
            <div className="underline"></div>
          </div>

          {/* Two-Way Accordion Panels (Matching Tutorial 109 - MadeWithGSAP) */}
          <div className="two-way-accordion-container" ref={accordionRef}>
            {EXPERIENCES.map((exp) => {
              const isExpanded = activeIndex === exp.id;

              return (
                <div
                  key={exp.id}
                  className={`two-way-panel ${isExpanded ? 'expanded' : 'collapsed'}`}
                  onClick={() => !isExpanded && setActiveIndex(exp.id)}
                >
                  {!isExpanded ? (
                    /* Collapsed Vertical Strip State */
                    <>
                      <span className="panel-collapsed-num">{exp.number}</span>
                      <span className="panel-collapsed-title">{exp.company}</span>
                      <span className="panel-collapsed-dot"></span>
                    </>
                  ) : (
                    /* Active Expanded Panel Content (Slides in with GSAP) */
                    <div className="panel-expanded-content" ref={contentAnimRef}>
                      <div>
                        <div className="panel-content-top">
                          <span className="panel-badge">
                            {exp.number} / {exp.category}
                          </span>
                          <span className="panel-duration">{exp.duration}</span>
                        </div>

                        <h2 className="panel-title">{exp.company}</h2>
                        <div className="panel-role">{exp.role}</div>

                        <ul className="panel-bullets">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="panel-bullet-item">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="panel-tags">
                        {exp.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="panel-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Education Header */}
        <div className="row">
          <h1 className="big-4">Education</h1>
          <div className="underline"></div>
        </div>

        {/* GSAP Dual-Stack Flip Education Stage (Matching Tutorial 056 from Made With GSAP) */}
        <DualStackEducation />

        {/* Download Resume Button */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center gsap-resume-btn">
            <p>
              <a
                href="/Shikha_Agrahari_Resume.pdf"
                download="Shikha_Agrahari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary py-4 px-5"
                style={{
                  fontSize: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}
              >
                <FaDownload style={{ marginRight: '8px' }} /> Download Resume
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
