export class Jumplinks {
  constructor(options = {}) {
    // Default options
    const defaults = {
      jumpLinks: '[data-js-jumplinks]',
      progressBar: '[data-js-jumplinks-progress-bar]',
      stickyTriggerStart: null,
      stickyTriggerEnd: null,
      stickyTriggerStartOffset: 0,
      stickyTriggerEndOffset: 0,
      stickyFunction: (element, isSticky) => {
        const classes = ['translate-y-0'];
        if (isSticky) {
          element.classList.add(...classes);
        } else {
          element.classList.remove(...classes);
        }
      },
      activeLinkClasses: ['underline'],
      intersectionOptions: {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px'
      },
      onSticky: () => {},
      onUnsticky: () => {},
      onLinkClick: () => {},
      onIntersection: () => {}
    };

    // Merge defaults with provided options
    this.options = { ...defaults, ...options };

    // Bind callback functions to this instance
    this.onSticky = this.options.onSticky.bind(this);
    this.onUnsticky = this.options.onUnsticky.bind(this);
    this.onLinkClick = this.options.onLinkClick.bind(this);
    this.onIntersection = this.options.onIntersection.bind(this);

    // Get DOM elements
    this.jumpLinks = typeof this.options.jumpLinks === 'string'
      ? document.querySelector(this.options.jumpLinks)
      : this.options.jumpLinks;

    // Simplify nav links selection to always use all a tags
    this.jumpLinksAnchors = Array.from(this.jumpLinks.querySelectorAll('a'));

    // Get all sections that have corresponding nav links
    const anchorIds = this.jumpLinksAnchors.map(link => link.getAttribute('href').substring(1));
    this.sections = anchorIds.map(id => document.getElementById(id));

    // Set first and last sections
    this.firstSection = this.sections[0];
    this.lastSection = this.sections[this.sections.length - 1];

    // Get start trigger element (with fallback to firstSection)
    this.startTrigger = this.options.stickyTriggerStart
      ? (typeof this.options.stickyTriggerStart === 'string'
        ? document.querySelector(this.options.stickyTriggerStart)
        : this.options.stickyTriggerStart)
      : this.firstSection;

    // Get end trigger element (with fallback to lastSection)
    this.endTrigger = this.options.stickyTriggerEnd
      ? (typeof this.options.stickyTriggerEnd === 'string'
        ? document.querySelector(this.options.stickyTriggerEnd)
        : this.options.stickyTriggerEnd)
      : this.lastSection;

    this.progressBar = typeof this.options.progressBar === 'string'
      ? document.querySelector(this.options.progressBar)
      : this.options.progressBar;

    // Feature detection
    this.hasScrollEndSupport = 'onscrollend' in window;

    // Throttling flag
    this.ticking = false;

    // Initialize state object
    this.state = {
      lastActiveSection: null,
      isSticky: false,
      startOffset: 0,
      endOffset: 0,
      progress: 0
    };

    this.bindThisToMemberFunctions();
    this.init();
  }

