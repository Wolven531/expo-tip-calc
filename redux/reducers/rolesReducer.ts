import { Position } from '../../models/Position'

export interface IRolesReducerProps {
	roles: Position[]
}

const initialState: IRolesReducerProps = {
	roles: []
}

const rolesReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export { rolesReducer }