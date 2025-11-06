import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.ts';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jump-links Progress Bar', () => {
  let window, document;
  let scrollPosition;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    scrollPosition = 0;

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => scrollPosition,
      set: value => {
        scrollPosition = value;
      }
    });

    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      get: () => scrollPosition,
      set: value => {
        scrollPosition = value;
      }
    });

    window.scrollTo = (_, y) => {
      scrollPosition = y;
      document.dispatchEvent(new window.Event('scroll'));
    };

    window.requestAnimationFrame = (cb) => window.setTimeout(() => cb(0), 0);

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

  const simulateScroll = async (y) => {
    window.scrollTo(0, y);
    await new Promise(resolve => window.setTimeout(resolve, 0));
  };

  it('should add "--jump-links-progress" to document element when progress is true', async () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true
    });

    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 0 })
    });

    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 1000 })
    });

    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    await simulateScroll(0);

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('0.00%');
  });

  it('should update progress bar correctly based on scroll position', async () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true
    });

    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 }) // -500 + scrollY(500) = 0
    });

    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 }) // 400 + scrollY(500) = 900
    });

    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    await simulateScroll(500);

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('50.00%');
  });

  it('should not update CSS variable when progress is disabled', async () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: false
    });

    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    await simulateScroll(500);

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('');
  });

  it('clamps progress between 0 and 100 percent', async () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', { progress: true });

    // Case: below start -> 0%
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 100 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 1000 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });
    await simulateScroll(0);
    expect(document.documentElement.style.getPropertyValue('--jump-links-progress')).toBe('0.00%');

    // Case: beyond end -> 100%
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -1000 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -900 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });
    await simulateScroll(5000);
    expect(document.documentElement.style.getPropertyValue('--jump-links-progress')).toBe('100.00%');
  });


  it('should handle progress bar updates with custom offsets', async () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true,
      stickyTriggerStartOffset: -100,
      stickyTriggerEndOffset: 100
    });

    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 }) // -500 + scrollY(600) = 100
    });
    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 }) // 400 + scrollY(600) = 1000
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    await simulateScroll(600);

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('50.00%');
  });
});
