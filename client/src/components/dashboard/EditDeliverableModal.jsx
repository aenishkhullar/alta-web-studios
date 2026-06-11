import React, { useState, useEffect } from 'react';
import { X, Briefcase, User, Calendar, Link, CheckSquare, AlertCircle, FileText } from 'lucide-react';
import { deliverableService } from '../../services/deliverableService';
import { projectService } from '../../services/projectService';
import { toast } from 'react-hot-toast';

export const EditDeliverableModal = ({ deliverable, onClose, onUpdated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: deliverable.projectId || '',
    projectName: deliverable.projectName || '',
    clientName: deliverable.clientName || '',
    title: deliverable.title || '',
    description: deliverable.description || '',
    category: deliverable.category || 'Design',
    status: deliverable.status || 'Pending',
    priority: deliverable.priority || 'Medium',
    dueDate: deliverable.dueDate ? new Date(deliverable.dueDate).toISOString().substring(0, 10) : '',
    assignedTo: deliverable.assignedTo || '',
    fileLinks: deliverable.fileLinks || '',
    notes: deliverable.notes || ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await projectService.getProjects();
        if (result.success) {
          setProjects(result.data || []);
        }
      } catch (error) {
        console.error('Failed to load projects for dropdown:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSelectChange = (e) => {
    const selectedProjId = e.target.value;
    if (selectedProjId === 'manual') {
      setFormData((prev) => ({
        ...prev,
        projectId: '',
        projectName: '',
        clientName: ''
      }));
    } else {
      const proj = projects.find((p) => p._id === selectedProjId);
      if (proj) {
        setFormData((prev) => ({
          ...prev,
          projectId: selectedProjId,
          projectName: proj.title,
          clientName: proj.clientName
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.projectName.trim()) {
      toast.error('Project Name is required');
      return;
    }
    if (!formData.clientName.trim()) {
      toast.error('Client Name is required');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Deliverable Title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        projectId: formData.projectId || null,
        projectName: formData.projectName.trim(),
        clientName: formData.clientName.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate || null,
        assignedTo: formData.assignedTo.trim(),
        fileLinks: formData.fileLinks.trim(),
        notes: formData.notes.trim()
      };

      const result = await deliverableService.updateDeliverable(deliverable._id, payload);

      if (result.success) {
        toast.success('Deliverable updated successfully!');
        onUpdated();
        onClose();
      } else {
        toast.error(result.message || 'Failed to update deliverable.');
      }
    } catch (error) {
      console.error('Failed to update deliverable:', error);
      const serverMessage = error.response?.data?.message || 'Failed to save deliverable. Please try again.';
      toast.error(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['Design', 'Development', 'Content', 'SEO', 'Marketing', 'Deployment', 'Documentation', 'Maintenance'];
  const statuses = ['Pending', 'In Progress', 'Review', 'Approved', 'Delivered'];
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
      onClick={(e) => e.target.id === 'edit-deliv-backdrop' && onClose()}
      id="edit-deliv-backdrop"
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
              Edit Deliverable
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
              Modify fields on this deliverable card.
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
          
          {/* Project Dropdown / Selection */}
          <div>
            <label style={labelStyle}>Linked CRM Project (Optional Auto-Fill)</label>
            <select
              onChange={handleProjectSelectChange}
              value={formData.projectId || 'manual'}
              style={selectStyle}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            >
              <option value="manual">-- Manual Entry / No Linked Project --</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.title} ({proj.clientName})
                </option>
              ))}
            </select>
          </div>

          {/* Row 1: Project & Client Names */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Project Name *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Briefcase size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g. Website Redesign"
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
                  placeholder="e.g. Acme Labs"
                  required
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '5px 0' }} />

          {/* Row 2: Title & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Deliverable Title *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <CheckSquare size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Figma UI Mockups"
                  required
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={selectStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What specifically needs to be delivered..."
              style={{
                ...inputStyle,
                paddingLeft: '16px',
                height: '70px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Row 4: Status, Priority, Due Date */}
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
              <label style={labelStyle}>Due Date</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Calendar size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 5: Assigned To & File Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Assigned To</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="e.g. Design Team, Rahul S."
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Resource Links (URLs)</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Link size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="fileLinks"
                  value={formData.fileLinks}
                  onChange={handleChange}
                  placeholder="e.g. https://figma.com/file-link"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 6: Notes */}
          <div>
            <label style={labelStyle}>Notes & Internal Comments</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any details, context or specific files locations..."
              style={{
                ...inputStyle,
                paddingLeft: '16px',
                height: '70px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Footer Actions */}
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
              {isSubmitting ? 'Updating...' : 'Save Changes'}
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

export default EditDeliverableModal;
