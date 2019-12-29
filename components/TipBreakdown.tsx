import React, { FC } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

// constants
import {
	HEADER_BREAKDOWN,
	METHOD_COMMUNIST,
	METHOD_HOUR_WEIGHTED,
	METHOD_ROLE_CENTRIC
} from '../constants/Strings'

// models
import { Person } from '../models/Person'

// components
import { HeaderLabel } from './HeaderLabel'

interface ITipBreakdownProps {
	calculationMethod: string // 'Communist' | 'Hour Weighted' | 'Role-centric'
	people: Person[]
	totalTip: number
}

const TipBreakdown: FC<ITipBreakdownProps> = (props) => {
	let totalPerPerson = 0

	switch (props.calculationMethod) {
		case METHOD_COMMUNIST:
			totalPerPerson = props.totalTip / props.people.length
			break;
		case METHOD_HOUR_WEIGHTED:

			break;
		case METHOD_ROLE_CENTRIC:

			break;
	}

	return (
		<View style={styles.container}>
			<HeaderLabel text={HEADER_BREAKDOWN} />
			<Text style={{}}>Total Per Person: {totalPerPerson}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {}
})

export { TipBreakdown }
