import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
//import { TicketSeed, TicketSeedSchema } from "./features/tickets/entities/ticket.seed.entity";
import { Ticket, TicketSchema } from "./features/tickets/entities/ticket.entity";
import { Category, CategorySchema } from "./features/category/entities/category.entity";
import { TicketsSeeder } from "./features/tickets/ticket.seeder";
import { CategorySeeder } from "./features/category/category.seeder";
import 'dotenv/config';


seeder({
    imports: [

        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([
            { name: Ticket.name, schema: TicketSchema }, 
            {name: Category.name, schema: CategorySchema}
        ]),
    ],
}).run([TicketsSeeder, CategorySeeder]);
