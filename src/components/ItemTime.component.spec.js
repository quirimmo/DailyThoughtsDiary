import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

const mockOpenTimePickerAndroid = jest.fn(() => ({
	action: 'ok',
	hour: 10,
	minute: 20
}));
jest.mock(
	'./../../node_modules/react-native/Libraries/Components/TimePickerAndroid/TimePickerAndroid',
	() => ({
		open: mockOpenTimePickerAndroid,
		dismissedAction: 'cancel'
	})
);

import ItemTime from './ItemTime.component';

const mockOnSetTime = jest.fn();
let component;
let instance;

describe('ItemTime', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<ItemTime date="2018-12-25T14:00:46.723Z" onSetTime={mockOnSetTime} />
		);
		instance = component.getInstance();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(ItemTime).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('onSettingTime', () => {
		it('should call the open method of TimePickerAndroid', async () => {
			instance.onSettingTime();
			expect(mockOpenTimePickerAndroid).toHaveBeenCalledWith({
				hour: 15,
				minute: 0
			});
		});

		it('should call the onSetTime prop', async () => {
			await instance.onSettingTime();
			expect(mockOnSetTime).toHaveBeenCalledWith(10, 20);
		});
	});
});
