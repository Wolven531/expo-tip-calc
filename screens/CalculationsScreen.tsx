import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'
import CustomMultiPicker from 'react-native-multiple-select-list'
// NOTE: requires more work: https://github.com/react-native-community/react-native-datetimepicker
// import DateTimePicker from '@react-native-community/datetimepicker'

// redux
import { setPeople } from '../redux/actions/peopleActions'
import { selectPeople } from '../redux/selectors/peopleSelectors'

// models
import { Person } from '../models/Person'

// services
import { retrievePeopleData } from '../services/PeopleService'
import { simpleNumberSort } from '../services/utils'

// constants
import {
	HEADER_ENTER_HOURS,
	HEADER_NO_PEOPLE,
	HEADER_NO_SELECTED_PEOPLE,
	HEADER_SELECT_CALCULATION,
	HEADER_SELECT_PEOPLE,
	LBL_TOTAL_HOURS,
	LBL_TOTAL_TIP,
	MSG_HOURS_INPUT_ERROR,
	PLACEHOLDER_HOURS,
	PLACEHOLDER_TIP_TOTAL
} from '../constants/Strings'

interface ICalculationsScreenProps {
	people: Person[]
	setPeople: (people: Person[]) => any
}

interface IHoursInfo {
	hours: string
	index: number
}

const ICON_SELECTED_BASE = 'checkmark-circle-outline'
const ICON_UNSELECTED_BASE = 'radio-button-off'
const OS_APPLE = 'ios'

const usdFormatter = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' })
const calcTotalHours = (selectedPeople: IHoursInfo[]) =>
	selectedPeople.reduce((accumulator, { hours }) => accumulator + parseFloat(hours), 0)
const prettifyMoney = (numStr: string) => {
	const num = parseFloat(numStr)

	return usdFormatter.format(num)
}

const CalculationsScreenDC: FC<ICalculationsScreenProps> = (props) => {
	const [selectedPeopleInfo, setSelectedPeopleInfo] = useState<IHoursInfo[]>([])
	const [totalTip, setTotalTip] = useState('0')
	const totalHoursDisplay = calcTotalHours(selectedPeopleInfo)

	useEffect(() => {
		retrievePeopleData()
			.then(loadedPeople => { props.setPeople(loadedPeople) })
		// retrievePositionsData()
		// 	.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [props.people])

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
						const indexNums = selectedIndexStrings.map(ind => parseFloat(ind))
						indexNums.sort(simpleNumberSort)
						const newSelectedPeopleInfo = indexNums.map(num => {
							return {
								hours: '0',
								index: num
							}
						})
						setSelectedPeopleInfo(newSelectedPeopleInfo)
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
					selectedIconName={Platform.OS === OS_APPLE
						? `ios-${ICON_SELECTED_BASE}`
						: `md-${ICON_SELECTED_BASE}`}
					unselectedIconName={Platform.OS === OS_APPLE
						? `ios-${ICON_UNSELECTED_BASE}`
						: `md-${ICON_UNSELECTED_BASE}`}
					selected={selectedPeopleInfo.map(selectedInfo => selectedInfo.index)}
				/>
				{selectedPeopleInfo.length === 0 && <View style={styles.headerTextSelectPeople}>
					<Text style={styles.headerText}>{HEADER_NO_SELECTED_PEOPLE}</Text>
				</View>}
				{selectedPeopleInfo.length > 0 && <View>
					<View style={styles.headerTextSelectPeople}>
						<Text style={styles.headerText}>{HEADER_ENTER_HOURS}</Text>
						{selectedPeopleInfo.map(selectedInfo => {
							const selectedPerson = props.people[selectedInfo.index]

							return (
								<View key={selectedInfo.index} style={styles.hoursContainer}>
									<Text style={styles.hoursLabel}>{selectedPerson.name}</Text>
									<TextInput
										onChangeText={newVal => {
											const newSelectedPeopleInfo = selectedPeopleInfo.map(staleSelectedInfo => {
												return {
													hours: staleSelectedInfo.index === selectedInfo.index
														? newVal.replace(/[^0-9\.]/gi, '')
														: staleSelectedInfo.hours,
													index: staleSelectedInfo.index
												}
											})
											setSelectedPeopleInfo(newSelectedPeopleInfo)
										}}
										placeholder={PLACEHOLDER_HOURS}
										style={styles.hoursInput}
										value={selectedInfo.hours}
										/>
								</View>
							)
						})}
						<View style={styles.hoursTotalContainer}>
							{isNaN(totalHoursDisplay)
								? <Text style={styles.hoursTotalError}>{MSG_HOURS_INPUT_ERROR}</Text>
								: <Text style={styles.hoursTotalLabel}>{LBL_TOTAL_HOURS}: {totalHoursDisplay}</Text>}
						</View>
						<View style={styles.tipTotalContainer}>
							<TextInput
								onChangeText={newVal => {
									newVal = newVal.replace(/[^0-9\.]/gi, '')
									setTotalTip(newVal)
								}}
								placeholder={PLACEHOLDER_TIP_TOTAL}
								style={styles.tipInput}
								value={String(totalTip)}
								/>
							<Text style={styles.tipTotalLabel}>{LBL_TOTAL_TIP}: {prettifyMoney(totalTip)}</Text>
						</View>
						<View>
							<Text style={styles.headerText}>{HEADER_SELECT_CALCULATION}</Text>
						</View>
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
	},
	hoursContainer: {
		alignItems: 'center',
		borderColor: '#333',
		borderWidth: 1,
		flexDirection: 'row',
		padding: 5,
		paddingLeft: 15
	},
	hoursInput: {
		borderColor: '#333',
		borderWidth: 1,
		padding: 5
	},
	hoursLabel: {
		flexGrow: 2
	},
	hoursTotalContainer: {
		padding: 5,
		marginTop: 10
	},
	hoursTotalError: {
		backgroundColor: '#faa',
		color: '#f00',
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 2,
		textAlign: 'center'
	},
	hoursTotalLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'right'
	},
	tipInput: {
		alignSelf: 'flex-end',
		borderColor: '#333',
		borderWidth: 1,
		padding: 5,
		// textAlign: 'right',
		width: '20%'
	},
	tipTotalContainer: {
		// flexDirection: 'row'
	},
	tipTotalLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'right'
		// width: '73%'
	}
})

const mapDispatchToProps = {
	setPeople
}

const mapStateToProps = (combinedReducers) => {
	return {
		people: selectPeople(combinedReducers)
	}
}

const CalculationsScreen = connect(mapStateToProps, mapDispatchToProps)(CalculationsScreenDC)

export { CalculationsScreen }
