import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './entities/ticket.entity';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class TicketsSeeder implements Seeder {
  constructor(
    @InjectModel(Ticket.name) private readonly ticket: Model<Ticket>,
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const tickets = DataFactory.createForClass(Ticket).generate(25);

    // Insert into the database.
    return this.ticket.insertMany(tickets);
  }

  async drop(): Promise<any> {
    return this.ticket.deleteMany({});
  }
}
