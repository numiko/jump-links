export class Jumplinks {
  constructor(options = {}) {
    // Default options
    const defaults = {
      jumpLinks: '[data-js-jumplinks]',
      jumpLinksTrigger: '[data-js-jumplinks-trigger]',
      jumpLinksTriggerOffset: 0,
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

    // Find all elements with IDs matching our nav links
    this.sections = Array.from(navHrefs).map(id => document.getElementById(id));

    // Validate required elements
    this.validateElements();

    // Initialize properties
    this.sectionObserver = null;
    this.activeSection = null;

    // Add flag for click handling
    this.isScrollingToTarget = false;

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
    // Add scroll monitoring
    if ('onscrollend' in window) {
      document.addEventListener('scrollend', () => {
        this.isScrollingToTarget = false;
      });
    } else {
      document.addEventListener('scroll', this.handleScroll.bind(this));
    }

    // Add delegated click handler
    this.stickyNav.addEventListener('click', this.handleNavClick.bind(this));
  }

  initializeObservers() {
    // Observer for sections
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

    // Observe all sections
    this.sections.forEach(section => {
      this.sectionObserver.observe(section);
    });

    // Add scroll event listener and bind it to the instance
    this.handleScroll = this.updateNavVisibility.bind(this);
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Check initial position
    this.updateNavVisibility();
  }

  updateNavVisibility() {
    const triggerRect = this.triggerElement.getBoundingClientRect();
    const offset = typeof this.options.jumpLinksTriggerOffset === 'function'
      ? this.options.jumpLinksTriggerOffset()
      : this.options.jumpLinksTriggerOffset;

    if (triggerRect.bottom <= offset) {
      // Show nav when scrolled past trigger
      this.stickyNav.classList.add(...this.options.stickyClasses);
      this.stickyNav.setAttribute('aria-hidden', 'false');
    } else {
      // Hide nav when above trigger
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
    this.activeSection = null;

    // Remove click handlers
    this.navLinks.forEach(link => {
      link.removeEventListener('click', this.handleNavClick);
    });
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        if (!this.isScrollingToTarget) {
          this.updateActiveNavLink();
        }
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
}
