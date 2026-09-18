'use client';

import React, { useState, useEffect } from 'react';
import { X, Layers, Cpu, Database, Search, Cloud, ShieldCheck, Zap, Server, Activity, Bot, CheckCircle2, ArrowRight } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<'diagram' | 'scaling' | 'ai-workflow'>('diagram');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Production Architecture Blueprint"
    >
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-[#FF385C] border border-rose-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Production-Scale Vacation Rental Marketplace Architecture
              </h2>
              <p className="text-xs text-zinc-400">
                PlayPower Labs Take-Home Assignment · Airbnb Scale Blueprint
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-300 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'diagram'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white text-zinc-700 hover:bg-zinc-200/70 border border-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Interactive System Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('scaling')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'scaling'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white text-zinc-700 hover:bg-zinc-200/70 border border-zinc-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Scaling Strategy Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-workflow')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'ai-workflow'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white text-zinc-700 hover:bg-zinc-200/70 border border-zinc-200'
            }`}
          >
            <Bot className="w-4 h-4 text-[#FF385C]" />
            <span>AI Subagent & Skills Workflow</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-6 rounded-2xl border border-zinc-700 shadow-inner">
                <p className="text-xs uppercase tracking-widest text-[#FF385C] font-bold">
                  System Architecture Diagram
                </p>
                <h3 className="text-xl font-bold mt-1">
                  Global Multi-Tier Marketplace Topology
                </h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-3xl">
                  Designed for 100M+ Monthly Active Users, sub-100ms global search latency, high-concurrency booking locks with zero double-booking, and resilient multi-region failover.
                </p>

                {/* SVG Visual Architecture Blueprint */}
                <div className="mt-6 bg-zinc-950 p-6 rounded-xl border border-zinc-800 overflow-x-auto">
                  <svg
                    viewBox="0 0 960 480"
                    className="w-full min-w-[760px] h-auto select-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Grid */}
                    <defs>
                      <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#27272a" strokeWidth="0.5" />
                      </pattern>
                      <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF385C" />
                        <stop offset="100%" stopColor="#E00B41" />
                      </linearGradient>
                    </defs>
                    <rect width="960" height="480" fill="#09090b" />
                    <rect width="960" height="480" fill="url(#archGrid)" />

                    {/* Tier 1: Client & Global Edge */}
                    <g transform="translate(40, 40)">
                      <rect width="200" height="80" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                      <text x="20" y="32" fill="#a1a1aa" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 1: GLOBAL EDGE</text>
                      <text x="20" y="52" fill="#ffffff" fontSize="14" fontWeight="bold">Cloudflare / CloudFront</text>
                      <text x="20" y="68" fill="#71717a" fontSize="10">Anycast DNS · DDoS · WebP CDN</text>
                    </g>

                    {/* Connection Arrow */}
                    <path d="M 240 80 L 290 80" stroke="#FF385C" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Tier 2: Frontend & SSR Cluster */}
                    <g transform="translate(290, 40)">
                      <rect width="220" height="80" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                      <text x="20" y="32" fill="#a1a1aa" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 2: FRONTEND ENGINE</text>
                      <text x="20" y="52" fill="#ffffff" fontSize="14" fontWeight="bold">Next.js Edge + ISR</text>
                      <text x="20" y="68" fill="#71717a" fontSize="10">Server Components · Stale-While-Revalidate</text>
                    </g>

                    {/* Connection Arrow */}
                    <path d="M 510 80 L 560 80" stroke="#FF385C" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Tier 3: API Gateway & BFF */}
                    <g transform="translate(560, 40)">
                      <rect width="360" height="80" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                      <text x="20" y="32" fill="#a1a1aa" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 3: API GATEWAY & BFF</text>
                      <text x="20" y="52" fill="#ffffff" fontSize="14" fontWeight="bold">GraphQL & Envoy Gateway</text>
                      <text x="20" y="68" fill="#71717a" fontSize="10">Rate Limiter · JWT Authentication · Telemetry</text>
                    </g>

                    {/* Downward Arrows from Gateway to Microservices */}
                    <path d="M 740 120 L 740 170" stroke="#60a5fa" strokeWidth="2" />
                    <path d="M 400 120 L 400 170" stroke="#60a5fa" strokeWidth="2" />

                    {/* Tier 4: Core Microservices Cluster */}
                    <g transform="translate(40, 170)">
                      <rect width="880" height="130" rx="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                      <text x="24" y="28" fill="#a1a1aa" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 4: DISTRIBUTED MICROSERVICES (KUBERNETES EKS)</text>
                      
                      {/* Service Boxes */}
                      <g transform="translate(24, 42)">
                        <rect width="150" height="68" rx="8" fill="#27272a" stroke="#52525b" />
                        <text x="12" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold">Listing Service</text>
                        <text x="12" y="42" fill="#d4d4d8" fontSize="10">Property metadata</text>
                        <text x="12" y="56" fill="#71717a" fontSize="9">Amenities & Host Bio</text>
                      </g>

                      <g transform="translate(194, 42)">
                        <rect width="160" height="68" rx="8" fill="#27272a" stroke="#52525b" />
                        <text x="12" y="24" fill="#fb7185" fontSize="11" fontWeight="bold">Booking Engine</text>
                        <text x="12" y="42" fill="#d4d4d8" fontSize="10">Redis Distributed Locks</text>
                        <text x="12" y="56" fill="#71717a" fontSize="9">Zero Double-Booking</text>
                      </g>

                      <g transform="translate(374, 42)">
                        <rect width="150" height="68" rx="8" fill="#27272a" stroke="#52525b" />
                        <text x="12" y="24" fill="#34d399" fontSize="11" fontWeight="bold">Search & Geo Index</text>
                        <text x="12" y="42" fill="#d4d4d8" fontSize="10">OpenSearch Cluster</text>
                        <text x="12" y="56" fill="#71717a" fontSize="9">H3 Geo-indexing</text>
                      </g>

                      <g transform="translate(544, 42)">
                        <rect width="150" height="68" rx="8" fill="#27272a" stroke="#52525b" />
                        <text x="12" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold">Pricing & Dynamic Rates</text>
                        <text x="12" y="42" fill="#d4d4d8" fontSize="10">Seasonality rules</text>
                        <text x="12" y="56" fill="#71717a" fontSize="9">Taxes & Discounts</text>
                      </g>

                      <g transform="translate(714, 42)">
                        <rect width="142" height="68" rx="8" fill="#27272a" stroke="#52525b" />
                        <text x="12" y="24" fill="#c084fc" fontSize="11" fontWeight="bold">Payments & Escrow</text>
                        <text x="12" y="42" fill="#d4d4d8" fontSize="10">Stripe / Razorpay</text>
                        <text x="12" y="56" fill="#71717a" fontSize="9">Host payouts</text>
                      </g>
                    </g>

                    {/* Tier 5: Persistence, Cache & Event Bus */}
                    <g transform="translate(40, 330)">
                      <rect width="880" height="110" rx="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                      <text x="24" y="28" fill="#a1a1aa" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 5: STORAGE, CACHING & ASYNC EVENT STREAMING</text>
                      
                      {/* PostgreSQL */}
                      <g transform="translate(24, 40)">
                        <rect width="200" height="52" rx="8" fill="#27272a" stroke="#3b82f6" strokeWidth="1" />
                        <text x="14" y="22" fill="#93c5fd" fontSize="11" fontWeight="bold">PostgreSQL Cluster (Aurora)</text>
                        <text x="14" y="38" fill="#71717a" fontSize="10">Partitioned Tables · Read Replicas</text>
                      </g>

                      {/* Redis Cluster */}
                      <g transform="translate(244, 40)">
                        <rect width="190" height="52" rx="8" fill="#27272a" stroke="#ef4444" strokeWidth="1" />
                        <text x="14" y="22" fill="#fca5a5" fontSize="11" fontWeight="bold">Redis Enterprise Cluster</text>
                        <text x="14" y="38" fill="#71717a" fontSize="10">Availability Bitmaps · Sessions</text>
                      </g>

                      {/* OpenSearch */}
                      <g transform="translate(454, 40)">
                        <rect width="190" height="52" rx="8" fill="#27272a" stroke="#10b981" strokeWidth="1" />
                        <text x="14" y="22" fill="#6ee7b7" fontSize="11" fontWeight="bold">OpenSearch / Vector DB</text>
                        <text x="14" y="38" fill="#71717a" fontSize="10">Geo-spatial & Vector Embedding</text>
                      </g>

                      {/* Kafka Event Stream */}
                      <g transform="translate(664, 40)">
                        <rect width="192" height="52" rx="8" fill="#27272a" stroke="#a855f7" strokeWidth="1" />
                        <text x="14" y="22" fill="#d8b4fe" fontSize="11" fontWeight="bold">Apache Kafka Bus</text>
                        <text x="14" y="38" fill="#71717a" fontSize="10">Order Events · Push Notifications</text>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Core System Highlights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50">
                  <div className="flex items-center gap-2 mb-2 text-zinc-900 font-bold text-sm">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Availability & Concurrency</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Redis Redlock algorithm with 64-bit availability date bitmaps ensures sub-millisecond calendar lookups and guaranteed zero double-bookings under peak festival load.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50">
                  <div className="flex items-center gap-2 mb-2 text-zinc-900 font-bold text-sm">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span>Geo-Spatial Search</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    OpenSearch cluster with Uber H3 hexagonal spatial indexing and vector embeddings power instant proximity queries (&quot;stays with private jacuzzi in Candolim&quot;) in &lt;60ms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50">
                  <div className="flex items-center gap-2 mb-2 text-zinc-900 font-bold text-sm">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span>Edge Image Pipeline</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    AWS S3 bucket combined with Cloudflare Edge Workers converts high-res property assets to AVIF/WebP on the fly, reducing gallery payload by 78%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scaling' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend Scaling */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Server className="w-5 h-5 text-rose-500" />
                    <h4>1. Frontend Tier Scaling</h4>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 space-y-2 list-disc list-inside">
                    <li><strong>Incremental Static Regeneration (ISR):</strong> Listing pages are statically generated and cached at the edge with a 60-second revalidation TTL.</li>
                    <li><strong>Dynamic Component Streaming:</strong> React 19 Server Components stream the photo grid and details immediately while deferring personalized review recommendations.</li>
                    <li><strong>Edge Micro-frontends:</strong> Checkout flows, messaging, and search filters operate as decoupled edge-rendered applications.</li>
                  </ul>
                </div>

                {/* Backend & Microservices Scaling */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Cpu className="w-5 h-5 text-blue-500" />
                    <h4>2. Backend & Microservices Tier</h4>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 space-y-2 list-disc list-inside">
                    <li><strong>Kubernetes Horizontal Pod Autoscaling (HPA):</strong> Microservices auto-scale from 10 to 500+ pods based on CPU and request queues.</li>
                    <li><strong>gRPC Inter-Service Communication:</strong> High-throughput binary RPC between Gateway, Pricing, and Booking engines minimizing latency.</li>
                    <li><strong>Circuit Breaker & Rate Limiting:</strong> Envoy Token Bucket algorithm prevents cascading downstream failures during viral spikes.</li>
                  </ul>
                </div>

                {/* Storage & Database Scaling */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Database className="w-5 h-5 text-purple-500" />
                    <h4>3. Database & Caching Architecture</h4>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 space-y-2 list-disc list-inside">
                    <li><strong>PostgreSQL Table Partitioning:</strong> Bookings and reviews are range-partitioned by country code and reservation year.</li>
                    <li><strong>Multi-AZ Read Replicas:</strong> 90% of read traffic (property facts, amenities, host profiles) is offloaded to regional read replicas.</li>
                    <li><strong>Redis Memory Bitmaps:</strong> Property calendar availability is stored as 365-bit bitstrings for instant range intersection tests.</li>
                  </ul>
                </div>

                {/* Multi-Region & Disaster Recovery */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h4>4. Multi-Region Deployment & DR</h4>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 space-y-2 list-disc list-inside">
                    <li><strong>Active-Active Multi-Region:</strong> Primary regions in US-East, EU-Central, and AP-South with global DynamoDB / Aurora replication.</li>
                    <li><strong>Automated Failover:</strong> Route53 DNS health checks trigger regional traffic draining within 30 seconds of an outage.</li>
                    <li><strong>GitOps & IaC:</strong> Terraform + ArgoCD for declarative zero-downtime canary deployments.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-workflow' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800">
                <div className="flex items-center gap-2 text-[#FF385C] font-bold text-xs uppercase tracking-wider">
                  <Bot className="w-4 h-4" />
                  <span>Modern AI Engineering Workflow</span>
                </div>
                <h3 className="text-xl font-bold mt-1">
                  Subagent Configurations &amp; Automated Quality Assurance
                </h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-3xl">
                  This project utilizes autonomous AI subagents, specialized skills, and continuous validation pipelines to achieve pixel-perfect UI fidelity, WCAG 2.1 accessibility compliance, and robust production code structure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Parity Subagent */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-zinc-900 text-sm">
                      Visual Parity Subagent (.agents/skills/visual-parity-checker)
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Automated prompt and verification skill verifying Airbnb brand typography, padding grids, photo aspect ratios (4:3 / 16:9), and exact hex palette (<code className="bg-zinc-200 px-1 py-0.5 rounded">#FF385C</code>, <code className="bg-zinc-200 px-1 py-0.5 rounded">#222222</code>).
                  </p>
                </div>

                {/* Accessibility Auditor */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-zinc-900 text-sm">
                      Accessibility Auditor (.agents/skills/accessibility-auditor)
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Validates WCAG 2.1 AA criteria, full keyboard navigation for photo lightboxes (<code className="bg-zinc-200 px-1 py-0.5 rounded">ArrowLeft</code>, <code className="bg-zinc-200 px-1 py-0.5 rounded">ArrowRight</code>, <code className="bg-zinc-200 px-1 py-0.5 rounded">Escape</code>), screen reader ARIA labels, and focus rings.
                  </p>
                </div>

                {/* Code Quality Subagent */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-zinc-900 text-sm">
                      Code Quality Subagent (agent-configs/code-quality-subagent.json)
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Enforces strict TypeScript typing, modular component boundaries, Next.js 16 best practices, and zero console warnings during static build.
                  </p>
                </div>

                {/* State Machine Subagent */}
                <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-zinc-900 text-sm">
                      State &amp; Transition Subagent
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Ensures seamless transition synchronization between the Hero Photo Grid, Full Photo Tour, and Single Photo Lightbox viewers without UI flickering.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
