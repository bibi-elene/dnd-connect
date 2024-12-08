import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the character' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the character' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The class of the character' })
  class: string;

  @Column()
  @ApiProperty({ description: 'The level of the character' })
  level: number;

  @Column()
  @ApiProperty({ description: 'The race of the character' })
  race: string;

  @Column()
  @ApiProperty({ description: 'The background of the character' })
  background: string;

  @Column({ default: '' })
  @ApiProperty({ description: 'The skills of the character' })
  skills: string;

  @Column({ type: 'bytea', nullable: true })
  @ApiProperty({ description: 'The image of the character as a JPEG' })
  image: Buffer | string | null;

  @ManyToOne(() => User, (user) => user.characters, { onDelete: 'CASCADE' })
  user: User;
}
