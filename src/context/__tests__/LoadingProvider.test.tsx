import { render, screen, act, cleanup } from "@testing-library/react";
import { expect, test, describe, afterEach, vi } from "bun:test";
import { LoadingProvider, useLoading } from "../LoadingProvider";
import React from "react";

const TestComponent = () => {
  const { isLoading, setIsLoading, setLoading } = useLoading();

  return (
    <div>
      <div data-testid="is-loading">{String(isLoading)}</div>
      <button onClick={() => setIsLoading(false)}>Set Loaded</button>
      <button onClick={() => setLoading(50)}>Set Progress 50</button>
      <button onClick={() => setLoading(100)}>Set Progress 100</button>
    </div>
  );
};

// Also test that context value has correct reference
const ContextRefComponent = () => {
  const context = useLoading();
  return <div data-testid="context-keys">{Object.keys(context).join(',')}</div>;
};

describe("LoadingProvider", () => {
  afterEach(() => {
    cleanup();
  });

  test("provides default loading state", () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByTestId("is-loading").textContent).toBe("true");
  });

  test("updates isLoading when setIsLoading is called", () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByTestId("is-loading").textContent).toBe("true");

    act(() => {
      screen.getByText("Set Loaded").click();
    });

    expect(screen.getByTestId("is-loading").textContent).toBe("false");
  });

  test("can call setLoading without errors", () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    // Call setLoading to ensure it doesn't crash
    act(() => {
      screen.getByText("Set Progress 50").click();
    });

    act(() => {
      screen.getByText("Set Progress 100").click();
    });

    // Test passes if no errors are thrown during the calls
    expect(true).toBe(true);
  });

  test("throws error when useLoading is used outside provider", () => {
    // Suppress console.error for the expected error
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useLoading must be used within a LoadingProvider");

    console.error = originalError;
  });

  test("provides expected context methods", () => {
    render(
      <LoadingProvider>
        <ContextRefComponent />
      </LoadingProvider>
    );

    const keys = screen.getByTestId("context-keys").textContent?.split(',') || [];
    expect(keys).toContain("isLoading");
    expect(keys).toContain("setIsLoading");
    expect(keys).toContain("setLoading");
  });
});
