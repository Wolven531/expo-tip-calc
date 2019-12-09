import React, { FC, useEffect, useState } from 'react'
import {
	Alert,
	Button,
	FlatList,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { connect } from 'react-redux'

import {
	addRole,
	deleteRole,
	setRoles
} from '../redux/actions/rolesActions'
import { IRolesReducerProps } from '../redux/reducers/rolesReducer'

import {
	LBL_ADD_NEW_POSITION,
	MSG_OK,
	MSG_POSITIONS_EMPTY,
	MSG_POSITIONS_SAVED,
	PLACEHOLDER_NEW_POSITION_POINTS,
	PLACEHOLDER_NEW_POSITION_TITLE,
	TITLE_ADD_POSITION,
	TITLE_POSITIONS,
	TITLE_POSITIONS_SAVED,
	TITLE_SAVE_POSITIONS
} from '../constants/Strings'
import { Position } from '../models/Position'
import {
	persistPositionsData,
	retrievePositionsData
} from '../services/PositionsService'

import { RoleDisplay } from '../components/RoleDisplay'

interface IPositionsScreen {
	addRole: (newRole: Position) => any
	deleteRole: (roleToBeDeleted: Position) => any
	roles: Position[]
	setRoles: (roles: Position[]) => any
}

const PositionsScreenDC: FC<IPositionsScreen> = (props) => {
	const DEFAULT_POINTS = ''
	const DEFAULT_TITLE = ''
	const [newPositionTitle, setNewPositionTitle] = useState(DEFAULT_TITLE)
	const [newPositionPoints, setNewPositionPoints] = useState(DEFAULT_POINTS)
	const [isAddExpanded, setIsAddExpanded] = useState(false)

	useEffect(() => {
		retrievePositionsData()
			.then(loadedRoles => { props.setRoles(loadedRoles) })
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>{TITLE_POSITIONS}</Text>
			<View style={styles.positionsDisplay}>
				{props.roles.length < 1 && <Text style={styles.centeredText}>{MSG_POSITIONS_EMPTY}</Text>}
				<FlatList
					data={props.roles}
					keyExtractor={(item: Position, index: number) => String(index)}
					renderItem={({ item }) =>
						<RoleDisplay
							onDelete={(role: Position) => { props.deleteRole(role) }}
							role={item} />}
					style={styles.positionsList}
					/>
				<View style={styles.newPositionContainer}>
					<TouchableOpacity
						onPress={() => setIsAddExpanded(staleExpanded => !staleExpanded)}
						style={styles.buttonNewPositionExpander}>
						<Text style={styles.expanderText}>{isAddExpanded ? '-' : '+'} {LBL_ADD_NEW_POSITION}</Text>
					</TouchableOpacity>
					{isAddExpanded && <View>
						<View style={styles.newPositionInputContainer}>
							<TextInput
								onChangeText={text => setNewPositionTitle(text)}
								placeholder={PLACEHOLDER_NEW_POSITION_TITLE}
								style={styles.inputNewPositionName}
								value={newPositionTitle} />
							<TextInput
								onChangeText={text => setNewPositionPoints(text)}
								placeholder={PLACEHOLDER_NEW_POSITION_POINTS}
								style={styles.inputNewPositionPoints}
								value={newPositionPoints} />
						</View>
						<Button
							onPress={() => {
								props.addRole(new Position(newPositionTitle, parseInt(newPositionPoints, 10)))
								setNewPositionTitle(DEFAULT_TITLE)
								setNewPositionPoints(DEFAULT_POINTS)
							}}
							title={TITLE_ADD_POSITION} />
					</View>}
				</View>
				<Button
					color="#3a3"
					onPress={() => {
						persistPositionsData(props.roles)
						Platform.select({
							default: () => {
								Alert.alert(
									TITLE_POSITIONS_SAVED,
									MSG_POSITIONS_SAVED,
									[
										{
											onPress: () => { },
											text: MSG_OK
										}
									],
									{ cancelable: false }
								)
							},
							web: () => {
								alert(MSG_POSITIONS_SAVED)
							}
						})()
					}}
					title={TITLE_SAVE_POSITIONS} />
			</View>
		</ScrollView>
	)
}

(PositionsScreenDC as any).navigationOptions = {
	title: TITLE_POSITIONS
}

const styles = StyleSheet.create({
	buttonNewPositionExpander: { },
	centeredText: {
		textAlign: 'center'
	},
	container: {
		backgroundColor: '#fff',
		flex: 1,
		padding: 15
	},
	expanderText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	header: {
		fontSize: 16,
		textAlign: 'center'
	},
	inputNewPositionName: {
		borderColor: '#333',
		borderWidth: 1,
		height: 35,
		marginTop: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '80%'
	},
	inputNewPositionPoints: {
		borderColor: '#333',
		borderWidth: 1,
		height: 35,
		marginTop: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		width: '18%'
	},
	newPositionContainer: {
		borderColor: '#333',
		borderWidth: 1,
		marginBottom: 10,
		marginTop: 20,
		padding: 10
	},
	newPositionInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		width: '100%'
	},
	positionsDisplay: {
		borderColor: '#333',
		borderWidth: 1,
		margin: 10,
		padding: 10
	},
	positionsList: {
		marginBottom: 10
	}
})

const mapDispatchToProps = {
	addRole,
	deleteRole,
	setRoles
}

const mapStateToProps = (combinedReducers) => {
	const rolesReducer: IRolesReducerProps = combinedReducers.rolesReducer

	return { roles: rolesReducer.roles }
}

const PositionsScreen = connect(mapStateToProps, mapDispatchToProps)(PositionsScreenDC)

export { PositionsScreen }
