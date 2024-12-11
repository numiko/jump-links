import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

const jumpLinkLabel = document.querySelector('[data-js-jumplinks-label]');

// Initialize the sticky navigation with custom options
const jumplinksOptions = {
  jumpLinks: '[data-js-jumplinks]',
  stickyTriggerStart: '[data-js-jumplinks-trigger-start]',
  stickyTriggerEnd: '[data-js-jumplinks-trigger-end]',
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

};

new Jumplinks(jumplinksOptions);
