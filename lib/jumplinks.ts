type JumpLinksElement = string | HTMLElement;
type StickyTrigger = string | HTMLElement | null;

type JumpLinksOptions = {
  /**
   * Whether to enable the progress UI. This will add a
   * progress bar that tracks a user's progress through the jump-links.
   */
  progress: boolean;
  stickyTriggerStart: StickyTrigger;
  stickyTriggerEnd: StickyTrigger;
  stickyTriggerStartOffset: number | (() => number);
  stickyTriggerEndOffset: number | (() => number);
  intersectionOptions: IntersectionObserverInit;
  onStickyTrigger: string[] | StickyTriggerCallback;
  onLinkClick: LinkClickCallback;
  onIntersection: IntersectionCallback;
};

type JumpLinksState = {
  lastActiveSection: string | null;
  isSticky: boolean;
  startOffset: number;
  endOffset: number;
  progress: number;
};

type StickyTriggerCallback = (params: {
  jumpLinks: HTMLElement;
  isSticky: boolean;
  hasStartTriggered: boolean;
  hasEndTriggered: boolean;
}) => void;

type LinkClickCallback = (params: {
  link: HTMLAnchorElement;
  target: HTMLElement;
}) => void;

type IntersectionCallback = (params: {
  intersectingSection: HTMLElement;
  intersectingLink: HTMLAnchorElement | undefined;
}) => void;

