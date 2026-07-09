import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Users, DollarSign, Layers, CheckCircle, FilePlus2, MessageSquare, Play, Download, Trash2, SendHorizontal } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Stats
  const [financials, setFinancials] = useState({ totalRevenue: 0, pendingPipeline: 0, mrr: 0 });
  const [userCount, setUserCount] = useState(0);

  // Lists
  const [inquiries, setInquiries] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Active CRM operations
  const [activeInquiryId, setActiveInquiryId] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [adminReply, setAdminReply] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceDesc, setInvoiceDesc] = useState('');

  // Add Project Form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'Fine Dining',
    techStack: '',
    featuresList: '',
    previewImages: '',
    demoLink: ''
  });

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${user.token}` };

      // Financials
      const finRes = await fetch('/api/invoices/admin/financials', { headers });
      if (finRes.ok) {
        const finData = await finRes.json();
        setFinancials(finData);
      }

      // Users
      const userRes = await fetch('/api/admin/users', { headers });
      if (userRes.ok) {
        const userData = await userRes.json();
        setClients(userData);
        setUserCount(userData.length);
      }

      // Inquiries
      const inqRes = await fetch('/api/inquiries', { headers });
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
        if (inqData.length > 0 && !activeInquiryId) {
          setActiveInquiryId(inqData[0]._id);
        }
      }

      // Projects
      const projRes = await fetch('/api/projects');
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData);
      }

      // Contacts
      const contactRes = await fetch('/api/contact', { headers });
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContacts(contactData);
      }
    } catch (err) {
      console.error('Error fetching admin data', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Load chat messages when active inquiry selection changes
  useEffect(() => {
    const fetchChat = async () => {
      if (!activeInquiryId) return;
      try {
        const res = await fetch(`/api/messages/${activeInquiryId}`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setChatMessages(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChat();
  }, [activeInquiryId]);

  // Admin reply chat handler
  const handleAdminReply = async (e) => {
    e.preventDefault();
    if (!adminReply.trim() || !activeInquiryId) return;
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ inquiryId: activeInquiryId, message: adminReply })
      });

      if (res.ok) {
        const saved = await res.json();
        setChatMessages([...chatMessages, saved]);
        setAdminReply('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Inquiry CRM Status & stage handlers
  const handleStatusChange = async (inqId, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${inqId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        alert('Lead status updated successfully.');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStageChange = async (inqId, newStage) => {
    try {
      const res = await fetch(`/api/inquiries/${inqId}/stage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ developmentStage: newStage })
      });
      if (res.ok) {
        alert('Development phase updated successfully.');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Invoice creation handler
  const handleIssueInvoice = async (e) => {
    e.preventDefault();
    if (!invoiceAmount || !invoiceDesc || !activeInquiryId) return;
    try {
      const res = await fetch('/api/invoices/admin/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          inquiryId: activeInquiryId,
          amount: parseFloat(invoiceAmount),
          description: invoiceDesc
        })
      });

      if (res.ok) {
        alert('Custom Invoice sent to client portal.');
        setInvoiceAmount('');
        setInvoiceDesc('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // User Suspension toggle handler
  const handleToggleSuspension = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        alert(`Account status set to ${nextStatus}.`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD: Add project showcase
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...newProject,
          techStack: newProject.techStack.split(',').map((x) => x.trim()),
          featuresList: newProject.featuresList.split(',').map((x) => x.trim()),
          previewImages: newProject.previewImages.split(',').map((x) => x.trim())
        })
      });

      if (res.ok) {
        alert('Showcase project loaded successfully!');
        setNewProject({
          title: '', description: '', category: 'Fine Dining',
          techStack: '', featuresList: '', previewImages: '', demoLink: ''
        });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD: Delete project showcase
  const handleDeleteProject = async (projId) => {
    if (!window.confirm('Delete this showcase project permanently?')) return;
    try {
      const res = await fetch(`/api/projects/${projId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        alert('Project showcase removed.');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CSV Exporter
  const handleCSVExport = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Name,Email,Phone,Restaurant Name,Registered Date,Status\n';

    clients.forEach((c) => {
      const row = `"${c.name}","${c.email}","${c.phone}","${c.restaurantName || ''}","${new Date(c.createdAt).toLocaleDateString()}","${c.status}"`;
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'jk_web_solutions_clients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeInquiry = inquiries.find((i) => i._id === activeInquiryId);

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container animate-fade-in">
        
        {/* Core Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500 }}>
              Superuser Workspace Portal
            </span>
            <h1 style={{ fontSize: '2.8rem', marginTop: '0.4rem' }}>Startup Agency CRM Dashboard</h1>
          </div>
          <button onClick={handleCSVExport} className="btn btn-secondary">
            <Download size={14} /> Export clients CSV
          </button>
        </div>

        {/* Financials & users summary counters */}
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', padding: '1rem', borderRadius: '12px', background: 'rgba(74, 222, 128, 0.1)', color: 'var(--accent-green)' }}>
              <DollarSign size={28} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Settled Revenue (Total Paid)</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>${financials.totalRevenue || 0} USD</h2>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', padding: '1rem', borderRadius: '12px', background: 'rgba(223, 183, 108, 0.1)', color: 'var(--gold)' }}>
              <TrendingUp size={28} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Projected Pipeline (Unpaid)</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>${financials.pendingPipeline || 0} USD</h2>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', padding: '1rem', borderRadius: '12px', background: 'rgba(223, 183, 108, 0.1)', color: 'var(--gold)' }}>
              <Users size={28} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered Clients</span>
              <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>{userCount} Owners</h2>
            </div>
          </div>

        </div>

        {/* Dynamic Kanban Lead Pipeline & active workspace logs */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={22} style={{ color: 'var(--gold)' }} /> Active Inquiries CRM Matrix
          </h2>

          <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
            
            {/* Table of active inquires */}
            <div className="glass-panel" style={{ overflowX: 'auto', padding: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.8rem' }}>Restaurant</th>
                    <th style={{ padding: '0.8rem' }}>Template</th>
                    <th style={{ padding: '0.8rem' }}>Estimate</th>
                    <th style={{ padding: '0.8rem' }}>Pipeline Status</th>
                    <th style={{ padding: '0.8rem' }}>Phase Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr
                      key={inq._id}
                      onClick={() => setActiveInquiryId(inq._id)}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        background: activeInquiryId === inq._id ? 'rgba(223,183,108,0.04)' : 'transparent',
                        transition: 'var(--transition)'
                      }}
                    >
                      <td style={{ padding: '0.8rem', fontWeight: 600 }}>{inq.restaurantName}</td>
                      <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{inq.projectId?.title || 'Custom'}</td>
                      <td style={{ padding: '0.8rem', color: 'var(--gold)' }}>${inq.estimatedPrice}</td>
                      <td style={{ padding: '0.8rem' }}>
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                          style={{
                            background: '#09090b', border: '1px solid var(--border-color)', color: 'var(--gold)',
                            borderRadius: '4px', padding: '0.2rem 0.5rem', cursor: 'pointer'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="closed_won">Closed Won</option>
                          <option value="closed_lost">Closed Lost</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.8rem' }}>
                        <select
                          value={inq.developmentStage}
                          onChange={(e) => handleStageChange(inq._id, e.target.value)}
                          style={{
                            background: '#09090b', border: '1px solid var(--border-color)', color: '#fff',
                            borderRadius: '4px', padding: '0.2rem 0.5rem', cursor: 'pointer'
                          }}
                        >
                          <option value="Briefing">Briefing</option>
                          <option value="Design Phase">Design Phase</option>
                          <option value="Development">Development</option>
                          <option value="QA & Review">QA & Review</option>
                          <option value="Launched">Launched</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected Inquiry CRM Interactions */}
            {activeInquiry ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Active Inquiry Chat box */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '320px' }}>
                  <h4 style={{ color: 'var(--gold)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.8rem' }}>
                    Consultation: {activeInquiry.restaurantName}
                  </h4>
                  
                  <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    {chatMessages.map((msg) => {
                      const isAdminMsg = msg.senderId?.role === 'admin' || msg.senderId === user._id;
                      return (
                        <div
                          key={msg._id}
                          style={{
                            alignSelf: isAdminMsg ? 'flex-end' : 'flex-start',
                            background: isAdminMsg ? 'var(--gold-glow)' : 'rgba(255,255,255,0.03)',
                            padding: '0.5rem 0.8rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            maxWidth: '80%',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          <p style={{ fontWeight: 600, color: isAdminMsg ? 'var(--gold)' : '#fff', fontSize: '0.7rem' }}>
                            {isAdminMsg ? 'You (Admin)' : activeInquiry.userId?.name}
                          </p>
                          <p style={{ color: 'var(--text-light)', marginTop: '0.1rem' }}>{msg.message}</p>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={handleAdminReply} style={{ display: 'flex', gap: '0.4rem' }}>
                    <input
                      type="text"
                      placeholder="Reply to client portal..."
                      value={adminReply}
                      onChange={(e) => setAdminReply(e.target.value)}
                      className="form-input"
                      style={{ flexGrow: 1, margin: 0, padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 0.8rem' }}>
                      <SendHorizontal size={14} />
                    </button>
                  </form>
                </div>

                {/* Billing invoice issuance */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '0.8rem' }}>Issue Custom Invoice</h4>
                  <form onSubmit={handleIssueInvoice} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={invoiceAmount}
                        onChange={(e) => setInvoiceAmount(e.target.value)}
                        className="form-input"
                        style={{ margin: 0, padding: '0.5rem' }}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Invoice Description"
                        value={invoiceDesc}
                        onChange={(e) => setInvoiceDesc(e.target.value)}
                        className="form-input"
                        style={{ margin: 0, padding: '0.5rem' }}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem', width: '100%', fontSize: '0.8rem' }}>
                      Issue Billing invoice
                    </button>
                  </form>
                </div>

              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>Select a matrix line to coordinate messages and invoices.</p>
              </div>
            )}

          </div>
        </div>

        {/* Client Suspension and user matrix */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={22} style={{ color: 'var(--gold)' }} /> User Matrix CRM Directory
          </h2>
          <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.8rem' }}>Client Name</th>
                  <th style={{ padding: '0.8rem' }}>Email Address</th>
                  <th style={{ padding: '0.8rem' }}>Phone</th>
                  <th style={{ padding: '0.8rem' }}>Restaurant</th>
                  <th style={{ padding: '0.8rem' }}>Onboard Date</th>
                  <th style={{ padding: '0.8rem' }}>Status</th>
                  <th style={{ padding: '0.8rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '0.8rem', fontWeight: 500 }}>{c.name}</td>
                    <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{c.email}</td>
                    <td style={{ padding: '0.8rem' }}>{c.phone}</td>
                    <td style={{ padding: '0.8rem' }}>{c.restaurantName || 'N/A'}</td>
                    <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <span style={{
                        color: c.status === 'suspended' ? 'var(--accent-rose)' : 'var(--accent-green)',
                        fontWeight: 600
                      }}>
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '0.8rem' }}>
                      {c.role !== 'admin' && (
                        <button
                          onClick={() => handleToggleSuspension(c._id, c.status)}
                          className={c.status === 'suspended' ? 'btn btn-primary' : 'btn btn-danger'}
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}
                        >
                          {c.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project showcases editor grid */}
        <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
          
          {/* List of current showcases */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1.5rem' }}>Active Showcase Portfolio</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((proj) => (
                <div key={proj._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>{proj.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Category: {proj.category} | Views: {proj.viewsCount}</p>
                  </div>
                  <button onClick={() => handleDeleteProject(proj._id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form to add a new project showcase */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FilePlus2 size={18} /> Upload New Design
            </h3>
            <form onSubmit={handleAddProject}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="E.g., Ciao Italia - Premium Pizza"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="form-input"
                >
                  <option value="Fine Dining">Fine Dining</option>
                  <option value="Café">Café</option>
                  <option value="Cloud Kitchen">Cloud Kitchen</option>
                  <option value="Sushi Lounge">Sushi Lounge</option>
                  <option value="Bakery">Bakery</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Specify styling context..."
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  placeholder="React, Framer Motion, MERN"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Features Included (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={newProject.featuresList}
                  onChange={(e) => setNewProject({ ...newProject, featuresList: e.target.value })}
                  placeholder="Order tracker, SMS system"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preview Image Link (Unsplash URL)</label>
                <input
                  type="text"
                  required
                  value={newProject.previewImages}
                  onChange={(e) => setNewProject({ ...newProject, previewImages: e.target.value })}
                  placeholder="Paste direct Unsplash graphics URL"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Demo Video Link (Youtube embed URL)</label>
                <input
                  type="text"
                  required
                  value={newProject.demoLink}
                  onChange={(e) => setNewProject({ ...newProject, demoLink: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Publish Showcase Design
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;
