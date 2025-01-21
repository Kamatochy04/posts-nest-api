import { Module } from '@nestjs/common';
import { TypeOrmModule } from './db/typeorm.module';
import { ConfigModule } from './config.module';
import { UserModule } from './entities/user/user.module';
import { RoleModule } from './entities/role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, UserModule, TypeOrmModule, RoleModule, AuthModule],
})
export class AppModule {}
