'use strict'

import { getDatabase, ref, query, orderByChild, equalTo, get, set, remove } from 'firebase/database'

import TaskDTO from './TaskDTO.js'
import ModelError from '../ModelError.js'
import Task from './Task.js'

export default class TaskDAO {
    static connectionPromise = null

    constructor() {
        this.getConnection()
    }

    async getConnection() {
        if (Task.connectionPromise === null) {
            Task.connectionPromise = new Promise(function (resolve, reject) {
                const db = getDatabase()

                if (db) {
                    resolve(db)
                } else {
                    reject(new ModelError('Could not stablish a connection to the database'))
                }
            })
        }

        return Task.connectionPromise
    }

    async getAllTasks() {
        let connectionDB = await this.getConnection()

        return new Promise ((resolve) => {
            let arrayTasks = []
            let dbRefTasks = ref(connectionDB, 'tasks')
            let paramSearch = orderByChild('id')
            let search = query(dbRefTasks, paramSearch)
            let result = get(search)

            result.then(dataSnapshot => {
                dataSnapshot.forEach(dataSnapshotObj => {
                    let elem = dataSnapshotObj.val()
                    arrayTasks.push(new Task(elem.id, elem.createdDate, elem.startingDate, elem.finishDate, elem.description, elem.status))
                })

                resolve(arrayTasks)
            }, (e) => console.log('#' + e))
        })
    }

    async add(task) {
        let connectionDB = await this.getConnection()

        let result = new Promise((resolve, reject) => {
            let dbRefTasks = ref(connectionDB, 'tasks/' + task.getId())
            let setPromise = set(dbRefTasks, new TaskDTO(taks))
            setPromise.then(() => { resolve(true) }, error => { reject(error) })
        })

        return result
    }

    async edit(task) {
        let connectionDB = await this.getConnection()

        let result = new Promise((resolve, reject) => {
            let dbRefTasks = ref(connectionDB, 'tasks/' + task.getId())
            let setPromise = set(dbRefTasks, new TaskDTO(taks))
            setPromise.then(() => { resolve(true) }, error => { reject(error) })
        })

        return result
    }

    async delete(task) {
        let connectionDB = this.getConnection()

        let result = new Promise((resolve, reject) => {
            let dbRefTasks = ref(connectionDB, 'tasks/' + task.getId())
            let setPromise = remove(dbRefTasks, new TaskDTO(taks))
            setPromise.then(() => { resolve(true) }, error => { reject(error) })
        })

        return result
    }
}