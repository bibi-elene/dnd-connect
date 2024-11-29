import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  findAll(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  findOne(id: number, userId: number): Promise<Character> {
    return this.characterRepository.findOne({ where: { id, user: { id: userId } } });
  }

  async create(characterData: Partial<Character>, user: User): Promise<Character> {
    console.log('User:', user);
    console.log('Character Data:', characterData);

    // Ensure that 'id' is not present in the data to be saved
    const { ...characterDetails } = characterData;

    // Create a new character instance and associate it with the user
    const character = this.characterRepository.create({
      ...characterDetails, // Ensure that the 'id' is excluded
      user,
    });

    // Save the new character entity to the database
    return await this.characterRepository.save(character);
  }

  async findAllForUser(userId: number): Promise<Character[]> {
    return this.characterRepository.find({ where: { user: { id: userId } } });
  }

  async update(id: number, character: Character, userId: number): Promise<Character> {
    const existingCharacter = await this.findOne(id, userId);
    if (!existingCharacter) {
      throw new Error('Character not found or not owned by user');
    }
    await this.characterRepository.update(id, character);
    return this.characterRepository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number): Promise<void> {
    const existingCharacter = await this.findOne(id, userId);
    if (!existingCharacter) {
      throw new Error('Character not found or not owned by user');
    }
    await this.characterRepository.delete(id);
  }
}
