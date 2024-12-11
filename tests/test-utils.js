import { Window } from 'happy-dom';
import { vi } from 'vitest';

export function setupTestDOM() {
  const window = new Window();
  const document = window.document;
  global.window = window;
  global.document = document;

  document.body.innerHTML = `
    <nav data-js-jumplinks>
      <span data-js-jumplinks-label>xxx</span>
      <ul>
        <li><a href="#section1">Section 1</a></li>
        <li><a href="#section2">Section 2</a></li>
      </ul>
      <div data-js-jumplinks-progress-bar></div>
    </nav>
    <section id="section1">
      <h2>Section 1</h2>
    </section>
    <section id="section2">
      <h2>Section 2</h2>
    </section>
  `;

  return { window, document };
}

export function mockIntersectionObserver() {
  const MockIntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  }));
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  return MockIntersectionObserver;
}

export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
