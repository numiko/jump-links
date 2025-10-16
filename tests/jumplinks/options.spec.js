import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.js';
import { setupTestDOM } from '../test-utils';

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

  it('merges provided options with defaults', () => {
    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (el) => callback([{ isIntersecting: true, target: el }]),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jumpLinks = new JumpLinks('[data-js-jump-links]', {
      progress: true,
      stickyTriggerStartOffset: 5,
      stickyTriggerEndOffset: () => 10,
      onStickyTrigger: ['foo', 'bar'],
    });

    expect(jumpLinks.options.progress).toBe(true);
    expect(jumpLinks.state.startOffset).toBe(5);
    expect(jumpLinks.state.endOffset).toBe(10);
    expect(Array.isArray(jumpLinks.options.onStickyTrigger)).toBe(true);
    expect(jumpLinks.options.onStickyTrigger).toEqual(['foo', 'bar']);
  });

  it('accepts selector strings and element references for sticky triggers', () => {
    document.body.innerHTML += `
      <div id="customStart"></div>
      <div id="customEnd"></div>
    `;

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (el) => callback([{ isIntersecting: true, target: el }]),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const customStart = document.getElementById('customStart');
    const customEnd = document.getElementById('customEnd');

    const bySelector = new JumpLinks('[data-js-jump-links]', {
      stickyTriggerStart: '#customStart',
      stickyTriggerEnd: '#customEnd'
    });
    expect(bySelector.startTrigger).toBe(customStart);
    expect(bySelector.endTrigger).toBe(customEnd);

    const byElement = new JumpLinks('[data-js-jump-links]', {
      stickyTriggerStart: customStart,
      stickyTriggerEnd: customEnd
    });
    expect(byElement.startTrigger).toBe(customStart);
    expect(byElement.endTrigger).toBe(customEnd);
  });

  it('applies numeric and function offsets to state', () => {
    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (el) => callback([{ isIntersecting: true, target: el }]),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jl = new JumpLinks('[data-js-jump-links]', {
      stickyTriggerStartOffset: 10,
      stickyTriggerEndOffset: () => 20,
    });

    expect(jl.state.startOffset).toBe(10);
    expect(jl.state.endOffset).toBe(20);
  });

  it('passes intersectionOptions to IntersectionObserver', () => {
    const customOptions = { threshold: 0.5, rootMargin: '0px 0px -25% 0px' };
    let receivedOptions;

    const MockIntersectionObserver = vi.fn((callback, options) => {
      receivedOptions = options;
      return {
        observe: (el) => callback([{ isIntersecting: true, target: el }]),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    new JumpLinks('[data-js-jump-links]', { intersectionOptions: customOptions });
    expect(receivedOptions).toEqual(customOptions);
  });

  it('supports onStickyTrigger as array of class names', () => {
    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (el) => callback([{ isIntersecting: true, target: el }]),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jl = new JumpLinks('[data-js-jump-links]', {
      onStickyTrigger: ['is-visible', 'raised']
    });

    Object.defineProperty(jl.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -1 })
    });
    Object.defineProperty(jl.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: 1000 })
    });

    jl.updateNavVisibility();
    expect(jl.jumpLinks.classList.contains('is-visible')).toBe(true);
    expect(jl.jumpLinks.classList.contains('raised')).toBe(true);

    // Now set to not sticky and verify classes are removed
    Object.defineProperty(jl.startTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 10 })
    });
    Object.defineProperty(jl.endTrigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ bottom: -100 })
    });
    jl.updateNavVisibility();
    expect(jl.jumpLinks.classList.contains('is-visible')).toBe(false);
    expect(jl.jumpLinks.classList.contains('raised')).toBe(false);
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

  it('throws when progress option is not boolean', () => {
    // Prevent async init from running to avoid unhandled rejection
    vi.spyOn(JumpLinks.prototype, 'init').mockImplementation(async () => {});
    const jl = new JumpLinks('[data-js-jump-links]', { progress: 'yes' });
    expect(() => jl.validateElements()).toThrow();
  });
});
