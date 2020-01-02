import Intl from 'intl'
require('intl/locale-data/jsonp/en.js')

import {
	LBL_POINTS_MULTIPLE,
	LBL_POINTS_SINGLE
} from '../constants/Strings'

const usdFormatter = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' })

const getPluralizedPoints = (points: number): string => {
	switch (points) {
		case 0:
			return '0'
		case 1:
			return `1 ${LBL_POINTS_SINGLE}`
		default:
			return `${points} ${LBL_POINTS_MULTIPLE}`
	}
}

const prettifyMoney = (numStr: string): string => {
	const num = parseFloat(numStr)

	return usdFormatter.format(num)
}

const simpleNumberSort = (a: number, b: number) => a < b ? -1 : (a > b ? 1 : 0)

export {
	getPluralizedPoints,
	prettifyMoney,
	simpleNumberSort
}
