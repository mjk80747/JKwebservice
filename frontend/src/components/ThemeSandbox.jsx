import React, { useState } from 'react';
import { Eye, Palette, Type, Square, Moon, Sun } from 'lucide-react';

const ThemeSandbox = () => {
  const [theme, setTheme] = useState('gold'); // gold, emerald, rose, cyan
  const [font, setFont] = useState('serif'); // serif, sans, mono
  const [borderStyle, setBorderStyle] = useState('rounded'); // rounded, sharp, goldFrame
  const [mode, setMode] = useState('dark'); // dark, light

  const themes = {
    gold: { primary: '#dfb76c', bgCard: '#121218', bgLight: '#fcfaf4', textDark: '#f4f4f5', textLight: '#1c1917', glow: 'rgba(223, 183, 108, 0.2)' },
    emerald: { primary: '#34d399', bgCard: '#0f1715', bgLight: '#f0fdf4', textDark: '#f4f4f5', textLight: '#14532d', glow: 'rgba(52, 211, 153, 0.2)' },
    rose: { primary: '#fb7185', bgCard: '#1c1012', bgLight: '#fff1f2', textDark: '#f4f4f5', textLight: '#881337', glow: 'rgba(251, 113, 133, 0.2)' },
    cyan: { primary: '#22d3ee', bgCard: '#09141a', bgLight: '#ecfeff', textDark: '#f4f4f5', textLight: '#164e63', glow: 'rgba(34, 211, 238, 0.2)' }
  };

  const fonts = {
    serif: "'Outfit', 'Georgia', serif",
    sans: "'Inter', sans-serif",
    mono: "monospace"
  };

  const borders = {
    rounded: '16px',
    sharp: '0px',
    goldFrame: '8px'
  };

  const currentTheme = themes[theme];
  const isDark = mode === 'dark';

  const cardStyle = {
    background: isDark ? currentTheme.bgCard : currentTheme.bgLight,
    borderColor: borderStyle === 'goldFrame' ? currentTheme.primary : 'rgba(255, 255, 255, 0.08)',
    borderWidth: borderStyle === 'goldFrame' ? '3px' : '1px',
    borderStyle: 'solid',
    borderRadius: borders[borderStyle],
    padding: '2rem',
    transition: 'all 0.4s ease',
    fontFamily: fonts[font],
    color: isDark ? '#f4f4f5' : '#18181b',
    boxShadow: `0 10px 30px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.06)'}, 0 0 20px ${currentTheme.glow}`,
    maxWidth: '420px',
    width: '100%',
    margin: '0 auto',
    position: 'relative'
  };

  return (
    <div className="glass-panel" style={{ padding: '2.5rem', marginTop: '2.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Palette size={20} /> Design Sandbox Playground
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Interact with this sandbox simulator to test style presets on the fly.
        </p>
      </div>

      <div className="grid-2">
        {/* Sandbox menu card preview */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={cardStyle}>
            {/* Visual accent overlay */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              color: currentTheme.primary
            }}>
              Chef's Special
            </div>

            <span style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: currentTheme.primary,
              fontWeight: 500
            }}>
              Signature Main Course
            </span>

            <h4 style={{
              fontSize: '1.7rem',
              margin: '0.5rem 0',
              fontWeight: 700,
              color: isDark ? '#ffffff' : '#000000',
              lineHeight: '1.2'
            }}>
              Pan-Seared Dry-Aged Ribeye
            </h4>

            <p style={{
              fontSize: '0.9rem',
              opacity: 0.8,
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Tender 45-day aged steak, brushed with organic grass-fed rosemary truffle butter, accompanied by roasted garlic bulb and charred baby asparagus.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
              paddingTop: '1.2rem'
            }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: currentTheme.primary }}>
                $48.50
              </span>
              <button className="btn" style={{
                background: currentTheme.primary,
                color: theme === 'gold' ? '#000' : '#fff',
                border: 'none',
                padding: '0.5rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Book a Table
              </button>
            </div>
          </div>
        </div>

        {/* Sandbox controllers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          {/* Color palette options */}
          <div>
            <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Palette size={14} /> Brand Color Accent
            </span>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              {Object.keys(themes).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: themes[t].primary,
                    border: theme === t ? '3px solid #ffffff' : 'none',
                    cursor: 'pointer',
                    boxShadow: theme === t ? '0 0 10px rgba(255,255,255,0.4)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Typography options */}
          <div>
            <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Type size={14} /> Font Scale Family
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setFont('serif')} 
                className={`btn ${font === 'serif' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1 }}
              >
                Classic Serif
              </button>
              <button 
                onClick={() => setFont('sans')} 
                className={`btn ${font === 'sans' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1 }}
              >
                Modern Sans
              </button>
              <button 
                onClick={() => setFont('mono')} 
                className={`btn ${font === 'mono' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1 }}
              >
                Tech Mono
              </button>
            </div>
          </div>

          {/* Card Border styling */}
          <div>
            <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Square size={14} /> Layout Corner Presets
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setBorderStyle('rounded')} 
                className={`btn ${borderStyle === 'rounded' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1 }}
              >
                Rounded Soft
              </button>
              <button 
                onClick={() => setBorderStyle('sharp')} 
                className={`btn ${borderStyle === 'sharp' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1 }}
              >
                Sharp Sharp
              </button>
              <button 
                onClick={() => setBorderStyle('goldFrame')} 
                className={`btn ${borderStyle === 'goldFrame' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1 }}
              >
                Thick Accent Border
              </button>
            </div>
          </div>

          {/* Light / Dark selector */}
          <div>
            <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {isDark ? <Moon size={14} /> : <Sun size={14} />} Color Mode Theme
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setMode('dark')} 
                className={`btn ${isDark ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1, display: 'flex', gap: '0.4rem', alignItems: 'center', justifyContent: 'center' }}
              >
                <Moon size={12} /> Deep Velvet Dark
              </button>
              <button 
                onClick={() => setMode('light')} 
                className={`btn ${!isDark ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', flexGrow: 1, display: 'flex', gap: '0.4rem', alignItems: 'center', justifyContent: 'center' }}
              >
                <Sun size={12} /> Cream Warm Light
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThemeSandbox;
