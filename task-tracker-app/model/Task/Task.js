import ModelError from '../ModelError'

export default class Task {
    #id
    #createdDate
    #startingDate
    #finishingDate
    #description
    #status

    constructor(id, createdDate, startingDate, finishingDate, description, status) {
        this.setId(id)
        this.setCreatedDate(createdDate)
        this.setStartingDate(startingDate)
        this.setFinishingDate(finishingDate)
        this.setDescription(description)
        this.setStatus(status)
    }

    getId() {
        return this.#id
    }

    setId(id) {
        if (!this.validateId(id)) {
            throw new ModelError('Invalid id')
        }
        this.#id = id
    }

    getCreatedDate() {
        return this.#createdDate
    }

    setCreatedDate(createdDate) {
        if (!this.validateDate(createdDate)) {
            throw new ModelError('Invalid created date')
        }
        this.#createdDate = createdDate
    }

    getStartingDate() {
        return this.#startingDate
    }

    setStartingDate(startingDate) {
        if (!this.validateDate(startingDate)) {
            throw new ModelError('Invalid starting date')
        }
        this.#startingDate = startingDate
    }

    getFinishingDate() {
        return this.#finishingDate
    }

    setFinishingDate(finishingDate) {
        if (!this.validateDate(finishingDate)) {
            throw new ModelError('Invalid finishing date')
        }
        this.#finishingDate = finishingDate
    }

    getDescription() {
        return this.#description
    }

    setDescription(description) {
        if (!this.validateDescription(description)) {
            throw new ModelError('Invalid description')
        }
        this.#description = description
    }

    getStatus() {
        return this.#status
    }

    setStatus(status) {
        if (!this.validateStatus(status)) {
            throw new ModelError('Invalid status')
        }
        this.#status = status
    }

    validateId(id) {
        return !!id // Verifica se o id é válido (não é nulo ou vazio)
    }

    validateDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
        return regex.test(date)
    }

    validateDescription(description) {
        return !!description // Verifica se a descrição não é nula ou vazia
    }

    validateStatus(status) {
        return !!status // Verifica se o status não é nulo ou vazio
    }

    show() {
        let output = 'Task: ' + this.getId() + '\n'
        output += 'Created Date: ' + this.getCreatedDate() + '\n'
        output += 'Starting Date: ' + this.getStartingDate() + '\n'
        output += 'Finishing Date: ' + this.getFinishingDate() + '\n'
        output += 'Description: ' + this.getDescription() + '\n'
        output += 'Status: ' + this.getStatus() + '\n'
        return output
    }
}