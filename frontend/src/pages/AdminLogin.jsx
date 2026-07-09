import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoggingIn(true);
    try {
      await login(email, password, true); // isAdmin = true
      navigate('/admin/dashboard'); // Go to administrator dashboard
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Access Denied: verification failed.');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <section style={{ padding: '6.5rem 0' }}>
      <div className="container" style={{ maxWidth: '450px' }}>
        <div className="glass-panel animate-fade-in" style={{
          padding: '3rem 2.5rem',
          border: '1px solid rgba(223, 183, 108, 0.35)',
          boxShadow: '0 8px 32px 0 rgba(223, 183, 108, 0.08)'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src="/logo.jpg" alt="JK Web Solutions Logo" style={{ height: '60px', width: '60px', borderRadius: '12px', marginBottom: '1.2rem', border: '1px solid rgba(223, 183, 108, 0.3)', boxShadow: '0 0 15px rgba(223, 183, 108, 0.1)' }} />
            <h1 style={{ fontSize: '1.9rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Administrator Login</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Enter superuser credentials to access CRM pipelines and statistics.
            </p>
          </div>

          {errorMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)',
              color: 'var(--accent-rose)',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={12} /> Admin Account Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jkwebsolutions.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lock size={12} /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
              />
            </div>

            <button type="submit" disabled={loggingIn} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {loggingIn ? 'Accessing Secure Channels...' : 'Access Dashboard'} <ArrowRight size={14} />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
