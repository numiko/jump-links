import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jump-links Progress Bar', () => {
  let window, document;

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

  it('should add "--jump-links-progress" to document element when progress is true', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true
    });

    // Mock necessary properties and scroll position
    Object.defineProperty(window, 'scrollY', { value: 0 });

    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 0 })
    });

    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 1000 })
    });

    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    jumpLinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('0.00%');
  });

  it('should update progress bar correctly based on scroll position', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true
    });

    // Mock necessary properties and scroll position
    Object.defineProperty(window, 'scrollY', { value: 500 });

    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 }) // -500 + scrollY(500) = 0
    });

    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 }) // 400 + scrollY(500) = 900
    });

    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    jumpLinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('50.00%');
  });

  it('should not update CSS variable when progress is disabled', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: false
    });

    Object.defineProperty(window, 'scrollY', { value: 500 });
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    jumpLinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('');
  });

  it('clamps progress between 0 and 100 percent', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', { progress: true });

    // Case: below start -> 0%
    Object.defineProperty(window, 'scrollY', { value: 0 });
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 100 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 1000 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });
    jumpLinks.updateProgressBar();
    expect(document.documentElement.style.getPropertyValue('--jump-links-progress')).toBe('0.00%');

    // Case: beyond end -> 100%
    Object.defineProperty(window, 'scrollY', { value: 5000 });
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -1000 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -900 })
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });
    jumpLinks.updateProgressBar();
    expect(document.documentElement.style.getPropertyValue('--jump-links-progress')).toBe('100.00%');
  });


  it('should handle progress bar updates with custom offsets', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true,
      stickyTriggerStartOffset: -100,
      stickyTriggerEndOffset: 100
    });

    Object.defineProperty(window, 'scrollY', { value: 600 });
    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumpLinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 }) // -500 + scrollY(600) = 100
    });
    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumpLinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 }) // 400 + scrollY(600) = 1000
    });
    Object.defineProperty(jumpLinks.endTrigger, 'offsetHeight', { value: 100 });

    jumpLinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('50.00%');
  });
});
