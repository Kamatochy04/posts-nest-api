import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/entities/user/user.entity';

@ApiTags('Ayth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
