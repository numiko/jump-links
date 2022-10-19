# Jump Links
A sticky navigation bar that will anchor down to sections with the page.  Also shows progress when scrolling through the jumplinks sections

<br />

## Example of usage
---
### SOAS
[SOAS](https://www.soas.ac.uk/study/find-course/ba-africa-and-black-diaspora) contains example of jumplinks - using an older implementation of this.

<br />

## Installation
---
`npm install bitbucket:numiko/@numiko/jump-links`

<br />

## Example
---
```javascript

import Jumplinks from '@numiko/switch-toggle';

const pageJumplinks = new Jumplinks('[data-js-jumplinks]' , {
  // options - defaults listed

  linksEl: '[data-js-jumplinks-link]',
  // Link elements for the jumplinks - selector or DOM elements

  labelEl: '[data-js-jumplinks-label]',
  // Label element that shows the current section - selector or DOM element

  dropdownButtonEl: '[data-js-jumplinks-button]',
  // Button element that triggers the dropdown nav - selector or DOM element

  containerEl: '[data-js-jumplinks-container]',
  // Container element that wraps around the jump-link sections - selector or DOM element

  sectionEl: '[data-js-jumplinks-section]',
  // section element for each jumplink block - selector or DOM element

  intersectionOptions: {
    root: null,
    rootMargin:'-50% 0px',
    threshhold:'',
    callback: (entries) => {}
  },
  // Custom intersectionObserver options

  showProgress: true,
  // Show progress bar - will download BasicScroll plugin.
});

// Initialise
pageJumplinks.init();
```
```html
<!-- Jumplinks Nav - Style to your liking  -->
<div class="bg-color-black text-color-white z-50 sticky top-0" data-js-jumplinks>

  <div class="container | py-5 flex items-center justify-between">
    <p class="flex-grow relative overflow-hidden">
      <span class="sr-only">You are viewing:</span>
      <span class="whitespace-nowrap" data-js-jumplinks-label></span>
    </p>

    <button type="button" class="flex-shrink-0" data-js-jumplinks-button aria-controls="jumplinks-container">
      <span data-js-dropdown-label>
        Show
      </span>
    </button>
  </div>

  <!-- Progress Bar - Style to your liking -->
  <div class="bg-[#FFCCC9]">
    <span style="transform: translateX(var(--scrollprogress, -100%))" class="w-full block will-change-transform transform duration-75 -translate-x-full bg-[#FF5666] h-1"></span>
  </div>

  <!-- Jumplink Dropdown - Style to your liking  -->
  <div id="jumplinks-container" class="overflow-hidden hidden absolute top-full left-0 w-full bg-color-black">
    <div class="container">
      <div class="py-7 md:py-10">
        <ul class="[ md:grid md:grid-cols-3 md:gap-6 ]">
          <li class="mb-4 last:mb-0 ">
            <a href="#jump-link-1" data-js-jumplinks-link>Section one here</a>
          </li>
          <li class="mb-4 last:mb-0 ">
            <a href="#jump-link-2" data-js-jumplinks-link>Section two here</a>
          </li>
          <li class="mb-4 last:mb-0 ">
            <a href="#jump-link-3" data-js-jumplinks-link>Section three here</a>
          </li>
          <li class="mb-4 last:mb-0 ">
            <a href="#jump-link-4" data-js-jumplinks-link>Section four here</a>
          </li>
          <li class="mb-4 last:mb-0 ">
            <a href="#jump-link-5" data-js-jumplinks-link>Section five here</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Jumplinks Content -->
<div data-js-jumplinks-container>
  <section id="jump-link-1"  aria-labelledby="section-id-1" data-js-jumplinks-section>
    <h2 id="section-id-1">Section One</h2>
    <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
  </section>
  <section id="jump-link-2"  aria-labelledby="section-id-2" data-js-jumplinks-section>
    <h2 id="section-id-2">Section Two</h2>
    <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
  </section>
  <section id="jump-link-3"  aria-labelledby="section-id-3" data-js-jumplinks-section>
    <h2 id="section-id-3">Section Three</h2>
    <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
  </section>
</div>
```

<br />

## Roadmap
---
1. More complex/fleshed-out example
2. Tests
