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

  create(character: Character, user: User): Promise<Character> {
    character.user = user;
    return this.characterRepository.save(character);
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
