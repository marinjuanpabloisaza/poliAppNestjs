import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { LoginUserDto, UserLoginResponse } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto): Promise<UserLoginResponse> {
    const userResponse = await this.userService.login(loginDto);

    if (!userResponse.success || !userResponse.data) {
      return userResponse as UserLoginResponse; // Cast seguro
    }

    const payload = { id: userResponse.data.id, userName: userResponse.data.userName };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      success: true,
      code: 'LOGIN_SUCCESS',
      data: { ...userResponse.data, accessToken, refreshToken },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const newAccessToken = this.jwtService.sign(
        { id: payload.id, userName: payload.userName },
        { expiresIn: '120s' },
      );
      return { accessToken: newAccessToken };
    } catch (err) {
      return { error: 'INVALID_REFRESH_TOKEN' };
    }
  }
}
