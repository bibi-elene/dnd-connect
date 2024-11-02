import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

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

  @ManyToOne(() => User, user => user.characters, { onDelete: 'CASCADE' })
  user: User;
}
