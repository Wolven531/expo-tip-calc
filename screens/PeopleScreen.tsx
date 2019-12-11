import React, { FC, useEffect, useState } from 'react'
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

import { setPeople } from '../redux/actions/peopleActions'
import { setRoles } from '../redux/actions/rolesActions'
import { IRolesReducerProps } from '../redux/reducers/rolesReducer'

import {
	MSG_OK,
	MSG_PEOPLE_SAVED,
	TITLE_PEOPLE_SAVED
} from '../constants/Strings'
import { Person } from '../models/Person'
import { Position } from '../models/Position'
import {
	persistPeopleData,
	retrievePeopleData
} from '../services/PeopleService'
import { retrievePositionsData } from '../services/PositionsService'

import { PersonDisplay } from '../components/PersonDisplay'

interface IPeopleScreenProps {
	people: Person[]
	roles: Position[]
	setRoles: (roles: Position[]) => any
	setPeople: (people: Person[]) => any
}

const PeopleScreenDC: FC<IPeopleScreenProps> = (props) => {
	const [newPersonName, setNewPersonName] = useState('')

	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		retrievePositionsData()
			.then(loadedRoles => { props.setRoles(loadedRoles) })
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
					{props.roles.map(role =>
						<Picker.Item
							key={role.title}
							label={`${role.title} (${role.points} pt${role.points > 1 ? 's' : ''})`}
							value={role.title.toLowerCase()} />
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
							// setPeople(stalePeople => stalePeople.concat(new Person(newPersonName, new Position('', 0))))
							setNewPersonName('')
						}}
						title="Add Person" />
				</View>
				<View style={styles.buttonCell}>
					<Button
						color="#3a3"
						onPress={() => {
							persistPeopleData(props.people)
							Platform.select({
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
				{props.people.length < 1 && <Text style={{ textAlign: 'center' }}>There are no people currently</Text>}
				<FlatList
					data={props.people}
					keyExtractor={(item: Person, index: number) => String(index)}
					renderItem={({ item }) =>
						<PersonDisplay
							onDelete={() => {}}
						 	person={item} />}
					/>
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
	},
	personContainer: {
		alignItems: 'center',
		borderColor: '#333',
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		padding: 10
	}
})

const mapDispatchToProps = {
	setPeople,
	setRoles
}

const mapStateToProps = (combinedReducers) => {
	const rolesReducer: IRolesReducerProps = combinedReducers.rolesReducer

	return { roles: rolesReducer.roles }
}

const PeopleScreen = connect(mapStateToProps, mapDispatchToProps)(PeopleScreenDC)

export { PeopleScreen }
