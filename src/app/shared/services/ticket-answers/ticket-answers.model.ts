export class TicketAnswer {
    public id: string
    public question_id: string
    public answer: string
    public submitted_by: string
    public date_submitted: string

    constructor(
        id: string,
        question_id: string,
        answer: string,
        submitted_by: string,
        date_submitted: string
    ){
        this.id = id
        this.question_id = question_id
        this.answer = answer
        this.submitted_by = submitted_by
        this.date_submitted = date_submitted
    }
}