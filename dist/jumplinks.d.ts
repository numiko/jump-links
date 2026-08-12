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
declare class JumpLinks {
    private readonly jumpLinksAnchorSelector;
    private options;
    private jumpLinks;
    private jumpLinksAnchors;
    private sections;
    private startTrigger;
    private endTrigger;
    private hasScrollEndSupport;
    private ticking;
    private state;
    private resizeObserver;
    private sectionObserver;
    constructor(jumpLinks?: JumpLinksElement, options?: Partial<JumpLinksOptions>);
    private resolveJumpLinksElement;
    private collectAnchors;
    private collectSections;
    private getFirstSection;
    private getLastSection;
    private init;
    private resolveElement;
    private resolveOffset;
    private validateElements;
    private addEventListeners;
    private initializeObservers;
    private updateNavVisibility;
    private updateProgressBar;
    private updateOffsets;
    private handleJumpLinksClick;
    private handleScroll;
    private handleResize;
    destroy(): void;
    getState(): JumpLinksState;
}
export { JumpLinks, type JumpLinksElement, type StickyTrigger, type JumpLinksOptions, type JumpLinksState, type StickyTriggerCallback, type LinkClickCallback, type IntersectionCallback };
