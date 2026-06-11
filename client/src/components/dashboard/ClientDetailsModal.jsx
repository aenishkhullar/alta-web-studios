import React from 'react';
import { X, Mail, Phone, Briefcase, Globe, Calendar, FileText, Info, Award } from 'lucide-react';

export const ClientDetailsModal = ({ client, onClose }) => {
  if (!client) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'var(--accent)';
      case 'Onboarding': return '#3b82f6';
      case 'Paused': return '#f59e0b';
      case 'Completed': return '#a855f7';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div
      onClick={(e) => e.target.id === 'client-modal-backdrop' && onClose()}
      id="client-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              backgroundColor: getStatusColor(client.status) + '15', 
              color: getStatusColor(client.status),
              border: `1px solid ${getStatusColor(client.status)}40`,
              padding: '4px 10px', 
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              {client.status} Client
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0 }}>
              {client.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                {client.email ? (
                  <a href={`mailto:${client.email}`} style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', wordBreak: 'break-all' }}>{client.email}</a>
                ) : (
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)' }}>N/A</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                <a href={`tel:${client.phone}`} style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{client.phone || 'N/A'}</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Briefcase size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Company Name</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{client.company || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Website URL</span>
                {client.website ? (
                  <a href={client.website.startsWith('http') ? client.website : `https://${client.website}`} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent)', textDecoration: 'underline' }}>
                    {client.website}
                  </a>
                ) : (
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>N/A</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Industry</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{client.industry || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Created On</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{formatDate(client.createdAt)}</span>
              </div>
            </div>

            {client.sourceLeadId && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Award size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Conversion Source</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)' }}>Converted Lead</span>
                </div>
              </div>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* Notes Brief */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} /> Client Notes & Background
            </span>
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              padding: '16px 20px',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '14px',
              color: 'var(--text-primary)',
              lineHeight: '1.6',
              whiteSpace: 'pre-line',
              minHeight: '100px'
            }}>
              {client.notes || 'No notes available.'}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ClientDetailsModal;
