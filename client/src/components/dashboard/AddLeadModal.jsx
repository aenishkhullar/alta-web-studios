import React, { useState } from 'react';
import { X, User, Mail, Phone, Briefcase, Globe, Info, DollarSign, Award, FileText } from 'lucide-react';
import { leadService } from '../../services/leadService';
import { toast } from 'react-hot-toast';

export const AddLeadModal = ({ onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    source: 'Manual Entry',
    budget: '< ₹50,000',
    status: 'New',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields validation
    if (!formData.name.trim()) {
      toast.error('Full Name is required');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone Number is required');
      return;
    }

    // Optional email format validation
    if (formData.email.trim()) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email.trim())) {
        toast.error('Please enter a valid email address');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        website: formData.website.trim(),
        source: formData.source,
        budget: formData.budget,
        status: formData.status,
        notes: formData.notes.trim(),
        message: formData.notes.trim() // Keep message populated in case backend dependencies rely on it
      };

      const result = await leadService.createLead(payload);

      if (result.success) {
        toast.success('Lead created successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || 'Failed to create lead.');
      }
    } catch (error) {
      console.error('Failed to create lead:', error);
      const serverMessage = error.response?.data?.message || 'Failed to save manual lead. Please try again.';
      toast.error(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sources = [
    'Manual Entry',
    'Cold Email',
    'LinkedIn Outreach',
    'Instagram DM',
    'Phone Call',
    'Referral',
    'Networking Event',
    'Website Contact Form'
  ];

  const budgets = [
    '< ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000+'
  ];

  const statuses = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Won',
    'Lost'
  ];

  // Common input styles
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
      onClick={(e) => e.target.id === 'add-lead-backdrop' && onClose()}
      id="add-lead-backdrop"
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
              Add New Lead
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
              Add manual leads from outreach campaigns or referrals.
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
          {/* Row 1: Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Kumar"
                  required
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rajesh@company.com"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Phone size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  required
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Company Name</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Briefcase size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Tech Solutions"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Website URL */}
          <div>
            <label style={labelStyle}>Website URL</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Globe size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g. https://acmetech.com"
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
          </div>

          {/* Row 4: Source, Budget, Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Lead Source</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                >
                  {sources.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Budget Range</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  style={selectStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                >
                  {budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Lead Status</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
            </div>
          </div>

          {/* Row 5: Notes */}
          <div>
            <label style={labelStyle}>Notes / Brief</label>
            <div style={{ position: 'relative' }}>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter client background, outreach context, or conversation notes..."
                style={{
                  ...inputStyle,
                  paddingLeft: '16px',
                  height: '110px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
          </div>

          {/* Action Footer */}
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
              {isSubmitting ? 'Saving...' : 'Add Lead'}
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

export default AddLeadModal;
