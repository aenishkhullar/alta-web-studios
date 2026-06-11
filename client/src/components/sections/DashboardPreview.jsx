import React from 'react';

export const DashboardPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left: Dashboard image */}
                <div style={{position: 'relative'}}>
                    <img
                        src="/src/assets/image-dashboard.jpeg"
                        alt="Dashboard preview"
                        className="w-full lg:w-[80%] mx-auto"
                        style={{
                            borderRadius: '24px',
                            boxShadow: '0 20px 50px rgba(22, 22, 22, 0.18)',
                            display: 'block',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                {/* Right: Text content */}
                <div>
                    <h2 style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 700, lineHeight: 1.2, color: '#1a1d11', margin: '0 0 24px 0'}}>
                        Manage all your projects in one place
                    </h2>
                    <p style={{fontSize: '16px', lineHeight: 1.7, color: '#5f5e5e', margin: '0 0 32px 0'}}>
                        Centralise and simplify client work, timelines, deliverables, and team progress in one organized workspace.
                    </p>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                            <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#c8f135', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                                <span style={{fontSize: '14px', fontWeight: 700, color: '#1a1d11'}}>✓</span>
                            </div>
                            <p style={{fontSize: '15px', color: '#1a1d11', fontWeight: 500, margin: 0}}>No hidden fees or surprise
                                charges</p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                            <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#c8f135', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                                <span style={{fontSize: '14px', fontWeight: 700, color: '#1a1d11'}}>✓</span>
                            </div>
                            <p style={{fontSize: '15px', color: '#1a1d11', fontWeight: 500, margin: 0}}>100% quality guaranteed,
                                always</p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                            <div style={{width: '24px', height: '24px', borderRadius: '50%', background: '#c8f135', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                                <span style={{fontSize: '14px', fontWeight: 700, color: '#1a1d11'}}>✓</span>
                            </div>
                            <p style={{fontSize: '15px', color: '#1a1d11', fontWeight: 500, margin: 0}}>No training or maintenance
                                needed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
