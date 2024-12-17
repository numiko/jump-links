import '../lib/JumpLinks.css';
import { JumpLinks } from '../lib/JumpLinks.js';

const jumpLinkLabel = document.querySelector('[data-js-jump-links-label]');

new JumpLinks('[data-js-jump-links]', {
  linkSelector: 'a',
  stickyTriggerStart: '[data-js-jump-links-trigger-start]',
  stickyTriggerEnd: '[data-js-jump-links-trigger-end]',
  onIntersection: ({ intersectingSection, links, intersectingLink }) => {

    // Remove underline from all links and add it to the intersecting link if it exists
    const activeLinkClasses = ['underline', 'text-black'];
    links.forEach(link => {
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
