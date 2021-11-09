import { Role } from 'src/app/models/role.model';

export class User {
    id: string = '';
    lastname: string = '';
    firstname: string = '';
    email: string = '';
    password: string = '';
    imageURL: string ='';
    roles: Array<Role> = [];
}
