import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils, LogOut, LayoutDashboard, ShieldAlert, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-flex">
        <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo.jpg" alt="JK Web Solutions Logo" style={{ height: '32px', width: '32px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(223, 183, 108, 0.3)' }} />
          <span>JK Web <span style={{ color: 'var(--gold)' }}>Solutions</span></span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink to="/portfolio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
              Designs Showreel
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
              Our Agency
            </NavLink>
          </li>
          <li>
            <NavLink to="/founder" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
              The Founder
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </NavLink>
          </li>

          {user ? (
            <>
              {user.role === 'admin' ? (
                <li>
                  <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--gold)' }}>
                      <ShieldAlert size={16} /> Admin CRM
                    </span>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <LayoutDashboard size={16} /> My Workspace
                    </span>
                  </NavLink>
                </li>
              )}
              
              <li style={{ marginLeft: '1rem' }} className="mobile-logout-item">
                <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <LogOut size={14} /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }} onClick={() => setIsMobileMenuOpen(false)}>
                  Hire Us
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
