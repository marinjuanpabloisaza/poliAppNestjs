import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto, LoginUserDto, UserListResponser, UserResponse } from './dto/user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, logger: Logger);
    create(createUserDto: CreateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserListResponser>;
    login(loginDto: LoginUserDto): Promise<UserResponse>;
}
