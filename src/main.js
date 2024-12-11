import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

const jumpLinkLabel = document.querySelector('[data-js-jumplinks-label]');

// Initialize the sticky navigation with custom options
const jumplinksOptions = {
  jumpLinks: '[data-js-jumplinks]',
  // stickyTriggerStart: '[data-js-jumplinks-trigger-start]',
  // stickyTriggerEnd: '[data-js-jumplinks-trigger-end]',
  stickyTriggerStartOffset: 0,
  stickyTriggerEndOffset: 0,
  onStickyTrigger: ({jumplinks, isSticky, hasStartTriggered, hasEndTriggered}) => {
    console.log('onStickyTrigger', {
      jumplinks,
      isSticky,
      hasStartTriggered,
      hasEndTriggered
    });

    const classes = ['translate-y-0'];
    if (isSticky) {
      jumplinks.classList.add(...classes);
    } else {
      jumplinks.classList.remove(...classes);
    }
  },
  onLinkClick: ({link, target}) => {
    console.log('onLinkClick', {
      link,
      target
    });
  },
  onIntersection: ({ sections, intersectingSection, links, intersectingLink }) => {
    console.log('onIntersection', {
      sections,
      intersectingSection,
      links,
      intersectingLink
    });

    // Remove underline from all links and add it to the intersecting link if it exists
    const activeLinkClasses = ['underline', 'text-red-500'];
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
