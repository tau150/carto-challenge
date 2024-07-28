import { useLocalStorage } from "../useLocalStorage";
import { renderHook, act } from "@/utils/testUtils";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return initial value if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initialValue"));

    expect(result.current[0]).toBe("initialValue");
  });

  it("should return stored value if localStorage has a value", () => {
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));

    const { result } = renderHook(() => useLocalStorage("testKey", "initialValue"));

    expect(result.current[0]).toBe("storedValue");
  });

  it("should store new value in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initialValue"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(window.localStorage.getItem("testKey")).toBe(JSON.stringify("newValue"));
  });

  it("should handle function value and store it in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(window.localStorage.getItem("testKey")).toBe(JSON.stringify(2));
  });

  it("should throw an error if there is an issue with localStorage", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage quota exceeded");
    });

    const { result } = renderHook(() => useLocalStorage("testKey", "initialValue"));

    act(() => {
      expect(() => result.current[1]("newValue")).toThrowError(
        "Error saving in local storage with key testKey",
      );
    });
  });
});
