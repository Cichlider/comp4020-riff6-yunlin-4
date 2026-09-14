import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

describe("assessment weights", () => {
  it("sums every published assessment's weight to exactly 100", () => {
    const assessments = api.nodes.filter((node) => node.type === "assessments");
    expect(assessments.length, "no assessments found in the built API").toBeGreaterThan(0);

    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, "assessment weights do not sum to 100").toBe(100);
  });
});
