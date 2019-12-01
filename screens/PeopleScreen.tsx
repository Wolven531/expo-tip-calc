import React,
	{
		FC,
		useEffect,
		useState
	} from 'react'
import {
	Alert,
	Button,
	FlatList,
	Picker,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'

import {
	MSG_PEOPLE_SAVED,
	TITLE_PEOPLE_SAVED,
	MSG_OK
} from '../constants/Strings'
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
			<View style={styles.newPersonContainer}>
				<TextInput
					onChangeText={text => setNewPersonName(text)}
					placeholder="New person name"
					style={styles.inputNewPersonName}
					value={newPersonName} />
				<Picker
					onValueChange={(itemValue, itemIndex) => { }}
					selectedValue={''}
					style={{ height: 35, width: '48%' }} >
					<Picker.Item label="Barkeep" value="barkeep" />
					<Picker.Item label="Buser" value="buser" />
					<Picker.Item label="Cook" value="cook" />
					<Picker.Item label="Host" value="host" />
					<Picker.Item label="Server" value="server" />
					<Picker.Item label="Valet" value="valet" />
				</Picker>
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
						onPress={() => {
							persistPeopleData(people)
							Platform.select({
								// android: () => {},
								// ios: () => {}
								default: () => {
									Alert.alert(
										TITLE_PEOPLE_SAVED,
										MSG_PEOPLE_SAVED,
										[
											{
												onPress: () => { },
												text: MSG_OK
											}
										],
										{ cancelable: false }
									)
								},
								web: () => {
									alert(MSG_PEOPLE_SAVED)
								}
							})()
						}}
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
			<View style={{ marginBottom: 15 }}>
				{people.length > 0 && <Button
					color="#a33"
					onPress={() => { setPeople([]) }}
					title="Clear Current People" />}
			</View>
		</ScrollView>
	)
};

(PeopleScreen as any).navigationOptions = {
	title: 'People'
}

const styles = StyleSheet.create({
	buttonCell: {
		width: '48%'
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
		height: 35,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '48%'
	},
	newPersonContainer: {
		borderColor: '#333',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		marginTop: 10,
		padding: 5,
		width: '100%'
	},
	peopleDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	}
})

export { PeopleScreen }
