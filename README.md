# Jump Links

A lightweight JavaScript package that creates a fixed navigation bar showing scroll progress and allowing users to jump between sections. The navigation can be revealed/hidden based on scroll position and supports both class-based and GSAP animations.

## Features
- Smooth scrolling to sections
- Progress bar indication
- Configurable sticky behavior
- Support for both CSS classes and GSAP animations
- Intersection Observer for accurate section tracking
- Responsive to window resizing
- Accessible navigation

## Installation

```bash
npm install @numiko/jump-links
```

## Basic Usage

### HTML Structure
```html
<!-- Navigation Bar -->
<nav data-js-jumplinks>
  <!-- Optional Progress Bar -->
  <div data-js-jumplinks-progress-bar></div>

  <!-- Navigation Links -->
  <ul>
    <li><a href="#section1">Section 1</a></li>
    <li><a href="#section2">Section 2</a></li>
    <li><a href="#section3">Section 3</a></li>
  </ul>
</nav>

<!-- Optional Trigger Element -->
<div data-js-jumplinks-trigger-start></div>

<!-- Content Sections -->
<section id="section1">
  <h2>Section 1</h2>
  <!-- Content -->
</section>

<section id="section2">
  <h2>Section 2</h2>
  <!-- Content -->
</section>

<section id="section3">
  <h2>Section 3</h2>
  <!-- Content -->
</section>
```

### JavaScript Initialization

```javascript
import { Jumplinks } from '@numiko/jump-links';

// Basic initialization
new Jumplinks();

// With custom options
const jumplinks = new Jumplinks({
  jumpLinks: '[data-js-jumplinks]',
  stickyFunction: (element, isSticky) => {
    const classes = ['translate-y-0', 'opacity-100'];
    if (isSticky) {
      element.classList.add(...classes);
    } else {
      element.classList.remove(...classes);
    }
  },
  activeLinkClasses: ['text-red-500'],
  onSticky: () => console.log('Navigation is sticky'),
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `jumpLinks` | `string\|HTMLElement` | `'[data-js-jumplinks]'` | Selector or element for the navigation container |
| `progressBar` | `string\|HTMLElement` | `'[data-js-jumplinks-progress-bar]'` | Selector or element for the progress bar |
| `stickyTriggerStart` | `string\|HTMLElement\|null` | `null` | Element that triggers sticky behavior on scroll |
| `stickyTriggerEnd` | `string\|HTMLElement\|null` | `null` | Element that triggers unsticky behavior |
| `stickyTriggerStartOffset` | `number\|function` | `0` | Offset for sticky trigger start position. Can be a number or a function that returns a number |
| `stickyTriggerEndOffset` | `number\|function` | `0` | Offset for sticky trigger end position. Can be a number or a function that returns a number |
| `stickyFunction` | `function` | Default class toggle | Function called when sticky state changes |
| `activeLinkClasses` | `string[]` | `['underline']` | Classes added to active navigation links |
| `intersectionOptions` | `object` | `{ threshold: 0, rootMargin: '-50% 0px -50% 0px' }` | IntersectionObserver options |
| `onSticky` | `function` | `() => {}` | Callback when navigation becomes sticky |
| `onUnsticky` | `function` | `() => {}` | Callback when navigation becomes unsticky |
| `onLinkClick` | `function` | `() => {}` | Callback when a jump link is clicked |

### Example with Function Offsets

```javascript
new Jumplinks({
  // Static offset
  stickyTriggerStartOffset: 100,

  // Dynamic offset based on element height
  stickyTriggerEndOffset: () => {
    const header = document.querySelector('header');
    return header ? header.offsetHeight : 0;
  }
});
```

## GSAP Animation Example

```javascript
import { Jumplinks } from '@numiko/jump-links';

new Jumplinks({
  stickyFunction: (element, isSticky) => {
    gsap.to(element, {
      y: isSticky ? 0 : -100,
      opacity: isSticky ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
});
```

## Methods

| Method | Description |
|--------|-------------|
| `init()` | Initializes the jumplinks functionality |
| `destroy()` | Removes all event listeners and observers |
| `getState()` | Returns the current state object |

## Browser Support

This package uses modern JavaScript features including:
- IntersectionObserver
- ResizeObserver
- Smooth Scroll behavior

Make sure to include appropriate polyfills for older browser support.

## License

MIT License
