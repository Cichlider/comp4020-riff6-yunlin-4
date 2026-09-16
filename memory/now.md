# now

Ninth run, deepen phase (100h to cutoff at start of this run --- still
solidly in deepen territory, not close to finishing steps). One real bug
found and fixed, both queued candidates from the eighth run closed clean,
and one new permanent regression test added. Working tree clean, `pnpm
check` and `pnpm check:evidence` green throughout.

## What this run did

1. **Re-swept never-touched-since-initial-commit files** (the eighth run's
   standing check for this template) for the scaffolding-text failure
   shape. Most were clean scaffolding (config, lockfiles, dev-facing docs)
   or pure data-driven components with no hardcoded prose. Found one real
   bug in `TeachingTeam.astro`: it rendered `person.data.role` raw (the
   lowercase schema enum `tutor`/`convenor`) instead of a display label,
   while `PeopleGrid.astro` right next to it already had the correct
   `roleLabels` map. Every lecture/session page with a `teachers:` field
   (18 files) showed "— tutor" / "— convenor" in lowercase. Fixed by
   reusing the same label map; verified live at the mobile marking
   viewport (`Idris Fenn — Tutor`, correctly capitalised, clean console).
   Committed as `cc80c80`.
2. **Fact-checked the remaining real-world claims** queued by the eighth
   run (Hemingway/"Out of Season", Carver/Lish's edits, Rams's ten
   principles and the Braun T3/SK4, Pawson's Nový Dvůr, the FedEx logo,
   Eisenstein/Kuleshov, Erdős's Book) against WebSearch results. All
   checked out clean --- no fix needed, a genuine check discharged.
3. **Reduced-motion / View Transitions check**, queued by the eighth run:
   confirmed live with `agent-browser set media light reduced-motion`
   that the theme's Astro `ClientRouter` correctly suppresses the
   cross-fade ghosting (verified the ghosting is real without
   reduced-motion first, by screenshotting a normal navigation
   immediately after click --- homepage hero text visibly ghosted over
   the People page --- then the identical navigation with reduced-motion
   set showed a clean instant swap). Astro's `<ClientRouter>` has this
   built in with no extra CSS needed on this theme's part; nothing to fix.
4. **New question, not on any prior list**: does the session-chronology
   bug shape (a page referencing material that hasn't happened yet by the
   site's own calendar) also apply to assessments' `related:` refs
   against their own `due` date, not just sessions' against lectures?
   Checked all three assessments by hand --- all clean, every related
   lecture/session predates its assessment's due date. Wrote
   `spec/assessment-chronology.test.ts` as a permanent guard anyway
   (verified it actually fails via a temporary due-date edit before
   restoring), since `session-chronology.test.ts` only covered half of
   this failure shape. Committed as `9e771a9`.
5. Updated `PROCESS.md` to cite the `TeachingTeam` fix as a second example
   of the role-labelling bug family (the first, prose-level instance was
   already cited from an earlier run) --- checked the word count stays
   under the brief's 600-word ceiling (595--597 by prose word count with
   citation URLs/markup stripped; raw `wc -w` reads 616, which overcounts
   per the standing lesson on this). Committed as `17cfa89`.

## Next run

No untried candidates left queued from before this run. Angles already
exhausted across recent runs: per-page and cross-page fact-checks,
session/assessment chronology (now both directions), related-refs
resolution, off-screen-text channels (README/comments), llms.txt/
llms-full.txt rereads, PROCESS.md word count, reduced-motion/View
Transitions, the never-touched-since-initial-commit scaffolding sweep
(now closed on all remaining candidates), dark/light toggle not yet
explicitly tested live (theme-provided, low risk, but untried).

Candidates for the next run, roughly in order of how untried they are:

1. **Live-test the dark/light theme toggle** in the footer (`.at-footer
   -theme-toggle`) --- confirm it actually flips `data-theme` and persists
   via `localStorage` across a reload, and that course content (the
   `--seal`-style accent, if any custom colours were added) still reads
   correctly in dark mode. Untried so far this build.
2. **Reread the assessment `spec:`/`marking:` blocks** against the
   lecture/session content they depend on --- e.g. does "engages at least
   three weeks of the semester's material by name" (the-argument-by
   -omission) or "eight well-argued entries... from genuinely different
   domains" (commonplace-book-of-cuts) actually make sense given what the
   twelve weeks cover, a different question from the chronology/weight-sum
   checks already automated.
3. **Deck accessibility/content pass**: `src/decks/week-01.deck.mdx` was
   last explicitly reread in an earlier run (confirmed matching lecture
   content); worth a fresh look now that later content (chronology move,
   TeachingTeam fix) has landed, in case anything in the deck references
   material that's since moved.

Given this run found one real bug and closed two long-queued clean
candidates plus added a genuinely new permanent check, the deepen phase
is not yet dry --- but getting close to it for the angles tried so far.
Not this agent's job at any point: making the repo public, turning on
GitHub Pages, or otherwise publishing/deploying.
