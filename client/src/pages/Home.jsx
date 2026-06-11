import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Marquee } from '../components/sections/Marquee';
import { Features } from '../components/sections/Features';
import { DashboardPreview } from '../components/sections/DashboardPreview';
import { GlobalSection } from '../components/sections/GlobalSection';
import { Steps } from '../components/sections/Steps';
import { Testimonials } from '../components/sections/Testimonials';

export const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <DashboardPreview />
      <GlobalSection />
      <Steps />
      <Testimonials />
    </>
  );
};
export default Home;
