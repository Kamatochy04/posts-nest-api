import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Roles } from 'src/auth/role.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @ApiOperation({ summary: ' Создание пользователя ' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  @UsePipes(ValidationPipe)
  create(@Body() userDto: CreateUserDto) {
    return this.userServices.create(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Get()
  get() {
    return this.userServices.getAll();
  }
}
