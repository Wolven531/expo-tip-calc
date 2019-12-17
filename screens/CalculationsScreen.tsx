import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Platform,
	StyleSheet,
	// Text,
	View
} from 'react-native'
// NOTE: requires more work: https://github.com/react-native-community/react-native-datetimepicker
// import DateTimePicker from '@react-native-community/datetimepicker'
import CustomMultiPicker from 'react-native-multiple-select-list'

// redux
import { setPeople } from '../redux/actions/peopleActions'
import { IPeopleReducerProps } from '../redux/reducers/peopleReducer'

// models
import { Person } from '../models/Person'

// services
import { retrievePeopleData } from '../services/PeopleService'

interface ICalculationsScreenProps {
	people: Person[]
	setPeople: (people: Person[]) => any
}

const CalculationsScreenDC: FC<ICalculationsScreenProps> = (props) => {
	const [selectedPeopleIndices, setSelectedPeopleIndices] = useState([])

	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		// retrievePositionsData()
		// 	.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.tabBarInfoContainer}>

				{/*
				<DateTimePicker
					value={new Date()}
					mode={'date'} // 'date' | ???
					is24Hour={false}
					display={'default'} // 'calendar' | 'clock' | 'spinner'
					onChange={() => { return }}
					/>
				*/}
				<CustomMultiPicker
					callback={(res: any[]) => {
						// if (res.length === 0) { // one value means everything is deselected
						// 	setSelectedPeopleIndices([])
						// 	return
						// }

						setSelectedPeopleIndices(res)
					}} // callback, array of selected items
					iconColor={'#00a2dd'}
					iconSize={20}
					multiple={true} //
					// options={userList}
					options={props.people.map(person => person.name)}
					// placeholder={'Search'}
					// placeholderTextColor={'#757575'}
					// returnValue={'label'} // 'label' | 'value'
					returnValue={'value'} // 'label' | 'value'
					rowBackgroundColor={'#eee'}
					rowHeight={50}
					rowRadius={15}
					// scrollViewHeight={150}
					// search={true} // show search bar
					selectedIconName={Platform.OS === 'ios'
						? 'ios-checkmark-circle-outline'
						: 'md-checkmark-circle-outline'}
					unselectedIconName={Platform.OS === 'ios'
						? 'ios-radio-button-off'
						: 'md-radio-button-off'}
					// selected={[1,2]} // list of options which are selected by default
					selected={selectedPeopleIndices}
				/>
			</View>
		</View>
	)
};

(CalculationsScreenDC as any).navigationOptions = {
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

const CalculationsScreen = connect(mapStateToProps, mapDispatchToProps)(CalculationsScreenDC)

export { CalculationsScreen }
