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

interface ITipDisplayProps {
	earnedTip: string
	hours: number
	percentageOfHours: string
	person: Person
}

const TipBreakdown: FC<ITipBreakdownProps> = ({ calculationMethod, collectionHoursInfo, totalTip }) => {
	const willDisplayMultiple = calculationMethod !== METHOD_COMMUNIST
	let peopleDisplays: ITipDisplayProps[] = []
	let totalPerPerson = 0

	switch (calculationMethod) {
		case METHOD_COMMUNIST:
			totalPerPerson = totalTip / collectionHoursInfo.length
			break
		case METHOD_HOUR_WEIGHTED:
		case METHOD_ROLE_CENTRIC:
			const usePointModifier = calculationMethod === METHOD_ROLE_CENTRIC
			const totalRoleHours = collectionHoursInfo.reduce((accumulator, { hours, person }) =>
				accumulator + (parseFloat(hours) * (usePointModifier ? person.position.points : 1)), 0)

			peopleDisplays = collectionHoursInfo.map(({ hours, person }) => {
				const numHours = parseFloat(hours)
				const shareOfTotal = (numHours * (usePointModifier ? person.position.points : 1)) / totalRoleHours

				return {
					earnedTip: prettifyMoney(String(shareOfTotal * totalTip)),
					hours: numHours,
					percentageOfHours: `${(shareOfTotal * 100).toFixed(2)}%`,
					person
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
						text={`${display.person.name} - ${display.hours} hours ( ${display.percentageOfHours} ) = ${display.earnedTip}`} />
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
