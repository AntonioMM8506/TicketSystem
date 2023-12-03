import { Injectable, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';

//Business Logic
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists!');
    }

    const newUser = { ...createUserDto };

    const hash = await this.hasData(createUserDto.password);
    newUser.password = !createUserDto.password.includes('$argon2')
      ? hash
      : createUserDto.password;

    const createduser = await new this.userModel(newUser);
    return createduser.save();
  } //End of create

  async hasData(data: string) {
    return await argon2.hash(data);
  } //End of hasData

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: { $eq: email } }).exec();
    return user;
  } //End of findByEmail

  async findAll(): Promise<any> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  } //End of findAll

  async findOne(id: any) {
    const user = await this.userModel.findById(id).exec(); //id
    return user;
  } //End of findOne

  async update(id: any, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  } //End of update

  async updateToken(id: any, updateTokenDto: UpdateTokenDto) {
    return this.userModel.updateOne({ _id: id }, updateTokenDto);
  } //End of updateToken

  async remove(id: any) {
    return await this.userModel.findById({ _id: id }).deleteOne().exec();
  }
} //End of UsersService
