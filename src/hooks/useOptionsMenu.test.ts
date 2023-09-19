import { act, renderHook } from "@testing-library/react";

import { useOptionsMenu } from "./useOptionsMenu";

describe("initalStateがfalseの時", () => {
  it("toggle関数を1回実行すると、trueになる", () => {
    const { result } = renderHook(() => useOptionsMenu());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  it("toggle関数を2回実行すると、falseになる", () => {
    const { result } = renderHook(() => useOptionsMenu());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });
});

describe("initalStateがtrueの時", () => {
  it("toggle関数を1回実行すると、falseになる", () => {
    const { result } = renderHook(() => useOptionsMenu(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it("toggle関数を2回実行すると、trueになる", () => {
    const { result } = renderHook(() => useOptionsMenu(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });
});
