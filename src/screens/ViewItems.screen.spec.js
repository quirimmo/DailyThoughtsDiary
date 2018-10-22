import React from 'react';
import { Alert } from 'react-native';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import ViewItemsScreen from './ViewItems.screen';
import PDFPrinter from '../services/PDFPrinter';

const items = [{ id: 1 }, { id: 2 }];
const mockNavigate = jest.fn();
const navigation = {
	navigate: mockNavigate
};
const mockDeleteItem = jest.fn();
let component;
let instance;

describe('ViewItemsScreen', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<ViewItemsScreen
				navigation={navigation}
				deleteItem={mockDeleteItem}
				items={items}
			/>
		);
		instance = component.getInstance();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(ViewItemsScreen).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('printPDF', () => {
		it('should call the printItems method of PDFPrinter', () => {
			const spy = jest.spyOn(PDFPrinter, 'printItems');
			instance.printPDF();
			expect(spy).toHaveBeenCalledWith(items);
		});
	});

	describe('updateItem', () => {
		it('should call the navigate method of the navigation prop', () => {
			instance.updateItem('item');
			expect(mockNavigate).toHaveBeenCalledWith('UpdateItem', { item: 'item' });
		});
	});

	describe('deleteItem', () => {
		it('should call the prop deleteItem method', () => {
			instance.deleteItem('item');
			expect(mockDeleteItem).toHaveBeenCalledWith('item');
		});

		it('should display the result message', async () => {
			const spy = jest.spyOn(Alert, 'alert');
			await instance.deleteItem('item');
			expect(spy).toHaveBeenCalledWith('Item deleted correctly');
		});
	});
});
