import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.sendForm(
        'service_kitcb9y', // Your EmailJS Service ID
        'template_esivch8', // Your EmailJS Template ID
        formRef.current,
        '-WLZUWyIv9ceVlEXOU' // Your EmailJS Public Key
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/anubhav-n-mishra/',
      icon: '🐙',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anubhav-mishra0/',
      icon: '💼',
      color: '#0077b5'
    },
    {
      name: 'Email',
      url: 'mailto:anubhav09.work@gmail.com',
      icon: '📧',
      color: '#ea4335'
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? I'd love to hear from you!</p>
          
          <div className="social-links">
            <h3>Connect with me</h3>
            <div className="social-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">anubhav09.work@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Response Time</span>
              <span className="contact-value">Usually within 24 hours</span>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <h3>Send a Message</h3>
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="5"
              className="form-textarea"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="status-message success">
              ✅ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message error">
              ❌ Failed to send message. Please try again or email me directly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
