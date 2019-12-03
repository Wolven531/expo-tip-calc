import React, { FC } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

import { Position } from '../models/Position'
import { getPluralizedPoints } from '../services/utils'

import { DeleteButton } from './DeleteButton'

export interface IRoleDisplayProps {
	onDelete: (role: Position) => void
	role: Position
}

const RoleDisplay: FC<IRoleDisplayProps> = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.fontTitle}>
				{props.role.title}
				<Text style={styles.fontSpacer}> - </Text>
				<Text style={styles.fontValue}>{getPluralizedPoints(props.role.points)}</Text>
			</Text>
			<DeleteButton onDelete={() => { props.onDelete(props.role) }} />
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

export { RoleDisplay }
