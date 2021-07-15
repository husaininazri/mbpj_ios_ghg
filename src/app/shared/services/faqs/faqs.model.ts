export class Faq {
    public id: string
    public question: string
    public answer: string
    public created_at: string
    public updated_at: string

    constructor(
        id: string,
        question: string,
        answer: string,
        created_at: string,
        updated_at: string
    ){
        this.id = id
        this.question = question
        this.answer = answer
        this.created_at = created_at
        this.updated_at = updated_at
    }
}