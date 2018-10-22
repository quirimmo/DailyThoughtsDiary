import Layout from './Layout';

describe('Layout Constants', () => {
	it('should define the window property', () => {
		expect(Layout.window).toBeDefined();
	});

	it('should define the isSmallDevice property', () => {
		expect(Layout.isSmallDevice).toBeDefined();
	});
});
