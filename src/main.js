import '../lib/JumpLinks.css';
import { JumpLinks } from '../lib/JumpLinks.js';

const jumpLinksAnchors = document.querySelectorAll('[data-js-jump-links-anchor]');
const jumpLinkLabel = document.querySelector('[data-js-jump-links-label]');
const activeLinkClasses = ['underline', 'text-black'];

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
      jumpLinkLabel.textContent = intersectingSection.querySelector('h2')?.textContent || intersectingSection.id;
    }
  },
});
