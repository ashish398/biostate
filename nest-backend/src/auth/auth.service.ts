// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const user =
      (await this.usersService.findByUsername(usernameOrEmail)) ||
      (await this.usersService.findByEmail(usernameOrEmail));
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string, email: string) {
    const existingUser = await this.usersService.findByUsername(username);
    const existingEmail = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    if (existingEmail) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = await this.usersService.create(username, password, email);
    return this.login(user);
  }
}
