import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The same bug shape session-chronology.test.ts guards against (a page
// referencing material that, by the site's own calendar, hasn't happened
// yet) applies equally to an assessment's `related:` lectures/sessions
// against its own `due` date --- an assessment that cites a lecture due
// after the assessment itself would be asking students to engage with
// material they can't have seen yet. Checked by hand across all three
// assessments (clean, nothing to fix), written up as a permanent guard so
// a future week/date change can't reintroduce it silently.

interface DueNode {
  id: string;
  due: string;
  related: string[];
}

interface DatedNode {
  id: string;
  date: string;
}

function frontmatterOf(source: string): string {
  return source.split(/^---$/m)[1] ?? "";
}

function parseField(source: string, field: string): string {
  return frontmatterOf(source).match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
}

function parseRelated(source: string): string[] {
  const block = frontmatterOf(source).match(/^related:\n((?:[ \t]+-.*\n?)*)/m)?.[1] ?? "";
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function loadFiles(collection: string): { id: string; source: string }[] {
  const dir = resolve("src/content", collection);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      id: `${collection}/${file.replace(/\.md$/, "")}`,
      source: readFileSync(resolve(dir, file), "utf8"),
    }));
}

describe("assessment chronology", () => {
  const assessments: DueNode[] = loadFiles("assessments").map(({ id, source }) => ({
    id,
    due: parseField(source, "due"),
    related: parseRelated(source),
  }));

  const datedNodes: DatedNode[] = [
    ...loadFiles("lectures").map(({ id, source }) => ({ id, date: parseField(source, "date") })),
    ...loadFiles("sessions").map(({ id, source }) => ({ id, date: parseField(source, "date") })),
  ];
  const dateOf = new Map(datedNodes.map((node) => [node.id, node.date]));

  it("never asks an assessment to reference a lecture or session that hasn't happened yet", () => {
    for (const assessment of assessments) {
      for (const ref of assessment.related) {
        const refDate = dateOf.get(ref);
        if (!refDate) continue; // not a lecture/session ref --- out of scope here
        expect(
          assessment.due >= refDate,
          `${assessment.id} (due ${assessment.due}) relates to ${ref} (${refDate}), which hasn't happened yet`,
        ).toBe(true);
      }
    }
  });
});
