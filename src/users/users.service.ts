import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserListResponser, UserResponse } from './dto/user.dto';
import { codeResponse } from 'src/enum/codeResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) { }


  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      // Verificar que se haya enviado la contraseña
      if (!createUserDto.password) {
        return {
          success: false,
          code: codeResponse.PASSWORD_MISSING,
          data: undefined,
        };
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(user);
      return {
        success: true,
        code: 'created',
        data: savedUser,
      };
    } catch (error) {
      this.logger.error(error);

      return {
        success: false,
        code: codeResponse.UNEXPECTERD_ERROR,
        data: undefined,
      };
    }
  }



  async findAll(): Promise<UserListResponser> {
    try {
      const response =  await this.userRepository.find();
      return {
        success: true,
        data: response
      }
    } catch (error) {
      this.logger.error(error);

      return {
        success: false,
        code: codeResponse.UNEXPECTERD_ERROR,
      };
    }




  }

   async login(loginDto: LoginUserDto): Promise<UserResponse> {
    try {
      // Buscar usuario por userName
      const user = await this.userRepository.findOne({
        where: { userName: loginDto.userName },
      });

      if (!user) {
        return { success: false, code: 'USER_NOT_FOUND', data: undefined };
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        return { success: false, code: 'INVALID_PASSWORD', data: undefined };
      }

      // Retornar usuario exitosamente
      return { success: true, code: 'LOGIN_SUCCESS', data: user };
    } catch (error) {
      return { success: false, code: 'UNEXPECTED_ERROR', data: undefined };
    }
  }

  // async findOne(id: number): Promise<any> {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException({ response: null, code: 'codeResponse.notFound', success: false });
  //   }
  //   return { response: user, code: 'codeResponse.found', success: true };
  // }



}
