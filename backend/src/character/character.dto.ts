import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { AbilityScoreType, Skill } from 'src/utils/constants';

export class CreateCharacterDto {
  @ApiProperty({ description: 'The unique identifier for the character' })
  id: number;

  @ApiProperty({ description: 'The name of the character' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The class of the character' })
  @IsString()
  @IsNotEmpty()
  class: string;

  @ApiProperty({ description: 'The level of the character' })
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @ApiProperty({ description: 'The race of the character' })
  @IsString()
  @IsNotEmpty()
  race: string;

  @ApiProperty({ description: 'The background of the character' })
  @IsString()
  @IsNotEmpty()
  background: string;

  @ApiProperty({ description: 'The skills of the character' })
  @IsArray()
  @IsNotEmpty()
  skills: string[];

  @ApiProperty({ description: 'The ability scores of the character' })
  @IsString()
  @IsNotEmpty()
  abilityScores: Record<AbilityScoreType, number>;

  @ApiProperty({ description: 'The character image', type: 'string', format: 'binary' })
  @IsOptional()
  image?: string | Buffer;
}
