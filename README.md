# Jumplinks

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

### HTML Structure
```html
<!-- Jumplinks Bar -->
<nav data-js-jumplinks>
  <!-- Progress Bar (Optional) -->
  <div data-js-jumplinks-progress-bar></div>

  <!-- Navigation Links -->
  <ul>
    <li><a href="#section1">Section 1</a></li>
    <li><a href="#section2">Section 2</a></li>
    <li><a href="#section3">Section 3</a></li>
  </ul>
</nav>

<!-- Trigger StartElement (Optional. Defaults to first section)-->
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

<!-- Trigger End Element (Optional. Defaults to last section)-->
<div data-js-jumplinks-trigger-end></div>
```

### JavaScript Initialization

```javascript
import { Jumplinks } from '@numiko/jump-links';

// Basic initialization
new Jumplinks();

// With custom options
const jumplinks = new Jumplinks({
  jumpLinks: '[data-js-jumplinks]',
  onStickyTrigger: ['translate-y-0', 'opacity-100'],
  onIntersection: ({ activeLink, links }) => {
    links.forEach(link => link.classList.remove('active'));
    activeLink?.classList.add('active');
  }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `jumpLinks` | `String\|Element` | `'[data-js-jumplinks]'` | Selector or element for the jumplinks navigation |
| `progressBar` | `String\|Element` | `'[data-js-jumplinks-progress-bar]'` | Selector or element for the progress bar |
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
  jumplinks,         // The jumplinks element
  isSticky,          // Boolean indicating sticky state
  hasStartTriggered, // Boolean indicating if start trigger passed
  hasEndTriggered    // Boolean indicating if end trigger passed
}) => {
  // Custom logic using GSAP
  gsap.to(jumplinks, {
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
  sections,             // Array of all section elements
  intersectingSection,  // The section element currently in view
  links,                // Array of all jumplink anchors
  intersectingLink      // The link corresponding to the intersecting section
}) => {
  // Example of adding classes to the active link
  const activeLinkClasses = ['underline', 'text-black'];
  links.forEach(link => {
    activeLinkClasses.forEach(className => {
      link.classList.toggle(className, link === intersectingLink);
    });
  });
}
```

### onLinkClick
Triggered when a jumplink is clicked:

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

## Browser Support

This package uses modern JavaScript features including:
- IntersectionObserver
- ResizeObserver
- Smooth Scroll behavior
