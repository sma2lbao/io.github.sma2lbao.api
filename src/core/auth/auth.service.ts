import { Injectable } from '@nestjs/common';
import { UserJwtPayload } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser(username: string, password: string): Promise<any> {
    return await this.usersService.findByUsernameAndPassword(
      username,
      password,
    );
  }

  async validateJwtUser(userPayload: UserJwtPayload): Promise<any> {
    const { uid, username, email, mobile, password } = userPayload;
    return await this.usersService.find({
      uid,
      username,
      email,
      mobile,
      password,
    });
  }

  async validateHttpUser(token: string): Promise<any> {
    return await this.usersService.findUserByToken(token);
  }

  async login(user: User): Promise<any> {
    const payload: UserJwtPayload = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
