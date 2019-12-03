import React, { FC, useEffect, useState } from 'react'
import {
// 	Alert,
// 	Button,
// 	FlatList,
// 	Platform,
// 	ScrollView,
	StyleSheet,
	Text,
// 	TextInput,
	TouchableOpacity,
	View
} from 'react-native'

// import {
// 	LBL_ADD_NEW_POSITION,
// 	MSG_OK,
// 	MSG_POSITIONS_EMPTY,
// 	MSG_POSITIONS_SAVED,
// 	PLACEHOLDER_NEW_POSITION_POINTS,
// 	PLACEHOLDER_NEW_POSITION_TITLE,
// 	TITLE_ADD_POSITION,
// 	TITLE_POSITIONS,
// 	TITLE_POSITIONS_SAVED,
// 	TITLE_SAVE_POSITIONS
// } from '../constants/Strings'
import { Position } from '../models/Position'
// import {
// 	persistPositionsData,
// 	retrievePositionsData
// } from '../services/PositionsService'
import { getPluralizedPoints } from '../services/utils'

export interface IRoleDisplayProps {
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
			<TouchableOpacity
				onPress={() => {

				}}
				style={styles.btnDelete}>
				<Text style={styles.btnDeleteLabel}>Delete</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	btnDelete: {
		backgroundColor: '#f33',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#333',
		shadowOffset: {
			height: 3,
			width: 2
		},
		shadowRadius: 2
	},
	btnDeleteLabel: {
		color: '#ff0',
		fontWeight: 'bold',
		textShadowColor: '#333',
		textShadowOffset: {
			height: 3,
			width: 2
		},
		textShadowRadius: 2
	},
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
