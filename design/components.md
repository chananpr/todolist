# Component Catalog

รายการ component ที่ต้อง reuse — เพิ่ม component ใหม่ต้องบันทึกที่นี่ก่อน

## Legend

- **Location** — path ใน `apps/web/src` ที่จริง/คาดว่าจะวาง
- **States** — states ที่ต้อง implement
- **Props contract** — prop หลัก (ไม่ใช่ทั้งหมด)

---

## 1. Layout

### AppShell
- **Location:** `widgets/layout/ui/AppShell.tsx` (มีแล้ว)
- **Purpose:** เปลือกหลักของ app — sidebar ซ้าย + top bar + main
- **Breakpoints:** sidebar collapse ที่ `lg:` (1024px)
- **Slots:** `sidebar`, `topbar`, `children`

### SidebarNav
- **Config:** `shared/config/navigation.ts`
- **States:** default, hover, active, collapsed
- **Active indicator:** gradient stripe ซ้าย 3px + fill `primary-600/10`

### Topbar
- **Slots:** breadcrumb, global search (⌘K), quick actions, user menu

---

## 2. Surface

### Card
- **Base:** `rounded-xl bg-white shadow-soft p-6 border border-slate-100`
- **Variants:**
  - `card-hero` — gradient `from-primary-700 to-primary-950`, text white
  - `card-metric` — white + colored accent ribbon บน
  - `card-ghost` — `border-dashed border-primary-200 bg-primary-50/40`

### Panel
- **Use:** section ใหญ่ เก็บ widget หลายอัน — `rounded-2xl bg-brand-mist shadow-panel`

### Drawer
- **Side:** right-side, width `max-w-xl`
- **Transition:** 250ms ease-out, overlay `bg-slate-900/40 backdrop-blur-sm`

### Modal
- **Sizes:** sm (420), md (560), lg (720)
- **Close:** ESC, click overlay, ปุ่ม X

---

## 3. Controls

### Button
| Variant | Class ตั้งต้น |
| --- | --- |
| `primary` | `bg-primary-600 text-white hover:bg-primary-700 shadow-soft` |
| `secondary` | `bg-white text-primary-700 border border-primary-200 hover:bg-primary-50` |
| `ghost` | `text-primary-600 hover:bg-primary-50` |
| `danger` | `bg-rose-600 text-white hover:bg-rose-700` |

- **Sizes:** `sm` (h-8 px-3), `md` (h-10 px-4), `lg` (h-12 px-6)
- **Icon button:** square aspect, icon size 18

### Input / Textarea / Select
- **Base:** `h-10 rounded-md border border-slate-200 bg-white px-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30`
- **Error:** border `rose-500`, help text `rose-600`
- **Disabled:** `bg-slate-50 text-slate-400`

### Toggle / Checkbox / Radio
- **Color active:** `primary-600`
- **Size:** 16px (default), 20px (large)

### Command palette (⌘K)
- **Trigger:** Topbar button + global shortcut
- **List:** fuzzy search across routes + actions

---

## 4. Data display

### Badge
- **Location:** `shared/ui/Badge.tsx` (มีแล้ว)
- **Variants:** neutral, info, success, warning, danger
- **Shape:** `rounded-full px-2.5 py-0.5 text-xs font-semibold`

### StatCard
- **Pattern:** eyebrow + large number + trend pill + sparkline
- **Use:** `MetricsGrid` (มีแล้ว)

### DataTable
- **Header:** uppercase 12px, tracking 0.08em
- **Row:** 56px default, hover `bg-primary-50/40`
- **Empty state:** center illustration + CTA

### Kanban Board
- **Lane:** `min-w-[300px] rounded-xl bg-slate-50`
- **Card:** shadow-soft, drag handle ด้านบน, avatars stack

### Timeline / Activity feed
- **Dot:** 8px colored circle; line `border-l border-slate-200` ซ้าย

### Avatar
- **Sizes:** xs(20) sm(28) md(36) lg(48)
- **Fallback:** initials with `bg-primary-100 text-primary-700`
- **Stack:** overlap -8px, ring-2 white

### Chart wrapper
- **Library:** Recharts (grid subtle `stroke-slate-100`, axis `text-slate-400`)

---

## 5. Feedback

### Toast
- **Position:** bottom-right
- **Variants:** info, success, warning, danger
- **Timeout:** 4s (success), 6s (warning/danger)

### EmptyState
- **Content:** icon 40px, title Display M, body, CTA

### Skeleton
- **Animate:** pulse 1.4s ease-in-out
- **Color:** `bg-slate-100`

### ErrorBoundary fallback
- **Surface:** panel สีขาว, icon `ShieldAlert`, copy + retry

---

## 6. Domain widgets (มีแล้ว)

| Widget | File | หน้าที่ |
| --- | --- | --- |
| HeroPanel | `widgets/dashboard-overview/ui/HeroPanel.tsx` | banner สรุปการทำงาน |
| MetricsGrid | `widgets/dashboard-overview/ui/MetricsGrid.tsx` | grid ของ StatCard |
| BoardPreview | `widgets/dashboard-overview/ui/BoardPreview.tsx` | thumbnail kanban |
| SignalsPanel | `widgets/dashboard-overview/ui/SignalsPanel.tsx` | สัญญาณ/ความเสี่ยง |

---

## Contribution checklist ก่อน merge component ใหม่

- [ ] ใช้ token จาก `tokens.md` เท่านั้น
- [ ] มีอย่างน้อย 3 states (default/hover/disabled หรือ loading/empty/error)
- [ ] Keyboard accessible (tab order + focus ring)
- [ ] ใช้ lucide-react icon เท่านั้น
- [ ] มี section ใน `components.md` นี้
