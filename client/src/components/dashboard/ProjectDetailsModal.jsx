import React, { useState } from 'react';
import { X, Calendar, DollarSign, Globe, Award, AlertCircle, FileText, Code, Link, Settings, Edit, Trash2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { toast } from 'react-hot-toast';

export const ProjectDetailsModal = ({ project, onClose, onUpdated, onEditTrigger, onDeleteTrigger }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!project) return null;

  const statuses = ['Planning', 'Design', 'Development', 'Testing', 'Review', 'Delivered', 'Maintenance'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return '#94a3b8';
      case 'Design': return '#a855f7';
      case 'Development': return 'var(--primary)';
      case 'Testing': return '#f59e0b';
      case 'Review': return '#3b82f6';
      case 'Delivered': return 'var(--accent)';
      case 'Maintenance': return '#10b981';
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
      await projectService.updateProject(project._id, { status: newStatus });
      toast.success(`Project status updated to ${newStatus}`);
      onUpdated();
    } catch (error) {
      console.error('Failed to update project status:', error);
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
      onClick={(e) => e.target.id === 'proj-modal-backdrop' && onClose()}
      id="proj-modal-backdrop"
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
                backgroundColor: getStatusColor(project.status) + '15', 
                color: getStatusColor(project.status),
                border: `1px solid ${getStatusColor(project.status)}40`,
                padding: '4px 10px', 
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {project.status}
              </span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                backgroundColor: getPriorityColor(project.priority) + '15', 
                color: getPriorityColor(project.priority),
                border: `1px solid ${getPriorityColor(project.priority)}40`,
                padding: '4px 10px', 
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {project.priority} Priority
              </span>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0 }}>
              {project.title}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Client: {project.clientName}</span>
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
          {/* Progress Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
              <span style={{ color: 'var(--primary)' }}>{project.progress}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '9999px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '9999px', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* Description Section */}
          {project.description && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Project Description</span>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>{project.description}</p>
            </div>
          )}

          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <DollarSign size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Project Budget</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{project.budget || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Start Date</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{formatDate(project.startDate)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Deadline</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{formatDate(project.deadline)}</span>
              </div>
            </div>

            {project.repositoryUrl && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Repository</span>
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent)', textDecoration: 'underline' }}>View Repository</a>
                </div>
              </div>
            )}

            {project.liveUrl && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Live Site</span>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--accent)', textDecoration: 'underline' }}>View Live Link</a>
                </div>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={16} /> Technologies Used
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.techStack.map((tech) => (
                  <span key={tech} style={{ fontSize: '12px', fontWeight: '600', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '4px 12px', borderRadius: '6px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

          {/* Notes Section */}
          {project.notes && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} /> Project Notes & Guidelines
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
                {project.notes}
              </div>
            </div>
          )}

          {/* Quick Actions Panel */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings size={16} /> Status:
              </span>
              <select
                value={project.status}
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
                  onEditTrigger(project);
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
                  onDeleteTrigger(project);
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

export default ProjectDetailsModal;
