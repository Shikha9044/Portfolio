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
    category: 'Internship',
    company: 'Blue Planet Infosolutions Pvt Ltd',
    role: 'Frontend Developer',
    duration: 'Professional Internship',
    bullets: [
      'Completed an internship where I gained hands-on experience in Frontend development and real-world project workflows.',
      'Developed and improved web-based applications, participated in debugging, testing, and implementing modern features.',
      'Collaborated with development teams to enhance system functionality while learning industry practices such as version control, problem solving, and agile development.'
    ],
    tags: ['React.js', 'JavaScript', 'Frontend Development', 'Version Control', 'Agile']
  },
  {
    id: 1,
    number: '02',
    category: 'In-House Training',
    company: 'Allenhouse Institute of Technology',
    role: 'Web Development Student Lead',
    duration: 'CSE Department [AI & ML]',
    bullets: [
      'Worked directly with the AIT-Coordinator of Computer Science and Engineering department.',
      'Computer Science Engineering [Artificial Intelligence and Machine Learning] | Allen house institute of Technology.',
      'Engineered interactive, dynamic web interfaces with advanced functionality for students and staff.'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'AI & ML', 'Web Design']
  },
  {
    id: 2,
    number: '03',
    category: 'Practical Experience',
    company: 'Data Analytics Practice',
    role: 'Data Analyst',
    duration: 'Self-Driven Practice & Projects',
    bullets: [
      "While I haven't had the opportunity to work as a data analyst in a formal setting, I have been deeply involved in self-driven projects and hands-on practice to develop my skills.",
      'Through tools like Python, SQL, and Excel, I analyzed datasets, created visualizations, and derived actionable insights.',
      'Analyzed public datasets on sales and customer trends to identify patterns and built interactive dashboards using modern analytical workflows.'
    ],
    tags: ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'Pandas']
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
                href="https://drive.google.com/drive/folders/1fJFElB-zwtJgS6QnCwHtL8P_DTUa_Da3"
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
