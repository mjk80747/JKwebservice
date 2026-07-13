import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Award, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-panel glass-panel-hover" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Visual Cover image container */}
      <div style={{
        position: 'relative',
        height: '220px',
        overflow: 'hidden',
        background: '#18181c'
      }}>
        <img 
          src={project.previewImages[0]} 
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'rgba(9, 9, 11, 0.8)',
          border: '1px solid var(--border-color)',
          padding: '0.25rem 0.75rem',
          borderRadius: '50px',
          fontSize: '0.75rem',
          color: 'var(--gold)',
          fontWeight: 500,
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)'
        }}>
          {project.category}
        </div>
      </div>

      {/* Card context details */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          marginBottom: '0.6rem',
          color: 'var(--text-light)'
        }}>
          {project.title}
        </h3>
        
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          marginBottom: '1.2rem',
          flexGrow: 1
        }}>
          {project.description.length > 115 
            ? `${project.description.substring(0, 115)}...` 
            : project.description}
        </p>

        {/* Tech Stack tags */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          marginBottom: '1.2rem'
        }}>
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span key={idx} style={{
              fontSize: '0.7rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-light)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Footer info counts & details button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1rem',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Eye size={14} /> {project.viewsCount || 0}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={14} /> {project.leadsGenerated || 0} leads
            </span>
          </div>

          <Link to={`/portfolio/${project._id}`} className="btn btn-secondary" style={{
            padding: '0.4rem 0.9rem',
            fontSize: '0.8rem',
            borderRadius: '6px'
          }}>
            Explore Demo <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
