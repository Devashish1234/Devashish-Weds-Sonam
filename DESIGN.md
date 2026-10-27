---
version: alpha
name: Devashish and Sonam Wedding Invitation
description: A temple-inspired Indian wedding invitation with editorial warmth and a cinematic mandap reveal.
colors:
  primary: "#6E1F2E"
  ivory: "#F8F0E3"
  paper: "#FFF9EF"
  maroon: "#6E1F2E"
  wine: "#42131E"
  gold: "#B5965A"
  brown: "#291C1A"
  sky: "#72C8F2"
  cloud: "#FFFFFF"
  focus: "#42131E"
typography:
  display:
    fontFamily: "Italiana, 'Playfair Display', Georgia, serif"
  body:
    fontFamily: "DM Sans, 'Segoe UI', sans-serif"
rounded:
  DEFAULT: "0.25rem"
  sm: "0.125rem"
  md: "0.25rem"
  lg: "1rem"
spacing:
  section-gap: "clamp(5rem, 12vw, 10rem)"
  page-max: "78rem"
components:
  button: { }
  card: { }
  form-field: { }
---

# Devashish and Sonam Wedding Invitation Design System

## Overview

### Creative North Star

The invitation is staged like a carved North Indian mandap opening onto a bright morning sky, then continues on the warm ivory paper of a family keepsake. The distinguishing move is the temple portal: it parts with the scroll and reveals the invitation beneath. The mandap is the hero artwork; marigold and red accents are used sparingly after the opening.

### Product context and register

- **Audience and primary job:** Wedding guests arriving on phones to understand the celebration, plan travel, RSVP, and leave a wish.
- **Target market(s) and evidence:** Indian wedding audience; names, venue, cultural references, and event program supplied in the brief.
- **Locale(s) and language policy:** English copy; dates and times use the event details provided by the couple.
- **Usage scene:** Personal phones first, often opened from a shared invitation link; important logistics must scan quickly.
- **Register:** Brand and information hybrid; expressive cover followed by a readable event invitation.
- **Memorable signature:** A vivid, transparent mandap divides like doors over the natural scroll.
- **Restraint:** Keep venue, schedule, RSVP, and contacts plain to scan; motion never blocks reading or movement.
- **Anti-references:** SaaS dashboards, glass panels, neon, oversized gradients, generic pill-card grids, and perpetual animation.
- **Token ownership/runtime mapping:** This file documents the design; `src/index.css` owns the runtime token values, exposed to Tailwind v4 through its CSS-first `@theme inline` mapping. Components consume utilities and semantic CSS variables; CSS is the token drift check.

## Colors

Ivory is the long-form paper surface, paper white is used for raised or contrasting readable areas, maroon carries ceremony and important actions, wine adds depth to the celebration section, gold is a fine border and detail color, and brown is the primary text color. Sky and cloud are reserved for the hero. Focus uses wine with an offset so keyboard navigation remains visible on both pale and maroon surfaces.

## Typography

Italiana leads names and display titles, with Playfair Display and Georgia fallbacks. DM Sans carries body copy, labels, forms, and event details. Display copy is roomy and editorial; logistical text stays upright and comfortable at phone widths. Use title case for names and sentence case for instructions; avoid all-caps except small eyebrows.

## Layout

Use a centered maximum width of 78rem with fluid side gutters. Each section has generous vertical separation; mobile reflows cards to one column and keeps event times together. The hero fills one visual viewport but does not pin the user or add scroll-only empty space. Reserve space for the mandap so the first view stays stable while fonts and images load.

## Elevation & Depth

Use soft, paired raised and inset shadows to make tactile clay surfaces from the warm ivory and maroon palette. Pale cards use a warm clay base with a broad soft shadow and a restrained highlight; dark cards use close, low-contrast shadows so text stays clear. Reserve depth for grouped interactive or informational surfaces, and keep the page background calm. The portal glow appears only in the hero transition. No blur surfaces or glass effects.

## Shapes

Use generous but controlled rounded corners (roughly .65–1.6rem) on cards and controls, thin muted-gold edges, and inset fields. Keep the temple artwork and couple photos vivid and crisp without picture borders. Editorial copy can remain open between grouped clay surfaces; avoid turning every text block into a card.

## Components

### Foundational visual states

Interactive content uses a visible wine focus ring, maroon hover/pressed treatment, and clear disabled contrast. Validation errors include plain text and remain associated with their fields.

### Buttons and actions

Text links use understated underlines or directional arrows. Primary actions are maroon with high-contrast text and an explicit keyboard focus state. Icon-only controls require accessible names.

### Navigation and data display

The page is a single long invitation with anchor links. Schedule entries use aligned date/time labels, not dense tables or generic dashboard cards.

### Forms and overlays

Use native inputs with visible labels and field-level error text. Do not show invented server states; RSVP confirmation explicitly says the response is local to this invitation page.

At each fresh visit, ask guests whether they are joining from the groom's or bride's side. Use a native modal dialog so focus stays inside the two required choices, and reorder the couple and parent names for that visit. Do not persist this choice across launches.
The entrance dialog uses a restrained claymorphism treatment in the invitation palette: warm ivory surfaces, soft raised and inset shadows, rounded choice tiles, and the same clear text hierarchy. Keep the page behind the full-screen gate hidden until a side is chosen.

The clay surface system continues through the invitation: blessing, scratch card, schedule panels, guest information, RSVP, wishes, countdown units, and media frame. Compact card internals for phone scanning. The story photo focus rail uses a square outer frame (20% shorter than the former 4:5 frame); keep all supplied photos visible with one clearly dominant, centered highlight and smaller, dimmer side previews. The focus glides to the selected photo when guests tap a preview or use the previous/next controls.

### Iconography

Use Lucide React sparingly for utility cues; prefer small bespoke CSS/SVG line motifs for Ganesh-inspired decorative framing. Do not make the religious motif an interactive icon.

### Motion

Use Framer Motion for the hero portal, the photo focus rail, and short opacity/position reveals. Keep movement slow, interruptible, scroll-linked only for the hero, and removed under `prefers-reduced-motion`.

### Content and data visualization

Use warm, direct, celebratory copy. All event facts and supplied couple-photo captions live in the typed wedding data module. The story gallery keeps all three photos visible, with the centered image largest and adjacent images shorter; selecting or advancing a photo animates it into the centered focus position. Images fill their frames without borders. Omit an Instagram account handle.

## Do's and Don'ts

- **Do:** Let the temple artwork and strong serif typography define the first impression.
- **Do:** Keep time, location, and contact information easy to scan and tap on a phone.
- **Don't:** Use a fake scroll runway, lock scrolling, or animate under reduced-motion preference.
- **Don't:** imply that local RSVP or wishes were sent to the family or stored across devices.
