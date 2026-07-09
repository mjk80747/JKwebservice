import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Fine Dining', 'Café', 'Cloud Kitchen', 'Sushi Lounge', 'Bakery'];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = '/api/projects';
        // Construct query parameters
        const params = [];
        if (selectedCategory && selectedCategory !== 'All') {
          params.push(`category=${encodeURIComponent(selectedCategory)}`);
        }
        if (searchQuery) {
          params.push(`search=${encodeURIComponent(searchQuery)}`);
        }

        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching showcase projects', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search input slightly
    const timer = setTimeout(() => {
      fetchProjects();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container animate-fade-in">
        
        {/* Header content info */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Our Catalog
          </span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.4rem', marginBottom: '1rem' }}>
            Premium Web Design Showcases
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            Browse through our award-winning client templates. Click a template to run interactive demos and check built-in conversion features.
          </p>
        </div>

        {/* Filter controls panel */}
        <div className="glass-panel" style={{
          padding: '1.25rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Categories tag buttons list */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '0.4rem 1.1rem',
                  fontSize: '0.85rem',
                  borderRadius: '50px'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box input */}
          <div style={{ position: 'relative', width: '300px' }} className="form-group">
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '1rem',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search design title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.5rem',
                margin: 0,
                width: '100%',
                background: 'rgba(9, 9, 11, 0.4)'
              }}
            />
          </div>

        </div>

        {/* Portfolios Card matrix */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
            <h3>Filtering design showreel database...</h3>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: 'var(--bg-card)',
            border: '1px dashed var(--border-color)',
            borderRadius: '16px'
          }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
              No showcased templates found
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Try adjusting your filter options or searching for another keyword.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
