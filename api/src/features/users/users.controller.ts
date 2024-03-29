import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypedEventEmitter } from '@app/event-emitter/typed-event-emitter.class';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}

  //For the Swagger report
  //ApiOperations({sumary:''}) => Givesa brief description about what the method does
  //ApiResponse({status:XXXX, description:''}) => Allows to edit the method description
  //as well as the HTTP status code.
  @Post()
  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({
    status: 201,
    description: 'Create a new user into the database given the Body',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    this.eventEmitter.emit('user.welcome', {
      name: createUserDto.name,
      email: createUserDto.email,
    });
    return await this.usersService.create(createUserDto);
  } //End of create

  @Get()
  @ApiOperation({ summary: 'Get All users' })
  @ApiResponse({
    status: 200,
    description: 'Get All existent Users',
  })
  findAll() {
    return this.usersService.findAll();
  } //End of findAll

  @Get(':id') //: wildcard => {id}
  @ApiOperation({ summary: 'Get User by User Id' })
  @ApiResponse({
    status: 200,
    description: 'Seeks for the user by his/her given id as a Parameter',
  })
  findOne(@Param('id') id: any) {
    return this.usersService.findOne(id);
  } //End of findOne

  @Patch(':id')
  @ApiOperation({ summary: 'Edit user by Used Id' })
  @ApiResponse({
    status: 201,
    description:
      'Updates an User, looking for them with the given Id as a Parameter, and the updated fields as the Body',
  })
  update(@Param('id') id: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  } //End of update

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by User Id' })
  @ApiResponse({
    status: 200,
    description:
      'Deletes permanently the selected user by given Id as a Parameter',
  })
  remove(@Param('id') id: any) {
    return this.usersService.remove(id);
  } //End of remove
} //End of class UsersController
