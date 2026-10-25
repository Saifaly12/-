---
name: Kinetic Academe RTL
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#005e3f'
  on-tertiary: '#ffffff'
  tertiary-container: '#007952'
  on-tertiary-container: '#99ffcd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Cairo
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: '1.25'
  display-hero-mobile:
    fontFamily: Cairo
    fontSize: 2rem
    fontWeight: '800'
    lineHeight: '1.3'
  headline-xl:
    fontFamily: Cairo
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.3'
  headline-xl-mobile:
    fontFamily: Cairo
    fontSize: 1.625rem
    fontWeight: '700'
    lineHeight: '1.35'
  headline-lg:
    fontFamily: Cairo
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.35'
  headline-lg-mobile:
    fontFamily: Cairo
    fontSize: 1.375rem
    fontWeight: '700'
    lineHeight: '1.4'
  headline-md:
    fontFamily: Cairo
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.4'
  title-card:
    fontFamily: Cairo
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.45'
  body-lg:
    fontFamily: Cairo
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Cairo
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.65'
  body-sm:
    fontFamily: Cairo
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1.6'
  label-interactive:
    fontFamily: Cairo
    fontSize: 0.9375rem
    fontWeight: '600'
    lineHeight: '1.4'
  label-badge:
    fontFamily: Cairo
    fontSize: 0.75rem
    fontWeight: '700'
    lineHeight: '1.2'
  metric-digit:
    fontFamily: Cairo
    fontSize: 2.5rem
    fontWeight: '800'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
  space-2xl: 3.5rem
---

## Brand & Style

This design system establishes an Arabic-first digital environment tailored to physical education, biomechanical feedback, and structured motor-skills acquisition. The design aesthetic bridges rigorous academic credibility with tactile, gamified kinetic feedback. It balances the structure of clinical movement pedagogy with responsive, motivating digital reinforcement.

### Brand Personality & Emotional Impact
- **Authoritative & Scientific:** Anchors student drills, biomechanical posture evaluations, and assessment metrics in established academic standards.
- **Dynamic & Kinetic:** Employs crisp directional signifiers, deliberate micro-interactions, and visual progress momentum that encourage physical practice.
- **Encouraging & Diagnostic:** Normalizes iterative motor failure and calibration using clear diagnostic alerts rather than punitive signifiers.

### Style Archetype: Precision Academic with Kinetic Tactility
The visual framework merges modern structural minimalism with tactile depth:
- **Directional Grounding:** Built natively for Right-to-Left (RTL) reading flows (`dir="rtl"`), ensuring visual mass, iconography, and progress bars flow intuitively from right to left.
- **Tactile Card Substrates:** Crisp, high-contrast surfaces over off-white backdrops, paired with deliberate 1px structural outlines and muted ambient shadows to mimic academic workbooks and athletic evaluation clipboards.
- **Kinetic Gamification:** Integrated gamified assessment zones draw inspiration from agile assessment environments, leveraging distinct chromatic surfaces to drive quick decision-making under timed conditions.

## Colors

The palette balances academic trustworthiness with energetic biomechanical indicators. The core color scheme provides visual comfort during extended instructional reading, while saturated status and gamified tokens deliver rapid legibility during physical drills and interactive assessments.

### Palette Architecture

- **Primary (`#0F766E` Deep Teal):** The core anchor for institutional headers, primary actions, and navigational structural anchors. Represents precision, physical discipline, and academic legitimacy.
  - *Dark Tone / Active State:* `#115E59`
  - *Vibrant Accent / Hover State:* `#0D9488`
- **Secondary (`#0284C7` Dynamic Tech Blue):** Signifies interactive learning, automated tracking metrics, kinematic telemetry graphs, and interactive unit checkpoints.
  - *Hover / Elevation:* `#2563EB`
  - *Deep Substrate:* `#1D4ED8`
