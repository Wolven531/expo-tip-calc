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
	LBL_TOTAL_PER_PERSON,
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
		hours: number
		percentageOfHours: number
		person: Person
	}[] = []
	let totalPerPerson = 0

	switch (props.calculationMethod) {
		case METHOD_COMMUNIST:
			totalPerPerson = props.totalTip / props.collectionHoursInfo.length
			break
		case METHOD_HOUR_WEIGHTED:
		case METHOD_ROLE_CENTRIC:
			const usePointModifier = props.calculationMethod === METHOD_ROLE_CENTRIC
			const totalRoleHours = props.collectionHoursInfo.reduce((accumulator, { hours, person }) =>
				accumulator + (parseFloat(hours) * (usePointModifier ? person.position.points : 1)), 0)

			peopleDisplays = props.collectionHoursInfo.map(info => {
				const numHours = parseFloat(info.hours)
				const shareOfTotal = (numHours * (usePointModifier ? info.person.position.points : 1)) / totalRoleHours

				return {
					earnedTip: shareOfTotal * props.totalTip,
					hours: numHours,
					percentageOfHours: shareOfTotal * 100,
					person: info.person
				}
			})
			break
	}

	return (
		<View style={styles.container}>
			<HeaderLabel text={HEADER_BREAKDOWN} />
			{willDisplayMultiple && <ScrollView>
				{peopleDisplays.map(display => <View style={styles.padded}>
					<HeaderLabel
						text={`${display.person.name} - ${display.hours} hours ( ${display.percentageOfHours.toFixed(2)}% ) = ${prettifyMoney(String(display.earnedTip))}`} />
				</View>)}
			</ScrollView>}
			{!willDisplayMultiple && <View style={styles.padded}>
				<HeaderLabel text={`${LBL_TOTAL_PER_PERSON}: ${prettifyMoney(String(totalPerPerson))}`} />
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
