import React, { useState } from 'react';
import { PixelPerfectButton, SectionDivider } from '../components/ui';
import './ContactPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactPageProps {
  socialLinks?: {
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * ContactPage with dynamic split design
 * Black/white contrast with form and contact info
 */
export const ContactPage: React.FC<ContactPageProps> = ({
  socialLinks = {
    email: "hello@portfolio.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username"
  }
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Contact Form Submission',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section - Dark */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Let's Work Together</h1>
          <p>Have a project in mind? Let's discuss how we can bring your ideas to life.</p>
        </div>
      </section>

      {/* Notched Divider */}
      <SectionDivider 
        direction="center"
        fromColor="#0a0a0a"
        toColor="#ffffff"
        height={80}
      />

      {/* Contact Split Section - White */}
      <section className="contact-split light-section">
        {/* Left Side - Form */}
        <div className="contact-form-side">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Your name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="your@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell me about your project..."
                rows={6}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <PixelPerfectButton
              variant="primary"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </PixelPerfectButton>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="contact-info-side">
          <div className="contact-info-content">
            <h3>Get In Touch</h3>
            
            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-label">Email</span>
                <a href={`mailto:${socialLinks.email}`}>
                  {socialLinks.email}
                </a>
              </div>

              <div className="contact-method">
                <span className="method-label">Response Time</span>
                <span className="method-value">24-48 hours</span>
              </div>

              <div className="contact-method">
                <span className="method-label">Availability</span>
                <span className="method-value status-available">● Available for projects</span>
              </div>
            </div>

            <div className="social-links">
              <h4>Connect</h4>
              <div className="social-grid">
                {socialLinks.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;