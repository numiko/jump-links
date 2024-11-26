import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
new Jumplinks({
  jumpLinks: '[data-js-jumplinks]',
  // stickyClasses: ['translate-y-0'],
  onSticky: () => {
    console.log('sticky');
  },
  onUnsticky: () => {
    console.log('unsticky');
  }
});
