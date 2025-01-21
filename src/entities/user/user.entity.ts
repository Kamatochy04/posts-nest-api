import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.ru', description: 'Почта' })
  @IsString({ message: 'Должна быть строка' })
  @IsEmail({}, { message: 'некоректный email' })
  email: string;

  @Length(5, 20, { message: 'пароль должен быть больше 5 и меньше 20' })
  @ApiProperty({ example: '12345678Asasd', description: 'Пароль пользователя' })
  password: string;
}

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: ' Уникальный индетификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@test.ru', description: 'Почта' })
  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @ApiProperty({ example: '12345678Asasd', description: 'Пароль пользователя' })
  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @ApiProperty({ example: true, description: 'Забанен ли пользователь' })
  @Column({ name: 'baned', type: 'boolean', nullable: true })
  baned: boolean;

  @ApiProperty({
    example: 'Нарушил правила сообщества',
    description: 'причина блокировки ',
  })
  @Column({ name: 'banReason', type: 'varchar', nullable: true })
  banReason: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
