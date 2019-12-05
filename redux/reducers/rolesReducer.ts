import { Position } from '../../models/Position'

import { SET_ROLES } from '../actionTypes'

export interface IRolesReducerProps {
	roles: Position[]
}

const initialState: IRolesReducerProps = {
	roles: []
}

const rolesReducer = (state = initialState, action) => {
	switch (action.type) {
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