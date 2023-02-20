# Jump Links
A sticky navigation bar that will anchor down to sections with the page.  Also shows progress when scrolling through the jumplinks sections


## Example of usage
---
### SOAS
[SOAS](https://www.soas.ac.uk/study/find-course/ba-africa-and-black-diaspora) contains example of jumplinks - using an older implementation of this.


## Installation
---
`npm install bitbucket:numiko/@numiko/jump-links`

`npm install bitbucket:numiko/@numiko/jump-links#<TAG_NAME>`


## Known Issues
1. `basicScroll` dependency is erroring, due to vite wrapping its export an additional `default` object.  Only happening in `dev` mode. See https://github.com/vitejs/vite/issues/5560 & https://vitejs.dev/guide/dep-pre-bundling.html


## Example
---
```javascript

import Jumplinks from '@numiko/jump-links';

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
});

// Initialise
pageJumplinks.init();
```
```html
<body>

  <div class="flex flex-col gap-y-10 mb-10">
    <section class="flex items-center justify-center p-10 bg-[#e1e1e1] min-h-[700px]">
      <h2>Section outside jumplinks area</h2>
    </section>
    <section class="flex items-center justify-center p-10 bg-[#e1e1e1] min-h-[700px]">
      <h2>Section outside jumplinks area</h2>
    </section>
  </div>


  <div class="relative">

    <!-- Jumplinks sticky bar -->
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

      <!-- Jumplink Progress Bar-->
      <div class="bg-[#FFCCC9]">
        <span style="transform: translateX(var(--scrollprogress, -100%))"
          class="w-full block will-change-transform transform duration-75 -translate-x-full bg-[#FF5666] h-1"></span>
      </div>

      <!-- Jumplink Dropdown  -->
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

    <!-- Jumplink sections-->
    <div data-js-jumplinks-container class="flex flex-col gap-y-10 mb-10">
      <section id="jump-link-1"  data-js-jumplinks-section data-js-jumplinks-section-label="Section One">
        <h2 id="section-id-1">Section One</h2>
        <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
      </section>
      <section id="jump-link-2"  data-js-jumplinks-section data-js-jumplinks-section-label="Section Two">
        <h2 id="section-id-2">Section Two</h2>
        <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
      </section>
      <section id="jump-link-3"  data-js-jumplinks-section data-js-jumplinks-section-label="Section Three">
        <h2 id="section-id-3">Section Three</h2>
        <p>Aliquam erat volutpat. Praesent tristique, turpis vitae euismod viverra, sapien turpis gravida orci, quis ornare est arcu sit amet neque. Maecenas vel velit viverra, commodo risus nec, convallis sem. Phasellus posuere libero ac lacus convallis tristique. Duis dolor augue, congue vitae purus et, pharetra semper purus. Vestibulum aliquet metus erat. Donec non dui et risus ultrices fermentum non vitae arcu.</p>
      </section>
    </div>

  </div>



  <div class="flex flex-col gap-y-10">
    <section class="flex items-center justify-center p-10 bg-[#e1e1e1] min-h-[700px]">
      <h2>Section outside jumplinks area</h2>
    </section>
    <section class="flex items-center justify-center p-10 bg-[#e1e1e1] min-h-[700px]">
      <h2>Section outside jumplinks area</h2>
    </section>
  </div>


</body>
```


## Roadmap
---
1. More complex/fleshed-out example
2. Tests
