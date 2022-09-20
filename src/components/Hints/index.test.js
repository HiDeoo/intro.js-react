import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Hints from './index';
import * as server from '../../helpers/server';

/**
 * Hints.
 * @type {Hint[]}
 */
const hints = [
  {
    element: '.test',
    hint: 'test',
  },
];

describe('Hints', () => {
  test('should render nothing', () => {
    const tree = renderer.create(<Hints enabled hints={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should not configure Intro.js at mount time if not enabled', () => {
    const wrapper = shallow(<Hints hints={hints} />, {
      lifecycleExperimental: true,
    });

    expect(wrapper.instance().isConfigured).toBe(false);
  });

  test('should configure Intro.js at mount time if enabled at least once', () => {
    const wrapper = shallow(<Hints enabled hints={hints} />, {
      lifecycleExperimental: true,
    });

    wrapper.setProps({ enabled: false });

    expect(wrapper.instance().isConfigured).toBe(true);
  });

  test('should configure Intro.js when enabled if not already configured', () => {
    const wrapper = shallow(<Hints hints={hints} />, {
      lifecycleExperimental: true,
    });

    wrapper.instance().configureIntroJs = jest.fn();
    wrapper.update();
    wrapper.setProps({ enabled: true });

    expect(wrapper.instance().configureIntroJs).toHaveBeenCalled();
  });

  test('should call renderHints when enabled while being disabled', () => {
    const wrapper = shallow(<Hints hints={hints} />, {
      lifecycleExperimental: true,
    });

    wrapper.instance().renderHints = jest.fn();
    wrapper.update();
    wrapper.setProps({ enabled: true });

    expect(wrapper.instance().renderHints).toHaveBeenCalled();
  });

  test('should call renderHints when enabled while being already enabled', () => {
    const wrapper = shallow(<Hints enabled hints={hints} />, {
      lifecycleExperimental: true,
    });

    wrapper.instance().renderHints = jest.fn();
    wrapper.update();
    wrapper.setProps({ enabled: false });

    expect(wrapper.instance().renderHints).toHaveBeenCalled();
  });

  test('should call renderHints everytime the enabled prop is modified', () => {
    const wrapper = shallow(<Hints hints={hints} />, {
      lifecycleExperimental: true,
    });

    wrapper.instance().renderHints = jest.fn();
    wrapper.update();
    wrapper.setProps({ enabled: true });
    wrapper.setProps({ enabled: false });
    wrapper.setProps({ enabled: true });

    expect(wrapper.instance().renderHints).toHaveBeenCalledTimes(4);

    wrapper.unmount();
  });

  test('should not call renderHints when the enabled, hints or options are not modified', () => {
    const wrapper = shallow(<Hints enabled hints={hints} />, {
      lifecycleExperimental: true,
    });

    wrapper.instance().renderHints = jest.fn();
    wrapper.update();
    wrapper.setProps({ enabled: true, hints });

    expect(wrapper.instance().renderHints).not.toHaveBeenCalled();
  });

  test('should register the onClick callback', () => {
    const onClick = jest.fn();

    const wrapper = shallow(<Hints hints={hints} onClick={onClick} />);

    expect(wrapper.instance().introJs.onHintClick).toBe(onClick);
  });

  test('should register the onClose callback', () => {
    const onClose = jest.fn();

    const wrapper = shallow(<Hints hints={hints} onClose={onClose} />);

    expect(wrapper.instance().introJs.onHintClose).toBe(onClose);
  });

  test('should not install intro.js during SSR', () => {
    jest.spyOn(server, 'isServer').mockReturnValueOnce(true);

    const wrapper = shallow(<Hints hints={hints} />);

    expect(wrapper.instance().introJs).toBe(null);
  });
});
