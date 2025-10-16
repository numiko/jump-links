# Jump Links

A lightweight JavaScript package that creates a fixed navigation bar showing scroll progress and allowing users to jump between sections. The navigation can be revealed/hidden based on scroll position and supports both class-based and custom animations.

## Features
- Smooth scrolling to sections
- Progress bar indication
- Configurable sticky behavior
- Support for both CSS classes and custom animations
- Intersection Observer for accurate section tracking
- Responsive to window resizing
- Accessible navigation

## Installation

```bash
npm install @numiko/jump-links
```

## Basic Usage

> **Note:** The functionality of this package relies on the tailwind class `translate-y-0`. If the sticky nav functionality is not working, make sure to add this class to the tailwind safelist js file.

### HTML Structure
```html
<!--
  Regular Navigation
  -----------------
  You might have a regular jump-links navigation that is not fixed outputted in the DOM here.
  We've learned that the best solution is to have a duplicate of the regular navigation that is fixed and hidden by default.
  For brevity, ive not included it here. See index.html for an example
-->

<!--
  Fixed Jumplinks Bar
  -----------------
  These are the actual jump-links. It is fixed and hidden by default via Tailwind classes.
  -->
<nav data-js-jump-links class="fixed top-0 left-0 right-0 bg-purple-100 text-purple-900 py-4 transform -translate-y-full transition-transform duration-300">
  <!-- Progress Bar (Optional) -->
  <div class="bg-purple-300 absolute bottom-0 left-0 right-0">
    <span
      data-js-jump-links-progress-bar
      style="transform: translateX(calc(-100% + var(--jump-links-progress, 50%)))"
      class="w-full block will-change-transform transform duration-75 -translate-x-full bg-purple-800 h-1"
    >
    </span>
  </div>

  <!--
    Navigation Links
    -----------------
    These will be the links that are used to jump to the sections.
    They are the same as the regular navigation links.
    In Drupal we will output the jump-links block twice - once for the regular navigation (if using) and once for the jump-links.
  -->
  <ul class="flex justify-center space-x-6">
    <li><a data-js-jump-links-anchor href="#section1">Section 1</a></li>
    <li><a data-js-jump-links-anchor href="#section2">Section 2</a></li>
    <li><a data-js-jump-links-anchor href="#section3">Section 3</a></li>
  </ul>
</nav>

<!--
  Content Sections
  -----------------
  These are the sections that the jump-links will jump to.
  By default the jump-links will show when the first section intersects with the top of the viewport.
  By default the jump-links will hide when the last section intersects with the bottom of the viewport.
  This can be customized via the stickyTriggerStart and stickyTriggerEnd options.
  -->
<div class="container mx-auto">

  <section id="section1" class="min-h-screen">
    <h2>Section 1</h2>
  </section>

  <section id="section2" class="min-h-screen">
    <h2>Section 2</h2>
  </section>

  <section id="section3" class="min-h-screen">
    <h2>Section 3</h2>
  </section>

</div>
```
### Required CSS

The package needs some recommended CSS that needs to be included for proper functionality:

```css
/* Define the offset for jumplink targets
   Adjust the value to match your fixed header height */
section[id] {
  scroll-margin-top: 4rem;
}

/* Enable smooth scrolling behavior
   This will be disabled for users with reduced motion preferences */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

The `scroll-margin-top` property determines how far from the top of the viewport the section should stop when scrolled to. This should typically match or exceed the height of your fixed header to ensure sections aren't hidden behind it.

### JavaScript Initialization

```javascript
import { JumpLinks } from '@numiko/JumpLinks';

const jumpLinks = document.querySelectorAll('[data-js-jump-links]');
const jumpLinksAnchors = jumpLinks.querySelectorAll('[data-js-jump-links-anchor]');
const jumpLinksActiveClasses = ['underline', 'text-black'];

// Basic initialization
new JumpLinks();

// With custom options
new JumpLinks(jumpLinks, {
  onStickyTrigger: ['translate-y-0', 'opacity-100'],
  onIntersection: ({ intersectingLink }) => {
    jumpLinksAnchors.forEach(link => {
      jumpLinksActiveClasses.forEach(className => {
        link.classList.toggle(className, link === intersectingLink);
      });
    });
  }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `linkSelector` | `String` | `'a'` | Selector for navigation links within the jump-links element |
| `progress` | `Boolean` | `false` | Enable/disable the progress bar functionality. Will add CSS variable to the root element to track progress between sticky triggers |
| `stickyTriggerStart` | `String\|Element\|null` | `null` | Element that triggers sticky behavior start (defaults to first section) |
| `stickyTriggerEnd` | `String\|Element\|null` | `null` | Element that triggers sticky behavior end (defaults to last section) |
| `stickyTriggerStartOffset` | `Number\|Function` | `0` | Offset for the start trigger |
| `stickyTriggerEndOffset` | `Number\|Function` | `0` | Offset for the end trigger |
| `intersectionOptions` | `Object` | `{ threshold: 0, rootMargin: '-50% 0px -50% 0px' }` | IntersectionObserver options |
| `onStickyTrigger` | `String[]\|Function` | `['translate-y-0']` | Classes to toggle or callback for sticky state changes |
| `onLinkClick` | `Function` | `() => {}` | Callback when a jumplink is clicked |
| `onIntersection` | `Function` | `() => {}` | Callback when a section intersects |

## Callbacks

### onStickyTrigger
Can be either an array of classes or a callback function:

```javascript
// Using classes
onStickyTrigger: ['translate-y-0', 'opacity-100', 'bg-white']

// Using callback
onStickyTrigger: ({
  jumpLinks,         // The jump-links element
  isSticky,          // Boolean indicating sticky state
  hasStartTriggered, // Boolean indicating if start trigger passed
  hasEndTriggered    // Boolean indicating if end trigger passed
}) => {
  // Custom logic using GSAP
  gsap.to(jumpLinks, {
    duration: 0.3,
    y: isSticky ? 0 : -100,
    opacity: isSticky ? 1 : 0,
    ease: 'power2.out'
  });

}
```

### onIntersection
Provides information about the currently intersecting section:

```javascript
onIntersection: ({
  intersectingSection,  // The section element currently in view
  intersectingLink      // The link corresponding to the intersecting section
}) => {
  // Example of adding classes to the active link
  jumpLinksAnchors.forEach(link => {
    jumpLinksActiveClasses.forEach(className => {
      link.classList.toggle(className, link === intersectingLink);
    });
  });
}
```

### onLinkClick
Triggered when a jump-link anchor is clicked:

```javascript
onLinkClick: ({
  link,    // The clicked link element
  target   // The target section element
}) => {
  // Custom click handling
  console.log('Link clicked:', link);
  console.log('Target section:', target);
}
```

## Dynamic Offsets Example

```javascript
new JumpLinks(jumpLinks, {
  // Static offset
  stickyTriggerStartOffset: 100,

  // Dynamic offset based on element height
  stickyTriggerEndOffset: () => {
    const header = document.querySelector('header');
    return header ? header.offsetHeight : 0;
  }
});
```

## Browser Support

This package uses modern JavaScript features including:
- IntersectionObserver
- ResizeObserver
- Smooth Scroll behavior
