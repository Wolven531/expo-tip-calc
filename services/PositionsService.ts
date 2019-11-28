// import React from 'react'
import {
	AsyncStorage
} from 'react-native'

import { Position } from '../models/Position'
import defaultPositions from '../models/DefaultPositions.json'

const STORAGE_KEY_POSITIONS = 'expoTipCalc.positions'

const persistPositionsData = (positions): Promise<void> => {
	return AsyncStorage
		.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(positions))
		.catch(err => {
			console.error('Problem saving positions data', err)
		})
}

const retrievePositionsData = (): Promise<Position[]> => {
	return AsyncStorage
		.getItem(STORAGE_KEY_POSITIONS)
		.then(positionsStr => {
			if (!positionsStr || positionsStr.length < 1) {
				console.info('[retrievePositionsData] There was no positions data, returning defaults...', defaultPositions)
				return defaultPositions
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
