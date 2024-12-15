'use strict'

import { ref, query, orderByChild, equalTo, get, set, remove } from "firebase/database"
import { db as firebaseDB } from '../../utils/firebase/config.js'
import UserDTO from "./UserDTO.js"
import User from "./User.js"
import ModelError from "../ModelError.js"

export default class UserDAO {
    static connectionPromise = null

    constructor() {
        this.getConnection()
    }

    async getConnection() {
        if (TaskDAO.connectionPromise === null) {
            TaskDAO.connectionPromise = new Promise(function (resolve, reject) {
                const db = firebaseDB
                if (db) {
                    resolve(db)
                } else {
                    reject(new ModelError('Could not establish a connection to the database'))
                }
            })
        }

        return UserDAO.connectionPromise
    }

    async getUserByUid(uid) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefUser = ref(connectionDB, 'users')
            let paramSearch = orderByChild('uid')
            let paramEqual = equalTo(uid)
            let search = query(dbRefUser, paramSearch, paramEqual)
            let searchResult = get(search)

            searchResult.then(dataSnapshot => {
                let data = dataSnapshot.val()

                if (data !== null) {
                    resolve(new User(data.uid, data.name, data.email))
                } else {
                    reject(null)
                }
            })
        })
    }

    async getUserByEmail(email) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefUser = ref(connectionDB, 'users')
            let paramSearch = orderByChild('email')
            let paramEqual = equalTo(email)
            let search = query(dbRefUser, paramSearch, paramEqual)
            let searchResult = get(search)

            searchResult.then(dataSnapshot => {
                let data = dataSnapshot.val()

                if (data !== null) {
                    resolve(new User(data.uid, data.name, data.email))
                } else {
                    reject(null)
                }
            })
        })
    }

    async add(user) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefUser = ref(connectionDB, 'users/' + task.getId())
            set(dbRefUser, new UserDTO(user)).then(
                () => resolve(true),
                (error) => reject(error)
            )
        })
    }

    async edit(user) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefUser = ref(connectionDB, 'users/' + task.getId())
            set(dbRefUser, new UserDTO(task)).then(
                () => resolve(true),
                (error) => reject(error)
            )
        })
    }

    async delete(user) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefUser = ref(connectionDB, 'user/' + task.getId())
            remove(dbRefUser).then(
                () => resolve(true),
                (error) => reject(error)
            )
        })
    }
}