const mockPrintAsync = jest.fn();
jest.mock('expo', () => ({
	Print: {
		printAsync: content => {
			mockPrintAsync(content);
		}
	}
}));
import PDFPrinter from './PDFPrinter';

const days = [
	{ value: '2018-10-28T15:53:00', count: 2 },
	{ value: '2018-10-29T19:13:00', count: 5 }
];

const items = [
	{
		symptoms: 'symptoms 1',
		location: 'location 1',
		thoughts: 'thoughts 1',
		value: '2018-10-28T15:53:00'
	},
	{
		symptoms: 'symptoms 2',
		location: 'location 2',
		thoughts: 'thoughts 2',
		value: '2018-10-28T19:13:00'
	}
];

describe('PDFPrinter', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('print', () => {
		it('should call the printAsync method of Print', () => {
			PDFPrinter.print('html content');
			expect(mockPrintAsync).toHaveBeenCalledWith({ html: 'html content' });
		});
	});

	describe('printDays', () => {
		it('should call the print method with the days content', () => {
			const spy = jest.spyOn(PDFPrinter, 'print');
			PDFPrinter.printDays(days);
			const trimmedArg = spy.mock.calls[0][0].replace(/\s/g, '');
			const trimmedExpected = `
				<div>
					<h1>All Days</h1>
					<div>
						<p>Sunday 28-10-2018: 2 items</p>
					</div>
					<div>
						<p>Monday 29-10-2018: 5 items</p>
					</div>
				</div>
			`.replace(/\s/g, '');
			expect(spy).toHaveBeenCalled();
			expect(trimmedArg).toEqual(trimmedExpected);
		});
	});

	describe('printItems', () => {
		it('should call the print method with the items content', () => {
			const spy = jest.spyOn(PDFPrinter, 'print');
			PDFPrinter.printItems(items);
			const trimmedArg = spy.mock.calls[0][0].replace(/\s/g, '');
			const trimmedExpected = `
				<div>
					<h1>All Items</h1>
					<div>
						<p>symptoms 1</p>
						<p>location 1</p>
						<p>thoughts 1</p>
						<p>Sunday 28-10-2018 15:53</p>
						<br/>
					</div>
					<div>
						<p>symptoms 2</p>
						<p>location 2</p>
						<p>thoughts 2</p>
						<p>Sunday 28-10-2018 19:13</p>
						<br/>
					</div>
				</div>
			`.replace(/\s/g, '');
			expect(spy).toHaveBeenCalled();
			expect(trimmedArg).toEqual(trimmedExpected);
		});
	});
});
