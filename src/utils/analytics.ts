// Track simple usage events - privacy-friendly, localStorage only
// No personal data, no external services

interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data?: Record<string, string | number>;
}

const STORAGE_KEY = 'cari-analytics';
const MAX_EVENTS = 500;

export function trackEvent(type: string, data?: Record<string, string | number>) {
  try {
    const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    events.push({ type, timestamp: Date.now(), data });
    // Keep only the last MAX_EVENTS to prevent storage bloat
    if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // Silent fail - analytics should never break the app
  }
}

export function getEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getUsageSummary() {
  const events = getEvents();
  const now = Date.now();
  const last7Days = events.filter(e => now - e.timestamp < 7 * 24 * 60 * 60 * 1000);

  const summary: Record<string, number> = {};
  for (const e of last7Days) {
    summary[e.type] = (summary[e.type] || 0) + 1;
  }

  return {
    totalEvents: events.length,
    last7Days: last7Days.length,
    byType: summary,
    firstUse: events.length > 0 ? new Date(events[0].timestamp).toISOString() : null,
    lastUse: events.length > 0 ? new Date(events[events.length - 1].timestamp).toISOString() : null,
  };
}
