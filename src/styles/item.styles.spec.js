import itemStyles from './item.styles';

describe('itemStyles', () => {
	it('should contain the currentTimeContainer color', () => {
		expect(itemStyles).toMatchObject({
			itemButtonsContainer: {
				flex: 0.5,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				marginVertical: 20
			}
		});
	});
});
