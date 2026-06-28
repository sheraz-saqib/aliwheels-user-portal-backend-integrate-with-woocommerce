import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './@types/user.interface';
import { GetQueryDto } from '../../utils/common/dto/get-query.dto';
import { GetResponseInterface } from '../../utils/response/get-response.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getAllUsers(
    @Query() query: GetQueryDto,
  ): Promise<GetResponseInterface<User>> {
    return this.usersService.getAllUsers(query);
  }
}
