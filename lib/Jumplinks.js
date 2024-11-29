export class Jumplinks {
  constructor(options = {}) {
    // Default options
    const defaults = {
      jumpLinks: '[data-js-jumplinks]',
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
    this.stickyNav = typeof this.options.jumpLinks === 'string'
      ? document.querySelector(this.options.jumpLinks)
      : this.options.jumpLinks;

    // Simplify nav links selection to always use all a tags
    this.navLinks = Array.from(this.stickyNav.querySelectorAll('a'));

    // Get all sections that have corresponding nav links
    const navHrefs = this.navLinks.map(link => link.getAttribute('href').substring(1));
    this.sections = navHrefs.map(id => document.getElementById(id));

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
    this.validateElements();
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
    this.stickyNav.setAttribute('aria-hidden', 'true');
    this.updateOffsets();
    this.updateNavVisibility();
    this.initializeObservers();
    this.addEventListeners();
  }

  validateElements() {
    const missing = [];

    if (!this.stickyNav) {
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
        stickyNav: this.stickyNav,
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

    this.stickyNav.addEventListener('click', this.handleNavClick);

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
      this.stickyNav.classList.add(...this.options.stickyClasses);
      this.stickyNav.setAttribute('aria-hidden', 'false');
      this.options.onSticky();
    } else {
      this.isSticky = false;
      this.stickyNav.classList.remove(...this.options.stickyClasses);
      this.stickyNav.setAttribute('aria-hidden', 'true');
      this.options.onUnsticky();
    }
  }

  updateActiveSection() {
    if (this.isScrollingToTarget) return;

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      const isActive = href === this.activeSection;

      this.options.activeLinkClasses.forEach(cls => {
        link.classList.toggle(cls, isActive);
      });
    });
  }

  handleNavClick(event) {
    const link = event.target.closest('a');
    if (!link || !this.stickyNav.contains(link)) return;

    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      this.isScrollingToTarget = this.hasScrollEndSupport;

      if (this.hasScrollEndSupport) {
        this.navLinks.forEach(navLink => {
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
        if (!this.isScrollingToTarget) {
          this.updateActiveSection();
        }
        this.ticking = false;
      });
      this.ticking = true;
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

  handleResize() {
    // Update cached values on resize
    this.updateOffsets();
  }

  destroy() {
    if (this.sectionObserver) {
      this.sections.forEach(section => {
        this.sectionObserver.unobserve(section);
      });
      this.sectionObserver.disconnect();
    }

    document.removeEventListener('scroll', this.handleScroll);

    if (this.hasScrollEndSupport) {
      document.removeEventListener('scrollend', () => {
        this.isScrollingToTarget = false;
      });
    }

    this.stickyNav.removeEventListener('click', this.handleNavClick);
    this.activeSection = null;

    clearTimeout(this.resizeTimer);
    window.removeEventListener('resize', this.handleResize);
  }
}
