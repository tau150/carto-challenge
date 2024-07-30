import { Mock } from "vitest";
import { useFetchSources } from "../useFetchSources";
import { renderHook, waitFor } from "@/utils/testUtils";

global.fetch = vi.fn();

describe("useFetchSources", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return data from cache if available", async () => {
    const mockData = [{ type: "FeatureCollection", features: [] }];
    const sourcesList = ["https://valid-url.com"];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData[0],
    });

    const { result } = renderHook(() => useFetchSources(sourcesList));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.errors).toEqual([]);

    const { result: cachedResult } = renderHook(() => useFetchSources(sourcesList));

    expect(cachedResult.current.isLoading).toBe(false);
    expect(cachedResult.current.data).toEqual(mockData);
    expect(cachedResult.current.errors).toEqual([]);
  });

  it("should fetch data and update state correctly", async () => {
    const mockData = [{ type: "FeatureCollection", features: [] }];
    const sourcesList = ["https://valid-url-1.com"];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData[0],
    });

    const { result } = renderHook(() => useFetchSources(sourcesList));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.errors).toEqual([]);
  });

  it("should handle invalid URLs correctly", async () => {
    const sourcesList = ["invalid-url"];

    const { result } = renderHook(() => useFetchSources(sourcesList));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.errors).toEqual([
      { url: "invalid-url", error: "invalid URL: invalid-url" },
    ]);
  });

  it("should handle fetch errors correctly", async () => {
    const VALID_URL = "https://valid-url-3.com";
    const sourcesList = [VALID_URL];

    (fetch as Mock).mockRejectedValueOnce(new Error("Fetch failed"));

    const { result } = renderHook(() => useFetchSources(sourcesList));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.errors).toEqual([{ url: VALID_URL, error: "Fetch failed" }]);
  });
});
