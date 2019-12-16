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

import {
	addPerson,
	deletePerson,
	setPeople
} from '../redux/actions/peopleActions'
import { setRoles } from '../redux/actions/rolesActions'
import { IPeopleReducerProps } from '../redux/reducers/peopleReducer'
import { IRolesReducerProps } from '../redux/reducers/rolesReducer'

import {
	LBL_ADD_NEW_PERSON,
	MSG_OK,
	MSG_PEOPLE_SAVED,
	PLACEHOLDER_NEW_PERSON_NAME,
	TITLE_ADD_PERSON,
	TITLE_PEOPLE_SAVED
} from '../constants/Strings'
import { Person } from '../models/Person'
import { Position } from '../models/Position'
import {
	persistPeopleData,
	retrievePeopleData
} from '../services/PeopleService'
import { retrievePositionsData } from '../services/PositionsService'

import { Expander } from '../components/Expander'
import { PersonDisplay } from '../components/PersonDisplay'

interface IPeopleScreenProps {
	addPerson: (newPerson: Person) => any
	deletePerson: (personToRemove: Person) => any
	people: Person[]
	roles: Position[]
	setPeople: (people: Person[]) => any
	setRoles: (roles: Position[]) => any
}

const PeopleScreenDC: FC<IPeopleScreenProps> = (props) => {
	const DEFAULT_NAME = ''
	const DEFAULT_ROLE_INDEX = 0
	const [newPersonName, setNewPersonName] = useState(DEFAULT_NAME)
	const [newPersonRoleIndex, setNewPersonRoleIndex] = useState(DEFAULT_ROLE_INDEX)

	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		retrievePositionsData()
			.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>People</Text>
			<View style={styles.peopleDisplay}>
				{props.people.length < 1 && <Text style={{ textAlign: 'center' }}>There are no people currently</Text>}
				<FlatList
					data={props.people}
					keyExtractor={(item: Person, index: number) => String(index)}
					renderItem={({ item }) =>
						<PersonDisplay
							onDelete={() => { props.deletePerson(item) }}
						 	person={item} />}
					/>
				<View style={styles.newPersonContainer}>
					<Expander label={LBL_ADD_NEW_PERSON}>
						<View style={styles.newPersonInputContainer}>
							<TextInput
								onChangeText={setNewPersonName}
								placeholder={PLACEHOLDER_NEW_PERSON_NAME}
								style={styles.inputNewPersonName}
								value={newPersonName} />
							<Picker
								onValueChange={(itemValue, itemIndex) => { setNewPersonRoleIndex(itemIndex) }}
								selectedValue={''}
								style={styles.rolePicker} >
								{props.roles.map(role =>
									<Picker.Item
										key={role.title}
										label={`${role.title} (${role.points} pt${role.points > 1 ? 's' : ''})`}
										value={role.title.toLowerCase()} />
								)}
							</Picker>
						</View>
						<Button
							onPress={() => {
								props.addPerson(new Person(newPersonName, props.roles[newPersonRoleIndex]))
								setNewPersonName(DEFAULT_NAME)
								setNewPersonRoleIndex(DEFAULT_ROLE_INDEX)
							}}
							title={TITLE_ADD_PERSON} />
					</Expander>
				</View>
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
		</ScrollView>
	)
};

(PeopleScreenDC as any).navigationOptions = {
	title: 'People'
}

const styles = StyleSheet.create({
	buttonNewPositionExpander: { },
	container: {
		backgroundColor: '#fff',
		flex: 1,
		padding: 15
	},
	expanderText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	header: {
		fontSize: 16,
		textAlign: 'center'
	},
	inputNewPersonName: {
		borderColor: '#333',
		borderWidth: 1,
		height: 35,
		marginTop: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '50%'
	},
	newPersonContainer: {
		borderColor: '#333',
		borderWidth: 1,
		marginBottom: 10,
		marginTop: 20,
		padding: 10
	},
	newPersonInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		width: '100%'
	},
	peopleDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	},
	rolePicker: {
		height: 35,
		marginTop: 10,
		width: '48%'
	}
})

const mapDispatchToProps = {
	addPerson,
	deletePerson,
	setPeople,
	setRoles
}

const mapStateToProps = (combinedReducers) => {
	const peopleReducer: IPeopleReducerProps = combinedReducers.peopleReducer
	const rolesReducer: IRolesReducerProps = combinedReducers.rolesReducer

	return {
		people: peopleReducer.people,
		roles: rolesReducer.roles
	}
}

const PeopleScreen = connect(mapStateToProps, mapDispatchToProps)(PeopleScreenDC)

export { PeopleScreen }
