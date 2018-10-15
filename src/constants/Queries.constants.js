export const CREATE_TABLES = `
	create table if not exists items
	(id integer primary key autoincrement, date text, symptoms text, location text, thoughts text);
`;

export const INSERT_ITEM = `
	insert into items
	(date, symptoms, location, thoughts)
	values
	(?, ?, ?, ?);
`;

export const SELECT_ITEMS = `
	select rowid as key, *
	from items;
`;

export const DELETE_ITEM = `
	delete
	from items
	where id = ?;
`;

export const UPDATE_ITEM = `
	update items
	set date = ?, symptoms = ?, location = ?, thoughts = ?
	where id = ?;
`;
