import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TextInput
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
	HEADER_NO_PEOPLE,
	HEADER_SELECT_PEOPLE
} from '../constants/Strings'

interface ICalculationsScreenProps {
	people: Person[]
	setPeople: (people: Person[]) => any
}

const CalculationsScreenDC: FC<ICalculationsScreenProps> = (props) => {
	const simpleNumberSort = (a: number, b: number) => a < b ? -1 : (a > b ? 1 : 0)
	const [selectedPeopleIndices, setSelectedPeopleIndices] = useState<number[]>([])

	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		// retrievePositionsData()
		// 	.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			
			{/*
			<DateTimePicker
				value={new Date()}
				mode={'date'} // 'date' | ???
				is24Hour={false}
				display={'default'} // 'calendar' | 'clock' | 'spinner'
				onChange={() => { return }}
				/>
			*/}
			{props.people.length === 0 && <View style={styles.headerTextSelectPeople}>
				<Text style={styles.headerText}>{HEADER_NO_PEOPLE}</Text>
			</View>}
			{props.people.length > 0 && <View>
				<View style={styles.headerTextSelectPeople}>
					<Text style={styles.headerText}>{HEADER_SELECT_PEOPLE}</Text>
				</View>
				<CustomMultiPicker
					callback={(selectedIndexStrings: string[]) => {
						const indexNums = selectedIndexStrings.map(ind => parseInt(ind, 10))
						indexNums.sort(simpleNumberSort)
						setSelectedPeopleIndices(indexNums)
					}}
					iconColor={'#00a2dd'}
					iconSize={20}
					multiple={true}
					options={props.people.map(person => person.name)}
					// placeholder={'Search'}
					// placeholderTextColor={'#757575'}
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
					selected={selectedPeopleIndices}
				/>
				{selectedPeopleIndices.length > 0 && <View>
					<View style={styles.headerTextSelectPeople}>
						<Text style={styles.headerText}>{HEADER_ENTER_HOURS}</Text>
						{selectedPeopleIndices.map(ind => {
							const selectedPerson = props.people[ind]

							return (
								<View key={ind} style={{
									// alignContent: 'center',
									alignItems: 'center',
									borderColor: '#333',
									borderWidth: 1,
									flexDirection: 'row',
									padding: 5,
									paddingLeft: 15
									}}>
									<Text style={{ flexGrow: 2 }}>{selectedPerson.name}</Text>
									<TextInput placeholder={"Hours"} style={{
										borderColor: '#333',
										borderWidth: 1,
										padding: 5
									}} />
								</View>
							)
						})}
					</View>
				</View>}
			</View>}
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