- **Tertiary (`#10B981` Motor Emerald):** Marks validated motor competencies, accomplished milestones, and optimal posture targets.
- **Neutral Surface Palette:**
  - *Canvas Background:* `#F8FAFC` to `#F1F5F9` (eliminating glare under bright sports-hall lighting).
  - *Elevated Substrates:* `#FFFFFF`.
  - *Structural Borders:* `#E2E8F0` and `#CBD5E1`.
  - *Deep Text & Headings:* `#0F172A` (Slate 900) for high-contrast Arabic legibility.

### Motor Evaluation & State Tokens
- **Completed / Mastered:** `#10B981` (Emerald) — Successful motor performance execution.
- **In-Progress / Calibrating:** `#F59E0B` (Amber) — Partial achievement, cadence training required.
- **Practice Needed / Alert:** `#F43F5E` (Rose) — Form error, corrective posture feedback.
- **Uninitiated / Dormant:** `#94A3B8` (Slate Muted) — Prerequisite units locked.

### Rapid Kinetic Assessment (Gamified Quiz Palette)
For fast-paced, high-arousal knowledge checks and motor reflex responses:
- **Option Quadrant A:** `#EF4444` (Crimson)
- **Option Quadrant B:** `#3B82F6` (Royal Blue)
- **Option Quadrant C:** `#F59E0B` (Amber Gold)
- **Option Quadrant D:** `#10B981` (Emerald Green)

## Typography

The typographical foundation relies on **Cairo**, an Arabic sans-serif typeface designed with geometric harmony, wide counters, and clear diacritic rendering. This ensures technical sports terminology, motor mechanics, and anatomical terms remain legible at various distances.

### Typographic Implementation Rules
- **Native RTL Baseline & Line Heights:** Arabic characters require greater vertical space than Latin letterforms due to tall ascenders and deep descenders (`alif`, `lam`, `noon`, `yaa`). Standard body line heights are maintained at `1.6` to `1.7` to prevent diacritical collisions.
- **Letter Spacing Constraints:** Avoid applying negative letter spacing (`letter-spacing`) to Arabic script, as cursive ligatures and character junctions will break. Numerical metrics and alphanumeric scoring badges may use tabular formatting.
- **Fallback Hierarchy:** `Cairo`, `Tajawal`, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif.

## Layout & Spacing

The structural layout uses an RTL-first fluid grid optimized for Angular components and Tailwind CSS utilities. Information hierarchies flow from top-right to bottom-left.

### Breakpoints & Canvas Shell
- **Desktop (>= 1280px):** 12-column grid. Permanent right-anchored instructional sidebar (`w-72` to `w-80`), main viewport content area with `gutter: 1.5rem` and `margin: 2rem`.
- **Tablet (768px - 1279px):** 8-column layout. Collapsible right rail transitioning into an off-canvas drawer. Outer gutters set to `1.5rem`.
- **Mobile (< 768px):** 4-column flow. Bottom-docked navigation bar for single-thumb drill selection; outer margins compress to `1rem`.

### Spatial Logic & RTL Invariants
- Use logical CSS properties (`padding-inline-start`, `margin-inline-end`, `inset-inline-start`) instead of directional terms (`left`/`right`).
- Flow paths for motor progress (such as skill timelines, checklist steps, and video timeline scrubbers) proceed right-to-left. Forward directional iconography (next arrow, advance unit) uses a left-pointing chevron (`rotate-180` in standard icon packs).

## Elevation & Depth

Visual hierarchy relies on structural, tonal layering complemented by subtle ambient shadows. This approach prevents visual clutter during high-frequency movement training and video analysis.

