import { IPatientPrescriptions, IPrescriptionRequest } from "./prescriptions";

export interface IPatientBloods {
    email: string;
    testDate: string;
    results: string[];
};

export interface IBloodTestRequirements {
    result: string;
    timeframe: number;
};

export interface IDrug {
    drugName: string;
    commonName: string;
    bloodsRequired: IBloodTestRequirements[]
};

export interface IPharmacistRequest {
    pharmacistEmail: string;
    requestID: number;
};

// export interface IPickUp {
//     patientEmail: string;
//     patientPrescription: IPatientPrescriptions;
//     requestDate: string;
// };

export interface IPickUp {
    drugName: string;
    dose: string;
    instructions: string;
    endDate: string;
    nextPickUp: string;
    startDate: string;
    GPData: string[];
    id: number;
    bloodsRequired?: string[];
}