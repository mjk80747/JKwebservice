import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Error logging contact request. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error submitting contact form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="container animate-fade-in">
        
        {/* Core Header section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
          <h1 style={{ fontSize: '3rem', marginTop: '0.4rem', marginBottom: '1rem' }}>
            Start Your Restaurant's Digital Transition
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Have a custom design layout or need pricing info? Drop us a note. Our agency responds within 12 business hours.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '4rem' }}>
          
          {/* Contact Details pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>Contact Information</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                We work internationally with cafe chains, Michelin restaurants, and cloud kitchen operators. Talk directly with our developers to review specifications.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{ display: 'flex', padding: '0.75rem', borderRadius: '10px', background: 'rgba(223,183,108,0.08)', color: 'var(--gold)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Business Email</h4>
                  <a href="mailto:mundlapatijayakrishna1@gmail.com" style={{ color: '#fff', fontWeight: 500 }}>mundlapatijayakrishna1@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{ display: 'flex', padding: '0.75rem', borderRadius: '10px', background: 'rgba(223,183,108,0.08)', color: 'var(--gold)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hotline Call / WhatsApp</h4>
                  <a href="tel:+918074733591" style={{ color: '#fff', fontWeight: 500 }}>+91 8074733591</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{ display: 'flex', padding: '0.75rem', borderRadius: '10px', background: 'rgba(223,183,108,0.08)', color: 'var(--gold)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Agency Headquarters</h4>
                  <p style={{ color: '#fff', fontWeight: 500 }}>Bangalore, Marathahalli - 560037</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Input Form panel */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--gold)' }}>
              <MessageSquare size={20} />
              <h3 style={{ fontSize: '1.4rem', margin: 0 }}>General Inquiries</h3>
            </div>

            {success ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'var(--accent-green)',
                fontWeight: 500
              }}>
                <h3>✓ Message Sent successfully!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Thank you for reaching out. We will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@restaurant.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="E.g., +1555..."
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify project particulars or questions..."
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
                  {submitting ? 'Transmitting details...' : 'Transmit Message'} <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
