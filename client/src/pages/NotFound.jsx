import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import notFoundImg from '../assets/404-notfound.png';

export const NotFound = () => {
  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    minHeight: '100vh',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    backgroundColor: '#000000',
  };

  const imgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: 1,
    border: 'none',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 2,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    color: '#ffffff',
    textAlign: 'center',
    padding: '2rem 2rem 8vh 2rem',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      <img
        src={notFoundImg}
        alt="Page Not Found Background"
        style={imgStyle}
      />
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Link to="/">
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              borderRadius: 'var(--border-radius-md)',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
              gap: '0.5rem',
              padding: '1.25rem 3rem',
              fontSize: '1.125rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.7)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
            }}
          >
            <Home size={18} />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
