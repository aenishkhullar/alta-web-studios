import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from '../components/layout/MainLayout';
import { Home } from '../pages/Home';
import { Services } from '../pages/Services';
import { Projects } from '../pages/Projects';
import { Blog } from '../pages/Blog';
import { NotFound } from '../pages/NotFound';
import { ContactModalProvider } from '../context/ContactModalContext';
import { ContactModal } from '../components/common/ContactModal';
import { ChatModalProvider } from '../context/ChatModalContext';
import { ChatModal } from '../components/common/ChatModal';

// Dashboard Components
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Login } from '../pages/dashboard/Login';
import { DashboardOverview } from '../pages/dashboard/DashboardOverview';
import { LeadsPage } from '../pages/dashboard/LeadsPage';
import { Clients } from '../pages/dashboard/Clients';
import { Projects as DashboardProjects } from '../pages/dashboard/Projects';
import { Deliverables } from '../pages/dashboard/Deliverables';

export const AppRoutes = () => {
  return (
    <ContactModalProvider>
      <ChatModalProvider>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<Blog />} />
          </Route>

          <Route path="*" element={<NotFound />} />

          {/* Admin Dashboard Routes */}
          <Route path="/dashboard/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/dashboard/leads" element={<LeadsPage />} />
              <Route path="/dashboard/clients" element={<Clients />} />
              <Route path="/dashboard/projects" element={<DashboardProjects />} />
              <Route path="/dashboard/deliverables" element={<Deliverables />} />
            </Route>
          </Route>
        </Routes>
        <ContactModal />
        <ChatModal />
        <Toaster position="top-right" />
      </ChatModalProvider>
    </ContactModalProvider>
  );
};
export default AppRoutes;
