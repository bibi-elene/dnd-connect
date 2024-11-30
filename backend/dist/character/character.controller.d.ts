import { CharacterService } from './character.service';
import { Character } from './character.entity';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    findAll(): Promise<Character[]>;
    findCurrentUserCharacters(req: any): Promise<Character[]>;
    findOne(id: number, req: any): Promise<Character>;
    create(characterData: Character, req: any): Promise<Character>;
    update(id: number, character: Character, req: any): Promise<Character>;
    remove(id: number, req: any): Promise<void>;
}
