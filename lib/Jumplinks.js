import _merge from 'lodash/merge';
import { scrollToElement, setPushState } from './utilities/utilities';

/**
 * Defaults
 */
const defaults = {
  linksEl: '[data-js-jumplinks-link]',
  labelEl: '[data-js-jumplinks-label]',
  containerEl: '[data-js-jumplinks-container]',
  sectionEl: '[data-js-jumplinks-section]',
  intersectionOptions: {
    root: null, // default is viewport
    rootMargin: '-50% 0px',
    threshhold: 0,
    callback: () => {}
  },
  hasScrollProgress: true,
  scrollCustomProperty: 'scrollprogress',
  attachCustomPropertyTo: null,
  stickyOffset: 0,
  unStickyOffset: 0,
  onSticky: () => {},
  onUnsticky: () => {},
  customOffsetValue: null,
  customOffsetEl: null,
  onLinkClicked: () => {},
};

class Jumplinks {
  constructor(element, options) {

    /**
     * Merge defaults with options - using lodash merge as we're using nested objects
     */
    const opts = _merge(defaults, options);

    this.rafTicking = false;
    this.state = {
      isSticking: false
    };

    /**
     * Properties
     */
    this.jumplinksEl = typeof element === 'string' ? document.querySelector(element) : element;
    this.linksEl = typeof opts.linksEl === 'string' ? this.jumplinksEl.querySelectorAll(opts.linksEl) : opts.linksEl;
    this.labelEl = typeof opts.labelEl === 'string' ? this.jumplinksEl.querySelector(opts.labelEl) : opts.labelEl;
    this.containerEl = typeof opts.containerEl === 'string' ? document.querySelector(opts.containerEl) : opts.containerEl;
    this.intersectionOptions = opts.intersectionOptions;
    this.sectionsEl = typeof opts.sectionEl === 'string' ? document.querySelectorAll(opts.sectionEl) : opts.sectionEl;
    this.sectionObserver = new IntersectionObserver(this.sectionIntersecting.bind(this) , ...[opts.intersectionOptions]);
    this.hasScrollProgress = opts.hasScrollProgress;
    this.scrollCustomProperty = opts.scrollCustomProperty;
    this.elToAttachScrollPropertyTo = this.getElementToAttachScrollPropertyTo(opts);
    this.stickyOffset = opts.stickyOffset;
    this.unStickyOffset = opts.unStickyOffset;
    this.onSticky = opts.onSticky;
    this.onUnsticky = opts.onUnsticky;
    this.customOffsetValue = opts.customOffsetValue;
    this.customOffsetEl = typeof opts.customOffsetEl === 'string' ? document.querySelector(opts.customOffsetEl) : opts.customOffsetEl;
    this.onLinkClicked = opts.onLinkClicked;

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
      throw 'Jumplinks: No matching DOM element for "jumplinkEl"';
    }

    if (!this.linksEl.length) {
      throw 'Jumplinks: No matching DOM elements for "linksEl"';
    }

    if (this.containerEl === null) {
      throw 'Jumplinks: No matching DOM element for "containerEl"';
    }

    if (this.labelEl === null) {
      throw 'Jumplinks: No matching DOM element for "labelEl"';
    }

    if (!this.sectionsEl.length) {
      throw 'Jumplinks: No matching DOM elements for "sectionsEl"';
    }

    if ( typeof this.scrollCustomProperty !== 'string' ||  this.scrollCustomProperty.length <= 0 ) {
      throw 'Jumplinks: please specify a valid string for "scrollCustomProperty" exluding the "--" part';
    }

    if ( typeof this.stickyOffset !== 'number' ) {
      throw 'Jumplinks: please specify a valid number for "stickyOffset"';
    }

    if ( typeof this.unStickyOffset !== 'number' ) {
      throw 'Jumplinks: please specify a valid number for "unStickyOffset"';
    }

    if (typeof this.onSticky !== 'function') {
      throw 'Jumplinks: please specify a valid function for "onSticky"';
    }

    if (typeof this.onUnsticky !== 'function') {
      throw 'Jumplinks: please specify a valid function for "onUnsticky"';
    }

