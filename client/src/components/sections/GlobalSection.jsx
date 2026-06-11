import React from 'react';
import { Link } from 'react-router-dom';
import crmImg from '../../assets/image-crm.jpeg';

export const GlobalSection = () => {
  return (
    <section className="py-16 md:py-24" style={{background: '#fafbe7'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left: Text */}
                <div>
                    <h2 style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 700, lineHeight: 1.2, color: '#1a1d11', margin: '0 0 24px 0'}}>
                        Manage your leads through CRM
                    </h2>
                    <p style={{fontSize: '16px', lineHeight: 1.7, color: '#5f5e5e', margin: '0 0 24px 0'}}>
                       Capture leads, organize client details, and follow up on every inquiry from a single dashboard.
                    </p>
                    <p style={{fontSize: '15px', lineHeight: 1.7, color: '#5f5e5e', margin: '0 0 32px 0'}}>
                        Turn website inquiries into managed oppurtunities with a simple CRM built for your agency workflow.
                    </p>
                    <Link to="/services" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#1a1d11', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '2px solid #c8f135', paddingBottom: '4px'}}>
                        LEARN MORE
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_forward</span>
                    </Link>
                </div>

                {/* Right: CRM image */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img
                        src={crmImg}
                        alt="CRM illustration"
                        style={{
                            width: '100%',
                            maxWidth: '480px',
                            borderRadius: '24px',
                            boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
                            display: 'block',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            </div>
        </div>
    </section>
  );
};
