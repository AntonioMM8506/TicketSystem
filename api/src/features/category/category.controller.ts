import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AccessTokenGuard, RefreshTokenGuard } from '@features/auth/guards';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.create(req, createCategoryDto);
  } //End of create

  @Get()
  findAll(@Body() body) {
    return this.categoryService.findAll(body);
  } //End of findAll

  //Find by Category's name
  @Get(':id')
  findByTitle(@Param('id') id: any) {
    return this.categoryService.findByTitle(id);
  } //End of findByTitle

  //Find Category by Id
  @Get('byID/:id')
  findOne(@Param('id') id: any) {
    return this.categoryService.findOne(id);
  } //End of find

  @Patch(':id')
  update(
    @Param('id') id: any,
    @Req() req: Request,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, req, updateCategoryDto);
  } //End of update

  @UseGuards(RefreshTokenGuard)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: any) {
    return this.categoryService.remove(req, id);
  } //End of remove
} //End of class CategoryController
