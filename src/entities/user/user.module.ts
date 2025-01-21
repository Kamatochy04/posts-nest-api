import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../role/role.entity';
import { RoleModule } from '../role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],

  exports: [UserService],
})
export class UserModule {}
