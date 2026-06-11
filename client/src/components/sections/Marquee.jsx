import React from 'react';

export const Marquee = () => {
  return (
    <section style={{background: '#1a1d11', padding: '20px 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
        <div className="marquee-track">
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>UI UX Design</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>Full Stack Development</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>3D Motion Experiences</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>AI Automation</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>SEO & Growth</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>Brand Identity</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            
            {/* Duplicate for seamless loop */}
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>UI UX Design</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>Full Stack Development</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>3D Motion Experiences</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>AI Automation</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>SEO & Growth</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
            <span style={{color: 'rgba(250,251,231,0.5)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em'}}>Brand Identity</span>
            <span style={{color: '#c8f135', fontSize: '16px'}}>✦</span>
        </div>
    </section>
  );
};
