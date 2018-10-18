const mockTransaction = jest.fn();
const mockOpenDatabase = jest.fn(() => ({
	transaction: mockTransaction
}));

jest.mock('expo', () => ({
	SQLite: {
		openDatabase: () => mockOpenDatabase()
	}
}));

import SQLiteProxy from './SQLiteProxy';

describe('SQLiteProxy', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(SQLiteProxy).toBeDefined();
	});

	describe('getInstance', () => {
		it('should call the openDatabase method of SQLite', () => {
			SQLiteProxy.getInstance();
			expect(mockOpenDatabase).toHaveBeenCalled();
		});

		it('should call the openDatabase method of SQLite just once', () => {
			// reset the instance
			SQLiteProxy.instance = null;
			SQLiteProxy.getInstance();
			SQLiteProxy.getInstance();
			SQLiteProxy.getInstance();
			expect(mockOpenDatabase).toHaveBeenCalledTimes(1);
		});
	});

	describe('createTables', () => {
		it('should call the transaction method of the db', () => {
			SQLiteProxy.getInstance().createTables();
			expect(mockTransaction).toHaveBeenCalled();
		});
	});

	describe('executeQuery', () => {
		it('should call the executeSql method of the given tx', () => {
			const mockExecuteSql = jest.fn();
			const inputTransaction = { executeSql: mockExecuteSql };
			SQLiteProxy.getInstance().executeQuery(inputTransaction, 'query', 'values');
			expect(mockExecuteSql).toHaveBeenCalledWith('query', 'values', expect.any(Function), expect.any(Function));
		});
	});

	describe('executeTransaction', () => {
		it('should call the transaction method of the db', () => {
			const mockTxFunction = jest.fn();
			SQLiteProxy.getInstance().executeTransaction(mockTxFunction);
			expect(mockTransaction).toHaveBeenCalledWith(mockTxFunction, expect.any(Function), expect.any(Function));
		});
	});
});
