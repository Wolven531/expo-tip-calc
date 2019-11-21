import React from 'react'
import {
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'
// import { ExpoLinksView } from '@expo/samples'

export default function PeopleScreen() {
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

PeopleScreen.navigationOptions = {
	title: 'People',
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff',
	},
})
