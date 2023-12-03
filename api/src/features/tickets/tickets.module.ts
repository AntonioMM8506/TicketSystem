import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { AccessTokenStrategy } from '@features/auth/strategies';
import { AccessTokenGuard } from '@features/auth/guards';
import { UsersModule } from '../users/users.module';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CategoryModule, //Complete module for import
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService, AccessTokenGuard, AccessTokenStrategy], //Files we can create, not necessary libraries
  exports: [TicketsService],
})
export class TicketsModule {}
