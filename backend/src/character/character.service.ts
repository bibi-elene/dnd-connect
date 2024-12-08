import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { User } from '../user/user.entity';
import { CreateCharacterDto } from './character.dto';
@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async findAll(): Promise<CreateCharacterDto[]> {
    const characters = await this.characterRepository.find();

    return characters.map((character) => ({
      id: character.id,
      name: character.name,
      class: character.class,
      level: character.level,
      race: character.race,
      background: character.background,
      skills: character.skills,
      image:
        character.image && Buffer.isBuffer(character.image)
          ? `data:image/jpeg;base64,${character.image.toString('base64')}`
          : character.image || null,
    }));
  }

  findOne(id: number, userId: number): Promise<Character> {
    return this.characterRepository.findOne({ where: { id, user: { id: userId } } });
  }

  async create(
    characterData: Partial<Character>,
    user: User,
    image: Express.Multer.File,
  ): Promise<Character> {
    const { ...characterDetails } = characterData;

    const character = this.characterRepository.create({
      ...characterDetails,
      user,
    });

    if (image) {
      character.image = image.buffer;
    }

    return await this.characterRepository.save(character);
  }
  async findAllForUser(userId: number): Promise<CreateCharacterDto[]> {
    const characters = await this.characterRepository.find({
      where: { user: { id: userId } },
    });

    return characters.map((character) => ({
      id: character.id,
      name: character.name,
      class: character.class,
      level: character.level,
      race: character.race,
      background: character.background,
      skills: character.skills,
      image:
        character.image && Buffer.isBuffer(character.image)
          ? `data:image/jpeg;base64,${character.image.toString('base64')}`
          : character.image || null,
    }));
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
