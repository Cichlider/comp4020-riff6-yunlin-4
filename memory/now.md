# now

Second run, deepen phase (159h to cutoff at start of this run). Working
tree clean, all four deepen candidates from the prior hand-off closed out.
`pnpm check` and `pnpm check:evidence` both pass clean.

## What this run did

Fact-checked every checkable claim across all 12 lectures, 6 seminars, 3
assessments, the week-1 deck, both people pages and the policies page
against external sources (`WebSearch`), and did a cross-page consistency
pass. Found and fixed four real bugs, all committed:

- `aa717ae`: Hemingway's iceberg-theory quote dropped "of prose" from the
  real *Death in the Afternoon* line; Pseudo-Dionysius-to-Maimonides gap
  said "three centuries" (actual: ~seven, c. 500 CE to c. 1190); two
  places called Idris (`role: tutor`) a "convenor" alongside Marisol
  (`role: convenor`) --- `sessions/the-limits-of-restraint.md` and
  `pages/policies/index.mdx` (two spots in that file).
- `6e5d626`: the week-1 deck's Pseudo-Dionysius-to-Taleb gap said "twelve
  centuries," actual ~fifteen (c. 500 CE to *Antifragile*, 2012) --- same
  undercounting-by-centuries shape as the Maimonides bug, independently
  invented, both wrong in the same direction. Logged as a new MEMORY.md
  content-practices lesson (subtract the two dates a "N centuries later"
  claim depends on, don't just verify each date is individually real).

Everything else checked out clean on external verification: Lish/Carver
cut ratio ("more than half," corroborated by multiple sources citing
50--78%), Taleb's "subtractive knowledge" attribution, Rams's tenth
principle and the T3/SK4 products, Erdős's Book, Pawson/Nový Dvůr's
selection story, the file-drawer problem, liubai (already verified in an
earlier crit per MEMORY.md). Also verified: the favicon "absence" that
hit every crit-template build does *not* apply here --- this template
(`astro-theme-slop`) ships its own `slopCrest` SVG favicon via the fixed
SlopU branding, wired through `astro-theme-university`'s `BaseLayout`,
already rendering; confirmed present, nothing to add. Assessment weights
(20/35/45, and each assessment's internal weighted criteria) all still
sum to 100. All lecture/seminar dates fall on the right weekdays
(lectures Monday, seminars the following Wednesday) inside the course's
own start/end range, and each assessment's "due at the end of week N"
prose matches its actual `due:` date. All four fixes verified rendering
correctly via `curl` against a `pnpm preview` build (with the GitHub
Pages base path, `/comp4020-ass2-yunlin/` --- the bare root 404s under
`pnpm preview`, don't forget the base prefix when curling this repo's
preview server) before the server was shut down.

Also re-fetched and reread the assignment-2 brief in full this run
(https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/api/assessments/assignment-2.json)
to confirm the existing build still matches it --- it does: SLOP3268 is
niche, twelve dated weeks, one lecture (week 1) links a real deck,
weights sum to 100, `spec/assessment-weights.test.ts` exists,
`PROCESS.md`/`CLAUDE.md`/commit history are all in place.

## Next run

Not the final run yet. Deepen-phase candidates, since the obvious
fact-check/consistency/absence passes are now exhausted:

1. A live `agent-browser` pass (not just `curl`) at both marking
   viewports on a couple of pages not yet screenshotted this build ---
   the prior run's browser-verification note covers homepage, one
   lecture+deck, one assessment, one person page and the mobile nav
   menu, but not the policies page or a seminar page specifically.
2. Reread `PROCESS.md` against the brief's actual grading emphasis one
   more time now that the brief's full text has been re-confirmed this
   run --- it wants explanation of *why* a decision was made over the
   obvious alternative and *how* it was verified, for both technical and
   course-design choices; check whether the fact-checking discipline
   itself (this run and past ones) is cited as one of those verification
   methods, since it's a concrete, real answer to "how did you verify
   the result was correct" for course-design content specifically.
3. Consider whether any of the twelve lectures reads as fungible/generic
   per the brief's own warning ("a site that merely swaps nouns into the
   starter template" hurts response-to-brief regardless of CI) --- a
   fresh read for genericness, not factual accuracy, hasn't been done
   explicitly as its own pass.
4. Re-run `pnpm check` + `pnpm check:evidence` after any further edits.

Not this agent's job at any point: making the repo public, turning on
GitHub Pages, or otherwise publishing/deploying --- the harness does that
once the final run's commit is pushed.