### Depth Layers
- **Ground (Level 0):** Canvas backdrop (`#F8FAFC`). Flat, non-reflective base plane.
- **Card Substrates (Level 1):** Primary learning units, skill modules, and progress containers (`#FFFFFF`). Outlined with a fine `1px` border (`#E2E8F0`) and supported by an ambient drop shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
- **Interactive Hover & Drag (Level 2):** Hovered skill units, selected motor evaluation cards, and dropdown containers: `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.07), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`.
- **Overlays & Modals (Level 3):** Timed quiz modules, form-correction video overlays, and assessment scorecards: `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`, framed over a `40%` opacity slate backdrop blur (`backdrop-blur-sm`).
- **Interactive Quiz Substrates:** Gamified options leverage solid bottom borders (`3px solid rgba(0, 0, 0, 0.15)`) to create a tactile, push-button feel suitable for quick reaction choices.

## Shapes

The interface uses standard rounded corners (`roundedness: 2`, where base components have `0.5rem` or `8px` radii). This creates a balanced, approachable appearance that feels polished without appearing overly child-oriented.

### Shape Geometry Rules
- **Interactive Buttons & Form Fields:** `rounded-lg` (`0.5rem` / `8px`) preserves clean geometric lines for technical Arabic typography.
- **Content Cards & Media Canvases:** `rounded-xl` (`1rem` / `16px`) cleanly frames video analysis viewports, skill progress trackers, and quiz question containers.
- **Badges, Tags, & Status Pills:** Fully rounded `rounded-full` (`9999px`) shapes for status badges, posture accuracy scores, and motor difficulty chips.
- **Progress Trackers:** Linear progress tracks use `rounded-full` pill geometries to signify smooth physical movement and continuous skill acquisition.

## Components

### Buttons
- **Primary Action (Motor Progression):** Solid `#0F766E` background, white text, `rounded-lg`, height `44px` (touch-optimized `48px` on mobile), font weight `600`. Focus states display an accessible `2px` ring offset in `#0D9488`.
- **Secondary / Calibration:** Clean white substrate with a `1.5px` border in `#0284C7`, text colored `#0284C7`. Reverses on hover to a soft blue tint (`#F0F9FF`).
- **Kinetic Gamified Response Buttons:** Large, touch-friendly answer blocks with bold white Cairo typography, saturated background tones, and a `3px` tactile bottom offset. Pressed states visually sink downward (`translate-y-0.5`).

### UnitCard & SkillSection
- **Structural Container:** White substrate, `rounded-xl`, `1px` border in `#E2E8F0`, padding `1.5rem`.
- **Header Structure:** Title displayed on the right with a skill category badge on the far left. Below, an RTL progress bar indicates module completion.
- **Status Accents:** Left-side border accent strip (width `4px`) colored dynamically: Emerald (Mastered), Amber (Training in Progress), or Slate (Locked).

### ProgressCard
- **Layout:** High-contrast statistical panel with a clean background.
- **Metric Presentation:** Prominent numeric stats displayed in `metric-digit` styling alongside concise Arabic labels below. Includes radial or linear indicators oriented RTL.

### Interactive Kahoot-Inspired QuizQuestion
- **Layout:** Top-centered question container with high-contrast text, accompanied by an animated progress timer bar that shrinks right-to-left.
- **Quadrant Grid:** 2x2 grid on desktop, single-column vertical stack on mobile.
- **Answer Tiles:** Distinct background fills (Crimson, Royal Blue, Amber, Emerald) paired with white text and geometric identification icons (triangle, diamond, circle, square) positioned at the inline-end of each tile.

### Form Inputs & Checkboxes
- **Text Inputs:** White background, `1px` border in `#CBD5E1`, text aligned right (`text-right`), focus ring in `#0F766E`. Placeholder copy styled in `#94A3B8`.
- **Checkboxes & Radios:** `rounded` (or circular for radio), `20px` touch target, checked state filled with primary `#0F766E` and displaying an animated white checkmark. Placed on the right of associated label text with `margin-inline-end: 0.75rem`.

### AssessmentResult Modal
- **Visual Design:** Centered score summary with a circular completion gauge, diagnostic feedback broken down into distinct color-coded chips, and an action bar providing options to re-drill or advance to the next unit.