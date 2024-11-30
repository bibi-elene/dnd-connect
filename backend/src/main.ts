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
  SwaggerModule.setup('api-docs', app, document, {
    customCssUrl: '/swagger-ui.css',
    customJs: '/swagger-ui-bundle.js',
    customfavIcon: '/favicon-32x32.png',
    customSiteTitle: 'API Docs',
  });

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://dnd-connect.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
