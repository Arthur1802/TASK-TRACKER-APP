export default class UserDTO {
    constructor(usr) {
        this.id = usr.id
        this.name = usr.name
        this.email = usr.email
        this.password = usr.password
        this.role = usr.role
    }
    
    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }

    getRole() {
        return this.role
    }
}