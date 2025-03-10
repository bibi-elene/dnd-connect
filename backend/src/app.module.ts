import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './character/character.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.DATABASE_URL?.includes('railway.app')
        ? { rejectUnauthorized: false }
        : false,
    }),
    CharacterModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
})
export class AppModule {}
