import { scrollToElement, setPushState } from '@numiko/utilities';
import _merge from 'lodash/merge';

const root = document.documentElement;
let rafTicking = false;
let state = {
  isSticking: false
}


/**
 * Defaults
 */
const defaults = {
  linksEl: '[data-js-jumplinks-link]',
  labelEl: '[data-js-jumplinks-label]',
  containerEl: '[data-js-jumplinks-container]',
  sectionEl: '[data-js-jumplinks-section]',
  intersectionOptions: {
    root: null, // default in viewport
    rootMargin:'-50% 0px',
    threshhold:'',
    callback: (entries) => {}
  },
  scrollCustomProperty: 'scrollprogress',
  stickyOffset: 0,
  unStickyOffset: 0,
  onSticky: () => {},
  onUnsticky: () => {},
}

class Jumplinks {
  constructor(element, options) {

    /**
     * Merge defaults with options - using lodash merge as we're using nested objects
     */
    const opts = _merge(defaults, options);

    /**
     * Properties
     */
    this.jumplinksEl = typeof element === 'string' ? document.querySelector(element) : element;
    this.linksEl = typeof opts.linksEl === 'string' ? document.querySelectorAll(opts.linksEl) : opts.linksEl;
    this.labelEl = typeof opts.labelEl === 'string' ? document.querySelector(opts.labelEl) : opts.labelEl;
    this.containerEl = typeof opts.containerEl === 'string' ? document.querySelector(opts.containerEl) : opts.containerEl;
    this.intersectionOptions = opts.intersectionOptions;
    this.sectionsEl = typeof opts.sectionEl === 'string' ? document.querySelectorAll(opts.sectionEl) : opts.sectionEl;
    this.sectionObserver = new IntersectionObserver( this.sectionIntersecting.bind(this) , ...[opts.intersectionOptions]);
    this.scrollCustomProperty = opts.scrollCustomProperty;
    this.stickyOffset = opts.stickyOffset;
    this.unStickyOffset = opts.unStickyOffset;
    this.onSticky = opts.onSticky;
    this.onUnsticky = opts.onUnsticky;

    /**
     * Do some inital validation based on new options
     */
    this.validateOptions();
  }

  /**
   * Simple validation of options
   */
  validateOptions() {
    if (this.jumplinksEl === null) {
      throw `Jumplinks: No matching DOM element for "jumplinkEl"`;
    }

    if (!this.linksEl.length) {
      throw `Jumplinks: No matching DOM elements for "linksEl"`;
    }

    if (this.containerEl === null) {
      throw `Jumplinks: No matching DOM element for "containerEl"`;
    }

    if (this.labelEl === null) {
      throw `Jumplinks: No matching DOM element for "labelEl"`;
    }

    if (!this.sectionsEl.length) {
      throw `Jumplinks: No matching DOM elements for "sectionsEl"`;
    }

    if ( typeof this.scrollCustomProperty !== 'string' ||  this.scrollCustomProperty.length <= 0 ) {
      throw `Jumplinks: please specify a valid string for "scrollCustomProperty" exluding the "--" part`;
    }

    if ( typeof this.stickyOffset !== 'number' ) {
      throw `Jumplinks: please specify a valid number for "stickyOffset"`;
    }

    if ( typeof this.unStickyOffset !== 'number' ) {
      throw `Jumplinks: please specify a valid number for "unStickyOffset"`;
    }

    if (typeof this.onSticky !== 'function') {
      throw `Jumplinks: please specify a valid function for "onSticky"`;
    }

    if (typeof this.onUnsticky !== 'function') {
      throw `Jumplinks: please specify a valid function for "onUnsticky"`;
    }
  }

  /**
   * Called whenever a jumplink section triggers the intersection observer
   */
  sectionIntersecting(entries) {
    entries.forEach( (entry) => {
      if (entry.isIntersecting) {
        // Update label to show intersecting section
        const sectionLabel = entry.target.getAttribute('data-js-jumplinks-section-label');
        this.labelEl.innerText = sectionLabel;

        // Additionally call user defined callback if present
        if (this.intersectionOptions.callback && typeof this.intersectionOptions.callback == 'function') {
          this.intersectionOptions.callback(entry);
        }
      }
    })
  }

  /**
   * Returns containerEl height
   * @return {number} height
   */
  get getContainerHeight() {
    return this.containerEl.offsetHeight;
  }

  /**
   * Returns top position of the container relative to viewport
   * @return {number} distance from top of viewport to containerEl top
   */
  get getContainerTop() {
    return this.containerEl.getBoundingClientRect().top
  }

  scrollToHash() {
    if (!window.location.hash) return;
    const elementToScrollTo = document.querySelector(window.location.hash);
    const heightOfJumpLinks = this.jumplinksEl.offsetHeight;
    scrollToElement(elementToScrollTo, heightOfJumpLinks, false);
  }

  hasReachedJumplinksContainerTop() {
    return this.getContainerTop + this.stickyOffset <= 0
  }

  hasReachedJumplinksContainerBottom() {
    return this.getContainerTop + this.getContainerHeight + this.unStickyOffset <= 0
  }

  scrollProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const containerRect = this.containerEl.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const containerHeight = this.getContainerHeight;
    const scrollProgress = Math.max(0, Math.min(1, (scrollTop - containerTop) / containerHeight));
    const scrollPercent = scrollProgress * 100;
    root.style.setProperty(`--${this.scrollCustomProperty}`, scrollPercent+"%");
  }

  onLinkClick(e) {
    e.preventDefault();

    // the element clicked and its target from its # href value
    const element = e.currentTarget;
    const elementHref = element.getAttribute('href');
    const elementToScrollTo = document.querySelector(elementHref);

    // The height of our jumplinks. This is used as a custom offset to ensure our scroll position is correct.
    const heightOfJumpLinks = this.jumplinksEl.offsetHeight;

    // Scroll to the element
    scrollToElement(elementToScrollTo, heightOfJumpLinks, true);

    // Set the push state
    setPushState(elementHref);
  }

  onScroll(e) {
    if(!rafTicking) {
      window.requestAnimationFrame(() => {

        rafTicking = false;
        this.scrollProgress();

        if ( this.hasReachedJumplinksContainerTop() && !this.hasReachedJumplinksContainerBottom() ) {
          // Only want to call this code once if the needs to stick
          if(state.isSticking) return;
          // Call the user callback to onSticky()
          this.onSticky();
          // Toggle the state so this will only be called again once it 'unsticks'
          state.isSticking = true;
        } else {
          if(!state.isSticking) return;
          this.onUnsticky();
          state.isSticking = false;
        }
      })
      rafTicking = true;
    }
  }
  setupscrollCustomProperty() {
    root.style.setProperty(`--${this.scrollCustomProperty}`, '0%');
  }

  eventhandlers() {
    /**
   * On document load, if a hash exists, we want to run our own
   * logic to ensure the scroll position is correct, and the custom
   * offset is used. Without this, the sticky jumplinks would overlap
   * the content that is scrolled to.
   */
    window.addEventListener('load', () => {
      this.scrollToHash();
    });

    /**
     * Clicking a jumplink to scroll to the section
     */
    this.linksEl.forEach((link) => {
      link.addEventListener('click', this.onLinkClick.bind(this));
    });

    /**
     * Scroll listener that will deal with deciding when to stick/unstick the jumplinks bar
     */
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  init() {
    this.setupscrollCustomProperty();
    this.eventhandlers();

    /*
    * Observe slices on the page so we know when they come into view.
    */
    this.sectionsEl.forEach((section) => {
      this.sectionObserver.observe(section);
    });
  }

}

export { Jumplinks as default }
