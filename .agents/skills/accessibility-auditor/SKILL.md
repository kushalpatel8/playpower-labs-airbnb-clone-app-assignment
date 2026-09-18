---
name: accessibility-auditor
description: Automated accessibility and keyboard interaction auditor for Airbnb clone components.
---

# Accessibility Auditor Skill

This skill enforces strict WCAG 2.1 AA compliance across all components in the Airbnb Clone App.

## Focus Areas & Checklist

### 1. Keyboard Navigation
- [x] **Photo Lightbox**:
  - `ArrowLeft`: Navigate to previous photo.
  - `ArrowRight`: Navigate to next photo.
  - `Escape`: Close lightbox immediately and restore body scroll.
- [x] **Modal Dialogs**:
  - `Escape` key closes all active overlays (Amenities Modal, Reviews Modal, Description Modal, Share Modal, Architecture Modal).
  - Background scrolling is disabled when any modal is open (`document.body.style.overflow = 'hidden'`).
- [x] **Focus Management**:
  - Interactive buttons have visible focus rings (`focus-visible:ring-2 focus-visible:ring-black`).

### 2. ARIA & Semantic Structure
- [x] All modals have `role="dialog"`, `aria-modal="true"`, and descriptive `aria-label`.
- [x] Non-text interactive elements (icon buttons like Close, Share, Save, Previous, Next) have explicit `aria-label` attributes.
- [x] Images include informative `alt` text descriptions reflecting room and ambiance context.

### 3. Contrast & Color Accessibility
- [x] Text color contrast ratio against white background exceeds 4.5:1 for normal text and 3:1 for large headings.
- [x] Interactive button states provide distinguishable hover, active, and focused styling.
