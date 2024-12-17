import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/JumpLinks.js';
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

    const jumplinks = new JumpLinks('[data-js-jump-links]', {
      stickyTriggerStart: '#customStart',
      stickyTriggerEnd: '#customEnd'
    });

    expect(jumplinks.startTrigger).toBe(document.querySelector('#customStart'));
    expect(jumplinks.endTrigger).toBe(document.querySelector('#customEnd'));
  });

  it('should handle custom onStickyTrigger function', async () => {
    const customStickyFn = vi.fn();
    const jumplinks = new JumpLinks('[data-js-jump-links]', {
      onStickyTrigger: customStickyFn
    });

    // Simulate scroll that triggers sticky state
    Object.defineProperty(jumplinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -10 })
    });
    Object.defineProperty(jumplinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ bottom: 1000 })
    });

    jumplinks.updateNavVisibility();

    expect(customStickyFn).toHaveBeenCalledWith({
      jumpLinks: jumplinks.jumpLinks,
      isSticky: jumplinks.state.isSticky,
      hasStartTriggered:true,
      hasEndTriggered:false
    });
  });
});
