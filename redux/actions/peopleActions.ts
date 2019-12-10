import { Person } from '../../models/Person'

import {
	ADD_PERSON,
	DELETE_PERSON,
	SET_PEOPLE
} from '../actionTypes'

const addPerson = (newPerson: Person) => ({
	payload: newPerson,
	type: ADD_PERSON
})

const deletePerson = (personToDelete: Person) => ({
	payload: personToDelete,
	type: DELETE_PERSON
})

const setPeople = (people: Person[]) => ({
	payload: people,
	type: SET_PEOPLE
})

export {
	addPerson,
	deletePerson,
	setPeople
}
