import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { Jumplinks } from '../lib/Jumplinks.js';


// Utility to create a small delay
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const IntersectionObserverMock = vi.fn((callback) => {

  const unobserve = vi.fn();

  // Simulate observing and immediately call the callback with the target element
  return {
    observe: (element) => {
      // Immediately call the callback simulating intersection
      callback([{ isIntersecting: true, target: element }], { unobserve });
    },
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    unobserve,
  };
});

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);


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
        </ul>
      </nav>
      <section id="section1">
        <h2>Section 1</h2>
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


});
