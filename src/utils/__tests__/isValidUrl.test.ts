import { isValidUrl } from "../isValidUrl";

describe("isValidUrl", () => {
  it("should return true for a valid URL", () => {
    expect(isValidUrl("https://www.example.com")).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    expect(isValidUrl("not-a-valid-url")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(isValidUrl("")).toBe(false);
  });
});
