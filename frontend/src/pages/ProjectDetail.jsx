import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Calculator, Sparkles, MessageCircle, FileInput, Laptop, Star } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Pricing Builder state
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [message, setMessage] = useState('');
  const [submittingLead, setSubmittingLead] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const basePrice = 800;
  const featuresMeta = [
    { id: 'table-booking', name: 'Table Reservation Engine', price: 250 },
    { id: 'pos-integration', name: 'POS Integration System', price: 400 },
    { id: 'admin-analytics', name: 'Admin Analytics Portal', price: 300 },
    { id: 'multi-language', name: 'Multi-Language Support', price: 150 },
    { id: 'qr-code-menu', name: 'QR Code Digital Menu', price: 100 }
  ];

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
          // Set user's restaurant name by default if logged in
          if (user?.restaurantName) {
            setRestaurantName(user.restaurantName);
          }
        }
      } catch (error) {
        console.error('Error fetching project details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id, user]);

  const handleFeatureToggle = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const calculateEstimate = () => {
    let total = basePrice;
    selectedFeatures.forEach((fId) => {
      const match = featuresMeta.find((item) => item.id === fId);
      if (match) total += match.price;
    });
    return total;
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!restaurantName) {
      alert('Please provide your restaurant name.');
      return;
    }

    setSubmittingLead(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          projectId: project._id,
          restaurantName,
          selectedFeatures,
          message
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('Inquiry submitted! Auto-generating client workspace panel details...');
        setTimeout(() => {
          navigate('/dashboard'); // Go directly to dashboard workspace
        }, 1500);
      } else {
        alert(data.message || 'Error sending lead request');
      }
    } catch (error) {
      console.error(error);
      alert('Connection error submitting inquiry request');
    } finally {
      setSubmittingLead(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
        <h2>Loading template showreel details...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0' }}>
        <h2>Showcase project template not found.</h2>
        <Link to="/portfolio" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Showcases</Link>
      </div>
    );
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container animate-fade-in">
        
        {/* Core Header section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500 }}>
            {project.category} Website Archetype
          </span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.4rem' }}>{project.title}</h1>
        </div>

        {/* Dynamic Image Gallery and Live IFrame Demo */}
        <div className="grid-2" style={{ marginBottom: '4rem', gridTemplateColumns: '1.2fr 0.8fr' }}>
          
          {/* Main Slider Cover & Switcher buttons */}
          <div>
            <div className="glass-panel" style={{
              height: '420px',
              overflow: 'hidden',
              borderRadius: '16px',
              marginBottom: '1rem',
              position: 'relative',
              background: '#16161a'
            }}>
              <img 
                src={project.previewImages[activeImageIdx]} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {project.previewImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className="glass-panel"
                  style={{
                    width: '90px',
                    height: '60px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    padding: 0,
                    border: activeImageIdx === idx ? '2px solid var(--gold)' : '1px solid var(--border-color)',
                    boxShadow: activeImageIdx === idx ? '0 0 10px var(--gold-glow)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Core Tech Stack, specs, features */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Laptop size={20} /> Design Core Concept
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                {project.description}
              </p>

              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-light)', marginBottom: '0.8rem' }}>Tech Specifications</h4>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {project.techStack.map((tech, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.75rem',
                    background: 'rgba(223, 183, 108, 0.08)',
                    color: 'var(--gold)',
                    border: '1px solid rgba(223, 183, 108, 0.2)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '1.2rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Baseline Integration</span>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', margin: '0.2rem 0', fontFamily: 'var(--font-heading)' }}>
                ${basePrice} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>USD</span>
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Includes fully responsive catalog design, menu structures, and page animations.</p>
            </div>
          </div>

        </div>

        {/* Features list bullet layout */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={24} style={{ color: 'var(--gold)' }} /> Included Features & Systems
          </h2>
          <div className="grid-2">
            {project.featuresList.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-green)', marginTop: '0.2rem', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-light)' }}>{feat}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fully structured, verified, and automated for direct customer management.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Demo Iframe Integration */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Laptop size={24} style={{ color: 'var(--gold)' }} /> Live Design Sandbox Demo Screen
          </h2>
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            background: '#09090b',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <iframe 
              src={project.demoLink}
              title="Restaurant template live preview screen"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Interactive Quote Builder lead capture form */}
        <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
          
          {/* Form select addons checklist */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>
              <Calculator size={22} />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Interactive Quote Builder</h3>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Tick extra features below to calculate an immediate cost estimation for your custom web project.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {featuresMeta.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => handleFeatureToggle(feat.id)}
                    className="glass-panel"
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: isChecked ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.04)',
                      background: isChecked ? 'rgba(223, 183, 108, 0.05)' : 'rgba(255,255,255,0.01)',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => {}} // toggling handled on parent click
                        style={{ cursor: 'pointer', accentColor: 'var(--gold)' }}
                      />
                      <span style={{ fontSize: '0.95rem', color: isChecked ? '#fff' : 'var(--text-muted)' }}>
                        {feat.name}
                      </span>
                    </div>
                    <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem' }}>
                      +${feat.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form text message & lead submission button */}
          <div className="glass-panel" style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(22, 22, 28, 0.5) 0%, rgba(10, 10, 15, 0.5) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                <Sparkles size={22} />
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Initiate Project Workspace</h3>
              </div>

              <form onSubmit={handleLeadSubmit}>
                <div className="form-group">
                  <label className="form-label">Restaurant/Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Sakura Fusion Bistro"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Custom Requests</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your brand direction, logo style, menu complexity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                {successMsg && (
                  <div style={{ color: 'var(--accent-green)', fontWeight: 500, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    ✓ {successMsg}
                  </div>
                )}

                {user ? (
                  <button type="submit" disabled={submittingLead} className="btn btn-primary" style={{ width: '100%' }}>
                    {submittingLead ? 'Submitting workspace leads...' : 'Submit Inquiry & Initialize Workspace'}
                  </button>
                ) : (
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem' }}>
                      Register or login below to lock in this package quote and begin custom workspace discussions.
                    </p>
                    <Link to="/signup" className="btn btn-primary" style={{ width: '100%' }}>
                      Register Account to Order
                    </Link>
                  </div>
                )}
              </form>
            </div>

            {/* Price dynamic readout display */}
            <div style={{
              marginTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Investment</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>
                  Base ($800) + {selectedFeatures.length} Add-ons
                </p>
              </div>
              <h2 style={{ fontSize: '2rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>
                ${calculateEstimate()} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>USD</span>
              </h2>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectDetail;
