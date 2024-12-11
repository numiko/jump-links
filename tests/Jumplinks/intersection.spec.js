import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../../lib/Jumplinks.js';
import { setupTestDOM, delay, mockIntersectionObserver } from '../test-utils';

describe('Jumplinks Intersection Behavior', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
    mockIntersectionObserver();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make the first link active when the first section triggers intersection', async () => {
    const jumplinksElement = document.querySelector('[data-js-jumplinks]');
    const firstJumplinkLink = jumplinksElement.querySelector('a[href="#section1"]');
    const firstJumplinkSection = document.getElementById('section1');

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (element) => {
        if (element === firstJumplinkSection) {
          callback([{
            isIntersecting: true,
            target: firstJumplinkSection
          }]);
        }
      },
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jumplinks = new Jumplinks();
    await delay(0);

    expect(firstJumplinkLink.classList.contains('underline')).toBe(true);
  });

  it('should correctly update the label to show the active section', async () => {
    const jumplinksElement = document.querySelector('[data-js-jumplinks]');
    const jumpLinkLabel = jumplinksElement.querySelector('[data-js-jumplinks-label]');
    const secondJumplinkSection = document.getElementById('section2');

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (element) => {
        if (element === secondJumplinkSection) {
          callback([{
            isIntersecting: true,
            target: secondJumplinkSection
          }]);
        }
      },
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jumplinks = new Jumplinks({
      onIntersection: (section) => {
        if (jumpLinkLabel) {
          jumpLinkLabel.textContent = section.querySelector('h2')?.textContent || section.id;
        }
      }
    });

    await delay(0);
    expect(jumpLinkLabel.textContent).toBe('Section 2');
  });

  it('should handle multiple sections intersecting', async () => {
    const jumplinksElement = document.querySelector('[data-js-jumplinks]');
    const sections = Array.from(document.querySelectorAll('section'));
    let observerCallback;

    const MockIntersectionObserver = vi.fn((callback) => {
      observerCallback = callback;
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jumplinks = new Jumplinks();
    await delay(0);

    // Simulate multiple sections intersecting
    observerCallback([{
      isIntersecting: true,
      target: sections[0],
      boundingClientRect: { top: 0 }
    }]);

    // Should use the first intersecting section
    const firstLink = jumplinksElement.querySelector('a[href="#section1"]');
    expect(firstLink.classList.contains('underline')).toBe(true);
  });
});
