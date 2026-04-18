# Design Tokens

ค่าทั้งหมดต้องตรงกับ `apps/web/tailwind.config.ts` — ถ้าจะเปลี่ยนต้องแก้ทั้งสองที่

## Color palette

### Primary (cobalt scale)

| Token | Hex | Tailwind | ใช้เมื่อไหร่ |
| --- | --- | --- | --- |
| `primary-50` | `#eff6ff` | `bg-primary-50` | พื้นหลัง section อ่อน |
| `primary-100` | `#dbeafe` | `bg-primary-100` | chip, subtle fill |
| `primary-200` | `#bfdbfe` | `border-primary-200` | เส้นขอบ soft |
| `primary-300` | `#93c5fd` | `text-primary-300` | hint, ghost |
| `primary-400` | `#60a5fa` | `bg-primary-400` | interactive hover |
| `primary-500` | `#3b82f6` | `bg-primary-500` | **primary action** |
| `primary-600` | `#2563eb` | `bg-primary-600` | button pressed |
| `primary-700` | `#1d4ed8` | `text-primary-700` | emphasis text |
| `primary-800` | `#1e40af` | `bg-primary-800` | dark fill |
| `primary-900` | `#1e3a8a` | `text-primary-900` | headline on light |
| `primary-950` | `#172554` | `bg-primary-950` | deepest shell |

### Brand

| Token | Hex | ใช้เมื่อไหร่ |
| --- | --- | --- |
| `brand-blue` | `#2563eb` | โลโก้, primary CTA |
| `brand-navy` | `#1e3a8a` | app shell header |
| `brand-sky` | `#eff6ff` | page background |
| `brand-mist` | `#f8fbff` | card surface |
| `brand-ink` | `#0f172a` | body text |

### Semantic (สำหรับสถานะ)

| Purpose | Token | Hex |
| --- | --- | --- |
| Success | `emerald-500` | `#10b981` |
| Warning | `amber-500` | `#f59e0b` |
| Danger | `rose-500` | `#f43f5e` |
| Info | `sky-500` | `#0ea5e9` |
| Neutral | `slate-500` | `#64748b` |

## Typography

| Role | Family | Size/Leading | Weight | ใช้กับ |
| --- | --- | --- | --- | --- |
| Display XL | Space Grotesk | 48 / 56 | 600 | Hero headlines |
| Display L | Space Grotesk | 32 / 40 | 600 | Page titles |
| Display M | Space Grotesk | 24 / 32 | 600 | Section titles |
| Body L | Manrope | 18 / 28 | 500 | Lead paragraphs |
| Body | Manrope | 15 / 24 | 400 | Default text |
| Body S | Manrope | 13 / 20 | 500 | Meta, captions |
| Eyebrow | Manrope | 12 / 16 | 700, tracking 0.12em, uppercase | Section kicker |
| Mono | ui-monospace | 13 / 20 | 500 | IDs, code, numeric |

## Shadow tokens

| Token | Value | ใช้กับ |
| --- | --- | --- |
| `shadow-soft` | `0 12px 30px -18px rgba(37,99,235,.28), 0 8px 18px -16px rgba(148,163,184,.35)` | card default |
| `shadow-panel` | `0 32px 80px -38px rgba(30,64,175,.28)` | modal, drawer, hero |
| `shadow-hover` | `0 26px 60px -26px rgba(37,99,235,.32)` | interactive hover |
| `shadow-shell` | `0 18px 50px -30px rgba(15,23,42,.22)` | app shell |

## Spacing scale

ใช้ Tailwind scale (`0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24`)
- **Card padding:** `p-6` (desktop), `p-4` (mobile)
- **Section gap:** `gap-8` (desktop), `gap-6` (mobile)
- **Grid gutter:** `gap-6`
- **Inline icon gap:** `gap-2`

## Radius

| Token | Value | ใช้กับ |
| --- | --- | --- |
| `rounded-sm` | 4px | badge, chip |
| `rounded-md` | 8px | button, input |
| `rounded-lg` | 12px | small card |
| `rounded-xl` | 16px | card, panel |
| `rounded-2xl` | 20px | hero, drawer |
| `rounded-3xl` | 28px | page shell |

## Motion

| Intent | Duration | Easing |
| --- | --- | --- |
| Hover, tap feedback | 150ms | `ease-out` |
| Card reveal, stagger | 220ms | `cubic-bezier(.2,.8,.2,1)` |
| Drawer, modal | 250ms | `cubic-bezier(.2,.8,.2,1)` |
| Page transition | 220ms | `ease-in-out` |

ห้ามเกิน **250ms** สำหรับ interaction ปกติ
