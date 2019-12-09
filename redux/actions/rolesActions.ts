import { Position } from '../../models/Position'

import {
	ADD_ROLE,
	DELETE_ROLE,
	SET_ROLES
} from '../actionTypes'

const addRole = (newRole: Position) => ({
	payload: newRole,
	type: ADD_ROLE
})

const deleteRole = (roleToDelete: Position) => ({
	payload: roleToDelete,
	type: DELETE_ROLE
})

const setRoles = (roles: Position[]) => ({
	payload: roles,
	type: SET_ROLES
})

export {
	addRole,
	deleteRole,
	setRoles
}
