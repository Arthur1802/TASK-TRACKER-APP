'use strict'

import { ref, query, orderByChild, equalTo, get, set, remove } from "firebase/database"
import { db as firebaseDB } from '../../utils/firebase/config.js'
import TaskDTO from "./TaskDTO.js"
import Task from "./Task.js"
import ModelError from "../ModelError.js"

export default class TaskDAO {
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

        return TaskDAO.connectionPromise
    }

    async getAllTasks() {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let arrayTasks = []
            let dbRefTasks = ref(connectionDB, 'tasks')
            let paramSearch = orderByChild('id')
            let search = query(dbRefTasks, paramSearch)

            get(search).then(
                (dataSnapshot) => {
                    dataSnapshot.forEach((dataSnapshotObj) => {
                        let elem = dataSnapshotObj.val()
                        arrayTasks.push(
                            new Task(
                                elem.id,
                                elem.createdDate,
                                elem.createdBy,
                                elem.title,
                                elem.startingDate,
                                elem.dueDate,
                                elem.description,
                                elem.status
                            )
                        )
                    })

                    resolve(arrayTasks)
                },
                (error) => reject(error)
            )
        })
    }

    async getTasksByUser(uid) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let arrayTasks = []
            let dbRefTasks = ref(connectionDB, 'tasks')
            let paramSearch = orderByChild('uid')
            let paramEqual = equalTo(uid)
            let search = query(dbRefTasks, paramSearch, paramEqual)
            let searchResult = get(search)

            searchResult.then(dataSnapshot => {
                let data = dataSnapshot.val()

                if (data !== null) {
                    resolve(new Task(data.id, data.createdBy, data.createdDate, data.title, data.startingDate, data.dueDate, data.description, data.status))
                } else {
                    reject(null)
                }
            })
        })
    }

    async add(task) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefTasks = ref(connectionDB, 'tasks/' + task.getId())
            set(dbRefTasks, new TaskDTO(task)).then(
                () => resolve(true),
                (error) => reject(error)
            )
        })
    }

    async edit(task) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefTasks = ref(connectionDB, 'tasks/' + task.getId())
            set(dbRefTasks, new TaskDTO(task)).then(
                () => resolve(true),
                (error) => reject(error)
            )
        })
    }

    async delete(task) {
        let connectionDB = await this.getConnection()

        return new Promise((resolve, reject) => {
            let dbRefTasks = ref(connectionDB, 'tasks/' + task.getId())
            remove(dbRefTasks).then(
                () => resolve(true),
                (error) => reject(error)
            )
        })
    }
}