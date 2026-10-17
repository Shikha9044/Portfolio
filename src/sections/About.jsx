import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'HTML 5', percent: 95, label: '90%' },
  { name: 'CSS', percent: 85, label: '85%' },
  { name: 'Java script', percent: 60, label: '60%' },
  { name: 'SQL', percent: 85, label: '85%' },
  { name: 'React.js', percent: 80, label: '80%' },
  { name: 'MongoDB', percent: 70, label: '70%' }
];

const ABOUT_DETAILS = [
  { label: 'Profile:', value: 'Web Devlopment & also exploring Data Analytics' },
  { label: 'Domain:', value: 'Artificial intelligence & Machine learning' },
  { label: 'Education:', value: 'Bachelor of Engineering' },
  { label: 'Language:', value: 'English, Hindi' },
  { label: 'BI Tools:', value: 'Microsoft Power BI, Looker' },
  { label: 'Skills:', value: 'HTML ,CSS,DBMS ,bootstrap, javascript,Python,MongoDB,React.js' },
  { label: 'Other Skills:', value: 'power bi ,Excel, sql, library of python Matplotlib' },
  { label: 'Interest:', value: 'Gardening, Dancing, listening music, Drawing' }
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
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Job Role: </span> <span>Web Devloper</span></p>
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Experience: </span> <span>1 Inhouse intership</span></p>
                        <p><span className="title-s font-weight-bold" style={{ color: '#fff' }}>Address: </span> <span>Kanpur, India</span></p>
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
                    AS a Engineering Student have a 4years of comprehensive experience in the field of web development accompanied by a bachelor's degree in engineering.
                    Proficient in making interactive interface with advance functionality for customer.
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
                      href="https://github.com/Shikha9044?tab=repositories"
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
