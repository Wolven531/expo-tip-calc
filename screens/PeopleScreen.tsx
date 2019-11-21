import React, { FC } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'
// import { ExpoLinksView } from '@expo/samples'

const PeopleScreen: FC<any> = (props) => {
// export default function PeopleScreen() {
	return (
		<ScrollView style={styles.container}>
			{/* <ExpoLinksView /> */}
			<Text style={{
				fontSize: 16,
				textAlign: 'center'
			}}>People</Text>
		</ScrollView>
	)
};

(PeopleScreen as any).navigationOptions = {
	title: 'People'
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		paddingTop: 15
	}
})

export { PeopleScreen }
