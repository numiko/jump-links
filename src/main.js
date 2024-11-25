import '../lib/jumplinks.css';
import { Jumplinks } from '../lib/Jumplinks.js';

// Initialize the sticky navigation with custom options
new Jumplinks({
  stickyNavElement: '#sticky-nav',
  stickyTriggerElement: '#regular-nav',
  offset: 0,
});
