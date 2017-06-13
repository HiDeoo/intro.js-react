import { introJs } from 'intro.js';
import PropTypes from 'prop-types';
import { Component } from 'react';

import * as introJsPropTypes from '../../helpers/proptypes';
import * as introJsDefaultProps from '../../helpers/defaultProps';

/**
 * Intro.js Steps Component.
 */
export default class Steps extends Component {
  /**
   * React Props
   * @type {Object}
   */
  static propTypes = {
    enabled: PropTypes.bool,
    initialStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        element: PropTypes.string.isRequired,
        intro: PropTypes.string.isRequired,
        position: introJsPropTypes.tooltipPosition,
        tooltipClass: PropTypes.string,
        highlightClass: PropTypes.string,
      })
    ).isRequired,
    onStart: PropTypes.func,
    onExit: PropTypes.func.isRequired,
    onBeforeChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    options: introJsPropTypes.options,
  };

  /**
   * React Default Props
   * @type {Object}
   */
  static defaultProps = {
    enabled: false,
    onStart: null,
    onBeforeChange: null,
    onAfterChange: null,
    onChange: null,
    onComplete: null,
    options: introJsDefaultProps.options,
  };

  /**
   * Creates a new instance of the component.
   * @class
   * @param {Object} props - The props of the component.
   */
  constructor(props) {
    super(props);

    this.introJs = null;
    this.isConfigured = false;
    // We need to manually keep track of the visibility state to avoid a callback hell.
    this.isVisible = false;

    this.installIntroJs();
  }

  /**
   * Lifecycle: componentDidMount.
   * We use this event to enable Intro.js steps at mount time if enabled right from the start.
   */
  componentDidMount() {
    if (this.props.enabled) {
      this.configureIntroJs();
      this.renderSteps();
    }
  }

  /**
   * Lifecycle: componentDidUpdate.
   * @param  {Object} prevProps - The previous props.
   */
  componentDidUpdate(prevProps) {
    const { enabled, steps, options } = this.props;

    if (!this.isConfigured || prevProps.steps !== steps || prevProps.options !== options) {
      this.configureIntroJs();
      this.renderSteps();
    }

    if (prevProps.enabled !== enabled) {
      this.renderSteps();
    }
  }

  /**
   * Lifecycle: componentWillUnmount.
   * We use this even to hide the steps when the component is unmounted.
   */
  componentWillUnmount() {
    this.introJs.exit();
  }

  /**
   * Triggered when Intro.js steps are exited.
   */
  onExit = () => {
    const { onExit } = this.props;

    this.isVisible = false;

    onExit(this.introJs._currentStep);
  };

  /**
   * Triggered before changing step.
   * @param  {HTMLElement} element - The element associated to the next step.
   */
  onBeforeChange = element => {
    if (!this.isVisible) {
      return;
    }

    const { onBeforeChange } = this.props;

    if (onBeforeChange) {
      onBeforeChange(this.introJs._currentStep, element);
    }
  };

  /**
   * Triggered after changing step.
   * @param  {HTMLElement} element - The element associated to the new step.
   */
  onAfterChange = element => {
    if (!this.isVisible) {
      return;
    }

    const { onAfterChange } = this.props;

    if (onAfterChange) {
      onAfterChange(this.introJs._currentStep, element);
    }
  };

  /**
   * Triggered when changing step.
   * @param  {HTMLElement} element - The element associated to the next step.
   */
  onChange = element => {
    if (!this.isVisible) {
      return;
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(this.introJs._currentStep, element);
    }
  };

  /**
   * Triggered when completing all the steps.
   */
  onComplete = () => {
    const { onComplete } = this.props;

    if (onComplete) {
      onComplete();
    }
  };

  /**
   * Installs Intro.js.
   */
  installIntroJs() {
    this.introJs = introJs();

    this.introJs.onexit(this.onExit);
    this.introJs.onbeforechange(this.onBeforeChange);
    this.introJs.onafterchange(this.onAfterChange);
    this.introJs.onchange(this.onChange);
    this.introJs.oncomplete(this.onComplete);
  }

  /**
   * Configures Intro.js if not already configured.
   */
  configureIntroJs() {
    const { options, steps } = this.props;

    this.introJs.setOptions({ ...options, steps });

    this.isConfigured = true;
  }

  /**
   * Renders the Intro.js steps.
   */
  renderSteps() {
    const { enabled, initialStep, steps, onStart } = this.props;

    if (enabled && steps.length > 0 && !this.isVisible) {
      this.introJs.start();

      this.isVisible = true;

      this.introJs.goToStepNumber(initialStep + 1);

      if (onStart) {
        onStart(this.introJs._currentStep);
      }
    } else if (!enabled && this.isVisible) {
      this.isVisible = false;

      this.introJs.exit();
    }
  }

  /**
   * Renders the component.
   * @return {null} We do not want to render anything.
   */
  render() {
    return null;
  }
}
