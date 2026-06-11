import React from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

/* ─── Design tokens (matching Projects.jsx & Services.jsx) ─── */
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

/* ─── Blog Articles Data ─── */
const BLOG_POSTS = [
  {
    title: 'AgriElevate',
    category: 'Case Study',
    date: 'March 2026',
    readTime: '5 min read',
    description: 'How AgriElevate combines AI, satellite intelligence, and modern data infrastructure to empower farmers through technology-driven agriculture.',
    buttonText: 'Read Case Study',
    link: 'https://docs.google.com/document/d/18Qatvr6fAbq5o23lAKMk5dGp20UOiUMhyV1uhFGrhAk/edit?tab=t.0',
  },
  {
    title: 'UniMart',
    category: 'Project Breakdown',
    date: 'April 2026',
    readTime: '10 min read',
    description: 'Building a student-first marketplace that enables secure buying, selling, and renting within university communities.',
    buttonText: 'Read Article',
    link: 'https://docs.google.com/document/d/1LrsKyw8RAu79IcKochKTapUrDHvanZktKQZJ9lPVctI/edit?usp=sharing',
  },
  {
    title: 'InningsLab',
    category: 'Technical Documentation',
    date: 'December 2025',
    readTime: '8 min read',
    description: 'A technical overview of the InningsLab architecture, implementation approach, and development workflow.',
    buttonText: 'Read Documentation',
    link: 'https://github.com/aenishkhullar/innings-lab/blob/main/README.md',
  },
  {
    title: 'Yantra',
    category: 'Technical Documentation',
    date: 'May 2026',
    readTime: '2 min read',
    description: 'A high-performance simulator for algorithmic and manual trading strategies, featuring real-time data streaming, portfolio analytics, and advanced charting tools.',
    buttonText: 'Read Documentation',
    link: '#',
  },
  {
    title: 'LifeSync',
    category: 'Technical Documentation',
    date: 'March 2024',
    readTime: '2 min read',
    description: 'A comprehensive wellness application helping users balance fitness, mindfulness, sleep, and nutrition with personalized daily insights and goals.',
    buttonText: 'Read Documentation',
    link: '#',
  },
  {
    title: 'HRMS',
    category: 'Case Study',
    date: 'March 2024',
    readTime: '2 min read',
    description: 'A custom workforce management platform developed for a large-scale BPO operation.',
    buttonText: 'Read Case Study',
    link: '#',
  },
];

export const Blog = () => {
  const { openModal } = useContactModal();

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      
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
            INSIGHTS
          </span>

          {/* Headline */}
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
            Insights, Case Studies &{' '}
            <span className="italic-lime">
              Project Stories
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
            Explore how we design, develop, and scale digital products through real-world case studies, technical breakdowns, and project insights.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
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
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.primary}
              onMouseLeave={e => { e.currentTarget.style.background = C.onBg; e.currentTarget.style.color = C.onPrimary; }}
            >
              Start a Project <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
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
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED INSIGHTS SECTION ── */}
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
              FEATURED
            </span>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: C.onBg,
              marginBottom: '16px',
            }}>
              Featured Insights
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              color: C.secondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              A collection of project stories, development journeys, technical breakdowns, and case studies from the Alta Web Studios portfolio.
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="portfolio-grid">
            {BLOG_POSTS.map((post, idx) => (
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
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 29, 17, 0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(197, 201, 174, 0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Category Badge */}
                <span style={{
                  display: 'inline-block',
                  background: C.primaryContainer,
                  color: C.onPrimaryContainer,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  width: 'fit-content',
                }}>
                  {post.category}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: C.onBg,
                  margin: '12px 0 0px 0',
                  lineHeight: 1.2,
                }}>
                  {post.title}
                </h3>

                {/* Publish Date & Read Time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: C.secondary,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  marginBottom: '8px',
                }}>
                  <span>{post.date}</span>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Short Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: C.secondary,
                  margin: '0 0 24px 0',
                  flexGrow: 1,
                }}>
                  {post.description}
                </p>

                {/* Read Article Button */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: C.onBg,
                    color: C.onPrimary,
                    borderRadius: '9999px',
                    padding: '12px 24px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
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
                    width: 'fit-content',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.primary}
                  onMouseLeave={e => e.currentTarget.style.background = C.onBg}
                >
                  {post.buttonText}
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Blog;
