#  Pooja Kale — Portfolio Website
> **Modern, Apple-Inspired Portfolio for Data & Business Analyst | Applied AI & Operations Intelligence**

A high-performance, responsive portfolio web application crafted with **React, Vite, Tailwind CSS, Framer Motion, and Recharts**. Designed with Apple-level minimalist aesthetics: deep obsidian dark theme, frosted glassmorphism, glowing micro-interactions, responsive bento grids, and interactive data visualizations.

---

## ✨ Key Features

1. **Floating Apple-Style Dock (Navbar):**
   * Frosted glass navigation with smooth scrolling to sections.
   * "Available on 1 Month Notice" status beacon.
   * Direct "Download Resume" CTA button pointing to `resume.pdf`.

2. **Impact-Driven Hero Section:**
   * Dynamic cursor-following radial ambient glow.
   * Clean typography and role badges (*Data & Business Analyst • Pune, India*).
   * **Bento Grid Metrics:** 60% Discrepancy Reduction, 30% Backlog Elimination, 25% Turnaround Time Improvement, 100% Financial Data Integrity.

3. **Live Interactive KPI & BI Simulator (The "Recruiter Hook"):**
   * Built-in interactive Recharts dashboard running client-side with zero external licenses required.
   * **Tab 1:** *Collections & DPD Delinquency* (Area chart tracking targets vs. achieved rates).
   * **Tab 2:** *Reconciliation Efficiency* (Bar chart comparing legacy manual hours vs. automated Python/SQL pipelines).
   * **Tab 3:** *Settlement SLA Breakdown* (Donut chart showing same-day vs. 24-48h clearance).

4. **Featured Projects (Bento Grid Layout):**
   * **FinTech Lending & Collections Delinquency Platform:** MSME credit risk scoring, DPD migration tracking (0-30, 31-60, 60+).
   * **Automated Financial Reconciliation & Anomaly Engine:** Fuzzy matching for mismatched ERP/bank records.
   * **Enterprise Conversational AI & Workflow Optimization:** Moveworks analytics, A/B test evaluation, CSAT tracking.
   * **Operational Performance & Executive KPI Dashboard:** Star Schema modeling, 15+ complex DAX measures.

5. **Interactive Skills Matrix:**
   * Filterable categories: *BI & Visualization*, *SQL & Databases*, *Python & Data Science*, *Enterprise ERP & Finance*, *AI & Low-Code Tools*.
   * Proficiency chips with clean status indicators.

6. **Experience & Education Timeline:**
   * Detailed breakdown of OIA Global role with quantifiable achievements.
   * Academic credentials: B.E. in Information Technology (Matoshri College of Engineering, CGPA: 7.74).

7. **Direct Contact Hub:**
   * Interactive direct message form.
   * 1-click clipboard copy for Email (`poojakale.in@gmail.com`) and Phone (`+91 76207 40833`).
   * Direct LinkedIn profile link.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18 + Vite 6
* **Styling:** Tailwind CSS (Custom dark theme `#09090b`, glassmorphism `backdrop-blur-xl`, fine `border-white/10`)
* **Icons:** Lucide React
* **Data Visualization:** Recharts
* **Package Manager:** Bun / npm

### Why No Backend Server is Needed:
* **100% Free Hosting:** Static Jamstack sites can be deployed on Vercel, Netlify, or GitHub Pages with global CDN distribution.
* **Instant Speed:** Loads in `< 0.5s` anywhere in the world with perfect 100/100 Lighthouse performance.
* **Zero Maintenance:** No server crashes, no database bills, no security patches.
* **Client-Side Visualizations:** Interactive charts render natively in the browser.

---

## 🚀 How to Run Locally

### 1. Install dependencies:
```bash
bun install
# or
npm install
```

### 2. Start development server:
```bash
bun run dev
# or
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production:
```bash
bun run build
# or
npm run build
```
Generates a static, deployment-ready bundle in the `dist/` directory.

---

## 🌐 Hosting & CI/CD Setup

This repository is pre-configured with automated CI/CD and production hosting configurations for **Vercel** and **GitHub Pages**.

### Step 1: Initialize Git and Push to GitHub
From the `portfolio/` directory:
```bash
git init
git add .
git commit -m "feat: initial commit with Apple-inspired portfolio and CI/CD pipelines"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

### Option A: Deploy to Vercel (Recommended — Gold Standard)
1. Sign in to [Vercel](https://vercel.com/) (using your GitHub account).
2. Click **"Add New Project"** and select your repository.
3. Framework preset is automatically detected as **Vite**.
4. Click **Deploy**.
5. **Instant Benefits**:
   - Live URL: `https://pooja-kale.vercel.app` (or custom name).
   - Instant edge CDN with sub-300ms latency worldwide.
   - Automated preview deployments for every Pull Request.
   - Clean SPA routing & HTTP security headers via [vercel.json](file:///home/akshay/Documents/Pooja_Kale/portfolio/vercel.json).
   - Easy 1-click custom domain setup (e.g. `poojakale.in`).

---

### Option B: Deploy to GitHub Pages (100% Free with GitHub Actions)
1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically trigger `.github/workflows/deploy-gh-pages.yml` and publish the site to `https://<your-username>.github.io/<your-repo-name>/`.

---

### 🛡️ Automated CI/CD Workflows Included

* **`ci.yml` (Quality Gate)**:
  Runs on every Push and Pull Request. Installs dependencies with `npm ci`, runs `npm run build`, and verifies that critical artifacts (`dist/index.html` and `public/resume.pdf`) are intact.
* **`deploy-gh-pages.yml` (Automated Deployment)**:
  Builds and deploys the production bundle to GitHub Pages whenever code is pushed to `main`.

