import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native'
import CustomMultiPicker from 'react-native-multiple-select-list'
// NOTE: requires more work: https://github.com/react-native-community/react-native-datetimepicker
// import DateTimePicker from '@react-native-community/datetimepicker'

// redux
import { setPeople } from '../redux/actions/peopleActions'
import { IPeopleReducerProps } from '../redux/reducers/peopleReducer'

// models
import { Person } from '../models/Person'

// services
import { retrievePeopleData } from '../services/PeopleService'

// constants
import {
	HEADER_ENTER_HOURS,
	HEADER_SELECT_PEOPLE
} from '../constants/Strings'

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
		<ScrollView style={styles.container}>
			<View style={styles.headerTextSelectPeople}>
				<Text style={styles.headerText}>{HEADER_SELECT_PEOPLE}</Text>
			</View>
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
				callback={setSelectedPeopleIndices} // callback, array of selected items
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
			<View style={styles.headerTextSelectPeople}>
				<Text style={styles.headerText}>{HEADER_ENTER_HOURS}</Text>
			</View>
		</ScrollView>
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
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	headerTextSelectPeople: {
		padding: 15
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
