import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(new ValidationPipe()) data: CreateUserDTO, @Res() res: Response) {
    return await this.userService.createUser(data);
  }

}
