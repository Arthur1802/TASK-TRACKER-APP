import { Platform, Pressable, StyleSheet, Touchable, TouchableOpacity, View } from "react-native"
import { ThemedView as Div } from "./ThemedView"
import { ThemedText as Text } from "./ThemedText"
import { ThemedButton as Button } from "./ThemedButton"
import { InputContainer as Input } from "./InputContainer"
import { useState } from "react"
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker"

export function DatePicker({ onChange, to, showTrigger, closeDatePicker }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    
    function AndroidDatePicker() {
        const openDatePicker = () => {
            DateTimePickerAndroid.open({
                value: currentDate,
                date: currentDate,
                mode: 'date',
                onChange: (_, date) => {
                    if (date) {
                        setCurrentDate(date)
                        onChange(to, currentDate.toDateString())
                    }
                }
            })
        }

        return (
            <View style = {{
                width: '100%',
            }}>
                <Button
                    type = "secondary"
                    text = "Open calendar"
                    onPress = { openDatePicker }
                />
            </View>
        )
    }

    function IOSDatePicker() {
        const handleCancel = () => {
            onChange(to, '')
            setCurrentDate(new Date())
            closeDatePicker()
        }

        const handleConfirm = () => {
            onChange(to, currentDate.toDateString())
            closeDatePicker()
        }

        return (
            <View style = { styles.datePickerContainer }>
                {
                    showTrigger && (
                        <>
                            <DateTimePicker
                                value = { currentDate }
                                mode = 'date'
                                display = 'spinner'
                                onChange = { (_, date) => {
                                    if (date) {
                                        setCurrentDate(date)
                                        console.log(date)
                                        onChange(to, date.toDateString())
                                    }
                                } }
                            />
                            <View style = { styles.iosButtons}>
                                <TouchableOpacity
                                    onPress = { handleCancel }
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress = { handleConfirm }
                                >
                                    <Text>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </>

                    )
                }
            </View>
        )
    }

    if (Platform.OS === "android") {
        return (
            <AndroidDatePicker />
        )
    } else {
        return (
            <IOSDatePicker />
        )
    }
}

const styles = StyleSheet.create({
    datePickerContainer: {
        width: '100%',
    },
    iosButtons: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 'auto',
    }
})