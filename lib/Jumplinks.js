export class Jumplinks {
  constructor(options = {}) {
    // Default options
    const defaults = {
      stickyNavElement: '#sticky-nav',
      stickyTriggerElement: null,
      visibleClasses: ['translate-y-0'],
      offset: 0,
      activeClasses: ['text-blue-800', 'font-bold'],
      inactiveClasses: ['text-blue-600', 'hover:text-blue-800']
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

    // Get all sections and their corresponding navigation links
    this.navLinks = Array.from(this.stickyNav.querySelectorAll('a'));

    // Get all sections that have corresponding nav links
    const navHrefs = new Set(this.navLinks.map(link => link.getAttribute('href').substring(1)));
    this.sections = Array.from(document.querySelectorAll('section[id]'))
      .filter(section => navHrefs.has(section.id));

    // Throw error if elements not found
    if (!this.stickyNav || !this.triggerElement || !this.sections.length) {
      throw new Error('Required elements not found. Please check your selectors.');
    }

    // Initialize properties
    this.sectionObserver = null;
    this.visibleSections = new Map();


    // Hide nav initially
    this.updateNavVisibility();

    // Initialize observers
    this.initializeObservers();

    // Add click handlers to nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this));
    });

    // Add flag for click handling
    this.isScrollingToTarget = false;

    // Add scroll monitoring
    if ('onscrollend' in window) {
      // Modern browsers with scrollend support
      window.addEventListener('scrollend', () => {
        this.isScrollingToTarget = false;
      });
    } else {
      // Fallback for browsers without scrollend
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (this.isScrollingToTarget) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            this.isScrollingToTarget = false;
          }, 100); // Small timeout to detect when scrolling stops
        }
      }, { passive: true });
    }
  }

  initializeObservers() {
    // Observer for sections
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.visibleSections.set(entry.target.id, entry.intersectionRatio);
          this.updateActiveSection();
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
      this.options.visibleClasses.forEach(className => {
        console.log('Adding class:', className);
        this.stickyNav.classList.add(className);
      });
    } else {
      this.options.visibleClasses.forEach(className => {
        this.stickyNav.classList.remove(className);
      });
    }
  }

  updateActiveSection() {
    // Skip updates if we're scrolling to a target
    if (this.isScrollingToTarget) return;

    // Find section with highest visibility ratio among tracked sections
    let activeSection = null;

    // Sort sections by their position in the DOM
    const sortedSections = Array.from(this.visibleSections.entries())
      .sort((a, b) => {
        const elemA = document.getElementById(a[0]);
        const elemB = document.getElementById(b[0]);
        return elemA.compareDocumentPosition(elemB) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      });

    // Find the first visible section
    for (const [sectionId, ratio] of sortedSections) {
      if (ratio > 0) {
        activeSection = sectionId;
        break;
      }
    }

    // If no section is visible at all, find the nearest section above the viewport
    if (!activeSection) {
      const viewportTop = window.scrollY;
      let nearestSection = null;
      let minDistance = Infinity;

      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const distance = viewportTop - sectionTop;

        // Only consider sections above the viewport (distance > 0)
        if (distance > 0 && distance < minDistance) {
          minDistance = distance;
          nearestSection = section.id;
        }
      });

      if (nearestSection) {
        activeSection = nearestSection;
      }
    }

    // Update nav links
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      if (href === activeSection) {
        this.options.inactiveClasses.forEach(cls => link.classList.remove(cls));
        this.options.activeClasses.forEach(cls => link.classList.add(cls));
      } else {
        this.options.activeClasses.forEach(cls => link.classList.remove(cls));
        this.options.inactiveClasses.forEach(cls => link.classList.add(cls));
      }
    });
  }

  handleNavClick(event) {
    this.isScrollingToTarget = true;

    // Update active styles immediately
    this.navLinks.forEach(link => {
      const isClickedLink = link === event.currentTarget;
      if (isClickedLink) {
        this.options.inactiveClasses.forEach(cls => link.classList.remove(cls));
        this.options.activeClasses.forEach(cls => link.classList.add(cls));
      } else {
        this.options.activeClasses.forEach(cls => link.classList.remove(cls));
        this.options.inactiveClasses.forEach(cls => link.classList.add(cls));
      }
    });
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
    this.visibleSections.clear();

    // Remove click handlers
    this.navLinks.forEach(link => {
      link.removeEventListener('click', this.handleNavClick);
    });
  }
}
