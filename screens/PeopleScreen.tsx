import React, { FC, useState } from 'react'
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'

const PeopleScreen: FC<any> = (props) => {
	const [newPersonName, setNewPersonName] = useState('')
	const [people, setPeople] = useState([])

	return (
		<ScrollView style={styles.container}>
			<Text style={{
				fontSize: 16,
				textAlign: 'center'
			}}>People</Text>
			<TextInput
				onChangeText={text => setNewPersonName(text)}
				placeholder="New person name"
				// style={{ height: 40 }}
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
			{people.length < 1 && <Text style={{ textAlign: 'center' }}>There are no people currently</Text>}
			{people.map(person => {
				return <Text>{person}</Text>
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
