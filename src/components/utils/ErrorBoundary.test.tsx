import { render, screen } from '@testing-library/react';
import { expect, test, describe, beforeEach, afterEach, mock } from 'bun:test';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    originalConsoleError = console.error;
    console.error = mock(); // suppress console.error during expected errors
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test('renders children successfully when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).not.toBeNull();
    expect(screen.getByTestId('child').textContent).toBe('Child Content');
  });

  test('renders default fallback when a child throws an error', () => {
    const ThrowErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    // Verify fallback UI text
    const fallbackText = screen.getByText('⚠️ 3D Visuals failed to load (WebGL issue).');
    expect(fallbackText).not.toBeNull();
  });

  test('renders custom fallback when provided and a child throws an error', () => {
    const ThrowErrorComponent = () => {
      throw new Error('Test error');
    };

    const CustomFallback = <div data-testid="custom-fallback">Custom Error View</div>;

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    // Verify custom fallback UI
    expect(screen.getByTestId('custom-fallback')).not.toBeNull();
    expect(screen.getByTestId('custom-fallback').textContent).toBe('Custom Error View');
  });
});
