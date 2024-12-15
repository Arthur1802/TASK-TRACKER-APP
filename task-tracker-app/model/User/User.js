import ModelError from "../ModelError"

export default class User {
    #uid
    #username
    #email
    #role
    
    constructor(uid, username, email, role) {
        this.setUid(uid)
        this.setUsername(username)
        this.setEmail(email)
        this.setRole(role)
    }

    getUid() {
        return this.#uid
    }

    setUid(uid) {
        if (!this.validateUid(uid)) {
            throw new ModelError('Invalid uid')
        }
        this.#uid = uid
    }

    getUsername() {
        return this.#username
    }

    setUsername(username) {
        if (!this.validateUsername(username)) {
            throw new ModelError('Invalid username')
        }
        this.#username = username
    }

    getEmail() {
        return this.#email
    }

    setEmail(email) {
        if (!this.validateEmail(email)) {
            throw new ModelError('Invalid email')
        }
        this.#email = email
    }

    getRole() {
        return this.#role
    }

    setRole(role) {
        if (!this.validateRole(role)) {
            throw new ModelError('Invalid role')
        }
        this.#role = role
    }

    validateUid(uid) {
        return typeof uid === 'string' && uid.length > 0
    }

    validateUsername(username) {
        return typeof username === 'string' && username.length > 0
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return typeof email === 'string' && email.length > 0
    }

    validateRole(role) {
        return typeof role === 'string' && role.length > 0 && ['admin', 'user'].includes(role)
    }
}