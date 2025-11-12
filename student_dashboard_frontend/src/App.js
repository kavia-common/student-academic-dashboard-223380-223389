import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './index.css';
import './theme.css';
import DashboardPage from './pages/Dashboard';
import SchedulePage from './pages/Schedule';
import GradesPage from './pages/Grades';
import AnnouncementsPage from './pages/Announcements';
import ProfilePage from './pages/Profile';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import { AppConfig } from './config/config';

/**
 * Application Shell with top navigation, sidebar, and main content routing.
 * Applies Ocean Professional theme and sets up accessible navigation.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <a href="#main" className="skip-link">Skip to content</a>
      <ToastProvider>
        <ErrorBoundary>
          <div className="layout app-gradient">
            <TopNav />
            <SideBar />
            <main id="main" className="main" role="main" aria-label="Main content area">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/grades" element={<GradesPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </Router>
  );
}

function TopNav() {
  const config = AppConfig.get();
  return (
    <header className="topnav" role="navigation" aria-label="Top navigation">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div aria-hidden="true" style={{
          width:36,height:36,borderRadius:10,
          background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
          boxShadow: '0 6px 18px rgba(37, 99, 235, 0.35)'
        }} />
        <strong aria-label="Student Academic Dashboard">Student Dashboard</strong>
        <span className="badge" title="Environment">{config.nodeEnv}</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <a className="btn icon-btn" href={config.frontendUrl} aria-label="Home">
          🏠
        </a>
        <a className="btn icon-btn" href={config.backendUrl || '#'} aria-label="Backend API (if configured)" rel="noopener noreferrer">
          🌐
        </a>
        <NavLink to="/profile" className="btn" aria-label="Open profile page">
          <span role="img" aria-label="avatar">👩‍🎓</span>
          <span className="label">My Profile</span>
        </NavLink>
      </div>
    </header>
  );
}

function SideBar() {
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <nav className="side-nav" role="navigation" aria-label="Quick links">
        <NavLink to="/dashboard" className={({isActive})=> `side-link ${isActive?'active':''}`} aria-current={({isActive})=> isActive ? 'page' : undefined}>
          <span aria-hidden="true">📊</span><span className="label">Dashboard</span>
        </NavLink>
        <NavLink to="/schedule" className={({isActive})=> `side-link ${isActive?'active':''}`}>
          <span aria-hidden="true">📅</span><span className="label">Schedule</span>
        </NavLink>
        <NavLink to="/grades" className={({isActive})=> `side-link ${isActive?'active':''}`}>
          <span aria-hidden="true">🧮</span><span className="label">Grades</span>
        </NavLink>
        <NavLink to="/announcements" className={({isActive})=> `side-link ${isActive?'active':''}`}>
          <span aria-hidden="true">📣</span><span className="label">Announcements</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive})=> `side-link ${isActive?'active':''}`}>
          <span aria-hidden="true">👤</span><span className="label">Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
}

function NotFound() {
  return (
    <div className="card">
      <div className="card-body">
        <h2 style={{marginTop:0}}>Page not found</h2>
        <p className="text-muted">The page you’re looking for does not exist.</p>
        <NavLink to="/dashboard" className="btn btn-primary">Go to Dashboard</NavLink>
      </div>
    </div>
  );
}

export default App;
