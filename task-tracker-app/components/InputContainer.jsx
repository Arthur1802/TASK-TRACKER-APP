import { StyleSheet, View, TextInput, useColorScheme } from 'react-native'
import { capitalize } from '../utils/functions' 
import { Ionicons } from '@expo/vector-icons'

export function InputContainer({ type, onChangeText, value, ...otherProps }) {
    const placeholder = capitalize(type)
    
    const theme = useColorScheme() ?? 'light'

    return (
        <View style = {[ styles.inputContainers, { borderColor: theme === 'dark' ? '#ddd' : '#000' } ]}>
            {
                type === 'description' ? (
                    <TextInput
                        style = {[ styles.textArea, { color: theme === 'dark' ? '#fff' : '#000'} ]}
                        placeholder = { placeholder }
                        placeholderTextColor = { theme === 'dark' ? '#aaa' : '#888' }
                        onChangeText = { onChangeText }
                        multiline = { true }
                        numberOfLines = { 4 }
                        { ...otherProps }
                        />
                    ) : (
                        <>
                        <TextInput
                            style = {[ styles.input, { color: theme === 'dark' ? '#fff' : '#000'} ]}
                            placeholder = { placeholder } 
                            placeholderTextColor = { theme === 'dark' ? '#aaa' : '#888' }
                            onChangeText = { onChangeText }
                            secureTextEntry = { type === 'password' || type === 'confirm password' ? true : false }
                            value = {value}
                            { ...otherProps }
                        />
                        { type === 'password' && <Ionicons name = 'eye' size = { 24 } color = {theme === 'dark' ? '#fff' : '#000'} /> }
                        { type === 'confirm password' && <Ionicons name = 'eye' size = { 24 } color = {theme === 'dark' ? '#fff' : '#000'} /> }
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainers: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        fontSize: 16
    },
    textArea: {
        flex: 1,
        fontSize: 16,
        textAlignVertical: 'top',
        height: 100
    }
})