import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, Calendar, DollarSign, RefreshCw, AlertTriangle, Plus } from 'lucide-react';
import leadService from '../../services/leadService';
import LeadDetailsModal from '../../components/dashboard/LeadDetailsModal';
import AddLeadModal from '../../components/dashboard/AddLeadModal';
import { toast } from 'react-hot-toast';

export const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal states
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Delete confirm state
  const [leadToDelete, setLeadToDelete] = useState(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const result = await leadService.getLeads();
      if (result.success) {
        setLeads(result.data || []);
      }
    } catch (error) {
      console.error('Failed to load leads:', error);
      toast.error('Failed to retrieve leads from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...leads];

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    // Search term filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        (lead.company && lead.company.toLowerCase().includes(term))
      );
    }

    setFilteredLeads(result);
  }, [leads, searchTerm, statusFilter]);

  const handleDeleteClick = (lead) => {
    setLeadToDelete(lead);
  };

  const confirmDelete = async () => {
    if (!leadToDelete) return;
    
    try {
      await leadService.deleteLead(leadToDelete._id);
      toast.success('Lead deleted successfully');
      setLeads(prev => prev.filter(l => l._id !== leadToDelete._id));
      setLeadToDelete(null);
    } catch (error) {
      console.error('Delete lead error:', error);
      toast.error('Failed to delete lead. Please try again.');
    }
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
  };

  const handleModalStatusUpdated = () => {
    // Refresh leads data
    fetchLeads();
    
    // Update selected lead details in modal view
    const updatedLead = leads.find(l => l._id === selectedLead._id);
    if (updatedLead) {
      setSelectedLead(updatedLead);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusStyle = (status) => {
    let color = 'var(--text-secondary)';
    let bg = 'rgba(255, 255, 255, 0.05)';

    switch (status) {
      case 'New':
        color = '#3b82f6';
        bg = 'rgba(59, 130, 246, 0.1)';
        break;
      case 'Contacted':
        color = 'var(--primary)';
        bg = 'var(--primary-glow)';
        break;
      case 'Qualified':
        color = '#f59e0b';
        bg = 'rgba(245, 158, 11, 0.1)';
        break;
      case 'Proposal Sent':
        color = '#a855f7';
        bg = 'rgba(168, 85, 247, 0.1)';
        break;
      case 'Won':
        color = 'var(--accent)';
        bg = 'var(--accent-glow)';
        break;
      case 'Lost':
        color = 'var(--error)';
        bg = 'rgba(244, 63, 94, 0.1)';
        break;
      default:
        break;
    }

    return {
      color,
      backgroundColor: bg,
      padding: '4px 10px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'inline-block'
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title / Action bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 4px 0' }}>
            Lead Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Review, qualify, and update contact requests or create manual outreach leads.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsAddOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-glow)',
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
          >
            <Plus size={16} />
            Add Lead
          </button>
          <button
            onClick={fetchLeads}
            disabled={isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '10px 16px',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          >
            <RefreshCw size={14} className={isLoading ? 'spin-animation' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter / Search Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        padding: '16px 20px',
        borderRadius: 'var(--border-radius-md)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '400px', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 48px',
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

        {/* Status filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={16} /> Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
              background: 'var(--bg-tertiary) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center',
              backgroundSize: '16px',
              paddingRight: '36px'
            }}
          >
            <option value="All">All statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table Container */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Fetching leads dataset...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            No leads found matching your criteria.
          </div>
        ) : (
          /* Scroll wrapper for table responsiveness */
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Phone</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Company</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Budget</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Source</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-primary)' }}>{lead.name}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{lead.email || '-'}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{lead.phone || '-'}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-primary)' }}>{lead.company || '-'}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--accent)', fontWeight: '500' }}>{lead.budget || '-'}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{lead.source || 'Website Contact Form'}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={getStatusStyle(lead.status)}>{lead.status}</span>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatDate(lead.createdAt)}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleViewDetails(lead)}
                          title="View Details"
                          style={{
                            color: 'var(--primary)',
                            backgroundColor: 'var(--primary-glow)',
                            border: '1px solid var(--border-focus)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-glow)';
                            e.currentTarget.style.color = 'var(--primary)';
                          }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(lead)}
                          title="Delete Lead"
                          style={{
                            color: 'var(--error)',
                            backgroundColor: 'rgba(244, 63, 94, 0.08)',
                            border: '1px solid rgba(244, 63, 94, 0.2)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
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
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {isDetailsOpen && selectedLead && (
        <LeadDetailsModal
          lead={leads.find(l => l._id === selectedLead._id)}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedLead(null);
          }}
          onStatusUpdated={handleModalStatusUpdated}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {leadToDelete && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10,10,12,0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
            textAlign: 'center',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              color: 'var(--error)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 10px 0' }}>
              Confirm Delete
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 24px 0', lineHeight: '1.5' }}>
              Are you sure you want to permanently delete lead <strong>{leadToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setLeadToDelete(null)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  flex: 1
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: 'var(--error)',
                  color: '#ffffff',
                  border: 'none',
                  flex: 1
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddOpen && (
        <AddLeadModal
          onClose={() => setIsAddOpen(false)}
          onSuccess={fetchLeads}
        />
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LeadsPage;
