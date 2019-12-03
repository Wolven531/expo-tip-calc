import React, { FC } from 'react'
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'

import {
	LBL_DELETE_ROLE,
	MSG_CANCEL,
	MSG_CONFIRM_ROLE_DELETE,
	MSG_OK,
	TITLE_CONFIRM_ROLE_DELETE
} from '../constants/Strings'

export interface IDeleteButtonProps {
	onDelete: () => void
}

const DeleteButton: FC<IDeleteButtonProps> = (props) => {
	return (
		<TouchableOpacity
			onPress={() => {
				Platform.select({
					default: () => {
						Alert.alert(
							TITLE_CONFIRM_ROLE_DELETE,
							MSG_CONFIRM_ROLE_DELETE,
							[
								{
									onPress: () => { },
									style: 'cancel',
									text: MSG_CANCEL
								},
								{
									onPress: () => {
										props.onDelete()
									},
									style: 'destructive',
									text: MSG_OK
								}
							],
							{ cancelable: false }
						)
					},
					web: () => {
						if (!confirm(MSG_CONFIRM_ROLE_DELETE)) {
							return
						}
						props.onDelete()
					}
				})()
			}}
			style={styles.btnDelete}>
			<Text style={styles.btnDeleteLabel}>{LBL_DELETE_ROLE}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	btnDelete: {
		backgroundColor: '#f33',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#333',
		shadowOffset: {
			height: 3,
			width: 2
		},
		shadowRadius: 2
	},
	btnDeleteLabel: {
		color: '#ff0',
		fontWeight: 'bold',
		textShadowColor: '#333',
		textShadowOffset: {
			height: 3,
			width: 2
		},
		textShadowRadius: 2
	}
})

export { DeleteButton }
