import { Person } from '../../models/Person'

import { IPeopleReducerProps } from '../reducers/peopleReducer'

const selectPeople = (combinedReducers: { peopleReducer: IPeopleReducerProps }): Person[] => {
	return combinedReducers.peopleReducer.people;
}

export { selectPeople }