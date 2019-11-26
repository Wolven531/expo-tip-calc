import React,
	{
		FC,
		useEffect,
		useState
	} from 'react'
import {
	Button,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'

import {
	persistPeopleData,
	retrievePeopleData
} from '../services/PeopleService'

const PeopleScreen: FC<any> = (props) => {
	const [newPersonName, setNewPersonName] = useState('')
	const [people, setPeople] = useState<string[]>([])

	useEffect(() => {
		retrievePeopleData().then(loadedPeople => { setPeople(loadedPeople) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>People</Text>
			<View>
				<TextInput
					onChangeText={text => setNewPersonName(text)}
					placeholder="New person name"
					style={styles.inputNewPersonName}
					value={newPersonName} />
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.buttonCell}>
					<Button
						onPress={() => {
							if (newPersonName.length < 1) {
								return
							}
							setPeople(stalePeople => stalePeople.concat(newPersonName))
							setNewPersonName('')
						}}
						title="Add Person" />
				</View>
				<View style={styles.buttonCell}>
					<Button
						color="#3a3"
						onPress={() => { persistPeopleData(people) }}
						title="Save People" />
				</View>
			</View>
			<View style={styles.peopleDisplay}>
				{people.length < 1 && <Text style={{ textAlign: 'center' }}>There are no people currently</Text>}
				<FlatList
					data={people}
					keyExtractor={(item: string, index: number) => String(index)}
					renderItem={({ item }) => <Text>{item}</Text>}
					/>
			</View>
			{people.length > 0 && <Button
				color="#a33"
				onPress={() => { setPeople([]) }}
				title="Clear Current People" />}
		</ScrollView>
	)
};

(PeopleScreen as any).navigationOptions = {
	title: 'People'
}

const styles = StyleSheet.create({
	buttonCell: {
		width: '40%'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
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
	inputNewPersonName: {
		borderColor: '#333',
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 5,
		paddingVertical: 2
	},
	peopleDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	}
})

export { PeopleScreen }
