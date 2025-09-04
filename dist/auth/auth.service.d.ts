import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { LoginUserDto, UserLoginResponse } from '../users/dto/user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginDto: LoginUserDto): Promise<UserLoginResponse>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        error?: undefined;
    } | {
        error: string;
        accessToken?: undefined;
    }>;
}
