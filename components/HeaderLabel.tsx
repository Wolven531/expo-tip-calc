import React, { FC } from 'react'
import {
	StyleSheet,
	Text
} from 'react-native'

interface IHeaderLabelProps {
	text: string
}

const HeaderLabel: FC<IHeaderLabelProps> = ({ text }) =>
	<Text style={styles.headerText}>{text}</Text>

const styles = StyleSheet.create({
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	}
})

export { HeaderLabel }
