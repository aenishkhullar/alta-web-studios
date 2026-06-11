import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, RefreshCw, AlertTriangle, Users } from 'lucide-react';
import clientService from '../../services/clientService';
import ClientDetailsModal from '../../components/dashboard/ClientDetailsModal';
import EditClientModal from '../../components/dashboard/EditClientModal';
import { toast } from 'react-hot-toast';

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const result = await clientService.getClients();
      if (result.success) {
        setClients(result.data || []);
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
      toast.error('Failed to retrieve clients from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...clients];

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(client => client.status === statusFilter);
    }

    // Search term filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(client => 
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        (client.company && client.company.toLowerCase().includes(term))
      );
    }

    setFilteredClients(result);
  }, [clients, searchTerm, statusFilter]);

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
  };

  const confirmDelete = async () => {
    if (!clientToDelete) return;
    
    try {
      await clientService.deleteClient(clientToDelete._id);
      toast.success('Client deleted successfully');
      setClients(prev => prev.filter(c => c._id !== clientToDelete._id));
      setClientToDelete(null);
    } catch (error) {
      console.error('Delete client error:', error);
      toast.error('Failed to delete client. Please try again.');
    }
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setIsEditOpen(true);
  };

  const handleClientUpdated = () => {
    fetchClients();
  };

  const getStatusStyle = (status) => {
    let color = 'var(--text-secondary)';
    let bg = 'rgba(255, 255, 255, 0.05)';

    switch (status) {
      case 'Active':
        color = 'var(--accent)';
        bg = 'var(--accent-glow)';
        break;
      case 'Onboarding':
        color = '#3b82f6';
        bg = 'rgba(59, 130, 246, 0.1)';
        break;
      case 'Paused':
        color = '#f59e0b';
        bg = 'rgba(245, 158, 11, 0.1)';
        break;
      case 'Completed':
        color = '#a855f7';
        bg = 'rgba(168, 85, 247, 0.1)';
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
            Client Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Manage active client accounts, project status, onboarding details, and profile data.
          </p>
        </div>
        <button
          onClick={fetchClients}
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
            placeholder="Search clients by name, email, company..."
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
            <option value="Active">Active</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Clients Table Container */}
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
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading client directory...</span>
          </div>
        ) : filteredClients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            No clients found matching your criteria.
          </div>
        ) : (
          /* Scroll wrapper for table responsiveness */
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Company</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Phone</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client._id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-primary)' }}>{client.name}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-primary)' }}>{client.company || '-'}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{client.email || '-'}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{client.phone || '-'}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={getStatusStyle(client.status)}>{client.status}</span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleViewDetails(client)}
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
                          onClick={() => handleEditClick(client)}
                          title="Edit Client"
                          style={{
                            color: 'var(--accent)',
                            backgroundColor: 'var(--accent-glow)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
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
                            e.currentTarget.style.backgroundColor = 'var(--accent)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-glow)';
                            e.currentTarget.style.color = 'var(--accent)';
                          }}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(client)}
                          title="Delete Client"
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
      {isDetailsOpen && selectedClient && (
        <ClientDetailsModal
          client={clients.find(c => c._id === selectedClient._id)}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedClient(null);
          }}
        />
      )}

      {/* Edit Client Modal */}
      {isEditOpen && selectedClient && (
        <EditClientModal
          client={selectedClient}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedClient(null);
          }}
          onUpdated={handleClientUpdated}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {clientToDelete && (
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
              Are you sure you want to permanently delete client <strong>{clientToDelete.name}</strong>? This will remove all their records.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setClientToDelete(null)}
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

export default Clients;
