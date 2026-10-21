import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaLinkedinIn, FaGithub, FaPaperPlane } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact Info Cards Stagger
      gsap.from('.gsap-contact-card', {
        scrollTrigger: {
          trigger: '.contact-info-row',
          start: 'top 85%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Contact Form Container Entrance
      gsap.from('.gsap-contact-form', {
        scrollTrigger: {
          trigger: '.gsap-contact-form',
          start: 'top 85%'
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, Message).'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been received. I will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section className="ftco-section" id="contact-section" ref={contactRef}>
      <div className="container">
        {/* Header */}
        <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center">
            <h1 className="big big-2">Contact</h1>
            <h2 className="mb-4">Contact Me</h2>
            <p>Feel free to get in touch with me for work, collaborations, or inquiries.</p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="row d-flex contact-info mb-5 contact-info-row">
          <div className="col-md-6 col-lg-3 d-flex gsap-contact-card">
            <div className="contact-card text-center w-100 d-flex flex-column align-items-center">
              <div className="contact-icon-box">
                <FaMapMarkerAlt />
              </div>
              <h3 className="mb-2">Address</h3>
              <p>Kanpur, Uttar Pradesh, India</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex gsap-contact-card">
            <div className="contact-card text-center w-100 d-flex flex-column align-items-center">
              <div className="contact-icon-box">
                <FaEnvelope />
              </div>
              <h3 className="mb-2">Email & Phone</h3>
              <p>
                <a href="mailto:shikhaagrahari076@gmail.com">
                  shikhaagrahari076@gmail.com
                </a>
              </p>
              <p style={{ marginTop: '4px' }}>
                <a href="tel:+919044090276" style={{ color: 'var(--color-4)', fontSize: '14px' }}>
                  +91-9044090276
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex gsap-contact-card">
            <div className="contact-card text-center w-100 d-flex flex-column align-items-center">
              <div className="contact-icon-box">
                <FaLinkedinIn />
              </div>
              <h3 className="mb-2">LinkedIn</h3>
              <p>
                <a
                  href="https://www.linkedin.com/in/shikha-agrahari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shikha Agrahari
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex gsap-contact-card">
            <div className="contact-card text-center w-100 d-flex flex-column align-items-center">
              <div className="contact-icon-box">
                <FaGithub />
              </div>
              <h3 className="mb-2">GitHub</h3>
              <p>
                <a
                  href="https://github.com/ShikhaAgrahari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @ShikhaAgrahari
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="contact-form-container gsap-contact-form">
              <h3 className="text-white text-center mb-4" style={{ fontWeight: '600' }}>
                Send a Message
              </h3>

              {status.message && (
                <div className={`form-feedback ${status.type}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <textarea
                    name="message"
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-primary py-3 px-5"
                    disabled={isSubmitting}
                    style={{ fontSize: '15px', fontWeight: '600', letterSpacing: '1px' }}
                  >
                    <FaPaperPlane style={{ marginRight: '8px' }} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
