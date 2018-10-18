import viewItemsStyles from './view-items.styles';

describe('viewItemsStyles', () => {
	it('should contain the printPDFButton color', () => {
		expect(viewItemsStyles).toMatchObject({
			printPDFButton: {
				marginBottom: 20
			}
		});
	});
});
