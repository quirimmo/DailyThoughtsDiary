import globalStyles from './global.styles';
import colorsStyles from './colors.styles';

describe('globalStyles', () => {
	it('should contain the mainContainer styles', () => {
		expect(globalStyles).toMatchObject({
			mainContainer: {
				flex: 1,
				backgroundColor: colorsStyles.baseBackground
			}
		});
	});

	it('should contain the screenContainer styles', () => {
		expect(globalStyles).toMatchObject({
			screenContainer: {
				flex: 1,
				backgroundColor: colorsStyles.baseBackground,
				padding: 10
			}
		});
	});

	it('should contain the label styles', () => {
		expect(globalStyles).toMatchObject({
			label: {
				fontSize: 18
			}
		});
	});

	it('should contain the textInput styles', () => {
		expect(globalStyles).toMatchObject({
			textInput: {
				height: 50,
				fontSize: 16
			}
		});
	});

	it('should contain the rowContainer styles', () => {
		expect(globalStyles).toMatchObject({
			rowContainer: {
				flexDirection: 'row'
			}
		});
	});

	it('should contain the standardDivider styles', () => {
		expect(globalStyles).toMatchObject({
			standardDivider: {
				marginVertical: 20
			}
		});
	});

	it('should contain the flatListItemContentContainer styles', () => {
		expect(globalStyles).toMatchObject({
			flatListItemContentContainer: {
				paddingBottom: 30
			}
		});
	});

	it('should contain the fullFlatList styles', () => {
		expect(globalStyles).toMatchObject({
			fullFlatList: {
				flex: 1
			}
		});
	});
});
