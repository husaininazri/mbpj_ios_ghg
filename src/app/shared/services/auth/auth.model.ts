export class User {
    public id: string
    public full_name: string
    public new_nric: string
    public old_nric: string
    public phone: string
    public tel: string
    public email: string
    public gender: string
    public occupation: string
    public nric_picture: string
    public relationship_status: string
    public profile_picture: string
    public user_type: string
    public is_active: boolean
    public date_joined: string

    constructor(
        id: string,
        full_name: string,
        new_nric: string,
        old_nric: string,
        phone: string,
        tel: string,
        email: string,
        gender: string,
        occupation: string,
        nric_picture: string,
        relationship_status: string,
        profile_picture: string,
        user_type: string,
        is_active: boolean,
        date_joined: string
    ){
        this.id = id
        this.full_name = full_name
        this.new_nric = new_nric
        this.old_nric = old_nric
        this.phone = phone
        this.tel = tel
        this.email = email
        this.gender = gender
        this.occupation = occupation
        this.nric_picture = nric_picture
        this.relationship_status = relationship_status
        this.profile_picture = profile_picture
        this.user_type = user_type
        this.is_active = is_active
        this.date_joined = date_joined
    }
}

export class UserOccupation {
    public id: string
    public name: string

    constructor(
        id: string,
        name: string
    ){
        this.id = id
        this.name = name
    }
}

export class TokenResponse {
    public refresh: string
    public access: string
    constructor(
        refresh: string,
        access: string
    ){
        this.refresh = refresh
        this.access = access
    }
}

export class Registration {
    public username: string
    public email: string
    public password1: string
    public password2: string
    constructor(
        username: string,
        email: string,
        password1: string,
        password2: string
    ){
        this.username = username
        this.email = email
        this.password1 = password1
        this.password2 = password2
    }
}