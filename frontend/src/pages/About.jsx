import React from 'react';
import { Shield, Sparkles, Zap, Award } from 'lucide-react';
import CallToActionSection from '../components/CallToActionSection';

const About = () => {
  return (
    <div>
      <section style={{ padding: '5rem 0' }}>
      <div className="container animate-fade-in">
        
        {/* Core Header section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Our Mission
          </span>
          <h1 style={{ fontSize: 'var(--fs-h1)', marginTop: '0.4rem', marginBottom: '1rem' }}>
            Engineering Premium Web Applications
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.7' }}>
            JK Web Solutions was founded with a singular directive: to replace boring static web pages with fast, high-converting, fluid digital experiences.
          </p>
        </div>

        {/* Agency details grid */}
        <div className="grid-2" style={{ marginBottom: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1.2rem', color: '#fff' }}>Who We Are</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.2rem' }}>
              We are an elite boutique agency of digital product designers and MERN full-stack engineers. We specialize in configuring gorgeous canvas-animations, micro-interactions, and custom database platforms for restaurants, fine dining, cafés, cloud kitchens, sushi lounges, bakeries, and modern business applications.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              We believe a business website is more than an address holder; it is a high-volume conversion funnel. By integrating custom reservation engines, ordering simulators, dynamic layouts, and direct billing tools, we keep customer interactions smooth and conversion rates high.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" 
              alt="restaurant agency developers workspace"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Core values block */}
        <h2 style={{ fontSize: 'var(--fs-h2)', textAlign: 'center', marginBottom: '2.5rem', color: '#fff' }}>
          Our Founding Directives
        </h2>

        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '8px', background: 'rgba(223,183,108,0.1)', color: 'var(--gold)', marginBottom: '1rem' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Fluid Interactions</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              We engineer custom scroll engines and component overlays. A visitor is immediately hooked by slow parallax visuals and glowing hover physics.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '8px', background: 'rgba(223,183,108,0.1)', color: 'var(--gold)', marginBottom: '1rem' }}>
              <Shield size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Zero Commissions</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              Stop giving away 15% of your takeout checks to marketplace platforms. We hand you full ownership of booking and click-and-collect setups.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '8px', background: 'rgba(223,183,108,0.1)', color: 'var(--gold)', marginBottom: '1rem' }}>
              <Award size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Client Collaboration</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              Our custom workspace ensures you upload digital menus, coordinate timelines, and consult on styling changes in one secure hub.
            </p>
          </div>
        </div>

      </div>
      </section>
      <CallToActionSection />
    </div>
  );
};

export default About;
