import { User } from "../entity/user.entity";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}


export class LoginUserDto {
  userName: string;
  password: string;
}



export class UserResponse {
  success: boolean;
  code?: string;
  data?: User;
}

export class UserLoginResponse {
  success: boolean;
  code?: string;
  data?: User & { accessToken: string; refreshToken: string };
}

export class UserListResponser {
  success: boolean;
  code?: string;
  data?: User[];
}