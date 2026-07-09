import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ThemeSandbox from '../components/ThemeSandbox';
import { ArrowRight, Mail, Utensils, MessageCircle, ChevronRight, Award } from 'lucide-react';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          // Slice first 3 as featured
          setFeaturedProjects(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching featured projects', error);
      }
    };
    fetchFeatured();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div>
      <Hero />

      {/* Featured Showcases */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Showcase Gallery
              </span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem' }}>Featured Restaurant Architectures</h2>
            </div>
            <Link to="/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--gold)', fontWeight: 500 }}>
              View All Showcases <ChevronRight size={18} />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid-3">
              {featuredProjects.map((project) => (
                <div key={project._id} className="animate-fade-in">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <p>Loading premium showcases...</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Theme Sandbox Section */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Try Before Hiring
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem', marginBottom: '1rem' }}>
              Full Control Over Creative Directives
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              We build customizable component architectures. Take a look at this responsive item card simulator to experience live theme swaps instantly.
            </p>
          </div>
          <ThemeSandbox />
        </div>
      </section>

      {/* Trust & Testimonial Section */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Client Success
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem' }}>What Restaurant Owners Say</h2>
          </div>

          <div className="grid-2">
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--gold)', marginBottom: '1rem' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-light)' }}>
                "JK Web Solutions completely revolutionized our online seating strategy. We saved thousands of dollars in monthly third-party reservation fees by launching our custom portal. The interactive wine list animation wows clients every single night!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 600 }}>
                  JD
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>Jean Dupont</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Owner, L'Ambroisie Parisian Bistro</p>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--gold)', marginBottom: '1rem' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-light)' }}>
                "The dynamic pick-up menu and order stamp tracker details are fantastic. Our recurring morning sales jumped 35% in three weeks. Their custom client portal makes it extremely simple to request content changes and check timeline details."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 600 }}>
                  SA
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>Sarah Al-Mutawa</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Founder, Caffè Nero Co.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Founder Spotlight
                </span>
                <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem', marginBottom: '1.2rem' }}>
                  Engineered by Mundlapati Jayakrishna
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  Hi, I'm Jayakrishna, a MERN Full-Stack and Python Developer. I specialize in designing and optimizing high-performance applications, relational databases, and modern fluid frontends. With experience building complex SQL architectures and custom digital systems, I lead the core engineering here at JK Web Solutions.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/founder" className="btn btn-primary">
                    Learn More About Me <ArrowRight size={16} />
                  </Link>
                  <Link to="/contact" className="btn btn-secondary">
                    Get In Touch
                  </Link>
                </div>
              </div>
              <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto' }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  borderRadius: '50%',
                  border: '1px dashed var(--gold)',
                  opacity: 0.3
                }} />
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--gold)',
                  boxShadow: '0 0 15px var(--gold-glow)'
                }}>
                  <img 
                    src="/founder.jpg" 
                    alt="Mundlapati Jayakrishna portrait" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead capture Newsletter */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="glass-panel" style={{
            padding: '4rem 3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(22, 22, 28, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <Mail size={36} style={{ color: 'var(--gold)', marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Get Restaurant Digital Growth Tips</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
              Subscribe to our bi-weekly newsletter list packed with conversion secrets, menu layout optimization tips, and SEO tricks for restaurant business expansion.
            </p>

            {subscribed ? (
              <div style={{ color: 'var(--accent-green)', fontWeight: 500 }}>
                ✓ Thank you for subscribing! We'll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{
                display: 'flex',
                maxWidth: '500px',
                margin: '0 auto',
                gap: '0.5rem'
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your business email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="form-input"
                  style={{ flexGrow: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
