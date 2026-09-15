import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// `related:` is a plain `z.array(z.string())` in the shared schema, not a
// typed `reference()` like `teachers:` --- so a typo'd slug never fails a
// build or a typecheck. `getRelatedEntries` (astro-course-university's
// content-helpers) just drops any ref that doesn't resolve to a real pool
// entry, silently rendering fewer related links with no error anywhere.
// This check reads the same graph edges from source and catches that typo
// before it goes invisible.
const GRAPH_COLLECTIONS = ["lectures", "sessions", "assessments", "people"];

interface GraphNode {
  id: string;
  related: string[];
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

function loadGraph(): GraphNode[] {
  return GRAPH_COLLECTIONS.flatMap((collection) => {
    const dir = resolve("src/content", collection);
    return readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const source = readFileSync(resolve(dir, file), "utf8");
        return { id: `${collection}/${file.replace(/\.md$/, "")}`, related: parseRelated(source) };
      });
  });
}

describe("course graph edges", () => {
  const nodes = loadGraph();
  const validIds = new Set(nodes.map((node) => node.id));

  it("every declared related: ref points at a node that actually exists", () => {
    for (const node of nodes) {
      for (const ref of node.related) {
        expect(validIds.has(ref), `${node.id} declares related: ${ref}, which doesn't exist`).toBe(
          true,
        );
      }
    }
  });
});
