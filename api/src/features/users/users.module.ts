import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name, //It is not the property of the user entity, it's more like a metaproperty
        schema: UserSchema
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})//End of @Module


export class UsersModule {}
