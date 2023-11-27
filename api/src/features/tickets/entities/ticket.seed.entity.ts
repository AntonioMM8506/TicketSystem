// Import core libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Factory } from "nestjs-seeder";

export type TicketSeedDocument = HydratedDocument<TicketSeed>

@Schema()
export class TicketSeed {

    @Factory((faker) => faker.company.name())
    @Prop({
        required: true,
    })
    title: string


    @Factory((faker) => faker.person.jobDescriptor())
    @Prop({
        required: true,
    })
    description: string


    @Factory((faker) => faker.person.firstName())
    @Prop({
        required: true,
    })
    assignee: string


    @Prop({
    })
    duedate?: Date


    @Factory(() =>{
        const categories = ['IT', 'Finances', 'Education', 'Math', 'History'];
        const random = Math.floor(Math.random() * categories.length);
        return categories[random];
    })
    @Prop({
    })
    category?: string



}//End of class Ticket

export const TicketSeedSchema = SchemaFactory.createForClass(TicketSeed);