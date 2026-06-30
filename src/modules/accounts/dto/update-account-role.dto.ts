import { IsEnum } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

export class UpdateAccountRoleDto {
  @IsEnum(Role)
  role: Role;
}
