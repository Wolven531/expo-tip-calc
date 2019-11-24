import React, { FC, useState } from 'react'
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'

const PeopleScreen: FC<any> = (props) => {
	const [newPersonName, setNewPersonName] = useState('')
	const [people, setPeople] = useState([])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>People</Text>
			<TextInput
				onChangeText={text => setNewPersonName(text)}
				placeholder="New person name"
				style={styles.inputNewPersonName}
				value={newPersonName} />
			<Button
				onPress={() => {
					if (newPersonName.length < 1) {
						return
					}
					setPeople(stalePeople => stalePeople.concat(newPersonName))
					setNewPersonName('')
				}}
				title="Add Person">Add Person</Button>
			<View style={styles.peopleDisplay}>
				{people.length < 1 && <Text style={{ textAlign: 'center' }}>There are no people currently</Text>}
				{people.map(person => {
					return <Text>{person}</Text>
				})}
			</View>
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
		padding: 15
	},
	header: {
		fontSize: 16,
		textAlign: 'center'
	},
	inputNewPersonName: {
		border: 1,
		marginBottom: 10,
		paddingHorizontal: 5,
		paddingVertical: 2
	},
	peopleDisplay: {
		margin: 10,
		padding: 10
	}
})

export { PeopleScreen }
