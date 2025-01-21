import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, User } from './user.entity';
import { Repository } from 'typeorm';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async getAll() {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    const role = await this.roleService.getByValue('USER');

    if (role) {
      user.roles = [role];
      await this.userRepository.save(user);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },

      relations: ['roles'],
    });

    return user;
  }
}
