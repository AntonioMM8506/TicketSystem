import { registerAs } from '@nestjs/config'
import 'dotenv/config';

//Create a library, so the env variables can be handled and the imported to the target
//fule, in this case app.module.ts; So, when calling this service it has to be called
//as database.mongoConnectionString
export default registerAs('database', () => ({
    mongoConnectionString: process.env.MONGODB_URI
}));
