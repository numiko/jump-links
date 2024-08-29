/**
 * Returns whether a given element is focusable
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
export function isElementFocusable(element = document) {
  const focusableElements = [...document.querySelectorAll('a, button, input, textarea, select, details, [tabindex]')];

  if (focusableElements.includes(element)) {
    return true;
  }

  return false;
}

/**
 * Scrolls to the given element; accepts an optional offset
 * @param {String} elementID the ID of an element of which to scroll to
 * @param {Number} customOffset a custom offset that is used when calculating the scroll position
 * @param {Boolean} inclusiveOfMargin whether you want the scroll offset calculated to take into account margin
 */
export function scrollToElement(element, customOffset = 0, inclusiveOfMargin = false) {
  if (!element) throw new Error('Please provide an element');

  /**
   * Whether the user prefers reduced motion.
   * @type {MediaQueryList}
   */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elementRect = element.getBoundingClientRect();
  let offsetToScrollTo = elementRect.top + window.pageYOffset - customOffset;

  if (inclusiveOfMargin === true) {
    const marginTop = parseInt(window.getComputedStyle(element).marginTop);
    offsetToScrollTo -= marginTop;
  }

  const scrollOptions = {
    top: offsetToScrollTo,
    left: 0,
    behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
  };

  window.scrollTo(scrollOptions);

  if (this.isElementFocusable(element)) {
    element.focus({ preventScroll: true });
  } else {
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  }
}

/**
 * Set the push state in the URL
 * @param hash - the value to set in the URL.
 */
export function setPushState(hash) {
  if (history.pushState) {
    history.pushState(null, null, hash);
  }
  else {
    location.hash = hash;
  }
}
