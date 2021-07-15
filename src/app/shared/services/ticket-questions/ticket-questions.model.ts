export class TicketQuestion {
    public id: string
    public question: string
    public submitted_by: string
    public status: string
    public date_submitted: string

    constructor(
        id: string,
        question: string,
        submitted_by: string,
        status: string,
        date_submitted: string
    ){
        this.id = id
        this.question = question
        this.submitted_by = submitted_by
        this.status = status
        this.date_submitted = date_submitted
    }
}