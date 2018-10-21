import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockUpdateItemThunk = jest
	.fn()
	.mockImplementation(() => ({ type: 'MOCKED_ACTION' }));
jest.mock('../actions/items.action', () => ({
	updateItemThunk: item => mockUpdateItemThunk(item)
}));

jest.mock('moment', () => () => ({
	format: () => '2018–10–28T12:34:56+00:00'
}));

import UpdateItemContainer from './UpdateItem.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let component;
let instance;

describe('UpdateItemContainer', () => {
	beforeEach(() => {
		const renderer = new ShallowRenderer();
		component = renderer.render(<UpdateItemContainer store={store} />);
		instance = renderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(UpdateItemContainer).toBeDefined();
	});

	it('should render the component', async () => {
		expect(component).toMatchSnapshot();
	});

	it('should define the updateItem prop', () => {
		expect(typeof instance.props.updateItem).toEqual('function');
	});

	it('should dispatch the updateItemThunk action', () => {
		const item = {};
		instance.props.updateItem(item);
		expect(mockUpdateItemThunk).toHaveBeenCalledWith(item);
	});
});
