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
      stickyClasses: ['translate-y-0'],
      activeLinkClasses: ['underline', 'font-bold'],
      onSticky: () => {},
      onUnsticky: () => {}
    };

    // Merge defaults with provided options
    this.options = { ...defaults, ...options };

    // Bind callback functions to this instance
    this.options.onSticky = this.options.onSticky.bind(this);
    this.options.onUnsticky = this.options.onUnsticky.bind(this);

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

    // RAF throttling flag
    this.ticking = false;

    // Initialize state object
    this.state = {
      activeSection: null,
      isScrollingToTarget: false,
      isSticky: false,
      resizeTimer: null,
      startOffset: 0,
      endOffset: 0,
      // Computed values used across methods
      scrollY: 0,
      startTop: 0,
      scrollDistance: 0,
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

  init() {
    this.validateElements();
    this.jumpLinks.setAttribute('aria-hidden', 'true');
    this.addEventListeners();
    this.initializeObservers();
    this.updateOffsets();
    this.updateNavVisibility();
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

    if (this.hasScrollEndSupport) {
      document.removeEventListener('scrollend', () => {
        this.state.isScrollingToTarget = false;
      });
    }

    this.jumpLinks.addEventListener('click', this.handleJumpLinksClick);

    window.addEventListener('resize', () => {
      clearTimeout(this.state.resizeTimer);
      this.state.resizeTimer = setTimeout(this.handleResize, 100);
    });
  }

  initializeObservers() {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.state.activeSection = entry.target.id;
            if (!this.hasScrollEndSupport || !this.state.isScrollingToTarget) {
              this.updateActiveSection();
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px'
      }
    );

    this.sections.forEach(section => {
      this.sectionObserver.observe(section);
    });
  }

  updateNavVisibility() {
    const hasReachedStart = this.startTrigger.getBoundingClientRect().top + this.state.startOffset <= 0;
    const hasReachedEnd = this.endTrigger.getBoundingClientRect().bottom < -this.state.endOffset;
    const shouldBeSticky = hasReachedStart && !hasReachedEnd;

    // If the state hasn't changed, do nothing
    if (shouldBeSticky === this.state.isSticky) return;

    this.state.isSticky = shouldBeSticky;

    if (shouldBeSticky) {
      this.jumpLinks.classList.add(...this.options.stickyClasses);
      this.jumpLinks.setAttribute('aria-hidden', 'false');
      this.options.onSticky();
    } else {
      this.jumpLinks.classList.remove(...this.options.stickyClasses);
      this.jumpLinks.setAttribute('aria-hidden', 'true');
      this.options.onUnsticky();
    }
  }

  updateActiveSection() {
    if (this.state.isScrollingToTarget) return;

    this.jumpLinksAnchors.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      const isActive = href === this.state.activeSection;

      this.options.activeLinkClasses.forEach(cls => {
        link.classList.toggle(cls, isActive);
      });
    });
  }

  updateProgressBar() {
    if (this.progressBar && this.state.isSticky) {
      this.state.startTop = this.startTrigger.offsetTop + this.state.startOffset;
      this.state.scrollDistance = this.endTrigger.offsetTop + this.endTrigger.offsetHeight - this.state.startTop + this.state.endOffset;
      const scrollPosition = window.scrollY - this.state.startTop;
      this.state.progress = Math.max(0, Math.min(100, (scrollPosition / this.state.scrollDistance) * 100)).toFixed(2);

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
      this.state.isScrollingToTarget = this.hasScrollEndSupport;

      // If we have scrollend support - clear all active link styles and set active on the link clicked.
      if (this.hasScrollEndSupport) {
        this.jumpLinksAnchors.forEach(navLink => {
          const isClickedLink = navLink === link;
          this.options.activeLinkClasses.forEach(cls => {
            navLink.classList.toggle(cls, isClickedLink);
          });
        });
      }

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
    }
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.state.scrollY = window.scrollY;
        this.updateNavVisibility();
        this.updateProgressBar();

        if (!this.state.isScrollingToTarget) {
          this.updateActiveSection();
        }
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  handleResize() {
    clearTimeout(this.state.resizeTimer);
    this.state.resizeTimer = setTimeout(() => {
      this.updateOffsets();
      this.updateProgressBar();
    }, 100);
  }

  destroy() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect(); // This stops observing all sections
    }

    document.removeEventListener('scroll', this.handleScroll);

    if (this.hasScrollEndSupport) {
      document.removeEventListener('scrollend', () => {
        this.state.isScrollingToTarget = false;
      });
    }

    this.jumpLinks.removeEventListener('click', this.handleJumpLinksClick);
    this.state.activeSection = null;

    clearTimeout(this.state.resizeTimer);
    window.removeEventListener('resize', this.handleResize);
  }

  // Optional: Add a method to get current state (useful for debugging)
  getState() {
    return { ...this.state };
  }
}
