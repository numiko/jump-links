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

    // Initialize other properties
    this.hasScrollEndSupport = 'onscrollend' in window;
    this.sectionObserver = null;
    this.activeSection = null;
    this.isScrollingToTarget = false;
    this.isSticky = false;
    this.resizeTimer = null;
    this.startOffset = 0;
    this.endOffset = 0;
    this.ticking = false;

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
      document.addEventListener('scrollend', () => {
        this.isScrollingToTarget = false;
      });
    }

    this.jumpLinks.addEventListener('click', this.handleJumpLinksClick);

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.handleResize, 100);
    });
  }

  initializeObservers() {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            if (!this.hasScrollEndSupport || !this.isScrollingToTarget) {
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
    // Get the bounding rects of the start and end triggers relative to the viewport
    const startTriggerRect = this.startTrigger.getBoundingClientRect();
    const endTriggerRect = this.endTrigger.getBoundingClientRect();
    // Set appropriate flags
    const hasReachedStart = startTriggerRect.top + this.startOffset <= 0;
    const hasReachedEnd = endTriggerRect.bottom < -this.endOffset;
    const shouldBeSticky = hasReachedStart && !hasReachedEnd;

    if (shouldBeSticky === this.isSticky) return;

    if (shouldBeSticky) {
      this.isSticky = true;
      this.jumpLinks.classList.add(...this.options.stickyClasses);
      this.jumpLinks.setAttribute('aria-hidden', 'false');
      this.options.onSticky();
    } else {
      this.isSticky = false;
      this.jumpLinks.classList.remove(...this.options.stickyClasses);
      this.jumpLinks.setAttribute('aria-hidden', 'true');
      this.options.onUnsticky();
    }
  }

  updateActiveSection() {
    if (this.isScrollingToTarget) return;

    this.jumpLinksAnchors.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      const isActive = href === this.activeSection;

      this.options.activeLinkClasses.forEach(cls => {
        link.classList.toggle(cls, isActive);
      });
    });
  }

  updateProgressBar() {
    if (this.progressBar) {

      const startTop = this.startTrigger.offsetTop + this.startOffset;
      const scrollDistance = this.endTrigger.offsetTop + this.endTrigger.offsetHeight - startTop + this.endOffset;
      const scrollPosition = window.scrollY - startTop;
      const progress = Math.max(0, Math.min(100, (scrollPosition / scrollDistance) * 100)).toFixed(2);

      document.documentElement.style.setProperty('--jumplinks-progress', `${progress}%`);
    }
  }

  updateOffsets() {
    // Cache the offset values
    this.startOffset = typeof this.options.stickyTriggerStartOffset === 'function'
      ? this.options.stickyTriggerStartOffset()
      : this.options.stickyTriggerStartOffset;

    this.endOffset = typeof this.options.stickyTriggerEndOffset === 'function'
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
      this.isScrollingToTarget = this.hasScrollEndSupport;

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
        this.updateNavVisibility();
        this.updateProgressBar();

        if (!this.isScrollingToTarget) {
          this.updateActiveSection();
        }
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  handleResize() {
    // Update cached values on resize
    this.updateOffsets();
    this.updateProgressBar();
  }

  destroy() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect(); // This stops observing all sections
    }

    document.removeEventListener('scroll', this.handleScroll);

    if (this.hasScrollEndSupport) {
      document.removeEventListener('scrollend', () => {
        this.isScrollingToTarget = false;
      });
    }

    this.jumpLinks.removeEventListener('click', this.handleJumpLinksClick);
    this.activeSection = null;

    clearTimeout(this.resizeTimer);
    window.removeEventListener('resize', this.handleResize);
  }
}
