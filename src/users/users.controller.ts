import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, LoginUserDto, UserListResponser, UserResponse } from './dto/user.dto';

@Controller('user') // ruta base /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }

  @Get('find')
  async find(): Promise<UserListResponser> {
    return this.userService.findAll();
  }

    @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<UserResponse> {
    return this.userService.login(loginDto);
  }
}
