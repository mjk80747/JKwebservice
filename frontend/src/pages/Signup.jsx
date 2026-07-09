import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, Phone, Utensils, AlertTriangle, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurantName: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [registering, setRegistering] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setRegistering(true);
    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.restaurantName
      );
      navigate('/dashboard'); // Go directly to dashboard
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src="/logo.jpg" alt="JK Web Solutions Logo" style={{ height: '60px', width: '60px', borderRadius: '12px', marginBottom: '1.2rem', border: '1px solid rgba(223, 183, 108, 0.3)', boxShadow: '0 0 15px rgba(223, 183, 108, 0.1)' }} />
            <h1 style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Create Client Profile</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Onboard your business to collaborate on custom website builds.
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

          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={12} /> Contact Person Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="E.g., John Doe"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={12} /> Corporate Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@company.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={12} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="E.g., +15550199"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Utensils size={12} /> Business / Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                required
                value={formData.restaurantName}
                onChange={handleInputChange}
                placeholder="E.g., Sakura Grill, Bakery, or Tech Corp"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lock size={12} /> Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum 6 characters"
                className="form-input"
              />
            </div>

            <button type="submit" disabled={registering} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {registering ? 'Creating workspace profile...' : 'Register Profile'} <ArrowRight size={14} />
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
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 500 }}>
              Sign In Here
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Signup;
