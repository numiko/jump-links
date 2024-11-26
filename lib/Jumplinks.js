export class Jumplinks {
  constructor(options = {}) {
    // Default options
    const defaults = {
      jumpLinks: '[data-js-jumplinks]',
      jumpLinksTrigger: '[data-js-jumplinks-trigger]',
      jumpLinksTriggerOffset: 200,
      jumpLinksEndOffset: 200,
      stickyClasses: ['translate-y-0'],
      activeLinkClasses: ['underline', 'font-bold'],
    };

    // Merge defaults with provided options
    this.options = { ...defaults, ...options };

    // Get DOM elements
    this.stickyNav = typeof this.options.jumpLinks === 'string'
      ? document.querySelector(this.options.jumpLinks)
      : this.options.jumpLinks;

    // Get trigger element (required)
    this.triggerElement = typeof this.options.jumpLinksTrigger === 'string'
      ? document.querySelector(this.options.jumpLinksTrigger)
      : this.options.jumpLinksTrigger;

    // Simplify nav links selection to always use all a tags
    this.navLinks = Array.from(this.stickyNav.querySelectorAll('a'));

    // Get all sections that have corresponding nav links
    const navHrefs = this.navLinks.map(link => link.getAttribute('href').substring(1));
    this.sections = Array.from(navHrefs).map(id => document.getElementById(id));

    // Validate required elements
    this.validateElements();

    // Initialize properties
    this.sectionObserver = null;
    this.activeSection = null;
    this.isScrollingToTarget = false;
    this.lastSection = this.sections[this.sections.length - 1];

    this.init();
  }

  init() {
    this.stickyNav.setAttribute('aria-hidden', 'true');
    this.updateNavVisibility();
    this.initializeObservers();
    this.addEventListeners();
  }

  validateElements() {
    if (!this.stickyNav || !this.triggerElement || !this.sections.length) {
      throw new Error('Required elements not found. Please check your selectors.');
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
    const triggerRect = this.triggerElement.getBoundingClientRect();
    const lastSectionRect = this.lastSection.getBoundingClientRect();

    const startOffset = typeof this.options.jumpLinksTriggerOffset === 'function'
      ? this.options.jumpLinksTriggerOffset()
      : this.options.jumpLinksTriggerOffset;

    const endOffset = typeof this.options.jumpLinksEndOffset === 'function'
      ? this.options.jumpLinksEndOffset()
      : this.options.jumpLinksEndOffset;

    // Show nav when:
    // 1. Scrolled past trigger point (including offset)
    // 2. Haven't scrolled past last section (including offset)
    const isPastTrigger = triggerRect.bottom + startOffset <= 0;
    const isPastLastSection = lastSectionRect.bottom < -endOffset;

    if (isPastTrigger && !isPastLastSection) {
      this.stickyNav.classList.add(...this.options.stickyClasses);
      this.stickyNav.setAttribute('aria-hidden', 'false');
    } else {
      this.stickyNav.classList.remove(...this.options.stickyClasses);
      this.stickyNav.setAttribute('aria-hidden', 'true');
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
}
