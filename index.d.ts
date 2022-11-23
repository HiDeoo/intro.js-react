declare module 'intro.js-react' {
  import * as React from 'react';
  import { IntroJs, Options } from 'intro.js';

  interface Step {
    /**
     * CSS selector or element to use for the step.
     */
    element?: string | HTMLElement | Element;
    /**
     * The tooltip content.
     */
    intro: string | React.ReactNode;
    /**
     * Position of the tooltip.
     */
    position?: string;
    /**
     * The tooltip title.
    */
    title?: string
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
    hintPosition?: string;
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
     * Callback called when the steps are disabled.
     * Required to force keeping track of the state when the steps are dismissed with an Intro.js event and not the
     * enabled prop.
     */
    onExit(stepIndex: number): void;
    /**
     * Callback called before exiting the intro.
     * If you want to prevent exiting the intro, you can return false in this callback (available since intro.js 0.2.7).
     */
    onBeforeExit?(stepIndex: number): void | false;
    /**
     * Callback called when the steps are enabled.
     */
    onStart?(stepIndex: number): void;
    /**
     * Callback called when the current step is changed.
     */
    onChange?(nextStepIndex: number, nextElement: Element): void;
    /**
     * Callback called before changing the current step.
     * If you want to prevent the transition to the next / previous step, you can return false in this callback
     * (available since intro.js 2.8.0).
     */
    onBeforeChange?(nextStepIndex: number, nextElement: Element): void | false | Promise<void | false>;
    /**
     * Callback called after changing the current step.
     */
    onAfterChange?(newStepIndex: number, newElement: Element): void;
    /**
     * Callback called if you prevented transitioning to a new step by returning false in onBeforeChange.
     */
    onPreventChange?(stepIndex: number): void;
    /**
     * Callback called when all the steps are completed.
     */
    onComplete?(): void;
    /**
     * Intro.js options.
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
     * All the hints.
     */
    hints: Hint[];
    /**
     * Callback called when a hint is clicked.
     */
    onClick?(): void;
    /**
     * Callback called when a hint is closed.
     */
    onClose?(): void;
    /**
     * Intro.js options.
     */
    options?: Options;
  }

  export class Steps extends React.Component<StepsProps> {
    public introJs: IntroJs;
    public updateStepElement(stepIndex: number): void;
  }

  export class Hints extends React.Component<HintsProps> {}
}
