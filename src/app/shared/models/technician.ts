import { IPickUp } from "./medication";

export interface ITechnician {
    email: string;
    firstName: string;
    lastName: string;
    supervisors: string[];
    pickUps: IPickUp[];
};