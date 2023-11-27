import { ConfigModule, ConfigService } from '@nestjs/config';
import { registerAs } from '@nestjs/config'
import 'dotenv/config';
/*
useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('database.mongoConnectionString')
})
*/



console.log(process.env.MONGODB_URI);