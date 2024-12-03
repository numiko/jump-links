import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
const jumplinksOptions = {
  jumpLinks: '[data-js-jumplinks]',
  stickyTriggerStart: '[data-js-jumplinks-trigger-start]',
  stickyTriggerStartOffset: 0,
  stickyTriggerEndOffset: 0,
  stickyClasses: ['translate-y-0'],
  activeLinkClasses: ['text-red-500'],
  onSticky: function() {
    console.log(this.getState());
  },
  onUnsticky: function() {
    console.log(this.getState());
  }
};

new Jumplinks(jumplinksOptions);
