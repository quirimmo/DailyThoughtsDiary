import itemTimeStyles from './item-time.styles';

describe('itemTimeStyles', () => {
	it('should contain the currentTimeContainer color', () => {
		expect(itemTimeStyles).toMatchObject({
			currentTimeContainer: {
				flexDirection: 'row',
				alignItems: 'center',
				flex: 0.5
			}
		});
	});

	it('should contain the currentTimeText color', () => {
		expect(itemTimeStyles).toMatchObject({
			currentTimeText: {
				fontSize: 16
			}
		});
	});

	it('should contain the changeTimeButtonContainer color', () => {
		expect(itemTimeStyles).toMatchObject({
			changeTimeButtonContainer: {
				flex: 0.5
			}
		});
	});
});
