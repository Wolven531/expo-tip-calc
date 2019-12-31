import React, { FC } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

// components
import { HeaderLabel } from './HeaderLabel'

interface IConditionalMessageProps {
	collection: any[] | null | undefined
	message: string
	styleContainer?: any
	styleText?: any
	useHeader?: boolean
}

/**
 * @summary Component used to display one of two things: a message or its children
 * @description If the collection provided is null, undefined, or has a length of zero (0),
 *   the message provided will be displayed; otherwise, the children provided to this
 *   component will be displayed
 * @param collection @type any[] | null | undefined
 * @param message @type string
 * @param styleContainer @type any | undefined
 * @param styleText @type any | undefined
 * @param useHeader @type boolean | undefined Whether or not to use a HeaderLabel for the message
 */
const ConditionalMessage: FC<IConditionalMessageProps> = (props) => { // NOTE: use of memo() here causes crash
	const shouldDisplayMessage = props.collection === null
		|| props.collection === undefined
		|| props.collection.length === 0
	const useHeader = props.useHeader || false
	const shouldDisplayHeader = shouldDisplayMessage && useHeader
	const shouldDisplayText = shouldDisplayMessage && !shouldDisplayHeader

	return (
		<View style={props.styleContainer ? props.styleContainer : styles.container}>
			{shouldDisplayHeader && <HeaderLabel text={props.message} />}
			{shouldDisplayText && <Text style={props.styleText ? props.styleText : styles.text}>{props.message}</Text>}
			{!shouldDisplayMessage && props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	text: {

	}
})

export { ConditionalMessage }
