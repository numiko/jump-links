import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/jumplinks.ts';
import { setupTestDOM, delay, mockIntersectionObserver } from '../test-utils';

describe('Jump-links Intersection Behavior', () => {
  let document;

  beforeEach(() => {
    ({ document } = setupTestDOM());
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

  it('should make the first link active when the first section triggers intersection', async () => {
    const jumplinksElement = document.querySelector('[data-js-jump-links]');
    const jumpLinksAnchors = jumplinksElement.querySelectorAll('[data-js-jump-links-anchor]');
    const firstJumplinkLink = jumpLinksAnchors[0];
    const firstSection = document.getElementById('section1');

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (element) => {
        if (element === firstSection) {
          callback([{
            isIntersecting: true,
            target: firstSection
          }]);
        }
      },
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    new JumpLinks('[data-js-jump-links]', {
      onIntersection: ({ intersectingLink }) => {

        // Remove underline from all links and add it to the intersecting link if it exists
        const activeLinkClasses = ['underline'];
        jumpLinksAnchors.forEach(link => {
          activeLinkClasses.forEach(className => {
            link.classList.toggle(className, link === intersectingLink);
          });
        });
      },
    });
    await delay(0);

    expect(firstJumplinkLink.classList.contains('underline')).toBe(true);
  });


  it('should correctly update the label to show the active section', async () => {
    const jumpLinkLabel = document.querySelector('[data-js-jump-links-label]');
    const secondSection = document.getElementById('section2');
    const secondSectionTextContent = secondSection.querySelector('h2')?.textContent;

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (element) => {
        if (element === secondSection) {
          callback([{
            isIntersecting: true,
            target: secondSection
          }]);
        }
      },
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    new JumpLinks('[data-js-jump-links]', {
      onIntersection: ({intersectingSection}) => {

        if (jumpLinkLabel) {
          jumpLinkLabel.textContent = intersectingSection.querySelector('h2')?.textContent || intersectingSection.id;
        }
      }
    });

    await delay(0);
    expect(jumpLinkLabel.textContent).toBe(secondSectionTextContent);
  });

  it('should reflect the last active section in the DOM when a section intersects', async () => {
    const firstSection = document.getElementById('section1');
    const jumpLinksElement = document.querySelector('[data-js-jump-links]');

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (element) => {
        if (element === firstSection) {
          callback([{ isIntersecting: true, target: firstSection }]);
        }
      },
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    new JumpLinks('[data-js-jump-links]', {
      onIntersection: ({ intersectingSection }) => {
        jumpLinksElement?.setAttribute('data-active-section', intersectingSection.id);
      }
    });
    await delay(0);
    expect(jumpLinksElement?.getAttribute('data-active-section')).toBe('section1');
  });

  it('maps intersecting section to the correct link', async () => {
    const secondSection = document.getElementById('section2');
    const secondLink = document.querySelector('[data-js-jump-links-anchor][href="#section2"]');
    let receivedLink;

    const MockIntersectionObserver = vi.fn((callback) => ({
      observe: (element) => {
        if (element === secondSection) {
          callback([{ isIntersecting: true, target: secondSection }]);
        }
      },
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    new JumpLinks('[data-js-jump-links]', {
      onIntersection: ({ intersectingLink }) => {
        receivedLink = intersectingLink;
      }
    });

    await delay(0);
    expect(receivedLink).toBe(secondLink);
  });

});
