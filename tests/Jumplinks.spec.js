import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../lib/Jumplinks.js';


// Utility to create a small delay
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Set up basic intersection observer to stop tests falling over.
const MockIntersectionObserver = vi.fn(() => {
  return {
    observe: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  };
});

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);


describe('Jumplinks', () => {
  let window, document, jumplinksElement, sectionElement;

  beforeEach(() => {
    window = new Window();
    document = window.document;
    global.window = window;
    global.document = document;

    // Set up the DOM structure
    document.body.innerHTML = `
      <nav data-js-jumplinks>
        <ul>
          <li><a href="#section1">Section 1</a></li>
          <li><a href="#section2">Section 2</a></li>
        </ul>
      </nav>
      <section id="section1">
        <h2>Section 1</h2>
      </section>
      <section id="section2">
        <h2>Section 2</h2>
      </section>
    `;

    jumplinksElement = document.querySelector('[data-js-jumplinks]');
    sectionElement = document.getElementById('section1');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize without errors', () => {
    const jumplinks = new Jumplinks();
    expect(jumplinks).toBeInstanceOf(Jumplinks);
  });

  it('should throw an error if required DOM elements are missing', () => {
    document.body.innerHTML = ''; // Clear the DOM
    expect(() => new Jumplinks()).toThrow();
  });

  it('should correctly identify navigation links', () => {
    const jumplinks = new Jumplinks();
    expect(jumplinks.jumpLinksAnchors.length).toBeGreaterThanOrEqual(1);
  });

  it('should correctly identify corresponding sections', () => {
    const jumplinks = new Jumplinks();
    expect(jumplinks.sections.length).toBeGreaterThanOrEqual(1);
  });

  it('should set initial ARIA hidden state', () => {
    const jumplinks = new Jumplinks();
    expect(jumplinksElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should make the first link active when the first section triggers intersection', async () => {
    // Simulate section coming into view
    const firstJumplinkSection = document.getElementById('section1');
    const MockIntersectionObserver = vi.fn((callback) => {
      const unobserve = vi.fn();
      return {
        observe: (element) => {
          // Simulate intersection with section1
          if (element.id === 'section1') {
            callback([{
              isIntersecting: true,
              target: firstJumplinkSection
            }], { unobserve });
          }
        },
        disconnect: vi.fn(),
        takeRecords: vi.fn(),
        unobserve,
      };
    });
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const jumplinks = new Jumplinks();

    // Wait for any async operations
    await delay(0);

    // Get the first link
    const link = jumplinksElement.querySelector('a');

    // Verify link is highlighted
    expect(link.classList.contains('underline')).toBe(true);
  });

});
