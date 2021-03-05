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
    Processed = "Processed",
    Pending = "Pending"
}

export interface IPrescriptionRequest {
    patientEmail: string;
    pharmacistEmail: string;
    drugName: string;
    dose: string;
    instructions: string;
    endDate: string;
    GPEmail: string;
    nextPickUp: string;
    requestDate: string;
    id: number;
    status: PrescriptionRequestStatuses;
}

export interface IPrescriptions {
    pending: IPrescriptionRequest[];
    processed: IPrescriptionRequest[];
}