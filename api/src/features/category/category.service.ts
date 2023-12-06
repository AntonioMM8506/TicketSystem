import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {} //End of Constructor

  async create(
    req: any,
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    if (req == null) return null;
    const categoryExists = await this.findByTitle(createCategoryDto.name);
    if (categoryExists) {
      throw new BadRequestException('Category already exists');
    }

    const newCategory = await new this.categoryModel(createCategoryDto);
    return newCategory.save();
  } //End of create

  async findByTitle(name: string): Promise<CategoryDocument> {
    return await this.categoryModel.findOne({ name: { $eq: name } }).exec();
  } //End of findByTitle

  async finById(id: any) {
    return await this.categoryModel.findOne({ _id: id }).exec();
  } //End of findById

  async findOne(id: any) {
    const category = await this.categoryModel.findOne({ _id: id }).exec();
    console.log(category);
    return category;
  }

  //Return all the categories sorted by ASC or DES order, depending of the value
  //sent in the body request
  async findAll(body: any): Promise<any> {
    const ord = body.order == 'des' ? -1 : 1;
    return await this.categoryModel
      .find()
      .sort([['name', ord]])
      .exec();
  } //End of findAll

  async update(id: any, req: any, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = {
      ...updateCategoryDto,
      numberoftickets: (await this.finById({ _id: id })).numberoftickets,
    };

    return await this.categoryModel.updateOne({ _id: id }, updatedCategory);
  } //End of update

  async remove(req: any, id: any) {
    if (!req.user['email']) {
      throw new ForbiddenException('User not loggen in');
    }

    const targetCategory = await this.categoryModel.findOne({ _id: id });
    if (!targetCategory) {
      throw new BadRequestException('Category not found');
    }

    if (targetCategory.numberoftickets >= 1) {
      throw new BadRequestException(
        'Category has at least 1 ticket associated. Be sure that no ticket is related to the given Category',
      );
    }

    const removedCategory = await this.categoryModel
      .findOne({ _id: id })
      .deleteOne()
      .exec();
    return removedCategory;
  } //End of remove

  // Auxiliar Methods ----------------------------------------------------------
  //When updating a category, the Category is fetched and then its counter is
  //increase, if a ticket is added to that Category, or decreased, when a related
  //ticket is "deleted";
  async increaseCounter(name) {
    const targetCategory = await this.findByTitle(name);
    const currentNumber = targetCategory.numberoftickets;
    return await this.categoryModel
      .updateOne(
        { name: targetCategory.name },
        { numberoftickets: currentNumber + 1 },
      )
      .exec();
  } //End of increaseCounter

  async decreaseCounter(name) {
    const targetCategory = await this.findByTitle(name);
    const currentNumber = targetCategory.numberoftickets;
    return await this.categoryModel
      .updateOne(
        { name: targetCategory.name },
        { numberoftickets: currentNumber - 1 },
      )
      .exec();
  } //End of decreaseCounter
} //End of class CategoryService
