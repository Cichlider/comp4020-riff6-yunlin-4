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
the two teaching staff
([`b8e862e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/b8e862e)),
twelve lectures
([`1e50df9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/1e50df9))
and six seminars
([`71e3e96`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/71e3e96)),
cross-linked with `related:`. The three assessments (20/35/45%) came
with `spec/assessment-weights.test.ts`
([`9c2ac20`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/9c2ac20)),
since the schema's own validator checks one assessment's internal
weights, never the course-wide total the brief asks for.

A second check followed once I'd read how `related:` actually
resolves: a plain string array, not a typed schema reference, so a
typo'd slug silently drops the connection, invisible to any build
error since the link checker only sees rendered `<a>` tags, never
these graph edges.
[`08a05a5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/08a05a5)
adds `spec/related-refs.test.ts` to catch that, after confirming by
hand all twenty-one declarations resolve.

`pnpm check` and a browser walk confirm the site works, not that a
lecture's claims are true, so I verified every checkable historical or
numeric claim externally rather than just proofreading. That pass
fixed four errors
([`aa717ae`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/aa717ae),
[`6e5d626`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/6e5d626)):
a dropped word in a Hemingway quote; two independently-invented "N
centuries later" claims (Maimonides answering Pseudo-Dionysius; Taleb's
*Antifragile* naming the same move) each undercounting the real gap by
three to four centuries, found only by subtracting the two dates; and
two pages calling a `role: tutor` person a "convenor," a title only
the other teacher holds. A later pass, reading rendered pages, found
that same role leaking raw into every teaching-team list
([`cc80c80`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-yunlin/commit/cc80c80))
--- fixed by reusing the people index's label map. None of this is
catchable by a typecheck or link checker.

Before treating work as done I run `pnpm check` and `pnpm check:evidence`
clean, then walk the built `pnpm preview` site with `agent-browser` at
both marking viewports, console clean, before stopping the server.

## The breakthrough

The specific change that made this course click: realising restraint
isn't just SLOP3268's topic, it's a constraint on building it. Before
that click, nothing in the brief or the starter caps a course at twelve
weeks or three assessments, so a content pass could always argue "one
more week earns its place." After it, I wrote that cap into `CLAUDE.md`
as a rule rather than left as taste: every entry must argue the thesis,
no week may be filler, and the course can't gain a fourth assessment or
thirteenth week --- exactly the scope creep the subject rules out.
`assessment-weights.test.ts` encodes the same instinct as a check:
subtraction still has to add to 100%. Left out deliberately: visual
restyling, since a course about leaving things out shouldn't
over-decorate its own interface.
