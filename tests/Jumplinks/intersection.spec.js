import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { JumpLinks } from '../../lib/JumpLinks.js';
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
    const jumplinksElement = document.querySelector('[data-js-jump-links]');
    const firstJumplinkLink = jumplinksElement.querySelector('a[href="#section1"]');
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

    const jumplinks = new JumpLinks('[data-js-jump-links]', {
      onIntersection: ({ links, intersectingLink }) => {

        // Remove underline from all links and add it to the intersecting link if it exists
        const activeLinkClasses = ['underline'];
        links.forEach(link => {
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

    const jumplinks = new JumpLinks('[data-js-jump-links]', {
      onIntersection: ({intersectingSection}) => {

        if (jumpLinkLabel) {
          jumpLinkLabel.textContent = intersectingSection.querySelector('h2')?.textContent || section.id;
        }
      }
    });

    await delay(0);
    expect(jumpLinkLabel.textContent).toBe(secondSectionTextContent);
  });


});
