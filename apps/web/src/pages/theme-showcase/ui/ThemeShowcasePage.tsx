import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  LayoutDashboard,
  Layers,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Users
} from 'lucide-react';

const colorGroups = [
  {
    title: 'Primary Blues',
    items: [
      { name: 'Primary 50', hex: '#eff6ff', className: 'bg-primary-50' },
      { name: 'Primary 100', hex: '#dbeafe', className: 'bg-primary-100' },
      { name: 'Primary 500', hex: '#3b82f6', className: 'bg-primary-500' },
      { name: 'Primary 600', hex: '#2563eb', className: 'bg-primary-600' },
      { name: 'Primary 700', hex: '#1d4ed8', className: 'bg-primary-700' },
      { name: 'Primary 900', hex: '#1e3a8a', className: 'bg-primary-900' }
    ]
  },
  {
    title: 'Surface & Ink',
    items: [
      { name: 'Brand Mist', hex: '#f8fbff', className: 'bg-brand-mist' },
      { name: 'White', hex: '#ffffff', className: 'bg-white' },
      { name: 'Slate 100', hex: '#f1f5f9', className: 'bg-slate-100' },
      { name: 'Slate 300', hex: '#cbd5e1', className: 'bg-slate-300' },
      { name: 'Slate 700', hex: '#334155', className: 'bg-slate-700' },
      { name: 'Brand Ink', hex: '#0f172a', className: 'bg-slate-950' }
    ]
  }
];

const typographyScale = [
  { label: 'Display XL', className: 'font-display text-5xl font-bold tracking-tight text-slate-950', sample: 'TaskForge System Heading' },
  { label: 'Section Title', className: 'font-display text-3xl font-bold tracking-tight text-slate-900', sample: 'Delivery Board' },
  { label: 'Card Value', className: 'font-display text-4xl font-bold text-slate-900', sample: '91%' },
  { label: 'Body Large', className: 'text-lg leading-8 text-slate-700', sample: 'Operational clarity through a polished blue-and-white interface language.' },
  { label: 'Body Base', className: 'text-sm leading-7 text-slate-600', sample: 'Used for supporting descriptions, helper copy, and system notes.' },
  { label: 'Eyebrow', className: 'text-[10px] font-bold uppercase tracking-[0.24em] text-primary-600', sample: 'Operations Command Center' }
];

const sizeTokens = [
  { label: 'Sidebar Width', value: 'w-72', preview: '288px' },
  { label: 'Container Max', value: 'max-w-[1400px]', preview: '1400px' },
  { label: 'Card Radius', value: 'rounded-[28px]', preview: '28px' },
  { label: 'Panel Radius', value: 'rounded-[32px]', preview: '32px' },
  { label: 'Hero Radius', value: 'rounded-[36px]', preview: '36px' },
  { label: 'Button Height', value: 'py-2 / py-3 / py-4', preview: 'compact to hero CTA' }
];

