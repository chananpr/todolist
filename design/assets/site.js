// Shared chrome (top nav + footer) injected into every page.
// Edit here once → updates across all design pages.

(function () {
  const NAV = [
    { href: 'index.html',      label: 'Home' },
    { href: 'tokens.html',     label: 'Tokens' },
    { href: 'components.html', label: 'Components' },
    { href: 'pages.html',      label: 'Pages' },
    { href: 'sitemap.html',    label: 'Sitemap' },
    { href: 'graphs.html',     label: 'Graphs' },
    { href: 'icons.html',      label: 'Icons' }
  ];

  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function navHTML() {
    return `
    <header class="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-900 shadow-soft group-hover:scale-105 transition"></div>
          <div class="leading-tight">
            <div class="eyebrow">Design system</div>
            <div class="display font-semibold text-slate-900">Todolist</div>
          </div>
        </a>
        <nav class="hidden md:flex items-center gap-1 text-sm font-medium">
          ${NAV.map(item => {
            const active = item.href === here;
            return `<a href="${item.href}" class="px-3 h-9 inline-flex items-center rounded-md transition ${active ? 'bg-primary-600 text-white shadow-soft' : 'text-slate-600 hover:bg-primary-50 hover:text-primary-700'}">${item.label}</a>`;
          }).join('')}
        </nav>
        <div class="flex items-center gap-2">
          <span class="hidden sm:inline-flex h-8 px-2.5 items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            live
          </span>
          <button id="nav-mobile-toggle" class="md:hidden h-9 w-9 rounded-md border border-slate-200 inline-flex items-center justify-center" aria-label="menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div id="nav-mobile" class="md:hidden hidden border-t border-slate-200 bg-white">
        <div class="px-6 py-3 grid grid-cols-2 gap-2">
          ${NAV.map(item => {
            const active = item.href === here;
            return `<a href="${item.href}" class="px-3 h-10 inline-flex items-center rounded-md text-sm font-medium ${active ? 'bg-primary-600 text-white' : 'text-slate-700 hover:bg-primary-50'}">${item.label}</a>`;
          }).join('')}
        </div>
      </div>
    </header>`;
  }

  function footerHTML() {
    return `
    <footer class="mt-20 border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-slate-500">
        <div>
          Todolist Design System · keep tokens in sync with
          <code class="bg-slate-100 px-1 rounded">apps/web/tailwind.config.ts</code>
        </div>
        <div class="flex items-center gap-3">
          <a href="../docs/09-frontend-experience.md" class="hover:text-primary-700">Frontend doc</a>
          <span>·</span>
          <a href="../README.md" class="hover:text-primary-700">Project README</a>
        </div>
      </div>
    </footer>`;
  }

  function inject() {
    const navMount = document.getElementById('site-nav');
    const footMount = document.getElementById('site-footer');
    if (navMount) navMount.innerHTML = navHTML();
    if (footMount) footMount.innerHTML = footerHTML();

    const toggle = document.getElementById('nav-mobile-toggle');
    const panel = document.getElementById('nav-mobile');
    if (toggle && panel) {
      toggle.addEventListener('click', () => panel.classList.toggle('hidden'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
