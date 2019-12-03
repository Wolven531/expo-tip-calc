import React, { FC } from 'react'
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

import {
	MSG_CANCEL,
	MSG_CONFIRM_ROLE_DELETE,
	MSG_OK,
	TITLE_CONFIRM_ROLE_DELETE
} from '../constants/Strings'
import { Position } from '../models/Position'
import { getPluralizedPoints } from '../services/utils'

export interface IRoleDisplayProps {
	onDelete: (role: Position) => void
	role: Position
}

const RoleDisplay: FC<IRoleDisplayProps> = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.fontTitle}>
				{props.role.title}
				<Text style={styles.fontSpacer}> - </Text>
				<Text style={styles.fontValue}>{getPluralizedPoints(props.role.points)}</Text>
			</Text>
			<TouchableOpacity
				onPress={() => {
					Platform.select({
						// android: () => {},
						// ios: () => {}
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
											props.onDelete(props.role)
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
							props.onDelete(props.role)
						}
					})()
				}}
				style={styles.btnDelete}>
				<Text style={styles.btnDeleteLabel}>Delete</Text>
			</TouchableOpacity>
		</View>
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
	},
	container: {
		alignItems: 'center',
		borderColor: '#333',
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		padding: 10
	},
	fontSpacer: {
		fontWeight: 'normal'
	},
	fontTitle: {
		fontWeight: 'bold'
	},
	fontValue: {
		fontWeight: 'normal'
	}
})

export { RoleDisplay }
