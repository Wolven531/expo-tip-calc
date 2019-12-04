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
import { connect } from 'react-redux'

import { IRolesReducerProps } from '../redux/reducers/rolesReducer'

import {
	MSG_PEOPLE_SAVED,
	TITLE_PEOPLE_SAVED,
	MSG_OK
} from '../constants/Strings'
import { Person } from '../models/Person'
import { Position } from '../models/Position'
import {
	persistPeopleData,
	retrievePeopleData
} from '../services/PeopleService'
import { retrievePositionsData } from '../services/PositionsService'

interface IPeopleScreenProps {
	roles: Position[]
}

const PeopleScreenDC: FC<IPeopleScreenProps> = (props) => {
	const [newPersonName, setNewPersonName] = useState('')
	const [people, setPeople] = useState<Person[]>([])
	const [positions, setPositions] = useState<Position[]>([])

	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { setPeople(loadedPeople) })
		retrievePositionsData()
			.then(loadedPositions => { setPositions(loadedPositions) })
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
					{positions.map(position =>
						<Picker.Item
							key={position.title}
							label={`${position.title} (${position.points} pt${position.points > 1 ? 's' : ''})`}
							value={position.title.toLowerCase()} />
					)}
				</Picker>
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.buttonCell}>
					<Button
						onPress={() => {
							if (newPersonName.length < 1) {
								return
							}
							setPeople(stalePeople => stalePeople.concat(new Person(newPersonName, new Position('', 0))))
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
					keyExtractor={(item: Person, index: number) => String(index)}
					renderItem={({ item }) => <Text>{item.name}</Text>}
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

(PeopleScreenDC as any).navigationOptions = {
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

const mapDispatchToProps = { }

const mapStateToProps = (combinedReducers) => {
	const rolesReducer: IRolesReducerProps = combinedReducers.rolesReducer

	return { roles: rolesReducer.roles }
}

const PeopleScreen = connect(mapStateToProps, mapDispatchToProps)(PeopleScreenDC)

export { PeopleScreen }
