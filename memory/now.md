# now

Tenth run, deepen phase (93h to cutoff at start of this run --- still
solidly in deepen territory). No bugs found; closed the three candidates
queued by the ninth run's hand-off, all clean, plus two incidental checks.
Working tree clean (no code changes this run), `pnpm check` and `pnpm
check:evidence` green throughout.

## What this run did

1. **Live-tested the dark/light theme toggle** (`.at-footer-theme-toggle`),
   untried until now. Confirmed via `agent-browser`: initial `auto` state
   resolves to `light` (matching system preference), clicking the toggle
   flips `document.documentElement.dataset.theme` and writes
   `localStorage.at-theme`, a reload preserves the choice, and toggling
   back to light and console output stayed clean throughout. Screenshotted
   the homepage and lectures index in dark mode --- the orange brand accent
   and body text both read cleanly against the dark surface. This project
   has no custom CSS/colours of its own (`src/decks/theme.css` is a single
   import, deliberately, per its own header comment) so there was no
   accent-colour risk to check beyond what the theme already handles.
2. **Reread all three assessments' `spec:`/`marking:` blocks against the
   twelve lectures' and six sessions' actual content**, untried until now
   as a distinct question from the already-automated chronology/weight-sum
   checks. All checked out: `commonplace-book-of-cuts`'s "at least 4
   different disciplines" across weeks 1--5 is exactly satisfiable
   (theology x2, painting, music, fiction); `the-argument-by-omission`'s
   "directly addresses week 12's counter-case" matches week-12.md's actual
   content almost verbatim ("not every cut earns its keep" in the lecture
   vs. "why this particular omission earns its keep" in the spec); every
   assessment's `related:` sessions/lectures are topically apt, not just
   chronologically valid.
3. **Rereread `src/decks/week-01.deck.mdx`** for drift since the
   TeachingTeam and chronology fixes landed --- clean, no stale references;
   the "fifteen centuries" Taleb/apophatic claim (previously corrected
   from a wrong "twelve centuries" in an earlier run) is still consistent,
   the disciplines list and assessment weights/dates still match the
   content collections exactly.
4. **Two incidental checks prompted by the above**, both clean: opened
   `card.png` and `hero-home.avif` directly to confirm neither has any
   baked-in instruction/prose text (both are abstract brush-stroke
   graphics, no words) --- a check this repo's brief doesn't forbid
   instructions the way Far Bank's did, but worth ruling out anyway since
   it's cheap once the image-reading technique exists from that crit.
   Also confirmed the favicon gap logged elsewhere in MEMORY.md for other
   templates doesn't apply here: `astro-theme-slop`'s branding already
   supplies `<link rel="icon" ... slop-crest...svg">` in every page's
   `<head>` (a plain `/favicon.ico` 404s, which is expected --- the SVG
   link is what browsers actually use).
5. Considered, but did not treat as a bug: Idris Fenn's bio
   (`people/idris-fenn.md`) says he "marks the two studio-based
   assessments," but only one assessment (`a-practice-in-subtraction`) is
   tagged `studio` in frontmatter --- `the-argument-by-omission` is tagged
   `final project`. No `marker`/`grader` field exists anywhere in the
   schema, and assessment tags are never rendered visibly on any page (the
   assessments index only shows title/description/due/weight), so this
   isn't a self-referential claim a reader could check against the site's
   own visible categorisation the way the crit 1 SVG-count bug was --- it
   reads as a defensible loose gloss (both `a-practice-in-subtraction` and
   `the-argument-by-omission` are "make a piece" assessments, unlike the
   observational `commonplace-book-of-cuts`), not a miscount. Left as is;
   worth a second look only if a future run finds tags being rendered
   somewhere that would make the claim checkable against visible content.

## Next run

Angles now exhausted across all runs to date: per-page and cross-page
fact-checks, session/assessment chronology (both directions, automated),
related-refs resolution, off-screen-text channels (aria-labels, meta
description, README/comments, now also checked: committed images),
llms.txt/llms-full.txt rereads, PROCESS.md word count, reduced-motion/View
Transitions, the never-touched-since-initial-commit scaffolding sweep,
dark/light theme toggle (now tested), assessment spec/marking blocks vs.
actual content (now tested), deck content drift (now tested), favicon
(confirmed theme-supplied).

Candidates for the next run, genuinely untried so far:

1. **Live keyboard-only pass**: Tab through the nav, the search dialog
   (Cmd+K), and the mobile hamburger menu at the 390px viewport --- confirm
   focus order is sane and nothing traps focus. This repo's interactivity
   is much thinner than the crit 4/5 game/instrument builds (no custom JS
   beyond what the theme ships), so this is a smaller-stakes check than
   those, but it's never been explicitly run here.
2. **Reread the `policies.mdx`/`policies/` page and `README.md`** for
   genericness or leftover scaffolding text, the same lens that caught the
   index-page scaffolding bug in an earlier run --- not yet applied to the
   policies page specifically.
3. **Cross-check `people/*.md` bios against every place a person is
   named** (lecture/session `teachers:` fields, the `week-12.md`
   co-teaching claim, `TeachingTeam.astro`/`PeopleGrid.astro` rendering)
   for a fresh instance of the role/attribution mismatch family already
   fixed twice in this repo --- specifically whether any lecture/session
   `teachers:` list omits or misattributes relative to what a person's own
   bio claims about their teaching role.
4. If all of the above come back clean, the deepen phase is close to
   genuinely dry for this deliverable; at 93h to cutoff it's still too
   early to move to finishing steps regardless.

Not this agent's job at any point: making the repo public, turning on
GitHub Pages, or otherwise publishing/deploying.
