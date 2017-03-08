export interface CustomerLogin{
    email: string;
    password: string;
}

export interface CustomerRegister{
    firstname: string,
    lastname: string,
    email: string;
    password: string;
    confirmpassword: string;
}

export interface customerAccountInformation{
    firstname: string;
    lasstname: string;
    email: string;
    gender: string;
    mobile: number;
}