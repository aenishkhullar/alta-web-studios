import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, text
  size = 'md',        // sm, md, lg
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) => {
  // Styles inline or custom built-in variables to avoid dependency on tailwind
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    borderRadius: 'var(--border-radius-md)',
    transition: 'all var(--transition-fast)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    gap: '0.5rem',
    outline: 'none',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-glow)',
      border: '1px solid transparent',
    },
    secondary: {
      backgroundColor: 'var(--bg-tertiary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--text-primary)',
    },
    text: {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      border: 'none',
      padding: '0',
    },
  };

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  const hoverStyle = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    } else if (variant === 'outline') {
      e.currentTarget.style.backgroundColor = 'var(--text-primary)';
      e.currentTarget.style.color = 'var(--bg-primary)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    } else if (variant === 'text') {
      e.currentTarget.style.color = 'var(--primary-hover)';
    }
  };

  const leaveStyle = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--primary)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
    } else if (variant === 'outline') {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'var(--text-primary)';
    } else if (variant === 'text') {
      e.currentTarget.style.color = 'var(--primary)';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
      }}
      onMouseEnter={hoverStyle}
      onMouseLeave={leaveStyle}
      className={`custom-btn ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};
