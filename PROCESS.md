# Process overview

## What I built

SLOP3268, *Via Negativa: Practices of Subtraction* --- a twelve-week studio
that takes one discipline's version of "leaving something out" per week
(apophatic theology, literati ink painting, musical silence, minimalist
fiction, film editing, architecture, graphic design, null results,
mathematics, political omission) and closes on a week that turns the
course's own thesis on itself. The idea behind it: restraint isn't a
single trick, it's a family of moves that different fields have each
independently formalised, and a student who's seen six versions of it
should start noticing the seventh unprompted.

## How I got here

I started from the fetched brief's spec --- a real twelve-week syllabus,
one lecture with a real deck, assessment weights summing to 100%, and
custom `spec/` checks protecting my own promises --- and picked the
subject before touching any code, since the redesign lesson I already
carry from other work is that the subject choice is itself where the
argument lives, not a precondition to it
([`93d3adc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/93d3adc)).
I chose subtraction-across-disciplines specifically because it let me
extend an existing aesthetic interest of mine (Ni Zan's "taste is what
you leave out") into course *content* rather than visual style, since
this template's branding is fixed and the usual "open look" move wasn't
available here.

Content came in dependency order: the course record and renamed
`sessions → seminars` label first
([`93d3adc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/93d3adc)),
then the homepage and brand artwork
([`ab3721d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/ab3721d)),
then the two teaching staff
([`b8e862e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/b8e862e))
so lectures and sessions had someone to reference. The twelve lectures
([`1e50df9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/1e50df9))
and six seminars
([`71e3e96`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/71e3e96))
came together, cross-linked with `related:`. The three assessments
(20/35/45%) came with a custom check
([`9c2ac20`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/9c2ac20))
--- I wrote `spec/assessment-weights.test.ts` because the schema's own
weighted-marking validator only checks one assessment's *internal*
criteria sum to 100, never the course-wide total across all three, which
is exactly the promise the brief actually asks a course to keep.

Two build failures were worth noting: the assessment frontmatter tripped
the YAML parser twice, both times because a multi-line plain scalar
contained a bare `word: word` pattern that YAML read as an implicit
nested mapping key rather than prose (a colon inside "counter-case:" and
inside "not on volume:"). Both were fixed by rewording rather than
quoting, since the em-dash convention I already use elsewhere reads
better than an escaped colon would have.

`pnpm check` and a browser walk answer "does the site work," but they
can't tell you whether a lecture's own claims are true --- so I treated
every checkable historical or numeric claim across all twelve lectures,
six seminars, three assessments and the deck as its own thing to verify
against external sources, not just proofread. That pass found four real
errors and fixed all of them
([`aa717ae`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/aa717ae),
[`6e5d626`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/6e5d626)):
a Hemingway quote had silently dropped a word from the real *Death in
the Afternoon* line; two separate "N centuries later" claims (Maimonides
answering Pseudo-Dionysius, and Taleb's *Antifragile* naming the same
move) were each invented independently and each undercounted the actual
gap by three to four centuries, an error only visible by subtracting the
two real dates rather than checking each date alone; and two pages called
a `role: tutor` person a "convenor," a title only the other teacher
actually holds. None of those are catchable by a typecheck or a link
checker --- they're wrong in a way only a fact-check catches, which is how
I know the course's factual content is right, as distinct from knowing
the site renders.

Before treating any of it as done I ran `pnpm check` (typecheck, build,
axe accessibility, link/deck validation, and the vitest suite including
my own weight-sum test) clean, then walked the built `pnpm preview` site
with `agent-browser` at both desktop and the 390px mobile marking
viewport --- homepage, a lecture with its deck, an assessment, a person
page, the policies page, a seminar, and the mobile nav menu --- with a
clean console throughout, before stopping the preview server.

## Before you ship

This run is a mid-build checkpoint, not the final submission: the repo
stays private and unshipped, per this course's own doctrine that
publishing is a later, separate step.
