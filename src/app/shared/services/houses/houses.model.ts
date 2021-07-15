export class House {
    public id: string
    public applicant: string
    public address: string
    public postcode: string
    public area: string
    public assessment_tax_account: string
    public assessment_tax_doc: string
    public building_type: string
    public staying_duration_years: number
    public staying_duration_months: number
    public permanent_occupant: number
    public vehicle_car: number
    public vehicle_motorcycle: number
    public vehicle_bicycle: number
    public vehicle_other: number
    public electricity_bill_1_month: string
    public electricity_bill_1_usage: number
    public electricity_bill_1_doc: string
    public electricity_bill_2_month: string
    public electricity_bill_2_usage: number
    public electricity_bill_2_doc: string
    public electricity_bill_3_month: string
    public electricity_bill_3_usage: number
    public electricity_bill_3_doc: string
    public water_bill_1_month: string
    public water_bill_1_usage: number
    public water_bill_1_doc: string
    public water_bill_2_month: string
    public water_bill_2_usage: number
    public water_bill_2_doc: string
    public water_bill_3_month: string
    public water_bill_3_usage: number
    public water_bill_3_doc: string

    constructor(
        id: string,
        applicant: string,
        address: string,
        postcode: string,
        area: string,
        assessment_tax_account: string,
        assessment_tax_doc: string,
        building_type: string,
        staying_duration_years: number,
        staying_duration_months: number,
        permanent_occupant: number,
        vehicle_car: number,
        vehicle_motorcycle: number,
        vehicle_bicycle: number,
        vehicle_other: number,
        electricity_bill_1_month: string,
        electricity_bill_1_usage: number,
        electricity_bill_1_doc: string,
        electricity_bill_2_month: string,
        electricity_bill_2_usage: number,
        electricity_bill_2_doc: string,
        electricity_bill_3_month: string,
        electricity_bill_3_usage: number,
        electricity_bill_3_doc: string,
        water_bill_1_month: string,
        water_bill_1_usage: number,
        water_bill_1_doc: string,
        water_bill_2_month: string,
        water_bill_2_usage: number,
        water_bill_2_doc: string,
        water_bill_3_month: string,
        water_bill_3_usage: number,
        water_bill_3_doc: string
    ){
        this.id = id
        this.applicant = applicant
        this.address = address
        this.postcode = postcode
        this.area = area
        this.assessment_tax_account = assessment_tax_account
        this.assessment_tax_doc = assessment_tax_doc
        this.building_type = building_type
        this.staying_duration_years = staying_duration_years
        this.staying_duration_months = staying_duration_months
        this.permanent_occupant = permanent_occupant
        this.vehicle_car = vehicle_car
        this.vehicle_motorcycle = vehicle_motorcycle
        this.vehicle_bicycle = vehicle_bicycle
        this.vehicle_other = vehicle_other
        this.electricity_bill_1_month = electricity_bill_1_month
        this.electricity_bill_1_usage = electricity_bill_1_usage
        this.electricity_bill_1_doc = electricity_bill_1_doc
        this.electricity_bill_2_month = electricity_bill_2_month
        this.electricity_bill_2_usage = electricity_bill_2_usage
        this.electricity_bill_2_doc = electricity_bill_2_doc
        this.electricity_bill_3_month = electricity_bill_3_month
        this.electricity_bill_3_usage = electricity_bill_3_usage
        this.electricity_bill_3_doc = electricity_bill_3_doc
        this.water_bill_1_month = water_bill_1_month
        this.water_bill_1_usage = water_bill_1_usage
        this.water_bill_1_doc = water_bill_1_doc
        this.water_bill_2_month = water_bill_2_month
        this.water_bill_2_usage = water_bill_2_usage
        this.water_bill_2_doc = water_bill_2_doc
        this.water_bill_3_month = water_bill_3_month
        this.water_bill_3_usage = water_bill_3_usage
        this.water_bill_3_doc = water_bill_3_doc
    }
}