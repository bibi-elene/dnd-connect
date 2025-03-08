import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    cors: {
      origin: [
        'http://localhost:3000',
        'https://dndconnect.xyz',
        'https://dnd-connect.vercel.app',
        'https://www.dndconnect.xyz',
      ],
      credentials: true,
      methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    },
  });

  app.use(cookieParser());
  app.useWebSocketAdapter(new IoAdapter(app));

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/docs/',
  });

  const config = new DocumentBuilder()
    .setTitle('D&D Connect API')
    .setDescription('API documentation for the D&D Connect application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: 'swagger-ui.css',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

bootstrap();
