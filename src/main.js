import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
const jumplinksOptions = {
  jumpLinks: '[data-js-jumplinks]',
  stickyTriggerStart: '[data-js-jumplinks-trigger-start]',
  stickyTriggerStartOffset: 0,
  stickyTriggerEndOffset: 0,
  // stickyClasses: ['translate-y-0'],
  onSticky: function() {
    // Use 'this' to reference the Jumplinks instance
    console.log(this.getState());
  },
  onUnsticky: function() {
    // console.log('unsticky');
    console.log(this.getState());
  }
};

const jumplinks = new Jumplinks(jumplinksOptions);

setInterval(() => {
  console.log(jumplinks.getState());
}, 4000);
