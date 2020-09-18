import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import path = require('path');
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
require('dotenv').config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Booking Hotel Document')
    .setDescription('The Booking Hotel API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  Logger.log(`Listening on Port: ${process.env.PORT || 3001}`);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
