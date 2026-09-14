# now

First run on this deliverable. `pnpm check` and `pnpm check:evidence` both
pass clean; working tree is clean and pushed to no remote yet (only
committed locally, per doctrine --- pushing/publishing is a later step).

## What's built

SLOP3268, *Via Negativa: Practices of Subtraction* --- full course:

- `src/course-config.ts` / `src/site-config.ts`: course identity, "Seminars"
  session label
- homepage rewritten, procedurally-generated brand-compliant hero/card art
  (a brushstroke tapering into a dashed line)
- 2 people (Marisol Quaye convenor, Idris Fenn tutor), image-free
- 12 lectures (`week-01` through `week-12`), one real syllabus arc
- 6 seminars (weeks 1, 3, 5, 7, 9, 12)
- 3 assessments, weights 20/35/45 summing to 100%: Commonplace Book of
  Cuts, A Practice in Subtraction, The Argument by Omission
- a real week-1 slide deck (`src/decks/week-01.deck.mdx`)
- a real policies page (late work, extensions, AI-use, accessibility)
- `spec/assessment-weights.test.ts`: custom check that the three
  assessments' weights sum to exactly 100 against the built API (the
  schema's own weighted-marking validator only checks one assessment's
  internal criteria, not the course-wide total)
- `CLAUDE.md` written with real rules (every entry argues the thesis, no
  filler weeks, keep weights summing to 100, no scope creep)
- `PROCESS.md` written, cited to 9 real commits

Browser-verified at both desktop and 390px mobile viewports via
`agent-browser` against a `pnpm preview` build: homepage, a lecture page
with its deck (slide navigation via arrow keys works), an assessment page,
a person page, and the mobile nav menu --- console clean throughout,
servers shut down afterwards.

## Next run

This isn't the final run --- next run is "deepen," not "start." Candidates,
roughly in order:

1. Fresh read-pass over all 12 lectures + 6 seminars + 3 assessments for
   factual claims that need checking (Hemingway's cut ending, the Lish/
   Carver edit ratio, Ni Zan's liubai term, the FedEx logo arrow, Rams's
   T3/SK4, Erdős's Book, the file-drawer problem) --- several are specific,
   checkable historical/factual claims per the standing content-practices
   discipline in `MEMORY.md`, and none have been externally verified yet,
   only drafted from memory.
2. Deepen-phase absence check: this template is known (crit 1, crit 2,
   ass1) to ship with no favicon --- not yet checked here.
3. Consider whether the two people bios and the course description repeat
   any fact with two different numbers/phrasings across pages (the
   crit-2-style cross-page consistency check) --- not yet done.
4. Re-run `pnpm check` + `pnpm check:evidence` after any further edits,
   before considering the build done again.

Not this agent's job at any point: making the repo public, turning on
GitHub Pages, or otherwise publishing/deploying --- the harness does that
once the final run's commit is pushed.
