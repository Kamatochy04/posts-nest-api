import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleServices: Repository<Role>,
  ) {}
  async create(dto: CreateRoleDto) {
    const role = await this.roleServices.save(dto);

    return role;
  }

  async getByValue(value: string) {
    const role = this.roleServices.findOne({
      where: {
        value,
      },
    });

    return role;
  }
}
