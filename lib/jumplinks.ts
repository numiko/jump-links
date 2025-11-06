// Type definitions
type JumpLinksElement = string | HTMLElement;
type StickyTrigger = string | HTMLElement | null;

type JumpLinksOptions = {
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

// Callback types for better type inference
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

class JumpLinks {
  private options: JumpLinksOptions = {
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
  private jumpLinks: HTMLElement;
  private jumpLinksAnchorSelector: string;
  private jumpLinksAnchors: HTMLAnchorElement[];
  private sections: HTMLElement[];
  private firstSection: HTMLElement;
  private lastSection: HTMLElement;
  private startTrigger: HTMLElement;
  private endTrigger: HTMLElement;
  private hasScrollEndSupport: boolean;
  private ticking: boolean;
  private state: JumpLinksState;
  private resizeObserver: ResizeObserver = new ResizeObserver(() => {});
  private sectionObserver: IntersectionObserver = new IntersectionObserver(() => {});

  constructor(jumpLinks: JumpLinksElement = '[data-js-jump-links]', options: Partial<JumpLinksOptions> = {}) {
    this.jumpLinks = this.setJumpLinksElement(jumpLinks);
    this.jumpLinksAnchorSelector = '[data-js-jump-links-anchor]';
    this.jumpLinksAnchors = [];
    this.sections = [];
    this.firstSection = this.sections[0] as HTMLElement;
    this.lastSection = this.sections[this.sections.length - 1] as HTMLElement;
    this.startTrigger = this.getStartTrigger();
    this.endTrigger = this.getEndTrigger();
    this.hasScrollEndSupport = false;
    this.ticking = false;
    this.state = {
      lastActiveSection: null,
      isSticky: false,
      startOffset: 0,
      endOffset: 0,
      progress: 0
    };
    this.setOptions(options);
    this.resolveJumpLinksElement(jumpLinks);
    this.collectAnchorsAndSections();
    this.initializeFlags();
    this.initializeState();
    this.init();
  }

  private setOptions(options: Partial<JumpLinksOptions>): void {
    this.options = { ...this.options, ...options };
  }

  private setJumpLinksElement(jumpLinks: JumpLinksElement): HTMLElement {
    const jumpLinksElement = typeof jumpLinks === 'string'
      ? document.querySelector(jumpLinks)
      : jumpLinks;

    if (!this.isHTMLElement(jumpLinksElement)) {
      throw new Error(`JumpLinks element not found: ${jumpLinks}`);
    }
    return jumpLinksElement;
  }

  private resolveJumpLinksElement(jumpLinks: JumpLinksElement): void {
    const jumpLinksElement = typeof jumpLinks === 'string'
      ? document.querySelector(jumpLinks)
      : jumpLinks;

    if (!this.isHTMLElement(jumpLinksElement)) {
      throw new Error(`JumpLinks element not found: ${jumpLinks}`);
    }
    this.jumpLinks = jumpLinksElement;
  }

  private collectAnchorsAndSections(): void {
    this.jumpLinksAnchorSelector = '[data-js-jump-links-anchor]';
    this.jumpLinksAnchors = Array.from(this.jumpLinks.querySelectorAll<HTMLAnchorElement>(this.jumpLinksAnchorSelector))
      .filter(a => a.getAttribute('href') && a.getAttribute('href')!.startsWith('#'));

    const anchorIds = this.jumpLinksAnchors.map(link => link.getAttribute('href')!.slice(1));
    this.sections = anchorIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    this.firstSection = this.sections[0] as HTMLElement;
    this.lastSection = this.sections[this.sections.length - 1] as HTMLElement;
  }

  private getStartTrigger(): HTMLElement {
    const resolvedStart = this.resolveElement(this.options.stickyTriggerStart);
    const startTrigger = resolvedStart ?? this.firstSection;
    return startTrigger;
  }

  private getEndTrigger(): HTMLElement {
    const resolvedEnd = this.resolveElement(this.options.stickyTriggerEnd);
    const endTrigger = resolvedEnd ?? this.lastSection;
    return endTrigger;
  }


  private initializeFlags(): void {
    this.hasScrollEndSupport = 'onscrollend' in window;
    this.ticking = false;
  }

  private initializeState(): void {
    this.state = {
      lastActiveSection: null,
      isSticky: false,
      startOffset: 0,
      endOffset: 0,
      progress: 0
    };
  }

  private async init(): Promise<void> {
    this.validateElements();
    this.jumpLinks.setAttribute('aria-hidden', 'true');
    this.addEventListeners();
    this.updateOffsets();
    // Wait for first intersection before continuing
    await this.initializeObservers();

    this.updateNavVisibility();
    this.updateProgressBar();
  }

  private isHTMLElement(el: unknown): el is HTMLElement {
    return el instanceof HTMLElement;
  }

  private resolveElement(input: StickyTrigger | undefined | null): HTMLElement | null {
    if (!input) return null;
    if (typeof input === 'string') return document.querySelector(input);
    return this.isHTMLElement(input) ? input : null;
  }

  private resolveOffset(value: number | (() => number)): number {
    return typeof value === 'function' ? value() : value;
  }

  private validateElements(): void {
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

  private addEventListeners(): void {
    document.addEventListener('scroll', this.handleScroll, { passive: true });
    this.jumpLinks.addEventListener('click', this.handleJumpLinksClick);
  }

  private initializeObservers(): Promise<void> {
    return new Promise<void>(resolve => {
      this.resizeObserver = new ResizeObserver(this.handleResize);

      this.resizeObserver.observe(document.documentElement);

      this.sectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.state.lastActiveSection = (entry.target as HTMLElement).id;
              this.options.onIntersection({
                intersectingSection: entry.target as HTMLElement,
                intersectingLink: this.jumpLinksAnchors.find(
                  link => link.getAttribute('href') === `#${(entry.target as HTMLElement).id}`
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

  private updateNavVisibility(): void {
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

  private updateProgressBar(): void {
    if (!this.options.progress) return;
    const startTop = this.startTrigger.getBoundingClientRect().top + window.scrollY + this.state.startOffset;
    const endTop = this.endTrigger.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = endTop + this.endTrigger.offsetHeight - startTop + this.state.endOffset;
    const scrollPosition = window.scrollY - startTop;
    this.state.progress = parseFloat(Math.max(0, Math.min(100, (scrollPosition / scrollDistance) * 100)).toFixed(2));
    document.documentElement.style.setProperty('--jump-links-progress', `${this.state.progress.toFixed(2)}%`);
  }

  private updateOffsets(): void {
    this.state.startOffset = this.resolveOffset(this.options.stickyTriggerStartOffset);
    this.state.endOffset = this.resolveOffset(this.options.stickyTriggerEndOffset);
  }

  private handleJumpLinksClick = (event: Event): void => {
    // Find clicked anchor from jumpLinksAnchors array
    const link = (event.target as HTMLElement).closest(this.jumpLinksAnchorSelector) as HTMLAnchorElement;

    if (!link) return;

    event.preventDefault();
    const targetId = link.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) as HTMLElement : null;

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
        }, { once: true });
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

  private handleScroll = (): void => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateNavVisibility();
        this.updateProgressBar();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private handleResize = (): void => {
    this.updateOffsets();
    this.updateProgressBar();
  }

  public destroy(): void {
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
