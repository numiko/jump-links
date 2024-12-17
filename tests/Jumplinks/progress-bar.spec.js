import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/JumpLinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jump-links Progress Bar', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    mockIntersectionObserver();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should update progress bar correctly', () => {
    const jumpLinks = new JumpLinks();

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

    jumpLinks.state.isSticky = true;
    jumpLinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('50.00%');
  });

  it('should not update progress bar when not sticky', () => {
    const jumpLinks = new JumpLinks();
    jumpLinks.state.isSticky = false;

    const originalValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    jumpLinks.updateProgressBar();

    expect(document.documentElement.style.getPropertyValue('--jump-links-progress'))
      .toBe(originalValue);
  });

  it('should handle progress bar updates with custom offsets', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
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

    jumpLinks.state.isSticky = true;
    jumpLinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jump-links-progress');
    expect(progressValue).toBe('50.00%');
  });
});
