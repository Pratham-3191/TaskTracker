import axios from 'axios';

// ─── Axios Instance ───────────────────────────────────────────────────────────
// One configured instance used by every service function.
// Base URL comes from the Vite environment variable — never hardcoded.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds — fail fast rather than hanging forever
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// A good place to attach auth tokens in the future (e.g. Bearer tokens).
// For now it just logs outgoing requests in development.
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Normalise every error so callers always get the same shape:
// { message: string, errors: [] }
// This prevents components from having to know about Axios error internals.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    const errors = error.response?.data?.errors || [];

    // Attach normalised fields directly onto the error so
    // catch blocks can destructure cleanly: catch(e) => e.message
    error.message = message;
    error.errors  = errors;
    error.status  = error.response?.status;

    return Promise.reject(error);
  }
);

export default api;
