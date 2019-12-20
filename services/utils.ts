import {
	LBL_POINTS_MULTIPLE,
	LBL_POINTS_SINGLE
} from '../constants/Strings'

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

const simpleNumberSort = (a: number, b: number) => a < b ? -1 : (a > b ? 1 : 0)

export {
	getPluralizedPoints,
	simpleNumberSort
}
