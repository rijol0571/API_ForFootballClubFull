import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe - request body validatsiya qilish
  app.useGlobalPipes(new ValidationPipe());

  // CORSni yoqish (agar kerak bo'lsa)
  app.enableCors();

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Football Club API')
    .setDescription('If you find error from my API_ForFootballClub (I will kill you), contact with me: @jumadullayevrustam85@gmail.com')
    .setVersion('1.0')
    .addTag('football')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Portni sozlash
  const port = process.env.PORT || 3033;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
