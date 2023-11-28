import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AccessTokenGuard } from '@features/auth/guards'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @UseGuards(AccessTokenGuard)
  @Post(':id')
  async create(@Param('id') id: any, @Req() req: Request, @Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(id, req, createCategoryDto);
  }//End of create


  @Get()
  findAll() {
    return this.categoryService.findAll();
  }//End of findAll

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }//End of findOne
  */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }//End of update


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }//End of remove


}//End of class CategoryController
