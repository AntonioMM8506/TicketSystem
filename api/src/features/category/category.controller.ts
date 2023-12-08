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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Create new Category' })
  @ApiResponse({
    status: 201,
    description:
      'Creates a new Category given the Body, if it does not already exist.',
  })
  async create(
    @Req() req: Request,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.create(req, createCategoryDto);
  } //End of create

  @Get()
  @ApiOperation({ summary: 'Get all existing Categories' })
  @ApiResponse({
    status: 200,
    description:
      'Get all existing categories given the Category name as the Body',
  })
  findAll(@Body() body) {
    return this.categoryService.findAll(body);
  } //End of findAll

  //Find by Category's name
  @Get(':id')
  @ApiOperation({ summary: 'Get Category by Category Id' })
  @ApiResponse({
    status: 200,
    description: 'Get a Category given the Category Id as a Parameter',
  })
  findByTitle(@Param('id') id: any) {
    return this.categoryService.findByTitle(id);
  } //End of findByTitle

  //Find Category by Id
  @Get('byID/:id')
  @ApiOperation({ summary: 'Get Category by Category Id' })
  @ApiResponse({
    status: 200,
    description: 'Get Category by Category Id as a Parameter',
  })
  findOne(@Param('id') id: any) {
    return this.categoryService.findOne(id);
  } //End of find

  @Patch(':id')
  @ApiOperation({ summary: 'Update Category given Category Id' })
  @ApiResponse({
    status: 201,
    description:
      'Updates a Category given Category Id as a Parameter and the fields to update as the Body',
  })
  update(
    @Param('id') id: any,
    @Req() req: Request,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, req, updateCategoryDto);
  } //End of update

  @UseGuards(RefreshTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Category given Category Id' })
  @ApiResponse({
    status: 201,
    description:
      'Deletes permanently a Category given Category Id as a Parameter',
  })
  remove(@Req() req: Request, @Param('id') id: any) {
    return this.categoryService.remove(req, id);
  } //End of remove
} //End of class CategoryController
