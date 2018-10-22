import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockGetParam = jest.fn(() => '2018-10-28T14:00:00.003Z');
const mockedNavigation = {
	getParam: mockGetParam
};
const mockDeleteItemThunk = jest
	.fn()
	.mockImplementation(() => ({ type: 'MOCKED_ACTION' }));
jest.mock('../actions/items.action', () => ({
	deleteItemThunk: item => mockDeleteItemThunk(item)
}));

import ViewItemsContainer from './ViewItems.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const item1 = { date: '2018-10-28T16:00:00.003Z' };
const item2 = { date: '2017-10-28T16:00:00.003Z' };
const items = [item1, item2];
const store = mockStore({ items });
let component;
let instance;

describe('ViewItemsContainer', () => {
	beforeEach(() => {
		const renderer = new ShallowRenderer();
		component = renderer.render(
			<ViewItemsContainer navigation={mockedNavigation} store={store} />
		);
		instance = renderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(ViewItemsContainer).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component).toMatchSnapshot();
	});

	it('should define the deleteItem prop', () => {
		expect(typeof instance.props.deleteItem).toEqual('function');
	});

	describe('items prop', () => {
		it('should define the items prop', () => {
			expect(instance.props.items).toBeDefined();
		});

		it('should call the getParam method of the navigation prop', () => {
			expect(mockGetParam).toHaveBeenCalledWith('date');
		});

		it('should filter the items prop by the given date', () => {
			expect(instance.props.items).toEqual([item1]);
		});
	});

	it('should dispatch the deleteItemThunk action', () => {
		const item = {};
		instance.props.deleteItem(item);
		expect(mockDeleteItemThunk).toHaveBeenCalledWith(item);
	});
});
