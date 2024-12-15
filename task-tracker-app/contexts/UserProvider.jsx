import React, { createContext, useContext, useEffect, useState } from "react"
import { Login } from "../utils/firebase/auth"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const logUser = (values) => {
        setCurrentUser(Login(values))
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value = {value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}