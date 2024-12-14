import ModelError from '../ModelError'

export default class Task {
    #id
    #createdBy
    #createdDate
    #title
    #startingDate
    #dueDate
    #description
    #status

    constructor(id, createdBy, createdDate, title, startingDate, dueDate, description, status) {
        this.setId(id)
        this.setCreatedBy(createdBy)
        this.setCreatedDate(createdDate)
        this.setTitle(title)
        this.setStartingDate(startingDate)
        this.setFinishingDate(dueDate)
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

    getCreatedBy() {
        return this.#createdBy
    }

    setCreatedBy(createdBy) {
        if (!this.validateCreatedBy(createdBy)) {
            throw new ModelError('Invalid created by')
        }
        this.#createdBy = createdBy
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

    getTitle() {
        return this.#title
    }

    setTitle(title) {
        if (!this.validateDescription(title)) {
            throw new ModelError('Invalid title')
        }
        this.#title = title
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
        return this.#dueDate
    }

    setFinishingDate(dueDate) {
        if (!this.validateDate(dueDate)) {
            throw new ModelError('Invalid due date')
        }
        this.#dueDate = dueDate
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

    validateCreatedBy(createdBy) {
        return !!createdBy // Verifica se o criador não é nulo ou vazio
    }

    validateDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
        return regex.test(date)
    }

    validateTitle(title) {
        return !!title // Verifica se o título não é nulo ou vazio
    }

    validateDescription(description) {
        return !!description // Verifica se a descrição não é nula ou vazia
    }

    validateStatus(status) {
        return !!status // Verifica se o status não é nulo ou vazio
    }

    show() {
        let output = 'Task: ' + this.getId() + '\n'
        output += 'Created By: ' + this.getCreatedBy() + '\n'
        output += 'Created Date: ' + this.getCreatedDate() + '\n'
        output += 'Starting Date: ' + this.getStartingDate() + '\n'
        output += 'Finishing Date: ' + this.getFinishingDate() + '\n'
        output += 'Description: ' + this.getDescription() + '\n'
        output += 'Status: ' + this.getStatus() + '\n'
        return output
    }
}