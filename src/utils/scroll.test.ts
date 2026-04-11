import { mock, test, expect, describe, beforeEach, afterEach } from "bun:test";
import { initSmoothScroll, getLenis, scrollTo, destroySmoothScroll } from "./scroll";

// Mock the module
mock.module("@studio-freight/lenis", () => {
  return {
    default: class MockLenis {
      options: Record<string, unknown>;
      raf = mock();
      scrollTo = mock();
      destroy = mock();
      constructor(options: Record<string, unknown>) {
        this.options = options;
      }
    }
  };
});

describe("scroll utils", () => {
  let originalRequestAnimationFrame: typeof window.requestAnimationFrame;

  beforeEach(() => {
    // Reset instance before each test
    destroySmoothScroll();

    // Mock requestAnimationFrame
    originalRequestAnimationFrame = global.requestAnimationFrame;
    (global as unknown as { requestAnimationFrame: typeof requestAnimationFrame }).requestAnimationFrame = mock((cb) => {
      return setTimeout(() => cb(Date.now()), 0) as unknown as number;
    });
  });

  afterEach(() => {
    destroySmoothScroll();
    global.requestAnimationFrame = originalRequestAnimationFrame;
  });

  test("getLenis returns null initially", () => {
    expect(getLenis()).toBeNull();
  });

  test("initSmoothScroll creates an instance with default options", () => {
    const instance = initSmoothScroll();
    expect(instance).toBeDefined();
    expect(getLenis()).toBe(instance);

    // Test the default options passed to MockLenis
    const mockInstance = instance as unknown as { options: Record<string, unknown> };
    expect(mockInstance.options).toBeDefined();
    expect(mockInstance.options.duration).toBe(1.2);
    expect(mockInstance.options.smoothWheel).toBe(true);
    expect(typeof mockInstance.options.easing).toBe("function");
  });

  test("initSmoothScroll merges custom options correctly", () => {
    const customOptions = { duration: 2.0, smoothTouch: true };
    const instance = initSmoothScroll(customOptions);

    const mockInstance = instance as unknown as { options: Record<string, unknown> };
    expect(mockInstance.options.duration).toBe(2.0);
    expect(mockInstance.options.smoothWheel).toBe(true);
    expect(mockInstance.options.smoothTouch).toBe(true);
  });

  test("initSmoothScroll returns the same instance if called multiple times (singleton)", () => {
    const instance1 = initSmoothScroll();
    const instance2 = initSmoothScroll();

    expect(instance1).toBe(instance2);
  });

  test("initSmoothScroll sets up requestAnimationFrame loop", () => {
    const rafMock = (global as unknown as { requestAnimationFrame: typeof requestAnimationFrame }).requestAnimationFrame;
    initSmoothScroll();

    expect(rafMock).toHaveBeenCalled();
  });

  test("scrollTo calls lenisInstance.scrollTo if instance exists", () => {
    const instance = initSmoothScroll();
    const target = "#some-element";
    const options = { offset: 100 };

    scrollTo(target, options);

    const mockInstance = instance as unknown as { scrollTo: ReturnType<typeof mock> };
    expect(mockInstance.scrollTo).toHaveBeenCalledWith(target, options);
  });

  test("scrollTo does nothing if no instance exists", () => {
    // Ensure no instance exists
    expect(getLenis()).toBeNull();

    // Should not throw
    expect(() => scrollTo("#some-element")).not.toThrow();
  });

  test("destroySmoothScroll calls lenisInstance.destroy and nullifies instance", () => {
    const instance = initSmoothScroll();
    const mockInstance = instance as unknown as { destroy: ReturnType<typeof mock> };

    destroySmoothScroll();

    expect(mockInstance.destroy).toHaveBeenCalled();
    expect(getLenis()).toBeNull();
  });

  test("destroySmoothScroll does nothing if no instance exists", () => {
    expect(getLenis()).toBeNull();

    // Should not throw
    expect(() => destroySmoothScroll()).not.toThrow();
  });

  test("requestAnimationFrame callback calls lenisInstance.raf", () => {
    let rafCallback: ((time: number) => void) | null = null;
    (global as unknown as { requestAnimationFrame: typeof requestAnimationFrame }).requestAnimationFrame = mock((cb) => {
      rafCallback = cb;
      return 1;
    });

    const instance = initSmoothScroll();
    expect(rafCallback).not.toBeNull();

    if (rafCallback) {
      (rafCallback as (time: number) => void)(1000);
    }

    const mockInstance = instance as unknown as { raf: ReturnType<typeof mock> };
    expect(mockInstance.raf).toHaveBeenCalledWith(1000);
  });
});
