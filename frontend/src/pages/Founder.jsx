import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Code, 
  Database, 
  Terminal, 
  ExternalLink,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle,
  FileText
} from 'lucide-react';

const Founder = () => {
  const [activeTab, setActiveTab] = useState('all');

  const skills = [
    { name: 'JavaScript', category: 'languages', rating: 90, desc: 'Advanced ES6+, Async programming, React applications' },
    { name: 'Python', category: 'languages', rating: 92, desc: 'OOP, Pandas, NumPy, Django, backend scripts' },
    { name: 'React.JS', category: 'frontend', rating: 88, desc: 'Context API, Hooks, custom components, responsive layouts' },
    { name: 'HTML5 & CSS3', category: 'frontend', rating: 95, desc: 'Symmetric grid & flexbox design, variables, animations' },
    { name: 'Node.js', category: 'backend', rating: 85, desc: 'Rest APIs, Express, authentication middlewares' },
    { name: 'Express.js', category: 'backend', rating: 86, desc: 'Routing, middleware, rate-limiting, error handlers' },
    { name: 'MongoDB', category: 'databases', rating: 84, desc: 'Mongoose schemas, aggregation pipelines, JSON documents' },
    { name: 'MySQL', category: 'databases', rating: 88, desc: 'SQL Views, subqueries, relational database schemas' },
    { name: 'Git & GitHub', category: 'tools', rating: 90, desc: 'Version control, branch management, collaborative workflows' },
    { name: 'VS Code & PyCharm', category: 'tools', rating: 92, desc: 'Development environments, debugging configurations' }
  ];

  const certifications = [
    {
      title: 'Web Developer Internship',
      provider: 'ApexPlanet',
      description: 'Internship in Web development utilizing HTML, CSS, and JavaScript to build client portfolios.',
      date: '2025'
    },
    {
      title: 'Frontend Developer',
      provider: 'Coursera',
      description: 'Introduction to Front-End Development, mastering web design principles and state management.',
      date: '2025'
    },
    {
      title: 'Artificial Intelligence Essentials',
      provider: 'Infosys Springboard',
      description: 'Foundations of AI, machine learning terminology, and ethical AI development practices.',
      date: '2025'
    },
    {
      title: 'Python Programming (Essentials 1)',
      provider: 'Cisco Networking Academy',
      description: 'Foundational programming, algorithms, scripting, and object-oriented logic in Python.',
      date: '2025'
    },
    {
      title: 'AI Agentic Hackathon/Event',
      provider: 'Algonex (held at Paytm, Bangalore)',
      description: 'Collaborative development of autonomous AI workflows and API-based assistant models.',
      date: '2026'
    }
  ];

  const experience = [
    {
      role: 'Python Developer Intern',
      company: 'Algonex IT Solutions',
      location: 'Marathahalli, Bangalore',
      period: 'January 2026 – May 2026',
      highlights: [
        'Built scalable full-stack web applications using Python, Django, MySQL, HTML5, CSS3, and JavaScript.',
        'Developed interactive CRUD-based modules with client-side form validations, database connectivity, and REST API integrations.',
        'Designed and optimized MySQL queries for efficient data storage, retrieval, and update operations.',
        'Applied Object-Oriented Programming (OOP) and advanced data structures to build robust and maintainable backend logic.',
        'Strategically designed complex SQL views and subqueries across 10+ datasets, increasing overall query efficiency by 40%.',
        'Leveraged Git, VS Code, and PyCharm for debugging, version control, and team workflow alignment.'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      institution: 'Mohan Babu University',
      location: 'Andhra Pradesh, India',
      period: 'Jun 2022 – May 2026',
      description: 'Focusing on computer science fundamentals, full-stack frameworks, database design, and software engineering methodologies.'
    },
    {
      degree: 'Intermediate (MPC - Mathematics, Physics, Chemistry)',
      institution: 'Sree Vidyanikethan International School',
      location: 'Andhra Pradesh, India',
      period: 'Sep 2020 – May 2022',
      description: 'Strong academic foundation in science and analytics.'
    }
  ];

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <section style={{ padding: '5rem 0', minHeight: '100vh' }}>
      <div className="container animate-fade-in">
        
        {/* Profile Card / Header section */}
        <div className="glass-panel" style={{ padding: '3rem', marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle gold glow behind header */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'var(--gold)',
            filter: 'blur(100px)',
            opacity: 0.15,
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem', alignItems: 'center' }} className="grid-responsive">
            <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                borderRadius: '50%',
                border: '1.5px dashed var(--gold)',
                opacity: 0.4,
                animation: 'spin 40s linear infinite'
              }} />
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--gold)',
                boxShadow: '0 0 25px var(--gold-glow)'
              }}>
                <img 
                  src="/founder.jpg" 
                  alt="Mundlapati Jayakrishna portrait" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)' }}
                  onError={(e) => {
                    // Fallback to abstract image if local portrait cannot load
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>

            <div>
              <span style={{ 
                color: 'var(--gold)', 
                fontSize: '0.9rem', 
                fontWeight: 600, 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}>
                Meet The Founder
              </span>
              <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '0.5rem' }}>
                Mundlapati Jayakrishna
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-light)', 
                fontWeight: 500, 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Code size={18} style={{ color: 'var(--gold)' }} />
                <span>Python & MERN Full-Stack Engineer</span>
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Aspiring Full-Stack Developer with knowledge of MongoDB, Express.js, React.js, and Node.js, along with a strong foundation in JavaScript, Python, and SQL. Passionate about building responsive and user-friendly web applications, solving complex database problems, and continuously implementing new technologies.
              </p>
              
              {/* Contact info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-light)' }}>
                  <Mail size={16} style={{ color: 'var(--gold)' }} />
                  <a href="mailto:mundlapatijayakrishna1@gmail.com" className="hover-gold" style={{ fontSize: '0.9rem' }}>
                    mundlapatijayakrishna1@gmail.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-light)' }}>
                  <Phone size={16} style={{ color: 'var(--gold)' }} />
                  <a href="tel:+918074733591" className="hover-gold" style={{ fontSize: '0.9rem' }}>
                    +91 8074733591
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-light)' }}>
                  <MapPin size={16} style={{ color: 'var(--gold)' }} />
                  <span style={{ fontSize: '0.9rem' }}>Bangalore, Marathahalli - 560037</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-light)' }}>
                  <Linkedin size={16} style={{ color: 'var(--gold)' }} />
                  <a href="https://linkedin.com/in/mundlapati-jayakrishna" target="_blank" rel="noopener noreferrer" className="hover-gold" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    LinkedIn profile <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn btn-primary">
                  <Mail size={16} /> Contact Founder
                </a>
                <a href="https://github.com/mundlapati-jayakrishna" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github size={16} /> GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout for Skills & Experience */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', marginBottom: '4rem' }} className="grid-responsive-equal">
          
          {/* Professional Experience Section */}
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Briefcase style={{ color: 'var(--gold)' }} size={26} />
              <span>Professional Experience</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experience.map((exp, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
                  <span style={{ 
                    position: 'absolute', 
                    top: '2.5rem', 
                    right: '2.5rem', 
                    color: 'var(--gold)', 
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    background: 'rgba(223, 183, 108, 0.08)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)'
                  }}>
                    {exp.period}
                  </span>
                  
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{exp.role}</h3>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem', fontWeight: 500 }}>{exp.company}</h4>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={14} /> {exp.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={14} /> {exp.period}
                    </span>
                  </div>

                  <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {exp.highlights.map((highlight, hidx) => (
                      <li key={hidx} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <h2 style={{ fontSize: '2.2rem', marginTop: '4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <GraduationCap style={{ color: 'var(--gold)' }} size={26} />
              <span>Education Journey</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {education.map((edu, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{edu.degree}</h3>
                      <h4 style={{ fontSize: '1rem', color: 'var(--gold)', fontWeight: 500 }}>{edu.institution}</h4>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{edu.period}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Skills Panel */}
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Terminal style={{ color: 'var(--gold)' }} size={26} />
              <span>Technical Skills</span>
            </h2>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              {/* Tab Filters */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {['all', 'languages', 'frontend', 'backend', 'databases', 'tools'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: activeTab === tab ? 'var(--gold)' : 'var(--border-color)',
                      background: activeTab === tab ? 'var(--gold)' : 'transparent',
                      color: activeTab === tab ? '#000' : 'var(--text-muted)',
                      textTransform: 'capitalize',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Skills Progress list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredSkills.map((skill, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                      <span style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600 }}>{skill.rating}%</span>
                    </div>
                    {/* Bar background */}
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.3rem' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${skill.rating}%`, 
                        background: 'linear-gradient(90deg, var(--gold) 0%, #ffffff 100%)',
                        borderRadius: '3px',
                        boxShadow: '0 0 8px var(--gold-glow)'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Certifications Showreel */}
        <div style={{ marginTop: '5rem' }}>
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
            <Award style={{ color: 'var(--gold)' }} size={26} />
            <span>Honors & Certifications</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} className="glass-panel glass-panel-hover" style={{ padding: '2rem', display: 'flex', gap: '1.2rem' }}>
                <div style={{ 
                  color: 'var(--gold)', 
                  background: 'rgba(223, 183, 108, 0.08)', 
                  alignSelf: 'flex-start',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <Award size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>{cert.date}</span>
                  <h3 style={{ fontSize: '1.15rem', marginTop: '0.2rem', marginBottom: '0.4rem', color: '#fff' }}>{cert.title}</h3>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 500, marginBottom: '0.5rem' }}>{cert.provider}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Custom Keyframes and Media Queries styling injection */}
      <style>{`
        .hover-gold:hover {
          color: var(--gold) !important;
          transition: 0.2s ease;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 992px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .grid-responsive-equal {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Founder;