    if (typeof this.customOffsetValue !== 'number' && this.customOffsetValue !== null) {
      throw 'Jumplinks: please specify a valid number for "customOffsetValue"';
    }

    if (typeof this.onLinkClicked !== 'function') {
      throw 'Jumplinks: please specify a valid function for "onLinkClicked"';
    }
  }

  /**
   * Set jumplinks section to first content item if intersection observer hasn't fired
   */
  setFirstJumplinksSectionLabel() {
    const sectionLabel = this.sectionsEl[0].getAttribute('data-js-jumplinks-section-label');

    this.labelEl.innerText = sectionLabel;
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
    });
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
    return this.containerEl.getBoundingClientRect().top;
  }

  scrollToHash() {
    if (!window.location.hash) return;
    const elementToScrollTo = document.querySelector(window.location.hash);
    const heightOfJumpLinks = this.jumplinksEl.offsetHeight;
    const offSetValue = this.customOffsetValue || this.customOffsetEl?.offsetHeight || heightOfJumpLinks;

    scrollToElement(elementToScrollTo, offSetValue, false);
  }

  hasReachedJumplinksContainerTop() {
    return this.getContainerTop + this.stickyOffset <= 0;
  }

  hasReachedJumplinksContainerBottom() {
    return this.getContainerTop + this.getContainerHeight + this.unStickyOffset <= 0;
  }

  setScrollProgress() {

    if (this.hasScrollProgress === false) return;

    const scrollTop = document.documentElement.scrollTop;
    const containerRect = this.containerEl.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const containerHeight = this.getContainerHeight;
    const scrollProgress = Math.max(0, Math.min(1, (scrollTop - containerTop) / containerHeight));
    const scrollPercent = (scrollProgress * 100).toFixed(2);

    this.setScrollCustomProperty(scrollPercent + '%');
  }

  onLinkClick(e) {
    e.preventDefault();

    // the element clicked and its target from its # href value
    const element = e.currentTarget;
    const elementHref = element.getAttribute('href');
    const elementToScrollTo = document.querySelector(elementHref);

    // The height of our jumplinks. This is used as a custom offset if no custom offset has been defined, to ensure our scroll position is correct.
    const heightOfJumpLinks = this.jumplinksEl.offsetHeight;
    const offSetValue = this.customOffsetValue || this.customOffsetEl?.offsetHeight || heightOfJumpLinks;

    scrollToElement(elementToScrollTo, offSetValue, true);

    this.onLinkClicked();

    // Set the push state
    setPushState(elementHref);
  }

  onScroll() {
    if (!this.rafTicking) {
      window.requestAnimationFrame(() => {

        this.rafTicking = false;
        this.setScrollProgress();

        if ( this.hasReachedJumplinksContainerTop() && !this.hasReachedJumplinksContainerBottom() ) {
          // Only want to call this code once if the needs to stick
          if (this.state.isSticking) return;

          // Call the user callback to onSticky()
          this.onSticky();
          // Toggle the state so this will only be called again once it 'unsticks'
          this.state.isSticking = true;
        } else {
          if (!this.state.isSticking) return;

          this.onUnsticky();
          this.state.isSticking = false;
        }
      });

      this.rafTicking = true;
    }
  }

  /**
   * @type {Object} the options used when configuring the module
   * @returns {HTMLElement}
   */
  getElementToAttachScrollPropertyTo(options) {
    if (!options.attachCustomPropertyTo) return this.jumplinksEl;

    if (typeof options.attachCustomPropertyTo === 'string') {
      return document.querySelector(options.attachCustomPropertyTo);
    }

    return options.attachCustomPropertyTo;
  }

  setScrollCustomProperty(scrollProgress = '0%') {
    if (this.hasScrollProgress ===  false) return;

    this.elToAttachScrollPropertyTo.style.setProperty(`--${this.scrollCustomProperty}`, scrollProgress);
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
    this.setFirstJumplinksSectionLabel();
    this.setScrollCustomProperty();
    this.eventhandlers();

    /*
    * Observe slices on the page so we know when they come into view.
    */
    this.sectionsEl.forEach((section) => {
      this.sectionObserver.observe(section);
    });
  }
}

export { Jumplinks };
