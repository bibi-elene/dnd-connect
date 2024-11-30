import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/docs/',
  });

  const config = new DocumentBuilder()
    .setTitle('D&D Connect API')
    .setDescription('API documentation for the D&D Connect application')
    .setVersion('1.0')
    .addServer(
      process.env.NODE_ENV === 'production'
        ? 'https://dnd-connect-8375.vercel.app'
        : 'http://localhost:3001',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: 'swagger-ui.css',
  });

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://dnd-connect.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
