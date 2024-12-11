import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../../lib/Jumplinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jumplinks Progress Bar', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    mockIntersectionObserver();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should update progress bar correctly', () => {
    const jumplinks = new Jumplinks();

    // Mock necessary properties and scroll position
    Object.defineProperty(window, 'scrollY', { value: 500 });
    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumplinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 }) // -500 + scrollY(500) = 0
    });
    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumplinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 }) // 400 + scrollY(500) = 900
    });
    Object.defineProperty(jumplinks.endTrigger, 'offsetHeight', { value: 100 });

    jumplinks.state.isSticky = true;
    jumplinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jumplinks-progress');
    expect(progressValue).toBe('50.00%');
  });

  it('should not update progress bar when not sticky', () => {
    const jumplinks = new Jumplinks();
    jumplinks.state.isSticky = false;

    const originalValue = document.documentElement.style.getPropertyValue('--jumplinks-progress');
    jumplinks.updateProgressBar();

    expect(document.documentElement.style.getPropertyValue('--jumplinks-progress'))
      .toBe(originalValue);
  });

  it('should handle progress bar updates with custom offsets', () => {
    const jumplinks = new Jumplinks({
      stickyTriggerStartOffset: -100,
      stickyTriggerEndOffset: 100
    });

    Object.defineProperty(window, 'scrollY', { value: 600 });
    // Mock getBoundingClientRect for startTrigger
    Object.defineProperty(jumplinks.startTrigger, 'getBoundingClientRect', {
      value: () => ({ top: -500 }) // -500 + scrollY(600) = 100
    });
    // Mock getBoundingClientRect for endTrigger
    Object.defineProperty(jumplinks.endTrigger, 'getBoundingClientRect', {
      value: () => ({ top: 400 }) // 400 + scrollY(600) = 1000
    });
    Object.defineProperty(jumplinks.endTrigger, 'offsetHeight', { value: 100 });

    jumplinks.state.isSticky = true;
    jumplinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jumplinks-progress');
    expect(progressValue).toBe('50.00%');
  });
});