const iconGroups = [
  {
    title: 'Navigation',
    icons: [
      { label: 'Overview', icon: LayoutDashboard },
      { label: 'Projects', icon: Briefcase },
      { label: 'AI Planner', icon: BrainCircuit },
      { label: 'Teams', icon: Users },
      { label: 'KPI', icon: BarChart3 },
      { label: 'Security', icon: ShieldCheck }
    ]
  },
  {
    title: 'System',
    icons: [
      { label: 'Search', icon: Search },
      { label: 'Notifications', icon: Bell },
      { label: 'Add', icon: Plus },
      { label: 'More', icon: MoreHorizontal },
      { label: 'Navigate', icon: ChevronRight },
      { label: 'Workspace', icon: Layers }
    ]
  },
  {
    title: 'Status',
    icons: [
      { label: 'Positive Trend', icon: ArrowUpRight },
      { label: 'Negative Trend', icon: ArrowDownRight },
      { label: 'Success', icon: CheckCircle2 },
      { label: 'Time', icon: Clock }
    ]
  }
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary-600">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export function ThemeShowcasePage() {
  return (
    <div className="space-y-8 pb-10">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[36px] border border-primary-100 bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_40%,#bfdbfe_100%)] p-8 shadow-panel lg:p-10"
      >
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/45 blur-3xl" />
        <div className="absolute bottom-0 right-12 h-40 w-40 rounded-full bg-primary-300/30 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary-700">Theme Showcase</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Blue-and-white component system preview for design and engineering review.
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-700">
              This route exposes the current visual language as a working catalog: colors, cards, buttons, typography, sizes, widths, and icon groups used by the application shell.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-xl lg:w-[340px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">Review Goals</p>
            <ul className="mt-4 space-y-3">
              {['Visual consistency', 'Implementation-ready tokens', 'Fast team alignment'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-8">
        <div className="rounded-[32px] border border-primary-100/80 bg-white/90 p-8 shadow-panel">
          <SectionTitle
            eyebrow="Color Tokens"
            title="Palette"
            description="Core surface and accent colors used across sidebar, header, cards, and CTA states."
          />
          <div className="grid gap-8 xl:grid-cols-2">
            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-bold text-slate-800">{group.title}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-[24px] border border-primary-100 bg-white shadow-soft">
                      <div className={`h-20 ${item.className}`} />
                      <div className="space-y-1 p-4">
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs font-medium text-slate-500">{item.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-primary-100/80 bg-white/90 p-8 shadow-panel">
            <SectionTitle
              eyebrow="Typography"
              title="Type Scale"
              description="Headline, value, body, and label styles used throughout the app."
            />
            <div className="space-y-6">
              {typographyScale.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-primary-100 bg-gradient-to-r from-primary-50/50 to-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                  <p className={`mt-3 ${item.className}`}>{item.sample}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-primary-100/80 bg-white/90 p-8 shadow-panel">
            <SectionTitle
              eyebrow="Sizing"
              title="Radius, Width, and Layout Tokens"
              description="Common dimensions to keep surfaces aligned across pages."
            />
            <div className="space-y-4">
              {sizeTokens.map((token) => (
                <div key={token.label} className="rounded-[24px] border border-primary-100 bg-white p-5 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{token.label}</p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">{token.value}</p>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">{token.preview}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-primary-100/80 bg-white/90 p-8 shadow-panel">
          <SectionTitle
            eyebrow="Buttons"
            title="Button Variants"
            description="Primary call-to-action, soft secondary, ghost controls, and compact icon buttons."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-primary-100 bg-gradient-to-br from-primary-50/60 to-white p-6">
              <p className="text-sm font-bold text-slate-800">Action Buttons</p>
              <div className="mt-5 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary-200/80">
                  Primary Action
                </button>
                <button className="rounded-2xl border border-primary-100 bg-white px-5 py-3 text-sm font-bold text-primary-700 shadow-soft">
                  Secondary Action
                </button>
                <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-soft">
                  Dark Emphasis
                </button>
              </div>
            </div>
            <div className="rounded-[28px] border border-primary-100 bg-gradient-to-br from-primary-50/40 to-white p-6">
              <p className="text-sm font-bold text-slate-800">Compact Controls</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button className="rounded-xl border border-primary-100 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-soft">Ghost Small</button>
                <button className="rounded-xl bg-primary-50 px-3 py-2 text-xs font-bold text-primary-700">Soft Small</button>
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-100 bg-white text-primary-700 shadow-soft">
                  <Plus className="h-5 w-5" />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-100 bg-slate-950 text-white shadow-soft">
                  <Bell className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-primary-100/80 bg-white/90 p-8 shadow-panel">
          <SectionTitle
            eyebrow="Cards"
            title="Surface Components"
            description="Representative card patterns used by the dashboard and route-level screens."
          />
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="group relative overflow-hidden rounded-[28px] border border-primary-100/80 bg-white p-6 shadow-soft">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary-200/50 via-primary-50 to-white" />
              <div className="relative z-10 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">Metric Card</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-700 shadow-soft">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="relative z-10 mt-8 font-display text-4xl font-bold text-slate-950">24</p>
              <p className="relative z-10 mt-2 text-xs font-bold text-primary-700">+6% vs last week</p>
            </div>

            <div className="rounded-[28px] border border-primary-100/80 bg-gradient-to-br from-primary-50/70 to-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-700 shadow-soft">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600">AI Draft</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-950">Execution Draft</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Used for recommendation review, planning summaries, and approval surfaces.</p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-primary-700 shadow-soft">
                Open Draft
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[28px] border border-primary-100/80 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kanban Task</span>
                <MoreHorizontal className="h-4 w-4 text-slate-300" />
              </div>
              <div className="mt-4 inline-flex rounded-md border border-primary-100 bg-primary-50 px-2 py-1 text-[10px] font-bold text-primary-700">
                Product
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">User onboarding redesign</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-[9px] font-bold text-blue-700">
                      U{i}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  2d
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-primary-100/80 bg-white/90 p-8 shadow-panel">
          <SectionTitle
            eyebrow="Icons"
            title="Icon Catalog"
            description="Grouped by usage so design and engineering can align on semantic icon selection."
          />
          <div className="grid gap-6 xl:grid-cols-3">
            {iconGroups.map((group) => (
              <div key={group.title} className="rounded-[28px] border border-primary-100 bg-gradient-to-br from-primary-50/45 to-white p-6">
                <p className="text-sm font-bold text-slate-900">{group.title}</p>
                <div className="mt-5 grid gap-3">
                  {group.icons.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-soft">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
