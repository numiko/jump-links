import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
const jumplinksOptions = {
  jumpLinks: '[data-js-jumplinks]',
  stickyTriggerStart: '[data-js-jumplinks-trigger-start]',
  stickyTriggerStartOffset: 0,
  stickyTriggerEndOffset: 0,
  activeLinkClasses: ['underline'],
  onLinkClick: (link, targetElement) => {
    console.log('link', link);
    console.log('targetElement', targetElement);
  },
  // stickyFunction: (element, isSticky) => {
  //   // Use your own logic to handle the sticky state - either classes or animation function (GSAP)
  // }
  // intersectionOptions: {
  //   threshold: 0,
  //   rootMargin: '-20% 0px -80% 0px'
  // }
};

new Jumplinks(jumplinksOptions);
