// lib/jumplinks.ts
var e = {
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
	onLinkClick: () => {},
	onIntersection: () => {}
}, t = {
	lastActiveSection: null,
	isSticky: !1,
	startOffset: 0,
	endOffset: 0,
	progress: 0
}, n = class {
	constructor(n = "[data-js-jump-links]", r = {}) {
		this.jumpLinksAnchorSelector = "[data-js-jump-links-anchor]", this.handleJumpLinksClick = (e) => {
			let t = e.target;
			if (!(t instanceof HTMLElement)) return;
			let n = t.closest(this.jumpLinksAnchorSelector);
			if (!n) return;
			e.preventDefault();
			let r = n.getAttribute("href");
			if (!r) return;
			let i = document.querySelector(r);
			if (!i) return;
			if (this.hasScrollEndSupport && this.sectionObserver) {
				let e = this.sectionObserver;
				for (let t of this.sections) e.unobserve(t);
				document.addEventListener("scrollend", () => {
					for (let t of this.sections) e.observe(t);
				}, { once: !0 });
			}
			i.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
			let a = i.hasAttribute("tabindex");
			a || i.setAttribute("tabindex", "-1"), i.focus({ preventScroll: !0 }), a || i.removeAttribute("tabindex"), this.options.onLinkClick({
				link: n,
				target: i
			});
		}, this.handleScroll = () => {
			this.ticking ||= (window.requestAnimationFrame(() => {
				this.updateNavVisibility(), this.updateProgressBar(), this.ticking = !1;
			}), !0);
		}, this.handleResize = () => {
			this.updateOffsets(), this.updateProgressBar();
		}, this.options = {
			...e,
			...r
		}, this.jumpLinks = this.resolveJumpLinksElement(n), this.jumpLinksAnchors = this.collectAnchors(), this.sections = this.collectSections(), this.startTrigger = this.resolveElement(this.options.stickyTriggerStart) ?? this.getFirstSection(), this.endTrigger = this.resolveElement(this.options.stickyTriggerEnd) ?? this.getLastSection(), this.hasScrollEndSupport = "onscrollend" in window, this.ticking = !1, this.state = { ...t }, this.resizeObserver = null, this.sectionObserver = null, this.init();
	}
	resolveJumpLinksElement(e) {
		let t = typeof e == "string" ? document.querySelector(e) : e;
		if (!(t instanceof HTMLElement)) throw Error(`JumpLinks element not found: ${e}`);
		return t;
	}
	collectAnchors() {
		return Array.from(this.jumpLinks.querySelectorAll(this.jumpLinksAnchorSelector)).filter((e) => {
			let t = e.getAttribute("href");
			return t !== null && t.startsWith("#");
		});
	}
	collectSections() {
		return this.jumpLinksAnchors.map((e) => {
			let t = e.getAttribute("href");
			return t ? document.getElementById(t.slice(1)) : null;
		}).filter((e) => e instanceof HTMLElement);
	}
	getFirstSection() {
		let e = this.sections[0];
		if (!e) throw Error("Jump-link sections not found. Please ensure your links point to existing elements.");
		return e;
	}
	getLastSection() {
		let e = this.sections[this.sections.length - 1];
		if (!e) throw Error("Jump-link sections not found. Please ensure your links point to existing elements.");
		return e;
	}
	async init() {
		this.validateElements(), this.jumpLinks.setAttribute("aria-hidden", "true"), this.addEventListeners(), this.updateOffsets(), await this.initializeObservers(), this.updateNavVisibility(), this.updateProgressBar();
	}
	resolveElement(e) {
		return e ? typeof e == "string" ? document.querySelector(e) : e instanceof HTMLElement ? e : null : null;
	}
	resolveOffset(e) {
		return typeof e == "function" ? e() : e;
	}
	validateElements() {
		if (!this.jumpLinksAnchors.length) throw Error("\n        Jump-link anchors not found. Add a 'data-js-jump-links-anchor' attribute to your links.");
		if (!this.startTrigger) throw Error("\n        Start trigger element not found. The default selector is the first section.\n        If you are using a custom selector via the 'stickyTriggerStart' option, please make sure it is correct.\n        ");
		if (!this.endTrigger) throw Error("\n        End trigger element not found. The default selector is the last section.\n        If you are using a custom selector via the 'stickyTriggerEnd' option, please make sure it is correct.\n        ");
		if (this.sections.some((e) => e === null)) throw Error("\n        Some jump-link sections could not be found. Please ensure all href attributes in your links point to existing elements.");
		if (typeof this.options.progress != "boolean") {
			let e = `
        The 'progress' option must be a boolean value.
        Received: ${typeof this.options.progress}`;
			throw Error(e);
		}
	}
	addEventListeners() {
		document.addEventListener("scroll", this.handleScroll, { passive: !0 }), this.jumpLinks.addEventListener("click", this.handleJumpLinksClick);
	}
	initializeObservers() {
		return new Promise((e) => {
			this.resizeObserver = new ResizeObserver(this.handleResize), this.resizeObserver.observe(document.documentElement), this.sectionObserver = new IntersectionObserver((t) => {
				for (let e of t) if (e.isIntersecting && e.target instanceof HTMLElement) {
					let t = e.target.id;
					this.state.lastActiveSection = t, this.options.onIntersection({
						intersectingSection: e.target,
						intersectingLink: this.jumpLinksAnchors.find((e) => e.getAttribute("href") === `#${t}`)
					});
				}
				e();
			}, this.options.intersectionOptions);
			for (let e of this.sections) this.sectionObserver.observe(e);
		});
	}
	updateNavVisibility() {
		let e = this.startTrigger.getBoundingClientRect().top + this.state.startOffset <= 0, t = this.endTrigger.getBoundingClientRect().bottom < -this.state.endOffset, n = e && !t;
		if (n !== this.state.isSticky) {
			if (this.state.isSticky = n, Array.isArray(this.options.onStickyTrigger)) {
				let e = this.options.onStickyTrigger;
				this.state.isSticky ? this.jumpLinks.classList.add(...e) : this.jumpLinks.classList.remove(...e);
			} else this.options.onStickyTrigger({
				jumpLinks: this.jumpLinks,
				isSticky: this.state.isSticky,
				hasStartTriggered: e,
				hasEndTriggered: t
			});
			this.jumpLinks.setAttribute("aria-hidden", n ? "false" : "true");
		}
	}
	updateProgressBar() {
		if (!this.options.progress) return;
		let e = this.startTrigger.getBoundingClientRect().top + window.scrollY + this.state.startOffset, t = this.endTrigger.getBoundingClientRect().top + window.scrollY + this.endTrigger.offsetHeight - e + this.state.endOffset, n = window.scrollY - e;
		this.state.progress = parseFloat(Math.max(0, Math.min(100, n / t * 100)).toFixed(2)), document.documentElement.style.setProperty("--jump-links-progress", `${this.state.progress.toFixed(2)}%`);
	}
	updateOffsets() {
		this.state.startOffset = this.resolveOffset(this.options.stickyTriggerStartOffset), this.state.endOffset = this.resolveOffset(this.options.stickyTriggerEndOffset);
	}
	destroy() {
		this.sectionObserver?.disconnect(), this.resizeObserver?.disconnect(), this.sectionObserver = null, this.resizeObserver = null, document.removeEventListener("scroll", this.handleScroll), this.jumpLinks.removeEventListener("click", this.handleJumpLinksClick), this.state.lastActiveSection = null;
	}
	getState() {
		return { ...this.state };
	}
};
export { n as JumpLinks };
