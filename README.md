# Jump Links

Used to create a fixed bar at the top of the page that can be used to show users scroll progress and allow them to jump link to various sections.

This package is usually used along with our `dropdownToggle` package https://bitbucket.org/numiko/dropdown-toggle/src/master/  which is responsible for handling the hide/show dropdowns.



## Installation
---
Install package using the latest tag.

`npm install bitbucket:numiko/@numiko/jump-links#<TAG_NAME>`



## Example setup & options
---
```javascript

import Jumplinks from '@numiko/jump-links';

const stickyJumplinks = new Jumplinks(jumplinks , {
  // link elements
  linksEl: '[data-js-jumplinks-link]',

  // label element that shows the current section
  labelEl: '[data-js-jumplinks-label]',

  // container element that wraps around the jump-link sections. scrollprogress is based on scroll position within this container
  containerEl: '[data-js-jumplinks-container]',

  // section element for each jumplink block (normally some slice)
  sectionEl: '[data-js-jumplinks-section]',

  // custom intersectionObserver options
  intersectionOptions: {
    root: null,
    rootMargin:'-50% 0px',
    threshhold:'',
    callback: (entries) => {}
  },

  // name for custom property that tracks scroll percentage (match this name in your template)
  scrollCustomProperty: 'scrollprogress',

  // offset scroll amount before containerEl top hits top of viewport - which triggers onSticky()
  stickyOffset: 0,

  // offset scroll amount before containerEl bottom hits top of viewport - which triggers onUnsticky()
  unStickyOffset: 0,

  // callback for when containerEl top hits top of viewport e.g. GSAP animation
  onSticky() {
    gsap.to(jumplinks, {
      y:0,
      duration: 0.5,
    });
  },
  // callback for when containerEl bottom hits top of viewport e.g. GSAP animation
  onUnsticky() {
    gsap.to(jumplinks, {
      y: "-101%",
      duration: 0.5,
      onStart: () => {
        stickyJumplinksDropdown.close();
      }
    });
  }
});

// Initialise
stickyJumplinks.init();
```
## Example HTML
```html
  <!-- !! Please note: Some Tailwind CSS colour classes might not work with your config so change as needed -->

  <!-- Jumplinks - Tweak CSS on here depending on your GSAP animations -->
  <div data-js-jumplinks class="fixed top-0 left-0 w-full -translate-y-full">

    <!-- Progress Bar - make sure to use the same CSS custom property name as your config -->
    <div class="bg-[#FFCCC9]">
      <span style="transform:  translateX( calc(-100% + var(--scrollprogress, 0%)))"
        class="w-full block will-change-transform transform duration-75 -translate-x-full bg-[#FF5666] h-1"></span>
    </div>

    <!--Header - Contains your label and button to control your dropdown -->
    <div class="py-5 bg-black text-white">
      <div class="container mx-auto flex items-center justify-between">
        <p class="flex-grow relative overflow-hidden">
          <span class="">You are viewing:</span>
          <span class="whitespace-nowrap" data-js-jumplinks-label></span>
        </p>

        <!-- In this example i am using the dropdownToggle package too and this button controls the dropdown via the aria-controls attribute-->
        <button type="button" class="flex-shrink-0 p-4 text-black bg-white" data-js-dropdown-button
          aria-controls="jumplinks-dropdown">
          <span data-js-dropdown-button>
            Show
          </span>
        </button>
      </div>
    </div>


    <!-- Dropdown - contains your links   -->
    <div id="jumplinks-dropdown" class="overflow-hidden w-full bg-black text-white ">
      <div class="container mx-auto">
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

  <!-- Jumplinkable sections - These will most likely be "slices" outputted from Drupal -->
  <div data-js-jumplinks-container class="flex flex-col ">
    <section id="jump-link-1" class='h-screen flex flex-col items-center justify-center bg-[#ffEE99]'
      data-js-jumplinks-section data-js-jumplinks-section-label="Section One">
      <h2 id="section-id-1" class="text-3xl font-bold mb-10">Section One</h2>
    </section>
    <section id="jump-link-2" class="h-screen flex flex-col items-center justify-center bg-[#EEFF99]"
      data-js-jumplinks-section data-js-jumplinks-section-label="Section Two">
      <h2 id="section-id-2" class="text-3xl font-bold mb-10">Section Two</h2>
    </section>
    <section id="jump-link-3" class='h-[50vh] flex flex-col items-center justify-center bg-[#88FFEE]'
      data-js-jumplinks-section data-js-jumplinks-section-label="Section Three">
      <h2 id="section-id-3" class="text-3xl font-bold mb-10">Section Three</h2>
    </section>
  </div>

```
## Including the dropdownToggle package
If you want your jumplinks to work in a dropdown hide/show container you will need to also install  https://bitbucket.org/numiko/dropdown-toggle/src/master/



## Roadmap
---
1. Tests!
1. Allow custom tweens for animations
1. Remove BasicScroll dependency
