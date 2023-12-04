// Import core libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  //Adding cors as an extra layer of security
  const app = await NestFactory.create(AppModule, { cors: true });

  //To avoid data injection of unnecessary fields
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(helmet()); //Limit the exposed heads, only using the necessary ones
  //To manage versions
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Setting OpenAPI docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('RESTful API project')
    .setDescription('This is an RESTful API project for the SDJS-102 course.')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs/api', app, swaggerDocument); //localhost:3000/docs/api => to see the swagger report

  //Port to be accesible
  await app.listen(3000);
}
bootstrap();
