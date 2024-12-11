import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../../lib/Jumplinks.js';
import { setupTestDOM, delay } from '../test-utils';

describe('Jumplinks Intersection Behavior', () => {
  let window, document;

  beforeEach(() => {
    ({ window, document } = setupTestDOM());
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
    // ... existing test ...
  });
});
