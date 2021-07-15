export class Evaluation {
    public id: string
    public application_assessment: string
    public equipment: number
    public system: number
    public efficiency: number
    public remarks: string

    constructor(
        id: string,
        application_assessment: string,
        equipment: number,
        system: number,
        efficiency: number,
        remarks: string
    ){
        this.id = id
        this.application_assessment = application_assessment
        this.equipment = equipment
        this.system = system
        this.efficiency = efficiency
        this.remarks = remarks
    }
}