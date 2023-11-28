import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { UsersService } from '@features/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private categoryModel: Model <CategoryDocument>,   
  private userService: UsersService,
  private configService: ConfigService){

  }//End of Constructor


  async create(id:any, req: any, createCategoryDto: CreateCategoryDto): Promise <CategoryDocument>{
    if(req == null) return null;
    
    const newCategory = await new this.categoryModel(createCategoryDto); 
    return newCategory.save();
  }//End of create


  async findByTitle(name: string): Promise <CategoryDocument>{
    return await this.categoryModel.findOne({name: {$eq: name}}).exec();
  } 

  findAll() {
    return `This action returns all category`;
  }//End of findAll

  /*
  findOne(id: number) {
    return `This action returns a #${id} category`;
  }//End of findOne
  */

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }//End of update


  remove(id: number) {
    return `This action removes a #${id} category`;
  }//End of remove

}//End of class CategoryService
