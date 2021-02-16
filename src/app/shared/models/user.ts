export enum UserTypes {
    Patient = "patient",
    Pharmacist = "pharmacist",
    Unknown = "na"
}

export interface IUser {
    email: string;
    password: string;
    type: UserTypes;
}