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
	let totalPerPerson = 0
	const willDisplayMultiple = props.calculationMethod !== METHOD_COMMUNIST
	let peopleDisplays: {
		hours: number
		person: Person
	}[] = []

	switch (props.calculationMethod) {
		case METHOD_COMMUNIST:
			totalPerPerson = props.totalTip / props.collectionHoursInfo.length
			break;
		case METHOD_HOUR_WEIGHTED:
			peopleDisplays = props.collectionHoursInfo.map(info => {
				return {
					hours: 0,
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
					<Text>{prettifyMoney(String(display.hours))}</Text>
				</View>)}
			</ScrollView>}
			{!willDisplayMultiple && <Text style={{}}>Total Per Person: {totalPerPerson}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {}
})

export { TipBreakdown }
