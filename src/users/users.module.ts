import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './entity/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // registro del repositorio solo para este módulo
  ],
   exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
