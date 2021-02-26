export class Prescription {
    drugName!: string;
    dose!: string;
    instructions!: string;
    endDate!: string;
    startDate!: string;
    gpData!: string[];

    id!: number;
}

export class PatientPrescription {
    patientEmail!: string;
    gpEmail!: string;
    endDate!: string;
    drugName!: string;
    dose!: string;
    instructions!: string;
}

export interface IPatientPrescriptions {
    current: Prescription[],
    previous: Prescription[],
}

export enum PrescriptionRequestStatuses {
    Accepted = "Accepted",
    Denied = "Denied",
    Pending = "Pending"
}

export interface IPrescriptionRequest {
    patientEmail: string;
    pharmacistEmail: string;
    drugName: string;
    dose: string;
    instructions: string;
    endDate: string;
    nextPickUp: string;
    requestDate: string;
    id: number;
    status: PrescriptionRequestStatuses;
}