import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from 'src/entities/user/user.entity';
import { UserService } from 'src/entities/user/user.service';
import * as bcript from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidat = await this.userService.getUserByEmail(userDto.email);

    if (candidat) {
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcript.hash(userDto.password, 6);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { amail: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquales = await bcript.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquales) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'некоректный email или пароль',
    });
  }
}
