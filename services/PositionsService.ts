// import React from 'react'
import {
	AsyncStorage
} from 'react-native'

const STORAGE_KEY_POSITIONS = 'expoTipCalc.positions'

const persistPositionsData = (positions): Promise<void> => {
	return AsyncStorage
		.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(positions))
		.catch(err => {
			console.error('Problem saving positions data', err)
		})
}

const retrievePositionsData = (): Promise<string[]> => {
	return AsyncStorage
		.getItem(STORAGE_KEY_POSITIONS)
		.then(positionsStr => {
			if (!positionsStr || positionsStr.length < 1) {
				console.info('[retrievePositionsData] There was no positions data, bailing...')
				return []
			}
			return JSON.parse(positionsStr)
		})
		.catch(err => {
			console.error('Problem loading positions data', err)
		})
}

export {
	persistPositionsData,
	retrievePositionsData
}
