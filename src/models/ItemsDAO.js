import SQLiteProxy from '../services/SQLiteProxy';
import {
	INSERT_ITEM,
	SELECT_ITEMS,
	DELETE_ITEM,
	UPDATE_ITEM
} from '../constants/Queries.constants';

class ItemsDAO {
	static sqliteProxy = SQLiteProxy.getInstance();

	static async addItem(item) {
		return new Promise(async (resolve, reject) => {
			try {
				ItemsDAO.sqliteProxy.executeTransaction(getTransition(resolve, reject));
			} catch (error) {
				reject(
					new Error(
						`Error executing the transaction for adding a new item: ${error}`
					)
				);
			}
		});

		function getTransition(resolve, reject) {
			return async tx => {
				try {
					const result = await ItemsDAO.sqliteProxy.executeQuery(
						tx,
						INSERT_ITEM,
						[item.date, item.symptoms, item.location, item.thoughts]
					);
					resolve(result.insertId.toString());
				} catch (err) {
					reject(`Error inserting the row ${err}`);
				}
			};
		}
	}

	static async deleteItem(item) {
		return new Promise(async (resolve, reject) => {
			try {
				ItemsDAO.sqliteProxy.executeTransaction(getTransition(resolve, reject));
			} catch (error) {
				reject(
					new Error(
						`Error executing the transaction for deleting an item: ${error}`
					)
				);
			}
		});

		function getTransition(resolve, reject) {
			return async tx => {
				try {
					const result = await ItemsDAO.sqliteProxy.executeQuery(
						tx,
						DELETE_ITEM,
						[item.id]
					);
					resolve(result);
				} catch (err) {
					reject(`Error removing the row ${err}`);
				}
			};
		}
	}

	static async fetchItems() {
		return new Promise((resolve, reject) => {
			try {
				ItemsDAO.sqliteProxy.executeTransaction(getTransition(resolve, reject));
			} catch (error) {
				reject(
					new Error(
						`Error executing the transaction for fetching items: ${error}`
					)
				);
			}
		});

		function getTransition(resolve, reject) {
			return async tx => {
				try {
					const result = await ItemsDAO.sqliteProxy.executeQuery(
						tx,
						SELECT_ITEMS
					);
					resolve(
						result.rows._array.map(el => {
							el.key = el.key.toString();
							return el;
						})
					);
				} catch (err) {
					reject(`Error selecting the items ${err}`);
				}
			};
		}
	}

	static async updateItem(item) {
		return new Promise(async (resolve, reject) => {
			try {
				ItemsDAO.sqliteProxy.executeTransaction(getTransition(resolve, reject));
			} catch (error) {
				reject(
					new Error(
						`Error executing the transaction for updating an item: ${error}`
					)
				);
			}
		});

		function getTransition(resolve, reject) {
			return async tx => {
				try {
					await ItemsDAO.sqliteProxy.executeQuery(tx, UPDATE_ITEM, [
						item.date,
						item.symptoms,
						item.location,
						item.thoughts,
						+item.id
					]);
					resolve(item.id);
				} catch (err) {
					reject(`Error updating the row ${err}`);
				}
			};
		}
	}
}

export default ItemsDAO;
