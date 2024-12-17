export class Jumplinks {
  constructor(jumpLinks = '[data-js-jump-links]', options = {}) {
    // Default options
    const defaults = {
      progressBar: '[data-js-jump-links-progress-bar]',
      linkSelector: 'a',
      stickyTriggerStart: null,
      stickyTriggerEnd: null,
      stickyTriggerStartOffset: 0,
      stickyTriggerEndOffset: 0,
      intersectionOptions: {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px'
      },
      onStickyTrigger: ['translate-y-0'],
      onLinkClick: () => {},
      onIntersection: () => {}
    };

    // Merge defaults with provided options
    this.options = { ...defaults, ...options };

    // Get jumpLinks element
    this.jumpLinks = typeof jumpLinks === 'string'
      ? document.querySelector(jumpLinks)
      : jumpLinks;

    // Validate essential jumpLinks element
    if (!this.jumpLinks) {
      throw new Error(`JumpLinks element not found: ${jumpLinks}`);
    }

    // Only proceed with element queries after validation
    this.jumpLinksAnchors = Array.from(this.jumpLinks.querySelectorAll(this.options.linkSelector));
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
    if (!this.jumpLinksAnchors.length) {
      const errorMessage = `
        Jumplinks anchors not found. The default 'linkSelector' option is 'a'.
        If you are using a custom selector via the 'linkSelector' option, please make sure it is correct.
        `;
      throw new Error(errorMessage);
    }

    if (!this.startTrigger) {
      const errorMessage = `
        Start trigger element not found. The default selector is the first section.
        If you are using a custom selector via the 'stickyTriggerStart' option, please make sure it is correct.
        `;
      throw new Error(errorMessage);
    }

    if (!this.endTrigger) {
      const errorMessage = `
        End trigger element not found. The default selector is the last section.
        If you are using a custom selector via the 'stickyTriggerEnd' option, please make sure it is correct.
        `;
      throw new Error(errorMessage);
    }
    if (this.sections.some(section => section === null)) {
      const errorMessage = `
        Some jumplink sections could not be found. Please ensure all href attributes in your links point to existing elements.`;
      throw new Error(errorMessage);
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
              this.options.onIntersection({
                sections: this.sections,
                intersectingSection: entry.target,
                links: this.jumpLinksAnchors,
                intersectingLink: this.jumpLinksAnchors.find(
                  link => link.getAttribute('href') === `#${entry.target.id}`
                )
              });
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
    const hasStartTriggered = this.startTrigger.getBoundingClientRect().top + this.state.startOffset <= 0;
    const hasEndTriggered = this.endTrigger.getBoundingClientRect().bottom < -this.state.endOffset;
    const shouldBeSticky = hasStartTriggered && !hasEndTriggered;

    // If the state hasn't changed, do nothing
    if (shouldBeSticky === this.state.isSticky) return;

    this.state.isSticky = shouldBeSticky;

    // Handle both function and array cases
    if (Array.isArray(this.options.onStickyTrigger)) {
      const classes = this.options.onStickyTrigger;
      if (this.state.isSticky) {
        this.jumpLinks.classList.add(...classes);
      } else {
        this.jumpLinks.classList.remove(...classes);
      }
    } else {
      this.options.onStickyTrigger({
        jumpLinks: this.jumpLinks,
        isSticky: this.state.isSticky,
        hasStartTriggered,
        hasEndTriggered
      });
    }

    this.jumpLinks.setAttribute('aria-hidden', shouldBeSticky ? 'false' : 'true');
  }


  updateProgressBar() {
    if (!this.progressBar || !this.state.isSticky) return;

    const startTop = this.startTrigger.getBoundingClientRect().top + window.scrollY + this.state.startOffset;
    const endTop = this.endTrigger.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = endTop + this.endTrigger.offsetHeight - startTop + this.state.endOffset;
    const scrollPosition = window.scrollY - startTop;
    this.state.progress = Math.max(0, Math.min(100, (scrollPosition / scrollDistance) * 100)).toFixed(2);
    document.documentElement.style.setProperty('--jump-links-progress', `${this.state.progress}%`);
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
    const target = document.querySelector(targetId);

    if (target) {
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

      // Scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Hack to make sure the target element is focusable
      if (!target.getAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
      target.removeAttribute('tabindex');

      // Trigger the onLinkClick callback
      this.options.onLinkClick({
        link: link,
        target: target
      });
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
