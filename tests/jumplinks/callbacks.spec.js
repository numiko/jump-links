import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.js';
import { setupTestDOM } from '../test-utils.js';

describe('Jump-links Options', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    // Ensure ResizeObserver exists in test environment
    class MockResizeObserver {
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls onLinkClick with link and target', () => {
    const onLinkClick = vi.fn();

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (el) => callback([{ isIntersecting: true, target: el }]),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jl = new JumpLinks('[data-js-jump-links]', { onLinkClick });

    const link = document.querySelector('[data-js-jump-links-anchor]');
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView = vi.fn();
    target.focus = vi.fn();

    link.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

    expect(onLinkClick).toHaveBeenCalledTimes(1);
    const args = onLinkClick.mock.calls[0][0];
    expect(args.link).toBe(link);
    expect(args.target).toBe(target);
  });
});
