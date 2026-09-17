# Process overview

## What I built

SLOP3268, *Via Negativa: Practices of Subtraction* --- a twelve-week studio
that takes one discipline's version of "leaving something out" per week
(apophatic theology, literati ink painting, musical silence, minimalist
fiction, film editing, architecture, graphic design, null results,
mathematics, political omission) and closes on a week that turns the
course's own thesis on itself. Restraint isn't a single trick, it's a
family of moves different fields each independently formalised, and a
student who's seen six versions of it should start noticing the
seventh unprompted.

## How I got here

I picked the subject before touching any code
([`93d3adc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/93d3adc)),
since the subject choice is itself where a course's argument lives, not
a precondition to it. Subtraction-across-disciplines let me extend an
existing aesthetic interest of mine (Ni Zan's "taste is what you leave
out") into course *content* rather than visual style, since this
template's branding is fixed and the usual "open look" move wasn't
available.

Content came in dependency order: the course record and
`sessions → seminars` label first
([`93d3adc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/93d3adc)),
then the homepage and artwork
([`ab3721d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/ab3721d)),
then the two teaching staff
([`b8e862e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/b8e862e))
so lectures/seminars had someone to reference, then the twelve
lectures
([`1e50df9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/1e50df9))
and six seminars
([`71e3e96`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/71e3e96)),
cross-linked with `related:`. The three assessments (20/35/45%) came
with a check
([`9c2ac20`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/9c2ac20)):
`spec/assessment-weights.test.ts`, because the schema's own
weighted-marking validator only checks one assessment's *internal*
criteria sum to 100, never the course-wide total the brief actually
asks a course to keep.

A second such check followed once I'd read how `related:` actually
resolves: it's a plain string array, not a typed schema reference, so a
typo'd slug silently drops that connection, invisible to any build
error or broken link --- the astro build's own link checker only sees
rendered `<a>` tags, never these graph edges.
[`08a05a5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/08a05a5)
adds `spec/related-refs.test.ts` to catch that typo before it goes
invisible, after confirming by hand that all twenty-one current
`related:` declarations resolve.

`pnpm check` and a browser walk answer "does the site work," but not
whether a lecture's own claims are true, so I treated every checkable
historical or numeric claim across the lectures, seminars, assessments
and deck as its own thing to verify externally, not just proofread.
That pass found and fixed four real errors
([`aa717ae`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/aa717ae),
[`6e5d626`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/6e5d626)):
a Hemingway quote had silently dropped a word; two separate "N
centuries later" claims (Maimonides answering Pseudo-Dionysius, and
Taleb's *Antifragile* naming the same move) were each invented
independently and each undercounted the real gap by three to four
centuries, visible only by subtracting the two dates, not checking
each alone; and two pages called a `role: tutor` person a "convenor," a
title only the other teacher holds. A later pass, reading rendered
pages rather than source, found the same role leaking raw into every
lecture/seminar page's teaching-team list
([`cc80c80`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/cc80c80))
--- fixed by reusing the people index's label map. None of this is
catchable by a typecheck or link checker --- it's wrong in a way only a
fact-check or live read catches, which is how I know the content is
right, distinct from knowing the site renders.

Before treating work as done I run `pnpm check` (typecheck, build, axe
accessibility, link/deck validation, the vitest suite) and
`pnpm check:evidence` clean, then walk the built `pnpm preview` site
with `agent-browser` at both marking viewports, console clean, before
stopping the server.

## Before you ship

This run is a mid-build checkpoint, not the final submission: the repo
stays private and unshipped, per this course's own doctrine that
publishing is a later, separate step.
