"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListResponser = exports.UserLoginResponse = exports.UserResponse = exports.LoginUserDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
class CreateUserDto {
    name;
    email;
    password;
    role;
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
    name;
    email;
    password;
}
exports.UpdateUserDto = UpdateUserDto;
class LoginUserDto {
    userName;
    password;
}
exports.LoginUserDto = LoginUserDto;
class UserResponse {
    success;
    code;
    data;
}
exports.UserResponse = UserResponse;
class UserLoginResponse {
    success;
    code;
    data;
}
exports.UserLoginResponse = UserLoginResponse;
class UserListResponser {
    success;
    code;
    data;
}
exports.UserListResponser = UserListResponser;
//# sourceMappingURL=user.dto.js.map