import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const MainLayout = () => {
  // Trigger scroll-triggered animations on route switch
  useScrollAnimation();

  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  };

  const mainStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
