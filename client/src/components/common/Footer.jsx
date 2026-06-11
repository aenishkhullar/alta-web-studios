import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PolicyModal } from './PolicyModal';

export const Footer = () => {
  const [activePolicy, setActivePolicy] = useState(null); // 'privacy' or 'cookies'

  const openPolicy = (type, e) => {
    e.preventDefault();
    setActivePolicy(type);
  };

  const closePolicy = () => setActivePolicy(null);

  return (
    <footer className="pt-16 md:pt-20 pb-0" style={{background: '#1a1d11', color: '#fafbe7', borderTop: '1px solid rgba(255,255,255,0.08)'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.5fr] gap-12 mb-16">
                
                {/* Brand */}
                <div>
                    <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '20px'}}>
                        <div style={{width: '36px', height: '36px', borderRadius: '50%', background: '#fafbe7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <span className="material-symbols-outlined" style={{color: '#1a1d11', fontSize: '20px', fontVariationSettings: "'FILL' 1"}}>widgets</span>
                        </div>
                        <span style={{fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', color: '#fafbe7'}}>Alta</span>
                    </Link>
                    <p style={{fontSize: '14px', lineHeight: 1.8, color: 'rgba(250,251,231,0.6)', margin: '0 0 28px 0', maxWidth: '240px'}}>
                        Faster experiences, expense reports done right. Budgeting made easy.
                    </p>
                    <p style={{fontSize: '11px', fontWeight: 700, color: 'rgba(250,251,231,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 14px 0'}}>
                        Social Media
                    </p>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <a 
                            href="https://www.instagram.com/altawebstudios?igsh=cXQzbHUzNms2ZHo5" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(250,251,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s'}}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(250,251,231,0.2)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(250,251,231,0.1)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#fafbe7'}}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a 
                            href="https://www.threads.com/@altawebstudios" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(250,251,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s'}}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(250,251,231,0.2)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(250,251,231,0.1)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#fafbe7'}}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path><path d="M8 12L12 16L16 12"></path><path d="M12 8L12 16"></path></svg>
                        </a>
                        <a 
                            href="https://www.altawebstudios.xyz" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(250,251,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s'}}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(250,251,231,0.2)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(250,251,231,0.1)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <span className="material-symbols-outlined" style={{fontSize: '18px', color: '#fafbe7'}}>public</span>
                        </a>
                    </div>
                </div>

                {/* Pages */}
                <div>
                    <h4 style={{fontSize: '11px', fontWeight: 700, color: 'rgba(250,251,231,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px 0'}}>Pages</h4>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px'}}>
                        <li><Link to="/" style={{fontSize: '14px', color: 'rgba(250,251,231,0.75)', textDecoration: 'none'}}>Home</Link></li>
                        <li><Link to="/projects" style={{fontSize: '14px', color: 'rgba(250,251,231,0.75)', textDecoration: 'none'}}>Projects</Link></li>
                        <li><Link to="/services" style={{fontSize: '14px', color: 'rgba(250,251,231,0.75)', textDecoration: 'none'}}>Services</Link></li>
                        <li><Link to="/blog" style={{fontSize: '14px', color: 'rgba(250,251,231,0.75)', textDecoration: 'none'}}>Blog</Link></li>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <h4 style={{fontSize: '11px', fontWeight: 700, color: 'rgba(250,251,231,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px 0'}}>Legal</h4>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px'}}>
                        <li>
                            <button onClick={(e) => openPolicy('privacy', e)} style={{background: 'none', border: 'none', padding: 0, fontSize: '14px', color: 'rgba(250,251,231,0.75)', textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit'}}>Privacy Policy</button>
                        </li>
                        <li>
                            <button onClick={(e) => openPolicy('cookies', e)} style={{background: 'none', border: 'none', padding: 0, fontSize: '14px', color: 'rgba(250,251,231,0.75)', textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit'}}>Cookies Policy</button>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 style={{fontSize: '11px', fontWeight: 700, color: 'rgba(250,251,231,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px 0'}}>Subscribe to our newsletter</h4>
                    <p style={{fontSize: '13px', color: 'rgba(250,251,231,0.5)', margin: '0 0 16px 0'}}>*Only valuable resource, no bullshit</p>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <input type="email" placeholder="Enter your e-mail" style={{flex: 1, background: 'rgba(250,251,231,0.08)', border: '1px solid rgba(250,251,231,0.15)', borderRadius: '9999px', padding: '12px 20px', color: '#fafbe7', fontSize: '14px', outline: 'none'}} />
                        <button style={{width: '44px', height: '44px', borderRadius: '50%', background: '#fafbe7', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
                            <span className="material-symbols-outlined" style={{fontSize: '18px', color: '#1a1d11'}}>arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom bar */}
        <div style={{borderTop: '1px solid rgba(250,251,231,0.08)', padding: '24px'}}>
            <p style={{textAlign: 'center', fontSize: '13px', color: 'rgba(250,251,231,0.4)', margin: 0}}>© 2026 All rights reserved by Alta Web Studios</p>
        </div>

        {/* Policy Modals */}
        <PolicyModal 
          isOpen={activePolicy === 'privacy'} 
          onClose={closePolicy} 
          title="Privacy Policy"
          content={
            <div>
              <p>We respect your privacy. This policy explains how we collect and use your data.</p>
              <p>Placeholder content for the Privacy Policy. In a real-world scenario, this would be updated with the actual legal document provided by the client's legal team.</p>
            </div>
          }
        />
        <PolicyModal 
          isOpen={activePolicy === 'cookies'} 
          onClose={closePolicy} 
          title="Cookies Policy"
          content={
            <div>
              <p>We use cookies to improve your experience on our site.</p>
              <p>Placeholder content for the Cookies Policy. This would typically detail exactly which cookies are used, for what purposes, and how users can opt out.</p>
            </div>
          }
        />
    </footer>
  );
};
