# Todolist — Design System Site

> **Live design site** สำหรับทีม ดูใน browser ได้ทันที เพื่อสื่อสารเรื่อง component, layout, สี, flow ของระบบ Todolist

## เปิด site นี้

```bash
# จาก root project
npm run design
# → http://localhost:8080

# หรือ manual
cd design && python3 -m http.server 8080
```

แชร์ให้ทีมดูแบบ real-time:

```bash
# ใช้ cloudflared (แนะนำ — ไม่ต้องล็อกอิน)
cloudflared tunnel --url http://localhost:8080

# หรือ ngrok
ngrok http 8080

# หรือ tailscale (ภายใน team)
tailscale serve 8080
```

## โครงสร้างไฟล์

```
design/
├── index.html        ← Landing / hub
├── tokens.html       ← สี · typography · shadow · radius · motion
├── components.html   ← Live demo ของ 11 หมวด component
├── pages.html        ← Mockup ทุก route ใน desktop + mobile frame
├── sitemap.html      ← Route tree · IA · role matrix (Mermaid)
├── graphs.html       ← Architecture · sequence · journey · deploy (Mermaid)
├── icons.html        ← Lucide gallery พร้อม search
├── assets/
│   ├── site.js              ← shared top nav + footer (inject ทุกหน้า)
│   ├── site.css             ← shared styles
│   └── tailwind-config.js   ← mirror ของ apps/web/tailwind.config.ts
└── *.md              ← reference doc (สำหรับอ่านบน GitHub)
```

## แต่ละหน้าใช้ตอนไหน

| หน้า | ใช้ตอน |
| --- | --- |
| `index.html` | เปิดส่งให้ทีมดูภาพรวม |
| `tokens.html` | เวลาเลือกสี/font — คลิก swatch เพื่อ copy hex |
| `components.html` | เวลา pair กับ dev — copy class ของ Tailwind ได้จาก code block |
| `pages.html` | Design review — ดู layout ของทุกหน้าในกรอบ desktop/mobile |
| `sitemap.html` | Onboard คนใหม่ / วางแผนเพิ่ม route |
| `graphs.html` | Architecture discussion, AI flow, permission review |
| `icons.html` | ค้นหาไอคอนก่อนใส่ใน component |

## หลักการสำคัญ

1. **ไม่มี build step** — ทุกไฟล์เป็น static HTML ใช้ Tailwind + Lucide + Mermaid ผ่าน CDN
2. **Tokens sync กับ app จริง** — `assets/tailwind-config.js` ต้องตรงกับ `apps/web/tailwind.config.ts`
3. **Shared nav ใน site.js** — แก้ที่เดียว ทุกหน้าอัปเดตพร้อมกัน
4. **Visual principles:**
   - Deep navy + cobalt blue (command-center feel)
   - Space Grotesk (display) + Manrope (body)
   - shadow-soft/panel/hover/shell สื่อลำดับชั้น
   - Motion ไม่เกิน 250ms

## การเพิ่ม/แก้

| ต้องการ | แก้ที่ |
| --- | --- |
| เพิ่ม component ใหม่ | `components.html` (+ section ใน `components.md` ถ้าต้องการ spec) |
| เพิ่ม route | `sitemap.html` (array `ROUTES`) + mockup ใน `pages.html` |
| เปลี่ยนสี/shadow | `assets/tailwind-config.js` **และ** `apps/web/tailwind.config.ts` |
| เพิ่มเมนูบน top nav | `assets/site.js` (array `NAV`) |
| เพิ่ม icon ที่อนุญาตใช้ | `icons.html` (object `groups`) |

## Contribution rules

- ห้ามใช้สีนอก palette ใน `tokens.html` — ถ้าจำเป็นต้องเพิ่ม token ก่อน
- ห้ามใช้ไอคอนชุดอื่นนอก lucide-react
- ทุก page ใหม่ต้องมี entry ใน `sitemap.html` + mockup ใน `pages.html`
- Component ใหม่ต้องมีอย่างน้อย 3 states (default / hover / disabled หรือ loading / empty / error)
