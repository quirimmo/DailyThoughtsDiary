import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAddItemThunk = jest
	.fn()
	.mockImplementation(() => ({ type: 'MOCKED_ACTION' }));
jest.mock('../actions/items.action', () => ({
	addItemThunk: item => mockAddItemThunk(item)
}));

jest.mock('moment', () => () => ({
	format: () => '2018–10–28T12:34:56+00:00'
}));

import AddItemContainer from './AddItem.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let component;
let instance;

describe('AddItemContainer', () => {
	beforeEach(() => {
		const renderer = new ShallowRenderer();
		component = renderer.render(<AddItemContainer store={store} />);
		instance = renderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(AddItemContainer).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component).toMatchSnapshot();
	});

	it('should define the addItem prop', () => {
		expect(typeof instance.props.addItem).toEqual('function');
	});

	it('should dispatch the addItemThunk action', () => {
		const item = {};
		instance.props.addItem(item);
		expect(mockAddItemThunk).toHaveBeenCalledWith(item);
	});
});
