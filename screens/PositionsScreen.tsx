import React, { FC, useState, useEffect } from 'react'
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native'

import { retrievePositionsData } from '../services/PositionsService'

const PositionsScreen: FC<any> = (props) => {
	const [positions, setPositions] = useState<string[]>([])

	useEffect(() => {
		retrievePositionsData().then(loadedPositions => { setPositions(loadedPositions) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>Positions</Text>
			<View style={styles.positionsDisplay}>
				{positions.length < 1 && <Text style={{ textAlign: 'center' }}>There are no positions currently</Text>}
				<FlatList
					data={positions}
					keyExtractor={(item: string, index: number) => String(index)}
					renderItem={({ item }) => <Text>{item}</Text>}
					/>
			</View>
		</ScrollView>
	)
}

(PositionsScreen as any).navigationOptions = {
	title: 'Positions'
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		padding: 15
	},
	header: {
		fontSize: 16,
		textAlign: 'center'
	},
	positionsDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	}
})

export { PositionsScreen }
