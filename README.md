# OmniDash - Personalized Content Dashboard

A dynamic, interactive content dashboard developed using **React**, **Next.js 14 (App Router)**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.

- **Live Deployment:** [https://personalized-dashboard-kappa-vert.vercel.app/](https://personalized-dashboard-kappa-vert.vercel.app/)
- **Repository:** [https://github.com/SHAN-DE101/personalized-dashboard](https://github.com/SHAN-DE101/personalized-dashboard)

---

## Features

- **Personalized Unified Feed:** Aggregates News, Media Recommendations, and Social Media posts.
- **Debounced Search:** Reactive filtering across cards with a 350ms custom debounce hook.
- **Drag-and-Drop Reordering:** Smooth card reordering powered by Framer Motion.
- **Favorites & Bookmarking:** Save articles to Favorites with localStorage persistence.
- **Preferences Center:** Select favorite categories and active sources with immediate feed updates.
- **Dark Mode Support:** Fluid theme toggling via Tailwind CSS.
- **Automated Testing:** Unit and integration testing with Vitest, plus end-to-end testing with Playwright.

---

## Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit (preferencesSlice, favoritesSlice, contentSlice)
- **Styling & UI:** Tailwind CSS, Lucide Icons, Framer Motion
- **Testing:** Vitest, React Testing Library, Playwright E2E

---

## Local Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

---

## Running Tests

- **Unit & Integration Tests (Vitest):**
   ```bash
   npm run test -- --run
   ```
- **End-to-End Tests (Playwright):**
   ```bash
   npx playwright test
   ```
