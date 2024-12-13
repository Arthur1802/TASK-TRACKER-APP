export default class TaskDTO {
    constructor(tsk) {
        this.id = tsk.getId()
        this.createdDate = tsk.getCreatedDate()
        this.startingDate = tsk.getStartingDate()
        this.finishDate = tsk.getFinishDate()
        this.description = tsk.getDescription()
        this.status = tsk.getStatus()
    }

    getId() {
        return this.id
    }

    getCreatedDate() {
        return this.createdDate
    }

    getStartingDate() {
        return this.startingDate
    }

    getFinishDate() {
        return this.finishDate
    }

    getDescription() {
        return this.description
    }

    getStatus() {
        return this.status
    }
}