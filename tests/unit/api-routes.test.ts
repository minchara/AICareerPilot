import { describe, it, expect } from "vitest";
import { getScoreColor, getScoreLabel, formatFileSize, truncate } from "../../src/lib/utils";

describe("Utility and Business Logic Tests", () => {
  it("getScoreColor returns correct Tailwind color classes based on thresholds", () => {
    expect(getScoreColor(95)).toBe("text-green-600");
    expect(getScoreColor(80)).toBe("text-green-600");
    expect(getScoreColor(75)).toBe("text-yellow-600");
    expect(getScoreColor(60)).toBe("text-yellow-600");
    expect(getScoreColor(50)).toBe("text-orange-600");
    expect(getScoreColor(30)).toBe("text-red-600");
  });

  it("getScoreLabel returns descriptive human-readable assessment", () => {
    expect(getScoreLabel(92)).toBe("Excellent");
    expect(getScoreLabel(85)).toBe("Very Good");
    expect(getScoreLabel(72)).toBe("Good");
    expect(getScoreLabel(65)).toBe("Fair");
    expect(getScoreLabel(55)).toBe("Needs Improvement");
    expect(getScoreLabel(35)).toBe("Needs Significant Improvement");
  });

  it("formatFileSize formats bytes correctly", () => {
    expect(formatFileSize(0)).toBe("0 Bytes");
    expect(formatFileSize(1024)).toBe("1 KB");
    expect(formatFileSize(1024 * 1024 * 2.5)).toBe("2.5 MB");
  });

  it("truncate limits string length with ellipsis", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
    expect(truncate("Short", 10)).toBe("Short");
  });
});
