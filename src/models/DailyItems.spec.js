import DailyItems from './DailyItems';

const instance = new DailyItems('key', 'value');

describe('DailyItems', () => {
	it('should be defined', () => {
		expect(DailyItems).toBeDefined();
	});

	describe('constructor', () => {
		it('should be an instance of the class', () => {
			expect(instance instanceof DailyItems).toBeTruthy();
		});

		it('should init the properties', () => {
			expect(instance.key).toEqual('key');
			expect(instance.value).toEqual('value');
			expect(instance.count).toEqual(1);
		});
	});

	describe('resetCounter', () => {
		it('should reset the counter', () => {
			instance.resetCounter();
			expect(instance.count).toEqual(0);
		});
	});
});
