# Coastline Apparel

> Premium coastal wear — a production-ready, fully-typed e-commerce storefront built with React 19, TypeScript, Tailwind CSS v3, and React Router v7.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

---

## 🖼️ Screenshots

| Home | Shop | Product Detail |
|------|------|----------------|
| ![Home](docs/screenshots/home.png) | ![Shop](docs/screenshots/shop.png) | ![Detail](docs/screenshots/detail.png) |

| Cart | Checkout | Orders |
|------|----------|--------|
| ![Cart](docs/screenshots/cart.png) | ![Checkout](docs/screenshots/checkout.png) | ![Orders](docs/screenshots/orders.png) |

> Screenshots are located in `/docs/screenshots/`. Replace placeholders with actual exports after `npm run dev`.

---

## ✨ Features

- **Product Grid** — responsive 4-column layout with hover image-swap transitions
- **Advanced Filtering** — filter by category, size, and price range simultaneously with URL-synced state
- **Global Search** — query products from the navbar; results update the shop page in real time
- **Product Detail** — full image gallery, size selector with inline validation, add-to-cart feedback
- **Persistent Cart** — LocalStorage-backed cart survives page refreshes; live item count badge in navbar
- **Checkout Flow** — complete form with contact, shipping, and payment sections; simulated async order placement
- **Order History** — all orders persist in LocalStorage; visible in `/orders` and `/account`
- **Auth Simulation** — email-based sign-in; session stored in LocalStorage; auto-login on checkout
- **Accessibility** — semantic HTML, ARIA labels, focus rings, `aria-pressed` toggles, `role="dialog"` modal
- **Responsive** — fully tested breakpoints: mobile → tablet → desktop

---

## 🛠️ Tech Stack

| Concern        | Technology                     |
|----------------|--------------------------------|
| UI Framework   | React 19 + TypeScript (strict) |
| Routing        | React Router v7                |
| Styling        | Tailwind CSS v3                |
| Icons          | Lucide React                   |
| Build Tool     | Vite 7                         |
| Package Manager| npm                            |
| State / Storage| React Context + LocalStorage   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/coastline-apparel.git

# 2. Navigate into the project
cd coastline-apparel

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📦 Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the Vite dev server (HMR enabled)  |
| `npm run build` | Type-check + build for production        |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`  | Run ESLint across the source tree        |

---

## 📁 Folder Structure

```
coastline-apparel/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── CartItem.tsx      # Cart line-item row component
│   │   ├── FilterBar.tsx     # Shop filter bar (category / size / price)
│   │   ├── Footer.tsx        # Site-wide footer
│   │   ├── Modal.tsx         # Accessible dialog overlay
│   │   ├── Navbar.tsx        # Fixed navigation with search + cart badge
│   │   ├── ProductCard.tsx   # Product card with CSS opacity image swap
│   │   └── ScrollToTop.tsx   # Route-change scroll reset
│   ├── data/
│   │   └── products.ts       # Product catalogue (typed, Unsplash images)
│   ├── hooks/
│   │   ├── useAuth.tsx       # Auth context + provider (LocalStorage)
│   │   └── useCart.tsx       # Cart context + provider (LocalStorage)
│   ├── routes/
│   │   ├── Account.tsx       # My Account / Sign In
│   │   ├── Cart.tsx          # Shopping cart page
│   │   ├── Checkout.tsx      # Checkout form + order confirmation
│   │   ├── Home.tsx          # Landing page — hero + categories
│   │   ├── NotFound.tsx      # 404 page
│   │   ├── Orders.tsx        # Order history
│   │   ├── ProductDetails.tsx# Product detail + gallery
│   │   └── Shop.tsx          # Product grid + filters
│   ├── App.tsx               # Router setup + layout
│   ├── index.css             # Tailwind directives + global styles
│   └── main.tsx              # React root + context providers
├── index.html
├── tailwind.config.js
├── tsconfig.app.json
├── vite.config.ts
└── package.json
```

---

## 🌍 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For subsequent deploys
vercel --prod
```

> Vercel auto-detects Vite. No extra configuration needed.

### Netlify

```bash
# Build the project
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or connect your GitHub repository in the Netlify dashboard:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json "scripts":
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build && npm run deploy
```

> For React Router to work on GitHub Pages, ensure your Vite config sets `base` to your repo name, and your 404 fallback is configured.

---

## 🔧 Git Initialisation

```bash
# 1. Initialise the repository
git init

# 2. Add all files
git add .

# 3. Initial commit
git commit -m "feat: initial production build — Coastline Apparel"

# 4. Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/coastline-apparel.git

# 5. Push
git branch -M main
git push -u origin main
```

---

## 📋 Environment Variables

This project has **no required environment variables** — all state is managed client-side via LocalStorage.

If you integrate a real payment processor (e.g. Stripe), you would add:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

Vite exposes variables prefixed with `VITE_` to the client via `import.meta.env`.

---

## 🤝 Contact

| Channel    | Detail                                   |
|------------|------------------------------------------|
| Email      | support@coastlineapparel.com.au          |
| Phone      | +61 3 5550 0182                          |
| Instagram  | [@coastlineapparel](https://instagram.com/coastlineapparel) |

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

*Built with ☀️ by Coastline Apparel*
