import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// A seminar that asks students to have already engaged with a lecture (e.g.
// "read the two set lectures back to back") is broken if that lecture hasn't
// been delivered yet by the seminar's own date --- a real bug this test
// caught once: `painting-and-silence` (week 3) related to `lectures/week-04`,
// whose date fell five days *after* the session's. Nothing else checks this:
// `data-integrity.test.ts` only bounds dates to the teaching period, and
// `related-refs.test.ts` only checks a related id resolves, not that it
// resolves to something already in the past relative to the referencing page.

interface FrontmatterNode {
  id: string;
  date: string;
  related: string[];
}

function parseField(source: string, field: string): string {
  const frontmatter = source.split(/^---$/m)[1] ?? "";
  return frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
}

function parseRelated(source: string): string[] {
  const frontmatter = source.split(/^---$/m)[1] ?? "";
  const block = frontmatter.match(/^related:\n((?:[ \t]+-.*\n?)*)/m)?.[1] ?? "";
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function loadDated(collection: string, dateField: string): FrontmatterNode[] {
  const dir = resolve("src/content", collection);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(resolve(dir, file), "utf8");
      return {
        id: `${collection}/${file.replace(/\.md$/, "")}`,
        date: parseField(source, dateField),
        related: parseRelated(source),
      };
    });
}

describe("session chronology", () => {
  const sessions = loadDated("sessions", "date");
  const lectures = loadDated("lectures", "date");
  const lectureDates = new Map(lectures.map((lecture) => [lecture.id, lecture.date]));

  it("never asks a session to reference a lecture that hasn't happened yet", () => {
    for (const session of sessions) {
      for (const ref of session.related) {
        const lectureDate = lectureDates.get(ref);
        if (!lectureDate) continue; // not a lecture ref (e.g. an assessment) --- out of scope here
        expect(
          session.date >= lectureDate,
          `${session.id} (${session.date}) relates to ${ref} (${lectureDate}), which hasn't happened yet`,
        ).toBe(true);
      }
    }
  });
});
