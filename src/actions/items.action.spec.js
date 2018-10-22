import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as itemsActions from './items.action';
import ItemsDAO from '../models/ItemsDAO';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const item = {
	date: '',
	location: 'location',
	symptoms: 'symptoms',
	thoughts: 'thoughts'
};
const newItem = {
	date: '',
	location: 'new-location',
	symptoms: 'new-symptoms',
	thoughts: 'new-thoughts'
};
const items = [item];
let spyAddItemDAO;
let spyFetchItemsDAO;
let spyDeleteItemDAO;
let spyUpdateItemDAO;

describe('items actions', () => {
	beforeEach(() => {
		spyAddItemDAO = jest.spyOn(ItemsDAO, 'addItem').mockImplementation(() => 1);
		spyFetchItemsDAO = jest
			.spyOn(ItemsDAO, 'fetchItems')
			.mockImplementation(() => items);
		spyDeleteItemDAO = jest
			.spyOn(ItemsDAO, 'deleteItem')
			.mockImplementation(() => {});
		spyUpdateItemDAO = jest
			.spyOn(ItemsDAO, 'updateItem')
			.mockImplementation(() => newItem);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('action types', () => {
		it('should define the ADD_ITEM action type', () => {
			expect(itemsActions.ADD_ITEM).toEqual('ADD_ITEM');
		});

		it('should define the FETCH_ITEMS action type', () => {
			expect(itemsActions.FETCH_ITEMS).toEqual('FETCH_ITEMS');
		});

		it('should define the DELETE_ITEM action type', () => {
			expect(itemsActions.DELETE_ITEM).toEqual('DELETE_ITEM');
		});

		it('should define the UPDATE_ITEM action type', () => {
			expect(itemsActions.UPDATE_ITEM).toEqual('UPDATE_ITEM');
		});
	});

	describe('plain actions', () => {
		it('should define the addItem plain action', () => {
			expect(itemsActions.addItem(item)).toEqual({
				type: itemsActions.ADD_ITEM,
				item
			});
		});

		it('should define the fetchItems plain action', () => {
			expect(itemsActions.fetchItems([item])).toEqual({
				type: itemsActions.FETCH_ITEMS,
				items: [item]
			});
		});

		it('should define the deleteItem plain action', () => {
			expect(itemsActions.deleteItem(item)).toEqual({
				type: itemsActions.DELETE_ITEM,
				item
			});
		});

		it('should define the updateItem plain action', () => {
			expect(itemsActions.updateItem(item)).toEqual({
				type: itemsActions.UPDATE_ITEM,
				item
			});
		});
	});

	describe('thunk actions', () => {
		describe('addItemThunk', () => {
			it('should call the addItem method of ItemsDAO', async () => {
				await itemsActions.addItemThunk(item)(store.dispatch);
				expect(spyAddItemDAO).toHaveBeenCalledWith(item);
			});

			it('should dispatch the addItem plain action', async () => {
				const spy = jest.spyOn(store, 'dispatch');
				await itemsActions.addItemThunk(item)(store.dispatch);
				expect(spy).toHaveBeenCalledWith(itemsActions.addItem(item));
			});
		});

		describe('fetchItemsThunk', () => {
			it('should call the fetchItems method of ItemsDAO', async () => {
				await itemsActions.fetchItemsThunk()(store.dispatch);
				expect(spyFetchItemsDAO).toHaveBeenCalled();
			});

			it('should dispatch the fetchItems plain action', async () => {
				const spy = jest.spyOn(store, 'dispatch');
				await itemsActions.fetchItemsThunk()(store.dispatch);
				expect(spy).toHaveBeenCalledWith(itemsActions.fetchItems(items));
			});
		});

		describe('deleteItemThunk', () => {
			it('should call the deleteItem method of ItemsDAO', async () => {
				await itemsActions.deleteItemThunk(item)(store.dispatch);
				expect(spyDeleteItemDAO).toHaveBeenCalled();
			});

			it('should dispatch the deleteItem plain action', async () => {
				const spy = jest.spyOn(store, 'dispatch');
				await itemsActions.deleteItemThunk(item)(store.dispatch);
				expect(spy).toHaveBeenCalledWith(itemsActions.deleteItem(item));
			});
		});

		describe('updateItemThunk', () => {
			it('should call the updateItem method of ItemsDAO', async () => {
				await itemsActions.updateItemThunk(newItem)(store.dispatch);
				expect(spyUpdateItemDAO).toHaveBeenCalled();
			});

			it('should dispatch the updateItem plain action', async () => {
				const spy = jest.spyOn(store, 'dispatch');
				await itemsActions.updateItemThunk(newItem)(store.dispatch);
				expect(spy).toHaveBeenCalledWith(itemsActions.updateItem(newItem));
			});
		});
	});
});
