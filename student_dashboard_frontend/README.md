# Student Academic Dashboard - Frontend

A React frontend for students to view their dashboard, schedules, grades, announcements, and profile. Implements the "Ocean Professional" theme with a modern, accessible UI.

## Quick Start

- Node 18+ recommended
- Install dependencies:

```bash
npm install
```

- Run development server (port 3000):

```bash
npm start
```

- Run tests:

```bash
npm test
```

- Build:

```bash
npm run build
```

## Environment Variables

Populate a `.env` based on `.env.example`.

Available variables:
- REACT_APP_API_BASE: Optional. If provided, the app will fetch data from this API; otherwise it uses local mock JSON to render UI.
- REACT_APP_BACKEND_URL: Optional informational link in topbar.
- REACT_APP_FRONTEND_URL: Public URL for the frontend (defaults to current origin).
- REACT_APP_WS_URL: Optional WebSocket URL for future real-time features.
- REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED: Optional flags/config.

See src/config/config.js for how values are read with safe fallbacks.

## Theme

The Ocean Professional theme and utilities are in `src/theme.css`.

Key palette:
- Primary: #2563EB
- Secondary/Success accent: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
- Subtle gradient: blue-500/10 to gray-50

Design elements:
- Rounded corners, subtle shadows, smooth transitions
- Accessible focus outlines using a soft blue ring
- Semantic markup and ARIA labels

## Architecture

- Routing: `react-router-dom` with routes for Dashboard, Schedule, Grades, Announcements, Profile.
- Data: `src/services/api.js` fetches from `REACT_APP_API_BASE` or provides mock data from `src/mock/*`.
- Config: `src/config/config.js` centralizes environment configuration.
- Error handling: `src/components/ErrorBoundary.js`
- Toasts: `src/components/Toast.js`
- Widgets: Profile, Schedule, Grades, Announcements under `src/components/widgets`.

## Accessibility

- Semantic HTML for nav, main, sections
- ARIA labels and skip-link for keyboard users
- Focus styles via `:focus-visible` and theme focus ring
- High-contrast text and buttons

## Testing

- Minimal examples using React Testing Library:
  - `src/components/widgets/ProfileCard.test.js`
  - `src/App.test.js`

## Mock Data

The app renders with mock data by default when `REACT_APP_API_BASE` is not set. Mock files are in `src/mock/`.

## Project Scripts

- `npm start` - start dev server
- `npm test` - run tests
- `npm run build` - production build

