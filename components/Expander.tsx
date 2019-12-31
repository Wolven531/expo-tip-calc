import React, { FC, useState } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

interface IExpanderProps {
	label: string
	symbolCollapse?: string
	symbolExpand?: string
}

const Expander: FC<IExpanderProps> = (props) => { // NOTE: use of memo() here causes crash
	const [isAddExpanded, setIsAddExpanded] = useState(false)
	const symCol = props.symbolCollapse === undefined
		? '-'
		: props.symbolCollapse
	const symExp = props.symbolExpand === undefined
		? '+'
		: props.symbolExpand

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setIsAddExpanded(staleExpanded => !staleExpanded)}
				style={styles.buttonExpander}>
				<Text style={styles.expanderText}>{isAddExpanded ? symCol : symExp} {props.label}</Text>
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
