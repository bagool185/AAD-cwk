export enum PrescriptionStatus {
    Active,
    Expired,
    Unknown
}

export interface IPrescription {
    medication: string;
    instructions: string;
    dosage: string;
    status: PrescriptionStatus;
}

