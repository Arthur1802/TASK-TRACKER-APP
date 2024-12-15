import { auth } from "./config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { DataSnapshot, getDatabase, ref } from "firebase/database"
import Toast from "react-native-toast-message"

const db = getDatabase()

export async function Login(values) {
    const { name, email, password } = values

    if (validateName && validateEmail && validatePassword) {
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password)

            const user = userCred.user

            const dbRefObj = ref(db, `users/${user.uid}`)
            const dataSnapshot = await get(query(dbRefObj))

            if (dataSnapshot.exists()) {
                if (!user.emailVerified) {
                    await sendEmailVerification(user)

                    Toast.show({
                        type: 'warning',
                        text1: 'Email not verified',
                        text2: 'Please verify your email address',
                    })
                }

                return true
            }
                
        } catch ( error ) {
            console.error( error )
        }
    }
}