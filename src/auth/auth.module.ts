import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '550e8400-e29b-41d4-a716-446655440000', // cambiar por uno seguro y en variable de entorno
      signOptions: { expiresIn: '120s' }, // access token dura 2 minutos
    }),
  ],
  providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
