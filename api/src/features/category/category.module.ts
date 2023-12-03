import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { AccessTokenStrategy } from '@features/auth/strategies';
import { AccessTokenGuard } from '@features/auth/guards';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        //It is not the property of the user entity, it's more like a metaproperty
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, AccessTokenGuard, AccessTokenStrategy],
  exports: [CategoryService],
})
export class CategoryModule {}
