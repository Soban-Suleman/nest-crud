import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async getAll(@Res() response: Response): Promise<Response> {
    const users = await this.userService.findAll();
    return response.status(HttpStatus.OK).json({ users });
  }

  @Post('new')
  async createUser(
    @Body() createUserDto: CreateUser,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.userService.createUser(createUserDto);
    return response.status(HttpStatus.CREATED).json({ user });
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUser,
    @Res() response: Response,
  ): Promise<Response<User>> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return response.status(HttpStatus.OK).json({ user });
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() response: Response) {
    await this.userService.deleteUser(id);
    response.status(HttpStatus.OK).json({ message: 'User Profile Removed' });
  }
}
