import Item from './Item';

let instance;

describe('Item Model', () => {
	beforeEach(() => {
		instance = new Item(
			'2017-10-28T22:00:46.723Z',
			'symptoms',
			'location',
			'thoughts'
		);
	});

	it('should be defined', () => {
		expect(Item).toBeDefined();
	});

	it('should be an instance of the class', () => {
		expect(instance instanceof Item).toBeTruthy();
	});

	describe('constructor', () => {
		it('should init the parameters', () => {
			expect(instance.date).toEqual('2017-10-28T22:00:46.723Z');
			expect(instance.symptoms).toEqual('symptoms');
			expect(instance.location).toEqual('location');
			expect(instance.thoughts).toEqual('thoughts');
		});
	});
});
