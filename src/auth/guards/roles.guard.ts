import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorator/role.decorator';
import { PayloadInterface } from '../interface/payload.interface';
import { RoleName } from 'src/utils/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RoleName[]>(ROLES_KEY, context.getHandler());
    if(!roles){
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadInterface;
    const isAuth = roles.includes(user.role.name);
    if(!isAuth){
      throw new UnauthorizedException('El rol es incorrecto');
    }
    return isAuth;
  }
}