import { hoge } from "./useDutchTreat";
import { test, describe, expect } from "vitest";

describe("use-dutch-treat", () => {
  test("お試し", () => {
    expect(hoge()).toBe(1);
  });
});
