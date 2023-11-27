import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./entities/category.entity";
import { Seeder, DataFactory } from "nestjs-seeder";

@Injectable()
export class CategorySeeder implements Seeder {
  constructor(@InjectModel(Category.name) private readonly category: Model<Category>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const categories = DataFactory.createForClass(Category).generate(5);

    // Insert into the database.
    return this.category.insertMany(categories);
  }

  async drop(): Promise<any> {
    return this.category.deleteMany({});
  }
}