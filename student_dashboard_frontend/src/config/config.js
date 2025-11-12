/**
 * Centralized configuration accessor for environment variables.
 * Reads REACT_APP_* variables and provides safe fallbacks for local dev.
 * No secrets are hardcoded; values are read from process.env at build time.
 */
export class AppConfig {
  // PUBLIC_INTERFACE
  static get() {
    const env = {
      apiBase: sanitizeUrl(process.env.REACT_APP_API_BASE) || null,
      backendUrl: sanitizeUrl(process.env.REACT_APP_BACKEND_URL) || null,
      frontendUrl: sanitizeUrl(process.env.REACT_APP_FRONTEND_URL) || window.location.origin,
      wsUrl: sanitizeUrl(process.env.REACT_APP_WS_URL) || null,
      nodeEnv: process.env.REACT_APP_NODE_ENV || (process.env.NODE_ENV || 'development'),
      telemetryDisabled: strToBool(process.env.REACT_APP_NEXT_TELEMETRY_DISABLED, true),
      enableSourceMaps: strToBool(process.env.REACT_APP_ENABLE_SOURCE_MAPS, true),
      port: safeNumber(process.env.REACT_APP_PORT, 3000),
      trustProxy: strToBool(process.env.REACT_APP_TRUST_PROXY, false),
      logLevel: (process.env.REACT_APP_LOG_LEVEL || 'info'),
      healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz',
      featureFlags: parseJson(process.env.REACT_APP_FEATURE_FLAGS, {}),
      experimentsEnabled: strToBool(process.env.REACT_APP_EXPERIMENTS_ENABLED, false),
    };
    return env;
  }
}

function sanitizeUrl(v) {
  if (!v || typeof v !== 'string') return null;
  try {
    // Allow relative paths too
    if (v.startsWith('/')) return v;
    // Throws if invalid; we only return string if valid
    const u = new URL(v);
    return u.toString().replace(/\/+$/, '');
  } catch {
    return null;
  }
}

function strToBool(v, fallback = false) {
  if (typeof v === 'boolean') return v;
  if (typeof v !== 'string') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());
}

function safeNumber(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function parseJson(v, fallback) {
  if (!v) return fallback;
  try { return JSON.parse(v); } catch { return fallback; }
}
