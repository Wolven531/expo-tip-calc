import React, { FC, useEffect } from 'react'
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { connect } from 'react-redux'

import { IPeopleReducerProps } from '../redux/reducers/peopleReducer'
import { setPeople } from '../redux/actions/peopleActions'

import { Person } from '../models/Person'

import { retrievePeopleData } from '../services/PeopleService'

interface IHomeScreenProps {
	people: Person[]
	setPeople: (people: Person[]) => any
}

const HomeScreenDC: FC<IHomeScreenProps> = (props) => {
	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		// retrievePositionsData()
		// 	.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.tabBarInfoContainer}>
				<Text>Hello.</Text>
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
	setPeople
}

const mapStateToProps = (combinedReducers) => {
	const peopleReducer: IPeopleReducerProps = combinedReducers.peopleReducer

	return {
		people: peopleReducer.people
	}
}

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenDC)

export { HomeScreen }
