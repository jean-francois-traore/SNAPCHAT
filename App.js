import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getItemAsync, deleteItemAsync } from 'expo-secure-store';
import { HomeLog, Register, Login, Message, Context, HomeCamera, SeeSnap} from './components';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const options = {
	stack: {
		headerShown: false
	},
	tab: {
		gestureEnabled: true,
		unmountOnBlur: true
	}
}

export default function App() {
	const [token, setToken] = useState(null);
	const context = {
		token,
		setToken,
		colorsArray: [
			'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  	'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  	'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  	'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  	'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  	'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  	'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  	'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  	'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  	'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
		]
	}

	useEffect(() => {
		(async () => {
			// await deleteItemAsync('token');
			try {
				let token = await getItemAsync('token');
				setToken(token);
			} catch (e) {
				console.log(e)
			}
		})()
	}, [])

	return (
		<Context.Provider value={{ ...context }}>
			<NavigationContainer>
				{!token ? (
				<Stack.Navigator initialRouteName="Home" screenOptions={options.stack}>
					<Stack.Screen name="Home" component={HomeLog}/>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />
				</Stack.Navigator>
				):(
				<Tab.Navigator initialRouteName="Camera" screenOptions={options.tab} tabBar={() => <></>}>
					<Tab.Screen name="Message" component={Message}/>
					<Tab.Screen name="Camera" component={HomeCamera} />
				</Tab.Navigator>
				)}
				
			</NavigationContainer>
		</Context.Provider>
	);
}
