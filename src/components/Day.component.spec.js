import React from 'react';
import { Button } from 'react-native';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import Day from './Day.component';

const day = {
	count: 2,
	value: '2018-10-28T22:00:46.723Z'
};
const mockOnPressed = jest.fn();
let component;
let instance;

describe('Day', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(<Day day={day} onPressed={mockOnPressed} />);
		instance = component.getInstance();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(Day).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('button', () => {
		let button;
		beforeEach(() => {
			button = component.root.findByType(Button);
		});

		it('should have the text', () => {
			expect(button.props.title).toEqual('Sunday 28-10-2018: 2 items');
		});

		it('should trigger the onPressed prop', () => {
			expect(button.props.onPress).toEqual(instance.props.onPressed);
		});
	});
});
