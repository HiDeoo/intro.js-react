import introJs from 'intro.js';
import PropTypes from 'prop-types';
import { Component } from 'react';

import * as introJsPropTypes from '../../helpers/proptypes';
import * as introJsDefaultProps from '../../helpers/defaultProps';
import { isServer } from '../../helpers/server';

/**
 * Intro.js Hints Component.
 */
export default class Hints extends Component {
  /**
   * React Props
   * @type {Object}
   */
  static propTypes = {
    enabled: PropTypes.bool,
    hints: PropTypes.arrayOf(
      PropTypes.shape({
        element: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired,
        hintPosition: introJsPropTypes.hintPosition,
      })
    ).isRequired,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    options: introJsPropTypes.options,
  };

  /**
   * React Default Props
   * @type {Object}
   */
  static defaultProps = {
    enabled: false,
    onClick: null,
    onClose: null,
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

    this.installIntroJs();
  }

  /**
   * Lifecycle: componentDidMount.
   * We use this event to enable Intro.js hints at mount time if enabled right from the start.
   */
  componentDidMount() {
    if (this.props.enabled) {
      this.configureIntroJs();
      this.renderHints();
    }
  }

  /**
   * Lifecycle: componentDidUpdate.
   * @param  {Object} prevProps - The previous props.
   */
  componentDidUpdate(prevProps) {
    const { enabled, hints, options } = this.props;

    if (!this.isConfigured || prevProps.hints !== hints || prevProps.options !== options) {
      this.configureIntroJs();
      this.renderHints();
    }

    if (prevProps.enabled !== enabled) {
      this.renderHints();
    }
  }

  /**
   * Lifecycle: componentWillUnmount.
   * We use this even to hide the hints when the component is unmounted.
   */
  componentWillUnmount() {
    this.introJs.hideHints();
  }

  /**
   * Installs Intro.js.
   */
  installIntroJs() {
    if (isServer()) {
      return;
    }

    this.introJs = introJs();

    const { onClick, onClose } = this.props;

    if (onClick) {
      this.introJs.onhintclick(onClick);
    }

    if (onClose) {
      this.introJs.onhintclose(onClose);
    }
  }

  /**
   * Configures Intro.js if not already configured.
   */
  configureIntroJs() {
    const { options, hints } = this.props;

    // We need to remove all hints otherwise new hints won't be added.
    this.introJs.removeHints();

    this.introJs.setOptions({ ...options, hints });

    this.isConfigured = true;
  }

  /**
   * Renders the Intro.js hints.
   */
  renderHints() {
    const { enabled, hints } = this.props;

    if (enabled && hints.length > 0) {
      this.introJs.showHints();
    } else if (!enabled) {
      this.introJs.hideHints();
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
