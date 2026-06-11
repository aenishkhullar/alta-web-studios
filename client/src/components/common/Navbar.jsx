import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useContactModal } from '../../context/ContactModalContext';

export const Navbar = () => {
  const { openModal } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);

  const getNavClass = ({ isActive }) =>
    isActive ? 'nav-active' : undefined;

  const getNavStyle = ({ isActive }) => ({
    fontSize: '15px',
    textDecoration: 'none',
    paddingBottom: '2px',
    color: isActive ? undefined : '#5f5e5e',
  });

  return (
    <nav
        style={{
          background: 'rgba(250,251,231,0.9)',
          backdropFilter: 'blur(12px)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          borderBottom: '1px solid rgba(197,201,174,0.3)'
        }}>
        <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            {/* Logo */}
            <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}} onClick={() => setIsOpen(false)}>
                <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#1a1d11',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <span className="material-symbols-outlined"
                        style={{color: '#c8f135', fontSize: '20px', fontVariationSettings: "'FILL' 1"}}>widgets</span>
                </div>
                <span style={{fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', color: '#1a1d11'}}>Alta
                    Web Studios</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex" style={{alignItems: 'center', gap: '32px'}}>
                <NavLink to="/" end className={getNavClass} style={getNavStyle}>Home</NavLink>
                <NavLink to="/projects" className={getNavClass} style={getNavStyle}>Projects</NavLink>
                <NavLink to="/services" className={getNavClass} style={getNavStyle}>Services</NavLink>
                <NavLink to="/blog" className={getNavClass} style={getNavStyle}>Blog</NavLink>
            </div>

            {/* Actions (Desktop) */}
            <div className="hidden md:flex" style={{alignItems: 'center', gap: '20px'}}>
                <button onClick={openModal}
                    style={{
                      background: '#1a1d11',
                      color: '#fafbe7',
                      borderRadius: '9999px',
                      padding: '12px 24px',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}>
                    Contact Us
                    <span className="material-symbols-outlined" style={{fontSize: '16px'}}>arrow_forward</span>
                </button>
            </div>

            {/* Hamburger Button (Mobile) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex md:hidden items-center justify-center p-2 text-[#1a1d11] hover:text-[#526600] transition-colors"
                style={{ cursor: 'pointer' }}
                aria-label="Toggle menu"
            >
                <span className="material-symbols-outlined" style={{fontSize: '28px'}}>
                    {isOpen ? 'close' : 'menu'}
                </span>
            </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
            <div 
                className="absolute top-[80px] left-0 w-full bg-[#fafbe7] border-b border-[#c5c9ae]/30 py-6 px-6 flex flex-col gap-6 md:hidden shadow-lg"
                style={{
                    backdropFilter: 'blur(12px)',
                    background: 'rgba(250,251,231,0.95)'
                }}
            >
                <div className="flex flex-col gap-4">
                    <NavLink to="/" end className={getNavClass} style={getNavStyle} onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/projects" className={getNavClass} style={getNavStyle} onClick={() => setIsOpen(false)}>Projects</NavLink>
                    <NavLink to="/services" className={getNavClass} style={getNavStyle} onClick={() => setIsOpen(false)}>Services</NavLink>
                    <NavLink to="/blog" className={getNavClass} style={getNavStyle} onClick={() => setIsOpen(false)}>Blog</NavLink>
                </div>
                <div className="border-t border-[#c5c9ae]/30 pt-4">
                    <button onClick={() => { openModal(); setIsOpen(false); }}
                        style={{
                          background: '#1a1d11',
                          color: '#fafbe7',
                          borderRadius: '9999px',
                          padding: '12px 24px',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          justifyContent: 'center',
                          fontFamily: 'inherit'
                        }}>
                        Contact Us
                        <span className="material-symbols-outlined" style={{fontSize: '16px'}}>arrow_forward</span>
                    </button>
                </div>
            </div>
        )}
    </nav>
  );
};


