import React from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../../context/ContactModalContext';
import { useChatModal } from '../../context/ChatModalContext';
import heroImage from '../../assets/image-hero.png';

export const Hero = () => {
  const { openModal } = useContactModal();
  const { openChatModal } = useChatModal();

  return (
    <section style={{background: '#ffffff', width: '100%'}}>
      <div className="pt-24 pb-12 lg:pt-[120px] lg:pb-[80px] px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[560px]">

            {/* Left: Text */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <h1 style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 'clamp(32px,6.5vw,72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1a1d11', margin: 0}}>
                    We Build <span className="italic-lime">Modern</span><br />Digital Experience
                </h1>
                <p style={{fontSize: '18px', lineHeight: 1.7, color: '#5f5e5e', margin: 0, maxWidth: '480px'}}>
                    Elevate your brand with cutting-edge web development and design that drives results. We combine
                    technical precision with creative flair to build experiences your users will love.
                </p>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'}}>
                    <button onClick={() => openModal('book-call')} style={{background: '#1a1d11', color: '#fafbe7', borderRadius: '9999px', padding: '16px 32px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s'}} onMouseEnter={e => e.currentTarget.style.background = '#526600'} onMouseLeave={e => e.currentTarget.style.background = '#1a1d11'}>
                        Book a Call
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_forward</span>
                    </button>
                    <button 
                        onClick={openChatModal} 
                        style={{
                            background: '#c8f135', 
                            color: '#1a1d11', 
                            borderRadius: '9999px', 
                            padding: '16px 32px', 
                            fontSize: '14px', 
                            fontWeight: 600, 
                            letterSpacing: '0.05em', 
                            textDecoration: 'none', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontFamily: 'inherit',
                            transition: 'background 0.2s, transform 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = '#aed50d';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = '#c8f135';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Live Chat
                        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>chat_bubble</span>
                    </button>
                </div>

                {/* Trust Badges */}
                <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginTop: '8px', flexWrap: 'wrap'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <div style={{display: 'flex'}}>
                            <span style={{color: '#f59e0b', fontSize: '14px'}}>★★★★★</span>
                        </div>
                        <span style={{fontSize: '13px', fontWeight: 600, color: '#5f5e5e'}}>Just Dial</span>
                    </div>
                    <div style={{width: '1px', height: '24px', background: '#c5c9ae'}}></div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{color: '#f59e0b', fontSize: '14px'}}>★★★★★</span>
                        <span style={{fontSize: '13px', fontWeight: 600, color: '#5f5e5e'}}>Trustpilot</span>
                    </div>
                    <div style={{width: '1px', height: '24px', background: '#c5c9ae'}}></div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{color: '#f59e0b', fontSize: '14px'}}>★★★★★</span>
                        <span style={{fontSize: '13px', fontWeight: 600, color: '#5f5e5e'}}>Google</span>
                    </div>
                </div>
            </div>

            {/* Right: Illustration area */}
            <div className="relative flex justify-center items-center h-[320px] sm:h-[400px] lg:h-[480px] w-full">
                {/* Decorative blobs */}
                <div style={{position: 'absolute', top: '20px', right: '20px', width: '260px', height: '260px', background: 'rgba(200,241,53,0.18)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0}}>
                </div>
                <div style={{position: 'absolute', bottom: '20px', left: '20px', width: '180px', height: '180px', background: 'rgba(226,228,209,0.6)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0}}>
                </div>

                {/* Main illustration placeholder with crow-like creative element */}
                <div style={{position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={heroImage}
                         alt="Modern Digital Experience"
                         style={{width: '100%', height: '100%', objectFit: 'contain', dropShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative', zIndex: 1}}
                         onError={(e) => {e.target.style.display='none'; document.getElementById('img-fallback').style.display='flex';}} />
                    {/* Fallback illustration if image fails */}
                    <div id="img-fallback" style={{display: 'none', width: '100%', maxWidth: '380px', aspectRatio: '1/1', background: 'linear-gradient(135deg,#e2e4d1,#fafbe7)', borderRadius: '24px', alignItems: 'center', justifyContent: 'center', border: '2px dashed #c5c9ae'}}>
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '64px', marginBottom: '16px'}}>🌐</div>
                            <p style={{color: '#5f5e5e', fontSize: '14px'}}>Hero Illustration</p>
                        </div>
                    </div>
                </div>

                {/* Floating icon badges */}
                <div className="float-1" style={{position: 'absolute', top: '60px', right: '10px', zIndex: 2, background: '#fff', borderRadius: '16px', padding: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', border: '1px solid rgba(197,201,174,0.4)'}}>
                    <span className="material-symbols-outlined" style={{color: '#c8f135', fontSize: '28px', fontVariationSettings: "'FILL' 1"}}>bolt</span>
                </div>
                <div className="float-3" style={{position: 'absolute', top: '160px', left: '0px', zIndex: 2, background: '#1a1d11', borderRadius: '16px', padding: '10px 16px', boxShadow: '0 4px 24px rgba(0,0,0,0.20)'}}>
                    <span style={{color: '#c8f135', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em'}}>↑ 47%
                        Growth</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
