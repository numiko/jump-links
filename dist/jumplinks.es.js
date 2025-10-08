class o {
  constructor(t = "[data-js-jump-links]", s = {}) {
    const i = {
      progress: !1,
      stickyTriggerStart: null,
      stickyTriggerEnd: null,
      stickyTriggerStartOffset: 0,
      stickyTriggerEndOffset: 0,
      intersectionOptions: {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px"
      },
      onStickyTrigger: ["translate-y-0"],
      onLinkClick: () => {
      },
      onIntersection: () => {
      }
    };
    if (this.options = { ...i, ...s }, this.jumpLinks = typeof t == "string" ? document.querySelector(t) : t, !this.jumpLinks)
      throw new Error(`JumpLinks element not found: ${t}`);
    this.jumpLinksAnchorSelector = "[data-js-jump-links-anchor]", this.jumpLinksAnchors = Array.from(this.jumpLinks.querySelectorAll(this.jumpLinksAnchorSelector));
    const e = this.jumpLinksAnchors.map((r) => r.getAttribute("href").substring(1));
    this.sections = e.map((r) => document.getElementById(r)), this.firstSection = this.sections[0], this.lastSection = this.sections[this.sections.length - 1], this.startTrigger = this.options.stickyTriggerStart ? typeof this.options.stickyTriggerStart == "string" ? document.querySelector(this.options.stickyTriggerStart) : this.options.stickyTriggerStart : this.firstSection, this.endTrigger = this.options.stickyTriggerEnd ? typeof this.options.stickyTriggerEnd == "string" ? document.querySelector(this.options.stickyTriggerEnd) : this.options.stickyTriggerEnd : this.lastSection, this.hasScrollEndSupport = "onscrollend" in window, this.ticking = !1, this.state = {
      lastActiveSection: null,
      isSticky: !1,
      startOffset: 0,
      endOffset: 0,
      progress: 0
    }, this.bindThisToMemberFunctions(), this.init();
  }
  bindThisToMemberFunctions() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((s) => {
      typeof this[s] == "function" && (this[s] = this[s].bind(this));
    });
  }
  async init() {
    this.validateElements(), this.jumpLinks.setAttribute("aria-hidden", "true"), this.addEventListeners(), this.updateOffsets(), await this.initializeObservers(), this.updateNavVisibility(), this.updateProgressBar();
  }
  validateElements() {
    if (!this.jumpLinksAnchors.length) {
      const t = `
        Jump-link anchors not found. Add a 'data-js-jump-links-anchor' attribute to your links.`;
      throw new Error(t);
    }
    if (!this.startTrigger) {
      const t = `
        Start trigger element not found. The default selector is the first section.
        If you are using a custom selector via the 'stickyTriggerStart' option, please make sure it is correct.
        `;
      throw new Error(t);
    }
    if (!this.endTrigger) {
      const t = `
        End trigger element not found. The default selector is the last section.
        If you are using a custom selector via the 'stickyTriggerEnd' option, please make sure it is correct.
        `;
      throw new Error(t);
    }
    if (this.sections.some((t) => t === null)) {
      const t = `
        Some jump-link sections could not be found. Please ensure all href attributes in your links point to existing elements.`;
      throw new Error(t);
    }
    if (typeof this.options.progress != "boolean") {
      const t = `
        The 'progress' option must be a boolean value.
        Received: ${typeof this.options.progress}`;
      throw new Error(t);
    }
  }
  addEventListeners() {
    document.addEventListener("scroll", this.handleScroll), this.jumpLinks.addEventListener("click", this.handleJumpLinksClick);
  }
  initializeObservers() {
    return new Promise((t) => {
      this.resizeObserver = new ResizeObserver(
        this.handleResize.bind(this)
      ), this.resizeObserver.observe(document.documentElement), this.sectionObserver = new IntersectionObserver(
        (s) => {
          s.forEach((i) => {
            i.isIntersecting && (this.state.lastActiveSection = i.target.id, this.options.onIntersection({
              intersectingSection: i.target,
              intersectingLink: this.jumpLinksAnchors.find(
                (e) => e.getAttribute("href") === `#${i.target.id}`
              )
            }));
          }), t();
        },
        this.options.intersectionOptions
      ), this.sections.forEach((s) => {
        this.sectionObserver.observe(s);
      });
    });
  }
  updateNavVisibility() {
    const t = this.startTrigger.getBoundingClientRect().top + this.state.startOffset <= 0, s = this.endTrigger.getBoundingClientRect().bottom < -this.state.endOffset, i = t && !s;
    if (i !== this.state.isSticky) {
      if (this.state.isSticky = i, Array.isArray(this.options.onStickyTrigger)) {
        const e = this.options.onStickyTrigger;
        this.state.isSticky ? this.jumpLinks.classList.add(...e) : this.jumpLinks.classList.remove(...e);
      } else
        this.options.onStickyTrigger({
          jumpLinks: this.jumpLinks,
          isSticky: this.state.isSticky,
          hasStartTriggered: t,
          hasEndTriggered: s
        });
      this.jumpLinks.setAttribute("aria-hidden", i ? "false" : "true");
    }
  }
  updateProgressBar() {
    if (!this.options.progress) return;
    const t = this.startTrigger.getBoundingClientRect().top + window.scrollY + this.state.startOffset, i = this.endTrigger.getBoundingClientRect().top + window.scrollY + this.endTrigger.offsetHeight - t + this.state.endOffset, e = window.scrollY - t;
    this.state.progress = Math.max(0, Math.min(100, e / i * 100)).toFixed(2), document.documentElement.style.setProperty("--jump-links-progress", `${this.state.progress}%`);
  }
  updateOffsets() {
    this.state.startOffset = typeof this.options.stickyTriggerStartOffset == "function" ? this.options.stickyTriggerStartOffset() : this.options.stickyTriggerStartOffset, this.state.endOffset = typeof this.options.stickyTriggerEndOffset == "function" ? this.options.stickyTriggerEndOffset() : this.options.stickyTriggerEndOffset;
  }
  handleJumpLinksClick(t) {
    const s = t.target.closest(this.jumpLinksAnchorSelector);
    if (!s) return;
    t.preventDefault();
    const i = s.getAttribute("href"), e = document.querySelector(i);
    e && (this.hasScrollEndSupport && (this.sections.forEach((r) => {
      this.sectionObserver.unobserve(r);
    }), document.addEventListener("scrollend", () => {
      this.sections.forEach((r) => {
        this.sectionObserver.observe(r);
      });
    })), e.scrollIntoView({
      behavior: "smooth",
      block: "start"
    }), e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus({ preventScroll: !0 }), e.removeAttribute("tabindex"), this.options.onLinkClick({
      link: s,
      target: e
    }));
  }
  handleScroll() {
    this.ticking || (window.requestAnimationFrame(() => {
      this.updateNavVisibility(), this.updateProgressBar(), this.ticking = !1;
    }), this.ticking = !0);
  }
  handleResize() {
    this.updateOffsets(), this.updateProgressBar();
  }
  destroy() {
    this.sectionObserver && this.sectionObserver.disconnect(), this.resizeObserver.disconnect(), document.removeEventListener("scroll", this.handleScroll), this.jumpLinks.removeEventListener("click", this.handleJumpLinksClick), this.state.lastActiveSection = null;
  }
  // Optional: Add a method to get current state (useful for debugging)
  getState() {
    return { ...this.state };
  }
}
export {
  o as JumpLinks
};
