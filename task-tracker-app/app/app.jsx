import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { useLogger } from '@react-navigation/devtools'
import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import * as Font from 'expo-font'
import { enableScreens } from 'react-native-screens';
import StackNavigation from '../navigation/stackNavigation'
import { useColorScheme } from 'react-native'

enableScreens()

const fetchFonts = () => {
    return Font.loadAsync({
        'popping-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    })
}

const getTheme = () => {
    return useColorScheme() || 'light'
}

const toastConfig = {
    warning: (props) => (
        <BaseToast
            {...props}
            style = {{ borderLeftColor: 'yellow', backgroundColor: getTheme()  ===  'dark' ? '#232323' : '#f5f5f5' }}
            contentContainerStyle = {{ paddingHorizontal: 15 }}
            text1Style = {{ fontSize: 15, color: getTheme()  ===  'dark' ? 'white' : 'black' }}
            text2Style = {{ fontSize: 13, color: getTheme()  ===  'dark' ? 'white' : 'black' }}
        />
    ),
    error: (props)  => (
        <ErrorToast
            {...props}
            style = {{ borderLeftColor: 'red', backgroundColor: getTheme()  ===  'dark' ? '#232323' : '#f5f5f5' }}
            contentContainerStyle = {{ paddingHorizontal: 15 }}
            text1Style = {{ fontSize: 15, color: getTheme()  ===  'dark' ? 'white' : 'black' }}
            text2Style = {{ fontSize: 13, color: getTheme()  ===  'dark' ? 'white' : 'black' }}
        />
    ),
    success: (props)  => (
        <BaseToast
            {...props}
            style = {{ borderLeftColor: 'green', backgroundColor: getTheme()  ===  'dark' ? '#232323' : '#f5f5f5' }}
            contentContainerStyle = {{ paddingHorizontal: 15 }}
            text1Style = {{ fontSize: 15, color: getTheme()  ===  'dark' ? 'white' : 'black' }}
            text2Style = {{ fontSize: 13, color: getTheme()  ===  'dark' ? 'white' : 'black' }}
        />
    )
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    const navigationRef = useNavigationContainerRef()

    useLogger(navigationRef)

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await SplashScreen.preventAutoHideAsync()
                setTimeout(async () => {
                    await fetchFonts()
                }, 2000)
            } catch (e) {
                console.warn(e)
            } finally {
                setIsReady(true)
                SplashScreen.hideAsync()
            }
        };

        prepareApp()
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <>
            <NavigationContainer ref = { navigationRef }>
                <StackNavigation />
            </NavigationContainer>
            <Toast config = { toastConfig } />
        </>
    )
}