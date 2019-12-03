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
// 	TouchableOpacity,
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderColor: '#333',
		borderRadius: 10,
		borderWidth: 1,
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
