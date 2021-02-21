import { IPatientPrescriptions } from "./prescriptions";

export enum UserTypes {
    Patient = "Patient",
    GP = "GP",
    Pharmacist = "Pharmacist"
}

export interface IUser {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    type?: UserTypes;
}


export interface IBloodTest {
    date: string;
    result: string;
}


export class Patient {
    email!: string;
    password!: string;
    firstName?: string;
    lastName?: string;
    gps?: string[];
    bloodTest?: IBloodTest[];
    prescriptions?: IPatientPrescriptions;
}

export interface IPrescriptionRequest {
    pending: string[];
    accepted: string[];
    denied: string[];
}

export class GP {
    email!: string;
    firstName!: string;
    lastName!: string;
    patients!: string[];
    prescriptionRequests!: IPrescriptionRequest;
}
