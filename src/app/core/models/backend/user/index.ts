export * from './roles';

export interface User {
    uid: string;
    name: string;
    roleId: string;
    role: any; //need to create roles example Admin
}