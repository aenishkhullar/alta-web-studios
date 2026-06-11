import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

/* ─── Local asset imports ─── */
import yantraImg from '../assets/new-yantra.png';
import lifesyncImg from '../assets/new-lifesync.png';
import astromistralImg from '../assets/new-astromistral.png';
import inningslabImg from '../assets/new-inningslab.png';
import dropalyImg from '../assets/new-dropaly.png';
import unimartImg from '../assets/new-unimart.png';
import studioMinimalistImg from '../assets/new-studio-minimalist.png';
import lpapillaeImg from '../assets/new-lpapillae.png';
import agrielevateImg from '../assets/new-agrielevate.png';
import hrmsImg from '../assets/new-HRmanagementsystem.png';

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

/* ─── Project card data ─── */
const PROJECTS = [
  {
    id: 'a',
    categories: ['web-application'],
    label: 'WEB APPLICATION',
    title: 'Yantra Trading Simulator',
    image: yantraImg,
    description: 'A high-performance simulator for algorithmic and manual trading strategies, featuring real-time data streaming, portfolio analytics, and advanced charting tools.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redux',
      'Redis',
      'JWT',
      'WebSocket',
      'PayPal'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'b',
    categories: ['mobile-application'],
    label: 'MOBILE APPLICATION',
    title: 'Lifesync',
    image: lifesyncImg,
    description: 'A comprehensive wellness application helping users balance fitness, mindfulness, sleep, and nutrition with personalized daily insights and goals.',
    techStack: [
      'React Native',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'GraphQL',
      'JWT',
      'Stripe'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'c',
    categories: ['mobile-application', 'ai'],
    label: 'MOBILE APPLICATION • AI',
    title: 'AstroMistral',
    image: astromistralImg,
    description: 'An AI-powered mobile astrology platform providing hyper-personalized birth charts, daily horoscopes, and celestial alignment reports.',
    techStack: [
      'Flutter',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'GraphQL',
      'JWT',
      'Razorpay'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'kochar-hrms',
    categories: ['web-application'],
    label: 'WEB APPLICATION',
    title: 'HR Management System',
    client: 'KocharTech',
    image: hrmsImg,
    description: 'A custom workforce management platform developed for a large-scale BPO operation. The system centralizes employee onboarding, attendance tracking, payroll workflows, leave management, departmental structures, performance monitoring, and reporting into a unified dashboard.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redux',
      'Redis',
      'JWT',
      'GraphQL',
      'Socket.IO'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'e',
    categories: ['web-application'],
    label: 'WEB APPLICATION',
    title: 'Dropaly',
    image: dropalyImg,
    description: 'A sleek SaaS dropshipping analytics tool providing trending product discovery, competitor sales analysis, and advertising campaign insights.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redux',
      'Redis',
      'JWT',
      'GraphQL',
      'Stripe'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'unimart',
    categories: ['web-application'],
    label: 'WEB APPLICATION',
    title: 'UniMart',
    image: unimartImg,
    description: 'A next-generation e-commerce web application featuring frictionless one-page checkout, advanced product discovery, and robust merchant portals.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redux',
      'Redis',
      'JWT',
      'REST API',
      'Socket.IO',
      'Razorpay'
    ],
    liveUrl: '#',
    actionText: 'View App',
  },
  {
    id: 'f',
    categories: ['website'],
    label: 'WEBSITE',
    title: 'Studio Minimalist',
    image: studioMinimalistImg,
    description: 'A modern, clean portfolio website built for a boutique architectural and interior design studio focusing on minimalism and structural form.',
    techStack: [
      'Next.js',
      'React',
      'Node.js'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'g',
    categories: ['website'],
    label: 'WEBSITE',
    title: "L'Papillae Bakehouse",
    image: lpapillaeImg,
    description: 'A mouthwatering website for an artisanal French bakery, offering seamless online orders, table reservations, and catering quotes.',
    techStack: [
      'Next.js',
      'React',
      'Node.js'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'd',
    categories: ['web-application', 'ai'],
    label: 'WEB APPLICATION • AI',
    title: 'Innings Lab',
    image: inningslabImg,
    description: 'An AI-driven sports analytics platform that compiles, processes, and displays predictive metrics and performance trends for professional baseball.',
    techStack: [
      'Web Technologies',
      'PostgreSQL',
      'JWT',
      'Redis'
    ],
    liveUrl: '#',
    actionText: 'Live Project',
  },
  {
    id: 'agrielevate',
    categories: ['web-application'],
    label: 'WEB APPLICATION',
    title: 'AgriElevate',
    image: agrielevateImg,
    row: 'featured',
    description: 'AgriElevate is a data-driven Full stack platform designed to shift traditional farming into a technology-enabled ecosystem.',
    highlights: [
      'Punjab Government collaboration',
      'Data-driven crop planning',
      'Precision satellite insights',
      'AI and Machine Learning Models'
    ],
    techStack: {
      'Frontend': ['React.js', 'Redux'],
      'Databases': ['MongoDB', 'PostgreSQL', 'TimescaleDB'],
      'Backend': ['Node.js', 'Express.js', 'RESTful APIs', 'Microservices'],
      'Data Infrastructure': ['Apache Kafka', 'Redis Cluster', 'Redis Pub/Sub'],
      'AI & ML': ['Python (FastAPI)', 'Random Forest', 'XGBoost', 'BHASHINI Voice AI'],
      'DevOps & Cloud': [
        'Docker',
        'Kubernetes',
        'Prometheus',
        'Grafana',
        'GitOps',
        'Helm',
        'Nginx',
        'Cloudflare'
      ]
    },
    liveUrl: 'https://docs.google.com/document/d/18Qatvr6fAbq5o23lAKMk5dGp20UOiUMhyV1uhFGrhAk/edit?usp=sharing',
    actionText: 'View Document',
  }
];

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'website', label: 'Website' },
  { value: 'web-application', label: 'Web application' },
  { value: 'mobile-application', label: 'Mobile application' },
  { value: 'ai', label: 'Ai' },
];

/* ─── Sub-components ─── */

function CategoryBadge({ label }) {
  return (
    <span style={{
      background: C.secondaryContainer,
      color: C.onSecondaryContainer,
      padding: '4px 12px',
      borderRadius: '9999px',
      fontFamily: "'Inter', sans-serif",
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    }}>
      {label}
    </span>
  );
}

function ArrowIcon() {
  return (
    <span className="proj-arrow-icon material-symbols-outlined" style={{
      background: C.onBg,
      color: C.onPrimary,
      borderRadius: '9999px',
      padding: '8px',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
    }}>
      arrow_outward
    </span>
  );
}

const getCategoryLabel = (category) => {
  switch (category) {
    case 'website':
      return 'Website';
    case 'web-application':
      return 'Web Application';
    case 'mobile-application':
      return 'Mobile Application';
    case 'ai':
      return 'AI';
    default:
      return category;
  }
};

function ProjectCard({ project, isVisible, onClick }) {
  return (
    <div
      className="portfolio-card"
      onClick={onClick}
      style={{
        display: isVisible ? 'block' : 'none',
      }}
    >
      {/* Card image */}
      <img
        src={project.image}
        alt={project.title}
        className="portfolio-card-img"
        loading="lazy"
      />

      {/* Hover Overlay */}
      <div className="portfolio-card-overlay">
        {/* Top: Category Badges */}
        <div className="portfolio-overlay-top portfolio-badges-row">
          {project.categories && project.categories.map((cat) => (
            <span className="portfolio-badge" key={cat}>
              {getCategoryLabel(cat)}
            </span>
          ))}
        </div>

        {/* Bottom: Title and Arrow Button */}
        <div className="portfolio-overlay-bottom portfolio-footer-row">
          <h3 className="portfolio-card-title">{project.title}</h3>
          <div className="portfolio-arrow-btn">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              arrow_outward
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable Project Modal ─── */
function ProjectModal({ project, onClose }) {
  // Prevent body scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="p-4 sm:p-6"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(26, 29, 17, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.surface,
          border: `1px solid ${C.outlineVariant}`,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '640px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: C.bg,
            border: `1px solid ${C.outlineVariant}`,
            color: C.onBg,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.primaryContainer}
          onMouseLeave={e => e.currentTarget.style.background = C.bg}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Label */}
          <div style={{ marginBottom: '12px' }}>
            <span style={{
              background: C.secondaryContainer,
              color: C.onSecondaryContainer,
              padding: '4px 12px',
              borderRadius: '9999px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {project.label}
            </span>
          </div>

          {/* Title */}
          <h2 className="pr-12 md:pr-0" style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 700,
            color: C.onBg,
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {project.title}
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            lineHeight: 1.6,
            color: C.secondary,
            marginBottom: '24px',
          }}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              color: C.secondary,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Technologies Used
            </h4>
            {Array.isArray(project.techStack) ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: C.surfaceContainerLow,
                      color: C.primary,
                      border: `1px solid ${C.outlineVariant}`,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      fontWeight: 700,
                      color: C.onSecondaryContainer,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      {category}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            background: C.surfaceContainerLow,
                            color: C.primary,
                            border: `1px solid ${C.outlineVariant}`,
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            fontWeight: 500,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Button */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: C.onBg,
              color: C.onPrimary,
              borderRadius: '9999px',
              padding: '14px 28px',
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
            onMouseLeave={e => e.currentTarget.style.background = C.onBg}
          >
            {project.actionText || 'Live Project'}
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page Component ─── */
export const Projects = () => {
  const { openModal } = useContactModal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const isCardVisible = (card) => {
    if (!card) return false;
    return activeFilter === 'all' || (card.categories && card.categories.includes(activeFilter));
  };

  return (
    <div style={{ background: C.bg }}>

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 md:py-32 px-6 min-h-[70vh] lg:min-h-screen flex items-center justify-center text-center" style={{
        background: C.surface,
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
            OUR WORK
          </span>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(32px, 7vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: C.onBg,
            maxWidth: '900px',
            marginTop: '24px',
            marginBottom: '48px',
          }}>
            Projects That{' '}
            <span style={{ fontStyle: 'italic', color: C.primaryFixed }}>
              Speak For Themselves
            </span>
          </h1>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '72px' }}>
            <button
              onClick={openModal}
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
              Start a Project <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
            <Link
              to="/services"
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
              View Services
            </Link>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className="proj-filter-btn"
                style={{
                  borderRadius: '9999px',
                  padding: '8px 24px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  border: activeFilter === f.value ? 'none' : `1px solid #E5E7EB`,
                  background: activeFilter === f.value ? C.onBg : 'transparent',
                  color: activeFilter === f.value ? '#FFFFFF' : C.secondary,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 120px 24px' }}>
        <div className="portfolio-grid">
          {PROJECTS.filter(p => p.row !== 'featured').map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isVisible={isCardVisible(project)}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 md:py-20 px-6" style={{ background: C.onBg }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 text-center" style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {[
            { value: '28+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '9+', label: 'Industries Served' },
            { value: '3yr', label: 'Years of Experience' },
          ].map((stat, i) => (
            <div key={stat.label} className="border-t border-[#e2e4d1]/10 pt-6 md:border-t-0 md:pt-0 md:border-l md:first:border-l-0 md:pl-6 first:border-t-0" style={{
              padding: '0 16px',
            }}>
              <p style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: '56px',
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.primaryFixed,
                marginBottom: '8px',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: C.secondaryContainer,
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED CASE STUDY (AgriElevate) ── */}
      {isCardVisible(PROJECTS.find(p => p.id === 'agrielevate')) && (
        <section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}>
              <img
                alt="AgriElevate Featured Case Study"
                src={agrielevateImg}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            {/* Text */}
            <div>
              <span style={{
                display: 'inline-block',
                background: C.secondaryContainer,
                color: C.onSecondaryContainer,
                padding: '4px 16px',
                borderRadius: '9999px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}>
                FEATURED CASE STUDY
              </span>

              <h2 style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(32px, 6vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: C.onBg,
                marginBottom: '24px',
              }}>
                AgriElevate
              </h2>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                lineHeight: 1.6,
                color: C.secondary,
                marginBottom: '32px',
              }}>
                {PROJECTS.find(p => p.id === 'agrielevate')?.description || ''}
              </p>

              {/* Checklist */}
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {(PROJECTS.find(p => p.id === 'agrielevate')?.highlights || []).map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="material-symbols-outlined" style={{
                      color: C.primaryFixed,
                      background: C.onBg,
                      borderRadius: '9999px',
                      padding: '4px',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      check
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: C.onBg }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedProject(PROJECTS.find(p => p.id === 'agrielevate'))}
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.primary}
                onMouseLeave={e => e.currentTarget.style.background = C.onBg}
              >
                Read Full Story
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      )}


      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
};

export default Projects;
