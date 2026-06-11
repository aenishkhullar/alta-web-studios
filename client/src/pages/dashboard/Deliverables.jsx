import React, { useState, useEffect } from 'react';
import { Briefcase, FolderPlus, List, KanbanSquare, Calendar, RefreshCw, AlertTriangle, Plus, Eye, Edit, Trash2, CheckSquare } from 'lucide-react';
import deliverableService from '../../services/deliverableService';
import AddDeliverableModal from '../../components/dashboard/AddDeliverableModal';
import EditDeliverableModal from '../../components/dashboard/EditDeliverableModal';
import DeliverableDetailsModal from '../../components/dashboard/DeliverableDetailsModal';
import { toast } from 'react-hot-toast';

export const Deliverables = () => {
  const [deliverables, setDeliverables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // table or board
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    review: 0,
    delivered: 0
  });

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [deliverableToDelete, setDeliverableToDelete] = useState(null);

  const fetchDeliverables = async () => {
    setIsLoading(true);
    try {
      const result = await deliverableService.getDeliverables();
      if (result.success) {
        const delivs = result.data || [];
        setDeliverables(delivs);
        calculateStats(delivs);
      }
    } catch (error) {
      console.error('Failed to load deliverables:', error);
      toast.error('Failed to fetch deliverables database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliverables();
  }, []);

  const calculateStats = (delivList) => {
    const total = delivList.length;
    const pending = delivList.filter(d => d.status === 'Pending').length;
    const review = delivList.filter(d => d.status === 'Review').length;
    const delivered = delivList.filter(d => d.status === 'Delivered').length;

    setStats({ total, pending, review, delivered });
  };

  const handleDeleteClick = (deliverable) => {
    setDeliverableToDelete(deliverable);
  };

  const confirmDelete = async () => {
    if (!deliverableToDelete) return;
    try {
      await deliverableService.deleteDeliverable(deliverableToDelete._id);
      toast.success('Deliverable deleted successfully');
      setDeliverables(prev => prev.filter(d => d._id !== deliverableToDelete._id));
      calculateStats(deliverables.filter(d => d._id !== deliverableToDelete._id));
      setDeliverableToDelete(null);
    } catch (error) {
      console.error('Delete deliverable error:', error);
      toast.error('Failed to delete deliverable.');
    }
  };

  const handleViewDetails = (deliverable) => {
    setSelectedDeliverable(deliverable);
    setIsDetailsOpen(true);
  };

  const handleEditClick = (deliverable) => {
    setSelectedDeliverable(deliverable);
    setIsEditOpen(true);
  };

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

  const getPriorityStyle = (priority) => {
    let color = 'var(--text-secondary)';
    let bg = 'rgba(255, 255, 255, 0.05)';

    switch (priority) {
      case 'Low':
        color = 'var(--text-muted)';
        bg = 'rgba(255, 255, 255, 0.02)';
        break;
      case 'Medium':
        color = '#f59e0b';
        bg = 'rgba(245, 158, 11, 0.1)';
        break;
      case 'High':
        color = '#ef4444';
        bg = 'rgba(239, 68, 68, 0.1)';
        break;
      case 'Critical':
        color = '#b91c1c';
        bg = 'rgba(185, 28, 28, 0.1)';
        break;
      default:
        break;
    }

    return {
      color,
      backgroundColor: bg,
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const boardColumns = ['Pending', 'In Progress', 'Review', 'Approved', 'Delivered'];

  const statsList = [
    { label: 'Total Deliverables', value: stats.total, icon: <CheckSquare size={22} />, color: 'var(--primary)', glow: 'var(--primary-glow)' },
    { label: 'Pending Deliverables', value: stats.pending, icon: <RefreshCw size={22} />, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.1)' },
    { label: 'In Review', value: stats.review, icon: <Eye size={22} />, color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Delivered', value: stats.delivered, icon: <FolderPlus size={22} />, color: 'var(--accent)', glow: 'var(--accent-glow)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title / Action bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 4px 0' }}>
            Deliverables
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Track task deliverables, files, category tags, and feedback reviews for clients.
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
            New Deliverable
          </button>
          <button
            onClick={fetchDeliverables}
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

      {/* Stats Cards Grid */}
      <div className="grid-cols-4">
        {statsList.map((card, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '20px 24px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                {card.label}
              </span>
              <span style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'block', lineHeight: '1' }}>
                {card.value}
              </span>
            </div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: card.glow,
              color: card.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${card.color}15`
            }}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* View Mode Toggle Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        padding: '12px 20px',
        borderRadius: 'var(--border-radius-md)'
      }}>
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
          Display Configuration
        </span>
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setViewMode('table')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: viewMode === 'table' ? 'var(--bg-secondary)' : 'transparent',
              color: viewMode === 'table' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: viewMode === 'table' ? '1px solid var(--border-color)' : '1px solid transparent',
              transition: 'all var(--transition-fast)'
            }}
          >
            <List size={14} /> Table View
          </button>
          <button
            onClick={() => setViewMode('board')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: viewMode === 'board' ? 'var(--bg-secondary)' : 'transparent',
              color: viewMode === 'board' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: viewMode === 'board' ? '1px solid var(--border-color)' : '1px solid transparent',
              transition: 'all var(--transition-fast)'
            }}
          >
            <KanbanSquare size={14} /> Board View
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-lg)' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading deliverables cockpit...</span>
        </div>
      ) : deliverables.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-lg)' }}>
          No deliverables configured yet. Click "New Deliverable" to add one.
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Deliverable</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Project</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Client</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Category</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Priority</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Due Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Assigned To</th>
                  <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.map((deliv) => (
                  <tr
                    key={deliv._id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-primary)' }}>{deliv.title}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{deliv.projectName}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{deliv.clientName}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{deliv.category}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        color: getStatusColor(deliv.status), 
                        backgroundColor: getStatusColor(deliv.status) + '15', 
                        border: `1px solid ${getStatusColor(deliv.status)}30`,
                        padding: '3px 8px', 
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {deliv.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={getPriorityStyle(deliv.priority)}>{deliv.priority}</span>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatDate(deliv.dueDate)}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{deliv.assignedTo || '-'}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleViewDetails(deliv)}
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
                          onClick={() => handleEditClick(deliv)}
                          title="Edit Deliverable"
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
                          onClick={() => handleDeleteClick(deliv)}
                          title="Delete Deliverable"
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
        </div>
      ) : (
        /* BOARD VIEW */
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px', width: '100%', minHeight: '500px', boxSizing: 'border-box' }}>
          {boardColumns.map((colName) => {
            const filteredList = deliverables.filter(d => d.status === colName);
            return (
              <div
                key={colName}
                style={{
                  flex: '0 0 280px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '75vh',
                  boxSizing: 'border-box'
                }}
              >
                {/* Column Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getStatusColor(colName) }}></span>
                    <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-primary)' }}>{colName}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>
                    {filteredList.length}
                  </span>
                </div>

                {/* Columns Cards Slot (Prepared structure for drag-and-drop) */}
                <div 
                  className="kanban-drop-lane"
                  style={{ flexGrow: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}
                >
                  {filteredList.map((deliv) => (
                    <div
                      key={deliv._id}
                      onClick={() => handleViewDetails(deliv)}
                      className="proj-kanban-card"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--border-radius-md)',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = getStatusColor(colName);
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {deliv.category}
                        </span>
                        <span style={getPriorityStyle(deliv.priority)}>
                          {deliv.priority}
                        </span>
                      </div>
                      
                      <h4 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 4px 0', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {deliv.title}
                      </h4>
                      
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>
                        Proj: {deliv.projectName}
                      </span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <Calendar size={12} />
                        <span>Due: {formatDate(deliv.dueDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Deliverable Modal */}
      {isAddOpen && (
        <AddDeliverableModal
          onClose={() => setIsAddOpen(false)}
          onSuccess={fetchDeliverables}
        />
      )}

      {/* Edit Deliverable Modal */}
      {isEditOpen && selectedDeliverable && (
        <EditDeliverableModal
          deliverable={selectedDeliverable}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedDeliverable(null);
          }}
          onUpdated={fetchDeliverables}
        />
      )}

      {/* Deliverable Details Modal */}
      {isDetailsOpen && selectedDeliverable && (
        <DeliverableDetailsModal
          deliverable={deliverables.find(d => d._id === selectedDeliverable._id)}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedDeliverable(null);
          }}
          onUpdated={fetchDeliverables}
          onEditTrigger={handleEditClick}
          onDeleteTrigger={handleDeleteClick}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deliverableToDelete && (
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
              Are you sure you want to permanently delete deliverable <strong>{deliverableToDelete.title}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeliverableToDelete(null)}
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

export default Deliverables;
