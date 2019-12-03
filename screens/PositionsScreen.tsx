import React, { FC, useEffect, useState } from 'react'
import {
	Alert,
	Button,
	FlatList,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'

import {
	LBL_ADD_NEW_POSITION,
	MSG_OK,
	MSG_POSITIONS_EMPTY,
	MSG_POSITIONS_SAVED,
	PLACEHOLDER_NEW_POSITION_POINTS,
	PLACEHOLDER_NEW_POSITION_TITLE,
	TITLE_ADD_POSITION,
	TITLE_POSITIONS,
	TITLE_POSITIONS_SAVED,
	TITLE_SAVE_POSITIONS
} from '../constants/Strings'
import { Position } from '../models/Position'
import {
	persistPositionsData,
	retrievePositionsData
} from '../services/PositionsService'

import { RoleDisplay } from '../components/RoleDisplay'

const PositionsScreen: FC<any> = (props) => {
	const DEFAULT_POINTS = '1'
	const DEFAULT_TITLE = ''
	const [positions, setPositions] = useState<Position[]>([])
	const [newPositionTitle, setNewPositionTitle] = useState(DEFAULT_TITLE)
	const [newPositionPoints, setNewPositionPoints] = useState(DEFAULT_POINTS)
	const [isAddExpanded, setIsAddExpanded] = useState(false)

	useEffect(() => {
		retrievePositionsData().then(loadedPositions => { setPositions(loadedPositions) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>{TITLE_POSITIONS}</Text>
			<View style={styles.positionsDisplay}>
				{positions.length < 1 && <Text style={styles.centeredText}>{MSG_POSITIONS_EMPTY}</Text>}
				<FlatList
					data={positions}
					keyExtractor={(item: Position, index: number) => String(index)}
					renderItem={({ item }) =>
						<RoleDisplay
							onDelete={(role: Position) => {
								setPositions(staleRoles =>
									staleRoles.filter(staleRole => // TODO: change this comparison to ID based
										staleRole.points !== role.points || staleRole.title !== role.title
									)
								)
							}}
							role={item} />}
					style={styles.positionsList}
					/>
				<Button
					color="#3a3"
					onPress={() => {
						persistPositionsData(positions)
						Platform.select({
							// android: () => {},
							// ios: () => {}
							default: () => {
								Alert.alert(
									TITLE_POSITIONS_SAVED,
									MSG_POSITIONS_SAVED,
									[
										// { text: 'Ask me later', onPress: () => { } },
										// {
										// 	text: 'Cancel',
										// 	onPress: () => { },
										// 	style: 'cancel',
										// },
										{
											onPress: () => { },
											text: MSG_OK
										}
									],
									{ cancelable: false }
								)
							},
							web: () => {
								alert(MSG_POSITIONS_SAVED)
							}
						})()
					}}
					title={TITLE_SAVE_POSITIONS} />
			</View>
			<View style={styles.newPositionContainer}>
				<TouchableOpacity
					onPress={() => setIsAddExpanded(staleExpanded => !staleExpanded)}
					style={styles.buttonNewPositionExpander}>
					<Text>{isAddExpanded ? '-' : '+'} {LBL_ADD_NEW_POSITION}</Text>
				</TouchableOpacity>
				{isAddExpanded && <View>
					<View style={styles.newPositionInputContainer}>
						<TextInput
							onChangeText={text => setNewPositionTitle(text)}
							placeholder={PLACEHOLDER_NEW_POSITION_TITLE}
							style={styles.inputNewPositionName}
							value={newPositionTitle} />
						<TextInput
							onChangeText={text => setNewPositionPoints(text)}
							placeholder={PLACEHOLDER_NEW_POSITION_POINTS}
							style={styles.inputNewPositionPoints}
							value={newPositionPoints} />
					</View>
					<Button
						onPress={() => {
							setPositions(stalePositions =>
								stalePositions.concat(new Position(newPositionTitle, parseInt(newPositionPoints, 10))))
							setNewPositionTitle(DEFAULT_TITLE)
							setNewPositionPoints(DEFAULT_POINTS)
						}}
						title={TITLE_ADD_POSITION} />
				</View>}
			</View>
		</ScrollView>
	)
}

(PositionsScreen as any).navigationOptions = {
	title: TITLE_POSITIONS
}

const styles = StyleSheet.create({
	buttonNewPositionExpander: { },
	centeredText: {
		textAlign: 'center'
	},
	container: {
		backgroundColor: '#fff',
		flex: 1,
		padding: 15
	},
	header: {
		fontSize: 16,
		textAlign: 'center'
	},
	inputNewPositionName: {
		borderColor: '#333',
		borderWidth: 1,
		height: 35,
		marginTop: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '80%'
	},
	inputNewPositionPoints: {
		borderColor: '#333',
		borderWidth: 1,
		height: 35,
		marginTop: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '18%'
	},
	newPositionContainer: {
		borderColor: '#333',
		borderWidth: 1,
		padding: 10
	},
	newPositionInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		width: '100%'
	},
	positionsDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	},
	positionsList: {
		marginBottom: 10
	}
})

export { PositionsScreen }
