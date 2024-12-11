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
    Object.defineProperty(jumplinks.startTrigger, 'offsetTop', { value: 0 });
    Object.defineProperty(jumplinks.endTrigger, 'offsetTop', { value: 900 });
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
    Object.defineProperty(jumplinks.startTrigger, 'offsetTop', { value: 100 });
    Object.defineProperty(jumplinks.endTrigger, 'offsetTop', { value: 1000 });
    Object.defineProperty(jumplinks.endTrigger, 'offsetHeight', { value: 100 });

    jumplinks.state.isSticky = true;
    jumplinks.updateProgressBar();

    const progressValue = document.documentElement.style.getPropertyValue('--jumplinks-progress');
    expect(progressValue).toBe('50.00%');
  });
});
