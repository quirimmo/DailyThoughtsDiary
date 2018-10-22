import ViewItemsStack from './ViewItemsStack.navigator';

describe('ViewItemsStack Navigator', () => {
	it('should be defined', () => {
		expect(ViewItemsStack).toBeDefined();
	});

	it('should define the tabBarLabel', () => {
		expect(ViewItemsStack.navigationOptions.tabBarLabel).toEqual('View Items');
	});

	it('should define the tabBarIcon', () => {
		expect(ViewItemsStack.navigationOptions.tabBarIcon).toBeDefined();
		expect(ViewItemsStack.navigationOptions.tabBarIcon).toEqual(
			expect.any(Function)
		);
	});
});
