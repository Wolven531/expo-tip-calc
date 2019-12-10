import { Person } from '../../models/Person'

import {
	ADD_PERSON,
	DELETE_PERSON,
	SET_PEOPLE
} from '../actionTypes'

export interface IPeopleReducerProps {
	people: Person[]
}

const initialState: IPeopleReducerProps = {
	people: []
}

const peopleReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PERSON:
			return {
				...state,
				people: state.people.concat(action.payload)
			}
		case DELETE_PERSON:
			const personToBeDeleted: Person = action.payload
			return {
				...state,
				people: state.people.filter(stalePerson => stalePerson.name !== personToBeDeleted.name ||
														stalePerson.position !== personToBeDeleted.position)
			}
		case SET_PEOPLE:
			return {
				...state,
				people: action.payload
			}
		default:
			return state
	}
}

export { peopleReducer }
