export class Jumplinks {
  constructor(options = {}) {
    // Default options
    const defaults = {
      stickyNavElement: '[data-js-jumplinks]',
      stickyTriggerElement: '[data-js-jumplinks-trigger]',
      visibleClasses: ['translate-y-0'],
      offset: 0,
      activeClasses: ['underline', 'font-bold'],
    };

    // Merge defaults with provided options
    this.options = { ...defaults, ...options };

    // Get DOM elements
    this.stickyNav = typeof this.options.stickyNavElement === 'string'
      ? document.querySelector(this.options.stickyNavElement)
      : this.options.stickyNavElement;

    // Get trigger element (required)
    this.triggerElement = typeof this.options.stickyTriggerElement === 'string'
      ? document.querySelector(this.options.stickyTriggerElement)
      : this.options.stickyTriggerElement;

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
    if (triggerRect.bottom <= this.options.offset) {
      // Show nav when scrolled past trigger
      this.stickyNav.classList.add(...this.options.visibleClasses);
      this.stickyNav.setAttribute('aria-hidden', 'false');
    } else {
      // Hide nav when above trigger
      this.stickyNav.classList.remove(...this.options.visibleClasses);
      this.stickyNav.setAttribute('aria-hidden', 'true');
    }
  }

  updateActiveSection() {
    if (this.isScrollingToTarget) return;

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      const isActive = href === this.activeSection;

      this.options.activeClasses.forEach(cls => {
        link.classList.toggle(cls, isActive);
      });
    });
  }

  handleNavClick(event) {
    // Check if clicked element is a link
    const link = event.target.closest('a');
    if (!link || !this.stickyNav.contains(link)) return;

    // Rest of the click handler logic
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      this.isScrollingToTarget = true;

      // Keep focus on the clicked link (not event.currentTarget)
      link.focus();

      // Update active styles immediately
      this.navLinks.forEach(navLink => {
        const isClickedLink = navLink === link;
        if (isClickedLink) {
          this.options.activeClasses.forEach(cls => navLink.classList.add(cls));
        } else {
          this.options.activeClasses.forEach(cls => navLink.classList.remove(cls));
        }
      });

      // Scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
