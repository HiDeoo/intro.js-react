# intro.js-react

[![integration](https://github.com/HiDeoo/intro.js-react/actions/workflows/integration.yml/badge.svg)](https://github.com/HiDeoo/intro.js-react/actions/workflows/integration.yml) [![Coverage Status](https://coveralls.io/repos/github/HiDeoo/intro.js-react/badge.svg?branch=master)](https://coveralls.io/github/HiDeoo/intro.js-react?branch=master)

A small React wrapper around [Intro.js](http://introjs.com/). The wrapper provides support for both steps and hints.

## Quicklinks

- [Example](#example)
- [Installation](#installation)
- [Usage](#usage)
  - [Steps](#steps)
  - [Hints](#hints)
- [Intro.js API](#introjs-api)
- [Intro.js options](#introjs-options)

## Example

You can find a small example [here on codesandbox.io](https://codesandbox.io/embed/o2A4gwXE3?hidenavigation=1).

## Installation

Install using Npm *(don't forget to add the `--save` option if you're still using npm < 5)*:

```sh
$ npm install intro.js-react
```

Or Yarn:


```sh
$ yarn add intro.js-react
```

Make sure to have [React](https://facebook.github.io/react/) & [Intro.js](http://introjs.com/) installed (they're peer dependencies) and the Intro.js CSS definitions [properly loaded](http://introjs.com/docs/getting-started/install) into your project.

This would usually looks like:

```js
import 'intro.js/introjs.css';
```

## Usage

Two component are available for both steps and hints:

```js
import { Steps, Hints } from 'intro.js-react';
```

## Steps

**Note: Steps indexes always starts from 0 in this wrapper instead of 1 like in Intro.js.**

### Basic example:

```js
<Steps
  enabled={stepsEnabled}
  steps={steps}
  initialStep={initialStep}
  onExit={this.onExit}
/>
```

### Props

| Name | Description | Type | Required |
| --- | --- | :---: | :---: |
| `enabled` | Defines if the steps are visible or not. <br> *Default: false.* | Boolean |  |
| `initialStep` | Step index to start with when showing the steps. | Number | ✅ |
| `steps` | All the steps. | [Step[]](#step) | ✅ |
| `onExit` | Callback called when the steps are disabled <br> *Required to force keeping track of the state when the steps are dismissed with an Intro.js event and not the `enabled` prop.* | Function <br> *(stepIndex)* | ✅ |
| `onBeforeExit` | Callback called before exiting the intro. <br> *If you want to prevent exiting the intro, you can return `false` in this callback (available since intro.js 0.2.7).* | Function <br> *(stepIndex)* |  |
| `onStart` | Callback called when the steps are enabled. | Function <br> *(stepIndex)* |  |
| `onChange` | Callback called when the current step is changed. | Function <br> *(nextStepIndex, nextElement)*  |  |
| `onBeforeChange` | Callback called before changing the current step. <br> *If you want to prevent the transition to the next / previous step, you can return `false` in this callback (available since intro.js 2.8.0).* | Function <br> *(nextStepIndex, nextElement)* |  |
| `onAfterChange` | Callback called after changing the current step. | Function <br> *(newStepIndex, newElement)* |  |
| `onPreventChange` | Callback called if you prevented transitioning to a new step by returning `false` in `onBeforeChange`. | Function <br> *(stepIndex)* |  |
| `onComplete` | Callback called when all the steps are completed. | Function <br> *()* |  |
| `options` | Intro.js options. | [Object](#introjs-options) | | |

### Step

```js
const steps = [
  {
    element: '.selector1',
    intro: 'test 1',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.selector2',
    intro: 'test 2',
  },
  {
    element: '.selector3',
    intro: 'test 3',
  },
];
```

| Name | Description | Type | Required |
| --- | --- | :---: | :---: |
| `element` | CSS selector to use for the step. | String | |
| `intro` | The tooltip content. | String \| React element | ✅ |
| `position` | Position of the tooltip. | String | |
| `tooltipClass` | CSS class of the tooltip. | String | |
| `highlightClass` | CSS class of the helperLayer. | String |  |  |

### Dynamic elements

If you want to use Intro.js Steps with dynamically created elements, you have to update the element associated to the step when it's available.

To do that, you can use the `updateStepElement()` API and pass to it the index of the step to update:

```js
<Steps
  enabled={stepsEnabled}
  steps={steps}
  ref={steps => (this.steps = steps)}
/>
```

```js
onBeforeChange = nextStepIndex => {
  if (nextStepIndex === 4) {
    this.steps.updateStepElement(nextStepIndex);
  }
}
```

## Hints

### Basic example:

```js
<Hints
  enabled={hintsEnabled}
  hints={hints}
/>
```

### Props

| Name | Description | Type | Required |
| --- | --- | :---: | :---: |
| `enabled` | Defines if the hints are visible or not. <br> *Default: false.* | Boolean |  |
| `hints` | All the hints. | [Hint[]](#hint) | ✅ |
| `onClick` | Callback called when a hint is clicked. | Function <br> *( )* |  |
| `onClose` | Callback called when a hint is closed. | Function <br> *( )*  |  |
| `options` | Intro.js options. | [Object](#introjs-options) | | |

### Hint

```js
const hints = [
  {
    element: '.selector1',
    hint: 'test 1',
    hintPosition: 'middle-middle',
  },
  {
    element: '.selector2',
    hint: 'test 2',
  },
];
```

| Name | Description | Type | Required |
| --- | --- | :---: | :---: |
| `element` | CSS selector to use for the hint. | String | ✅ |
| `hint` | The tooltip text. | String | ✅ |
| `hintPosition` | Position of the tooltip. | String | | |

## Intro.js API

If for some reasons you need to use the [Intro.js API](http://introjs.com/docs/), you can still get the Intro.js instance by using a ref on either the `<Steps />` or `<Hints />` components and using `this.refName.introJs`.

```js
<Hints
  enabled={hintsEnabled}
  steps={hints}
  ref={hints => (this.hints = hints)}
/>
```

## Intro.js options

You can find more details regarding Intro.js options and their default values in [the documentation](http://introjs.com/docs/) or directly in [their code](https://github.com/usablica/intro.js/blob/31f7def834664efb26b964f0a2a03444ef29a32c/src/index.js#L34).

The wrapper overrides some Intro.js default options in the `helpers/defaultProps.js` file.

| Name | Description | Type |
| --- | --- | :---: |
| `nextLabel` | Next button label. | String |
| `prevLabel` | Previous button label. | String |
| `skipLabel` | Skip button label. | String |
| `doneLabel` | Done button label. | String |
| `hidePrev` | Hides the Previous button in the first step. | Boolean |
| `hideNext` | Hide the Next button in the last step. | Boolean |
| `tooltipPosition` | Position of the tooltips. | String |
| `tooltipClass` | CSS class of the tooltips. | String |
| `highlightClass` | CSS class of the helperLayer. | String |
| `exitOnEsc` | Exit by pressing Escape. | Boolean |
| `exitOnOverlayClick` | Exit by clicking on the overlay layer. | Boolean |
| `showStepNumbers` | Show steps number in a red circle. | Boolean |
| `keyboardNavigation` | Allows navigation between steps using the keyboard. | Boolean |
| `showButtons` | Show navigation buttons. | Boolean |
| `showBullets` | Show bullets. | Boolean |
| `showProgress` | Show progress indicator. | Boolean |
| `scrollToElement` | Enables scrolling to hidden elements. | Boolean |
| `overlayOpacity` | Opacity of the overlay. | Number |
| `scrollPadding` | Padding when automatically scrolling to an element. | Number |
| `positionPrecedence` | Precedence of positions. | String[] |
| `disableInteraction` | Disables interaction inside elements. | Boolean |
| `hintPosition` | Position of the hints. | String |
| `hintButtonLabel` | Hint button label. | String |
| `hintAnimation` | Enables hint animations. | Boolean |

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](./LICENSE) for more information.
