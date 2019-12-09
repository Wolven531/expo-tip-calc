import { Position } from '../../models/Position'

import {
	ADD_ROLE,
	DELETE_ROLE,
	SET_ROLES
} from '../actionTypes'

export interface IRolesReducerProps {
	roles: Position[]
}

const initialState: IRolesReducerProps = {
	roles: []
}

const rolesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ROLE:
			return {
				...state,
				roles: state.roles.concat(action.payload)
			}
		case DELETE_ROLE:
			const roleToBeDeleted: Position = action.payload
			return {
				...state,
				roles: state.roles.filter(staleRole => staleRole.points !== roleToBeDeleted.points ||
														staleRole.title !== roleToBeDeleted.title)
			}
		case SET_ROLES:
			return {
				...state,
				roles: action.payload
			}
		default:
			return state
	}
}

export { rolesReducer }
