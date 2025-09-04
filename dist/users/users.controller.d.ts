import { UserService } from './users.service';
import { CreateUserDto, LoginUserDto, UserListResponser, UserResponse } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserResponse>;
    find(): Promise<UserListResponser>;
    login(loginDto: LoginUserDto): Promise<UserResponse>;
}
