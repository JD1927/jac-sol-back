import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('api/role')
export class RoleController {

  constructor(private roleService: RoleService) { }

  @Get()
  getRoleList(): Promise<Role[]> {
    return this.roleService.getRoleList();
  }
}
