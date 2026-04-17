# Palette — AI Design System Generator

## Product Overview

An AI-powered product that generates a complete, editable design system through a short guided onboarding flow. Designed for the GCC/MENA region with bilingual UI, RTL support, and regional visual preferences.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Image Processing:** Sharp (logo color extraction)
- **Font Loading:** next/font (Google Fonts)

## Design Language

- **Shell:** Dark Mode Minimalism (#0D0D0F base)
- **Accents:** Aurora UI — soft color bleeds for warmth and visual identity
- **Typography:** Clean white type, minimal borders
- **Philosophy:** High-end creative studio — quiet confidence, not noise

## Architecture

```
/app                    → Next.js App Router pages
/components             → Reusable UI components
  /onboarding           → Wizard step components
  /workspace            → Results workspace components
  /ui                   → Base UI primitives
/lib                    → Utilities, token generation, color science
/store                  → Zustand state stores
/types                  → TypeScript type definitions
/public                 → Static assets
```

## MVP Scope

- 8-step Typeform-style onboarding wizard
- Logo upload with color extraction OR curated palette selection
- 4-6 typography style packs with bilingual previews
- Light + dark theme generation
- Core component themes (button, input, card, badge, sidebar, table)
- 3 starter screen previews
- Bilingual (EN/AR) preview with RTL toggle
- Save, apply, and export design system
- Structured token output

## Onboarding Steps

1. What are you building?
2. Which industry?
3. Visual tone selection
4. Logo upload or palette selection
5. Typography style
6. Interface density
7. Language and layout preferences
8. Inspiration selection (optional)

## Generation Layers

1. **Inputs** → Collect user preferences
2. **Structured Inference** → Derive trust level, formality, density, etc.
3. **Token Generation** → Produce normalized design tokens
4. **Component Mapping** → Apply tokens to component schemas
5. **Screen Generation** → Generate starter layouts and previews


# Product Spec — AI Design System Generator

## 1. Product Overview

An AI-powered product that generates a complete, editable design system through a short guided onboarding flow.

The user answers a few simple questions in a Typeform-style experience, such as:
- what they are building
- which industry they are in
- which visual styles they prefer
- whether they want to upload a logo
- which font pairings they like
- whether they want a compact or spacious interface
- whether they need Arabic + English and RTL support

The system then generates a full design system pack that can be used by builders, no-code tools, app generators, or downstream MCP integrations.

This product is designed especially for the GCC / MENA region, where bilingual UI, RTL support, enterprise trust, and regional visual preferences matter.

---

## 2. Vision

Generate a region-ready, branded, bilingual-capable design system in minutes without needing a designer.

The product should help users move from vague taste and a few onboarding inputs to:
- brand colors
- typography
- spacing and layout rules
- component themes
- starter templates
- screen previews
- editable design tokens

---

## 3. Problem Statement

Most no-code and AI app builders either:
- start users from a blank canvas, or
- generate visually inconsistent outputs

Common problems:
- weak visual consistency
- poor typography choices
- low-quality color combinations
- generic Western UI styles that do not fit GCC expectations
- poor Arabic support
- no reusable design system behind generated screens

Users often know what they like visually, but they do not know how to turn that into a scalable design system.

This product solves that by translating simple onboarding choices into a structured visual system.

---

## 4. Product Goals

### Primary Goals
- reduce blank-canvas friction
- make brand setup simple for non-designers
- generate a reusable design system, not just one-off styles
- support bilingual and RTL-ready interfaces by default
- create outputs that feel premium, modern, and regionally relevant

### Secondary Goals
- improve quality of AI-generated apps
- improve consistency across multiple projects
- increase trust in generated outputs for enterprise users
- create a structured foundation for future QA and governance

---

## 5. Target Users

### Primary Users
- founders
- business teams
- operations managers
- product owners
- internal transformation teams
- startup teams without dedicated designers
- agencies building apps for clients
- enterprise teams building portals and internal tools

### Secondary Users
- no-code platform teams
- design ops teams
- implementation partners
- AI app builder products that want branded output

---

## 6. Core Use Case

A user starts a new project and is guided through a short onboarding flow.

They answer simple visual and business-context questions.

The system generates:
- a theme
- a token set
- component styles
- screen previews
- a reusable design system profile

The user can then:
- apply it to a project
- edit it manually
- save it as a brand template
- use it via API / MCP in another system

---

## 7. Typeform-Style Onboarding Flow

## Step 1 — What are you building?
**Question:** What are you building?

**Options:**
- Internal admin portal
- Employee self-service portal
- Customer portal
- Student / education portal
- Approval / workflow app
- Operations dashboard
- Booking / request app
- Marketplace / directory
- Something else

**Purpose:**
- informs layout defaults
- informs navigation patterns
- informs dashboard vs workflow bias
- informs component priority

---

## Step 2 — Which industry are you in?
**Question:** Which industry best matches your use case?

**Options:**
- Government / public sector
- Education
- Healthcare
- Real estate
- HR / internal services
- Operations / facilities
- Logistics
- Retail / commerce
- Finance / insurance
- Hospitality
- Other

**Purpose:**
- influences tone
- influences trust profile
- influences layout style
- informs template recommendations

---

## Step 3 — Pick your visual tone
**Question:** Which style feels closest to your brand?

**Options shown as cards:**
- Professional / corporate
- Premium / elegant
- Modern / startup
- Friendly / approachable
- Minimal / clean
- Bold / high-contrast
- Institutional / formal
- Youthful / educational

**Purpose:**
- affects typography pairing
- affects shape language
- affects card and shadow style
- affects density and hierarchy

---

## Step 4 — Upload your logo or choose a starter palette
**Question:** Do you want to generate your brand colors from a logo?

**Options:**
- Upload logo
- Skip and choose from curated palettes

### If logo is uploaded
The system should:
- extract dominant colors
- detect usable primary and secondary tones
- avoid inaccessible or poor-contrast combinations
- generate semantic tokens from the logo colors

### If logo is skipped
Show 5 curated color families, for example:
- Desert Sand / Gold
- Deep Blue / Teal
- Emerald / Slate
- Plum / Rose
- Neutral / Electric Accent

**Purpose:**
- keeps onboarding easy
- avoids requiring users to know color theory
- provides regionally appropriate palette options

---

## Step 5 — Choose a typography style
**Question:** Which text style feels right?

The system should show 4 to 6 preview cards with:
- English heading
- English paragraph
- Arabic heading
- Arabic paragraph
- button label sample
- number sample

**Possible style groups:**
- Clean Sans
- Premium Modern
- Formal Institutional
- Friendly Rounded
- Bold Product UI
- Compact Dashboard

**Purpose:**
- users choose by feel, not font names
- typography is pre-vetted for bilingual use
- reduces poor font pairing decisions

---

## Step 6 — Choose interface density
**Question:** How compact should your app feel?

**Options:**
- Comfortable
- Balanced
- Dense / data-heavy

**Purpose:**
- affects spacing scale
- affects card padding
- affects table density
- affects input height
- affects dashboard layout rhythm

---

## Step 7 — Language and layout preferences
**Question:** Which languages should your app support?

**Options:**
- English only
- Arabic only
- English + Arabic
- English + Arabic + more later

**Optional toggles:**
- RTL support
- regional date formatting
- regional number formatting
- Hijri support later
- multi-currency support later

**Purpose:**
- defines localization profile
- defines RTL behavior
- affects typography rules
- affects layout mirroring

---

## Step 8 — Optional inspiration selection
**Question:** Which examples feel closest to what you want?

Show 6 to 8 visual examples such as:
- admin-heavy
- portal-style
- dashboard-heavy
- mobile-first
- formal enterprise
- soft modern
- premium brand-led
- public service oriented

**Purpose:**
- helps disambiguate aesthetic preference
- improves screen generation quality
- gives the model stronger visual direction

---

## 8. Generated Output

After onboarding, the system generates a complete design system pack.

## 8.1 Brand Tokens
- primary
- primary hover
- secondary
- accent
- background
- surface
- muted surface
- border
- text primary
- text secondary
- success
- warning
- danger
- info

Also generate:
- contrast-safe text pairings
- light theme values
- dark theme base values

---

## 8.2 Typography System
- heading font
- body font
- Arabic-compatible pairings
- H1 to H6 scale
- body and small text styles
- line-height rules
- fallback stacks
- numeral display guidance

---

## 8.3 Shape and Spacing System
- spacing scale
- radius scale
- elevation / shadow model
- border style
- section spacing rules
- component padding rules

---

## 8.4 Component Themes
Generate themed styles for:
- buttons
- inputs
- selects
- date pickers
- checkboxes
- radios
- cards
- tables
- badges
- tabs
- sidebars
- nav bars
- modals
- drawers
- alerts
- empty states
- skeleton states

---

## 8.5 App Shell Rules
- sidebar style
- header style
- page title pattern
- filter bar pattern
- dashboard widget pattern
- form layout rules
- mobile navigation behavior
- desktop layout defaults

---

## 8.6 Starter Templates
Based on industry and project type, generate starter screens such as:
- dashboard
- form page
- list page
- detail page
- settings page
- request flow page
- mobile preview

---

## 8.7 Regional UI Rules
If bilingual mode is enabled, the system should generate:
- RTL-safe spacing behavior
- mirrored navigation rules
- Arabic heading adjustments
- label wrapping rules
- mixed-language table handling
- region-friendly date and number display settings

---

## 9. Results Workspace

After generation, the user sees a results workspace with the following sections.

## 9.1 Theme Overview
Shows:
- uploaded logo
- final palette
- selected typography system
- visual style summary
- density profile
- language setup

## 9.2 Components Preview
Shows a live preview gallery of:
- buttons
- forms
- cards
- tables
- nav
- alerts
- modals

## 9.3 Sample Screens
Shows 3 to 5 auto-generated sample screens.

## 9.4 Localization Preview
Allows toggling:
- English / Arabic
- LTR / RTL

## 9.5 Apply / Save Actions
Actions:
- Apply to project
- Save as reusable theme
- Save as organization brand system
- Duplicate and edit manually
- Export via API / MCP

---

## 10. Functional Requirements

## FR-01 Guided onboarding wizard
The system shall provide a step-by-step onboarding experience with progress, save/resume, and skip support.

## FR-02 Logo-based palette extraction
The system shall extract color candidates from uploaded logos and convert them into accessible UI tokens.

## FR-03 Curated palette fallback
The system shall provide curated palette families if no logo is uploaded.

## FR-04 Typography preview engine
The system shall show typography previews using both English and Arabic samples where relevant.

## FR-05 Localization profile generation
The system shall generate a language and layout profile based on user selections.

## FR-06 Token generation
The system shall generate structured tokens for colors, spacing, typography, radius, elevation, and component states.

## FR-07 Component theme generation
The system shall generate component themes mapped to a standard UI component library.

## FR-08 Screen template generation
The system shall generate starter screens based on industry, app type, and selected visual direction.

## FR-09 Editable output
Users shall be able to edit generated themes after creation.

## FR-10 Versioned regeneration
Users shall be able to regenerate themes while preserving prior versions.

## FR-11 Explainability
The system shall provide a brief explanation of why it generated the theme, for example:
"Generated a formal bilingual system because you selected government, Arabic + English, and a high-trust visual style."

## FR-12 Theme persistence
The system shall allow themes to be saved as project-level or reusable system-level assets.

## FR-13 Export / MCP access
The system shall expose generated design system data in a structured way for downstream use through API or MCP integration.

---

## 11. Non-Functional Requirements

## NFR-01 Accessibility
Generated themes must meet minimum contrast standards and avoid unsafe combinations.

## NFR-02 RTL readiness
Generated layouts and component rules must support RTL when bilingual or Arabic mode is selected.

## NFR-03 Responsiveness
Generated systems must work well across desktop, tablet, and mobile.

## NFR-04 Performance
Initial generation should feel fast and ideally complete within 30 to 60 seconds.

## NFR-05 Auditability
Generation events and edits should be versioned and traceable.

## NFR-06 Governance
Admins should be able to approve, lock, or restrict theme changes in enterprise settings.

## NFR-07 Reliability
Fallback logic should exist if logo extraction, font selection, or palette generation fails.

---

## 12. AI Generation Model

The AI should not directly produce raw visual output without structure.

Generation should happen in layers.

## Layer 1 — Inputs
Collect:
- industry
- project type
- visual tone
- logo or palette choice
- typography preference
- density preference
- language setup
- inspiration preference

## Layer 2 — Structured inference
Infer:
- trust level
- formality level
- interaction density
- layout style
- contrast target
- navigation style
- component emphasis

## Layer 3 — Token generation
Generate normalized design tokens.

## Layer 4 — Component mapping
Apply tokens to a component schema.

## Layer 5 — Screen generation
Generate starter layouts and previews.

This ensures outputs are structured, reusable, and governable.

---

## 13. System Architecture

## Frontend
- onboarding wizard
- live preview renderer
- typography comparison cards
- results workspace
- theme editor

## Backend Services
- logo color extraction service
- palette generation service
- token generation engine
- accessibility validator
- localization and RTL validator
- template generation engine
- theme storage and versioning service

## Data Entities
- ThemeProfile
- BrandInput
- PaletteTokenSet
- TypographySet
- ComponentThemeSet
- LocalizationProfile
- ThemeVersion
- GeneratedScreenSet
- IndustryPreset

---

## 14. MVP Scope

## Included in MVP
- onboarding wizard
- logo upload or palette selection
- 4 to 6 typography style packs
- 5 curated palette families
- light theme generation
- basic dark theme derivation
- core components:
  - button
  - input
  - card
  - badge
  - sidebar
  - table
- 3 starter screens
- bilingual preview
- save and apply theme
- export structured design system data

## Excluded from MVP
- full Figma export
- advanced animation rules
- custom icon generation
- full industry template library
- deep governance workflows
- live code export for all frameworks

---

## 15. Phase 2 Scope
- more industries
- more components
- more starter screens
- better dark mode refinement
- advanced manual editing
- design QA checks
- stronger brand governance
- more localization options
- richer API and MCP controls

---

## 16. Phase 3 Scope
- multi-brand organizations
- brand approval workflows
- design system inheritance
- child themes per project
- theme quality scoring
- AI redesign suggestions
- import from existing live apps
- export to code tokens and design tools

---

## 17. Suggested Industry Presets

## Government / Public Sector
- restrained palette
- stronger hierarchy
- formal typography
- lower decorative noise
- high readability

## Education
- softer accents
- clearer content layout
- approachable but credible feel
- portal-friendly UI

## Healthcare
- calm palette
- strong readability
- status-driven UI
- operational dashboard patterns

## Real Estate
- premium palette
- media-friendly cards
- location-focused blocks
- stronger visual presentation

## Operations / Logistics
- dense layouts
- strong status colors
- table and action-heavy patterns
- filter-first interfaces

---

## 18. Success Metrics

## Product Metrics
- percentage of new users completing the flow
- percentage of generated systems applied to projects
- time to first usable branded UI
- number of reusable themes saved
- regeneration rate

## Quality Metrics
- contrast pass rate
- RTL pass rate
- user satisfaction with generated theme
- edit rate after first generation
- screen consistency score

## Business Metrics
- improved project activation
- improved demo quality
- improved visual quality of downstream generated apps
- increased enterprise trust in generated output

---

## 19. Recommended Positioning

This product should not be positioned as:
- a color picker
- a palette toy
- a one-click style gimmick

It should be positioned as:

**A guided AI system that turns a few onboarding answers into a reusable, editable, region-ready design system.**

Core positioning themes:
- fast
- structured
- bilingual-capable
- premium
- reusable
- enterprise-friendly
- MENA-ready

---

## 20. Suggested Tagline Options

- Generate a region-ready design system in minutes
- Turn a few answers into a branded UI system
- Build your brand system before you build your app
- From logo and taste to a complete design system
- Create bilingual, premium design systems with a few simple choices

---

## 21. Product Principles

- keep onboarding simple
- show visual options instead of asking technical questions
- prioritize reusable systems over one-off screens
- support Arabic and RTL from the beginning
- keep all outputs editable
- make generated systems production-usable, not just inspirational
- optimize for trust and quality, not random creativity