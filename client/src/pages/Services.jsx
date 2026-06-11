import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';
import { 
  Atom, 
  Cpu, 
  Terminal, 
  GitMerge, 
  Smartphone, 
  Database, 
  Zap, 
  Sparkles, 
  Search, 
  Workflow, 
  Binary, 
  Cloud, 
  Box, 
  Compass, 
  Shield,
  Layers,
  Code2,
  Wind,
  Globe,
  Code
} from 'lucide-react';

/* ─── Design tokens ─── */
const C = {
  bg: '#fafbe7',
  surface: '#ffffff',
  onBg: '#1a1d11',
  primaryContainer: '#c8f135',
  onPrimaryContainer: '#566c00',
  primary: '#526600',
  primaryFixed: '#c9f236',
  primaryFixedDim: '#aed50d',
  secondaryContainer: '#e5e2e1',
  onSecondaryContainer: '#656464',
  onPrimary: '#ffffff',
  secondary: '#5f5e5e',
  outlineVariant: '#c5c9ae',
  surfaceContainerLow: '#f4f5e2',
  surfaceVariant: '#e2e4d1',
};

/* ─── Services Data ─── */
const SERVICES_DATA = [
  {
    icon: 'desktop_windows',
    title: 'Website Design & Development',
    desc: 'Custom websites built for performance, conversions, and brand growth.',
  },
  {
    icon: 'dashboard',
    title: 'Custom Web Applications',
    desc: 'Scalable web platforms, dashboards, portals, and SaaS products.',
  },
  {
    icon: 'phone_iphone',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile experiences for iOS and Android.',
  },
  {
    icon: 'smart_toy',
    title: 'AI Automation & RAG Systems',
    desc: 'Intelligent workflows, chatbots, knowledge systems, and automation.',
  },
  {
    icon: 'trending_up',
    title: 'Search Visibility & Growth',
    desc: 'SEO, GEO, AEO, and organic growth strategies.',
  },
  {
    icon: 'palette',
    title: 'UI/UX & Product Design',
    desc: 'User-centered digital experiences designed for engagement.',
  },
  {
    icon: 'group',
    title: 'CRM & Client Portals',
    desc: 'Custom customer management and client collaboration systems.',
  },
  {
    icon: 'monitoring',
    title: 'Dashboard & Admin Systems',
    desc: 'Operational dashboards, analytics platforms, and internal tools.',
  },
];

/* ─── Industries Data ─── */
const INDUSTRIES_DATA = [
  { icon: 'health_and_safety', title: 'Healthcare' },
  { icon: 'domain', title: 'Real Estate' },
  { icon: 'shopping_cart', title: 'E-Commerce' },
  { icon: 'school', title: 'Education' },
  { icon: 'hotel', title: 'Hospitality' },
  { icon: 'rocket_launch', title: 'Startups' },
  { icon: 'business_center', title: 'Professional Services' },
  { icon: 'precision_manufacturing', title: 'Manufacturing' },
];

/* ─── Process Steps Data ─── */
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Understanding goals and requirements.',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'Planning architecture and roadmap.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Wireframes and user experience.',
  },
  {
    num: '04',
    title: 'Development',
    desc: 'Frontend and backend implementation.',
  },
  {
    num: '05',
    title: 'Testing',
    desc: 'Quality assurance and optimization.',
  },
  {
    num: '06',
    title: 'Launch & Support',
    desc: 'Deployment and ongoing maintenance.',
  },
];

