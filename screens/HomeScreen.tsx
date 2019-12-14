import React, { FC, useEffect } from 'react'
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { connect } from 'react-redux'

import { IPeopleReducerProps } from '../redux/reducers/peopleReducer'
import { IRolesReducerProps } from '../redux/reducers/rolesReducer'
import { setPeople } from '../redux/actions/peopleActions'
import { setRoles } from '../redux/actions/rolesActions'

import { Person } from '../models/Person'
import { Position } from '../models/Position'

import { retrievePeopleData } from '../services/PeopleService'
import { retrievePositionsData } from '../services/PositionsService'

interface IHomeScreenProps {
	people: Person[]
	roles: Person[]
	setPeople: (people: Person[]) => any
	setRoles: (roles: Position[]) => any
}

const HomeScreenDC: FC<IHomeScreenProps> = (props) => {
	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		retrievePositionsData()
			.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.tabBarInfoContainer}>
				<Text>Hello</Text>
				<Text>The system currently holds</Text>
				<Text>{props.people.length} people</Text>
				<Text>{props.roles.length} roles</Text>
			</View>
		</View>
	)
};

(HomeScreenDC as any).navigationOptions = {
	header: null
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	tabBarInfoContainer: {
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		bottom: 0,
		left: 0,
		paddingVertical: 20,
		position: 'absolute',
		right: 0,
		...Platform.select({
			android: {
				elevation: 20,
			},
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			}
		})
	}
})

const mapDispatchToProps = {
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

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenDC)

export { HomeScreen }
