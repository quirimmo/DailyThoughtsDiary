import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import ItemsList from './ItemsList.component';

const item = {
	location: 'location',
	symptoms: 'symptoms',
	thoughts: 'thoughts',
	date: '2018-12-25T14:00:46.723Z'
};
const items = [item];
const mockOnDeleteItem = jest.fn();
const mockOnUpdateItem = jest.fn();
let component;
let instance;

describe('ItemsList', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<ItemsList
				items={items}
				onDeleteItem={mockOnDeleteItem}
				onUpdateItem={mockOnUpdateItem}
			/>
		);
		instance = component.getInstance();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(ItemsList).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('deleteItem', () => {
		it('should call the onDeleteItem prop', () => {
			instance.deleteItem(item);
			expect(mockOnDeleteItem).toHaveBeenCalledWith(item);
		});
	});

	describe('updateItem', () => {
		it('should call the onUpdateItem prop', () => {
			instance.updateItem(item);
			expect(mockOnUpdateItem).toHaveBeenCalledWith(item);
		});
	});
});
