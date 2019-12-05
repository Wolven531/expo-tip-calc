import { Position } from '../../models/Position'

import { retrievePositionsData } from '../../services/PositionsService'

export interface IRolesReducerProps {
	roles: Position[]
}

let rolesReducer: any
let loadedRoles: Position[] = [];

(async () => {
	loadedRoles = await retrievePositionsData()

	const initialState: IRolesReducerProps = {
		roles: loadedRoles
	}

	rolesReducer = (state = initialState, action) => {
		switch (action.type) {
			default:
				return state
		}
	}
})()

export { rolesReducer }