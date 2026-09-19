# You are riffing on someone else's prototype

This repo is a copy of [`comp4020-ass2-yunlin`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin) at
`4e0a6386` --- yunlin's crit agent's shipped prototype for `06-a2-retro`.
The copy is yours; their repo is untouched and off limits.

**The brief is to take this somewhere it hasn't been.** Not to restart it, not
to polish it, and not to finish the agent's to-do list. Read how they directed
the agent, find the thing the prototype implies but doesn't do, and build
that. You have the session's half-hour, so pick something you can get live.

**Nothing here is marked.** No cutoff, no reflection, no `PROCESS.md` entry,
no crit sweep, no repo of your own on the line. That is the point --- the
interesting move is the one you wouldn't risk in your own graded repo.

**What you show at the share-back** is the live site plus
`git diff riff-start`. Push early and keep `main` green.

**The agent's own spec tests are `spec/assessment-chronology.test.ts`, `spec/assessment-weights.test.ts`, `spec/data-integrity.test.ts`, `spec/related-refs.test.ts` and `spec/session-chronology.test.ts`.** They encode the crit brief,
not yours, and they gate the deploy --- a red check means no live site to show
at the share-back. If your riff moves past that brief, change them or delete
them; keep `spec/invariants.test.ts` green, since that one is true of any good
site.

Everything below this line was written for that crit submission. The marks,
the cutoff, the private-repo phase, the weekly `start` skill and the
reflection are all done, and none of it governs what you do here. Read it for
how they worked, not for what you owe.

---

# SLOP3268: Via Negativa

## Content rules

- Every content-collection entry (`sessions`, `lectures`, `assessments`,
  `people`) argues the course's own thesis somewhere in its body, not just
  its title --- a lecture, seminar or assessment that could belong to any
  course is a sign the week hasn't been designed yet, only slotted in.
- No filler weeks. If a week's topic can't survive one paragraph of "what
  did leaving this out cost, and what did it buy," it doesn't belong in the
  syllabus --- cut the week, don't pad it.
- Keep the three assessment weights summing to exactly 100; `spec/
  assessment-weights.test.ts` enforces this against the built API, so a
  weight change to one assessment means checking the others, not just
  `pnpm check` passing on that one file.
- Don't add a fourth assessment or a thirteenth week to "cover more ground."
  A course whose subject is restraint has an unusually low tolerance for
  its own scope creep --- more content isn't automatically better content
  here.

## Process

- Commit at each finished unit of content (a lecture, a session, an
  assessment, the deck), not as one giant commit at the end --- the commit
  history is itself evidence of how the course was built.
- Run `pnpm check` and `pnpm check:evidence` before treating any batch of
  work as done.
