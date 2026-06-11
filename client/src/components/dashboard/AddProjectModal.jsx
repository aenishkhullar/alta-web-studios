import React, { useState } from 'react';
import { X, Briefcase, User, Calendar, Link, Code, DollarSign, AlertCircle, FileText } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { toast } from 'react-hot-toast';

export const AddProjectModal = ({ onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    budget: '',
    startDate: '',
    deadline: '',
    techStackRaw: '',
    repositoryUrl: '',
    liveUrl: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Project Name is required');
      return;
    }
    if (!formData.clientName.trim()) {
      toast.error('Client Name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Split raw tech stack string by commas and filter empty items
      const techStack = formData.techStackRaw
        ? formData.techStackRaw.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0)
        : [];

      const payload = {
        title: formData.title.trim(),
        clientName: formData.clientName.trim(),
        description: formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        budget: formData.budget.trim(),
        startDate: formData.startDate || null,
        deadline: formData.deadline || null,
        techStack,
        repositoryUrl: formData.repositoryUrl.trim(),
        liveUrl: formData.liveUrl.trim(),
        notes: formData.notes.trim()
      };

      const result = await projectService.createProject(payload);

      if (result.success) {
        toast.success('Project created successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || 'Failed to create project.');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      const serverMessage = error.response?.data?.message || 'Failed to save project. Please try again.';
      toast.error(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statuses = ['Planning', 'Design', 'Development', 'Testing', 'Review', 'Delivered', 'Maintenance'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  // Common styles consistent with other modals
  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px 12px 42px',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color var(--transition-fast)'
  };

  const selectStyle = {
    ...inputStyle,
    paddingLeft: '16px',
    cursor: 'pointer',
    appearance: 'none',
    background: 'var(--bg-tertiary) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center',
    backgroundSize: '16px'
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = 'var(--primary)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = 'var(--border-color)';
  };

  return (
    <div
      onClick={(e) => e.target.id === 'add-proj-backdrop' && onClose()}
      id="add-proj-backdrop"
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
            <h3 style={{ fontSize: '20px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0 }}>
              New Project Setup
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
              Create a new client project tracking profile.
            </p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Row 1: Name & Client */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Project Name *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Briefcase size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. E-Commerce Development"
                  required
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Client Name *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="e.g. Apex Corporation"
                  required
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a high-level summary of project goals and scope..."
              style={{
                ...inputStyle,
                paddingLeft: '16px',
                height: '80px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Row 3: Status, Priority, Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={selectStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={selectStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Project Budget</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <DollarSign size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. ₹2,50,000"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 4: Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Start Date</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Calendar size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Deadline</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Calendar size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 5: Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Repository URL</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Link size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="url"
                  name="repositoryUrl"
                  value={formData.repositoryUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://github.com/org/repo"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Live URL</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Link size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://projectlive.com"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 6: Tech Stack */}
          <div>
            <label style={labelStyle}>Tech Stack (comma-separated)</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Code size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                name="techStackRaw"
                value={formData.techStackRaw}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, Express, MongoDB, HSL"
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
          </div>

          {/* Row 7: Notes */}
          <div>
            <label style={labelStyle}>Project Notes / Constraints</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter team alignment guidelines, repository policies, or details..."
              style={{
                ...inputStyle,
                paddingLeft: '16px',
                height: '80px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Footer actions */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-glass)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '12px 28px',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                boxShadow: 'var(--shadow-glow)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {isSubmitting ? 'Saving...' : 'Add Project'}
            </button>
          </div>
        </form>
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

export default AddProjectModal;
