import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Utensils } from 'lucide-react';

const NotFound = () => {
  return (
    <section style={{ padding: '8rem 0', textAlign: 'center' }}>
      <div className="container animate-fade-in" style={{ maxWidth: '500px' }}>
        <div className="glass-panel" style={{ padding: '4rem 3rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '15px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-rose)', marginBottom: '1.5rem' }}>
            <HelpCircle size={48} />
          </div>
          <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '0.5rem' }}>404</h1>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Dish Not Found
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            The page you are looking for has been removed, renamed, or is temporarily unavailable on our menu.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Front Desk
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
