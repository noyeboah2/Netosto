/**
 * POST /api/feedback
 * Saves an anonymous feedback response in the D1 database bound as `DB`.
 * Body: { rating: 1-5, learned: 'yes'|'somewhat'|'no', comment?: string, chapter?: string, website?: '' }
 * `website` is a hidden "honeypot" field: real people leave it empty, spam bots fill it.
 * Emails and phone numbers typed into comments are removed before saving,
 * so no personal contact details are stored.
 */
const LEARNED = new Set(['yes', 'somewhat', 'no']);

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.prepare(`CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rating INTEGER NOT NULL,
    learned TEXT NOT NULL,
    comment TEXT,
    chapter TEXT,
    day TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`).run();
  schemaReady = true;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

function redact(text) {
  return String(text || '')
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[removed]')        // email addresses
    .replace(/\+?\d[\d\s().-]{7,}\d/g, '[removed]')             // phone numbers
    .replace(/<[^>]*>/g, '')                                     // any HTML tags
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  // Honeypot: pretend success so bots don't retry.
  if (body.website) return json({ ok: true, stored: false });

  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json({ ok: false, error: 'Rating must be 1 to 5' }, 400);

  const learned = String(body.learned || '');
  if (!LEARNED.has(learned)) return json({ ok: false, error: 'Invalid answer' }, 400);

  const comment = redact(body.comment) || null;
  const chapter = String(body.chapter || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60) || null;

  if (!env.DB) return json({ ok: true, stored: false });

  try {
    await ensureSchema(env.DB);
    const now = Date.now();
    await env.DB.prepare('INSERT INTO feedback (rating, learned, comment, chapter, day, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(rating, learned, comment, chapter, new Date(now).toISOString().slice(0, 10), now)
      .run();
    return json({ ok: true, stored: true });
  } catch (err) {
    return json({ ok: false, error: 'Storage error' }, 500);
  }
}

export async function onRequest() {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}
