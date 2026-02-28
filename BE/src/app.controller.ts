import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AppController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (
      email === 'adminporto@gmail.com' &&
      password === 'porto123'
    ) {
      return {
        success: true,
        message: 'Login success',
      };
    }

    throw new UnauthorizedException('Email atau password salah');
  }
}