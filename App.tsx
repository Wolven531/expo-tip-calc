import React from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center'
	}
})

// const App = () => {
export default function App() {
	return (
		<View style={styles.container}>
			<Text>Hello from the Expo app!</Text>
		</View>
	)
}

// export { App }
// export default App
