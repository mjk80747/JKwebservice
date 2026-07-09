import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertTriangle, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoggingIn(true);
    try {
      await login(email, password, false);
      navigate('/dashboard'); // Go to standard workspace dashboard
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Invalid credentials. Please verify details.');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <section style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '450px' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src="/logo.jpg" alt="JK Web Solutions Logo" style={{ height: '60px', width: '60px', borderRadius: '12px', marginBottom: '1.2rem', border: '1px solid rgba(223, 183, 108, 0.3)', boxShadow: '0 0 15px rgba(223, 183, 108, 0.1)' }} />
            <h1 style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Client Portal Sign In</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Access your workspace timeline and messages.
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

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={12} /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@restaurant.com"
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
              {loggingIn ? 'Authenticating...' : 'Sign In'} <ArrowRight size={14} />
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '1.5rem'
          }}>
            New restaurant owner?{' '}
            <Link to="/signup" style={{ color: 'var(--gold)', fontWeight: 500 }}>
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Login;
