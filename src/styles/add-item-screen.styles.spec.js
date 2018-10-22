import addItemScreenStyles from './add-item-screen.styles';

describe('addItemScreenStyles', () => {
	it('should contain the addItemRow styles', () => {
		expect(addItemScreenStyles).toMatchObject({
			addItemRow: {
				marginBottom: 10
			}
		});
	});

	it('should contain the submitRow styles', () => {
		expect(addItemScreenStyles).toMatchObject({
			submitRow: {
				marginTop: 30
			}
		});
	});
});
