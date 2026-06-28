import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './@types/user.interface';
import { GetQueryDto } from '../../utils/common/dto/get-query.dto';
import { GetResponseInterface } from '../../utils/response/get-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(
    @Query() query: GetQueryDto,
  ): Promise<GetResponseInterface<User>> {
    return this.usersService.getAllUsers(query);
  }

  @Get(':id')
  getUser(@Param() query: GetQueryDto): Promise<User> {
    return this.usersService.getUser({
      id: query.id,
    } as GetQueryDto);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @Put(':id')
  updateUser(
    @Param() query: GetQueryDto,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(query, dto);
  }

  @Delete(':id')
  deleteUser(@Param() query: GetQueryDto): Promise<User> {
    return this.usersService.deleteUser({
      id: query.id,
    } as GetQueryDto);
  }
}
