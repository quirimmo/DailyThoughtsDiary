import ItemsDAO from '../models/ItemsDAO';

export const ADD_ITEM = 'ADD_ITEM';
export const addItem = item => ({ type: ADD_ITEM, item });
export const addItemThunk = item => dispatch =>
	new Promise(async (resolve, reject) => {
		try {
			const insertedId = await ItemsDAO.addItem(item);
			item.key = insertedId;
			dispatch(addItem(item));
			resolve(`Item inserted correctly with an id of ${item.key}`);
		} catch (error) {
			reject(new Error(`Error adding the new item ${error}`));
		}
	});

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const fetchItems = items => ({ type: FETCH_ITEMS, items });
export const fetchItemsThunk = () => dispatch =>
	new Promise(async (resolve, reject) => {
		try {
			const results = await ItemsDAO.fetchItems();
			dispatch(fetchItems(results));
			resolve();
		} catch (error) {
			console.error(`ERROR FETCH ITEMS THUNK: ${error}`);
			reject(error);
		}
	});

export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = item => ({ type: DELETE_ITEM, item });
export const deleteItemThunk = item => dispatch =>
	new Promise(async (resolve, reject) => {
		try {
			await ItemsDAO.deleteItem(item);
			dispatch(deleteItem(item));
			resolve();
		} catch (error) {
			console.error(`ERROR DELETING THE ITEM THUNK: ${error}`);
			reject(error);
		}
	});

export const UPDATE_ITEM = 'UPDATE_ITEM';
export const updateItem = item => ({ type: UPDATE_ITEM, item });
export const updateItemThunk = item => dispatch =>
	new Promise(async (resolve, reject) => {
		try {
			await ItemsDAO.updateItem(item);
			dispatch(updateItem(item));
			resolve(`Item updated correctly with an id of ${item.key}`);
		} catch (error) {
			reject(new Error(`Error updating the item ${error}`));
		}
	});
