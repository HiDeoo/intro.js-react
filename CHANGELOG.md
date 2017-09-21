## 0.2.0 (unpublished)

* 💥 `onBeforeChange` is no longer called with the `nextElement` parameter.


* If at least intro.js 2.8.0 is used, `false` can be returned in `onBeforeChange` to prevent transitioning to the next / previous step.
* Add the `onPreventChange` callback called when a transition is prevented by returning `false` in `onBeforeChange`.

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
