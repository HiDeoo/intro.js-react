declare module 'intro.js-react' {
  interface Step {
    /**
     * CSS selector to use for the step.
     */
    element?: string;
    /**
     * The tooltip content.
     */
    intro: string | JSX.Element;
    /**
     * Position of the tooltip.
     */
    position?: string;
    /**
     * CSS class of the tooltip.
     */
    tooltipClass?: string;
    /**
     * CSS class of the helperLayer.
     */
    highlightClass?: string;
  }

  interface Hint {
    /**
     * CSS selector to use for the hint.
     */
    element: string;
    /**
     * The tooltip text.
     */
    hint: string;
    /**
     * Position of the tooltip.
     */
    hintPosition?: String;
  }

  interface Options {
    /**
     * Next button label.
     */
    nextLabel?: string;
    /**
     * Previous button label.
     */
    prevLabel?: string;
    /**
     * Skip button label.
     */
    skipLabel?: string;
    /**
     * Done button label.
     */
    doneLabel?: string;
    /**
     * Hides the Previous button in the first step.
     */
    hidePrev?: boolean;
    /**
     * Hide the Next button in the last step.
     */
    hideNext?: boolean;
    /**
     * Position of the tooltips.
     */
    tooltipPosition?: string;
    /**
     * CSS class of the tooltips.
     */
    tooltipClass?: string;
    /**
     * CSS class of the helperLayer.
     */
    highlightClass?: string;
    /**
     * Exit by pressing Escape.
     */
    exitOnEsc?: boolean;
    /**
     * Exit by clicking on the overlay layer.
     */
    exitOnOverlayClick?: boolean;
    /**
     * Show steps number in a red circle.
     */
    showStepNumbers?: boolean;
    /**
     * Allows navigation between steps using the keyboard.
     */
    keyboardNavigation?: boolean;
    /**
     * Show navigation buttons.
     */
    showButtons?: boolean;
    /**
     * Show bullets.
     */
    showBullets?: boolean;
    /**
     * Show progress indicator.
     */
    showProgress?: boolean;
    /**
     * Enables scrolling to hidden elements.
     */
    scrollToElement?: boolean;
    /**
     * Opacity of the overlay.
     */
    overlayOpacity?: number;
    /**
     * Padding when automatically scrolling to an element.
     */
    scrollPadding?: number;
    /**
     * Precedence of positions.
     */
    positionPrecedence?: string[];
    /**
     * Disables interaction inside elements.
     */
    disableInteraction?: boolean;
    /**
     * Position of the hints.
     */
    hintPosition?: string;
    /**
     * 	Hint button label.
     */
    hintButtonLabel?: string;
    /**
     * Enables hint animations.
     */
    hintAnimation?: boolean;
  }

  interface StepsProps {
    /**
     * Defines if the steps are visible or not.
     * @default false
     */
    enabled?: boolean;
    /**
     * Step index to start with when showing the steps.
     */
    initialStep: number;
    /**
     * All the steps.
     */
    steps: Step[];
    /**
     * Callback called when the steps are disabled
     * Required to force keeping track of the state when the steps are dismissed with an Intro.js event and not the enabled prop.
     */
    onExit(stepIndex: number): any;
    /**
     * Callback called before exiting the intro.
     * If you want to prevent exiting the intro, you can return false in this callback (available since intro.js 0.2.7).
     */
    onBeforeExit?(stepIndex: number): any;
    /**
     * Callback called when the steps are enabled.
     */
    onStart?(stepIndex: number): any;
    /**
     * Callback called when the current step is changed.
     */
    onChange?(nextStepIndex: number, nextElement: Element): any;
    /**
     * Callback called before changing the current step.
     * If you want to prevent the transition to the next / previous step, you can return false in this callback (available since intro.js 2.8.0).
     */
    onBeforeChange?(nextStepIndex: number): any;
    /**
     * Callback called after changing the current step.
     */
    onAfterChange?(newStepIndex: number, newElement: Element): any;
    /**
     * Callback called if you prevented transitioning to a new step by returning false in onBeforeChange.
     */
    onPreventChange?(stepIndex: number): any;
    /**
     * Callback called when all the steps are completed.
     */
    onComplete?(): any;
    /**
     * Intro.js options.”
     */
    options?: Options;
  }

  interface HintsProps {
    /**
     * Defines if the hints are visible or not.
     * @default false
     */
    enabled?: boolean;
    /**
     * All the hints.	Hint[]
     */
    hints: Hint[];
    /**
     * Callback called when a hint is clicked.
     */
    onClick?(): any;
    /**
     * Callback called when a hint is closed.
     */
    onClose?(): any;
    /**
     * Intro.js options.
     */
    options?: Options;
  }

  function Steps(props: StepsProps): JSX.Element;
  function Hints(props: HintsProps): JSX.Element;
}
