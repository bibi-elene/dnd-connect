import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCharacterDto } from './character.dto';

@ApiTags('characters')
@Controller('characters')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiResponse({ status: 200, description: 'List of characters.' })
  findAll(): Promise<CreateCharacterDto[]> {
    return this.characterService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get all characters for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of characters for the current user.',
  })
  async findCurrentUserCharacters(@Request() req): Promise<CreateCharacterDto[]> {
    const userId = req.user.id;
    return this.characterService.findAllForUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a character by ID' })
  @ApiResponse({ status: 200, description: 'Character found.' })
  @ApiResponse({ status: 404, description: 'Character not found.' })
  async findOne(@Param('id') id: number, @Request() req): Promise<Character> {
    return this.characterService.findOne(id, req.user.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new character' })
  @ApiResponse({ status: 201, description: 'Character created.' })
  create(
    @Body() characterData: Character,
    @UploadedFile() image: Express.Multer.File,
    @Request() req,
  ): Promise<Character> {
    return this.characterService.create(characterData, req.user, image);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing character' })
  @ApiResponse({ status: 200, description: 'Character updated.' })
  update(
    @Param('id') id: number,
    @Body() character: Character,
    @Request() req,
  ): Promise<Character> {
    return this.characterService.update(id, character, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a character' })
  @ApiResponse({ status: 204, description: 'Character deleted.' })
  remove(@Param('id') id: number, @Request() req): Promise<void> {
    return this.characterService.remove(id, req.user.id);
  }
}
