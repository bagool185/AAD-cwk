import { JsonProperty } from "json-typescript-mapper";

export enum UserTypes {
    Patient = "patient",
    GP = "gp",
    Pharmacist = "pharmacist",
    Unknown = "na"
}

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    type?: UserTypes;
}


export interface IBloodTest {
    date: string;
    result: string;
}

export class Prescription {
    @JsonProperty('drug-name')
    drugName!: string;

    dose!: string;
    instructions!: string;

    @JsonProperty('end-date')
    endDate!: string;

    @JsonProperty('start-date')
    startDate!: string;

    @JsonProperty('GP-data')
    gpData!: string[];

    id!: number;
}

export class PatientPrescription {
    
    @JsonProperty('patient-email')
    patientEmail!: string;

    @JsonProperty('GP-email')
    gpEmail!: string;

    @JsonProperty('end-date')
    endDate!: string;

    @JsonProperty('drug-name')
    drugName!: string;

    dose!: string;
    instructions!: string;
}

export interface IPatientPrescriptions {
    current: Prescription[],
    previous: Prescription[],
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
