import { User } from '../user/user.entity';
export declare class Character {
    id: number;
    name: string;
    class: string;
    level: number;
    race: string;
    background: string;
    user: User;
}
