import { StyleSheet } from 'react-native';
import colorsStyles from './colors.styles';

export default StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colorsStyles.baseBackground
	},
	screenContainer: {
		flex: 1,
		backgroundColor: colorsStyles.baseBackground,
		padding: 10
	},
	label: {
		fontSize: 18
	},
	textInput: {
		height: 50,
		fontSize: 16
	},
	rowContainer: {
		flexDirection: 'row'
	},
	standardDivider: {
		marginVertical: 20
	},
	flatListItemContentContainer: {
		paddingBottom: 30
	},
	fullFlatList: {
		flex: 1
	}
});
