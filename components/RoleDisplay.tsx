import React, { FC, useEffect, useState } from 'react'
import {
// 	Alert,
// 	Button,
// 	FlatList,
// 	Platform,
// 	ScrollView,
// 	StyleSheet,
	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View
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
		<Text>{props.role.title} - {getPluralizedPoints(props.role.points)}</Text>
	)
}

export { RoleDisplay }
