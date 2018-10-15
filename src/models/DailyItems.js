class DailyItems {
	count = 0;

	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.count = 1;
	}

	resetCounter() {
		this.count = 0;
	}

	incrementItems() {
		this.count++;
	}
}

export default DailyItems;
