// import { Strategy } from 'passport-http-bearer';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class HttpStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authServive: AuthService) {
//     super();
//   }

//   async validate(token: string) {
//     // console.log(token);
//     // const user = await this.authServive.validateUser(token);
//     // console.log(user);
//     // if (!user) {
//     //     throw new UnauthorizedException();
//     // }
//     // return user;
//   }
// }
