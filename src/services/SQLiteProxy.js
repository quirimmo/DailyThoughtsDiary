import { SQLite } from 'expo';
import { CREATE_TABLES } from '../constants/Queries.constants';
import { FULL_DB_NAME } from '../constants/DBMS.constants';

class SQLiteProxy {
	static instance = null;

	constructor() {
		this.db = SQLite.openDatabase(FULL_DB_NAME);
	}

	createTables() {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				tx => tx.executeSql(CREATE_TABLES),
				err =>
					reject(new Error(`Error occured when creating the tables ${err}`)),
				msg => resolve(`Tables created correctly ${msg}`)
			);
		});
	}

	executeQuery(tx, query, values) {
		return new Promise((resolve, reject) => {
			tx.executeSql(
				query,
				values,
				(transaction, { insertId, rows }) => resolve({ insertId, rows }),
				err =>
					reject(
						new Error(
							`Error executing the query ${query} with values ${values}: ${err}`
						)
					)
			);
		});
	}

	executeTransaction(txFunction) {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				txFunction,
				err => reject(new Error(`Error executing the transaction: ${err}`)),
				msg => resolve(msg)
			);
		});
	}

	static getInstance() {
		if (SQLiteProxy.instance === null) {
			SQLiteProxy.instance = new SQLiteProxy();
		}
		return SQLiteProxy.instance;
	}
}

export default SQLiteProxy;
