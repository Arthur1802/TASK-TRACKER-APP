// import { auth } from "./config"
import auth, { sendEmailVerification } from "@react-native-firebase/auth"
import { getDatabase, ref } from "firebase/database"
import Toast from "react-native-toast-message"
import AsyncStorage from '@react-native-async-storage/async-storage'

const db = getDatabase()

export async function getUserStatus() {
    try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn')

        if (userLoggedIn === 'true') {
            return true
        }
    } catch (error) {
        console.error(error)

        Toast.show({
            type: 'error',
            text1: 'Error getting user status',
            text2: error.message || 'An error occurred',
        })
    }

    return false
}

export async function Login(values) {
    const { email, password } = values

    if (validateEmail(email) && validatePassword(password)) {
        try {
            const userCred = await auth().signInWithEmailAndPassword(email, password)

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

                await AsyncStorage.setItem('userUid', user.uid)

                await AsyncStorage.setItem('userLoggedIn', 'true')

                return true
            }
                
        } catch ( error ) {
            console.error( error )

            Toast.show({
                type: 'error',
                text1: 'Error logging in',
                text2: error.message || 'An error occurred',
            })
        }
    }
}

export async function Signin(values) {
    const { name, email, password } = values

    if (validateEmail(email) && validatePassword(password)) {
        try {
            const userCred = await auth().createUserWithEmailAndPassword(email, password)

            const user = userCred.user

            await sendEmailVerification(user)

            await user.updateProfile({
                displayName: name,
            })

            const dbRefObj = ref(db, `users/${user.uid}`)
            await set(dbRefObj, {
                name: name,
                email: email,
            })

            await AsyncStorage.setItem('userUid', user.uid)

            return true
        } catch (error) {
            console.error(error)

            Toast.show({
                type: 'error',
                text1: 'Error signing in',
                text2: error.message || 'An error occurred',
            })
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

function validatePassword(password) {
    return password.length >= 6
}