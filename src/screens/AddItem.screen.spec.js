import { Alert } from 'react-native';
import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

jest.mock('moment', () => () => ({
	format: () => '2018–10–28T12:34:56+00:00'
}));

import AddItemScreen from './AddItem.screen';

const mockAddItem = jest.fn();

describe('AddItemScreen', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		jest.clearAllMocks();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render the component', async () => {
		const component = renderer.create(<AddItemScreen addItem={mockAddItem} />).toJSON();
		expect(component).toMatchSnapshot();
	});

	describe('state', () => {
		let instance;
		beforeEach(() => {
			instance = renderer.create(<AddItemScreen addItem={mockAddItem} />).getInstance();
		});

		describe('currentItem', () => {
			it('should be defined', () => {
				expect(instance.state.currentItem).toBeDefined();
			});

			it('should set the date property of the current item', () => {
				expect(instance.state.currentItem.date.format()).toEqual(
					'2018–10–28T12:34:56+00:00'
				);
			});
		});
	});

	describe('onSubmitItem', () => {
		let instance;
		let mockItemProp;

		describe('success', () => {
			beforeEach(() => {
				mockItemProp = jest.fn(() => 'item added correctly');
				instance = renderer
					.create(<AddItemScreen addItem={mockItemProp} />)
					.getInstance();
			});
			it('should call the addItem prop', async () => {
				instance.onSubmitItem();
				expect(mockItemProp).toHaveBeenCalled();
			});

			it('should call the alert method of Alert for displaying the result', async () => {
				const spy = jest.spyOn(Alert, 'alert');
				await instance.onSubmitItem();
				expect(spy).toHaveBeenCalledWith('item added correctly');
			});
		});

		describe('error', () => {
			beforeEach(() => {
				mockItemProp = jest.fn(() => {
					throw new Error('error adding the item');
				});
				instance = renderer
					.create(<AddItemScreen addItem={mockItemProp} />)
					.getInstance();
			});
			it('should call the addItem prop', async () => {
				instance.onSubmitItem();
				expect(mockItemProp).toHaveBeenCalled();
			});

			it('should call the alert method of Alert for displaying the error', async () => {
				const spy = jest.spyOn(Alert, 'alert');
				await instance.onSubmitItem();
				expect(spy).toHaveBeenCalledWith(new Error('error adding the item'));
			});
		});
	});
});
