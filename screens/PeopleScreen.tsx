import React, { FC, useState } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'
// import { ExpoLinksView } from '@expo/samples'

const PeopleScreen: FC<any> = (props) => {
	const [people, setPeople] = useState([])

	return (
		<ScrollView style={styles.container}>
			{/* <ExpoLinksView /> */}
			<Text style={{
				fontSize: 16,
				textAlign: 'center'
			}}>People</Text>
			{people.length < 1 && <Text style={{ textAlign: 'center' }}>There are no people currently</Text>}
			{people.map(person => {
				return null
			})}
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
