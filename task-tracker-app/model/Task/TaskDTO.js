export default class TaskDTO {
    constructor(tsk) {
        this.id = tsk.getId()
        this.createdBy = tsk.getCreatedBy()
        this.createdDate = tsk.getCreatedDate()
        this.title = tsk.getTitle()
        this.startingDate = tsk.getStartingDate()
        this.finishDate = tsk.getFinishDate()
        this.description = tsk.getDescription()
        this.status = tsk.getStatus()
    }

    getId() {
        return this.id
    }

    getCreatedBy() {
        return this.createdBy
    }

    getCreatedDate() {
        return this.createdDate
    }

    getTitle() {
        return this.title
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