import React, { FC, useState, useEffect } from 'react'
import {
	Alert,
	Button,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Platform
} from 'react-native'

import { MSG_POSITIONS_SAVED } from '../constants/Strings'
import { Position } from '../models/Position'
import { retrievePositionsData, persistPositionsData } from '../services/PositionsService'

const PositionsScreen: FC<any> = (props) => {
	const [positions, setPositions] = useState<Position[]>([])
	const [newPositionTitle, setNewPositionTitle] = useState('')
	const [newPositionPoints, setNewPositionPoints] = useState(1)
	const [isAddExpanded, setIsAddExpanded] = useState(false)

	useEffect(() => {
		retrievePositionsData().then(loadedPositions => { setPositions(loadedPositions) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>Positions</Text>
			<View style={styles.positionsDisplay}>
				{positions.length < 1 && <Text style={styles.centeredText}>There are no positions currently</Text>}
				<FlatList
					data={positions}
					keyExtractor={(item: Position, index: number) => String(index)}
					renderItem={({ item }) => <Text>{item.title} - {item.points} pt{item.points > 1 ? 's' : ''}</Text>}
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
									'Positions Saved',
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
											text: 'OK'
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
					title="Save Positions" />
			</View>
			<View style={styles.newPositionContainer}>
				<TouchableOpacity
					onPress={() => setIsAddExpanded(staleExpanded => !staleExpanded)}
					style={styles.buttonNewPositionExpander}>
					<Text>{isAddExpanded ? '-' : '+'} Add New Position</Text>
				</TouchableOpacity>
				{isAddExpanded && <View>
					<View style={styles.newPositionInputContainer}>
						<TextInput
							onChangeText={text => setNewPositionTitle(text)}
							placeholder="New position title"
							style={styles.inputNewPositionName}
							value={newPositionTitle} />
						<TextInput
							onChangeText={text => setNewPositionPoints(parseInt(text, 10))}
							placeholder="New position points"
							style={styles.inputNewPositionPoints}
							value={String(newPositionPoints)} />
					</View>
					<Button
						onPress={() => {
							setPositions(stalePositions =>
								stalePositions.concat(new Position(newPositionTitle, newPositionPoints)))
							setNewPositionTitle('')
							setNewPositionPoints(1)
						}}
						title="Add Position" />
				</View>}
			</View>
		</ScrollView>
	)
}

(PositionsScreen as any).navigationOptions = {
	title: 'Positions'
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
