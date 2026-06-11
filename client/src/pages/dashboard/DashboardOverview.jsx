import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, FileText, CheckCircle2, UserCheck, TrendingUp, AlertCircle, ArrowRight, CheckSquare, RefreshCw, Users } from 'lucide-react';
import leadService from '../../services/leadService';
import deliverableService from '../../services/deliverableService';
import dashboardService from '../../services/dashboardService';
import { toast } from 'react-hot-toast';

export const DashboardOverview = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [overviewStats, setOverviewStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    wonLeads: 0,
    activeClients: 0,
    totalClients: 0
  });

  const [delivStats, setDelivStats] = useState({
    total: 0,
    pending: 0,
    overdue: 0,
    deliveredThisMonth: 0
  });

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, delivRes, statsRes] = await Promise.all([
        leadService.getLeads(),
        deliverableService.getDeliverables(),
        dashboardService.getStats()
      ]);

      if (leadsRes.success) {
        setLeads(leadsRes.data || []);
      }
      
      if (delivRes.success) {
        const delivList = delivRes.data || [];
        setDeliverables(delivList);
        calculateDelivStats(delivList);
      }

      if (statsRes.success) {
        setOverviewStats(statsRes.data || {
          totalLeads: 0,
          newLeads: 0,
          contactedLeads: 0,
          wonLeads: 0,
          activeClients: 0,
          totalClients: 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard overview data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const calculateDelivStats = (delivList) => {
    const total = delivList.length;
    const pending = delivList.filter(d => d.status === 'Pending').length;
    
    const currentDate = new Date();
    const overdue = delivList.filter(d => {
      if (d.status === 'Delivered') return false;
      if (!d.dueDate) return false;
      return new Date(d.dueDate) < currentDate;
    }).length;

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const deliveredThisMonth = delivList.filter(d => {
      if (d.status !== 'Delivered') return false;
      if (!d.completedDate) return false;
      const completed = new Date(d.completedDate);
      return completed.getMonth() === currentMonth && completed.getFullYear() === currentYear;
    }).length;

    setDelivStats({ total, pending, overdue, deliveredThisMonth });
  };

  const mainStatsCards = [
    { label: 'Total Leads', value: overviewStats.totalLeads, desc: 'All system leads', icon: <Inbox size={22} />, color: 'var(--primary)', glow: 'var(--primary-glow)' },
    { label: 'New Leads', value: overviewStats.newLeads, desc: 'Awaiting outreach', icon: <AlertCircle size={22} />, color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Contacted Leads', value: overviewStats.contactedLeads, desc: 'In active discussion', icon: <UserCheck size={22} />, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.1)' },
    { label: 'Won Leads', value: overviewStats.wonLeads, desc: 'Converted to clients', icon: <CheckCircle2 size={22} />, color: 'var(--accent)', glow: 'var(--accent-glow)' },
    { label: 'Active Clients', value: overviewStats.activeClients, desc: 'Currently engaged clients', icon: <TrendingUp size={22} />, color: 'var(--accent)', glow: 'var(--accent-glow)' },
    { label: 'Total Clients', value: overviewStats.totalClients, desc: 'All client accounts', icon: <Users size={22} />, color: '#a855f7', glow: 'rgba(168, 85, 247, 0.1)' }
  ];

  const delivCards = [
    { label: 'Total Deliverables', value: delivStats.total, icon: <CheckSquare size={22} />, color: 'var(--primary)', glow: 'var(--primary-glow)' },
    { label: 'Pending Deliverables', value: delivStats.pending, icon: <RefreshCw size={22} />, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.1)' },
    { label: 'Overdue Deliverables', value: delivStats.overdue, icon: <AlertCircle size={22} />, color: 'var(--error)', glow: 'rgba(244, 63, 94, 0.1)' },
    { label: 'Delivered This Month', value: delivStats.deliveredThisMonth, icon: <CheckSquare size={22} />, color: 'var(--accent)', glow: 'var(--accent-glow)' }
  ];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Loading overview metrics...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div style={{
        padding: '28px 32px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius-lg)',
        backgroundImage: 'linear-gradient(135deg, var(--bg-secondary) 60%, var(--primary-glow) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 6px 0' }}>
            Workspace Metrics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
            Here is a summary of active inbound leads, project deliverables, and team activities.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/dashboard/leads')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '12px 20px',
              borderRadius: 'var(--border-radius-md)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          >
            Leads Board
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/dashboard/deliverables')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: 'var(--border-radius-md)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
          >
            Deliverables
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* CRM Stats Section */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
          CRM Pipeline & Client Overview
        </h2>
        {/* Stats Cards Grid (Responsive 6 columns on desktop, 2-3 on tablet, 1 on mobile) */}
        <div className="overview-stats-grid">
          {mainStatsCards.map((card, idx) => (
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
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {card.desc}
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
                border: `1px solid ${card.color}15`,
                flexShrink: 0
              }}>
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables Section */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
          Deliverables Overview
        </h2>
        {/* Stats Cards Grid */}
        <div className="grid-cols-4">
          {delivCards.map((card, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '24px',
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
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                  {card.label}
                </span>
                <span style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', display: 'block', lineHeight: '1' }}>
                  {card.value}
                </span>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
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
      </div>

      {/* Recent Activity / Details Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '28px 32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-heading)', margin: 0 }}>
              Recent Inquiries
            </h2>
            <button
              onClick={() => navigate('/dashboard/leads')}
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-hover)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
            >
              View All Leads <ArrowRight size={14} />
            </button>
          </div>

          {leads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              No inquiries found. Check your website lead form integrations.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead._id}
                  onClick={() => navigate('/dashboard/leads')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-glow)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {lead.name}
                      </span>
                      <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {lead.company || 'Private Inquiry'} • {lead.email}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: lead.status === 'New' ? '#3b82f615' : lead.status === 'Won' ? 'var(--accent-glow)' : 'rgba(255,255,255,0.05)',
                      color: lead.status === 'New' ? '#3b82f6' : lead.status === 'Won' ? 'var(--accent)' : 'var(--text-secondary)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {lead.status}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Styles block for responsive grid mapping */}
      <style>{`
        .overview-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 12px;
        }
        @media (max-width: 900px) {
          .overview-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .overview-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardOverview;
