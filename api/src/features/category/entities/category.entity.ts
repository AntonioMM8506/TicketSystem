// Import core libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Factory } from "nestjs-seeder";

export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
    @Factory(() =>{
        const categories = ['IT', 'Finances', 'Education', 'Math', 'History'];
        const random = Math.floor(Math.random() * categories.length);
        return categories[random];
    })
    @Prop({
        required: true,
    })
    name: string

    @Factory((faker) => faker.person.jobDescriptor())
    @Prop({
    })
    description?: string


    @Prop({
        default: 0
    })
    numberoftickets?: number



}//End of class Ticket

export const CategorySchema = SchemaFactory.createForClass(Category);
