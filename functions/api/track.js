/**
 * POST /api/track
 * Records one anonymous usage event in the D1 database bound as `DB`.
 * Body: { event, page?, chapter?, value?, lang? }
 * Stored: event name, page path, chapter id, a number (quiz %), site language, and the date.
 * Never stored: IP address, names, cookies, device IDs or health data.
 */
const ALLOWED_EVENTS = new Set(['page_view', 'chapter_start', 'chapter_complete', 'quiz_score']);
const ALLOWED_LANGS = new Set(['en', 'tw']);

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      page TEXT,
      chapter TEXT,
      value REAL,
      lang TEXT,
      day TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )`),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_events_event_day ON events(event, day)')
  ]);
  // Databases created before language support need the new column.
  try { await db.prepare('ALTER TABLE events ADD COLUMN lang TEXT').run(); } catch (e) { /* column already exists */ }
  schemaReady = true;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

function cleanSlug(value, max = 80) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9/_-]/g, '').slice(0, max) || null;
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const event = String(body.event || '');
  if (!ALLOWED_EVENTS.has(event)) return json({ ok: false, error: 'Unknown event' }, 400);

  const page = cleanSlug(body.page, 120);
  const chapter = cleanSlug(body.chapter);
  const lang = ALLOWED_LANGS.has(body.lang) ? body.lang : 'en';
  let value = null;
  if (event === 'quiz_score') {
    const n = Number(body.value);
    if (!Number.isFinite(n) || n < 0 || n > 100) return json({ ok: false, error: 'Invalid score' }, 400);
    value = Math.round(n);
  }

  // If the database has not been connected yet, accept quietly so the site still works.
  if (!env.DB) return json({ ok: true, stored: false });

  try {
    await ensureSchema(env.DB);
    const now = Date.now();
    const day = new Date(now).toISOString().slice(0, 10);
    await env.DB.prepare('INSERT INTO events (event, page, chapter, value, lang, day, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(event, page, chapter, value, lang, day, now)
      .run();
    return json({ ok: true, stored: true });
  } catch (err) {
    return json({ ok: false, error: 'Storage error' }, 500);
  }
}

export async function onRequest({ request }) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  return json({ ok: false, error: 'Method not allowed' }, 405);
}
