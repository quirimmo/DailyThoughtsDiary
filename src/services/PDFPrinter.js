import moment from 'moment';
import { Print } from 'expo';

class PDFPrinter {
	static async print(htmlContent) {
		try {
			await Print.printAsync({
				html: htmlContent
			});
		} catch (error) {
			console.error('Error printing with expo', error);
		}
	}

	static printDays(days) {
		const htmlContent = `<div><h1>All Days</h1>${getAllDays()}</div>`;
		PDFPrinter.print(htmlContent);

		function getAllDays() {
			return days
				.map(
					el =>
						`
						<div>
							<p>${moment(el.value).format('dddd DD-MM-YYYY')}: ${el.count} items</p>
						</div>
						`
				)
				.join('');
		}
	}

	static printItems(items) {
		const htmlContent = `<div><h1>All Items</h1>${getAllItems()}</div>`;
		PDFPrinter.print(htmlContent);

		function getAllItems() {
			return items
				.map(
					el =>
						`
						<div>
							<p>${el.symptoms}</p>
							<p>${el.where}</p>
							<p>${el.thoughts}</p>
							<p>${moment(el.value).format('dddd DD-MM-YYYY HH:mm')}</p>
							<br/>
						</div>
						`
				)
				.join('');
		}
	}
}

export default PDFPrinter;
