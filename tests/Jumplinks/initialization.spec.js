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
    const jumplinks = new Jumplinks('[data-js-jumplinks]');
    expect(jumplinks).toBeInstanceOf(Jumplinks);
  });

  it('should throw an error if required DOM elements are missing', () => {
    document.body.innerHTML = ''; // Clear the DOM
    expect(() => new Jumplinks('[data-js-jumplinks]')).toThrow();
  });

  it('should correctly identify navigation links', () => {
    const jumplinks = new Jumplinks('[data-js-jumplinks]');
    expect(jumplinks.jumpLinksAnchors.length).toBeGreaterThanOrEqual(1);
  });

  it('should correctly identify corresponding sections', () => {
    const jumplinks = new Jumplinks('[data-js-jumplinks]');
    expect(jumplinks.sections.length).toBeGreaterThanOrEqual(1);
  });

  it('should set initial ARIA hidden state', () => {
    const jumplinks = new Jumplinks('[data-js-jumplinks]');
    const jumplinksElement = document.querySelector('[data-js-jumplinks]');
    expect(jumplinksElement.getAttribute('aria-hidden')).toBe('true');
  });
});
