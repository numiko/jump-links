import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jump-links Initialization', () => {
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

  it('should initialize without errors', () => {
    const jumpLinks = new JumpLinks();
    expect(jumpLinks).toBeInstanceOf(JumpLinks);
  });

  it('should throw an error if jump-links DOM elements are missing', () => {
    document.body.innerHTML = ''; // Clear the DOM
    expect(() => new JumpLinks()).toThrow();
  });

  it('should set initial ARIA hidden state', () => {
    new JumpLinks();
    const jumpLinksElement = document.querySelector('[data-js-jump-links]');
    expect(jumpLinksElement.getAttribute('aria-hidden')).toBe('true');
  });
});
