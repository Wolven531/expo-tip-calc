import React from 'react'
import { Platform } from 'react-native'
import {
	createStackNavigator,
	createBottomTabNavigator,
	StackNavigatorConfig
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config: StackNavigatorConfig = Platform.select({
	android: { headerMode: 'screen' },
	default: { headerMode: 'screen' },
	web: { headerMode: 'screen' }
})

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	config
);

(HomeStack as any).path = ''
HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	),
}

const LinksStack = createStackNavigator(
	{
		Links: LinksScreen,
	},
	config
);

(LinksStack as any).path = ''
LinksStack.navigationOptions = {
	tabBarLabel: 'Links',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
	),
}

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	config
);

(SettingsStack as any).path = ''
SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	),
}

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	LinksStack,
	SettingsStack,
});

(tabNavigator as any).path = ''

export default tabNavigator
