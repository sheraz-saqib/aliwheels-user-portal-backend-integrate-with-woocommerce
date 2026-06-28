import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AxiosModule } from '../../utils/axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
