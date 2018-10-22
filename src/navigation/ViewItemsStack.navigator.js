import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LocalizedStrings from 'react-localization';
import TabBarIcon from '../components/TabBarIcon.component';
import ViewItemsContainer from '../containers/ViewItems.container';
import ViewDaysContainer from '../containers/ViewDays.container';
import UpdateItemContainer from '../containers/UpdateItem.container';

const strings = getComponentStrings();

const ViewItemsStack = createStackNavigator({
	ViewDays: ViewDaysContainer,
	ViewItems: ViewItemsContainer,
	UpdateItem: UpdateItemContainer
});

ViewItemsStack.navigationOptions = {
	tabBarLabel: strings.tabBarLabel,
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-link${focused ? '' : '-outline'}`
					: 'md-link'
			}
		/>
	)
};

function getComponentStrings() {
	return new LocalizedStrings({
		en: {
			tabBarLabel: 'View Items'
		},
		it: {
			tabBarLabel: 'Visualizza Elementi'
		}
	});
}

export default ViewItemsStack;
