import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { User } from '../user/user.entity';
import { CharacterResponseDto, CreateCharacterDto } from './character.dto';
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

  async findOne(id: number, userId: number, isAdmin: boolean): Promise<CreateCharacterDto> {
    const whereClause = isAdmin ? { id } : { id, user: { id: userId } };

    const character = await this.characterRepository.findOne({
      where: whereClause,
    });

    if (!character) {
      throw new Error('Character not found or not owned by user');
    }

    return {
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
    };
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

  async update(
    id: number,
    character: Character,
    userId: number,
    isAdmin: boolean,
  ): Promise<Character> {
    const existingCharacter = await this.findOne(id, userId, isAdmin);

    if (!existingCharacter) {
      throw new Error('Character not found or not owned by user');
    }
    await this.characterRepository.update(id, character);
    return this.characterRepository.findOne({ where: { id } });
  }

  async partialUpdate(
    id: number,
    partialData: Partial<Character>,
    userId: number,
    isAdmin: boolean,
    image?: Express.Multer.File,
  ): Promise<CharacterResponseDto> {
    const character = await this.findOne(id, userId, isAdmin);

    if (!character) {
      throw new Error('Character not found or not owned by user');
    }

    Object.assign(character, partialData);

    if (image) {
      character.image = image.buffer;
    }

    const savedCharacter = await this.characterRepository.save({
      ...character,
      image: character.image || null,
    });

    return {
      id: savedCharacter.id,
      name: savedCharacter.name,
      class: savedCharacter.class,
      level: savedCharacter.level,
      race: savedCharacter.race,
      background: savedCharacter.background,
      skills: savedCharacter.skills,
      image:
        savedCharacter.image && Buffer.isBuffer(savedCharacter.image)
          ? `data:image/jpeg;base64,${savedCharacter.image.toString('base64')}`
          : null,
    };
  }

  async remove(id: number, userId: number, isAdmin: boolean): Promise<void> {
    const existingCharacter = await this.findOne(id, userId, isAdmin);
    if (!existingCharacter) {
      throw new Error('Character not found or not owned by user');
    }
    await this.characterRepository.delete(id);
  }
}
