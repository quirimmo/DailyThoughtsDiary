import { CREATE_TABLES, INSERT_ITEM, SELECT_ITEMS, DELETE_ITEM, UPDATE_ITEM } from './Queries.constants';

describe('Queries Constants', () => {
	it('should define the CREATE_TABLES', () => {
		const expected = `
			create table if not exists items
			(id integer primary key autoincrement, date text, symptoms text, location text, thoughts text);
		`.replace(/\s/g, '');
		expect(CREATE_TABLES.replace(/\s/g, '')).toEqual(expected);
	});

	it('should define the INSERT_ITEM', () => {
		const expected = `
			insert into items
			(date, symptoms, location, thoughts)
			values
			(?, ?, ?, ?);
		`.replace(/\s/g, '');
		expect(INSERT_ITEM.replace(/\s/g, '')).toEqual(expected);
	});

	it('should define the SELECT_ITEMS', () => {
		const expected = `
			select rowid as key, *
			from items;
		`.replace(/\s/g, '');
		expect(SELECT_ITEMS.replace(/\s/g, '')).toEqual(expected);
	});

	it('should define the DELETE_ITEM', () => {
		const expected = `
			delete
			from items
			where id = ?;
		`.replace(/\s/g, '');
		expect(DELETE_ITEM.replace(/\s/g, '')).toEqual(expected);
	});

	it('should define the UPDATE_ITEM', () => {
		const expected = `
			update items
			set date = ?, symptoms = ?, location = ?, thoughts = ?
			where id = ?;
		`.replace(/\s/g, '');
		expect(UPDATE_ITEM.replace(/\s/g, '')).toEqual(expected);
	});
});
