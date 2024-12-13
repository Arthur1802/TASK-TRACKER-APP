import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useColorScheme } from 'react-native'

const Stack = createStackNavigator()

import Welcome from '../app/screens/welcome'
import Login from '../app/screens/login'
import Signin from '../app/screens/signin'
import EditTask from '../app/screens/editTask'
import DrawerNavigator from './drawerNavigation'

export default function StackNavigation() {
    const navigation = useNavigation()

    const theme = useColorScheme() ?? 'light'

    return (
        <Stack.Navigator
            screenOptions = {{
                headerTitleStyle: { fontFamily: 'poppins-semibold', fontSize: 20 },
                headerBackTitleVisible: false,
            }}
            initialRouteName = "welcome"
        >
            <Stack.Screen
                name = "welcome"
                component = { Welcome }
                options = {({ route }) => {
                    const previousRouteName = route.params?.from

                    let animationType = 'slide_from_left'

                    if (previousRouteName === 'home') {
                        animationType = 'fade'
                    } else {
                        animationType = 'slide_from_left'
                    }

                    return {
                        headerShown: false,
                        title: '',
                        animation: animationType,
                    }
                }}
            />
            <Stack.Screen
                name = "login"
                component = { Login }
                options = {{
                    headerTransparent: true,
                    title: ''
                }}
            />
            <Stack.Screen
                name = "signin"
                component = { Signin }
                options = {{
                    headerTransparent: true,
                    title: ''
                }}
            />

            <Stack.Screen
                name = "editTask"
                component = { EditTask }
                options = {{
                    headerTransparent: true,
                    title: '',
                    presentation: 'modal',
                    headerBackTitle: '',
                    headerBackImage: () => (
                        <Ionicons name = "chevron-down" size = {24} color = "#0a63ff" style = {{paddingLeft: 10}} onPress = {() => navigation.goBack()}/>
                    ),
                }}
            />

            <Stack.Screen
                name = "drawerNavigator"
                component = { DrawerNavigator }
                options = {{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}