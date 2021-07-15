export class Organisation {
    public id: string
    public name: string
    public client_type: string

    constructor(
        id: string,
        name: string,
        client_type: string
    ){
        this.id = id
        this.name = name
        this.client_type = client_type
    }
}