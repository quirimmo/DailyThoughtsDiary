import items from './items.reducer';
import {
	ADD_ITEM,
	DELETE_ITEM,
	FETCH_ITEMS,
	UPDATE_ITEM
} from '../actions/items.action';

const item1 = { id: 1, name: 'item1' };
const updatedItem1 = { id: 1, name: 'updatedItem1' };

describe('items reducer', () => {
	it('should be defined', () => {
		expect(items).toBeDefined();
	});

	it('should add an item', () => {
		const state = items([], { type: ADD_ITEM, item: item1 });
		expect(state).toEqual([item1]);
	});

	it('should delete an item', () => {
		const state = items([item1], { type: DELETE_ITEM, item: item1 });
		expect(state).toEqual([]);
	});

	it('should fetch the items', () => {
		const state = items([], { type: FETCH_ITEMS, items: [item1] });
		expect(state).toEqual([item1]);
	});

	it('should update the item', () => {
		const state = items([item1], { type: UPDATE_ITEM, item: updatedItem1 });
		expect(state).toEqual([updatedItem1]);
	});
});
