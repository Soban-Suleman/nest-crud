import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return await this.model.findOne({ _id: id }).exec();
  }
  async createUser(createUserDto: CreateUser): Promise<User> {
    return await new this.model({ ...createUserDto }).save();
  }
  async updateUser(id: string, updateUserDto: UpdateUser): Promise<User> {
    return await this.model
      .findOneAndUpdate({ _id: id }, updateUserDto, {
        new: true,
      })
      .exec();
  }
  async deleteUser(id: string): Promise<User> {
    return await this.model.findOneAndDelete({ _id: id }).exec();
  }
}
