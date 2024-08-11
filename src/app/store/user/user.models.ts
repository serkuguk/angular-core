
import { User } from 'src/app/core/models/backend/user';
import { Roles } from 'src/app/core/models/role';


// Requests models

export interface UsernamePasswordCredentials {
    username: string;
    password: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'username' | 'created'>;