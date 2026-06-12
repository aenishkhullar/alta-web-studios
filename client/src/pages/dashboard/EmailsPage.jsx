import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Send, 
  Save, 
  Eye, 
  Trash2, 
  Paperclip, 
  RefreshCw, 
  Plus, 
  Check, 
  Settings, 
  ChevronRight, 
  ArrowLeft,
  X,
  FileText,
  AlertCircle,
  FileCode,
  Lock,
  Globe
} from 'lucide-react';
import { emailService } from '../../services/emailService';
import { RichTextEditor } from '../../components/dashboard/RichTextEditor';
import { toast } from 'react-hot-toast';

export const EmailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('compose'); // compose, sent, drafts, settings

  // Compose Email States
  const [emailId, setEmailId] = useState(null); // Set if editing a draft
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Email Lists States
  const [emailsList, setEmailsList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null); // Detail view modal/panel

  // Handle URL prefill (from Leads details "Send Email" link)
  useEffect(() => {
    const toParam = searchParams.get('to');
    const nameParam = searchParams.get('name');
    if (toParam) {
      setTo(toParam);
      if (nameParam) {
        setSubject(`Outreach to ${nameParam} - Alta Web Studios`);
      } else {
        setSubject(`Outreach - Alta Web Studios`);
      }
      // Switch to compose tab
      setActiveTab('compose');
      // Clean up search query parameters so reloading doesn't reset user inputs
      setSearchParams({});
    }
  }, [searchParams]);

  // Load email lists when tab changes
  useEffect(() => {
    if (activeTab === 'sent' || activeTab === 'drafts') {
      fetchEmails();
    }
  }, [activeTab, searchQuery]);

  const fetchEmails = async () => {
    setIsLoadingList(true);
    try {
      const statusMap = {
        'sent': 'sent',
        'drafts': 'draft'
      };
      const result = await emailService.getEmails(statusMap[activeTab], searchQuery);
      if (result.success) {
        setEmailsList(result.data || []);
      }
    } catch (error) {
      console.error(`Failed to load ${activeTab}:`, error);
      toast.error(`Failed to retrieve ${activeTab} from server.`);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Attachments handle
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newAttachments = [];
    for (const file of files) {
      // Size check (max 5MB per attachment)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds the 5MB size limit.`);
        continue;
      }

      try {
        const base64 = await convertFileToBase64(file);
        newAttachments.push({
          filename: file.name,
          contentType: file.type,
          size: file.size,
          content: base64
        });
      } catch (err) {
        console.error('File conversion error:', err);
        toast.error(`Error reading file ${file.name}`);
      }
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    toast.success(`${newAttachments.length} file(s) attached.`);
    e.target.value = ''; // Reset input element
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== index));
  };

  // Form Validation
  const validateForm = () => {
    if (!to.trim()) {
      toast.error('Recipient (To) address is required.');
      return false;
    }
    if (!subject.trim()) {
      toast.error('Subject is required.');
      return false;
    }
    if (!htmlContent.trim() || htmlContent === '<p><br></p>') {
      toast.error('Email message body is required.');
      return false;
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    const recipients = to.split(',').map(e => e.trim());
    for (const email of recipients) {
      if (!emailRegex.test(email)) {
        toast.error(`Invalid email format: ${email}`);
        return false;
      }
    }

    return true;
  };

  // Action: Send Email
  const handleSendEmail = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    try {
      const result = await emailService.sendEmail({
        id: emailId, // Provide draft ID if updating
        to,
        cc,
        bcc,
        subject,
        html: htmlContent,
        attachments
      });

      if (result.success) {
        toast.success('Email sent successfully!');
        // Clear composer state
        clearComposer();
        // Redirect to sent tab
        setActiveTab('sent');
      } else {
        toast.error(result.message || 'Failed to send email.');
      }
    } catch (error) {
      console.error('Email send error:', error);
      toast.error(error.response?.data?.message || 'Error occurred while sending email.');
    } finally {
      setIsSending(false);
    }
  };

  // Action: Save Draft
  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      const result = await emailService.saveDraft({
        id: emailId,
        to,
        cc,
        bcc,
        subject,
        html: htmlContent,
        attachments
      });

      if (result.success) {
        toast.success(emailId ? 'Draft updated successfully!' : 'Draft saved successfully!');
        if (result.data?._id) {
          setEmailId(result.data._id);
        }
      } else {
        toast.error(result.message || 'Failed to save draft.');
      }
    } catch (error) {
      console.error('Draft save error:', error);
      toast.error('Error occurred while saving draft.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Action: Load Draft back into compose
  const handleLoadDraft = (draft) => {
    setEmailId(draft._id);
    setTo(draft.to || '');
    setCc(draft.cc || '');
    setBcc(draft.bcc || '');
    setSubject(draft.subject || '');
    setHtmlContent(draft.html || '');
    setAttachments(draft.attachments || []);
    setIsPreviewMode(false);
    setActiveTab('compose');
    toast.success('Draft loaded successfully!');
  };

  // Action: Delete Email/Draft record
  const handleDeleteEmail = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this email record?')) return;

    try {
      const result = await emailService.deleteEmail(id);
      if (result.success) {
        toast.success('Email record deleted successfully.');
        setEmailsList(prev => prev.filter(email => email._id !== id));
        if (selectedEmail && selectedEmail._id === id) {
          setSelectedEmail(null);
        }
      } else {
        toast.error(result.message || 'Failed to delete record.');
      }
    } catch (error) {
      console.error('Delete email error:', error);
      toast.error('Error occurred while deleting email record.');
    }
  };

  // Helper: Clear composer state
  const clearComposer = () => {
    setEmailId(null);
    setTo('');
    setCc('');
    setBcc('');
    setSubject('');
    setHtmlContent('');
    setAttachments([]);
    setIsPreviewMode(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'var(--accent)';
      case 'draft': return '#3b82f6';
      case 'failed': return 'var(--error)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title / Action bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 4px 0' }}>
            Communications Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Send custom messages using Resend, view communications history, and configure sender domains.
          </p>
        </div>
      </div>

      {/* Tabs Layout */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '8px' }}>
        {[
          { id: 'compose', label: 'Compose Email', icon: <Plus size={16} /> },
          { id: 'sent', label: 'Sent History', icon: <Mail size={16} /> },
          { id: 'drafts', label: 'Drafts', icon: <Save size={16} /> },
          { id: 'settings', label: 'Domain Settings', icon: <Settings size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedEmail(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: activeTab === tab.id ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => {
              if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '24px 32px',
        minHeight: '400px',
        boxShadow: 'var(--shadow-sm)'
      }}>

        {/* Tab: Compose Email */}
        {activeTab === 'compose' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                {emailId ? 'Edit Email Draft' : 'Compose Message'}
              </h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={12} />
                  Sender address: <strong>team@altawebstudios.xyz</strong>
                </span>
                {emailId && (
                  <button
                    onClick={clearComposer}
                    style={{
                      fontSize: '12px',
                      color: 'var(--error)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Discard Changes / New Email
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* To field */}
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>To *</label>
                <input
                  type="text"
                  placeholder="recipient@domain.com (comma separated for multiple)"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  style={{
                    padding: '10px 16px',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {/* CC field */}
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>CC</label>
                <input
                  type="text"
                  placeholder="cc@domain.com"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {/* BCC field */}
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>BCC</label>
                <input
                  type="text"
                  placeholder="bcc@domain.com"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {/* Subject field */}
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Subject *</label>
                <input
                  type="text"
                  placeholder="Enter email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  style={{
                    padding: '10px 16px',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              {/* Body editor */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Message Body *</label>
                {!isPreviewMode ? (
                  <RichTextEditor
                    value={htmlContent}
                    onChange={setHtmlContent}
                    placeholder="Enter email body text. Rich HTML formatting is supported."
                  />
                ) : (
                  <div style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '24px',
                    minHeight: '220px',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '16px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                      Rendered HTML Preview
                    </span>
                    <div 
                      dangerouslySetInnerHTML={{ __html: htmlContent || '<p style="color:var(--text-muted)">[No content written]</p>' }} 
                      style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6' }}
                    />
                  </div>
                )}
              </div>

              {/* File Attachment list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '8px 16px',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-glass)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                  >
                    <Paperclip size={14} /> Add Attachment
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Max file size: 5MB</span>
                </div>

                {attachments.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {attachments.map((att, idx) => (
                      <div key={idx} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-color)',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}>
                        <FileText size={14} style={{ color: 'var(--primary)' }} />
                        <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{att.filename}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>({(att.size / 1024).toFixed(1)} KB)</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(idx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            padding: '2px',
                            borderRadius: '50%'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--error)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '10px 20px',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-glass)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                >
                  <Eye size={16} />
                  {isPreviewMode ? 'Edit Mode' : 'Preview HTML'}
                </button>

                <button
                  type="button"
                  disabled={isSavingDraft}
                  onClick={handleSaveDraft}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '10px 20px',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: isSavingDraft ? 'not-allowed' : 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => !isSavingDraft && (e.currentTarget.style.backgroundColor = 'var(--bg-glass)')}
                  onMouseLeave={e => !isSavingDraft && (e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)')}
                >
                  {isSavingDraft ? <RefreshCw size={16} className="spin-animation" /> : <Save size={16} />}
                  {isSavingDraft ? 'Saving...' : 'Save Draft'}
                </button>

                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    padding: '10px 24px',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isSending ? 'not-allowed' : 'pointer',
                    boxShadow: 'var(--shadow-glow)',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => !isSending && (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                  onMouseLeave={e => !isSending && (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                >
                  {isSending ? <RefreshCw size={16} className="spin-animation" /> : <Send size={16} />}
                  {isSending ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabs: Sent Emails & Drafts */}
        {(activeTab === 'sent' || activeTab === 'drafts') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Search and filter header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, textTransform: 'capitalize' }}>
                {activeTab} Folder
              </h3>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search by recipient or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    width: '240px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={fetchEmails}
                  disabled={isLoadingList}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={14} className={isLoadingList ? 'spin-animation' : ''} />
                </button>
              </div>
            </div>

            {/* List Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: selectedEmail ? '1fr 400px' : '1fr', gap: '24px', transition: 'all 0.3s' }}>
              
              {/* Table list */}
              <div style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-tertiary)'
              }}>
                {isLoadingList ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Loading {activeTab} list...</span>
                  </div>
                ) : emailsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                    No records found in this folder.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: '600' }}>To</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Subject</th>
                        {activeTab === 'sent' && <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>}
                        <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                          {activeTab === 'sent' ? 'Sent On' : 'Saved On'}
                        </th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailsList.map((email) => (
                        <tr 
                          key={email._id}
                          onClick={() => {
                            if (activeTab === 'drafts') {
                              handleLoadDraft(email);
                            } else {
                              setSelectedEmail(email);
                            }
                          }}
                          style={{
                            borderBottom: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            backgroundColor: selectedEmail && selectedEmail._id === email._id ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                            transition: 'background var(--transition-fast)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)'}
                          onMouseLeave={e => {
                            if (!selectedEmail || selectedEmail._id !== email._id) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            } else {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                            }
                          }}
                        >
                          <td style={{ padding: '14px 16px', fontWeight: '500', color: 'var(--text-primary)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {email.to || '(No Recipient)'}
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--text-primary)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {email.subject || '(No Subject)'}
                          </td>
                          {activeTab === 'sent' && (
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                border: `1px solid ${getStatusColor(email.status)}40`,
                                color: getStatusColor(email.status),
                                backgroundColor: getStatusColor(email.status) + '10',
                                fontWeight: '700'
                              }}>
                                {email.status}
                              </span>
                            </td>
                          )}
                          <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                            {formatDate(email.sentAt || email.createdAt)}
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button
                                title={activeTab === 'drafts' ? 'Open Draft' : 'View Details'}
                                onClick={() => {
                                  if (activeTab === 'drafts') {
                                    handleLoadDraft(email);
                                  } else {
                                    setSelectedEmail(email);
                                  }
                                }}
                                style={{
                                  padding: '6px',
                                  borderRadius: '4px',
                                  border: '1px solid var(--border-color)',
                                  backgroundColor: 'var(--bg-secondary)',
                                  color: 'var(--text-primary)',
                                  cursor: 'pointer'
                                }}
                              >
                                {activeTab === 'drafts' ? <Plus size={14} /> : <Eye size={14} />}
                              </button>
                              <button
                                title="Delete Record"
                                onClick={(e) => handleDeleteEmail(email._id, e)}
                                style={{
                                  padding: '6px',
                                  borderRadius: '4px',
                                  border: '1px solid var(--border-color)',
                                  backgroundColor: 'rgba(244, 63, 94, 0.05)',
                                  color: 'var(--error)',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Sidebar Detail View for Sent History */}
              {selectedEmail && (
                <div style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: 'var(--shadow-sm)',
                  maxHeight: '600px',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase' }}>Email Details</span>
                    <button 
                      onClick={() => setSelectedEmail(null)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>From</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedEmail.from}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>To</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedEmail.to}</strong>
                    </div>
                    {selectedEmail.cc && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>CC</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedEmail.cc}</span>
                      </div>
                    )}
                    {selectedEmail.bcc && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>BCC</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedEmail.bcc}</span>
                      </div>
                    )}
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Subject</span>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{selectedEmail.subject}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Date</span>
                      <span style={{ color: 'var(--text-primary)' }}>{formatDate(selectedEmail.sentAt || selectedEmail.createdAt)}</span>
                    </div>
                  </div>

                  {/* Attachment metadata */}
                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                        Attachments ({selectedEmail.attachments.length})
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {selectedEmail.attachments.map((att, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-primary)' }}>
                            <Paperclip size={12} style={{ color: 'var(--primary)' }} />
                            <span>{att.filename}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Body display */}
                  <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '16px',
                    marginTop: '8px'
                  }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>HTML Content</span>
                    <div style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '12px',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                      overflowX: 'auto',
                      minHeight: '100px'
                    }}
                    dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                    />
                  </div>

                  {/* Reuse as template button */}
                  <button
                    onClick={() => {
                      clearComposer();
                      setTo(selectedEmail.to || '');
                      setCc(selectedEmail.cc || '');
                      setBcc(selectedEmail.bcc || '');
                      setSubject(`Fwd: ${selectedEmail.subject}`);
                      setHtmlContent(selectedEmail.html || '');
                      setAttachments(selectedEmail.attachments || []);
                      setActiveTab('compose');
                      setSelectedEmail(null);
                      toast.success('Email loaded into composer.');
                    }}
                    style={{
                      marginTop: '12px',
                      padding: '10px',
                      borderRadius: 'var(--border-radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Reuse as Template
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab: DNS Settings */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} style={{ color: 'var(--primary)' }} /> DNS Setup & Verified Sender Identity
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                To send emails reliably from <strong>team@altawebstudios.xyz</strong> to spam-sensitive inbox providers, you must configure the following records on your domain name provider (e.g., GoDaddy, Namecheap, Cloudflare) for <strong>altawebstudios.xyz</strong>.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              padding: '16px 20px',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '13px',
              color: 'var(--text-primary)',
              lineHeight: '1.6'
            }}>
              <strong>Note on Verification:</strong> Resend validates domains automatically using DKIM signatures. Once you add these DNS entries and they propagate (usually within a few minutes to hours), Resend will change your domain status to <strong>Verified</strong>.
            </div>

            {/* DNS Records Tables */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>1. Domain Authentication (DKIM Records)</strong>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', backgroundColor: 'var(--bg-tertiary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Type</th>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Host / Name</th>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Value</th>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>TTL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>CNAME</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>resend._domainkey</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--accent)' }}>dkim.resend.com</td>
                      <td style={{ padding: '12px 16px' }}>Auto / 1 Hour</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>CNAME</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>resend2._domainkey</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--accent)' }}>dkim2.resend.com</td>
                      <td style={{ padding: '12px 16px' }}>Auto / 1 Hour</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>2. SPF & DMARC Security Records (Recommended)</strong>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', backgroundColor: 'var(--bg-tertiary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Type</th>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Host / Name</th>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Value</th>
                      <th style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>TXT</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>@</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--accent)' }}>v=spf1 include:feedback.resend.com ~all</td>
                      <td style={{ padding: '12px 16px' }}>Authorize Resend servers to send mail on behalf of your domain.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>TXT</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>_dmarc</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--accent)' }}>v=DMARC1; p=none; rua=mailto:dmarc-reports@altawebstudios.xyz</td>
                      <td style={{ padding: '12px 16px' }}>Provide policy instructions to receiver servers for handling spoofed mails.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              padding: '20px',
              borderRadius: 'var(--border-radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <span style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={16} style={{ color: 'var(--primary)' }} /> Environment Credentials Status
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                  <span>Sender ID: <strong>Alta Web Studios Team</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                  <span>Sender Email: <strong>team@altawebstudios.xyz</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                  <span>API Key Configured: <strong>Yes (server side)</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EmailsPage;
