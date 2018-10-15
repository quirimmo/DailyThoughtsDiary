import {
	ADD_ITEM,
	FETCH_ITEMS,
	DELETE_ITEM,
	UPDATE_ITEM
} from '../actions/items.action';

const items = (state = [], action) => {
	switch (action.type) {
		case ADD_ITEM:
			return state.concat([action.item]);
		case UPDATE_ITEM: {
			return state.map(item => {
				if (item.id !== action.item.id) {
					return item;
				}
				return {
					...item,
					...action.item
				};
			});
		}
		case FETCH_ITEMS:
			return action.items;
		case DELETE_ITEM:
			return state.filter(item => item.id !== action.item.id);
		default:
			return state;
	}
};

export default items;
