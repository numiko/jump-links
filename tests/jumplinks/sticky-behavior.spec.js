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
});
