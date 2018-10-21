import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import Item from './Item.component';

const item = {
	location: 'location',
	symptoms: 'symptoms',
	thoughts: 'thoughts',
	date: '2018-12-25T14:00:46.723Z'
};
const mockOnDeleteItem = jest.fn();
const mockOnUpdateItem = jest.fn();
let component;
let instance;

describe('Item', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<Item
				item={item}
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
		expect(Item).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('onDeleteItem', () => {
		it('should call the onDeleteItem prop', () => {
			instance.onDeleteItem();
			expect(mockOnDeleteItem).toHaveBeenCalledWith(item);
		});
	});

	describe('onUpdateItem', () => {
		it('should call the onUpdateItem prop', () => {
			instance.onUpdateItem();
			expect(mockOnUpdateItem).toHaveBeenCalledWith(item);
		});
	});
});
