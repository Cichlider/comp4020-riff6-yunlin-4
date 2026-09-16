# now

Seventh run, deepen phase (117h to cutoff at start of this run --- still far
from cutoff, not close to finishing-steps territory). Working tree clean
throughout --- no code changes this run, only verification. `pnpm build`
passes clean (all baked-in checks: a11y, links, deck structure, course-graph).

## What this run did

Closed out the fifth run's two queued candidates, both clean:

1. **Reread `CLAUDE.md`** against the current built state --- its rules
   (thesis-per-entry, no filler weeks, weights sum to 100, no thirteenth
   week/fourth assessment) all still hold: 12 lectures, 6 sessions, 3
   assessments weighted 45/35/20, no drift.
2. **Reread the week-01 deck** (`src/decks/week-01.deck.mdx`) for
   genericness now that lectures/assessments have both had that pass. Its
   "twelve weeks, one move" slide lists ten domains (theology · painting ·
   music · fiction · film · architecture · design · statistics ·
   mathematics · politics) --- checked these against weeks 2--11's actual
   lecture titles/descriptions and they match in exact order. The
   previously-fixed "fifteen centuries" Pseudo-Dionysius-to-Taleb figure
   (commit `6e5d626`) is still correct.

Then found one genuinely new angle and one negative result, both clean:

- **Lighthouse audit-porting doesn't apply here**: checked whether this
  template needs the accessibility+performance sensor ported per the
  standing crit-1/4/assignment-1 practice in `MEMORY.md`. It doesn't ---
  `pnpm check`'s own build output already runs
  `[astro-theme-university] Checked 31 pages ... — no accessibility
  violations` as a normal part of every build. That practice is specific
  to the bare Vite starters those other repos use; this template family
  bakes the check in. Confirmed, not a gap to close.
- **Meta/og description sweep**: read every rendered `<meta
  name="description">`/`og:description` in `dist/` (homepage, policies,
  people, assessments, and sample lecture/session pages) --- all specific
  to the course's own thesis, none generic or boilerplate, none leaking
  instruction-style text.

## What this run did

Closed out all three of the sixth run's queued candidates, all clean:

1. **Reread `src/site-config.ts`/`astro.config.ts`/`src/course-config.ts`**
   against the built site: session labels ("Seminar"/"Seminars"), licence,
   social-image alt text, brand/theme wiring, and the `courseMeta` (code,
   level, dates, description) are all specific to this course, nothing
   stale or copy-pasted-from-template.
2. **Cross-checked the two people bios against `teachers:` fields** on
   every lecture/session. Idris Fenn (`role: tutor`) teaches 5 of 12
   lectures (weeks 4, 6--8, 10, 12) and 2 of 6 sessions (`the-cut`,
   `the-limits-of-restraint`, both practice/pitching sessions, matching
   his bio's "runs the seminar's practice weeks"); those two sessions'
   `related:` links point at the two assessments explicitly or plausibly
   studio-based (`a-practice-in-subtraction`, `the-argument-by-omission`),
   matching his bio's "marks the two studio-based assessments" even though
   there's no schema field naming an assessment marker to check it
   against directly. Marisol Quaye (`role: convenor`) teaches the other 7
   lectures and 5 sessions, matching "founding convenor." Grepped the
   whole site for "convenor"/"tutor" to confirm no page mislabels either
   person (the failure shape a prior crit found) --- both consistent
   everywhere.
3. **Live `agent-browser` playthrough** as a prospective student: built +
   previewed the site (base path resolves to `/comp4020-ass2-yunlin/`
   locally too, since `pages-base.ts` derives it from the git origin
   remote, not just at deploy time), walked homepage --> a non-adjacent
   lecture (week 7) --> an assessment --> the week-1 deck --> policies, at
   both viewports, plus the mobile hamburger menu and Cmd+K search
   (typed a query, got specific/relevant result cards, arrow-down +
   Enter navigated to the second result cleanly --- no focus-trap bug).
   Found one **false alarm**, correctly diagnosed rather than logged as a
   bug: a screenshot taken immediately after clicking "Policies" from the
   mobile menu showed the old and new page's text overlaid/ghosted ---
   this is Astro View Transitions (`transition:name` in the theme's
   layouts) caught mid-cross-fade, not a real bug; a reshoot ~1s later
   showed it settled cleanly. This extends the crit-4 "screenshot right
   after a gesture can look broken purely from timing" lesson (logged in
   `MEMORY.md` for a physically-modelled instrument) to a content site's
   ordinary page navigation --- worth the same pause-and-reshoot instinct
   on any future template using Astro View Transitions before logging a
   post-navigation screenshot as a bug.

## Next run

Four clean angles in a row now (two from the sixth run, two more plus a
false-alarm-correctly-diagnosed from this seventh run). Per the
`assignment-1`/crit-1/5 precedent this is still not the signal to finish
at 117h out --- the next run needs a genuinely new question, not another
re-verification pass. Untried candidates, in rough priority order:

1. Read `spec/*.test.ts` themselves for a coverage gap --- what do they
   actually assert vs. what a marker/brief line implies should be true?
   (E.g. does `data-integrity.test.ts` check session dates fall in the
   right calendar week relative to `startDate`, not just inside the
   teaching period?)
2. Check any real-world facts/URLs cited in lecture/session bodies
   (Pawson's Nový Dvůr, Cage's 4'33", Rams's ten principles, Eisenstein,
   the FedEx logo, Occam's razor, Hemingway) against a source, the same
   fact-checking discipline already applied earlier in this build's
   history (commit `aa717ae`) --- it's been several runs since the last
   dedicated fact-check pass and new lecture prose may have been added
   since.
3. Reread the generated `dist/llms-full.txt` (not just `llms.txt`, already
   checked in run 5) for the same genericness/cross-page-consistency
   question.
4. A resize-mid-navigation or reduced-motion check on the View Transitions
   behaviour just found (crit 4/5 precedent: check `prefers-reduced-motion`
   actually suppresses the cross-fade, since a content site with this much
   navigation is exactly where a motion-sensitive reader would notice it).

Not this agent's job at any point: making the repo public, turning on
GitHub Pages, or otherwise publishing/deploying --- the harness does that
once the final run's commit is pushed.
