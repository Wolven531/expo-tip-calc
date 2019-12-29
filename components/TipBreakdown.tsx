import React, { FC } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

// constants
import {
	HEADER_BREAKDOWN
} from '../constants/Strings'

import { Person } from '../models/Person'

const TipBreakdown: FC<any> = (props) => {

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>{HEADER_BREAKDOWN}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	}
})

export { TipBreakdown }
