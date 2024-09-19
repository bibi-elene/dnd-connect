import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character } from './character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
