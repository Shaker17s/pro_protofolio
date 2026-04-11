import { render, fireEvent, act, cleanup } from "@testing-library/react";
import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { useMagnetic } from "./useMagnetic";
import React from "react";
import gsap from "gsap";

GlobalRegistrator.register();

// Mock gsap quickTo
const mockQuickTo = mock(() => {
  return mock(() => {});
});
gsap.quickTo = mockQuickTo;

describe("useMagnetic", () => {
  beforeEach(() => {
    mockQuickTo.mockClear();

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = () => ({
      width: 100,
      height: 100,
      top: 50,
      left: 50,
      bottom: 150,
      right: 150,
      x: 50,
      y: 50,
      toJSON: () => {}
    });
  });

  afterEach(() => {
    cleanup();
  });

  function TestComponent() {
    const ref = useMagnetic();
    return <div ref={ref} data-testid="magnetic-el">Test</div>;
  }

  test("should setup gsap quickTo on mount", () => {
    render(<TestComponent />);

    expect(mockQuickTo).toHaveBeenCalledTimes(2);
    expect(mockQuickTo.mock.calls[0][1]).toBe("x");
    expect(mockQuickTo.mock.calls[1][1]).toBe("y");
  });

  test("should move element when mouse is close", () => {
    const xTo = mock();
    const yTo = mock();
    mockQuickTo.mockImplementation((_el: unknown, prop: string) => prop === "x" ? xTo : yTo);

    render(<TestComponent />);

    // Target element center is at x: 100, y: 100
    // Mouse at 120, 120 is close enough (distance < 100)
    act(() => {
      fireEvent.mouseMove(window, { clientX: 120, clientY: 120 });
    });

    expect(xTo).toHaveBeenCalled();
    expect(yTo).toHaveBeenCalled();
    // 120 - 100 = 20 * 0.35 = 7
    expect(xTo.mock.calls[0][0]).toBe(7);
    expect(yTo.mock.calls[0][0]).toBe(7);
  });

  test("should reset element when mouse is far away", () => {
    const xTo = mock();
    const yTo = mock();
    mockQuickTo.mockImplementation((_el: unknown, prop: string) => prop === "x" ? xTo : yTo);

    render(<TestComponent />);

    // Mouse far away
    act(() => {
      fireEvent.mouseMove(window, { clientX: 300, clientY: 300 });
    });

    expect(xTo).toHaveBeenCalledWith(0);
    expect(yTo).toHaveBeenCalledWith(0);
  });

  test("should reset element on mouseLeave", () => {
    const xTo = mock();
    const yTo = mock();
    mockQuickTo.mockImplementation((_el: unknown, prop: string) => prop === "x" ? xTo : yTo);

    const { getByTestId } = render(<TestComponent />);
    const el = getByTestId("magnetic-el");

    act(() => {
      fireEvent.mouseLeave(el);
    });

    expect(xTo).toHaveBeenCalledWith(0);
    expect(yTo).toHaveBeenCalledWith(0);
  });

  test("should clean up event listeners on unmount", () => {
    const removeEventListenerSpy = mock();
    const originalRemoveEventListener = window.removeEventListener;
    window.removeEventListener = removeEventListenerSpy;

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(removeEventListenerSpy.mock.calls.some(call => call[0] === 'mousemove')).toBe(true);

    window.removeEventListener = originalRemoveEventListener;
  });
});
