import { scrollToElement, setPushState } from '@numiko/utilities';
import DropdownToggle from '@numiko/dropdown-toggle';
import _merge from 'lodash/merge';

let scrollInstance, dropdownToggleInstance;

class Jumplinks {
  constructor(element, options) {

    /**
     * Defaults
     */
    const defaults = {
      linksEl: '[data-js-jumplinks-link]',
      labelEl: '[data-js-jumplinks-label]',
      dropdownButtonEl: '[data-js-jumplinks-button]',
      containerEl: '[data-js-jumplinks-container]',
      sectionEl: '[data-js-jumplinks-section]',
      intersectionOptions: {
        root: null, // default in viewport
        rootMargin:'-50% 0px',
        threshhold:'',
        callback: (entries) => {}
      },
      showProgress: true,
    }

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
    this.dropdownButtonEl = typeof opts.dropdownButtonEl === 'string' ? document.querySelector(opts.dropdownButtonEl) : opts.dropdownButtonEl;
    this.containerEl = typeof opts.containerEl === 'string' ? document.querySelector(opts.containerEl) : opts.containerEl;
    this.intersectionOptions = opts.intersectionOptions;
    this.sections = typeof opts.sectionEl === 'string' ? document.querySelectorAll(opts.sectionEl) : opts.sectionEl;
    this.sectionObserver = new IntersectionObserver( this.sectionIntersecting.bind(this) , ...[opts.intersectionOptions])
    this.showProgress = opts.showProgress;
    this.validateOptions();
  }

  /**
   * Simple validation of options
   */
  validateOptions() {
    if (this.jumplinksEl === null) {
      throw `Jumplinks: No matching DOM element for "jumplinkEl"`;
    }

    if (this.dropdownButtonEl === null) {
      throw `Jumplinks: No matching DOM element for "dropdownButtonEl"`;
    }

    if (this.containerEl === null) {
      throw `Jumplinks: No matching DOM element for "containerEl"`;
    }
  }

  /**
   * Called whenever a jumplink section triggers the intersection observer
   */
  sectionIntersecting(entries) {
    entries.forEach( (entry) => {
      if (entry.isIntersecting) {
        // Update label to show intersecting section
        const sliceLabelId = entry.target.getAttribute('aria-labelledby');
        const sliceLabel = document.querySelector(`#${sliceLabelId}`).innerText;
        this.labelEl.innerText = sliceLabel;

        // Additionally call user defined callback if present
        if (this.intersectionOptions.callback && typeof this.intersectionOptions.callback == 'function') {
          this.intersectionOptions.callback();
        }
      }
    })
  }

  /**
   * Basic scroll plugin init to handle progress indicator
   * Only import it if we have showProgress: true (default)
   */
  progressIndicator() {

    const getBasicScroll = import('basicscroll')
      .then(basicScroll => {
        scrollInstance = basicScroll.create({
          elem: this.containerEl,
          from: 'top-bottom',
          to: 'bottom-top',
          props: {
            '--scrollprogress': {
              from: '-100%',
              to: '0%',
            }
          }
        })

        scrollInstance.start();
      })
      .catch(err => {
        console.error(err);
      })

      return getBasicScroll;
  }

  /**
   * Register the dropdown button that reveals the jumplinks
   */
  registerDropdownButton() {
    dropdownToggleInstance = new DropdownToggle(this.dropdownButtonEl, {
      openLabel: 'Show',
      closeLabel: 'Hide',
      onOpenEnd() {},
      onCloseEnd() {}
    });
    dropdownToggleInstance.init();
  }

  scrollToHash() {
    if (!window.location.hash) return;
    const elementToScrollTo = document.querySelector(window.location.hash);
    const heightOfJumpLinks = this.jumplinksEl.offsetHeight;
    scrollToElement(elementToScrollTo, heightOfJumpLinks, true);
  }

  onLinkClick(e) {
    e.preventDefault();

    const element = e.currentTarget;
    const elementHref = element.getAttribute('href');
    const elementToScrollTo = document.querySelector(elementHref);

    /**
     * Close any open dropdown elements, and then run the scroll
     * animation.
     */
    if (dropdownToggleInstance.isActive) {
      dropdownToggleInstance.close().then(() => {
        /**
         * The height of our jumplinks. This is used as a custom offset to ensure
         * our scroll position is correct.
         * @type {Number}
         */
        const heightOfJumpLinks = this.jumplinksEl.offsetHeight;

        // Scroll to the element
        scrollToElement(elementToScrollTo, heightOfJumpLinks, true);

        // Set the push state
        setPushState(elementHref);
      })
    }
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

    this.linksEl.forEach((link) => {
      link.addEventListener('click', this.onLinkClick.bind(this));
    });
  }

  init() {
    if( this.jumplinksEl && this.containerEl  ) {
      /**
       * ProgressIndicator returns a promise as it might import another module
       */
      if(this.showProgress) {
        this.progressIndicator().then( (response) => {
          this.registerDropdownButton();
          this.eventhandlers();
        })
      } else {
        this.registerDropdownButton();
        this.eventhandlers();
      }


      /*
      * Observe slices on the page so we know when they come into view.
      */
      this.sections.forEach((section) => {
        this.sectionObserver.observe(section);
      });

    }
  }
}

export { Jumplinks as default }
