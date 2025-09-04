// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token de Authorization Bearer
      ignoreExpiration: false,
      secretOrKey: '550e8400-e29b-41d4-a716-446655440000', // Debe ser el mismo que usaste en JwtModule.register
    });
  }

  async validate(payload: any) {
    // Este payload viene del JWT
    // Se puede retornar info adicional que quieras en request.user
    return { id: payload.id, userName: payload.userName };
  }
}
