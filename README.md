# Airbnb Listing Page Clone & Production Architecture (PlayPower Labs Assignment)

A pixel-perfect, production-grade reproduction of the Airbnb property listing page for **Romantic Jacuzzi 1BHK Candolim | Mirashya UG10**, built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

---

## 🌟 What Was Built

### 1. Main Listing Page (`/`)
- **Airbnb Navigation Header**:
  - Airbnb logo with rose branding
  - Interactive search capsule (*Anywhere · Any week · Add guests*)
  - Interactive System Architecture button
  - Save to Wishlist toggle with counter
  - Share modal launcher & user profile dropdown menu
- **Hero Photo Grid (5 Photos)**:
  - Exact Airbnb 5-tile asymmetric layout (1 large feature left, 4 grid tiles right) with rounded outer corners and hover zoom transitions.
  - Floating **"Show all photos"** button with 3x3 grid icon.
  - Interactive click handlers to open direct Lightbox or launch full Photo Tour.
- **Listing Quick Facts & Host Summary**:
  - Property rating badge (`★ 4.92 · 48 reviews · Superhost · Candolim, Goa, India`)
  - Superhost badge and quick specs (`4 guests · 1 bedroom · 2 beds · 1 bath`)
- **Highlights & Sleeping Arrangements**:
  - Key highlights: *Dedicated workspace*, *Self check-in with keypad*, *Free cancellation for 48 hours*
  - "Where you'll sleep" with visual room cards for Master Bedroom (King Bed) and Living Room (Sofa Bed).
- **Amenities Section ("What this place offers")**:
  - Categorized grid of popular amenities (Private Jacuzzi, Pool, 150 Mbps Wi-Fi, AC, 4K TV, Kitchen, Washer)
  - Full **"Show all 32 amenities"** modal with real-time search filtering.
- **Interactive Dual-Month Date Picker**:
  - Dual-month interactive calendar for selecting check-in and checkout date ranges, night calculation, and clear dates trigger.
- **Sticky Reserve / Booking Widget**:
  - Desktop sticky floating card with nightly price (₹4,599/night)
  - Date capsule input linking to calendar
  - Guest counter popover (+/- stepper for Adults, Children, Infants, Pets with validation)
  - Iconic Airbnb rose gradient **"Reserve"** button
  - Itemized price breakdown: `Base Price x Nights`, `10% Weekly Discount`, `Cleaning Fee`, `Airbnb Service Fee`, `Total before taxes`.
- **Guest Reviews Section**:
  - 6-category rating breakdown with visual progress bars (Cleanliness 4.9, Accuracy 4.9, Communication 5.0, Location 4.8, Check-in 5.0, Value 4.8)
  - Review cards grid with reviewer avatar, location, stay tenure, and verified testimonials
  - Full **"Show all 48 reviews"** modal with search filter.
- **Location Map Section ("Where you'll be")**:
  - Interactive map simulation of Candolim / Pilerne Goa with custom Airbnb pin and pulsing radar
  - Nearby highlights guide (Candolim Beach, Aguada Fort, Calangute, Airport).
- **Host Profile & Co-hosts ("Meet your Host")**:
  - Mirashya profile card, Superhost badge, 382 reviews, 4.94 rating, co-hosts (Kunal, Pooja), 100% response rate, verified identity.
- **Things to Know**:
  - House rules, safety & property features, cancellation policy.

---

### 2. Photo Tour View (Full-Screen Overlay)
- Clean full-screen modal opened via **"Show all photos"** or hero photo clicks.
- Sticky top navigation bar with Back button, Share & Save actions.
- Room category filter tabs (*All*, *Living room*, *Bedroom*, *Jacuzzi & Pool*, *Kitchen & Dining*, *Bathroom*, *Balcony & Views*) with smooth scrolling.
- 18 high-resolution photos grouped by room with descriptive captions.
- Clicking any photo seamlessly transitions into the **Lightbox view** at that exact photo.

---

### 3. Lightbox View (Single-Photo Viewer)
- Dark theater-mode overlay (`#000000`) matching Airbnb's exact viewer.
- Header counter: e.g. `3 / 18`, Close (`✕`), Share, and Save buttons.
- Centered high-resolution image container with responsive aspect ratio.
- Left (`<`) and Right (`>`) arrow buttons for navigation.
- **Full Keyboard Navigation**:
  - `ArrowLeft`: Navigate to previous photo
  - `ArrowRight`: Navigate to next photo
  - `Escape`: Close lightbox
- Interactive thumbnail filmstrip at the bottom with active photo highlighting and quick-jump support.

---

### 4. Production-Scale Architecture & Scaling Strategy
As specified in the assignment requirements, a comprehensive architecture for a 100M+ MAU vacation-rental marketplace is included:
- **Architecture Diagram**: High-resolution architecture blueprint saved at [`images/system_architecture.png`](./images/system_architecture.png) and [`images/system_architecture.svg`](./images/system_architecture.svg).
- **Architecture Documentation**: Complete documentation in [`ARCHITECTURE.md`](./ARCHITECTURE.md) covering:
  - Frontend Edge SSR/ISR, React 19 Streaming, WebP/AVIF media pipeline
  - Envoy API Gateway, GraphQL BFF, gRPC inter-service communication
  - Distributed microservices on AWS EKS (Kubernetes HPA)
  - Redis Enterprise (Availability Bitmaps, Redlock for zero double-booking)
  - PostgreSQL table partitioning and Multi-AZ read replicas
  - OpenSearch H3 hexagonal geo-spatial indexing & semantic vector search
  - Apache Kafka event streaming for asynchronous order lifecycle

---

### 5. AI Subagents & Skill Configurations
Configured in `.agents/skills/` and `agent-configs/`:
- [`.agents/skills/accessibility-auditor/SKILL.md`](./.agents/skills/accessibility-auditor/SKILL.md): WCAG 2.1 AA keyboard navigation, focus rings, and ARIA auditing.
- [`.agents/skills/visual-parity-checker/SKILL.md`](./.agents/skills/visual-parity-checker/SKILL.md): Visual design tokens, padding geometry, and hover animation verification.
- [`agent-configs/code-quality-subagent.json`](./agent-configs/code-quality-subagent.json): TypeScript strictness and component modularity rules.
- [`agent-configs/accessibility-subagent.json`](./agent-configs/accessibility-subagent.json): Keyboard shortcuts and screen-reader accessibility rules.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at:
http://localhost:3000

# 4. Production build verification
npm run build
```
