import React, { FC } from 'react'
import {
	ScrollView,
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
import { Person } from '../models/Person'

// services
import { prettifyMoney } from '../services/utils'

// components
import { HeaderLabel } from './HeaderLabel'

interface ITipBreakdownProps {
	calculationMethod: string // 'Communist' | 'Hour Weighted' | 'Role-centric'
	collectionHoursInfo: IHoursInfo[]
	totalTip: number
}

const TipBreakdown: FC<ITipBreakdownProps> = (props) => {
	const willDisplayMultiple = props.calculationMethod !== METHOD_COMMUNIST
	let peopleDisplays: {
		earnedTip: number
		person: Person
	}[] = []
	let totalPerPerson = 0

	switch (props.calculationMethod) {
		case METHOD_COMMUNIST:
			totalPerPerson = props.totalTip / props.collectionHoursInfo.length
			break;
		case METHOD_HOUR_WEIGHTED:
			const totalHours = props.collectionHoursInfo.reduce((accumulator, { hours }) => accumulator + parseFloat(hours), 0)

			peopleDisplays = props.collectionHoursInfo.map(info => {
				const shareOfTotal = parseFloat(info.hours) / totalHours
				return {
					earnedTip: shareOfTotal * props.totalTip,
					person: info.person
				}
			})
			break;
		case METHOD_ROLE_CENTRIC:

			break;
	}

	return (
		<View style={styles.container}>
			<HeaderLabel text={HEADER_BREAKDOWN} />
			{willDisplayMultiple && <ScrollView>
				{peopleDisplays.map(display => <View>
					<Text>{display.person.name}</Text>
					<Text>{prettifyMoney(String(display.earnedTip))}</Text>
				</View>)}
			</ScrollView>}
			{!willDisplayMultiple && <View style={styles.padded}>
				<HeaderLabel text={`Total Per Person: ${prettifyMoney(String(totalPerPerson))}`} />
			</View>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	padded: {
		padding: 15
	}
})

export { TipBreakdown }
