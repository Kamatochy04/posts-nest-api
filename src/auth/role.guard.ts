import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './role.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
        context.getHandler,
        context.getClass,
      ]);

      if (!requiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (!bearer || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован ',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.role.some((role) => requiredRoles.include(role.value));

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован ',
      });
    }
  }
}
