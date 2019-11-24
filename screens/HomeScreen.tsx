import React from 'react'
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native'

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.tabBarInfoContainer}>
				<Text>Hello</Text>
			</View>
		</View>
	)
}

HomeScreen.navigationOptions = {
	header: null
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	tabBarInfoContainer: {
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		bottom: 0,
		left: 0,
		paddingVertical: 20,
		position: 'absolute',
		right: 0,
		...Platform.select({
			android: {
				elevation: 20,
			},
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			}
		})
	}
})
