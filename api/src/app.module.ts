// Import core libraries
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

// Import config files
import { ConfigModule, ConfigService } from '@nestjs/config';
import { throttlerConfig } from '@config/index';

// Import own app files
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Database connection and schema validation
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi'

@Module({
  imports: [
    //Mongo Connection
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [throttlerConfig],
      //Joi vaidation Schema
      validationSchema: Joi.object({
        LISTENIG_PORT: Joi.number().default(process.env.LISTENING_PORT).required(),
        THROTTLE_TTL: Joi.number().default(process.env.THROTTLE_TTL).required(),
        THROTTLE_LIMIT: Joi.number().default(process.env.THROTTLE_LIMIT).required(),
        MONGODB_URI: Joi.string().default(process.env.MONGODB_URI).required(),
      }),
    }),
    // Rate limit protection
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttler.ttl'),
          limit: configService.get<number>('throttler.limit'),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
