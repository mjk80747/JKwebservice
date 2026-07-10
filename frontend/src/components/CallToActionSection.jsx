import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Calculator } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section style={{ 
      padding: '5rem 0', 
      borderTop: '1px solid var(--border-color)',
      background: 'linear-gradient(135deg, rgba(22, 22, 28, 0.4) 0%, rgba(9, 9, 11, 0.4) 100%)'
    }}>
      <div className="container">
        <div className="glass-panel" style={{ 
          padding: '4rem 3rem', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(22, 22, 28, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <span style={{ 
            color: 'var(--gold)', 
            fontSize: '0.9rem', 
            fontWeight: 500, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase' 
          }}>
            Accelerate Growth
          </span>
          <h2 style={{ 
            fontSize: 'var(--fs-h2)', 
            marginTop: '0.4rem', 
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Ready to Build Your Custom Storefront?
          </h2>
          <p style={{ 
            color: 'var(--text-muted)', 
            maxWidth: '580px', 
            margin: '0 auto 2.5rem auto', 
            lineHeight: '1.6' 
          }}>
            Take ownership of your bookings and online orders. Schedule a call with Mundlapati Jayakrishna or run our pricing estimator to request design specs immediately.
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            flexWrap: 'wrap' 
          }}>
            <Link to="/contact" className="btn btn-primary">
              <Calendar size={16} /> Book Consultation Call
            </Link>
            <Link to="/portfolio" className="btn btn-secondary">
              <Calculator size={16} /> Get a Design Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
