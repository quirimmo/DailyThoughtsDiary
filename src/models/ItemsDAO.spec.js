import ItemsDAO from './ItemsDAO';
import {
	INSERT_ITEM,
	DELETE_ITEM,
	SELECT_ITEMS,
	UPDATE_ITEM
} from '../constants/Queries.constants';

const item = {
	id: '1',
	date: 'date',
	symptoms: 'symptoms',
	location: 'location',
	thoughts: 'thoughts'
};
let spyExecuteTransaction;
let spyExecuteQuery;

describe('ItemsDAO', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		spyExecuteTransaction = jest.spyOn(
			ItemsDAO.sqliteProxy,
			'executeTransaction'
		);
		spyExecuteQuery = jest
			.spyOn(ItemsDAO.sqliteProxy, 'executeQuery')
			.mockImplementation(() => ({
				insertId: 1,
				rows: {
					_array: [{ key: '1' }, { key: '2' }]
				}
			}));
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(ItemsDAO).toBeDefined();
	});

	it('should define the exposed methods', () => {
		expect(typeof ItemsDAO.addItem).toEqual('function');
		expect(typeof ItemsDAO.deleteItem).toEqual('function');
		expect(typeof ItemsDAO.fetchItems).toEqual('function');
		expect(typeof ItemsDAO.updateItem).toEqual('function');
	});

	describe('addItem', () => {
		it('should call the executeTransaction method of SQLiteProxy', async () => {
			await ItemsDAO.addItem(item);
			expect(spyExecuteTransaction).toHaveBeenCalled();
		});

		it('should call the executeQuery method of SQLiteProxy', async () => {
			await ItemsDAO.addItem(item);
			expect(spyExecuteQuery).toHaveBeenCalledWith(
				expect.anything(),
				INSERT_ITEM,
				['date', 'symptoms', 'location', 'thoughts']
			);
		});
	});

	describe('deleteItem', () => {
		it('should call the executeTransaction method of SQLiteProxy', async () => {
			await ItemsDAO.deleteItem(item);
			expect(spyExecuteTransaction).toHaveBeenCalled();
		});

		it('should call the executeQuery method of SQLiteProxy', async () => {
			await ItemsDAO.deleteItem(item);
			expect(spyExecuteQuery).toHaveBeenCalledWith(
				expect.anything(),
				DELETE_ITEM,
				['1']
			);
		});
	});

	describe('fetchItems', () => {
		it('should call the executeTransaction method of SQLiteProxy', async () => {
			await ItemsDAO.fetchItems();
			expect(spyExecuteTransaction).toHaveBeenCalled();
		});

		it('should call the executeQuery method of SQLiteProxy', async () => {
			await ItemsDAO.fetchItems();
			expect(spyExecuteQuery).toHaveBeenCalledWith(
				expect.anything(),
				SELECT_ITEMS
			);
		});
	});

	describe('updateItem', () => {
		it('should call the executeTransaction method of SQLiteProxy', async () => {
			await ItemsDAO.updateItem(item);
			expect(spyExecuteTransaction).toHaveBeenCalled();
		});

		it('should call the executeQuery method of SQLiteProxy', async () => {
			const updatedItem = {
				id: '1',
				date: 'new date',
				symptoms: 'new symptoms',
				location: 'new location',
				thoughts: 'new thoughts'
			};
			await ItemsDAO.updateItem(updatedItem);
			expect(spyExecuteQuery).toHaveBeenCalledWith(
				expect.anything(),
				UPDATE_ITEM,
				[
					updatedItem.date,
					updatedItem.symptoms,
					updatedItem.location,
					updatedItem.thoughts,
					+updatedItem.id
				]
			);
		});
	});
});
