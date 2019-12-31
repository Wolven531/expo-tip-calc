import Intl from 'intl'
require('intl/locale-data/jsonp/en.js')
import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	Button,
	Picker,
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
	METHOD_COMMUNIST,
	METHOD_HOUR_WEIGHTED,
	METHOD_ROLE_CENTRIC,
	MSG_HOURS_INPUT_ERROR,
	PLACEHOLDER_HOURS,
	PLACEHOLDER_TIP_TOTAL,
	TITLE_CALCULATE
} from '../constants/Strings'
import { IHoursInfo } from '../constants/Types'

// components
import { ConditionalMessage } from '../components/ConditionalMessage'
import { HeaderLabel } from '../components/HeaderLabel'
import { TipBreakdown } from '../components/TipBreakdown'

interface ICalculationsScreenProps {
	people: Person[]
	setPeople: (people: Person[]) => any
}

const DEFAULT_HOURS = '0'
const DEFAULT_TIP_TOTAL = '0'
const ICON_SELECTED_BASE = 'checkmark-circle-outline'
const ICON_UNSELECTED_BASE = 'radio-button-off'
const METHODS_FOR_CALCULATION = [ METHOD_COMMUNIST, METHOD_HOUR_WEIGHTED, METHOD_ROLE_CENTRIC ]
const OS_APPLE = 'ios'
const REGEX_NUMERIC_IMPERFECT = /[^0-9\.]/gi

const usdFormatter = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' })
const calcTotalHours = (selectedPeople: IHoursInfo[]) =>
	selectedPeople.reduce((accumulator, { hours }) => accumulator + parseFloat(hours), 0)
const prettifyMoney = (numStr: string) => {
	const num = parseFloat(numStr)

	return usdFormatter.format(num)
}

const CalculationsScreenDC: FC<ICalculationsScreenProps> = (props) => {
	const [selectedCalcIndex, setSelectedCalcIndex] = useState(0)
	const [selectedPeopleInfo, setSelectedPeopleInfo] = useState<IHoursInfo[]>([])
	const [shouldShowBreakdown, setShouldShowBreakdown] = useState(false)
	const [totalTip, setTotalTip] = useState(DEFAULT_TIP_TOTAL)

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
			<ConditionalMessage
				collection={props.people}
				message={HEADER_NO_PEOPLE}
				styleContainer={styles.padded}
				useHeader={true}
				>
				<View style={styles.padded}>
					<HeaderLabel text={HEADER_SELECT_PEOPLE} />
				</View>
				<CustomMultiPicker
					callback={(selectedIndexStrings: string[]) => {
						const indexNums = selectedIndexStrings.map(ind => parseFloat(ind))
						indexNums.sort(simpleNumberSort)
						const newSelectedPeopleInfo = indexNums.map(num =>
							({
								hours: DEFAULT_HOURS,
								index: num,
								person: props.people[num]
							})
						)
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
				<ConditionalMessage
					collection={selectedPeopleInfo}
					message={HEADER_NO_SELECTED_PEOPLE}
					styleContainer={styles.padded}
					useHeader={true}
					>
					<View style={styles.padded}>
						<HeaderLabel text={HEADER_ENTER_HOURS}/>
					</View>
					{selectedPeopleInfo.map(selectedInfo => {
						const selectedPerson = props.people[selectedInfo.index]

						return (
							<View key={selectedInfo.index} style={styles.hoursContainer}>
								<Text style={styles.hoursLabel}>{selectedPerson.name}</Text>
								<TextInput
									onChangeText={newVal => {
										const newSelectedPeopleInfo = selectedPeopleInfo.map(staleSelectedInfo =>
											({
												hours: staleSelectedInfo.index === selectedInfo.index
													? newVal.replace(REGEX_NUMERIC_IMPERFECT, '')
													: staleSelectedInfo.hours,
												index: staleSelectedInfo.index,
												person: staleSelectedInfo.person
											})
										)
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
								newVal = newVal.replace(REGEX_NUMERIC_IMPERFECT, '')
								setTotalTip(newVal)
							}}
							placeholder={PLACEHOLDER_TIP_TOTAL}
							style={styles.tipInput}
							value={String(totalTip)}
							/>
						<Text style={styles.tipTotalLabel}>{LBL_TOTAL_TIP}: {prettifyMoney(totalTip)}</Text>
					</View>
					<View>
						<HeaderLabel text={HEADER_SELECT_CALCULATION}/>
						<Picker
							onValueChange={(itemValue, itemIndex) => { setSelectedCalcIndex(itemIndex) }}
							selectedValue={METHODS_FOR_CALCULATION[selectedCalcIndex]}
							style={styles.calcPicker}
						>
							{METHODS_FOR_CALCULATION.map(calcMethod =>
								<Picker.Item
									key={calcMethod}
									label={calcMethod}
									value={calcMethod} />
							)}
						</Picker>
						<View style={{ marginTop: 15 }}>
							<Button
								onPress={() => {
									setShouldShowBreakdown(true)
								}}
								title={TITLE_CALCULATE} />
							{shouldShowBreakdown && <View style={styles.breakdownContainer}>
								<TipBreakdown
									calculationMethod={METHODS_FOR_CALCULATION[selectedCalcIndex]}
									people={selectedPeopleInfo}
									totalTip={parseFloat(totalTip)}
									/>
							</View>}
						</View>
					</View>
				</ConditionalMessage>
			</ConditionalMessage>
		</ScrollView>
	)
};

(CalculationsScreenDC as any).navigationOptions = {
	header: null
}

const styles = StyleSheet.create({
	breakdownContainer: {
		borderColor: '#333',
		borderWidth: 1,
		// height: 50,
		marginTop: 15,
		paddingVertical: 10
	},
	calcPicker: {
		height: 35,
		marginTop: 10
	},
	container: {
		backgroundColor: '#fff',
		flex: 1
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
	padded: {
		padding: 15
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
