import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginUserDto): Promise<import("../users/dto/user.dto").UserLoginResponse>;
    loginaaa(loginDto: LoginUserDto): Promise<string>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        error?: undefined;
    } | {
        error: string;
        accessToken?: undefined;
    }>;
}