const DEFAULT_OPTIONS: JumpLinksOptions = {
  progress: false,
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

const DEFAULT_STATE: JumpLinksState = {
  lastActiveSection: null,
  isSticky: false,
  startOffset: 0,
  endOffset: 0,
  progress: 0
};

class JumpLinks {
  private readonly jumpLinksAnchorSelector = '[data-js-jump-links-anchor]';
  private options: JumpLinksOptions;
  private jumpLinks: HTMLElement;
  private jumpLinksAnchors: HTMLAnchorElement[];
  private sections: HTMLElement[];
  private startTrigger: HTMLElement;
  private endTrigger: HTMLElement;
  private hasScrollEndSupport: boolean;
  private ticking: boolean;
  private state: JumpLinksState;
  private resizeObserver: ResizeObserver | null;
  private sectionObserver: IntersectionObserver | null;

  constructor(jumpLinks: JumpLinksElement = '[data-js-jump-links]', options: Partial<JumpLinksOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.jumpLinks = this.resolveJumpLinksElement(jumpLinks);
    this.jumpLinksAnchors = this.collectAnchors();
    this.sections = this.collectSections();
    this.startTrigger = this.resolveElement(this.options.stickyTriggerStart) ?? this.getFirstSection();
    this.endTrigger = this.resolveElement(this.options.stickyTriggerEnd) ?? this.getLastSection();
    this.hasScrollEndSupport = 'onscrollend' in window;
    this.ticking = false;
    this.state = { ...DEFAULT_STATE };
    this.resizeObserver = null;
    this.sectionObserver = null;
    this.init();
  }

  private resolveJumpLinksElement(jumpLinks: JumpLinksElement) {
    const element = typeof jumpLinks === 'string'
      ? document.querySelector(jumpLinks)
      : jumpLinks;

    if (!(element instanceof HTMLElement)) {
      throw new Error(`JumpLinks element not found: ${jumpLinks}`);
    }
    return element;
  }

  private collectAnchors() {
    return Array.from(this.jumpLinks.querySelectorAll<HTMLAnchorElement>(this.jumpLinksAnchorSelector))
      .filter((anchor): anchor is HTMLAnchorElement => {
        const href = anchor.getAttribute('href');
        return href !== null && href.startsWith('#');
      });
  }

  private collectSections() {
    return this.jumpLinksAnchors
      .map(link => {
        const href = link.getAttribute('href');
        return href ? document.getElementById(href.slice(1)) : null;
      })
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
  }

  private getFirstSection() {
    const firstSection = this.sections[0];
    if (!firstSection) {
      throw new Error('Jump-link sections not found. Please ensure your links point to existing elements.');
    }

    return firstSection;
  }

  private getLastSection() {
    const lastSection = this.sections[this.sections.length - 1];
    if (!lastSection) {
      throw new Error('Jump-link sections not found. Please ensure your links point to existing elements.');
    }

    return lastSection;
  }

  private async init() {
    this.validateElements();
    this.jumpLinks.setAttribute('aria-hidden', 'true');
    this.addEventListeners();
    this.updateOffsets();
    await this.initializeObservers();
    this.updateNavVisibility();
    this.updateProgressBar();
  }

  private resolveElement(input: StickyTrigger) {
    if (!input) return null;
    if (typeof input === 'string') return document.querySelector<HTMLElement>(input);
    return input instanceof HTMLElement ? input : null;
  }

  private resolveOffset(value: number | (() => number)) {
    return typeof value === 'function' ? value() : value;
  }

  private validateElements() {
    if (!this.jumpLinksAnchors.length) {
      const errorMessage = `
        Jump-link anchors not found. Add a 'data-js-jump-links-anchor' attribute to your links.`;
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
        Some jump-link sections could not be found. Please ensure all href attributes in your links point to existing elements.`;
      throw new Error(errorMessage);
    }

    if (typeof this.options.progress !== 'boolean') {
      const errorMessage = `
        The 'progress' option must be a boolean value.
        Received: ${typeof this.options.progress}`;
      throw new Error(errorMessage);
    }
  }

  private addEventListeners() {
    document.addEventListener('scroll', this.handleScroll, { passive: true });
    this.jumpLinks.addEventListener('click', this.handleJumpLinksClick);
  }

  private initializeObservers() {
    return new Promise<void>(resolve => {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(document.documentElement);

      this.sectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              const sectionId = entry.target.id;
              this.state.lastActiveSection = sectionId;
              this.options.onIntersection({
                intersectingSection: entry.target,
                intersectingLink: this.jumpLinksAnchors.find(
                  link => link.getAttribute('href') === `#${sectionId}`
                )
              });
            }
          }
          resolve();
        },
        this.options.intersectionOptions
      );

      for (const section of this.sections) {
        this.sectionObserver.observe(section);
      }
    });
  }

  private updateNavVisibility() {
    const hasStartTriggered = this.startTrigger.getBoundingClientRect().top + this.state.startOffset <= 0;
    const hasEndTriggered = this.endTrigger.getBoundingClientRect().bottom < -this.state.endOffset;
    const shouldBeSticky = hasStartTriggered && !hasEndTriggered;

    // If the state hasn't changed, do nothing
    if (shouldBeSticky === this.state.isSticky) return;

    this.state.isSticky = shouldBeSticky;

    // Handle both function and array cases
    if (Array.isArray(this.options.onStickyTrigger)) {
      const classes = this.options.onStickyTrigger as string[];
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

  private updateProgressBar() {
    if (!this.options.progress) return;
    const startTop = this.startTrigger.getBoundingClientRect().top + window.scrollY + this.state.startOffset;
    const endTop = this.endTrigger.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = endTop + this.endTrigger.offsetHeight - startTop + this.state.endOffset;
    const scrollPosition = window.scrollY - startTop;
    this.state.progress = parseFloat(Math.max(0, Math.min(100, (scrollPosition / scrollDistance) * 100)).toFixed(2));
    document.documentElement.style.setProperty('--jump-links-progress', `${this.state.progress.toFixed(2)}%`);
  }

  private updateOffsets() {
    this.state.startOffset = this.resolveOffset(this.options.stickyTriggerStartOffset);
    this.state.endOffset = this.resolveOffset(this.options.stickyTriggerEndOffset);
  }

  private handleJumpLinksClick = (event: Event) => {
    const eventTarget = event.target;
    if (!(eventTarget instanceof HTMLElement)) return;

    const link = eventTarget.closest<HTMLAnchorElement>(this.jumpLinksAnchorSelector);
    if (!link) return;

    event.preventDefault();
    const targetId = link.getAttribute('href');
    if (!targetId) return;

    const target = document.querySelector<HTMLElement>(targetId);
    if (!target) return;

    // Temporarily stop observing all sections to prevent double triggering of active links
    if (this.hasScrollEndSupport && this.sectionObserver) {
      const observer = this.sectionObserver;
      for (const section of this.sections) {
        observer.unobserve(section);
      }

      // Re-observe sections after smooth scroll animation
      document.addEventListener('scrollend', () => {
        for (const section of this.sections) {
          observer.observe(section);
        }
      }, { once: true });
    }

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Temporarily make the target focusable if it isn't already
    const hadTabIndex = target.hasAttribute('tabindex');
    if (!hadTabIndex) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
    if (!hadTabIndex) {
      target.removeAttribute('tabindex');
    }

    this.options.onLinkClick({ link, target });
  };

  private handleScroll = () => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateNavVisibility();
        this.updateProgressBar();
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private handleResize = () => {
    this.updateOffsets();
    this.updateProgressBar();
  };

  public destroy() {
    this.sectionObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.sectionObserver = null;
    this.resizeObserver = null;

    document.removeEventListener('scroll', this.handleScroll);
    this.jumpLinks.removeEventListener('click', this.handleJumpLinksClick);

    this.state.lastActiveSection = null;
  }

  public getState(): JumpLinksState {
    return { ...this.state };
  }
}

// Exports
export {
  JumpLinks,
  type JumpLinksElement,
  type StickyTrigger,
  type JumpLinksOptions,
  type JumpLinksState,
  type StickyTriggerCallback,
  type LinkClickCallback,
  type IntersectionCallback
};
