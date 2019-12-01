import {
	AsyncStorage
} from 'react-native'

import { Person } from '../models/Person'

const STORAGE_KEY_PEOPLE = 'expoTipCalc.people'

const persistPeopleData = (people: Person[]): Promise<void> => {
	return AsyncStorage
		.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(people))
		.catch(err => {
			console.error('Problem saving people data', err)
		})
}

const retrievePeopleData = (): Promise<Person[]> => {
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
