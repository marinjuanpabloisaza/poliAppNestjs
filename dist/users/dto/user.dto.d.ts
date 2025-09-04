import { User } from "../entity/user.entity";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}
export declare class LoginUserDto {
    userName: string;
    password: string;
}
export declare class UserResponse {
    success: boolean;
    code?: string;
    data?: User;
}
export declare class UserLoginResponse {
    success: boolean;
    code?: string;
    data?: User & {
        accessToken: string;
        refreshToken: string;
    };
}
export declare class UserListResponser {
    success: boolean;
    code?: string;
    data?: User[];
}
