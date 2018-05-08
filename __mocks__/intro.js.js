class IntroJsMock {
  constructor() {
    this._currentStep = 0;
  }

  onexit(fn) {
    if (fn) {
      this.exitFn = fn;
    }
  }

  onbeforeexit(fn) {
    if (fn) {
      this.onBeforeExitFn = fn;
    }
  }

  exit() {
    if (this.onBeforeExitFn) {
      this.onBeforeExitFn();
    }

    if (this.exitFn) {
      this.exitFn();
    }
  }

  onchange(fn) {
    if (fn) {
      this.onChangeFn = fn;
    }
  }

  goToStepNumber(step) {
    this._currentStep = step;

    if (this.onBeforeChangeFn) {
      this.onBeforeChangeFn(null);
    }

    if (this.onChangeFn) {
      this.onChangeFn(null);
    }

    if (this.onAfterChangeFn) {
      this.onAfterChangeFn(null);
    }
  }

  onafterchange(fn) {
    if (fn) {
      this.onAfterChangeFn = fn;
    }
  }

  onbeforechange(fn) {
    if (fn) {
      this.onBeforeChangeFn = fn;
    }
  }

  start() {
    if (this.onBeforeChangeFn) {
      this.onBeforeChangeFn(null);
    }

    if (this.onChangeFn) {
      this.onChangeFn(null);
    }

    if (this.onAfterChangeFn) {
      this.onAfterChangeFn(null);
    }
  }

  onhintclick(fn) {
    if (fn) {
      this.onHintClick = fn;
    }
  }

  onhintclose(fn) {
    if (fn) {
      this.onHintClose = fn;
    }
  }

  setOptions(options) {
    this._options = options;
    this._introItems = options.steps;
  }

  /* eslint-disable class-methods-use-this */
  removeHints() {}
  showHints() {}
  hideHints() {}
  oncomplete() {}
  /* eslint-enable class-methods-use-this */
}

const intro = () => new IntroJsMock();

export const introJs = intro;

export default intro;
