## 1.0.0

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

* 💥 Add ESM/CJS package compatibility.

This new major release [adds support for ESM](https://github.com/HiDeoo/intro.js-react/pull/104) to the published package while preserving CJS compatibility. The `main/module/exports` fields in `package.json` are now pointing to new artifacts: `dist/esm/index.mjs` which is an ESM file that most modern tooling should pick up, `dist/cjs/index.cjs` which is a CJS file and `dist/esm/index.js` which is a copy of the ESM file with a `.js` extension to support Webpack 4. Thanks to [@lewisl9029](https://github.com/lewisl9029) for the contribution.

## 0.7.1

* Update TypeScript `onBeforeChange` return type to support promises.

## 0.7.0

* Add missing TypeScript `title` attribute type to steps.
* Fix various issues with Next.js and SSR.

## 0.6.0

* The `onBeforeChange` callback now receives the `nextElement` as second parameter.
* Add missing `updateStepElement()` to the TypeScript type declarations.
* Fix Steps's `element` parameter type to also accept an `HTMLElement`.

## 0.5.0

* Bump peer dependencies versions.

## 0.4.0

* Add TypeScript type declarations.

## 0.3.0

* Add support for React elements to Steps's `intro` parameter.

## 0.2.0

* 💥 `onBeforeChange` is no longer called with the `nextElement` parameter.

* Add React 16 support.
* If at least intro.js 2.8.0 is used, `false` can be returned in `onBeforeChange` to prevent transitioning to the next / previous step.
* Add the `onPreventChange` callback called when a transition is prevented by returning `false` in `onBeforeChange`.
* Add the `onBeforeExit` callback to prevent exiting the intro.
* Update intro.js `import` statements to avoid a deprecation warning.

## 0.1.5

* Add the `updateStepElement()` API to update the element associated to a step based on its index. This is useful when the associated element is not present in the DOM on page load.

## 0.1.4

* `element` CSS selector are no longer required for a Step so floating steps can be created more easily.

## 0.1.3

* Improve consistency around callbacks in the Steps component.

## 0.1.2

* Add onComplete callback for Steps.

## 0.1.1

* Hide steps & hints when unmounting.

## 0.1.0

* First release.
