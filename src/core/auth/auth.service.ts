import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import { UserJwtPayload } from './interfaces/auth.interface';
import { User } from '../../app/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser(username: string, password: string): Promise<any> {
    return await this.usersService.findUserByUsernameAndPassword(
      username,
      password,
    );
  }

  async validateJwtUser(uid: string): Promise<any> {
    return await this.usersService.findUserByUid(uid);
  }

  async validateHttpUser(token: string): Promise<any> {
    return await this.usersService.findUserByToken(token);
  }

  async login(user: User): Promise<any> {
    const payload: UserJwtPayload = Object.assign({}, user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
