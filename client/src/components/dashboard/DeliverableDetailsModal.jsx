import React, { useState } from 'react';
import { X, Calendar, User, Link, AlertCircle, FileText, Settings, Edit, Trash2, Tag, CheckCircle2 } from 'lucide-react';
import { deliverableService } from '../../services/deliverableService';
import { toast } from 'react-hot-toast';

export const DeliverableDetailsModal = ({ deliverable, onClose, onUpdated, onEditTrigger, onDeleteTrigger }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!deliverable) return null;

  const statuses = ['Pending', 'In Progress', 'Review', 'Approved', 'Delivered'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#94a3b8';
      case 'In Progress': return 'var(--primary)';
      case 'Review': return '#3b82f6';
      case 'Approved': return '#10b981';
      case 'Delivered': return 'var(--accent)';
      default: return 'var(--text-muted)';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'var(--text-muted)';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      case 'Critical': return '#b91c1c';
      default: return 'var(--text-muted)';
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      const result = await deliverableService.updateDeliverable(deliverable._id, { status: newStatus });
      if (result.success) {
        toast.success(`Status updated to ${newStatus}`);
        onUpdated();
      } else {
        toast.error(result.message || 'Failed to update status.');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status.');
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
      day: 'numeric'
    });
  };

  return (
    <div
      onClick={(e) => e.target.id === 'deliv-modal-backdrop' && onClose()}
      id="deliv-modal-backdrop"
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
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                backgroundColor: getStatusColor(deliverable.status) + '15', 
                color: getStatusColor(deliverable.status),
                border: `1px solid ${getStatusColor(deliverable.status)}40`,
                padding: '4px 10px', 
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {deliverable.status}
              </span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                backgroundColor: getPriorityColor(deliverable.priority) + '15', 
                color: getPriorityColor(deliverable.priority),
                border: `1px solid ${getPriorityColor(deliverable.priority)}40`,
                padding: '4px 10px', 
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {deliverable.priority} Priority
              </span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                padding: '4px 10px', 
                borderRadius: '9999px',
                letterSpacing: '0.05em'
              }}>
                {deliverable.category}
              </span>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0 }}>
              {deliverable.title}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Project: <strong>{deliverable.projectName}</strong> • Client: {deliverable.clientName}
            </span>
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
          
          {/* Description Section */}
          {deliverable.description && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Deliverable Description</span>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>
                {deliverable.description}
              </p>
            </div>
          )}

          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Assigned To</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {deliverable.assignedTo || 'Unassigned'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Due Date</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {formatDate(deliverable.dueDate)}
                </span>
              </div>
            </div>

            {deliverable.completedDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Completed Date</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {formatDate(deliverable.completedDate)}
                  </span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Created Date</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {formatDate(deliverable.createdAt)}
                </span>
              </div>
            </div>

            {deliverable.fileLinks && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Resource Links</span>
                  {deliverable.fileLinks.startsWith('http') ? (
                    <a href={deliverable.fileLinks} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent)', textDecoration: 'underline' }}>
                      Open Resource
                    </a>
                  ) : (
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                      {deliverable.fileLinks}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* Notes Section */}
          {deliverable.notes && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} /> Internal Notes & Comments
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
                minHeight: '80px'
              }}>
                {deliverable.notes}
              </div>
            </div>
          )}

          {/* Quick Actions Panel */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings size={16} /> Quick Status:
              </span>
              <select
                value={deliverable.status}
                disabled={isUpdating}
                onChange={handleStatusChange}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  onClose();
                  onEditTrigger(deliverable);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '8px 14px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-glass)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => {
                  onClose();
                  onDeleteTrigger(deliverable);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(244, 63, 94, 0.08)',
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                  color: 'var(--error)',
                  padding: '8px 14px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--error)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.08)';
                  e.currentTarget.style.color = 'var(--error)';
                }}
              >
                <Trash2 size={14} /> Delete
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

export default DeliverableDetailsModal;
