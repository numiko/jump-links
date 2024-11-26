import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
new Jumplinks({
  stickyNavElement: '[data-js-jumplinks]',
  stickyTriggerElement: '[data-js-jumplinks-trigger]',
  stickyNavLinks: '[data-js-jumplinks-link]',
  offset: 0,
});
