import React from 'react'
import { Platform } from 'react-native'
import {
	createBottomTabNavigator,
	createStackNavigator,
	StackNavigatorConfig
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import { CalculationsScreen } from '../screens/CalculationsScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { PeopleScreen } from '../screens/PeopleScreen'
import { PositionsScreen } from '../screens/PositionsScreen'

const config: StackNavigatorConfig = Platform.select({
	// android: { headerMode: 'screen' },
	// default: { headerMode: 'screen' },
	default: {},
	web: { headerMode: 'screen' },
})

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
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
	)
}

const PeopleStack = createStackNavigator(
	{
		People: PeopleScreen
	},
	config
);

(PeopleStack as any).path = ''

PeopleStack.navigationOptions = {
	tabBarLabel: 'People',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
	)
}

const PositionsStack = createStackNavigator(
	{
		Positions: PositionsScreen
	},
	config
);

(PositionsStack as any).path = ''
PositionsStack.navigationOptions = {
	tabBarLabel: 'Positions',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	)
}

const CalculationsStack = createStackNavigator(
	{
		Calculations: CalculationsScreen
	},
	config
);

(CalculationsStack as any).path = ''
CalculationsStack.navigationOptions = {
	tabBarLabel: 'Calculations',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	)
}

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	PeopleStack,
	PositionsStack,
	CalculationsStack
});

(tabNavigator as any).path = ''

export default tabNavigator
