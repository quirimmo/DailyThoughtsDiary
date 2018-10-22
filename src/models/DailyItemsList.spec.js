import DailyItemsList from './DailyItemsList';
import DailyItems from './DailyItems';

const dailyItem1 = new DailyItems('key1', '2018-10-28T14:55:46.723Z');
const dailyItem2 = new DailyItems('key2', '2018-11-28T14:55:46.723Z');
const newItem = new DailyItems('key3', '2018-10-28T15:00:46.723Z');
let instance;

describe('DailyItemsList', () => {
	beforeEach(() => {
		instance = new DailyItemsList();
		instance.push(dailyItem1);
		instance.push(dailyItem2);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(DailyItemsList).toBeDefined();
	});

	it('should be an instance of the class', () => {
		expect(instance instanceof Array).toBeTruthy();
	});

	describe('resetCounter', () => {
		it('should call the resetCounter method of each item', () => {
			instance.forEach(item => jest.spyOn(item, 'resetCounter'));
			instance.resetCounters();
			instance.forEach(item => expect(item.resetCounter).toHaveBeenCalled());
		});

		it('should return the instnace', () => {
			expect(instance.resetCounters()).toEqual(instance);
		});
	});

	describe('addOrIncrementItem', () => {
		it('should call the containsDate method', () => {
			const spy = jest.spyOn(instance, 'containsDate');
			instance.addOrIncrementItem(newItem);
			expect(spy).toHaveBeenCalled();
		});

		it('should push the item in the list', () => {
			jest.spyOn(instance, 'containsDate').mockImplementation(() => false);
			instance.addOrIncrementItem(newItem);
			expect(instance).toHaveLength(3);
		});

		it('should call the incrementItems method on the item of the list', () => {
			jest.spyOn(instance, 'containsDate').mockImplementation(() => true);
			jest
				.spyOn(instance, 'getDailyItemsByDayDate')
				.mockImplementation(() => dailyItem1);
			const spy = jest.spyOn(dailyItem1, 'incrementItems');
			instance.addOrIncrementItem(newItem);
			expect(spy).toHaveBeenCalled();
		});

		it('should return the instnace', () => {
			expect(instance.resetCounters()).toEqual(instance);
		});
	});

	describe('containsDate', () => {
		it('should return true', () => {
			jest
				.spyOn(instance, 'getDailyItemsByDayDate')
				.mockImplementation(() => newItem);
			expect(instance.containsDate(newItem.value)).toBeTruthy();
		});

		it('should return false', () => {
			jest
				.spyOn(instance, 'getDailyItemsByDayDate')
				.mockImplementation(() => undefined);
			expect(instance.containsDate(newItem.value)).toBeFalsy();
		});
	});

	describe('getDailyItemsByDayDate', () => {
		it('should return the item with the same day', () => {
			expect(instance.getDailyItemsByDayDate(newItem.value)).toEqual(
				dailyItem1
			);
		});

		it('should not return any item', () => {
			expect(
				instance.getDailyItemsByDayDate('2017-10-28T22:00:46.723Z')
			).toBeUndefined();
		});

		it('should not return any item', () => {
			expect(
				instance.getDailyItemsByDayDate('2018-09-28T15:00:46.723Z')
			).toBeUndefined();
		});

		it('should not return any item', () => {
			expect(
				instance.getDailyItemsByDayDate('2018-10-20T15:00:46.723Z')
			).toBeUndefined();
		});
	});
});
