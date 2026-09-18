---
name: visual-parity-checker
description: Verifies visual design tokens, layout geometry, typography, and micro-interactions against Airbnb design system.
---

# Visual Parity Checker Skill

This skill ensures 100% design fidelity and behavioral matching with Airbnb's official listing page specifications.

## Design Token Standards

### 1. Typography & Colors
- **Primary Brand Red/Rose**: `#FF385C` (Gradient: `linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)`)
- **Primary Text**: `#222222` / `text-zinc-900`
- **Secondary Text / Subtitles**: `#717171` / `text-zinc-500`
- **Borders**: `#EBEBEB` / `border-zinc-200`
- **Font Stack**: Clean modern Sans-serif (`var(--font-sans)`, Inter / Circular Airbnb standard)

### 2. Layout Geometry
- **Container Max-Width**: `max-w-[1280px]` with responsive horizontal gutters (`px-4 sm:px-8 xl:px-12`).
- **Hero Photo Grid**: Asymmetric 5-photo grid (1 primary left spanning 2 rows/cols, 4 grid tiles right) with rounded corners (`rounded-2xl`).
- **Sticky Reserve Card**: Fixed at `top-28` with elevation shadow, rounded border, date/guest capsule input boxes, and price breakdown.

### 3. Micro-Animations & Transitions
- **Hover Zoom**: Photo tiles scale to `scale-105` with `transition-transform duration-300` and subtle brightness adjustment.
- **Button Active States**: Scale down on active click (`active:scale-95` or `active:scale-[0.99]`).
- **Modal Entry**: `animate-in fade-in zoom-in-95 duration-200`.
