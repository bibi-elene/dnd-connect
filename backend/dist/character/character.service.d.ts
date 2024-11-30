import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { User } from '../user/user.entity';
export declare class CharacterService {
    private readonly characterRepository;
    constructor(characterRepository: Repository<Character>);
    findAll(): Promise<Character[]>;
    findOne(id: number, userId: number): Promise<Character>;
    create(characterData: Partial<Character>, user: User): Promise<Character>;
    findAllForUser(userId: number): Promise<Character[]>;
    update(id: number, character: Character, userId: number): Promise<Character>;
    remove(id: number, userId: number): Promise<void>;
}
