import React, { useState } from 'react';

export const Steps = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'Understanding your goals, audience and existing digital footprint.',
    },
    {
      num: '02',
      title: 'Planning & Strategy',
      desc: 'Tracking expenses and goals and aligning on timelines and deliverables.',
    },
    {
      num: '03',
      title: 'Build & Launch',
      desc: 'Design, develop and deploy pixel-perfect experiences at speed.',
    },
    {
      num: '04',
      title: 'Support & Growth',
      desc: 'Continuous optimisation, updates and strategic growth support.',
    },
  ];

  const getCardStyle = (index) => {
    const isHovered = hoveredIndex === index;
    return {
      background: isHovered
        ? 'rgba(200,241,53,0.10)'
        : 'rgba(250,251,231,0.06)',
      border: isHovered
        ? '1px solid rgba(200,241,53,0.3)'
        : '1px solid rgba(250,251,231,0.15)',
      borderRadius: '20px',
      padding: '32px',
      transition: 'background 0.3s ease, border 0.3s ease',
    };
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{background: '#1a1d11'}}>
        {/* Background image overlay */}
        <div style={{position: 'absolute', inset: 0, opacity: 0.08}}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIP24zbNB-TG1hXI2Ln2w-dcjXmFw2a6jR3fGPg_NoSXGUQUa6NahVH6bh2AUa2PIk991hda3uTW0mSrVSyA1Q7sIt7Fjlg14UhvlMD4InSkXw2buny82ZAMTO4uWqXcUA-UvniyiHAW8cV31h_tFjeNI8Jd3xYq_7SzPLGOjA_suUg5Qv6YyeKdwKS4Z6f8GXXrw1D1ZySQ8vEFqr3PQHG-Ean085Ru8xtNL0mf4HFhVPfJNGrkyDybk636lDKilYaXvVA_AwpQ"
                alt="" style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)'}} />
        </div>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1}}>
            <div style={{maxWidth: '640px', marginBottom: '64px'}}>
                <h2 style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, lineHeight: 1.2, color: '#fafbe7', margin: 0}}>
                    The 4 steps route to better results. Smarter workflow for faster growth.
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="step-card"
                    style={getCardStyle(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '40px', fontWeight: 700, color: '#c8f135', display: 'block', marginBottom: '16px'}}>{step.num}</span>
                    <h3 style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#fafbe7', margin: '0 0 12px 0'}}>
                        {step.title}</h3>
                    <p style={{fontSize: '14px', lineHeight: 1.6, color: 'rgba(250,251,231,0.5)', margin: 0}}>{step.desc}</p>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
};
