export class AssessmentAspect {
    public id: string
    public name: string
    public aspect_type: string
    public aspect: string
    public number: number

    constructor(
        id: string,
        name: string,
        aspect_type: string,
        aspect: string,
        number: number
    ){
        this.id = id
        this.name = name
        this.aspect_type = aspect_type
        this.aspect = aspect
        this.number = number
    }
}