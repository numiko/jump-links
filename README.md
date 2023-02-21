# Jump Links
A sticky navigation bar that will anchor down to sections with the page.  Also shows progress when scrolling through the jumplinks sections



## Installation
---
`npm install bitbucket:numiko/@numiko/jump-links`

`npm install bitbucket:numiko/@numiko/jump-links#<TAG_NAME>`


## Example setup & options
---
```javascript

import Jumplinks from '@numiko/jump-links';

const pageJumplinks = new Jumplinks('[data-js-jumplinks]' , {
  // Link elements for the jumplinks - selector or DOM elements
  linksEl: '[data-js-jumplinks-link]',

  // Label element that shows the current section - selector or DOM element
  labelEl: '[data-js-jumplinks-label]',

  // Specify if the dropdown should be open (true) / closed (false) on load
  dropdownOpenOnLoad: false,

  // Button element that triggers the dropdown nav - selector or DOM element
  dropdownButtonEl: '[data-js-jumplinks-button]',

  // Button label to open dropdown
  dropdownButtonOpenLabel: 'Open',

  // Button label to close dropdown
  dropdownButtonCloseLabel: 'Close',

  // Dropdown Callbacks
  dropdownOpenStart: () => {},
  dropdownOpenEnd: () => {},
  dropdownCloseStart: () => {},
  dropdownCloseEnd: () => {},

  // Container element that wraps around the jump-link sections - selector or DOM element
  containerEl: '[data-js-jumplinks-container]',

  // section element for each jumplink block - selector or DOM element
  sectionEl: '[data-js-jumplinks-section]',

  // Custom intersectionObserver options
  intersectionOptions: {
    root: null,
    rootMargin:'-50% 0px',
    threshhold:'',
    callback: (entries) => {}
  },

});

// Initialise
pageJumplinks.init();
```
## Example HTML
```html
<body>

  <!-- Jumplinks will stick/unstick to their relative parent -->
  <div class="relative">

    <!-- Sticky bar -->
    <div data-js-jumplinks class="bg-color-black text-color-white z-50 sticky top-0" >

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

      <!-- Progress Bar-->
      <div class="bg-[#FFCCC9]">
        <span style="transform: translateX(var(--scrollprogress, -100%))"
          class="w-full block will-change-transform transform duration-75 -translate-x-full bg-[#FF5666] h-1"></span>
      </div>

      <!-- Dropdown with links  -->
      <div id="jumplinks-container" class="overflow-hidden hidden absolute top-full left-0 w-full bg-color-black">
        <div class="container">
          <div class="py-7 md:py-10">
            <ul class="[ md:grid md:grid-cols-3 md:gap-6 ]">
              <li class="mb-4 last:mb-0 ">
                <a href="#jump-link-1" data-js-jumplinks-link>Section one</a>
              </li>
              <li class="mb-4 last:mb-0 ">
                <a href="#jump-link-2" data-js-jumplinks-link>Section two</a>
              </li>
              <li class="mb-4 last:mb-0 ">
                <a href="#jump-link-3" data-js-jumplinks-link>Section three</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Jumplinkable sections-->
    <div data-js-jumplinks-container class="flex flex-col gap-y-10 mb-10">
      <section id="jump-link-1" class='h-screen' data-js-jumplinks-section data-js-jumplinks-section-label="Section One">
        <h2 id="section-id-1">Section One</h2>
      </section>
      <section id="jump-link-2" class='h-screen' data-js-jumplinks-section data-js-jumplinks-section-label="Section Two">
        <h2 id="section-id-2">Section Two</h2>
      </section>
      <section id="jump-link-3" class='h-screen' data-js-jumplinks-section data-js-jumplinks-section-label="Section Three">
        <h2 id="section-id-3">Section Three</h2>
      </section>
    </div>
  </div>
</body>
```
## Methods
---
```javascript
const pageJumplinks = new Jumplinks('[data-js-jumplinks]' , {
  ...
}

// Initialise
pageJumplinks.init();

// Open
pageJumplinks.open();

// Close
pageJumplinks.open();

```

## Roadmap
---
1. Tests!
1. Allow custom tweens for animations
1. Remove BasicScroll dependency
