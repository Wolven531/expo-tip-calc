import React, { FC, useState } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

interface IExpanderProps {
	label: string
}

const Expander: FC<IExpanderProps> = (props) => {
	const [isAddExpanded, setIsAddExpanded] = useState(false)

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setIsAddExpanded(staleExpanded => !staleExpanded)}
				style={styles.buttonExpander}>
				<Text style={styles.expanderText}>{isAddExpanded ? '-' : '+'} {props.label}</Text>
			</TouchableOpacity>
			{isAddExpanded && <View>
				{props.children}
			</View>}
		</View>
	)
}

const styles = StyleSheet.create({
	buttonExpander: { },
	expanderText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	container: {
		borderColor: '#333',
		borderWidth: 1,
		marginBottom: 10,
		marginTop: 20,
		padding: 10
	}
})

export { Expander }
