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
import { IHoursInfo } from '../constants/Types'

// models
// import { Person } from '../models/Person'

// components
import { HeaderLabel } from './HeaderLabel'

interface ITipBreakdownProps {
	calculationMethod: string // 'Communist' | 'Hour Weighted' | 'Role-centric'
	people: IHoursInfo[]
	totalTip: number
}

const TipBreakdown: FC<ITipBreakdownProps> = (props) => {
	let totalPerPerson = 0
	const willDisplayMultiple = props.calculationMethod !== METHOD_COMMUNIST
	let peopleDisplays = []

	switch (props.calculationMethod) {
		case METHOD_COMMUNIST:
			totalPerPerson = props.totalTip / props.people.length
			break;
		case METHOD_HOUR_WEIGHTED:
			peopleDisplays = props.people.map(person => {
				return {
					hours: 0,
					person
				}
			})
			break;
		case METHOD_ROLE_CENTRIC:

			break;
	}

	return (
		<View style={styles.container}>
			<HeaderLabel text={HEADER_BREAKDOWN} />
			{willDisplayMultiple && <View>

			</View>}
			{!willDisplayMultiple && <Text style={{}}>Total Per Person: {totalPerPerson}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {}
})

export { TipBreakdown }
