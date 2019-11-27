import React, { FC } from 'react'
import { Text, View } from 'react-native'

const PositionsScreen: FC<any> = (props) => {
	return (
		<View>
			<Text>Positions</Text>
		</View>
	)
}

(PositionsScreen as any).navigationOptions = {
	title: 'Positions'
}

export { PositionsScreen }
