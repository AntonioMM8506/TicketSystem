// Import core libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Factory } from "nestjs-seeder";

export type TicketDocument = HydratedDocument<Ticket>

@Schema()
export class Ticket {

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

export const TicketSchema = SchemaFactory.createForClass(Ticket);