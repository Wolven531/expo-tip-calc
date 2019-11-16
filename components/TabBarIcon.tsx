import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export default function TabBarIcon(props) {
	return (
		<Ionicons
			color={props.focused
				? Colors.tabIconSelected
				: Colors.tabIconDefault}
			name={props.name}
			size={26}
			// style={{ marginBottom: -3 }}
		/>
	)
}
