import { Position } from '../../models/Position'

import {
	ADD_ROLE,
	SET_ROLES
} from '../actionTypes'

const addRole = (newRole: Position) => ({
	payload: newRole,
	type: ADD_ROLE
})

const setRoles = (roles: Position[]) => ({
	payload: roles,
	type: SET_ROLES
})

export {
	addRole,
	setRoles
}
