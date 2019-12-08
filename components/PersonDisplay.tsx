import React, { FC } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

import { Person } from '../models/Person'
import { getPluralizedPoints } from '../services/utils'

import { DeleteButton } from './DeleteButton'

export interface IPersonDisplayProps {
	onDelete: (person: Person) => void
	person: Person
}

const PersonDisplay: FC<IPersonDisplayProps> = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.fontTitle}>
				{props.person.name}
				<Text style={styles.fontSpacer}> - </Text>
				<Text style={styles.fontValue}>{getPluralizedPoints(props.person.position.points)}</Text>
			</Text>
			<DeleteButton onDelete={() => { props.onDelete(props.person) }} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderColor: '#333',
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		padding: 10
	},
	fontSpacer: {
		fontWeight: 'normal'
	},
	fontTitle: {
		fontWeight: 'bold'
	},
	fontValue: {
		fontWeight: 'normal'
	}
})

export { PersonDisplay }
