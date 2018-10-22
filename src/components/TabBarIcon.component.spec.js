import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import TabBarIcon from './TabBarIcon.component';

let component;

describe('TabBarIcon', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(<TabBarIcon name="ios-add-circle" focused={false} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(TabBarIcon).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
});
