import { describe, it, expect } from "vitest";
import { convertMillisecondsToTime, formatDate } from "./helpers";


describe("formatDate", () => {
  it("should format the date correctly as day/month/year", () => {
    const input = "2024-10-27T12:00:00Z";
    const expectedOutput = "27/10/2024";
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it("should handle invalid date strings", () => {
    const input = "invalid-date";
    const result = formatDate(input);
    expect(result).toBe("NaN/NaN/NaN");
  });
});

describe("convertMillisecondsToTime", () => {
  it("should convert milliseconds to hours, minutes, and seconds correctly", () => {
    const input = 3723000;
    const expectedOutput = "1:02:03";
    expect(convertMillisecondsToTime(input)).toBe(expectedOutput);
  });

  it("should correctly handle times less than an hour", () => {
    const input = 123000;
    const expectedOutput = "0:02:03";
    expect(convertMillisecondsToTime(input)).toBe(expectedOutput);
  });

  it("should correctly handle times less than a minute", () => {
    const input = 23000;
    const expectedOutput = "0:00:23";
    expect(convertMillisecondsToTime(input)).toBe(expectedOutput);
  });

  it("should handle zero milliseconds correctly", () => {
    const input = 0;
    const expectedOutput = "0:00:00";
    expect(convertMillisecondsToTime(input)).toBe(expectedOutput);
  });
});
