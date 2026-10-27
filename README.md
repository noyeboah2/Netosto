# Stories in Our Genes

Interactive stories that teach the science of inherited diseases. Chapter 1: **Sickle Cell Disease**.
Visitors play as a red blood cell, learn the real biology through science notes and glossary pop-ups,
take a quiz, explore a Punnett square lab and control a blood flow simulation.

- Plain HTML, CSS and JavaScript. **No build step, no npm install.**
- Hosted on **Cloudflare Pages**, with three small **Pages Functions** for feedback and anonymous analytics.
- Data stored in **Cloudflare D1** (free tier is plenty). Tables are created automatically.

---

## Folder structure

```
stories-in-our-genes/
├── README.md
├── functions/                  ← Cloudflare Pages Functions (server code)
│   └── api/
│       ├── track.js            POST /api/track     anonymous usage events
│       ├── feedback.js         POST /api/feedback  anonymous feedback form
│       └── stats.js            GET  /api/stats     password-protected totals
└── public/                     ← the website (Cloudflare "build output directory")
    ├── index.html              Home
    ├── chapters.html           All chapters (sickle cell + "coming soon")
    ├── story.html              Interactive story player
    ├── quiz.html               10-question quiz
    ├── summary.html            "What you learned" + share + feedback
    ├── learn.html              Learning page + blood flow simulation
    ├── lab.html                Inheritance Lab (Punnett square)
    ├── glossary.html           A–Z glossary
    ├── about.html              About, sources, privacy, disclaimer, feedback
    ├── stats.html              Your private dashboard
    ├── 404.html                Not-found page
    ├── _headers                Security + caching headers
    ├── robots.txt
    ├── favicon.svg
    ├── css/styles.css
    └── js/
        ├── i18n.js             Language engine (English / Twi switch)
        ├── i18n/tw.js          Twi text for menus, buttons and every page
        ├── data/glossary.js    All glossary terms
        ├── data/glossary.tw.js Twi glossary definitions
        ├── data/chapters.js    Chapter list + searchable pages
        ├── data/sickle-cell.js Story scenes, science notes, quiz, summary, sources
        ├── data/sickle-cell.tw.js  The whole chapter in Twi
        ├── art.js              Story illustrations (inline SVG)
        ├── main.js             Shared: nav, search, term pop-ups, share, feedback, tracking
        ├── story.js            Story engine (branching, progress, back/restart, auto-save)
        ├── quiz.js  summary.js  lab.js  sim.js  glossary-page.js
        └── home.js  about.js  stats-page.js
```

---

## Deploy to Cloudflare, step by step

### Step 1: Put the code on GitHub
1. Create a free account at github.com and make a new repository, e.g. `stories-in-our-genes`.
2. Upload **everything inside this folder** (so `public/`, `functions/` and `README.md` sit at the top level of the repo).
   On the repo page: **Add file → Upload files**, drag the folders in, then **Commit changes**.

### Step 2: Create the Pages project
1. Log in to dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick your repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `public`
   - Root directory: *(leave empty)*
4. Click **Save and Deploy**. After about a minute your site is live at `https://<project-name>.pages.dev`.

The `functions/` folder is detected automatically. At this point the site fully works;
feedback and stats simply aren't saved until you finish Step 3.

### Step 3: Create the database (for feedback + analytics)
1. In the Cloudflare dashboard: **Storage & Databases → D1 SQL Database → Create**. Name it `sig-db`.
2. Go to your Pages project → **Settings → Bindings → Add → D1 database**.
   - **Variable name:** `DB`  (exactly this, capital letters)
   - **D1 database:** `sig-db`
3. Save. You don't need to create any tables; the code creates them on first use.

### Step 4: Set your dashboard password
1. Pages project → **Settings → Variables and Secrets → Add**.
2. **Type:** Secret, **Name:** `ADMIN_TOKEN`, **Value:** a long password only you know.
3. Save.

### Step 5: Redeploy
Bindings and secrets apply to new deployments only. Go to **Deployments**, open the latest one,
and click **Retry deployment** (or push any small change to GitHub).

### Step 6: Check it works
- Open your site, play the story, take the quiz, send a feedback response.
- Visit `https://<your-site>/stats`, enter your `ADMIN_TOKEN`, and you should see the numbers.

### Optional
- **Custom domain:** Pages project → Custom domains.
- **Cloudflare Web Analytics** (extra visitor stats, free, no cookies): Pages project → Metrics → enable Web Analytics.
  The security headers already allow it.

---

## Running it on your own computer (optional)

Install Node.js, then from this folder run:

```
npx wrangler pages dev public
```

Open http://localhost:8788. Functions run locally too (without a database, they accept data but don't save it).

---

## Adding a new chapter later

1. Copy `public/js/data/sickle-cell.js` to e.g. `public/js/data/g6pd.js` and change `id: 'g6pd'`, the scenes, quiz, summary and sources.
2. Add any new glossary terms to `public/js/data/glossary.js`.
3. In `public/js/data/chapters.js`, set that chapter's `status: 'available'` and `url: '/story?chapter=g6pd'`.
4. Add `<script src="/js/data/g6pd.js"></script>` after the sickle-cell script tag in each HTML page.
5. If the new story needs different pictures, add a drawing to `public/js/art.js`.

The story engine, quiz, summary, glossary links and search all work automatically for the new chapter.

---

## Languages (English + Twi)

- Visitors switch with the **Twi / English** button in the header. The choice is remembered on their device.
- Share a link that opens straight in Twi by adding `?lang=tw`, e.g. `https://netosto.pages.dev/?lang=tw`.
- The `/stats` dashboard shows **Views in English** and **Views in Twi** separately.
- The Twi text is a **draft**. A notice on every Twi page says it is being reviewed. To correct a translation:
  - menus, buttons and page text → `public/js/i18n/tw.js` (left side = English, right side = Twi; only edit the right side)
  - the story, quiz and summary → `public/js/data/sickle-cell.tw.js`
  - glossary definitions → `public/js/data/glossary.tw.js`
  Keep anything inside `[[ ]]` and `{ }` exactly as it is; those are links and numbers.
- Once a fluent speaker has approved it, delete the review notice by removing the `if (SIG.lang === 'tw') { ... }`
  block inside `initLang()` in `public/js/main.js`.

## Privacy design
- No accounts, no cookies, no names, no IP addresses, no health data.
- Story progress and quiz scores live only in the visitor's browser (localStorage).
- Analytics store only: event name, page path, chapter id, quiz percentage, date.
- Feedback stores only: rating, "did you learn", optional comment (emails/phone numbers removed automatically), date.

## Content note
All characters are fictional. Science is summarised from WHO, CDC, NHLBI, MedlinePlus and FDA sources
(listed on the About page and in `sickle-cell.js`). Before sharing widely, ask a doctor, nurse or
science teacher to review the content; that review is also great evidence for your application.
