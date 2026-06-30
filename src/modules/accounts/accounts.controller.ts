import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { UpdateAccountRoleDto } from './dto/update-account-role.dto';
import { AccountResponse } from './@types/account-response.interface';
import { AccountDocument } from './schemas/account.schema';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Roles(Role.ADMIN)
  @Get()
  async listAccounts(): Promise<AccountResponse[]> {
    const accounts = await this.accountsService.listAccounts();
    return accounts.map((account) => this.toResponse(account));
  }

  @Roles(Role.ADMIN)
  @Patch(':id/role')
  async updateAccountRole(
    @Param('id') id: string,
    @Body() dto: UpdateAccountRoleDto,
  ): Promise<AccountResponse> {
    const account = await this.accountsService.updateAccountRole(id, dto.role);
    return this.toResponse(account);
  }

  private toResponse(account: AccountDocument): AccountResponse {
    return {
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
      isVerified: account.isVerified,
      isActive: account.isActive,
    };
  }
}
