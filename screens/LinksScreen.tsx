import React from 'react'
import {
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'
// import { ExpoLinksView } from '@expo/samples'

export default function LinksScreen() {
	return (
		<ScrollView style={styles.container}>
			{/* <ExpoLinksView /> */}
			<Text style={{
				fontSize: 16,
				textAlign: 'center'
			}}>People</Text>
		</ScrollView>
	)
}

LinksScreen.navigationOptions = {
	title: 'People',
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff',
	},
})
