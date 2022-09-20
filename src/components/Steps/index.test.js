import React from 'react';
import ReactDOMServer from 'react-dom/server';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Steps from './index';
import * as server from '../../helpers/server';

jest.useFakeTimers();

/**
 * Steps.
 * @type {Step[]}
 */
const steps = [
  {
    element: '.test',
    intro: 'test',
  },
];

describe('Steps', () => {
  test('should render nothing', () => {
    const tree = renderer.create(<Steps initialStep={0} steps={[]} onExit={() => {}} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render a React element using renderToStaticMarkup', () => {
    const Element = () => <div>react test</div>;

    const spy = jest.spyOn(ReactDOMServer, 'renderToStaticMarkup');

    const wrapper = shallow(
      <Steps initialStep={0} steps={[{ element: '.test', intro: <Element /> }]} onExit={() => {}} />,
      {
        lifecycleExperimental: true,
      }
    );
    wrapper.setProps({ enabled: true });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should not call the onStart callback at mount time if not enabled', () => {
    const onStart = jest.fn();

    renderer.create(<Steps enabled={false} initialStep={0} steps={[]} onExit={() => {}} onStart={onStart} />);

    expect(onStart).not.toHaveBeenCalled();
  });

  test('should not call the onStart callback at mount time if enabled without steps', () => {
    const onStart = jest.fn();

    renderer.create(<Steps initialStep={0} steps={[]} onExit={() => {}} onStart={onStart} enabled />);

    expect(onStart).not.toHaveBeenCalled();
  });

  test('should call the onStart callback at mount time if enabled with steps', () => {
    const onStart = jest.fn();

    renderer.create(<Steps initialStep={0} steps={steps} onExit={() => {}} onStart={onStart} enabled />);

    expect(onStart).toHaveBeenCalledTimes(1);
  });

  test('should call the onStart callback when enabled with steps', () => {
    const onStart = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onStart={onStart} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onStart).toHaveBeenCalledTimes(1);
  });

  test('should call the onComplete callback when the tutorial is done', () => {
    const onComplete = jest.fn();

    const wrapper = shallow(<Steps enabled initialStep={0} steps={steps} onExit={() => {}} onComplete={onComplete} />, {
      lifecycleExperimental: true,
    });
    wrapper.instance().onComplete();

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test('should call the onStart callback with the step number', () => {
    const onStart = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onStart={onStart} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onStart).toHaveBeenCalledWith(1);

    wrapper.setProps({ enabled: false, initialStep: 10 });
    wrapper.setProps({ enabled: true });

    expect(onStart).toHaveBeenCalledWith(11);
  });

  test('should call the onExit callback when disabled while being enabled', () => {
    const onExit = jest.fn();

    const wrapper = shallow(<Steps enabled initialStep={0} steps={steps} onExit={onExit} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: false });
    wrapper.instance().onComplete();

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  test('should call the onExit callback when unmounting if enabled', () => {
    const onExit = jest.fn();

    const wrapper = shallow(<Steps enabled initialStep={0} steps={steps} onExit={onExit} />, {
      lifecycleExperimental: true,
    });
    wrapper.unmount();

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  test('should not call the onExit callback when unmounting if not enabled', () => {
    const onExit = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={onExit} />, {
      lifecycleExperimental: true,
    });
    wrapper.unmount();

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  test('should call the onExit callback with the step number', () => {
    const onExit = jest.fn();

    const wrapper = shallow(<Steps enabled initialStep={0} steps={steps} onExit={onExit} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: false });

    expect(onExit).toHaveBeenCalledWith(1);

    wrapper.setProps({ enabled: true, initialStep: 10 });
    wrapper.setProps({ enabled: false });

    expect(onExit).toHaveBeenCalledWith(11);
  });

  test('should not call the onExit callback when disabled while being already disabled', () => {
    const onExit = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={onExit} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: false });

    expect(onExit).not.toHaveBeenCalled();
  });

  test('should not call the onChange callback when disabled', () => {
    const onChange = jest.fn();

    renderer.create(<Steps initialStep={0} steps={steps} onExit={() => {}} onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });

  test('should call the onChange callback when enabled', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onChange={onChange} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should call the onChange callback with the step number and the new element', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onChange={onChange} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onChange).toHaveBeenCalledWith(1, null);
  });

  test('should not call the onBeforeExit callback when disabled', () => {
    const onBeforeExit = jest.fn();

    renderer.create(<Steps initialStep={0} steps={steps} onExit={() => {}} onBeforeExit={onBeforeExit} />);

    expect(onBeforeExit).not.toHaveBeenCalled();
  });

  test('should call the onBeforeExit callback when disabling', () => {
    const onBeforeExit = jest.fn();

    const wrapper = shallow(
      <Steps enabled initialStep={0} steps={steps} onExit={() => {}} onBeforeExit={onBeforeExit} />,
      {
        lifecycleExperimental: true,
      }
    );
    wrapper.setProps({ enabled: false });

    expect(onBeforeExit).toHaveBeenCalledTimes(1);
  });

  test('should call the onBeforeExit callback with the step number', () => {
    const onBeforeExit = jest.fn();

    const wrapper = shallow(
      <Steps enabled initialStep={0} steps={steps} onExit={() => {}} onBeforeExit={onBeforeExit} />,
      {
        lifecycleExperimental: true,
      }
    );
    wrapper.setProps({ enabled: false });

    expect(onBeforeExit).toHaveBeenCalledWith(1);
    expect(onBeforeExit).toHaveBeenCalledTimes(1);

    wrapper.setProps({ enabled: true, initialStep: 10 });
    wrapper.setProps({ enabled: false });

    expect(onBeforeExit).toHaveBeenCalledWith(11);
    expect(onBeforeExit).toHaveBeenCalledTimes(2);
  });

  test('should not call the onBeforeChange callback when disabled', () => {
    const onBeforeChange = jest.fn();

    renderer.create(<Steps initialStep={0} steps={steps} onExit={() => {}} onBeforeChange={onBeforeChange} />);

    expect(onBeforeChange).not.toHaveBeenCalled();
  });

  test('should call the onBeforeChange callback when enabled', () => {
    const onBeforeChange = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onBeforeChange={onBeforeChange} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onBeforeChange).toHaveBeenCalledTimes(1);
  });

  test('should call the onBeforeChange callback with the step number and the new element', () => {
    const onBeforeChange = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onBeforeChange={onBeforeChange} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onBeforeChange).toHaveBeenCalledWith(1, null);
  });

  test('should call the onPreventChange callback if onBeforeChange returned false to prevent transition', () => {
    const onPreventChange = jest.fn();

    const wrapper = shallow(
      <Steps
        initialStep={0}
        steps={steps}
        onExit={() => {}}
        onBeforeChange={() => false}
        onPreventChange={onPreventChange}
      />,
      {
        lifecycleExperimental: true,
      }
    );
    wrapper.setProps({ enabled: true });

    jest.runAllTimers();

    expect(onPreventChange).toHaveBeenCalled();
  });

  test('should not call the onAfterChange callback when disabled', () => {
    const onAfterChange = jest.fn();

    renderer.create(<Steps initialStep={0} steps={steps} onExit={() => {}} onAfterChange={onAfterChange} />);

    expect(onAfterChange).not.toHaveBeenCalled();
  });

  test('should call the onAfterChange callback when enabled', () => {
    const onAfterChange = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onAfterChange={onAfterChange} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onAfterChange).toHaveBeenCalledTimes(1);
  });

  test('should call the onAfterChange callback with the step number and the new element', () => {
    const onAfterChange = jest.fn();

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} onAfterChange={onAfterChange} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    expect(onAfterChange).toHaveBeenCalledWith(1, null);
  });

  test('should not update the element if it does not exist when calling updateStepElement()', () => {
    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    wrapper.instance().updateStepElement(0);

    expect(wrapper.instance().introJs._introItems[0].element).not.toEqual(expect.any(HTMLDivElement));
  });

  test('should update the element if it does exist when calling updateStepElement()', () => {
    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} />, {
      lifecycleExperimental: true,
    });
    wrapper.setProps({ enabled: true });

    const div = document.createElement('div');
    div.className = 'test';
    document.body.appendChild(div);

    wrapper.instance().updateStepElement(0);

    expect(wrapper.instance().introJs._introItems[0].element).toEqual(expect.any(HTMLDivElement));
  });

  test('should not install intro.js during SSR', () => {
    jest.spyOn(server, 'isServer').mockReturnValueOnce(true);

    const wrapper = shallow(<Steps initialStep={0} steps={steps} onExit={() => {}} />);

    expect(wrapper.instance().introJs).toBe(null);
  });
});
