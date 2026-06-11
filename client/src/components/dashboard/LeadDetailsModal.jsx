import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Phone, Briefcase, DollarSign, Calendar, MessageSquare, Info, Award, Globe, FileText, UserCheck } from 'lucide-react';
import { leadService } from '../../services/leadService';
import { toast } from 'react-hot-toast';

export const LeadDetailsModal = ({ lead, onClose, onStatusUpdated }) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const result = await leadService.convertLead(lead._id);
      if (result.success) {
        toast.success('Lead converted to client successfully!');
        onClose();
        navigate('/dashboard/clients');
      } else {
        toast.error(result.message || 'Failed to convert lead.');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Failed to convert lead to client.');
    } finally {
      setIsConverting(false);
    }
  };

  if (!lead) return null;

  const statuses = [
    { label: 'Contacted', value: 'Contacted', color: 'var(--primary)' },
    { label: 'Qualified', value: 'Qualified', color: '#f59e0b' },
    { label: 'Proposal Sent', value: 'Proposal Sent', color: '#a855f7' },
    { label: 'Won', value: 'Won', color: 'var(--accent)' },
    { label: 'Lost', value: 'Lost', color: 'var(--error)' }
  ];

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      await leadService.updateLeadStatus(lead._id, newStatus);
      toast.success(`Lead status updated to ${newStatus}`);
      onStatusUpdated();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update lead status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

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
      case 'New': return '#3b82f6';
      case 'Contacted': return 'var(--primary)';
      case 'Qualified': return '#f59e0b';
      case 'Proposal Sent': return '#a855f7';
      case 'Won': return 'var(--accent)';
      case 'Lost': return 'var(--error)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div
      onClick={(e) => e.target.id === 'modal-backdrop' && onClose()}
      id="modal-backdrop"
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
              backgroundColor: getStatusColor(lead.status) + '15', 
              color: getStatusColor(lead.status),
              border: `1px solid ${getStatusColor(lead.status)}40`,
              padding: '4px 10px', 
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              {lead.status} Lead
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0 }}>
              {lead.name}
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
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', wordBreak: 'break-all' }}>{lead.email}</a>
                ) : (
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)' }}>N/A</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                <a href={`tel:${lead.phone}`} style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{lead.phone || 'N/A'}</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Briefcase size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Company Name</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{lead.company || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Website URL</span>
                {lead.website ? (
                  <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent)', textDecoration: 'underline' }}>
                    {lead.website}
                  </a>
                ) : (
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>N/A</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <DollarSign size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Estimated Budget</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{lead.budget || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Lead Source</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{lead.source || 'Website Contact Form'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Submitted On</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{formatDate(lead.createdAt)}</span>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* Description Message */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={16} /> Inquiry / Message Brief
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
              {lead.message || 'No message provided.'}
            </div>
          </div>

          {/* Admin Notes */}
          {lead.notes && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} /> Admin Notes / Outreach Info
              </span>
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.03)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                padding: '16px 20px',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                minHeight: '80px'
              }}>
                {lead.notes}
              </div>
            </div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* Action Buttons to Update Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} /> Update Status
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {statuses.map((status) => {
                const isCurrent = lead.status === status.value;
                return (
                  <button
                    key={status.value}
                    disabled={isUpdating || isCurrent}
                    onClick={() => handleStatusUpdate(status.value)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 'var(--border-radius-md)',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: (isUpdating || isCurrent) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: isCurrent ? status.color : 'var(--bg-tertiary)',
                      color: isCurrent ? '#ffffff' : 'var(--text-secondary)',
                      border: isCurrent ? `1px solid ${status.color}` : '1px solid var(--border-color)',
                      transition: 'all var(--transition-fast)',
                      opacity: isUpdating ? 0.6 : 1
                    }}
                    onMouseEnter={e => {
                      if (!isCurrent && !isUpdating) {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
                        e.currentTarget.style.borderColor = status.color;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isCurrent && !isUpdating) {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                      }
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isCurrent ? '#ffffff' : status.color }}></span>
                    {status.label}
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* CRM Lead Conversion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={16} /> CRM Actions
            </span>
            <div>
              <button
                disabled={isConverting}
                onClick={handleConvert}
                style={{
                  padding: '12px 24px',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isConverting ? 'not-allowed' : 'pointer',
                  backgroundColor: lead.status === 'Won' ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary)',
                  color: lead.status === 'Won' ? 'var(--accent)' : '#ffffff',
                  border: lead.status === 'Won' ? '1px solid rgba(16, 185, 129, 0.2)' : 'none',
                  boxShadow: lead.status === 'Won' ? 'none' : 'var(--shadow-glow)',
                  transition: 'all var(--transition-fast)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={e => {
                  if (lead.status !== 'Won' && !isConverting) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={e => {
                  if (lead.status !== 'Won' && !isConverting) {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <UserCheck size={16} />
                {lead.status === 'Won' ? 'Lead Converted to Client (Won)' : isConverting ? 'Converting...' : 'Convert To Client'}
              </button>
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

export default LeadDetailsModal;
