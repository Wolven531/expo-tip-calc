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
			// return {
			// 	...state,
			// 	roles: state.roles.concat(action.payload)
			// }
		case DELETE_PERSON:
			// const roleToBeDeleted: Position = action.payload
			// return {
			// 	...state,
			// 	roles: state.roles.filter(staleRole => staleRole.points !== roleToBeDeleted.points ||
			// 											staleRole.title !== roleToBeDeleted.title)
			// }
		case SET_PEOPLE:
			// return {
			// 	...state,
			// 	roles: action.payload
			// }
		default:
			return state
	}
}

export { peopleReducer }
