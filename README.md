# Jump Links

Used to create a fixed jumplink bar on the page that can be used to show scroll progress and allow users to jump link to various sections.

## Installation

The package can be installed from BitBucket. If the package has reached version 1,
prefer the semver method; if the package is not yet stable, we recommend installing via the tag.

`npm install ssh://git@bitbucket.org:numiko/jump-links.git#<TAG_NAME>`

`npm install ssh://git@bitbucket.org:numiko/jump-links.git##semver:<VERSION>`

### Including the dropdownToggle package

This package is usually used along with our `dropdownToggle` package https://bitbucket.org/numiko/dropdown-toggle/src/master/  which is responsible for handling the hide/show dropdowns.  Please see that repo for its associated options and methods.

## Usage

### JS

```javascript
const jumplinks = document.querySelector('[data-js-jumplinks]');

const pageJumplinks = new Jumplinks(jumplinks, {
  linksEl: '[data-js-jumplinks-link]',
  labelEl: '[data-js-jumplinks-section-label]',
  containerEl: '[data-js-jumplinks-container]',
  sectionEl: '[data-js-jumplinks-section]',
  intersectionOptions: {
    root: null,
    rootMargin:'-50% 0px',
    threshhold: 0,
  },
});

pageJumplinks.init();
```

## API

### Options

| Option | Description | Type | Default
| --- | --- | --- | --- |
| `jumplinksEl` | The HTML element to initialise the jumplinks. | `string` or `HTMLElement` | `null`
| `options` | Configurable options for the module. | `object` | `object`
| `options.linksEl` | The HTML link in the jumplinks used to navigate to its section. | `string` or `HTMLElement` | `string`
| `options.labelEl` | The text in the jumplinks which displays the current jumplinks section. | `string` or `HTMLElement` | `string`
| `options.containerEl` | The section that contains all of the jumplink sections. | `string` or `HTMLElement` | `string`
| `options.sectionEl` | The individual section that will be added to the jumplinks | `string` or `HTMLElement` | `string`
| `options.intersectionOptions` | Configurable options for the intersection of sections | `object` | `object`
| `options.intersectionOptions.root` | By default it is the viewport however this can be changed to an HTML element | `Document` or `HTMLElement` | `null`
| `options.intersectionOptions.rootMargin` | Sets the margin on the viewport so the jumplinks section will only change after passing that value | `DOMString` | `DOMString`
| `options.intersectionOptions.threshhold` | A single number or an array of numbers that are used as a percentage to change when the module determines that the section is in the viewport | `FrozenArray<double>` or `number` | `FrozenArray<double>`
| `options.intersectionOptions.callback` | The callback function to fire when the jumplink section is determined in the viewport | `function` | `function`
| `options.hasScrollProgress` | Sets whether to display the scroll percentage bar or not  | `boolean` | `boolean`
| `options.scrollCustomProperty` | Name for custom property that tracks scroll percentage | `string` | `string`
| `options.attachCustomPropertyTo` | Where to apply the custom scroll progress property to. By default, will be set to the jumplinks element | `string` or `HTMLElement` | `null`
| `options.stickyOffset` | Offset scroll amount before containerEl top hits top of viewport - which triggers onSticky() | `number` | `number`
| `options.unStickyOffset` | Offset scroll amount before containerEl bottom hits top of viewport - which triggers onUnsticky() | `number` | `number`
| `options.onSticky` | The callback to fire when the containerEl top hits the top of the viewport | `function` | `function`
| `options.onUnsticky` | The callback to fire when the containerEl bottom hits the top of the viewport | `function` | `function`
| `options.customOffsetValue` | Offset value for jumplinks container, will be set to the height of the jumplinks if not defined | `number` | `null`

### Methods

| Method | Description | Return value
| --- | --- | --- |
| `init` | Initialises the module, setting up event listeners | `void`
