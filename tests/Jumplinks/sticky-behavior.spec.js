import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../../lib/Jumplinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jumplinks Sticky Behavior', () => {
  let window, document;

  // Add helper functions to update the start and end trigger positions
  // which are used to test the sticky behavior
  const updateStartTrigger = (jumplinks, startTop) => {
    Object.defineProperty(jumplinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: startTop })
    });
  };

  const updateEndTrigger = (jumplinks, endBottom) => {
    Object.defineProperty(jumplinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: endBottom })
    });
  };

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    mockIntersectionObserver();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle custom sticky trigger elements', () => {
    // Add custom trigger elements to DOM
    document.body.innerHTML += `
      <div id="customStart"></div>
      <div id="customEnd"></div>
    `;

    const jumplinks = new Jumplinks({
      stickyTriggerStart: '#customStart',
      stickyTriggerEnd: '#customEnd'
    });

    expect(jumplinks.startTrigger).toBe(document.querySelector('#customStart'));
    expect(jumplinks.endTrigger).toBe(document.querySelector('#customEnd'));
  });

  it('should handle custom sticky function', async () => {
    const customStickyFn = vi.fn();
    const jumplinks = new Jumplinks({
      stickyFunction: customStickyFn
    });

    // Simulate scroll that triggers sticky state
    Object.defineProperty(jumplinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -10 })
    });
    Object.defineProperty(jumplinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ bottom: 1000 })
    });

    jumplinks.updateNavVisibility();

    expect(customStickyFn).toHaveBeenCalledWith(jumplinks.jumpLinks, true);
  });

  it('should call onSticky callback when sticky', () => {
    const onStickyMock = vi.fn();
    const jumplinks = new Jumplinks();
    jumplinks.onSticky = onStickyMock;

    // Simulate scroll position that would trigger sticky state
    Object.defineProperty(jumplinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -10 })
    });
    Object.defineProperty(jumplinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ bottom: 1000 })
    });

    jumplinks.updateNavVisibility();
    expect(onStickyMock).toHaveBeenCalled();
  });

  it('should call onUnsticky callback when not sticky', () => {
    const onUnStickyMock = vi.fn();
    const jumplinks = new Jumplinks({
      onUnsticky: onUnStickyMock
    });

    // Create position tracking variables
    let startTop = -10;
    let endBottom = 1000;

    // Set initial positions
    updateStartTrigger(jumplinks, startTop);
    updateEndTrigger(jumplinks, endBottom);

    // First make it sticky
    jumplinks.updateNavVisibility();
    expect(jumplinks.state.isSticky).toBe(true);

    // Now simulate scrolling back up
    startTop = 100;  // Change to non-sticky position
    updateStartTrigger(jumplinks, startTop);  // Update the mock with new position
    jumplinks.updateNavVisibility();

    expect(jumplinks.state.isSticky).toBe(false);
    expect(onUnStickyMock).toHaveBeenCalled();
  });
});
