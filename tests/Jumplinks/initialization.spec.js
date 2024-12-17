import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/JumpLinks.js';
import { setupTestDOM, mockIntersectionObserver } from '../test-utils';

describe('Jump-links Initialization', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    mockIntersectionObserver();
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

  it('should correctly identify jump-links element', () => {
    const jumpLinks = new JumpLinks('[data-js-jump-links]');
    expect(jumpLinks.jumpLinksAnchors.length).toBeGreaterThanOrEqual(1);
  });

  it('should correctly identify corresponding sections', () => {
    const jumpLinks = new JumpLinks();
    expect(jumpLinks.sections.length).toBeGreaterThanOrEqual(1);
  });

  it('should set initial ARIA hidden state', () => {
    const jumpLinks = new JumpLinks();
    const jumpLinksElement = document.querySelector('[data-js-jump-links]');
    expect(jumpLinksElement.getAttribute('aria-hidden')).toBe('true');
  });
});
