/**
 * GET /api/stats
 * Returns totals for the project dashboard (/stats). Protected by a secret:
 * send the header  Authorization: Bearer <ADMIN_TOKEN>
 * ADMIN_TOKEN is set in Cloudflare: Pages project > Settings > Variables and Secrets.
 */
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function tableExists(db, name) {
  const row = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").bind(name).first();
  return !!row;
}

export async function onRequestGet({ request, env }) {
  if (!env.ADMIN_TOKEN) return json({ ok: false, error: 'ADMIN_TOKEN is not set in Cloudflare yet.' }, 503);
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!safeEqual(token, env.ADMIN_TOKEN)) return json({ ok: false, error: 'Wrong password' }, 401);
  if (!env.DB) return json({ ok: false, error: 'The D1 database (binding name DB) is not connected yet.' }, 503);

  const db = env.DB;
  const result = {
    ok: true,
    generatedAt: new Date().toISOString(),
    visits: 0,
    chapterStarts: 0,
    chapterCompletions: 0,
    completionRate: null,
    quizAttempts: 0,
    averageQuizScore: null,
    last7Days: [],
    topPages: [],
    pageViewsByLanguage: { en: 0, tw: 0 },
    feedback: { count: 0, averageRating: null, learned: { yes: 0, somewhat: 0, no: 0 } }
  };

  if (await tableExists(db, 'events')) {
    const totals = await db.prepare(`SELECT event, COUNT(*) AS n, AVG(value) AS avg FROM events GROUP BY event`).all();
    for (const r of totals.results || []) {
      if (r.event === 'page_view') result.visits = r.n;
      if (r.event === 'chapter_start') result.chapterStarts = r.n;
      if (r.event === 'chapter_complete') result.chapterCompletions = r.n;
      if (r.event === 'quiz_score') {
        result.quizAttempts = r.n;
        result.averageQuizScore = r.avg == null ? null : Math.round(r.avg);
      }
    }
    if (result.chapterStarts > 0) {
      result.completionRate = Math.min(100, Math.round((result.chapterCompletions / result.chapterStarts) * 100));
    }

    const since = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10);
    const days = await db.prepare(`SELECT day, COUNT(*) AS n FROM events WHERE event='page_view' AND day >= ? GROUP BY day ORDER BY day`).bind(since).all();
    result.last7Days = (days.results || []).map((r) => ({ day: r.day, visits: r.n }));

    const pages = await db.prepare(`SELECT page, COUNT(*) AS n FROM events WHERE event='page_view' GROUP BY page ORDER BY n DESC LIMIT 8`).all();
    result.topPages = (pages.results || []).map((r) => ({ page: r.page || '/', visits: r.n }));

    const hasLang = await db.prepare("SELECT 1 AS ok FROM pragma_table_info('events') WHERE name='lang'").first();
    if (hasLang) {
      const langs = await db.prepare(`SELECT COALESCE(lang, 'en') AS lang, COUNT(*) AS n FROM events WHERE event='page_view' GROUP BY COALESCE(lang, 'en')`).all();
      for (const r of langs.results || []) result.pageViewsByLanguage[r.lang] = r.n;
    }
  }

  if (await tableExists(db, 'feedback')) {
    const fb = await db.prepare(`SELECT COUNT(*) AS n, AVG(rating) AS avg FROM feedback`).first();
    result.feedback.count = fb ? fb.n : 0;
    result.feedback.averageRating = fb && fb.avg != null ? Math.round(fb.avg * 10) / 10 : null;
    const learned = await db.prepare(`SELECT learned, COUNT(*) AS n FROM feedback GROUP BY learned`).all();
    for (const r of learned.results || []) {
      if (r.learned in result.feedback.learned) result.feedback.learned[r.learned] = r.n;
    }
  }

  return json(result);
}

export async function onRequest() {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}
