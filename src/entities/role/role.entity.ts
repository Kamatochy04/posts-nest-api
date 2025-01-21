import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('role')
export class Role {
  @ApiProperty({ example: '1', description: ' Уникальный индетификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Роль пользователя в системе ',
  })
  @Column({ name: 'value', type: 'varchar' })
  value: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @ManyToMany(() => User, (user) => user.roles) users: User[];
}
