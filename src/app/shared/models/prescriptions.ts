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