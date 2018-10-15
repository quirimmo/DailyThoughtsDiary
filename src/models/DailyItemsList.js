import moment from 'moment';
import DailyItems from './DailyItems';

class DailyItemsList extends Array {
	resetCounters = () => {
		this.forEach(dailyItem => dailyItem.resetCounter());
		return this;
	};

	addOrIncrementItem = item => {
		if (!this.containsDate(item.date)) {
			const dailyItems = new DailyItems(this.length.toString(), item.date);
			this.push(dailyItems);
		} else {
			this.getDailyItemsByDayDate(item.date).incrementItems();
		}
		return this;
	};

	containsDate = date => !!this.getDailyItemsByDayDate(date);

	getDailyItemsByDayDate = date =>
		this.find(el => moment(date).isSame(el.value, 'day'));
}

export default DailyItemsList;
