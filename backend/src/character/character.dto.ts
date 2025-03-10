import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  skills: string;

  @ApiProperty({ description: 'The character image', type: 'string', format: 'binary' })
  @IsOptional()
  image?: string | Buffer;
}
