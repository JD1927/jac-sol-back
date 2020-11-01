import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleRepository)
    public roleRepository: RoleRepository,
  ) { }

  async getRoleList(): Promise<Role[]> {
    return this.roleRepository.getRoleList();
  }
}
