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
    this.sections = Array.from(navHrefs).map(id => document.getElementById(id));

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

    // Validate required elements
    this.validateElements();

    // Initialize other properties
    this.sectionObserver = null;
    this.activeSection = null;
    this.isScrollingToTarget = false;
    this.isSticky = false;
    this.resizeTimer = null;
    this.startOffset = 0;
    this.endOffset = 0;

    this.init();
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
    // Always add the scroll listener for sticky behavior
    document.addEventListener('scroll', this.handleScroll.bind(this));

    // Add scrollend just for resetting isScrollingToTarget
    if ('onscrollend' in window) {
      document.addEventListener('scrollend', () => {
        this.isScrollingToTarget = false;
      });
    }

    // Add delegated click handler
    this.stickyNav.addEventListener('click', this.handleNavClick.bind(this));


    // Resize listener with debounced version
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.handleResize.bind(this), 100);
    });
  }

  initializeObservers() {
    // Only keep the section observer for active link tracking
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            this.updateActiveSection();
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px'
      }
    );

    // Observe all sections for navigation
    this.sections.forEach(section => {
      this.sectionObserver.observe(section);
    });
  }

  updateNavVisibility() {
    const startTriggerRect = this.startTrigger.getBoundingClientRect();
    const endTriggerRect = this.endTrigger.getBoundingClientRect();

    const hasReachedStart = startTriggerRect.top + this.startOffset <= 0;
    const hasReachedEnd = endTriggerRect.bottom < -this.endOffset;
    const shouldBeSticky = hasReachedStart && !hasReachedEnd;

    if (shouldBeSticky !== this.isSticky) {
      this.isSticky = shouldBeSticky;

      if (shouldBeSticky) {
        this.stickyNav.classList.add(...this.options.stickyClasses);
        this.stickyNav.setAttribute('aria-hidden', 'false');
        this.options.onSticky();
      } else {
        this.stickyNav.classList.remove(...this.options.stickyClasses);
        this.stickyNav.setAttribute('aria-hidden', 'true');
        this.options.onUnsticky();
      }
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
      this.isScrollingToTarget = true;

      // Update active styles immediately
      this.navLinks.forEach(navLink => {
        const isClickedLink = navLink === link;
        this.options.activeLinkClasses.forEach(cls => {
          navLink.classList.toggle(cls, isClickedLink);
        });
      });

      // Scroll to target and set focus
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Set focus on the target element if it's focusable, or make it programmatically focusable
      if (!targetElement.getAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      targetElement.focus({ preventScroll: true });
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

    console.log(this.endOffset);
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

    if ('onscrollend' in window) {
      window.removeEventListener('scrollend', this.handleScrollEnd);
    } else {
      window.removeEventListener('scroll', this.handleScroll);
    }

    this.stickyNav.removeEventListener('click', this.handleNavClick);
    this.activeSection = null;


    clearTimeout(this.resizeTimer); // Add this line
    window.removeEventListener('resize', this.handleResize);
  }
}
