import React, { FC, memo, useState } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

interface IConditionalMessageProps {
	collection: any[] | null | undefined
	containerStyle: any | undefined
	message: string
}

const ConditionalMessage: FC<IConditionalMessageProps> = (props) => {
	return (
		<View style={props.containerStyle ? props.containerStyle : styles.container}>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	}
})

export { ConditionalMessage }
