import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('JumpLinks Sticky Behavior', () => {
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
    class MockResizeObserver {
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
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

    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      stickyTriggerStart: '#customStart',
      stickyTriggerEnd: '#customEnd'
    });

    expect(jumpLinks.startTrigger).toBe(document.querySelector('#customStart'));
    expect(jumpLinks.endTrigger).toBe(document.querySelector('#customEnd'));
  });

  it('should handle custom onStickyTrigger function', async () => {
    const customStickyFn = vi.fn();
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      onStickyTrigger: customStickyFn
    });

    // Simulate scroll that triggers sticky state
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -10 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ bottom: 1000 })
    });

    jumpLinks.updateNavVisibility();

    expect(customStickyFn).toHaveBeenCalledWith({
      jumpLinks: jumpLinks.jumpLinks,
      isSticky: jumpLinks.state.isSticky,
      hasStartTriggered:true,
      hasEndTriggered:false
    });
  });

  it('should toggle aria-hidden based on sticky state', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]');

    // Initially hidden
    expect(jumpLinks.jumpLinks.getAttribute('aria-hidden')).toBe('true');

    // Make sticky
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -1 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: 1000 })
    });
    jumpLinks.updateNavVisibility();
    expect(jumpLinks.jumpLinks.getAttribute('aria-hidden')).toBe('false');

    // Not sticky
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 10 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: -100 })
    });
    jumpLinks.updateNavVisibility();
    expect(jumpLinks.jumpLinks.getAttribute('aria-hidden')).toBe('true');
  });

  it('should respect start and end trigger offsets when determining sticky state', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      stickyTriggerStartOffset: 100,
      stickyTriggerEndOffset: 50
    });

    // startTop + startOffset <= 0 to be sticky
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -120 }) // -120 + 100 = -20 <= 0
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: 100 }) // 100 < -50? false
    });
    jumpLinks.updateNavVisibility();
    expect(jumpLinks.state.isSticky).toBe(true);

    // end triggers when bottom < -endOffset
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: -60 }) // -60 < -50 => true
    });
    jumpLinks.updateNavVisibility();
    expect(jumpLinks.state.isSticky).toBe(false);
  });
});
