import colorsStyles from './colors.styles';

describe('colorsStyles', () => {
	it('should contain the baseBackground color', () => {
		expect(colorsStyles).toMatchObject({
			baseBackground: '#fff'
		});
	});

	it('should contain the tabIconDefault color', () => {
		expect(colorsStyles).toMatchObject({
			tabIconDefault: '#ccc'
		});
	});

	it('should contain the tabIconSelected color', () => {
		expect(colorsStyles).toMatchObject({
			tabIconSelected: '#2f95dc'
		});
	});
});
