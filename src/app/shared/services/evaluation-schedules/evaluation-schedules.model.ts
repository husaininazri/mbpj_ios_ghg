export class EvaluationSchedule {
    public id: string
    public application: string
    public date: string
    public session: string

    constructor(
        id: string,
        application: string,
        date: string,
        session: string
    ){
        this.id = id
        this.application = application
        this.date = date
        this.session = session
    }
}