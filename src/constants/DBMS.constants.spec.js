import {
	DB_NAME,
	DB_VERSION,
	DB_EXTENSION,
	FULL_DB_NAME
} from './DBMS.constants';

describe('DBMS Constants', () => {
	it('should define the DB_NAME', () => {
		expect(DB_NAME).toEqual('diary-items');
	});

	it('should define the DB_VERSION', () => {
		expect(DB_VERSION).toEqual('1');
	});

	it('should define the DB_EXTENSION', () => {
		expect(DB_EXTENSION).toEqual('db');
	});

	it('should define the FULL_DB_NAME', () => {
		expect(FULL_DB_NAME).toEqual('diary-items-v1.db');
	});
});
