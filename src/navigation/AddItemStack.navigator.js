import React from 'react';
import { Platform } from 'react-native';
import LocalizedStrings from 'react-localization';
import { createStackNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon.component';
import AddItemContainer from '../containers/AddItem.container';

const strings = getComponentStrings();

const AddItemStack = createStackNavigator({
	AddItem: AddItemContainer
});

AddItemStack.navigationOptions = {
	tabBarLabel: strings.tabBarLabel,
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	)
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			tabBarLabel: 'Add Item'
		},
		it: {
			tabBarLabel: 'Aggiungi Elemento'
		}
	});
}

export default AddItemStack;
