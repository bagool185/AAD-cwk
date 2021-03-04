import { UserTypes } from "@shared/models/user";

export const getRedirectRoute = (userType: UserTypes | undefined): string => {
    switch (userType) {
        case UserTypes.GP:
            return '/gp-dashboard';
        
        case UserTypes.Pharmacist:
            return '/pharmacist-dashboard';

        case UserTypes.Technician:
            return '/technician-dashboard';
    
        default:
            return '/prescriptions';
    }
}