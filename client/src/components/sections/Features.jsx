import React from 'react';

export const Features = () => {
    return (
        <section className="py-16 md:py-24" style={{ background: '#fafbe7' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                {/* Top Row: Dark card + Light card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                    {/* Big dark card */}
                    <div className="lg:col-span-2 p-8 md:p-12" style={{ background: '#1a1d11', borderRadius: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700, lineHeight: 1.2, color: '#fafbe7', margin: '0 0 32px 0', maxWidth: '400px' }}>
                                Web Platforms that streamline your business.
                            </h2>
                            <a href="#" style={{ background: '#c8f135', color: '#1a1d11', borderRadius: '10px', padding: '14px 24px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
                                SEE ALL FEATURES
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_outward</span>
                            </a>
                        </div>
                        {/* Decorative dashboard UI element */}
                        <div className="hidden sm:block" style={{ position: 'absolute', bottom: '-30px', right: '-70px', width: '55%', height: '80%', background: 'rgba(255,255,255,0.05)', borderRadius: '20px 0 0 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdjqfelidDPbR5aCl0ZR6R3_CvRo_CaHMJn9vNzcIL6CjHDzTdu3BLOop_z_8LXlK_YnjSlKl_lsZu8pqlPnU18CATtqdOTmfyCxZUu5wfyv_BbCdUA7go1uSozRhPh3lSmHmhvKB6EXrZJJxhUjQCLP1X6XGtcgkCNaYo9bBgHjlsQSmMR76QoYOld5ZH7eQCIgMPM8IZzEZYQOPXwaSwVySPYTbTeE7EHBgNjORHBMvrhHqjwfD02AUjNcVKzE_cNpAJFa4XOQ"
                                alt="Dashboard UI"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'overlay', borderRadius: '20px 0 0 0' }} />
                        </div>
                    </div>

                    {/* Manage Projects card */}
                    <div className="hover-card p-8 md:p-10" style={{ background: '#fff', borderRadius: '28px', border: '1px solid rgba(197,201,174,0.4)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e2e4d1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#1a1d11' }}>folder_managed</span>
                        </div>
                        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '24px', fontWeight: 700, margin: '0 0 16px 0', color: '#1a1d11' }}>
                            Manage Projects</h3>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#5f5e5e', margin: 0 }}>
                            Snap and categorize assets in seconds and link your design system efficiently across your team.
                        </p>
                    </div>
                </div>

                {/* Bottom Row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="hover-card p-8 md:p-10" style={{ background: '#fff', borderRadius: '28px', border: '1px solid rgba(197,201,174,0.4)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e2e4d1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#1a1d11' }}>person</span>
                        </div>
                        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, margin: '0 0 14px 0', color: '#1a1d11' }}>
                            Easy Invoicing</h3>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#5f5e5e', margin: 0 }}>
                            Automate recurring invoices and save time by using pre-built templates. Get paid on time, every time.
                        </p>
                    </div>
                    <div className="hover-card p-8 md:p-10" style={{ background: '#fff', borderRadius: '28px', border: '1px solid rgba(197,201,174,0.4)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e2e4d1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#1a1d11' }}>lightbulb</span>
                        </div>
                        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, margin: '0 0 14px 0', color: '#1a1d11' }}>
                            Streamline Workflow</h3>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#5f5e5e', margin: 0 }}>
                            Set up workflows and bonuses for all your teams, and never be late on deliverables again.
                        </p>
                    </div>
                    <div className="hover-card p-8 md:p-10" style={{ background: '#fff', borderRadius: '28px', border: '1px solid rgba(197,201,174,0.4)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e2e4d1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#1a1d11' }}>visibility</span>
                        </div>
                        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, margin: '0 0 14px 0', color: '#1a1d11' }}>
                            Complete Visibility</h3>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#5f5e5e', margin: 0 }}>
                            Get real-time visibility into every task and milestone, with a neat dashboard built for clarity.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
