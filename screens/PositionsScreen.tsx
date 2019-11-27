import React, { FC } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'

const PositionsScreen: FC<any> = (props) => {
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>Positions</Text>
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
	}
})

export { PositionsScreen }
