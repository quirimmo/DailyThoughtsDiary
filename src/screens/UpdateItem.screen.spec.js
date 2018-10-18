import React from 'react';
import { Alert } from 'react-native';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import UpdateItemScreen from './UpdateItem.screen';

const item = { id: 'item' };
const mockGetParam = jest.fn(() => item);
const navigation = {
	getParam: mockGetParam
};
let component;

describe('UpdateItemScreen', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		jest.clearAllMocks();
		component = renderer.create(<UpdateItemScreen navigation={navigation} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(UpdateItemScreen).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('should call the getParam method of the navigation prop', () => {
		expect(mockGetParam).toHaveBeenCalledWith('item');
	});

	describe('state', () => {
		describe('currentItem', () => {
			it('should be defined', () => {
				expect(component.getInstance().state.currentItem).toEqual(item);
			});
		});
	});

	describe('onSubmitItem', () => {
		let instance;
		let mockItemProp;

		describe('success', () => {
			beforeEach(() => {
				mockItemProp = jest.fn(() => 'item updated correctly');
				instance = renderer
					.create(<UpdateItemScreen navigation={navigation} updateItem={mockItemProp} />)
					.getInstance();
			});
			it('should call the addItem prop', async () => {
				instance.onSubmitItem();
				expect(mockItemProp).toHaveBeenCalled();
			});

			it('should call the alert method of Alert for displaying the result', async () => {
				const spy = jest.spyOn(Alert, 'alert');
				await instance.onSubmitItem();
				expect(spy).toHaveBeenCalledWith('item updated correctly');
			});
		});

		describe('error', () => {
			beforeEach(() => {
				mockItemProp = jest.fn(() => {
					throw new Error('error updating the item');
				});
				instance = renderer
					.create(<UpdateItemScreen navigation={navigation} updateItem={mockItemProp} />)
					.getInstance();
			});
			it('should call the addItem prop', async () => {
				instance.onSubmitItem();
				expect(mockItemProp).toHaveBeenCalled();
			});

			it('should call the alert method of Alert for displaying the error', async () => {
				const spy = jest.spyOn(Alert, 'alert');
				await instance.onSubmitItem();
				expect(spy).toHaveBeenCalledWith(new Error('error updating the item'));
			});
		});
	});
});
