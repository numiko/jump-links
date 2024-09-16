import { Jumplinks } from '../lib/Jumplinks';

const jumplinks = document.querySelector('[data-js-jumplinks]');

const stickyJumplinks = new Jumplinks(jumplinks , {
  linksEl: '[data-js-jumplinks-link]',
  labelEl: '[data-js-jumplinks-label]',
  containerEl: '[data-js-jumplinks-container]',
  sectionEl: '[data-js-jumplinks-section]',
  intersectionOptions: {
    rootMargin:'-50% 0px',
  },
  scrollCustomProperty: 'scrollprogress',
  attachScrollPropertyTo: HTMLElement,
  stickyOffset: 0,
  unStickyOffset: 0,
});

// Initialise
stickyJumplinks.init();
