---
name: High-Tech Studio System
colors:
  surface: '#fafbe7'
  surface-dim: '#dadbc9'
  surface-bright: '#fafbe7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f5e2'
  surface-container: '#eeefdc'
  surface-container-high: '#e8ead6'
  surface-container-highest: '#e2e4d1'
  on-surface: '#1a1d11'
  on-surface-variant: '#444934'
  inverse-surface: '#2f3225'
  inverse-on-surface: '#f1f2df'
  outline: '#757962'
  outline-variant: '#c5c9ae'
  surface-tint: '#526600'
  primary: '#526600'
  on-primary: '#ffffff'
  primary-container: '#c8f135'
  on-primary-container: '#566c00'
  inverse-primary: '#aed50d'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#585f6c'
  on-tertiary: '#ffffff'
  tertiary-container: '#dbe1f1'
  on-tertiary-container: '#5d6471'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9f236'
  primary-fixed-dim: '#aed50d'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#fafbe7'
  on-background: '#1a1d11'
  surface-variant: '#e2e4d1'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 120px
  container-padding: 24px
  gutter: 24px
  grid-columns: '12'
---

## Brand & Style
The design system embodies a **Corporate Modern** aesthetic with a high-tech, editorial edge. It is designed for a premium web development agency that balances technical precision with creative flair. The visual language is defined by high-contrast interactions—pairing deep blacks with an electric lime accent—to create a sense of energy and innovation.

The interface should feel architectural: structured, spacious, and deliberate. It utilizes heavy whitespace to allow high-quality portfolio work and technical typography to stand out, evoking a response of reliability and cutting-edge expertise.

## Colors
The palette is built on a foundation of high-contrast neutrals to maintain a professional "Studio" feel. 

- **Primary (Lime):** Used strictly for high-impact accents, primary actions, and highlighting key success metrics. 
- **Secondary (Near-Black):** The core of the identity. Used for primary text, dark-mode CTAs, and structural elements like footers or hero sections.
- **Tertiary (Gray):** Reserved for supporting metadata, body descriptions, and borders.
- **Surface Tiers:** Pure white is the primary canvas, while the light gray background is used for card groupings and section differentiation to provide subtle depth without heavy shadows.

## Typography
The system uses **Hanken Grotesk** for headlines to provide a sharp, contemporary "tech" feel, while **Inter** is used for body copy to ensure maximum legibility and functional neutrality.

- **Headlines:** Should use tighter letter-spacing and lower line-heights to create a compact, impactful look.
- **Body:** Uses a generous line-height (1.6) to improve readability in long-form case studies.
- **Labels:** Small caps or uppercase labels with slight tracking are used for categorizing blog posts or section headers to reinforce the editorial structure.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile.

- **Vertical Rhythm:** Sections are separated by large 120px gaps to create a "gallery" feel, ensuring that each service or project receives full focus.
- **Margins:** Consistent 24px margins on mobile, scaling to a max-width container of 1280px on desktop.
- **Component Spacing:** Built on an 8px base unit. Internal card padding should be 32px to match the open, airy brand personality.

## Elevation & Depth
Depth is created through **Tonal Layers** rather than heavy shadows. 

- **Soft Elevation:** Primary cards use a very subtle, diffused shadow (`0 4px 24px rgba(0,0,0,0.07)`) against white backgrounds.
- **Flat Containers:** On light gray backgrounds, cards should be flat with a 1px border (#E5E7EB) to maintain a clean, architectural look.
- **Interactions:** Upon hover, cards may lift slightly with a more pronounced shadow or a subtle scale effect (1.02x) to indicate interactivity.

## Shapes
The shape language is "Calculated Softness." Geometric precision is maintained while avoiding harsh corners.

- **Cards:** Use a 12px radius to feel modern and approachable.
- **Standard Buttons:** Use an 8px radius for a professional, sturdy appearance.
- **CTA Elements:** Primary navigation and specific marketing buttons use a full **pill-shape** (999px) to contrast against the grid-heavy layout and draw the eye.

## Components
- **Primary CTA:** Deep black (#0D0D0D) background, white text, pill-shaped. It should include a small right-arrow icon that animates on hover.
- **Accent Button:** Lime (#C8F135) background with black text, 8px border radius. Used for "Start a Project" or secondary calls to action.
- **Input Fields:** 1px solid gray (#E5E7EB) borders with 8px radius. On focus, the border transitions to black.
- **Cards:** White background with 12px radius. Feature cards should include a small lime-colored icon or accent line to tie back to the brand.
- **Chips/Badges:** Small, uppercase text on a light lime or light gray background with 999px radius, used for tagging technologies (e.g., "REACT", "UI/UX").
- **Lists:** Clean typography with generous vertical spacing and lime-colored checkmarks or custom geometric bullets.