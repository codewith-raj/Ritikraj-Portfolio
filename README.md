```
    ██████╗ ██╗████████╗██╗██╗  ██╗    ██████╗  █████╗      ██╗
    ██╔══██╗██║╚══██╔══╝██║██║ ██╔╝    ██╔══██╗██╔══██╗     ██║
    ██████╔╝██║   ██║   ██║█████╔╝     ██████╔╝███████║     ██║
    ██╔══██╗██║   ██║   ██║██╔═██╗     ██╔══██╗██╔══██║██   ██║
    ██║  ██║██║   ██║   ██║██║  ██╗    ██║  ██║██║  ██║╚█████╔╝
    ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ 
```

> **STATUS:** ONLINE // **BUILD:** VISION-LOCKED // **DEPLOY:** ORBIT STABLE

This is not a “portfolio.” It is a **single-page propaganda machine** for one human who decided pixels should feel like a mission briefing. If you expected beige and bullet points, you took a wrong turn at the asteroid belt.

---

## 🛰️ LIVE TRANSMISSION (PRODUCTION)

**[ENTER THE VOID → ritikraj-portfolio-tawny.vercel.app](https://ritikraj-portfolio-tawny.vercel.app/)**

Bookmark it. Send it to recruiters. Send it to aliens. Results may vary; awe is statistically likely.

---

## ⚡ WHAT POWERS THIS THING

| Subsystem        | Weapon of choice |
| ---------------- | ---------------- |
| Core engine      | [Next.js](https://nextjs.org/) 16 · App Router |
| Reality renderer | [React](https://react.dev/) 19 |
| Paint & spacing  | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Motion sickness… | …jk — [Framer Motion](https://www.framer.com/motion/) |
| Tiny pictograms  | [Lucide](https://lucide.dev/) |
| “Hailing frequencies” | [Nodemailer](https://nodemailer.com/) + OTP sorcery |

---

## 🧪 CLONE & BOOT (LOCAL DIMENSION)

You need **[Node.js](https://nodejs.org/)** (LTS). Then:

```bash
npm install
npm run dev
```

Warp to **[http://localhost:3000](http://localhost:3000)**. If the universe loads, you did it right.

### Command palette (for mortals)

| Spell            | Effect                    |
| ---------------- | ------------------------- |
| `npm run dev`    | Dev server — hot, chaotic |
| `npm run build`  | Forges production bundle  |
| `npm run start`  | Serves the forged bundle  |
| `npm run lint`   | ESLint judges your soul   |

---

## 🔐 ENVIRONMENT — A.K.A. “CLEARANCE CODES”

Contact uses OTP email. Without these, the mail subsystem **will stare at you silently** (or error — equally dramatic).

| Key            | What it actually is |
| -------------- | ------------------- |
| `EMAIL_USER`   | SMTP identity / sender |
| `EMAIL_PASS`   | Password or app password |
| `OTP_SECRET`   | Long random string to sign OTPs — **use a real one in prod** |

No `OTP_SECRET`? A dev fallback kicks in. Fine for localhost experiments; **do not** ship that to space.

**Vercel:** Project → Settings → Environment Variables → paste → redeploy → profit.

---

## 🚀 DEPLOYMENT

Hosted on **Vercel** because Earth’s gravity is enough; we don’t need slow hosting too. Wire the repo, set clearance codes if you want working comms, use default Next.js settings, done.

---

```
END OF TRANSMISSION // © RITIK RAJ // BEYOND VISUALS. BUILT WITH VISION.
```
