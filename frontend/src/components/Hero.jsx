import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Users, ShoppingBag } from 'lucide-react';

const Hero = () => {
  const words = [
    "Fine Dining Masterpieces.",
    "Artisan Café Workspaces.",
    "Cloud Kitchen Tech hubs.",
    "Vibrant Sushi Bar Lounges."
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayedText(currentFullWord.substring(0, displayedText.length + 1));
        
        if (displayedText === currentFullWord) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1500);
        } else {
          timer = setTimeout(handleTyping, 80);
        }
      } else {
        // Deleting characters
        setDisplayedText(currentFullWord.substring(0, displayedText.length - 1));

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          timer = setTimeout(handleTyping, 300);
        } else {
          timer = setTimeout(handleTyping, 40);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section style={{
      padding: '7rem 0 5rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow graphics */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(223,183,108,0.06) 0%, rgba(0,0,0,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(223, 183, 108, 0.08)',
            border: '1px solid rgba(223, 183, 108, 0.2)',
            borderRadius: '50px',
            padding: '0.4rem 1.2rem',
            color: 'var(--gold)',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '2rem'
          }}>
            <Sparkles size={14} />
            <span>Award-Winning Restaurant Web Development</span>
          </div>

          <h1 style={{
            fontSize: '3.6rem',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto 1.5rem auto'
          }}>
            We Engineer Immersive Digital Portals for <br />
            <span style={{ 
              color: 'var(--gold)', 
              borderRight: '2px solid var(--gold)',
              paddingRight: '4px',
              animation: 'blink 0.75s step-end infinite'
            }} className="gold-glow-text">
              {displayedText || '\u00A0'}
            </span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.15rem',
            maxWidth: '650px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.7'
          }}>
            Move beyond static PDF menus. Elevate your restaurant brand with custom-tailored, fluidly animated platforms configured for reservation, ordering, and revenue CRM.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <Link to="/portfolio" className="btn btn-primary">
              Browse Designs <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Let's Talk Agency
            </Link>
          </div>
        </div>

        {/* Agency Highlights section */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', padding: '0.8rem', borderRadius: '12px', background: 'rgba(223,183,108,0.1)', color: 'var(--gold)', marginBottom: '1rem' }}>
              <TrendingUp size={24} />
            </div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-light)', marginBottom: '0.3rem' }}>+40%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Average Booking Conversion Gain</p>
          </div>

          <div>
            <div style={{ display: 'inline-flex', padding: '0.8rem', borderRadius: '12px', background: 'rgba(223,183,108,0.1)', color: 'var(--gold)', marginBottom: '1rem' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-light)', marginBottom: '0.3rem' }}>100%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>High-Quality Custom Tailored UX</p>
          </div>

          <div>
            <div style={{ display: 'inline-flex', padding: '0.8rem', borderRadius: '12px', background: 'rgba(223,183,108,0.1)', color: 'var(--gold)', marginBottom: '1rem' }}>
              <ShoppingBag size={24} />
            </div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-light)', marginBottom: '0.3rem' }}>$0</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monthly Marketplace Commission Fees</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
