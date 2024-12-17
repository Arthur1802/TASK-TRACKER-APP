import React, { useEffect, useState } from 'react'
import { ThemedText as Text } from '../components/ThemedText'
import { ThemedView as Div } from '../components/ThemedView'
import { ActivityIndicator, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'

const Stack = createStackNavigator()

import Welcome from '../app/screens/welcome'
import Login from '../app/screens/login'
import Signin from '../app/screens/signin'
import Home from '../app/screens/index'
import Profile from '../app/screens/profile'
import EditTask from '../app/screens/editTask'
import AddTask from '../app/screens/addTask'
import { SymbolView } from 'expo-symbols'

export default function StackNavigation() {
    const navigation = useNavigation()

    const theme = useColorScheme() ?? 'light'

    const[initializing, setInitializing] = useState(true)

    const [user, setUser] = useState(null)

    const onAuthStateChanged = (user) => {
        console.log('onAuthStateChanged', user)
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return () => subscriber()
    }, [])

    useEffect(() => {
        if (initializing) return

        const currentRoute = navigation.getState().routes[navigation.getState().index]?.name
    const mainPage = currentRoute === 'main'


        if (user && !mainPage) {
            navigation.navigate('main', { user })
        } else if (!user && mainPage) {
            navigation.navigate('welcome')
        }

    }, [user, initializing])
    
    if (initializing) {
        return (
            <Div>
                <View>
                    <ActivityIndicator size = "large" />
                    <Text>Loading...</Text>
                </View>
            </Div>
        )
    } else {
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
                    name = "main"
                    component = { Home }
                    options = {{
                        headerShown: true,
                        headerTitle: 'Home',
                        gestureEnabled: false,
                        animation: 'fade',
                        headerStyle: {
                            backgroundColor: theme === 'light' ? '#fff' : '#000',
                            shadowColor: 'transparent',
                            elevation: 0,
                        },
                        headerTintColor: theme === 'light' ? '#000' : '#fff',
                        headerLeft: () => (
                            Platform.OS === 'ios' ? (
                                <TouchableOpacity
                                    onPress = {() => navigation.navigate('Profile')}
                                >
                                    <SymbolView name = "checkmark.circle" size = {28} tintColor = {theme === "dark" ? "#fff" : "#000"} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress = {() => navigation.navigate('Profile')}
                                >
                                    <Ionicons name = "checkmark-circle-outline" size = {24} color = {theme === "dark" ? "#fff" : "#000"} style = {{paddingRight: 10}}/>
                                </TouchableOpacity>
                            )
                        ),
                        headerRight: () => (
                            Platform.OS === 'ios' ? (
                                <TouchableOpacity
                                    onPress = {() => navigation.navigate('Profile')}
                                >
                                    <SymbolView name = "person.circle" size = {28} tintColor = {theme === "dark" ? "#fff" : "#000"} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress = {() => navigation.navigate('Profile')}
                                >
                                    <Ionicons name = "person" size = {24} color = {theme === "dark" ? "#fff" : "#000"} style = {{paddingRight: 10}}/>
                                </TouchableOpacity>
                            )
                        )
                    }}
                />
    
    
                <Stack.Screen
                    name = "Profile"
                    component = { Profile }
                    options = {{
                        presentation: 'modal',
                        headerStyle: {
                            backgroundColor: theme === 'light' ? '#fff' : '#000',
                            shadowColor: 'transparent',
                            elevation: 0,
                        },
                        headerTintColor: theme === 'light' ? '#000' : '#fff',
                        headerBackTitle: '',
                        headerBackImage: () => (
                            <Ionicons name = "chevron-down" size = {24} color = "#0a63ff" style = {{paddingLeft: 10}} onPress = {() => navigation.goBack()}/>
                        ),
                    }}
                />
                
                <Stack.Screen
                    name = "editTask"
                    component = { EditTask }
                    options = {{
                        headerTransparent: true,
                        title: 'Edit Task',
                        presentation: 'modal',
                        headerBackTitle: '',
                        headerTintColor: theme === 'light' ? '#000' : '#fff',
                        headerBackImage: () => (
                            <Ionicons name = "chevron-down" size = {24} color = "#0a63ff" style = {{paddingLeft: 10}} onPress = {() => navigation.goBack()}/>
                        ),
                    }}
                />
                
                <Stack.Screen
                    name = "addTask"
                    component = { AddTask }
                    options = {{
                        headerTransparent: true,
                        title: 'Add Task',
                        presentation: 'modal',
                        headerBackTitle: '',
                        headerTintColor: theme === 'light' ? '#000' : '#fff',
                        headerBackImage: () => (
                            <Ionicons name = "chevron-down" size = {24} color = "#0a63ff" style = {{paddingLeft: 10}} onPress = {() => navigation.goBack()}/>
                        ),
                    }}
                />
            </Stack.Navigator>
        )
    }

}