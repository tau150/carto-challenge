import { useInterval } from "@/hooks";
import { renderHook } from "@/utils/testUtils";

vi.useFakeTimers();

const callback = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useInterval", () => {
  it("should call the callback after the specified delay", () => {
    const delay = 5000;

    renderHook(() => useInterval(callback, delay));

    vi.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should call the callback multiple times if the delay is passed", () => {
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    vi.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should call the callback with the default delay if a delay is not provided", () => {
    renderHook(() => useInterval(callback));

    vi.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should update the callback if it changes", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const delay = 1000;

    const { rerender } = renderHook(({ cb, dly }) => useInterval(cb, dly), {
      initialProps: { cb: callback1, dly: delay },
    });

    vi.advanceTimersByTime(delay);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    rerender({ cb: callback2, dly: delay });

    vi.advanceTimersByTime(delay);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it("should clear the interval on unmount", () => {
    const delay = 1000;

    const { unmount } = renderHook(() => useInterval(callback, delay));

    unmount();

    vi.advanceTimersByTime(delay);

    expect(callback).not.toHaveBeenCalled();
  });
});
