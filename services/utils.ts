const getPluralizedPoints = (points: number): string => {
	switch (points) {
		case 0:
			return '0'
		case 1:
			return '1 pt'
		default:
			return `${points} pts`
	}
}

export { getPluralizedPoints }
