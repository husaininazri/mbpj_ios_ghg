export class Rebate {
    public id: string
    public application_id: string
    public approved_date: string
    public payment_date: string
    public amount_approved: number

    constructor(
        id: string,
        application_id: string,
        payment_date: string,
        amount_approved: number
    ){
        this.id = id
        this.application_id = application_id
        this.payment_date = payment_date
        this.amount_approved = amount_approved
    }
}