import { type ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Search, Bell, ChevronDown, Command, Shield } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { primaryNavigation } from '../../../shared/config/navigation';
import { ROLE_LEVEL, type Role } from '../../../shared/config/sitemap';
import { useAuth } from '../../../app/AuthContext';

const ALL_ROLES: Role[] = ['public', 'member', 'manager', 'admin'];

function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-2xl border border-primary-100 bg-white/85 px-3 py-2 text-sm font-semibold text-slate-600 shadow-soft transition-colors hover:text-primary-700"
      >
        <Shield className="h-4 w-4 text-primary-500" />
        <span className="capitalize">{currentRole}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-primary-100 bg-white p-1 shadow-lg"
          >
            {ALL_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => {
                  setCurrentRole(role);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-100 ${
                  role === currentRole
                    ? 'bg-primary-50 font-semibold text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="capitalize">{role}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { currentRole } = useAuth();
  const filteredNavigation = primaryNavigation.filter(
    (item) => ROLE_LEVEL[currentRole] >= ROLE_LEVEL[item.minRole]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-mist text-slate-900 selection:bg-primary-100 selection:text-primary-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(191,219,254,0.45),transparent_25%)]" />
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-primary-100/80 bg-white/82 p-6 shadow-shell backdrop-blur-xl lg:flex"
      >
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-200/80">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-slate-900">TaskForge</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary-600">Enterprise Layer</p>
          </div>
        </div>

        <nav className="mt-10 space-y-1.5">
          {filteredNavigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                  isActive
                    ? 'border border-primary-100 bg-gradient-to-r from-primary-50 to-white text-primary-700 shadow-soft'
                    : 'border border-transparent text-slate-500 hover:border-primary-100/70 hover:bg-white/80 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-primary-600' : 'group-hover:text-primary-500'}`} />
                  <span className="text-sm">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <Link
            to="/theme-showcase"
            className="flex items-center justify-between rounded-[24px] border border-primary-100 bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-4 text-white shadow-lg shadow-primary-200/90 transition hover:translate-y-[-1px]"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-100">Theme Review</p>
              <p className="mt-1 text-sm font-bold">Open Component Catalog</p>
            </div>
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </Link>
          <div className="rounded-[24px] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-50/60 p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Usage</p>
              <p className="text-[10px] font-bold text-primary-600">80%</p>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-primary-100">
              <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-primary-500 to-primary-700" />
            </div>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full border border-primary-100 bg-gradient-to-br from-primary-50 to-white shadow-soft" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-slate-900">Alex Rivera</p>
              <p className="truncate text-xs text-slate-400">Admin Account</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="relative z-10 lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-primary-100/80 bg-white/72 px-8 backdrop-blur-xl">
          <div className="flex w-96 items-center gap-3 rounded-2xl border border-primary-100/80 bg-white/85 px-4 py-2 shadow-soft ring-1 ring-transparent transition-all focus-within:border-primary-200 focus-within:ring-primary-200/80">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, tasks, or insights..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <div className="flex items-center gap-1 rounded-md border border-primary-100 bg-primary-50/70 px-1.5 py-0.5 text-[10px] font-bold text-primary-600 shadow-sm">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <button className="relative rounded-2xl border border-primary-100 bg-white/85 p-2 text-slate-400 shadow-soft transition-colors hover:text-primary-700">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
            </button>
            <div className="mx-2 h-8 w-px bg-primary-100" />
            <button className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary-200/80 transition-all hover:translate-y-[-1px] hover:shadow-hover active:scale-95">
              New Project
            </button>
          </div>
        </header>

        <main className="p-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
