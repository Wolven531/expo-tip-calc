import React, { FC, useState, useEffect } from 'react'
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'

import { Position } from '../models/Position'
import { retrievePositionsData } from '../services/PositionsService'

const PositionsScreen: FC<any> = (props) => {
	const [positions, setPositions] = useState<Position[]>([])
	const [newPositionName, setNewPositionName] = useState('')
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
					renderItem={({ item }) => <Text>{item.title} - {item.points} pts</Text>}
					/>
			</View>
			<View style={styles.newPositionContainer}>
				<TouchableOpacity
					onPress={() => setIsAddExpanded(staleExpanded => !staleExpanded)}
					style={styles.buttonNewPositionExpander}>
					<Text>{isAddExpanded ? '-' : '+'} Add New Position</Text>
				</TouchableOpacity>
				{isAddExpanded && <View>
					<TextInput
						onChangeText={text => setNewPositionName(text)}
						placeholder="New position name"
						style={styles.inputNewPositionName}
						value={newPositionName} />
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
	newPositionContainer: {
		borderColor: '#333',
		borderWidth: 1,
		padding: 10
	},
	inputNewPositionName: {
		borderColor: '#333',
		borderWidth: 1,
		height: 35,
		marginTop: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '48%'
	},
	positionsDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	}
})

export { PositionsScreen }
