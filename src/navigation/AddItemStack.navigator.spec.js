import AddItemStack from './AddItemStack.navigator';

describe('AddItemStack Navigator', () => {
	it('should be defined', () => {
		expect(AddItemStack).toBeDefined();
	});

	it('should define the tabBarLabel', () => {
		expect(AddItemStack.navigationOptions.tabBarLabel).toEqual('Add Item');
	});

	it('should define the tabBarIcon', () => {
		expect(AddItemStack.navigationOptions.tabBarIcon).toBeDefined();
		expect(AddItemStack.navigationOptions.tabBarIcon).toEqual(
			expect.any(Function)
		);
	});
});
