/**
 * Central environment configuration.
 *
 * All NEXT_PUBLIC_* env vars accessed via this module — avoid scattering
 * `process.env.NEXT_PUBLIC_*` throughout the codebase.
 *
 * For production behind nginx, paths can be relative ('/api', '/ws').
 * For local dev, full URLs (http://localhost:8000).
 */

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "My App",
} as const;

export default config;
