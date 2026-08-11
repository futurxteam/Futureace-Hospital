/* =============================================================================
   MetaPixelTracker  —  src/components/MetaPixelTracker.jsx
   =============================================================================
   Invisible component mounted once inside <Router> that fires a Meta PageView
   on every SPA route change.

   WHY THIS IS NEEDED
   ──────────────────
   Meta's base snippet (in index.html) fires PageView exactly once — on the
   initial hard page load. React Router replaces the browser's normal navigation,
   so subsequent route changes never trigger a new load. This component listens
   to every location change and manually fires trackPageView(), ensuring Meta
   Ads receives accurate page-level traffic data for all routes.

   USAGE (already added to App.jsx)
   ─────────────────────────────────
     <Router>
       <MetaPixelTracker />
       …
     </Router>

   The component renders nothing — no DOM output, no visual impact.
============================================================================= */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/metaPixel';

export default function MetaPixelTracker() {
  const location = useLocation();

  /* Track the previous pathname so we never fire a duplicate event when
     React re-renders the same route (e.g. during StrictMode double-invoke). */
  const prevPathRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    /* Skip if the route hasn't actually changed */
    if (prevPathRef.current === currentPath) return;
    prevPathRef.current = currentPath;

    /* Fire PageView for this route.
       The base snippet already fired for the very first load, but calling it
       again here for the first route is harmless — Meta deduplicates within
       the same session window. */
    trackPageView();
  }, [location]);

  /* Renders nothing — analytics only */
  return null;
}
