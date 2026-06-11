import React, { useState, useEffect } from 'react';
import { useContactModal } from '../../context/ContactModalContext';
import { leadService } from '../../services/leadService';
import { toast } from 'react-hot-toast';

const C = {
  bg: '#fafbe7',
  surface: '#ffffff',
  onBg: '#1a1d11',
  primaryContainer: '#c8f135',
  onPrimaryContainer: '#566c00',
  primary: '#526600',
  primaryFixed: '#c9f236',
  primaryFixedDim: '#aed50d',
  secondaryContainer: '#e5e2e1',
  onSecondaryContainer: '#656464',
  onPrimary: '#ffffff',
  secondary: '#5f5e5e',
  outlineVariant: '#c5c9ae',
  surfaceContainerLow: '#f4f5e2',
  surfaceVariant: '#e2e4d1',
};

export const ContactModal = () => {
  const { isOpen, modalMode, closeModal } = useContactModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    budget: '',
    service: '',
    meetingTime: '',
    description: ''
  });

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const messageContent = formData.description.trim();

    // Required fields validation
    if (!name) {
      toast.error('Full Name is required');
      return;
    }
    if (!email) {
      toast.error('Email Address is required');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!phone) {
      toast.error('Phone Number is required');
      return;
    }
    if (!messageContent) {
      toast.error('Project description is required');
      return;
    }

    // Modal mode specific validation
    if (modalMode === 'book-call' && !formData.meetingTime) {
      toast.error('Please select a preferred meeting time');
      return;
    }
    if (modalMode !== 'book-call' && !formData.budget) {
      toast.error('Please select a project budget');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build message to preserve service and meeting time choices
      let message = messageContent;
      if (formData.service) {
        message = `Service Interested In: ${formData.service}\n\n${message}`;
      }
      if (modalMode === 'book-call' && formData.meetingTime) {
        message = `Preferred Meeting Time: ${formData.meetingTime}\n\n${message}`;
      }

      await leadService.createLead({
        name,
        email,
        phone,
        company: formData.companyName.trim(),
        budget: formData.budget || '',
        message,
        source: 'Website Contact Form'
      });

      toast.success('Contact request submitted successfully!');
      setIsSuccess(true);

      // Auto close and reset after success
      setTimeout(() => {
        closeModal();
        setIsSuccess(false);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          budget: '',
          service: '',
          meetingTime: '',
          description: ''
        });
      }, 3000);
    } catch (error) {
      console.error('API submission error:', error);
      const serverMessage = error.response?.data?.message || 'Failed to submit contact request. Please try again.';
      toast.error(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'contact-modal-backdrop') {
      closeModal();
    }
  };

  // Styles
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(197,201,174,0.4)',
    background: '#fafbe7',
    fontSize: '15px',
    color: '#1a1d11',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#5f5e5e',
    marginBottom: '6px'
  };

  return (
    <div
      id="contact-modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(26, 29, 17, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ padding: '32px 32px 24px 32px', borderBottom: '1px solid rgba(197,201,174,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', color: '#1a1d11' }}>
              {modalMode === 'book-call' ? 'Book a Discovery Call' : "Let's Start a Project"}
            </h2>
            <p style={{ margin: 0, color: '#5f5e5e', fontSize: '15px' }}>
              {modalMode === 'book-call' 
                ? 'Select your preferred time slot and fill in your details to schedule a call.'
                : "Fill out the form below and we'll get back to you within 24 hours."}
            </p>
          </div>
          <button
            onClick={closeModal}
            style={{
              background: 'rgba(26,29,17,0.05)',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1a1d11',
              transition: 'background 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '32px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#c8f135', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <span className="material-symbols-outlined" style={{ color: '#1a1d11', fontSize: '32px' }}>check</span>
              </div>
              <h3 style={{ fontSize: '24px', margin: '0 0 12px 0', color: '#1a1d11' }}>Success!</h3>
              <p style={{ color: '#5f5e5e', margin: 0 }}>We have received your request and will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={inputStyle} placeholder="e.g. Amit Sharma" />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={inputStyle} placeholder="XYZ Pvt. Ltd." />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="abc@company.com" />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="98765 XXXXX" />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Service Interested In *</label>
                <select required name="service" value={formData.service} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', background: '#fafbe7 url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231a1d11\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center', backgroundSize: '16px' }}>
                  <option value="" disabled>Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Standard Mode Budget Dropdown */}
              {modalMode !== 'book-call' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Project Budget *</label>
                  <select required={modalMode !== 'book-call'} name="budget" value={formData.budget} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', background: '#fafbe7 url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231a1d11\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center', backgroundSize: '16px' }}>
                    <option value="" disabled>Select a budget range</option>
                    <option value="Less than ₹50,000">Less than ₹50,000</option>
                    <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                    <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000</option>
                    <option value="₹2,50,000+">₹2,50,000+</option>
                  </select>
                </div>
              )}

              {/* Book a Call Mode Preferred Time Chips */}
              {modalMode === 'book-call' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Preferred Meeting Time *</label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {[
                      '10:00 AM – 01:00 PM IST',
                      '04:00 PM – 06:00 PM IST'
                    ].map((time) => {
                      const isSelected = formData.meetingTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, meetingTime: time }))}
                          style={{
                            background: isSelected ? C.primaryContainer : 'transparent',
                            color: isSelected ? C.onPrimaryContainer : C.onBg,
                            border: `1px solid ${isSelected ? C.primary : 'rgba(197,201,174,0.6)'}`,
                            borderRadius: '9999px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            flex: '1 1 auto',
                            fontFamily: "'Inter', sans-serif"
                          }}
                          onMouseEnter={e => {
                            if (!isSelected) e.currentTarget.style.background = C.surfaceVariant;
                          }}
                          onMouseLeave={e => {
                            if (!isSelected) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  {modalMode === 'book-call' ? 'Project Brief *' : 'Project Description *'}
                </label>
                <textarea required name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} placeholder="Tell us a little about your project..."></textarea>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '12px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting || (modalMode === 'book-call' && !formData.meetingTime)}
                  style={{
                    width: '100%',
                    background: (modalMode === 'book-call' && !formData.meetingTime) ? '#cccccc' : '#1a1d11',
                    color: (modalMode === 'book-call' && !formData.meetingTime) ? '#666666' : '#fafbe7',
                    borderRadius: '9999px',
                    padding: '16px 32px',
                    fontSize: '15px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    border: 'none',
                    cursor: (isSubmitting || (modalMode === 'book-call' && !formData.meetingTime)) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    opacity: isSubmitting ? 0.8 : 1,
                    transition: 'opacity 0.2s',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span>
                    </>
                  ) : (
                    <>
                      {modalMode === 'book-call' ? 'Schedule Discovery Call' : 'Submit Request'}
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactModal;
