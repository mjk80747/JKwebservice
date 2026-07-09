import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileUp, MessageSquare, CreditCard, Clock, CheckCircle, HelpCircle, ChevronRight, Send, SendHorizontal } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Asset inputs
  const [logoUrl, setLogoUrl] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [updatingAssets, setUpdatingAssets] = useState(false);

  // Chat inputs
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const chatBottomRef = useRef(null);

  // Billing inputs
  const [invoices, setInvoices] = useState([]);
  const [payingInvoiceId, setPayingInvoiceId] = useState(null);

  const fetchWorkspaceData = async () => {
    try {
      // Fetch inquiries
      const res = await fetch('/api/inquiries/my', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);

        if (data.length > 0) {
          const selectedInquiry = data[selectedIdx] || data[0];
          // Prepopulate asset URLs
          setLogoUrl(selectedInquiry.uploadedAssets?.logoUrl || '');
          setMenuUrl(selectedInquiry.uploadedAssets?.menuUrl || '');
          setSpecialInstructions(selectedInquiry.uploadedAssets?.specialInstructions || '');

          // Fetch invoices
          const invRes = await fetch('/api/invoices/my', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (invRes.ok) {
            const invData = await invRes.json();
            // Filter invoices matching this inquiry
            setInvoices(invData.filter((inv) => inv.inquiryId?._id === selectedInquiry._id));
          }

          // Fetch messages
          const msgRes = await fetch(`/api/messages/${selectedInquiry._id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (msgRes.ok) {
            const msgData = await msgRes.json();
            setMessages(msgData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard content', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkspaceData();
    }
  }, [user, selectedIdx]);

  // Message polling for real-time simulation
  useEffect(() => {
    let interval;
    if (user && inquiries.length > 0) {
      const activeInquiry = inquiries[selectedIdx];
      interval = setInterval(async () => {
        try {
          const msgRes = await fetch(`/api/messages/${activeInquiry._id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (msgRes.ok) {
            const msgData = await msgRes.json();
            setMessages(msgData);
          }
        } catch (err) {
          console.error(err);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [user, inquiries, selectedIdx]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAssetSubmit = async (e) => {
    e.preventDefault();
    const activeInquiry = inquiries[selectedIdx];
    setUpdatingAssets(true);
    try {
      const res = await fetch(`/api/inquiries/${activeInquiry._id}/assets`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ logoUrl, menuUrl, specialInstructions })
      });

      if (res.ok) {
        alert('Branding assets logged successfully!');
        fetchWorkspaceData();
      } else {
        alert('Error saving assets');
      }
    } catch (error) {
      console.error(error);
      alert('Network issue logging assets');
    } finally {
      setUpdatingAssets(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    const activeInquiry = inquiries[selectedIdx];
    setSendingMsg(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ inquiryId: activeInquiry._id, message: newMsg })
      });

      if (res.ok) {
        const saved = await res.json();
        setMessages([...messages, saved]);
        setNewMsg('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingMsg(false);
    }
  };

  const handlePayInvoice = async (invoiceId) => {
    setPayingInvoiceId(invoiceId);
    try {
      const res = await fetch(`/api/invoices/pay/${invoiceId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      if (res.ok) {
        alert('Payment verified! Retainer cleared. Development phase initiated.');
        fetchWorkspaceData();
      } else {
        alert('Error parsing payments simulator.');
      }
    } catch (err) {
      console.error(err);
      alert('Payment processing error');
    } finally {
      setPayingInvoiceId(null);
    }
  };

  const activeInquiry = inquiries[selectedIdx];
  const stages = ['Briefing', 'Design Phase', 'Development', 'QA & Review', 'Launched'];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>
        <h2>Loading project workspaces...</h2>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <section style={{ padding: '6rem 0' }}>
        <div className="container animate-fade-in" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>No Active Project Workspaces</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            It looks like you haven't submitted any site design quotes yet. Browse our professional catalogs, configure your pricing package, and start a workspace!
          </p>
          <Link to="/portfolio" className="btn btn-primary">Browse Project Catalog</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container animate-fade-in">
        
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500 }}>
            Client Portal Hub
          </span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.4rem' }}>Collaborative Project Workspaces</h1>
        </div>

        <div className="grid-2" style={{ gridTemplateColumns: '0.6fr 1.4fr', gap: '2.5rem' }}>
          
          {/* Workspace select sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-light)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Select Active Workspace
            </h3>
            {inquiries.map((inq, idx) => (
              <div
                key={inq._id}
                onClick={() => setSelectedIdx(idx)}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: selectedIdx === idx ? '1px solid var(--gold)' : '1px solid var(--border-color)',
                  background: selectedIdx === idx ? 'rgba(223,183,108,0.05)' : 'rgba(22, 22, 28, 0.4)',
                  transition: 'var(--transition)'
                }}
              >
                <h4 style={{ fontSize: '1.05rem', color: selectedIdx === idx ? 'var(--gold)' : '#fff', marginBottom: '0.3rem' }}>
                  {inq.restaurantName}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Ref: {inq.projectId?.title || 'Custom Design'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', fontSize: '0.75rem' }}>
                  <span style={{
                    color: inq.status === 'closed_won' ? 'var(--accent-green)' : 'var(--gold)',
                    fontWeight: 500
                  }}>
                    Status: {inq.status.replace('_', ' ')}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>Stage: {inq.developmentStage}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Workspace View details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Visual Step Timeline */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} style={{ color: 'var(--gold)' }} /> Development Timeline status
              </h3>
              
              <div className="step-container">
                {stages.map((stage, idx) => {
                  const currentIdx = stages.indexOf(activeInquiry.developmentStage);
                  const isActive = activeInquiry.developmentStage === stage;
                  const isCompleted = currentIdx > idx;
                  
                  return (
                    <div 
                      key={stage} 
                      className={`step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    >
                      <div className="step-circle">
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <span className="step-label">{stage}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom pricing specs list */}
            <div className="grid-2">
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem' }}>Quote Summary</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Baseline Template:</span>
                    <span>$800</span>
                  </li>
                  {activeInquiry.selectedFeatures.map((f) => (
                    <li key={f} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{f.replace('-', ' ')} Addon:</span>
                      <span>+${f === 'table-booking' ? 250 : f === 'pos-integration' ? 400 : f === 'admin-analytics' ? 300 : f === 'multi-language' ? 150 : 100}</span>
                    </li>
                  ))}
                  <li style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', fontWeight: 600, color: 'var(--gold)' }}>
                    <span>Calculated Investment:</span>
                    <span>${activeInquiry.estimatedPrice} USD</span>
                  </li>
                </ul>
              </div>

              {/* Billing list & pay simulators */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard size={16} /> Invoices & Billing
                </h3>
                {invoices.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {invoices.map((inv) => (
                      <div key={inv._id} style={{
                        padding: '0.8rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        fontSize: '0.85rem'
                      }}>
                        <p style={{ fontWeight: 500, color: '#fff' }}>{inv.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold)' }}>
                            ${inv.amount}
                          </span>
                          {inv.status === 'paid' ? (
                            <span style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 500 }}>
                              <CheckCircle size={12} /> Paid
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePayInvoice(inv._id)}
                              disabled={payingInvoiceId === inv._id}
                              className="btn btn-primary"
                              style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', borderRadius: '4px' }}
                            >
                              {payingInvoiceId === inv._id ? 'Verifying...' : 'Pay Retainer'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Retainer payments invoices cleared. Development stages in progress.
                  </p>
                )}
              </div>
            </div>

            {/* Asset upload block */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileUp size={16} style={{ color: 'var(--gold)' }} /> Upload Branding Assets
              </h3>
              <form onSubmit={handleAssetSubmit}>
                <div className="grid-2" style={{ marginBottom: '1rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Restaurant Logo URL / Text</label>
                    <input
                      type="text"
                      placeholder="Paste link to Google Drive / Dropbox logo file"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Digital Menu PDF / Content URL</label>
                    <input
                      type="text"
                      placeholder="Paste link to restaurant menu card details"
                      value={menuUrl}
                      onChange={(e) => setMenuUrl(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Style Instructions & Preferences</label>
                  <textarea
                    rows={3}
                    placeholder="Specify target brand colors, typography notes, special seating sections..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" disabled={updatingAssets} className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                  {updatingAssets ? 'Logging details...' : 'Log Branding Assets'}
                </button>
              </form>
            </div>

            {/* Direct message developer board */}
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '450px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
                <MessageSquare size={16} style={{ color: 'var(--gold)' }} /> Developer Message Board
              </h3>
              
              {/* Message scroll log wrapper */}
              <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                {messages.length > 0 ? (
                  messages.map((msg) => {
                    const isSenderUser = msg.senderId?._id === user._id || msg.senderId === user._id;
                    return (
                      <div
                        key={msg._id}
                        style={{
                          alignSelf: isSenderUser ? 'flex-end' : 'flex-start',
                          maxWidth: '75%',
                          background: isSenderUser ? 'var(--gold-glow)' : 'rgba(255,255,255,0.03)',
                          border: isSenderUser ? '1px solid rgba(223,183,108,0.25)' : '1px solid var(--border-color)',
                          borderRadius: '12px',
                          padding: '0.8rem 1.1rem',
                          fontSize: '0.88rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.2rem', fontSize: '0.75rem', fontWeight: 600 }}>
                          <span style={{ color: isSenderUser ? 'var(--gold)' : '#fff' }}>
                            {isSenderUser ? 'You' : msg.senderId?.name || 'Developer CRM'}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-light)', lineHeight: '1.5' }}>{msg.message}</p>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', margin: 'auto 0' }}>
                    <p>No messages yet. Send a query below to start consulting with our development lead.</p>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Message input send form */}
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Ask developers questions regarding styling, features, menu uploads..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="form-input"
                  style={{ flexGrow: 1, margin: 0 }}
                />
                <button type="submit" disabled={sendingMsg || !newMsg.trim()} className="btn btn-primary" style={{ padding: '0 1.2rem' }}>
                  <SendHorizontal size={16} />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default UserDashboard;
