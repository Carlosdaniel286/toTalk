import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private jwtService: JwtService) {}

  async signIn( username: string, userId: number,): Promise<{ access_token: string }> {
    const payload = {userId, username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}