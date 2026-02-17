// ============================================================================
// CARI Francisation — Service Worker
// A simple, reliable service worker for offline-capable PWA usage.
// Designed for non-technical users (parents, educators).
// ============================================================================

// ---------------------------------------------------------------------------
// 1. CONFIGURATION
// ---------------------------------------------------------------------------

// Bump this version string whenever you deploy new content.
// Old caches will be automatically cleaned up on activation.
const CACHE_VERSION = 'cari-v1';

// Assets to pre-cache during the install step.
// These are the shell resources needed to render the app offline.
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logos/cari-logo.png',
  '/logos/cari-symbol.png',
  '/logos/cari-logo-white.png',
];

// A minimal offline fallback page served when both network and cache fail.
const OFFLINE_PAGE = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#263B5A" />
  <title>CARI Francisation — Hors ligne</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #F2F6F8;
      color: #263B5A;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
    }
    .container { max-width: 400px; }
    .icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      display: block;
    }
    h1 {
      font-size: 1.4rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }
    p {
      font-size: 1rem;
      line-height: 1.5;
      color: #5a6d80;
      margin-bottom: 1.5rem;
    }
    button {
      background: #263B5A;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #1a2d47; }
    button:active { background: #0f1f33; }
  </style>
</head>
<body>
  <div class="container">
    <span class="icon" aria-hidden="true">&#128268;</span>
    <h1>Pas de connexion Internet</h1>
    <p>
      L'application CARI Francisation n'est pas disponible pour le moment.
      Veuillez v&eacute;rifier votre connexion et r&eacute;essayer.
    </p>
    <button onclick="window.location.reload()">R&eacute;essayer</button>
  </div>
</body>
</html>
`;

// ---------------------------------------------------------------------------
// 2. INSTALL — Pre-cache essential assets
// ---------------------------------------------------------------------------

self.addEventListener('install', (event) => {
  // Skip waiting so the new service worker activates immediately.
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// ---------------------------------------------------------------------------
// 3. ACTIVATE — Clean up old caches
// ---------------------------------------------------------------------------

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Take control of all open tabs immediately (no reload required).
      return self.clients.claim();
    })
  );
});

// ---------------------------------------------------------------------------
// 4. FETCH — Serve requests with appropriate strategies
// ---------------------------------------------------------------------------

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests. Let other methods (POST, etc.) pass through.
  if (request.method !== 'GET') {
    return;
  }

  // Determine if this is a navigation request (HTML page).
  const isNavigationRequest =
    request.mode === 'navigate' ||
    (request.headers.get('accept') && request.headers.get('accept').includes('text/html'));

  if (isNavigationRequest) {
    // --- NAVIGATION: Network-first, fall back to cache, then offline page ---
    event.respondWith(networkFirstWithOfflineFallback(request));
  } else {
    // --- STATIC ASSETS: Cache-first, fall back to network ---
    event.respondWith(cacheFirstWithNetworkFallback(request));
  }
});

// ---------------------------------------------------------------------------
// 5. STRATEGY: Network-first (for navigation / HTML requests)
// ---------------------------------------------------------------------------
// Try the network for the freshest HTML. If the network fails, serve
// the cached version. If nothing is cached, show the offline fallback page.

async function networkFirstWithOfflineFallback(request) {
  try {
    const networkResponse = await fetch(request);

    // If we got a valid response, cache it for future offline use.
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Network failed — try the cache.
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // For SPA navigation, try serving the cached root index.html.
    // This handles client-side routes like /activities, /themes, etc.
    const cachedIndex = await caches.match('/');
    if (cachedIndex) {
      return cachedIndex;
    }

    // Nothing available — serve the offline fallback page.
    return new Response(OFFLINE_PAGE, {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

// ---------------------------------------------------------------------------
// 6. STRATEGY: Cache-first (for static assets: JS, CSS, images, fonts)
// ---------------------------------------------------------------------------
// Serve from cache if available (fast). Otherwise fetch from network,
// cache the response, and return it.

async function cacheFirstWithNetworkFallback(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Cache valid responses for future use.
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Both cache and network failed. For images, we could return a
    // placeholder, but for other assets there is nothing useful to return.
    // Return a simple 503 so the app can handle it gracefully.
    return new Response('', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}
