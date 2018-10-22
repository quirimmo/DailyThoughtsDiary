import React from 'react';
import { Alert } from 'react-native';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import DailyItemsList from '../models/DailyItemsList';

const items = [
	{
		date: '2018–10–28T12:34:56+00:00',
		symptoms: 'symptoms 1',
		location: 'location 1',
		thoughts: 'thoughts 1'
	},
	{
		date: '2018–10–29T12:34:56+00:00',
		symptoms: 'symptoms 2',
		location: 'location 2',
		thoughts: 'thoughts 2'
	}
];
const mockResetCounters = jest.fn(() => new DailyItemsList());
const mockAddOrIncrementItem = jest.fn(() => new DailyItemsList());
jest.mock('../models/DailyItemsList', () =>
	jest.fn().mockImplementation(() => ({
		resetCounters: mockResetCounters,
		addOrIncrementItem: mockAddOrIncrementItem
	}))
);

import ViewDaysScreen from './ViewDays.screen';
import PDFPrinter from '../services/PDFPrinter';

const mockFetchItems = jest.fn();
const mockNavigate = jest.fn();
const mockAddListener = jest.fn();
const navigation = {
	navigate: mockNavigate,
	addListener: mockAddListener
};
let component;

describe('ViewDaysScreen', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		NavigationTestUtils.resetInternalState();
		component = renderer.create(
			<ViewDaysScreen
				navigation={navigation}
				fetchItems={mockFetchItems}
				items={items}
			/>
		);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	describe('state', () => {
		describe('dailyItemsList', () => {
			it('should be defined', () => {
				expect(component.getInstance().state.dailyItemsList).toBeDefined();
			});
		});
	});

	describe('componentDidMount', () => {
		it('should call the addListener method of the navigation prop', () => {
			const instance = component.getInstance();
			instance.componentDidMount();
			expect(mockAddListener).toHaveBeenCalledWith(
				'didFocus',
				instance.loadItems
			);
		});
	});

	describe('loadItems success', () => {
		it('should call the resetCounters method of dailyItemsList', () => {
			component.getInstance().loadItems();
			expect(mockResetCounters).toHaveBeenCalled();
		});

		it('should call the fetchItems prop', () => {
			component.getInstance().loadItems();
			expect(mockFetchItems).toHaveBeenCalled();
		});

		it('should call the addOrIncrementItem method of DailyListItems', async () => {
			await component.getInstance().loadItems();
			expect(mockAddOrIncrementItem).toHaveBeenCalled();
		});
	});

	describe('loadItems error', () => {
		it('should display the error message', async () => {
			const spy = jest.spyOn(Alert, 'alert');
			const mockFetchItemsError = jest.fn(() => {
				throw new Error('fetch items error');
			});
			const fetchItemsErrorComponent = renderer.create(
				<ViewDaysScreen
					navigation={navigation}
					fetchItems={mockFetchItemsError}
					items={items}
				/>
			);
			await fetchItemsErrorComponent.getInstance().loadItems();
			expect(spy).toHaveBeenCalledWith(
				'Error fetching the items Error: fetch items error'
			);
		});
	});

	describe('printPDF', () => {
		it('should call the printDays method of PDFPrinter', () => {
			const spy = jest
				.spyOn(PDFPrinter, 'printDays')
				.mockImplementation(() => {});
			component.getInstance().printPDF();
			expect(spy).toHaveBeenCalledWith(
				component.getInstance().state.dailyItemsList
			);
		});
	});

	describe('openViewItems', () => {
		it('should call the navigate method of the navigation prop', () => {
			component.getInstance().openViewItems({ value: 'mocked-value' });
			expect(mockNavigate).toHaveBeenCalledWith('ViewItems', {
				date: 'mocked-value'
			});
		});
	});
});
