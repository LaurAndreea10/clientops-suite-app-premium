# ClientOps Suite Premium

> A zero-cost SaaS command center for client operations: CRM pipeline, bookings, delivery projects, quote builder, automations, analytics and audit trail.

[![Built with React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square)](#tech-stack)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square)](#tech-stack)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-4ade80?style=flat-square)](#deploy)

## Live Demo

```txt
https://laurandreea10.github.io/clientops-suite-app-premium/
```

## Project Origin

ClientOps Suite Premium is a portfolio-grade SaaS prototype for service teams, freelancers and small agencies that need one place to manage client work.

The product combines the operational flow of a CRM with delivery tracking and commercial tools. Instead of presenting separate demos for leads, tasks and quotes, this app shows how the pieces work together in a single command center.

## What is included

### Command Center

A premium landing/dashboard entry point with headline metrics, live GitHub link, command palette and resettable demo state.

### CRM Pipeline

Lead cards move through stages from `New` to `Won`, with value, owner, source, probability, priority and next-step context visible on each card.

### Booking Flow

Scheduling view with confirmed, pending and conflict states. The interface makes booking risk visible instead of hiding it in a calendar list.

### Project Delivery

Project health cards plus task board. Health, budget, progress, owner and due date are visible together.

### Quote Builder

Client-ready quote summary with line items, discount toggle and copy-to-clipboard flow.

### Automation Hub

Business rules shown as readable operational cards: trigger, validation, action and impact.

### Analytics

Recharts-powered revenue, pipeline and stage distribution views.

### Activity Feed

Audit trail for lead movement, quote creation, booking confirmation and project health changes.

## Premium UX details

- `⌘K / Ctrl+K` command palette
- Zustand-powered interactive demo state
- HashRouter + `base: './'` for GitHub Pages safety
- Responsive layout: sidebar desktop, compact top command on mobile
- Accessible focus states and reduced-motion support
- Copy-ready quote report
- Reset demo state action
- No backend required

## Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Zustand** for interactive state
- **Recharts** for analytics
- **Tailwind CSS** for styling
- **GitHub Actions + GitHub Pages** for deploy

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The repo is configured for GitHub Pages with:

- `HashRouter`
- `vite.config.ts` using `base: './'`
- `.github/workflows/deploy.yml`

Push to `main` and GitHub Actions will build and publish the `dist` folder.

## Roadmap

- [x] Premium dashboard shell
- [x] Command palette
- [x] CRM pipeline
- [x] Booking conflict states
- [x] Project delivery board
- [x] Quote builder with discount + copy
- [x] Automation hub
- [x] Analytics charts
- [x] Activity feed
- [ ] Role-based views: Owner / Sales / Delivery
- [ ] JSON export for quotes and activity
- [ ] Printable quote PDF flow
- [ ] Theme toggle

## Portfolio positioning

This project demonstrates front-end product thinking, not just UI styling:

- data structure → user workflow
- pipeline → quote → delivery continuity
- status → risk → action visibility
- zero-cost deployment constraints
- recruiter-friendly proof of work

## Author

**Laura Andreea**  
Front-end CRM & Dashboard Developer · CRM + Marketing background

- Portfolio: https://laurandreea10.github.io/codepen-portfolio/
- GitHub: https://github.com/LaurAndreea10
- LinkedIn: https://www.linkedin.com/in/laura-andreea-p-8b230014b/

## License

MIT — use it, fork it, adapt it.
