import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../../lib/Jumplinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jumplinks Initialization', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    mockIntersectionObserver();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize without errors', () => {
    const jumplinks = new Jumplinks();
    expect(jumplinks).toBeInstanceOf(Jumplinks);
  });

  it('should throw an error if jumplinks DOM elements are missing', () => {
    document.body.innerHTML = ''; // Clear the DOM
    expect(() => new Jumplinks()).toThrow();
  });

  it('should correctly identify jumplinks element', () => {
    const jumplinks = new Jumplinks('[data-js-jump-links]');
    expect(jumplinks.jumpLinksAnchors.length).toBeGreaterThanOrEqual(1);
  });

  it('should correctly identify corresponding sections', () => {
    const jumplinks = new Jumplinks();
    expect(jumplinks.sections.length).toBeGreaterThanOrEqual(1);
  });

  it('should set initial ARIA hidden state', () => {
    const jumplinks = new Jumplinks();
    const jumplinksElement = document.querySelector('[data-js-jump-links]');
    expect(jumplinksElement.getAttribute('aria-hidden')).toBe('true');
  });
});