  bindThisToMemberFunctions() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    methods.forEach(method => {
      if (typeof this[method] === 'function') {
        this[method] = this[method].bind(this);
      }
    });
  }

  async init() {
    this.validateElements();
    this.jumpLinks.setAttribute('aria-hidden', 'true');
    this.addEventListeners();
    this.updateOffsets();
    // Wait for first intersection before continuing
    await this.initializeObservers();

    this.updateNavVisibility();
    this.updateProgressBar();
  }

  validateElements() {
    const missing = [];

    if (!this.jumpLinks) {
      missing.push('jumpLinks');
    }
    if (!this.startTrigger) {
      missing.push('stickyTriggerStart');
    }
    if (!this.sections.length) {
      missing.push('sections with matching IDs');
    }
    if (!this.endTrigger) {
      missing.push('stickyTriggerEnd or lastSection');
    }

    if (missing.length > 0) {
      console.error('Missing elements:', {
        stickyNav: this.jumpLinks,
        startTrigger: this.startTrigger,
        sections: this.sections,
        endTrigger: this.endTrigger,
        lastSection: this.lastSection
      });
      throw new Error(`Required elements not found: ${missing.join(', ')}`);
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', this.handleScroll);
    this.jumpLinks.addEventListener('click', this.handleJumpLinksClick);
  }

  initializeObservers() {
    return new Promise(resolve => {
      this.resizeObserver = new ResizeObserver(
        this.handleResize.bind(this)
      );

      this.resizeObserver.observe(document.documentElement);

      this.sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.state.lastActiveSection = entry.target.id;
              this.updateActiveSection();
              this.onIntersection(entry.target);
            }
          });
          resolve();
        },
        this.options.intersectionOptions
      );

      this.sections.forEach(section => {
        this.sectionObserver.observe(section);
      });
    });
  }

  updateNavVisibility() {
    const hasReachedStart = this.startTrigger.getBoundingClientRect().top + this.state.startOffset <= 0;
    const hasReachedEnd = this.endTrigger.getBoundingClientRect().bottom < -this.state.endOffset;
    const shouldBeSticky = hasReachedStart && !hasReachedEnd;

    // If the state hasn't changed, do nothing
    if (shouldBeSticky === this.state.isSticky) return;

    this.state.isSticky = shouldBeSticky;

    // Use the stickyFunction for both class and animation handling
    this.options.stickyFunction(this.jumpLinks, shouldBeSticky);

    this.jumpLinks.setAttribute('aria-hidden', shouldBeSticky ? 'false' : 'true');
    console.log(shouldBeSticky);
    shouldBeSticky ? this.onSticky() : this.onUnsticky();
  }

  updateActiveSection(sectionId = this.state.lastActiveSection) {
    this.jumpLinksAnchors.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      const isActive = href === sectionId;

      this.options.activeLinkClasses.forEach(cls => {
        link.classList.toggle(cls, isActive);
      });
    });
  }

  updateProgressBar() {
    if (this.progressBar && this.state.isSticky) {
      const startTop = this.startTrigger.offsetTop + this.state.startOffset;
      const scrollDistance = this.endTrigger.offsetTop + this.endTrigger.offsetHeight - startTop + this.state.endOffset;
      const scrollPosition = window.scrollY - startTop;
      this.state.progress = Math.max(0, Math.min(100, (scrollPosition / scrollDistance) * 100)).toFixed(2);

      document.documentElement.style.setProperty('--jumplinks-progress', `${this.state.progress}%`);
    }
  }

  updateOffsets() {
    this.state.startOffset = typeof this.options.stickyTriggerStartOffset === 'function'
      ? this.options.stickyTriggerStartOffset()
      : this.options.stickyTriggerStartOffset;

    this.state.endOffset = typeof this.options.stickyTriggerEndOffset === 'function'
      ? this.options.stickyTriggerEndOffset()
      : this.options.stickyTriggerEndOffset;
  }

  handleJumpLinksClick(event) {
    const link = event.target.closest('a');
    if (!link) return;

    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Temporarily stop observing all sections to prevent double triggering of active links
      if (this.hasScrollEndSupport) {
        this.sections.forEach(section => {
          this.sectionObserver.unobserve(section);
        });

        // Re-observe sections after smooth scroll animation
        document.addEventListener('scrollend', () => {
          this.sections.forEach(section => {
            this.sectionObserver.observe(section);
          });
        });
      }

      // Update active section instantly
      this.updateActiveSection(targetId.substring(1));

      // Scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Hack to make sure the target element is focusable
      if (!targetElement.getAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      targetElement.focus({ preventScroll: true });
      targetElement.removeAttribute('tabindex');

      // Trigger the onLinkClick callback
      this.options.onLinkClick(link, targetElement);
    }
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateNavVisibility();
        this.updateProgressBar();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  handleResize() {
    this.updateOffsets();
    this.updateProgressBar();
  }

  destroy() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    // Disconnect the ResizeObserver
    this.resizeObserver.disconnect();

    document.removeEventListener('scroll', this.handleScroll);
    this.jumpLinks.removeEventListener('click', this.handleJumpLinksClick);

    this.state.lastActiveSection = null;
  }

  // Optional: Add a method to get current state (useful for debugging)
  getState() {
    return { ...this.state };
  }
}
