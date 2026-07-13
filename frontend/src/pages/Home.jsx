import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
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
              <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: '0.4rem' }}>Featured Design Architectures</h2>
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

      {/* Upfront Pricing Section */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.02)' }}>
        <div className="container animate-fade-in">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Transparent Investment
            </span>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: '0.4rem', marginBottom: '1rem' }}>
              Clear, Growth-Oriented Pricing Packages
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              No hidden fees, no marketplace commissions. Choose the design package tailored to your business scale.
            </p>
          </div>

          <div className="grid-3">
            {/* Starter Plan */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Starter Archetype</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', height: '40px' }}>Perfect for local dining bistros, bakeries & single-location artisan cafés.</p>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>$800</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> / flat retainer</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '2.5rem', flexGrow: 1 }}>
                <li>✓ 1 Premium Showcase Template</li>
                <li>✓ Responsive Mobile Optimization</li>
                <li>✓ Standard Reservation Form</li>
                <li>✓ Core SEO & Search Indexing</li>
                <li>✓ 3 Months Maintenance Support</li>
              </ul>
              <Link to="/contact" className="btn btn-secondary" style={{ width: '100%' }}>Select Starter</Link>
            </div>

            {/* Growth Plan */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--gold)', boxShadow: '0 0 20px var(--gold-glow)' }}>
              <div style={{ alignSelf: 'flex-start', background: 'var(--gold)', color: '#000', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px', marginBottom: '1rem', textTransform: 'uppercase' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Growth Portal</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', height: '40px' }}>For high-volume restaurateurs looking to bypass marketplace commissions.</p>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>$1,500</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> / flat retainer</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '2.5rem', flexGrow: 1 }}>
                <li>✓ Custom Branding UI Details</li>
                <li>✓ Multi-Page Fluid Architecture</li>
                <li>✓ Advanced Booking & Reservation Engine</li>
                <li>✓ Click-and-Collect Menu Ordering</li>
                <li>✓ Stripe/PayPal Gateway Setup</li>
                <li>✓ 6 Months Priority Maintenance</li>
              </ul>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>Select Growth</Link>
            </div>

            {/* Premium Plan */}
            <div className="glass-panel glass-panel-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Premium Enterprise</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', height: '40px' }}>For fine dining chains, cloud kitchens, and premium luxury lounges.</p>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>$2,800</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> / flat retainer</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '2.5rem', flexGrow: 1 }}>
                <li>✓ 100% Bespoke Immersive Design</li>
                <li>✓ Interactive Dining Canvas Physics</li>
                <li>✓ Multi-Location CRM Dashboard Integration</li>
                <li>✓ Automated Real-Time SMS/Email Alerts</li>
                <li>✓ Comprehensive Analytics Setup</li>
                <li>✓ 12 Months VIP Dedicated Support</li>
              </ul>
              <Link to="/contact" className="btn btn-secondary" style={{ width: '100%' }}>Select Premium</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonial Section */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Client Success
            </span>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: '0.4rem' }}>What Our Clients Say</h2>
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
                <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: '0.4rem', marginBottom: '1.2rem' }}>
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
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '53% 36%', transform: 'scale(1.2)' }}
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
            <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1rem' }}>Get Digital Growth Tips</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
              Subscribe to our bi-weekly newsletter packed with conversion secrets, page optimization tips, and SEO tricks for business growth and digital expansion.
            </p>

            {subscribed ? (
              <div style={{ color: 'var(--accent-green)', fontWeight: 500 }}>
                ✓ Thank you for subscribing! We'll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form" style={{
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
