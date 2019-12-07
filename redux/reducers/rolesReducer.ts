import { Position } from '../../models/Position'

import {
	ADD_ROLE,
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
