import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Github, Linkedin, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#040405',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      fontSize: '0.9rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-light)',
              fontWeight: 700,
              fontSize: '1.4rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-heading)'
            }}>
              <img src="/logo.jpg" alt="JK Web Solutions Logo" style={{ height: '28px', width: '28px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(223, 183, 108, 0.3)' }} />
              <span>JK Web <span style={{ color: 'var(--gold)' }}>Solutions</span></span>
            </Link>
            <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
              We build award-winning, fluidly animated, high-converting digital storefronts and booking systems for premium restaurants and hospitality brands.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/mundlapati-jayakrishna" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: '0.3s' }}><Github size={20} /></a>
              <a href="https://linkedin.com/in/mundlapati-jayakrishna" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: '0.3s' }}><Linkedin size={20} /></a>
              <a href="#" style={{ color: 'var(--gold)', transition: '0.3s' }}><MessageCircle size={20} /></a>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-light)', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>Agency</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/about" style={{ transition: '0.3s' }} className="nav-link-sub">Our Agency</Link></li>
              <li><Link to="/founder" style={{ transition: '0.3s' }} className="nav-link-sub">The Founder</Link></li>
              <li><Link to="/portfolio" style={{ transition: '0.3s' }} className="nav-link-sub">Designs Showreel</Link></li>
              <li><Link to="/contact" style={{ transition: '0.3s' }} className="nav-link-sub">Hire Developers</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-light)', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>Sectors</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ transition: '0.3s' }}>Fine Dining</a></li>
              <li><a href="#" style={{ transition: '0.3s' }}>Artisan Cafés</a></li>
              <li><a href="#" style={{ transition: '0.3s' }}>Cloud Kitchens</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-light)', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)' }}>Support</h4>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Have questions about customized features? Get in touch.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <a href="mailto:mundlapatijayakrishna1@gmail.com" style={{
                  color: 'var(--gold)',
                  fontWeight: 500
                }}>
                  mundlapatijayakrishna1@gmail.com
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <a href="tel:+918074733591" style={{
                  color: 'var(--text-light)'
                }}>
                  +91 8074733591
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} style={{ color: 'var(--gold)', marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  Bangalore, Marathahalli - 560037
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p>© {new Date().getFullYear()} JK Web Solutions Startup Agency. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ transition: '0.3s' }}>Privacy Policy</a>
            <a href="#" style={{ transition: '0.3s' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
