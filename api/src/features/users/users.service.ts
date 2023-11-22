import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';

//Business Logic
@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model <UserDocument>){

  }


  async create(createUserDto: CreateUserDto): Promise<UserDocument>{
    const createduser = await new this.userModel(createUserDto);
    return createduser.save();
  }


  async findByEmail(email: string): Promise<UserDocument>{
    const user = await this.userModel.findOne({email: email}).exec()
    return user;
  }


  async findAll(): Promise<any> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }


  async findOne(id: any) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }


  async update(id: any, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }


  async updateToken(id: any, updateTokenDto: UpdateTokenDto) {
    return this.userModel.updateOne({ _id: id }, updateTokenDto)
  }


  async remove(id: any) {
    return await this.userModel.findById(id).deleteOne().exec();
  }
}//End of UsersService
