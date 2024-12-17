import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { ThemedView as Div } from "../../components/ThemedView"
import { ThemedButton as Button } from "../../components/ThemedButton"
import { InputContainer as Input } from "../../components/InputContainer"
import { useState } from "react"
import { DatePicker } from "../../components/DatePicker"

export default function AddTask() {
    const [values, setValues] = useState({
        title: '',
        startingDate: '',
        dueDate: '',
        description: '',
    })

    const [showStartingDatePicker, setShowStartingDatePicker] = useState(false)

    const [showDueDatePicker, setShowDueDatePicker] = useState(false)

    const onChange = (key, value) => {
        setValues({
            ...values, [key]: value,
        })
    }


    const handleSubmit = () => {
        console.log(values)
    }

    return (
        <Div>
            <View style = { styles.menuContainer }>
                <Input
                    type = "title"
                    value = { values.title }
                    onChangeText = { (text) => onChange('title', text) }
                />

                {
                    Platform.OS === 'ios' ? (
                        <TouchableOpacity
                            onPress = { () => setShowStartingDatePicker(!showStartingDatePicker) }
                        >
                            <Input
                                type = "starting date"
                                value = { values.startingDate }
                                onChangeText = { (text) => onChange('startingDate', text) }
                                editable = { false }
                                pointerEvents = 'none'
                            />
                        </TouchableOpacity>
                    ) : (
                        <Input
                            type = "starting date"
                            value = { values.startingDate }
                            onChangeText = { (text) => onChange('startingDate', text) }
                        />
                    )
                }


                <DatePicker
                    showTrigger = { showStartingDatePicker }
                    to = "startingDate"
                    onChange = { onChange }
                    closeDatePicker = { () => setShowStartingDatePicker(false) }
                />
                
                {
                    Platform.OS === 'ios' ? (
                        <TouchableOpacity
                            onPress = { () => setShowDueDatePicker(!showDueDatePicker) }
                        >
                            <Input
                                type = "due date"
                                value = { values.dueDate }
                                onChangeText = { (text) => onChange('dueDate', text) }
                                editable = { false }
                                pointerEvents = 'none'
                            />
                        </TouchableOpacity>
                    ) : (
                        <Input
                            type = "due date"
                            value = { values.dueDate }
                            onChangeText = { (text) => onChange('dueDate', text) }
                        />
                    )
                }


                <DatePicker
                    showTrigger = { showDueDatePicker }
                    to = "dueDate"
                    onChange = { onChange }
                    closeDatePicker = { () => setShowDueDatePicker(false) }
                />

                <Input
                    type = "description"
                    value = { values.description }
                    onChangeText = { (text) => onChange('description', text) }
                />

                <Button
                    text = "Save"
                    onPress = { handleSubmit }
                />
            </View>
        </Div>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'cente',
        alignItems: 'flex-start',
        gap: 15,
        marginTop: Platform.OS === 'android' ? 100 : 50,
    },
    iosButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
})