import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import { ThemedView as Div } from '../../components/ThemedView'
import { ThemedText as Text } from '../../components/ThemedText'
import { ThemedButton as Button } from '../../components/ThemedButton'
import { InputContainer } from '../../components/InputContainer'
import { logUser } from '../../contexts/UserProvider'
import { useNavigation } from '@react-navigation/native'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { Login } from '../../utils/firebase/auth'
import Toast from 'react-native-toast-message'

export default function SignInScreen() {
    const theme = useColorScheme() ?? 'light'

    const [loading1, setLoading1] = useState(false)
    
    const [loading2, setLoading2] = useState(false)

    const navigation = useNavigation()

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleLogin = async () => {
        if (!loading1) {
            setLoading1(true)
        }
        
        setTimeout( async () => {
            try {
                const result = await Login(values)
    
                if (result) {
                    Toast.show({
                        type: 'success',
                        text1: 'Logged in successfully'
                    })
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading1(false)
            }
        }, 1500)
    }

    const renderScreen = (route) => {
        setLoading2(true)
        setTimeout(() => {
            navigation.navigate(route, {
                drawer: 'home'
            })
            setLoading2(false)
        }, 2000)
    }

    return (
        <Div>
            { 
                loading2 ? (
                    <View
                        style = {{
                            width: '100%',
                            height: '100%',
                            backgroundColor: theme === 'dark' ? '#111111' : '#f5f5f5',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 20
                        }}
                    >
                        <ActivityIndicator
                            size = 'large'
                            color = { theme === 'dark' ? '#fff' : '#000' }
                        />
                        <Text type = "title" fontWeight = "semibold">
                            Logging in...
                        </Text>
                    </View>
                ) : (
                    <View style = { styles.signinContainer }>
                        <Text type = 'title' fontWeight = 'semibold'>Log In</Text>

                        <InputContainer type = 'email' onChangeText = {(text) => handleInputChange('email', text)} value = {values.email} />

                        <InputContainer type = 'password' onChangeText = {(text) => handleInputChange('password', text)} value = {values.password} />

                        <Text type = 'link'>Forgot password?</Text>

                        <Button
                            text = 'Log In'
                            onPress = { handleLogin }
                            loading = { loading1 }
                        />

                        <Text
                            type = 'link'
                            onPress = {() => navigation.navigate('signin')}
                        >
                            Don't have an account? Sign in
                        </Text>

                        <Button
                            text = 'Backdoor entrance... '
                            onPress = { () => renderScreen('main') }
                        >
                            <SymbolView name = "arrow.turn.down.right" size = {28} tintColor = "#fff" />
                        </Button>
                    </View>
                )
            }
        </Div>
    )
}

const styles = StyleSheet.create({
    signinContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },
    inputContainers: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10
    },
    input: {
        flex: 1,
        fontSize: 16
    }
})