/* ─── Tech Stack Data ─── */
const TECH_STACK_DATA = [
  {
    category: 'Frontend',
    techs: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    techs: ['Node.js', 'Express.js', 'GraphQL'],
  },
  {
    category: 'Mobile',
    techs: ['Flutter', 'React Native'],
  },
  {
    category: 'Databases',
    techs: ['MongoDB', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'AI',
    techs: ['OpenAI', 'RAG Systems', 'LangChain', 'Vector Databases'],
  },
  {
    category: 'Cloud',
    techs: ['AWS', 'Docker', 'Kubernetes', 'Cloudflare'],
  },
];

/* ─── Tech Stack Icons Mapping ─── */
const TECH_ICONS = {
  // Frontend
  'React': Atom,
  'Next.js': Globe,
  'JavaScript': Code,
  'TypeScript': Code2,
  'Tailwind CSS': Wind,

  // Backend
  'Node.js': Cpu,
  'Express.js': Terminal,
  'GraphQL': GitMerge,

  // Mobile
  'Flutter': Layers,
  'React Native': Atom,

  // Databases
  'MongoDB': Database,
  'PostgreSQL': Database,
  'Redis': Zap,

  // AI
  'OpenAI': Sparkles,
  'RAG Systems': Search,
  'LangChain': Workflow,
  'Vector Databases': Binary,

  // Cloud
  'AWS': Cloud,
  'Docker': Box,
  'Kubernetes': Compass,
  'Cloudflare': Shield,
};

/* ─── Why Choose Data ─── */
const WHY_CHOOSE_DATA = [
  {
    title: 'Business-First Approach',
    desc: 'Solutions designed around outcomes.',
  },
  {
    title: 'Modern Technology',
    desc: 'Scalable and future-ready systems.',
  },
  {
    title: 'Transparent Communication',
    desc: 'Clear timelines and updates.',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'Support beyond launch.',
  },
];

/* ─── FAQ Data ─── */
const FAQ_DATA = [
  {
    q: 'How long does a project take?',
    a: 'An average custom website takes 4-8 weeks, while complex web applications, mobile apps, or AI systems can take 12-24 weeks depending on scope and features.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Yes, we offer comprehensive post-launch support, hosting management, performance optimization, security updates, and feature expansion packages.',
  },
  {
    q: 'Can you redesign an existing website?',
    a: 'Yes, we specialize in modernizing legacy websites, improving performance, optimizing user experience (UI/UX), and implementing faster technology stacks.',
  },
  {
    q: 'Do you build custom CRM systems?',
    a: 'Absolutely. We build tailored customer relationship management platforms and client portals designed around your unique business workflows.',
  },
  {
    q: 'Can AI be integrated into existing software?',
    a: 'Yes. We can integrate large language models (LLMs), retrieval-augmented generation (RAG) knowledge systems, automation agents, and semantic search into your current systems.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'While we specialize in Healthcare, Real Estate, E-Commerce, Education, Hospitality, Startups, Professional Services, and Manufacturing, our engineering is adaptable to any business vertical.',
  },
  {
    q: 'Do you offer mobile app development?',
    a: 'Yes, we build high-performance, cross-platform mobile apps for both iOS and Android using modern frameworks like Flutter and React Native.',
  },
  {
    q: 'How do we start a project?',
    a: 'Simply book a discovery call or contact us. We\'ll discuss your requirements, prepare a detailed proposal and roadmap, and align on timeline and budget.',
  },
];

export const Services = () => {
  const { openModal } = useContactModal();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{ background: C.bg }}>

      {/* ── HERO SECTION ── */}
      <section style={{
        background: C.surface,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Badge */}
          <span style={{
            display: 'inline-block',
            background: C.primaryContainer,
            color: C.onPrimaryContainer,
            padding: '4px 16px',
            borderRadius: '9999px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            SERVICES
          </span>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(42px, 7vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: C.onBg,
            maxWidth: '900px',
            marginTop: '24px',
            marginBottom: '36px',
          }}>
            Digital Solutions{' '}
            <span style={{ fontStyle: 'italic', color: C.primaryFixed }}>
              Built for Growth
            </span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(16px, 2vw, 18px)',
            lineHeight: 1.6,
            color: C.secondary,
            maxWidth: '800px',
            marginBottom: '64px',
          }}>
            From websites and mobile applications to AI-powered systems and business automation, we build technology that helps businesses scale faster and operate smarter.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
            <button
              onClick={() => openModal('book-call')}
              style={{
                background: C.onBg,
                color: C.onPrimary,
                borderRadius: '9999px',
                padding: '16px 32px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.primary}
              onMouseLeave={e => { e.currentTarget.style.background = C.onBg; e.currentTarget.style.color = C.onPrimary; }}
            >
              Book a Discovery Call
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
            </button>
            <Link
              to="/projects"
              style={{
                background: 'transparent',
                color: C.onBg,
                borderRadius: '9999px',
                padding: '16px 32px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                border: `1px solid ${C.outlineVariant}`,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = C.surfaceVariant;
                e.currentTarget.style.color = C.onBg;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = C.onBg;
              }}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW SECTION ── */}
      <section style={{ background: C.bg, padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{
              display: 'inline-block',
              background: C.secondaryContainer,
              color: C.onSecondaryContainer,
              padding: '4px 16px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              OVERVIEW
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: C.onBg,
              marginBottom: '16px',
            }}>
              Our Core Capabilities
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              color: C.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              We engineer specialized digital solutions tailored to solve complex operational challenges and accelerate commercial growth.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={idx}
                className="hover-card"
                style={{
                  background: C.surface,
                  borderRadius: '28px',
                  padding: '40px 32px',
                  border: `1px solid rgba(197, 201, 174, 0.4)`,
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 29, 17, 0.08)';
                  const iconSpan = e.currentTarget.querySelector('.service-icon-container');
                  if (iconSpan) iconSpan.style.background = C.primaryContainer;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(197, 201, 174, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
                  const iconSpan = e.currentTarget.querySelector('.service-icon-container');
                  if (iconSpan) iconSpan.style.background = C.surfaceContainerLow;
                }}
              >
                {/* Icon Container */}
                <div
                  className="service-icon-container"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: C.surfaceContainerLow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '26px', color: C.onBg }}>
                    {service.icon}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    color: C.onBg,
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: C.secondary,
                  }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE SECTION ── */}
      <section style={{ background: C.surface, padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{
              display: 'inline-block',
              background: C.primaryContainer,
              color: C.onPrimaryContainer,
              padding: '4px 16px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              MARKETS
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: C.onBg,
              marginBottom: '16px',
            }}>
              Industries We Serve
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              color: C.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              We bring specialized engineering knowledge and technical strategy to a wide range of operational domains.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {INDUSTRIES_DATA.map((industry, idx) => (
              <div
                key={idx}
                style={{
                  background: C.bg,
                  borderRadius: '20px',
                  padding: '32px 24px',
                  border: `1px solid ${C.outlineVariant}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.background = C.surface;
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 29, 17, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.outlineVariant;
                  e.currentTarget.style.background = C.bg;
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Circle Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: C.surface,
                  border: `1px solid ${C.outlineVariant}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: C.primary }}>
                    {industry.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: C.onBg,
                  margin: 0,
                }}>
                  {industry.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS SECTION ── */}
      <section style={{ background: C.onBg, padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Image Overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIP24zbNB-TG1hXI2Ln2w-dcjXmFw2a6jR3fGPg_NoSXGUQUa6NahVH6bh2AUa2PIk991hda3uTW0mSrVSyA1Q7sIt7Fjlg14UhvlMD4InSkXw2buny82ZAMTO4uWqXcUA-UvniyiHAW8cV31h_tFjeNI8Jd3xYq_7SzPLGOjA_suUg5Qv6YyeKdwKS4Z6f8GXXrw1D1ZySQ8vEFqr3PQHG-Ean085Ru8xtNL0mf4HFhVPfJNGrkyDybk636lDKilYaXvVA_AwpQ"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
          />
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: '80px', maxWidth: '640px' }}>
            <span style={{
              display: 'inline-block',
              background: C.primaryContainer,
              color: C.onPrimaryContainer,
              padding: '4px 16px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              ROADMAP
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#fafbe7',
              margin: 0,
            }}>
              Our Structured{' '}
              <span style={{ fontStyle: 'italic', color: C.primaryContainer }}>
                Process
              </span>
            </h2>
          </div>

          {/* Timeline Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className="step-card"
                style={{
                  background: 'rgba(250, 251, 231, 0.05)',
                  border: '1px solid rgba(250, 251, 231, 0.15)',
                  borderRadius: '20px',
                  padding: '40px 32px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(200, 241, 53, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(200, 241, 53, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(250, 251, 231, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(250, 251, 231, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Step number */}
                <span style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: '48px',
                  fontWeight: 800,
                  color: C.primaryContainer,
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: '20px',
                }}>
                  {step.num}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#fafbe7',
                  margin: '0 0 12px 0',
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'rgba(250, 251, 231, 0.6)',
                  margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY STACK SECTION ── */}
      <section style={{ background: C.surface, padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{
              display: 'inline-block',
              background: C.secondaryContainer,
              color: C.onSecondaryContainer,
              padding: '4px 16px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              TECHNOLOGY
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: C.onBg,
              marginBottom: '16px',
            }}>
              Our Technology Stack
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              color: C.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              We build on modern, robust technologies ensuring scalability, fast render performance, and secure cloud operations.
            </p>
          </div>

          {/* Grouped Stack Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
          }}>
            {TECH_STACK_DATA.map((group, idx) => (
              <div
                key={idx}
                style={{
                  background: C.bg,
                  borderRadius: '24px',
                  padding: '32px',
                  border: `1px solid ${C.outlineVariant}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 29, 17, 0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.outlineVariant;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Category name */}
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: C.onBg,
                  borderBottom: `1px solid rgba(197, 201, 174, 0.5)`,
                  paddingBottom: '12px',
                  margin: 0,
                }}>
                  {group.category}
                </h3>

                {/* Badge wrap */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
                  {group.techs.map((tech) => {
                    const IconComponent = TECH_ICONS[tech];
                    return (
                      <span
                        key={tech}
                        style={{
                          background: C.surface,
                          border: `1px solid ${C.outlineVariant}`,
                          color: C.primary,
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                          transition: 'all 0.2s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = C.primaryContainer;
                          e.currentTarget.style.borderColor = C.primary;
                          e.currentTarget.style.color = C.onPrimaryContainer;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = C.surface;
                          e.currentTarget.style.borderColor = C.outlineVariant;
                          e.currentTarget.style.color = C.primary;
                        }}
                      >
                        {IconComponent && <IconComponent size={14} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ALTA WEB STUDIOS ── */}
      <section style={{ background: C.bg, padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{
              display: 'inline-block',
              background: C.primaryContainer,
              color: C.onPrimaryContainer,
              padding: '4px 16px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              VALUES
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: C.onBg,
              marginBottom: '16px',
            }}>
              Why Choose Alta Web Studios
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              color: C.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              We align design and engineering to form a cohesive digital strategy focused entirely on commercial results.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {WHY_CHOOSE_DATA.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: C.surface,
                  borderRadius: '28px',
                  padding: '40px 32px',
                  border: `1px solid rgba(197, 201, 174, 0.4)`,
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 29, 17, 0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(197, 201, 174, 0.4)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Accent indicator */}
                <div style={{ width: '40px', height: '4px', background: C.primaryContainer, borderRadius: '999px' }} />

                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: C.onBg,
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: C.secondary,
                  margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ background: C.surface, padding: '120px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block',
              background: C.secondaryContainer,
              color: C.onSecondaryContainer,
              padding: '4px 16px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              FAQ
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: C.onBg,
              marginBottom: '16px',
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              color: C.secondary,
            }}>
              Got questions? We have answers. If you don't find what you are looking for, reach out to us.
            </p>
          </div>

          {/* Accordion Container */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${C.outlineVariant}` }}>
            {FAQ_DATA.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    borderBottom: `1px solid ${C.outlineVariant}`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '24px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontSize: '18px',
                      fontWeight: 700,
                      color: C.onBg,
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                  >
                    <span style={{ marginRight: '24px' }}>{item.q}</span>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: isOpen ? C.primary : C.secondary,
                        fontSize: '24px',
                      }}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? '250px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                      paddingTop: isOpen ? '0px' : '0px',
                      paddingBottom: isOpen ? '24px' : '0px',
                    }}
                  >
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: C.secondary,
                      margin: 0,
                      maxWidth: '740px',
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
