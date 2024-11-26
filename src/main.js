import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
new Jumplinks({
  jumpLinks: '[data-js-jumplinks]',
  jumpLinksTrigger: '[data-js-jumplinks-trigger]',
  // jumpLinksTriggerOffset: 0,
  // jumpLinksTriggerOffset: () => {
  //   // Example: return different offset based on screen size
  //   return window.innerWidth < 768 ? 100 : -100;
  // }
});
