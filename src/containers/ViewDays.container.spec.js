import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockFetchItemsThunk = jest
	.fn()
	.mockImplementation(() => ({ type: 'MOCKED_ACTION' }));
jest.mock('../actions/items.action', () => ({
	fetchItemsThunk: () => mockFetchItemsThunk()
}));

jest.mock('moment', () => () => ({
	format: () => '2018–10–28T12:34:56+00:00'
}));

import ViewDaysContainer from './ViewDays.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const items = [];
const store = mockStore({ items: [] });
let component;
let instance;

describe('ViewDaysContainer', () => {
	beforeEach(() => {
		const renderer = new ShallowRenderer();
		component = renderer.render(<ViewDaysContainer store={store} />);
		instance = renderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(ViewDaysContainer).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component).toMatchSnapshot();
	});

	it('should define the fetchItems prop', () => {
		expect(typeof instance.props.fetchItems).toEqual('function');
	});

	it('should define the items prop', () => {
		expect(instance.props.items).toEqual(items);
	});

	it('should dispatch the fetchItemsThunk action', () => {
		instance.props.fetchItems();
		expect(mockFetchItemsThunk).toHaveBeenCalled();
	});
});
