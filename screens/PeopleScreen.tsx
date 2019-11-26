import React, { FC, useState, useEffect } from 'react'
import {
	AsyncStorage,
	Button,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'

const PeopleScreen: FC<any> = (props) => {
	const [newPersonName, setNewPersonName] = useState('')
	const [people, setPeople] = useState<string[]>([])

	const persistPeopleData = async () => {
		try {
			await AsyncStorage.setItem('expoTipCalc.people', JSON.stringify(people))
		} catch (err) {
			console.error('Problem saving people data', err)
		}
	}

	const retrievePeopleData = async () => {
		try {
			const peopleStr = await AsyncStorage.getItem('expoTipCalc.people');
			if (!peopleStr || peopleStr.length < 1) {
				console.log('[retrievePeopleData] There was no people data, bailing...')
				return
			}
			setPeople(JSON.parse(peopleStr))
		} catch (err) {
			console.error('Problem loading people data', err)
		}
	}

	useEffect(() => {
		retrievePeopleData()
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>People</Text>
			<TextInput
				onChangeText={text => setNewPersonName(text)}
				placeholder="New person name"
				style={styles.inputNewPersonName}
				value={newPersonName} />
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
						onPress={() => { persistPeopleData() }}
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
		justifyContent: 'space-between',
		flexDirection: 'row',
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
