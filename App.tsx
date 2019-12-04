// import { ConnectedRouter } from 'connected-react-router'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
// import { createBrowserHistory } from 'history'
import React, { useState } from 'react'
import {
	Platform,
	StatusBar,
	StyleSheet,
	View
} from 'react-native'
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import AppNavigator from './navigation/AppNavigator'

import { configureStore } from './redux/store/configureStore'

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false)

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		)
	}

	// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
	// const history = createBrowserHistory({ basename: baseUrl })
	// const store = configureStore(history)
	const store = configureStore({})

	return (
		<Provider store={store}>
			{/* <ConnectedRouter history={history}> */}
				<View style={styles.container}>
					{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
					<AppNavigator />
				</View>
			{/* </ConnectedRouter> */}
		</Provider>
	)
}

async function loadResourcesAsync() {
	await Promise.all([
		Asset.loadAsync([
			require('./assets/images/robot-dev.png'),
			require('./assets/images/robot-prod.png')
		]),
		Font.loadAsync({
			// This is the font that we are using for our tab bar
			...Ionicons.font,
			// We include SpaceMono because we use it in HomeScreen.js. Feel free to
			// remove this if you are not using it in your app
			'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
		})
	])
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	}
})
