import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

interface ITabBarIconProps {
	focused: boolean
	name: string
}

export default function TabBarIcon(props: ITabBarIconProps) {
	const ICON_SIZE = 26

	return (
		<Ionicons
			color={props.focused
				? Colors.tabIconSelected
				: Colors.tabIconDefault}
			name={props.name}
			size={ICON_SIZE}
			// style={{ marginBottom: -3 }}
		/>
	)
}
