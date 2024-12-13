import { View } from "react-native"
import { ThemedView as Div } from "../../components/ThemedView"
import { ThemedText as Text } from "../../components/ThemedText"
import { InputContainer as Input } from "../../components/InputContainer"

export default function EditTask() {
    return (
        <Div>
            <View>
                <Input
                    type = "title"
                />
            </View>
        </Div>
    )
}