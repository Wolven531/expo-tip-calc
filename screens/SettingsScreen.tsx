import React, { FC } from 'react'
import { ExpoConfigView } from '@expo/samples'

const SettingsScreen: FC<any> = (props) => {
	return <ExpoConfigView />
};

(SettingsScreen as any).navigationOptions = {
	title: 'app.json',
}

export { SettingsScreen }
