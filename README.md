# Jumplinks
A sticky navigation bar that will anchor down to sections with the page.  Also shows progress when scrolling through the jumplinks sections

<br />

## Example of usage
---
### Wonderlab Science Museum https://
The [animation toggle on Wonderlab+](http://wonderlabplus.sciencemuseumgroup.org.uk/) was the inital concept for this.

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
  // link element

  dropdownButtonEl: '[data-js-jumplinks-button]',
  // button element that triggers the dropdown nav

  containerEl: '[data-js-jumplinks-container]',
  // container element that wraps around the jump-link sections

  sectionEl: '[data-js-jumplinks-section]',
  // section element for each jumplink content

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
      <span class="whitespace-nowrap" data-js-jumplinks-active></span>
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
  <section id="jump-link-1"  aria-labelledby="section-id-1">
    <h2 id="section-id-1">Section One</h2>
    <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
  </section>
  <section id="jump-link-2"  aria-labelledby="section-id-2">
    <h2 id="section-id-2">Section Two</h2>
    <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
  </section>
  <section id="jump-link-3"  aria-labelledby="section-id-3">
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
