import { StyleSheet, View } from 'react-native'
import { ThemedText as Text } from '../../components/ThemedText'
import { ThemedView as Div } from '../../components/ThemedView'
import { ThemedButton as Button } from '../../components/ThemedButton'
import { InputContainer } from '../../components/InputContainer'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export default function LoginScreen() {
    const navigation = useNavigation()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }))
    }
    
    return (
        <Div>
            <View style = { styles.signinContainer }>
                <Text type = 'title' fontWeight = 'semibold'>Sign In</Text>

                <InputContainer type = 'name' onChangeText = { (text) => handleInputChange('name', text) } value = { values.name} />

                <InputContainer type = 'email' onChangeText = { (text) => handleInputChange('email', text) } value = { values.email } />

                <InputContainer type = 'password' onChangeText = { (text) => handleInputChange('password', text) } value = { values.password } />

                <InputContainer type = 'confirm password' onChangeText = { (text) => handleInputChange('confirmPassword', text) } value = { values.confirmPassword } />

                <Button
                    text = 'Sign In'
                    onPress = { () => handleSignin() }
                />

                <Text
                    type = 'link'
                    onPress = { () => navigation.navigate('login') }
                >
                    Already have an account? Log in
                </Text>
            </View>
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