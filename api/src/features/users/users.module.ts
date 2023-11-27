import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { TypedEventEmitter } from '@app/event-emitter/typed-event-emitter.class';

@Module({
  imports:[
    MongooseModule.forFeature([
      {//It is not the property of the user entity, it's more like a metaproperty
        name: User.name, 
        schema: UserSchema
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    TypedEventEmitter],
  exports: [UsersService],
})//End of @Module


export class UsersModule {}
