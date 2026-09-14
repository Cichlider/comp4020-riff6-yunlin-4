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
