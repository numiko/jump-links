import '../lib/jumplinks.css';
import { JumpLinks } from '../lib/jumplinks';

const jumpLinksAnchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('[data-js-jump-links-anchor]');
const jumpLinkLabel: HTMLElement | null = document.querySelector('[data-js-jump-links-label]');
const activeLinkClasses: string[] = ['underline', 'text-black'];

new JumpLinks('[data-js-jump-links]', {
  progress: true,
  stickyTriggerStart: '[data-js-jump-links-trigger-start]',
  stickyTriggerEnd: '[data-js-jump-links-trigger-end]',
  onIntersection: ({ intersectingSection, intersectingLink }) => {
    // Remove underline from all links and add it to the intersecting link if it exists
    jumpLinksAnchors.forEach(link => {
      activeLinkClasses.forEach(className => {
        link.classList.toggle(className, link === intersectingLink);
      });
    });

    // Set the label to the intersecting section's h2 text or the section's id
    if (jumpLinkLabel) {
      const heading = intersectingSection.querySelector('h2');
      jumpLinkLabel.textContent = heading?.textContent || intersectingSection.id;
    }
  },
});
