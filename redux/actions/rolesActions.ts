import { Position } from '../../models/Position'

import { SET_ROLES } from '../actionTypes'

const setRoles = (roles: Position[]) => ({
	payload: roles,
	type: SET_ROLES
})

export { setRoles }
