import DailyItemsList from './DailyItemsList';
import DailyItems from './DailyItems';

const dailyItem1 = new DailyItems('key1', 'value1');
const dailyItem2 = new DailyItems('key2', 'value2');
const instance = new DailyItemsList();
instance.push(dailyItem1);
instance.push(dailyItem2);

describe('DailyItemsList', () => {
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
		it('should push the item in the list', () => {});
		it('should call the incrementItems method on the item of the list', () => {});
	});
	describe('containsDate', () => {
		it('should return true', () => {});
		it('should return false', () => {});
	});
	describe('getDailyItemsByDayDate', () => {
		it('should return the item with the same day', () => {});
		it('should not return any item', () => {});
	});
});
