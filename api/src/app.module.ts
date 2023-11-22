// Import core libraries
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

// Import config files
import { ConfigModule, ConfigService } from '@nestjs/config';
import { throttlerConfig, mongodbConfig } from '@config/index';


// Import own app files
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Database connection and schema validation 
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import 'dotenv/config';

//Features
import { UsersModule } from '@features/users/users.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, //Sets all env variables as global
      cache: true, //optimize the speed of loading for env variables
      load: [throttlerConfig, mongodbConfig],
      validationSchema: Joi.object({
        LISTENIG_PORT: Joi.number().default(process.env.LISTENING_PORT),
        THROTTLE_TTL: Joi.number().default(process.env.THROTTLE_TTL),
        THROTTLE_LIMIT: Joi.number().default(process.env.THROTTLE_LIMIT),
        MONGODB_URI: Joi.string().default(process.env.MONGODB_URI),
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
    //Mongo Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongoConnectionString')
      })
    }),
    
    UsersModule,
    AuthModule, 
    //ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
