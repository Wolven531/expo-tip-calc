// import React from 'react'
import {
	AsyncStorage
} from 'react-native'

const STORAGE_KEY_PEOPLE = 'expoTipCalc.people'

// const persistPeopleData = async () => {
// 	try {
// 		await AsyncStorage.setItem('expoTipCalc.people', JSON.stringify(people))
// 	} catch (err) {
// 		console.error('Problem saving people data', err)
// 	}
// }
const persistPeopleData = (people): Promise<void> => {
	return AsyncStorage
		.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(people))
		.catch(err => {
			console.error('Problem saving people data', err)
		})
}

// const retrievePeopleData = async () => {
// 	try {
// 		const peopleStr = await AsyncStorage.getItem('expoTipCalc.people');
// 		if (!peopleStr || peopleStr.length < 1) {
// 			console.info('[retrievePeopleData] There was no people data, bailing...')
// 			return
// 		}
// 		setPeople(JSON.parse(peopleStr))
// 	} catch (err) {
// 		console.error('Problem loading people data', err)
// 	}
// }
const retrievePeopleData = (): Promise<string[]> => {
	return AsyncStorage
		.getItem(STORAGE_KEY_PEOPLE)
		.then(peopleStr => {
			if (!peopleStr || peopleStr.length < 1) {
				console.info('[retrievePeopleData] There was no people data, bailing...')
				return []
			}
			return JSON.parse(peopleStr)
		})
		.catch(err => {
			console.error('Problem loading people data', err)
		})
}

export {
	persistPeopleData,
	retrievePeopleData
}
