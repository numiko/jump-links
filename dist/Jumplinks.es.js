class c {
  constructor(t = {}) {
    const s = {
      jumpLinks: "[data-js-jumplinks]",
      progressBar: "[data-js-jumplinks-progress-bar]",
      stickyTriggerStart: null,
      stickyTriggerEnd: null,
      stickyTriggerStartOffset: 0,
      stickyTriggerEndOffset: 0,
      stickyFunction: (e, n) => {
        const r = ["translate-y-0"];
        n ? e.classList.add(...r) : e.classList.remove(...r);
      },
      activeLinkClasses: ["underline"],
      intersectionOptions: {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px"
      },
      onSticky: () => {
      },
      onUnsticky: () => {
      },
      onLinkClick: () => {
      },
      onIntersection: () => {
      }
    };
    this.options = { ...s, ...t }, this.onSticky = this.options.onSticky.bind(this), this.onUnsticky = this.options.onUnsticky.bind(this), this.onLinkClick = this.options.onLinkClick.bind(this), this.onIntersection = this.options.onIntersection.bind(this), this.jumpLinks = typeof this.options.jumpLinks == "string" ? document.querySelector(this.options.jumpLinks) : this.options.jumpLinks, this.jumpLinksAnchors = Array.from(this.jumpLinks.querySelectorAll("a"));
    const i = this.jumpLinksAnchors.map((e) => e.getAttribute("href").substring(1));
    this.sections = i.map((e) => document.getElementById(e)), this.firstSection = this.sections[0], this.lastSection = this.sections[this.sections.length - 1], this.startTrigger = this.options.stickyTriggerStart ? typeof this.options.stickyTriggerStart == "string" ? document.querySelector(this.options.stickyTriggerStart) : this.options.stickyTriggerStart : this.firstSection, this.endTrigger = this.options.stickyTriggerEnd ? typeof this.options.stickyTriggerEnd == "string" ? document.querySelector(this.options.stickyTriggerEnd) : this.options.stickyTriggerEnd : this.lastSection, this.progressBar = typeof this.options.progressBar == "string" ? document.querySelector(this.options.progressBar) : this.options.progressBar, this.hasScrollEndSupport = "onscrollend" in window, this.ticking = !1, this.state = {
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
    const t = [];
    if (this.jumpLinks || t.push("jumpLinks"), this.startTrigger || t.push("stickyTriggerStart"), this.sections.length || t.push("sections with matching IDs"), this.endTrigger || t.push("stickyTriggerEnd or lastSection"), t.length > 0)
      throw console.error("Missing elements:", {
        stickyNav: this.jumpLinks,
        startTrigger: this.startTrigger,
        sections: this.sections,
        endTrigger: this.endTrigger,
        lastSection: this.lastSection
      }), new Error(`Required elements not found: ${t.join(", ")}`);
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
            i.isIntersecting && (this.state.lastActiveSection = i.target.id, this.updateActiveSection(), this.onIntersection(i.target));
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
    i !== this.state.isSticky && (this.state.isSticky = i, this.options.stickyFunction(this.jumpLinks, i), this.jumpLinks.setAttribute("aria-hidden", i ? "false" : "true"), i ? this.onSticky() : this.onUnsticky());
  }
  updateActiveSection(t = this.state.lastActiveSection) {
    this.jumpLinksAnchors.forEach((s) => {
      const e = s.getAttribute("href").substring(1) === t;
      this.options.activeLinkClasses.forEach((n) => {
        s.classList.toggle(n, e);
      });
    });
  }
  updateProgressBar() {
    if (this.progressBar && this.state.isSticky) {
      const t = this.startTrigger.offsetTop + this.state.startOffset, s = this.endTrigger.offsetTop + this.endTrigger.offsetHeight - t + this.state.endOffset, i = window.scrollY - t;
      this.state.progress = Math.max(0, Math.min(100, i / s * 100)).toFixed(2), document.documentElement.style.setProperty("--jumplinks-progress", `${this.state.progress}%`);
    }
  }
  updateOffsets() {
    this.state.startOffset = typeof this.options.stickyTriggerStartOffset == "function" ? this.options.stickyTriggerStartOffset() : this.options.stickyTriggerStartOffset, this.state.endOffset = typeof this.options.stickyTriggerEndOffset == "function" ? this.options.stickyTriggerEndOffset() : this.options.stickyTriggerEndOffset;
  }
  handleJumpLinksClick(t) {
    const s = t.target.closest("a");
    if (!s) return;
    t.preventDefault();
    const i = s.getAttribute("href"), e = document.querySelector(i);
    e && (this.hasScrollEndSupport && (this.sections.forEach((n) => {
      this.sectionObserver.unobserve(n);
    }), document.addEventListener("scrollend", () => {
      this.sections.forEach((n) => {
        this.sectionObserver.observe(n);
      });
    })), this.updateActiveSection(i.substring(1)), e.scrollIntoView({
      behavior: "smooth",
      block: "start"
    }), e.getAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.focus({ preventScroll: !0 }), e.removeAttribute("tabindex"), this.options.onLinkClick(s, e));
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
  c as Jumplinks
};
