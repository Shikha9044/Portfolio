import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'React.js & Next.js', percent: 92, label: '92%' },
  { name: 'JavaScript & Python', percent: 88, label: '88%' },
  { name: 'MERN Stack & Node.js', percent: 86, label: '86%' },
  { name: 'REST APIs & Express.js', percent: 88, label: '88%' },
  { name: 'MongoDB & PostgreSQL', percent: 82, label: '82%' },
  { name: 'Tailwind CSS & CSS3', percent: 90, label: '90%' }
];

const ABOUT_DETAILS = [
  { label: 'Profile:', value: 'Software Engineer (MERN Stack, React.js, Next.js)' },
  { label: 'Education:', value: 'B.Tech in Computer Science and Engineering (CGPA: 7.91/10)' },
  { label: 'College:', value: 'Allenhouse Institute of Technology, Kanpur' },
  { label: 'Phone:', value: '+91-9044090276' },
  { label: 'Email:', value: 'shikhaagrahari076@gmail.com' },
  { label: 'Languages:', value: 'English, Hindi' },
  { label: 'DevOps & Tools:', value: 'Docker, Kubernetes, CI/CD, Git, GitHub, Bitbucket, Amplitude, GA4, Clarity' },
  { label: 'AI Tooling:', value: 'Claude, GitHub Copilot, AI-Assisted Coding & Test Generation' }
];

export default function About() {
  const sectionRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Column Slide In
      gsap.from('.gsap-about-left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
      });

      // Right Column Content Slide In
      gsap.from('.gsap-about-right', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Skill Progress Bars Fill
      gsap.from('.progress-bar-fill', {
        scrollTrigger: {
          trigger: '.skill-mf',
          start: 'top 85%'
        },
        width: '0%',
        duration: 1.4,
        ease: 'power2.out',
        stagger: 0.15
      });

      // Animated Counter 0 -> 5
      const counterObj = { count: 0 };
      gsap.to(counterObj, {
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 90%'
        },
        count: 5,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(counterObj.count);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ftco-about img ftco-section ftco-no-pb" id="about-section" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="row d-flex align-items-stretch">
            {/* Left Column: Image, Quick Info, Skills Progress */}
            <div className="col-md-6 col-lg-5 d-flex gsap-about-left">
              <div className="img-about img d-flex align-items-stretch" style={{ width: '100%' }}>
                <div className="overlay" style={{ width: '100%' }}>
                  <div className="row">
                    <div className="col-sm-6 col-md-5">
                      <div className="about-img">
                        <img
                          src="/assets/shikha.jpg"
                          className="img-fluid rounded b-shadow-a"
                          alt="Shikha Agrahari"
                          style={{ width: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    {/* Details next to profile image */}
                    <div className="col-sm-6 col-md-7">
                      <div className="about-info">
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Name: </span> <span>Shikha Agrahari</span></p>
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Job Role: </span> <span>Software Engineer</span></p>
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Experience: </span> <span>ReactJS Intern @ Unifers.ai & Blue Planet</span></p>
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Address: </span> <span>Kanpur, Uttar Pradesh, India</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Skills bars with GSAP animation */}
                  <div className="skill-mf" style={{ marginTop: '25px' }}>
                    <p className="title-s" style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>
                      Skills
                    </p>
                    {SKILLS.map((skill, idx) => (
                      <div key={idx} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: '#e6e6e6', fontSize: '14px' }}>{skill.name}</span>
                          <span style={{ color: 'var(--color-4)', fontSize: '14px', fontWeight: '600' }}>{skill.label}</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-fill"
                            role="progressbar"
                            style={{ width: `${skill.percent}%` }}
                            aria-valuenow={skill.percent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Detailed Info, Projects Counter */}
            <div className="col-md-6 col-lg-7 pl-lg-5 pb-5 gsap-about-right">
              <div className="row justify-content-start pb-3">
                <div className="col-md-12 heading-section">
                  <h1 className="big">About</h1>
                  <h2 className="mb-4">About Me</h2>

                  <p style={{ lineHeight: '1.8', color: 'var(--color-3)' }}>
                    Software Engineer with hands-on experience in the MERN stack, React.js, and Next.js, building responsive, scalable web applications with REST API integration. Skilled in debugging production issues, optimizing frontend performance, and using analytics tools (Amplitude, GA4, Clarity) to improve user experience.
                  </p>

                  <ul className="about-info mt-4 px-md-0 px-2" style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {ABOUT_DETAILS.map((item, idx) => (
                      <li key={idx} className="d-flex" style={{ marginBottom: '10px', fontSize: '15px' }}>
                        <span style={{ width: '130px', minWidth: '130px', fontWeight: '600', color: '#fff' }}>
                          {item.label}
                        </span>
                        <span style={{ color: 'var(--color-3)' }}>{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="counter-wrap d-flex mt-md-3">
                <div className="text">
                  <p className="mb-4" style={{ fontSize: '20px', color: '#fff' }}>
                    <span ref={counterRef} className="number font-weight-bold" style={{ color: 'var(--color-4)', fontSize: '36px' }}>
                      0
                    </span>{' '}
                    <span style={{ color: 'var(--color-4)', fontSize: '30px' }}>+</span>
                    <span>&nbsp; Projects completed</span>
                  </p>
                  <p>
                    <a
                      href="https://github.com/ShikhaAgrahari"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary py-3 px-4"
                    >
                      Github
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
